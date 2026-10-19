import apiRouter from '../../../apps/api/src/api/routes'
import authRouter from '../../../apps/api/src/api/auth/auth.routes'
import recommendationRouter from '../../../apps/api/src/api/recommendation/recommendation.routes'
import { auth } from '@auth/index'
import { toNodeHandler } from 'better-auth/node'
import express from 'express'

export function createTestApp() {
  const app = express()

  app.use(express.json())

  app.use('/api/auth', authRouter)
  app.all('/api/auth/*path', toNodeHandler(auth))
  app.use('/api', apiRouter)
  app.use(['/recommendation', '/api/recommendation'], recommendationRouter)

  app.get('/ok', (_req, res) => {
    res.status(200).json({ message: 'OK' })
  })

  return app
}
