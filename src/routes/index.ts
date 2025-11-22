import { Hono } from 'hono'
import { generateSummary } from '../controllers/generateSummaryController.js'
import { generateQuestions } from '../controllers/generateQuestionsController.js'
import { answerQuestion } from '../controllers/answerQuestionController.js'

const api = new Hono()

api.post('/sum', generateSummary)
api.post('/qs', generateQuestions)
api.post('/chat', answerQuestion)

export default api
