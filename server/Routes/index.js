import Router from 'express';
import QsRoutes from './generateQsRoute.js'

const router = Router();

router.use('/qs', QsRoutes);

export default router;