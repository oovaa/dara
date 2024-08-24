import  llm  from '../utils/model.js'
import { PromptTemplate } from '@langchain/core/prompts'
import { StringOutputParser } from '@langchain/core/output_parsers'
import { RunnableSequence } from '@langchain/core/runnables'
import { config } from 'dotenv'
config();


const qa_template = `
## Context:
{information}

## Task:
Extract At least 15 questions from the given Context and include their answers.
## Respond formatting:
Respond directly with valid json Object,
for example:
"""
    {{
        "questions": [
            {{
                "question": "<the question here>",
                "answer": "<the answer here>"
}},
            {{
                "question": "<the question here>",
                "answer": "<the answer here>"
}},
            ...
        ]
}}
"""
## Response:
`

const qa_prompt = PromptTemplate.fromTemplate(qa_template)

const chain = RunnableSequence.from([qa_prompt, llm])

const generateQs = async (info) => {
    const response = await chain.invoke({
    information: info
    })
    return response.content.replaceAll("```json","").replaceAll("```","")
}

export default generateQs
