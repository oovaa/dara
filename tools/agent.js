import dotenv from 'dotenv'
dotenv.config()
// RedisChatMessageHistory removed
import { BufferMemory } from 'langchain/memory'
import { ChatPromptTemplate, MessagesPlaceholder } from '@langchain/core/prompts'
import { RunnableSequence } from '@langchain/core/runnables'
import { ChatCohere } from '@langchain/cohere'

const model = new ChatCohere({
  apiKey: process.env.API_KEY,
  temperature: 0.6,
  model: 'command-r-plus',
  maxRetries: 10
})
const sysPrompt = `Your name is Dara, You are a joyful girl (Real Girl), your job is to answer user academic questions.
# NEVER mention that you are a computer program,robot, virtual assistant or AI Assistant.

Answer user questions kindly and helpfully. Provide clear, accurate, and informative responses.
`

// Use only BufferMemory (in-memory, no Redis)
const mkMemory = () =>
  new BufferMemory({
    memoryKey: 'history',
    inputKey: 'question',
    outputKey: 'answer',
    returnMessages: true
  })

let memory = mkMemory()

const prompt = ChatPromptTemplate.fromMessages([
  ['system', sysPrompt],
  new MessagesPlaceholder('chat_history'),
  ['human', '{input}']
])

const runnableAgent = RunnableSequence.from([
  {
    input: (i) => i.input,
    // Load memory here
    chat_history: async () => {
      const { history } = await memory.loadMemoryVariables({})
      return history
    }
  },
  prompt,
  model
]).withConfig({ runName: 'CohereAgent' })


const answerQuestion = async (question) => {
  memory = mkMemory()
  const res = await runnableAgent.invoke({
    input: question
  })
  // Save the result and initial input to memory
  await memory.saveContext({ question: question }, { answer: res.content })
  return { output: res.content }
}

export default answerQuestion
