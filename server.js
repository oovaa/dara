import { serve } from '@hono/node-server'
import { config } from 'dotenv'
import app from './src/index.js'

// Load environment variables
config()

const port = parseInt(process.env.PORT || '3000')

console.log(`Server is running on port ${port}`)

serve({
  fetch: app.fetch,
  port
})
