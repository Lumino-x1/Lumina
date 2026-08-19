import { redis } from './config/config.redis.ts'
import chatRoutes from './modules/chat/chat.router.ts'
import commentsRouter from './modules/comments/comments.router.ts'
import friendsRouter from './modules/friends/friends.router.ts'
import leaderboardRouter from './modules/leaderboard/leaderboard.router.ts'
import leetcodeRouter from './modules/leetcode/leetcode.router.ts'
import postsRouter from './modules/posts/posts.router.ts'
import { profileRouter } from './modules/profile/profile.router.ts'
import videoRouter from './modules/video/video.router.ts'
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
  app.use(express.json({ limit: '1mb' }))

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
  app.use('/api/profile', profileRouter)
  app.use('/api/friends', friendsRouter)
  app.use('/api/posts', postsRouter)
  app.use('/api/chat', chatRoutes)
  app.use('/api/leaderboard', leaderboardRouter)
  app.use('/api/leetcode', leetcodeRouter)
  app.use('/api/video', videoRouter)
  app.use('/api/comments', commentsRouter)

  app.get('/ok', (_req: Request, res: Response) => {
    res.status(200).json({ message: MSG_OK })
  })

  app.get('/health', (_req: Request, res: Response) => {
    res.status(200).json({
      status: 'ok',
      service: 'api',
      uptimeSeconds: Math.floor(process.uptime()),
      timestamp: new Date().toISOString(),
    })
  })

  app.get('/ready', async (_req: Request, res: Response) => {
    const checks: Record<string, string> = {
      database: 'unknown',
      redis: 'unknown',
    }
    let isReady = true

    try {
      await prisma.$queryRaw`SELECT 1`
      checks.database = 'ok'
    } catch {
      checks.database = 'unavailable'
      isReady = false
    }

    try {
      const redisPong = await redis.ping()
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
