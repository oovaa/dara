import Router from 'express'
import answerQuestion from '../controllers/answerQsController.js'

const router = Router()

router.post('/', answerQuestion)

export default router
