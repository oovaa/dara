import  llm  from '../utils/model.js'
import { PromptTemplate } from '@langchain/core/prompts'
import { StringOutputParser } from '@langchain/core/output_parsers'
import { RunnableSequence } from '@langchain/core/runnables'
import { config } from 'dotenv'
config();


const qa_template = `You are a freindly and helpful AI assistant. Create a list of challenging, open-ended , mcq, questions based on the following infromation:
information: {information}.

# You should provide atleast 15 mcq, and 5 challenging/open-ended questions.
# You should provide the answers of all the questions in order at the end.
# Respond in JSON with "questions", and "answers" keys.
# You have to generate questions with the language of the information provided.
`

const qa_prompt = PromptTemplate.fromTemplate(qa_template)

const chain = RunnableSequence.from([qa_prompt, llm, new StringOutputParser()])

const generateQs = async (info) => {
    const response = await chain.invoke({
    information: info
    })
    return response
}

export default generateQs