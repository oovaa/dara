import Router from 'express'
import QsRoutes from './generateQsRoute.js'
import SumRoutes from './generateSummaryRoute.js'

const router = Router()

router.use('/qs', QsRoutes)
router.use('/sum', SumRoutes)

export default router
