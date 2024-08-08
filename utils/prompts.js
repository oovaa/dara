import { PromptTemplate } from '@langchain/core/prompts'

const summarize_template = `You are a friendly and helpful AI assistant. Create a concise summary of the provided information.

information: {information}
Summary: `

const summarize_prompt = PromptTemplate.fromTemplate(summarize_template)

export { summarize_prompt }
