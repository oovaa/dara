import express from 'express'
import { config } from 'dotenv'
import routes from './server/routes/index.js'
import globalErrorHandler from './server/middlewares/globalErrorHandler.js'
import morgan from 'morgan'

config()

const app = express()

app.use(express.json())
app.use('/api', routes)
app.use(globalErrorHandler)
app.use(morgan('dev'))

const PORT = process.env.PORT || 3000

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`)
})
