import Router from 'express'
import QsRoutes from './generateQsRoute.js'
import SumRoutes from './generateSummaryRoute.js'
import chat from './answerQsRoute.js'

const router = Router()

router.use('/qs', QsRoutes)
router.use('/sum', SumRoutes)
router.use('/chat', chat)

export default router
