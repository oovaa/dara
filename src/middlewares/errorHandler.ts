import type { Context } from 'hono'
import { HTTPException } from 'hono/http-exception'

export const errorHandler = (err: Error, c: Context) => {
  console.error('Error:', err)

  if (err instanceof HTTPException) {
    return c.json(
      {
        status: 'error',
        message: err.message,
      },
      err.status
    )
  }

  const isDev = c.env?.NODE_ENV === 'development'

  if (isDev) {
    return c.json(
      {
        status: 'error',
        message: err.message,
        stack: err.stack,
      },
      500
    )
  }

  return c.json(
    {
      status: 'error',
      message: 'Something went wrong!',
    },
    500
  )
}
