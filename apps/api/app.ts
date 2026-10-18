import { redis } from './config/config.redis.ts';
import authRouter from './src/api/auth/auth.routes.ts';
import commentsRouter from './src/api/comments/comments.routes.ts';
import feedRouter from './src/api/feed/feed.routes.ts';
import mediaRouter from './src/api/media/media.router.ts';
import postsRouter from './src/api/posts/posts.routes.ts';
import apiRouter from './src/api/routes.ts';
import { auth } from '@lumina/auth';
import { MSG_OK } from '@lumina/constants';
import { prisma } from '@lumina/db';
import { errorTrackingMiddleware, getMetricsContentType, getMetricsText, httpLoggerMiddleware, logger } from '@lumina/observability';
import { toNodeHandler } from 'better-auth/node';
import cors from 'cors';
import express from 'express';
import rateLimit from 'express-rate-limit';



import type { NextFunction, Request, Response } from 'express';





export function createApp() {
  const app = express()

  // Trust first proxy hop (Vite dev server / ngrok)
  app.set('trust proxy', 1)

  const globalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 300,
    standardHeaders: 'draft-7',
    legacyHeaders: false,
    skip: (req) =>
      process.env.NODE_ENV === 'test' ||
      req.path === '/health' ||
      req.path === '/api/health' ||
      req.path === '/ready' ||
      req.path === '/api/ready' ||
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

  function isAllowedOrigin(origin?: string | null): boolean {
    if (!origin) return true
    try {
      const url = new URL(origin)
      const hostname = url.hostname.toLowerCase()
      if (hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '::1') {
        return true
      }
      if (
        hostname.endsWith('.vercel.app') ||
        hostname.endsWith('.ngrok-free.dev') ||
        hostname.endsWith('.ngrok.app') ||
        hostname === 'untolerative-len-rumblingly.ngrok-free.dev'
      ) {
        return true
      }
      const envOrigins = (process.env.CORS_ORIGIN || '')
        .split(',')
        .map((s) => s.trim().toLowerCase())
        .filter(Boolean)
      if (
        envOrigins.some((allowed) => {
          try {
            return (
              hostname === new URL(allowed).hostname.toLowerCase() ||
              origin.toLowerCase().startsWith(allowed)
            )
          } catch {
            return origin.toLowerCase().startsWith(allowed)
          }
        })
      ) {
        return true
      }
    } catch {
      if (origin.startsWith('http://localhost:') || origin.startsWith('http://127.0.0.1:')) {
        return true
      }
    }
    return false
  }

  // 1. CORS middleware registered before routes and origin checks
  app.use(
    cors({
      origin: (origin, callback) => {
        if (!origin || isAllowedOrigin(origin)) {
          return callback(null, true)
        }
        return callback(null, false)
      },
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
      allowedHeaders: [
        'Content-Type',
        'Authorization',
        'Accept',
        'Origin',
        'X-Requested-With',
        'ngrok-skip-browser-warning',
      ],
      exposedHeaders: ['set-cookie'],
    })
  )

  // 2. State-changing CSRF protection middleware
  app.use((req: Request, res: Response, next: NextFunction) => {
    const isStateChanging = ['POST', 'PUT', 'PATCH', 'DELETE'].includes(req.method)
    if (isStateChanging) {
      const origin =
        req.headers.origin ||
        (req.headers.referer ? new URL(req.headers.referer).origin : undefined)
      if (origin && !isAllowedOrigin(origin)) {
        return res.status(403).json({ message: 'CSRF protection: Invalid request origin' })
      }
    }
    next()
  })

  app.use('/api/auth', authRouter)
  app.all('/api/auth/*path', toNodeHandler(auth))
  app.use('/api', apiRouter)
  app.use('/posts', postsRouter)
  app.use('/comments', commentsRouter)
  app.use('/api/media', mediaRouter)
  app.use('/api/feed' , feedRouter);

  app.get(['/health', '/api/health'], (_req: Request, res: Response) => {
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

  app.get(['/ready', '/api/ready'], async (_req: Request, res: Response) => {
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