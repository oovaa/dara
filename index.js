import { config } from 'dotenv'
config()

import express from 'express'
import {engine} from 'express-handlebars'
import compression from 'compression'
import routes from './server/routes/index.js'
import globalErrorHandler from './server/middlewares/globalErrorHandler.js'
import morgan from 'morgan'


const app = express()
app.use(compression())
app.use(express.json())
app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set('views', './views')
app.use('/api', routes)
app.use(globalErrorHandler)
app.use(morgan('dev'))
app.get('/', (req, res) => {
  res.render('home', {DARAFRONT: process.env.FRONT_DOMAIN})
})
const PORT = process.env.PORT || 3000

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`)
})
