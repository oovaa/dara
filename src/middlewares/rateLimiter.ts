import type { Context, Next } from 'hono'
import { HTTPException } from 'hono/http-exception'

// Simple in-memory rate limiter
const requestCounts = new Map<string, { count: number; resetTime: number }>()

export const rateLimiter = (windowMs = 15 * 60 * 1000, maxRequests = 100) => {
  return async (c: Context, next: Next) => {
    const ip = c.req.header('cf-connecting-ip') || c.req.header('x-forwarded-for') || 'unknown'
    const now = Date.now()

    const record = requestCounts.get(ip)

    if (!record || now > record.resetTime) {
      requestCounts.set(ip, {
        count: 1,
        resetTime: now + windowMs,
      })
      return next()
    }

    if (record.count >= maxRequests) {
      throw new HTTPException(429, { message: 'Too many requests' })
    }

    record.count++
    return next()
  }
}
