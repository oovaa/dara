import type { Context } from 'hono'
import { HTTPException } from 'hono/http-exception'
import answerQs from '../../tools/agent.js'

export const answerQuestion = async (c: Context) => {
  try {
    const body = await c.req.json()
    const { question, session } = body

    if (!question || !session) {
      throw new HTTPException(400, { message: 'Bad Request: question and session are required' })
    }

    // Note: session is received but not currently used by the agent
    // The agent uses in-memory BufferMemory for conversation history
    const answer = await answerQs(question)
    
    return c.json({ answer: answer.output })
  } catch (err) {
    if (err instanceof HTTPException) {
      throw err
    }
    const error = err as Error
    console.error('Answer generation error:', error)
    throw new HTTPException(500, { message: error.message || 'Internal server error' })
  }
}
