import generateQs from "../../tools/generateQs.js";
import Router from 'express';
import upload from '../Middlewares/multerMiddleWare.js'
import generate from '../Controllers/generateQsController.js'

const router = Router();

router.post('/', upload, generate)

export default  router 