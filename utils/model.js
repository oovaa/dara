import { ChatCohere } from '@langchain/cohere';
import { config } from 'dotenv';
config();

const apiKey = process.env.API_KEY;

const llm = new ChatCohere({
    apiKey,
    model: 'command-r-plus',
    temperature: 0,
    maxRetries: 2
});

export default llm