import { PromptTemplate } from '@langchain/core/prompts'
import { ChatCohere } from '@langchain/cohere'
import { StringOutputParser } from '@langchain/core/output_parsers'
import { RunnableSequence } from '@langchain/core/runnables'

import { summarize_prompt } from './prompts.js'
import { parseTEXT } from './parser.js'

const llm = new ChatCohere({
  model: 'command-r-plus',
  temperature: 0,
  maxRetries: 2
})

const data = await parseTEXT('./story.txt')

const chain = RunnableSequence.from([summarize_prompt, llm, new StringOutputParser()])

// uncomment adn run to test
// let ans = chain.invoke({
//   information: data
// })

// console.log(await ans)
