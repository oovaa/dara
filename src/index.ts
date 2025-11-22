import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { logger } from 'hono/logger'
import { secureHeaders } from 'hono/secure-headers'
import routes from './routes/index.js'
import { errorHandler } from './middlewares/errorHandler.js'
import { rateLimiter } from './middlewares/rateLimiter.js'

// Define environment bindings
type Bindings = {
  API_KEY: string
  NODE_ENV?: string
  FRONT_DOMAIN?: string
}

const app = new Hono<{ Bindings: Bindings }>()

// Middleware
app.use('*', logger())
app.use('*', secureHeaders())
app.use('*', cors())
app.use('*', rateLimiter())

// Routes
app.get('/z', (c) => c.json({ status: 200 }))

app.get('/', (c) => {
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Dara - AI Document Processor</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body { font-family: Arial, sans-serif; max-width: 800px; margin: 50px auto; padding: 20px; }
          h1 { color: #333; }
          .info { background: #f4f4f4; padding: 20px; border-radius: 8px; }
        </style>
      </head>
      <body>
        <h1>Dara - AI Document Processor</h1>
        <div class="info">
          <p>Welcome to Dara! This is an AI-powered document processing platform.</p>
          <p>API is available at /api endpoints</p>
          <p>Frontend domain: ${c.env?.FRONT_DOMAIN || 'Not configured'}</p>
        </div>
      </body>
    </html>
  `
  return c.html(html)
})

app.route('/api', routes)

// Error handler
app.onError(errorHandler)

export default app
