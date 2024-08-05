import { PromptTemplate } from '@langchain/core/prompts'
import { ChatCohere } from '@langchain/cohere'
import { StringOutputParser } from '@langchain/core/output_parsers'
import { RunnableSequence } from '@langchain/core/runnables'

const q_template = `
    You are a helpful assistant that answers questions. Please ask me anything.
    question: {question}
`

const q_prompt = PromptTemplate.fromTemplate(q_template)

const llm = new ChatCohere({
  model: 'command-r-plus',
  temperature: 0,
  maxRetries: 2,
})

const chain = RunnableSequence.from([q_prompt, llm, new StringOutputParser()])

let ans = chain.invoke({
  question: 'hi there',
})

console.log(await ans)
