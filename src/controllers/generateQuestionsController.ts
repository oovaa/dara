import type { Context } from 'hono'
import { HTTPException } from 'hono/http-exception'
import { parser } from '../../utils/parser.js'
import tempWrite from 'temp-write'
import generateQs from '../../tools/generateQs.js'

export const generateQuestions = async (c: Context) => {
  try {
    const formData = await c.req.parseBody()
    const file = formData['file']

    if (!file || !(file instanceof File)) {
      throw new HTTPException(400, { message: 'You must provide a file' })
    }

    // Convert File to buffer
    const buffer = await file.arrayBuffer()
    const uint8Array = new Uint8Array(buffer)
    
    // Write to temporary file
    const filePath = tempWrite.sync(uint8Array, file.name)
    
    // Parse document
    const docs = await parser(filePath)
    
    // Generate questions
    const Qs = await generateQs(docs)
    const qs_json = JSON.parse(Qs)
    
    return c.json(qs_json)
  } catch (err) {
    if (err instanceof HTTPException) {
      throw err
    }
    const error = err as Error
    console.error('Question generation error:', error)
    throw new HTTPException(500, { message: error.message || 'Internal server error' })
  }
}
