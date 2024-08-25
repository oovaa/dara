import answerQs from '../../tools/agent.js'
import expressAsyncHandler from 'express-async-handler'
import ApiError from '../utils/ApiError.js'

const answerQuestion = expressAsyncHandler(async (req, res, next) => {
  const {question, session} = req.body
  if (!question || !session) {
    next(new ApiError('Bad Request', 400))
  }
  try {
    const answer = await answerQs(question, session)
    return res.status(200).json({answer: answer.output})
  } catch (err) {
    return next(new ApiError(err.message, 500))
  }
})

export default answerQuestion
