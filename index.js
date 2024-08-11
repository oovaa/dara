import express from 'express'
import { config } from 'dotenv'
import routes from './server/Routes/index.js'

config()

const app = express()

app.use(express.json())
app.use('api', routes)

const PORT = process.env.PORT || 3000

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`)
})