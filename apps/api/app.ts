import { redis } from './config/config.redis.ts'
import apiRouter from './src/api/routes.ts'
import { auth } from '@lumina/auth'
import { MSG_OK } from '@lumina/constants'
import { prisma } from '@lumina/db'
import {
  errorTrackingMiddleware,
  getMetricsContentType,
  getMetricsText,
  httpLoggerMiddleware,
  logger,
} from '@lumina/observability'
import { toNodeHandler } from 'better-auth/node'
import cors from 'cors'
import express from 'express'
import rateLimit from 'express-rate-limit'
import type { NextFunction, Request, Response } from 'express'
import mediaRouter from './src/api/media/media.router.ts'
import feedRouter from './src/api/feed/feed.routes.ts'

export function createApp() {
  const app = express()

  const globalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 300,
    standardHeaders: 'draft-7',
    legacyHeaders: false,
    skip: (req) =>
      process.env.NODE_ENV === 'test' ||
      req.path === '/health' ||
      req.path === '/ready' ||
      req.path === '/ok' ||
      req.path === '/metrics',
    message: {
      status: 'error',
      message: 'Too many requests from this IP, please try again later.',
    },
  })

  app.use(globalLimiter)
  app.use(httpLoggerMiddleware('api'))
  app.use(express.json({ limit: '25mb' }))
  app.use(express.urlencoded({ limit: '25mb', extended: true }))

  app.use((req: Request, res: Response, next: NextFunction) => {
    const isStateChanging = ['POST', 'PUT', 'PATCH', 'DELETE'].includes(req.method)
    if (isStateChanging) {
      const origin = req.headers.origin || req.headers.referer
      const allowedOrigin = process.env.CORS_ORIGIN || 'http://localhost:5173'
      if (origin && !origin.startsWith(allowedOrigin) && !origin.startsWith('http://localhost:')) {
        return res.status(403).json({ message: 'CSRF protection: Invalid request origin' })
      }
    }
    next()
  })

  app.use(
    cors({
      origin: process.env.CORS_ORIGIN ?? 'http://localhost:5173',
      credentials: true,
    })
  )


  app.all('/api/auth/*path', toNodeHandler(auth))
  app.use('/api', apiRouter)
  app.use('/api/media', mediaRouter)
  app.use('/api/feed' , feedRouter);


  app.get('/health', (_req: Request, res: Response) => {
    res.status(200).json({
      status: 'ok',
      service: 'api',
      uptimeSeconds: Math.floor(process.uptime()),
      timestamp: new Date().toISOString(),
    })
  })

  function withTimeout<T>(promise: Promise<T>, timeoutMs: number): Promise<T> {
    return Promise.race([
      promise,
      new Promise<T>((_, reject) => setTimeout(() => reject(new Error('Timeout')), timeoutMs)),
    ])
  }

  app.get('/ready', async (_req: Request, res: Response) => {
    const checks: Record<string, string> = {
      database: 'unknown',
      redis: 'unknown',
    }
    let isReady = true

    try {
      await withTimeout(prisma.$queryRaw`SELECT 1`, 2000)
      checks.database = 'ok'
    } catch {
      checks.database = 'unavailable'
      isReady = false
    }

    try {
      const redisPong = await withTimeout(redis.ping(), 2000)
      checks.redis = redisPong === 'PONG' ? 'ok' : 'unavailable'
      if (checks.redis !== 'ok') {
        isReady = false
      }
    } catch {
      checks.redis = 'unavailable'
      isReady = false
    }

    res.status(isReady ? 200 : 503).json({
      status: isReady ? 'ready' : 'unavailable',
      service: 'api',
      timestamp: new Date().toISOString(),
      checks,
    })
  })

  app.get('/metrics', async (_req: Request, res: Response) => {
    try {
      const metrics = await getMetricsText()
      res.setHeader('Content-Type', getMetricsContentType())
      res.status(200).send(metrics)
    } catch (error) {
      logger.error('Failed to generate Prometheus metrics', { metadata: { error: String(error) } })
      res.status(500).send('Failed to generate metrics')
    }
  })

  app.use(errorTrackingMiddleware())
  return app
}
