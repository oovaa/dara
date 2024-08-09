import { ChatCohere } from '@langchain/cohere'
import { StringOutputParser } from '@langchain/core/output_parsers'
import { RunnableSequence } from '@langchain/core/runnables'

import { summarize_prompt } from './prompts.js'
import { parseTEXT } from './parser.js'

// Initialize the language model
const llm = new ChatCohere({
  model: 'command-r-plus',
  temperature: 0,
  maxRetries: 2
})

// Create a runnable sequence for summarization
const summarize_chain = RunnableSequence.from([summarize_prompt, llm, new StringOutputParser()])

// Function to get summarization result
export async function getSummarizeRes(info) {
  const res = await summarize_chain.invoke({
    information: info
  })
  return res
}

// For testing
async function testSummarization() {
  const data = await parseTEXT('./story.txt')
  const ans = await summarize_chain.invoke({
    information: data
  })
  console.log(ans)
}

// Uncomment to run the test
testSummarization()
