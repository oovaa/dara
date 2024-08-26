import { config } from 'dotenv'
config()

import express from 'express'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import { engine } from 'express-handlebars'
import compression from 'compression'
import cors from 'cors'
import routes from './server/routes/index.js'
import globalErrorHandler from './server/middlewares/globalErrorHandler.js'
import morgan from 'morgan'

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
})

const corsOptions = {
  origin: `${process.env.FRONT_DOMAIN}`,
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

const app = express()
app.use(cors(corsOptions))
app.use(compression())
app.use(helmet())
app.use(limiter)
app.use(express.json())
app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set('views', './views')
app.use('/api', routes)
app.use(globalErrorHandler)
app.use(morgan('dev'))
app.get('/', (req, res) => {
  res.render('home', { DARAFRONT: process.env.FRONT_DOMAIN })
})
const PORT = process.env.PORT || 3000

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`)
})
