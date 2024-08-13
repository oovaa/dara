import generateQs from "../../tools/generateQs.js";
import { parser } from "../../utils/parser.js";
import expressAsyncHandler from "express-async-handler";
import ApiError from "../utils/ApiError.js";

const generate = expressAsyncHandler(async (req, res, next) => {
    if (!req.file) {
        next(
            new ApiError("you must provide a file", 400)
        )
    }
    try {
       const docs = await parser(req.file.path)
       const Qs = await generateQs(docs)

       return res.status(200).json({"result": Qs})
    } catch (err) {
       return next (
        new ApiError(err.message, 500)
       ) 
    }
})

export default generate 