import llm from '../utils/model.js'
import { PromptTemplate } from '@langchain/core/prompts'
import { StringOutputParser } from '@langchain/core/output_parsers'
import { RunnableSequence } from '@langchain/core/runnables'
import { config } from 'dotenv'
config()

const summarize_template = `You are a friendly and helpful AI assistant. Create a concise summary of the provided information.
{information}
Summary: `

const summarize_prompt = PromptTemplate.fromTemplate(summarize_template)

const summarize_chain = RunnableSequence.from([summarize_prompt, llm, new StringOutputParser()])

// Function to get summarization result
async function getSummarizeRes(info) {
  const res = await summarize_chain.invoke({
    information: info
  })
  return res
}

export default getSummarizeRes
