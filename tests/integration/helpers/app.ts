import apiRouter from '../../../apps/api/src/api/routes'
import { auth } from '@auth/index'
import { toNodeHandler } from 'better-auth/node'
import express from 'express'

export function createTestApp() {
  const app = express()

  app.use(express.json())

  app.all('/api/auth/*path', toNodeHandler(auth))
  app.use('/api', apiRouter)

  app.get('/ok', (_req, res) => {
    res.status(200).json({ message: 'OK' })
  })

  return app
}
