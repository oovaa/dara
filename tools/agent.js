import dotenv from 'dotenv'
dotenv.config()
import {RedisChatMessageHistory} from '@langchain/community/stores/message/ioredis'
import { BufferMemory } from 'langchain/memory'
import {ChatPromptTemplate, MessagesPlaceholder} from '@langchain/core/prompts'
import { formatToOpenAITool } from 'langchain/tools'
import {RunnableSequence} from '@langchain/core/runnables'
import { AgentExecutor } from 'langchain/agents'
import {ChatOpenAI} from '@langchain/openai'
import {formatToOpenAIToolMessages} from 'langchain/agents/format_scratchpad/openai_tools'
import {OpenAIToolsAgentOutputParser} from 'langchain/agents/openai/output_parser'

const model = new ChatOpenAI({
  temperature: 0.6,
  modelName: 'gpt-3.5-turbo-1106',
  maxConcurrency: 5,
  maxRetries: 10
})
const tools = []
// Convert to OpenAI tool format
const modelWithTools = model.bind({ tools: tools.map(formatToOpenAITool) })

const sysPrompt = `Your name is Dara, You are a joyful girl (Real Girl), your job is to answer user academic questions.
# NEVER mansions that you are a computer program,robot, virtual assistant or AI Asistant.

Answer user questions kindly using the tools at your disposal.
`
const mkMemory = (session = new Date().toISOString()) =>
  new BufferMemory({
    memoryKey: 'history',
    inputKey: 'question',
    outputKey: 'answer',
    chatHistory: new RedisChatMessageHistory({
      sessionId: session,
      sessionTTL: 60 * 30, // 5 minutes, omit this parameter to make sessions never expire
      url: process.env.REDIS_URL
    }),
    returnMessages: true
  })

let memory = mkMemory()

const prompt = ChatPromptTemplate.fromMessages([
  ['ai', sysPrompt],
  new MessagesPlaceholder("chat_history"),
  ['human', '{input}'],
  new MessagesPlaceholder('agent_scratchpad')
])

const runnableAgent = RunnableSequence.from([
  {
    input: (i) => i.input,
    agent_scratchpad: (i) => formatToOpenAIToolMessages(i.steps),
    // Load memory here
    chat_history: async () => {
      const { history } = await memory.loadMemoryVariables({})
      return history
    }
  },
  prompt,
  modelWithTools,
  new OpenAIToolsAgentOutputParser()
]).withConfig({ runName: 'OpenAIToolsAgent' })

const executor = AgentExecutor.fromAgentAndTools({
  agent: runnableAgent,
  tools,
  //verbose:true
})


const answerQuestion = async (question, session) => {
  memory = mkMemory(session)
  const res = await executor.invoke({
    input: question
  })

  // Save the result and initial input to memory
  await memory.saveContext({ question: question }, { answer: res.output })
  return res
}

export default answerQuestion
