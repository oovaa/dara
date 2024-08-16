import Router from 'express'
import upload from '../middlewares/multerMiddleWare.js'
import generate from '../controllers/generateQsController.js'

const router = Router()

router.post('/', upload, generate)

export default router