import Router from 'express'
import upload from '../Middlewares/multerMiddleWare.js'
import generate from '../Controllers/generateSummaryController.js'

const router = Router()

router.post('/', upload, generate)

export default router
