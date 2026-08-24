import { requireAuth } from '../../middleware.ts'
import * as videoController from './video.handler.ts'
import { Router } from 'express'
import rateLimit from 'express-rate-limit'

const router = Router()

const tokenLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 30,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  skip: () => process.env.NODE_ENV === 'test',
  message: { status: 'error', message: 'Too many video token requests, please try again later.' },
})

const callLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 20,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  skip: () => process.env.NODE_ENV === 'test',
  message: { status: 'error', message: 'Too many call creation attempts, please try again later.' },
})

router.post('/token', requireAuth, tokenLimiter, videoController.getVideoToken)
router.post('/calls', requireAuth, callLimiter, videoController.createCall)
router.get('/calls/history', requireAuth, videoController.getCallHistory)
router.get('/calls/:callId', requireAuth, videoController.getCallDetails)
router.post('/calls/:callId/join', requireAuth, videoController.joinCall)
router.post('/calls/:callId/respond', requireAuth, videoController.respondToInvite)
router.post('/calls/:callId/end', requireAuth, videoController.endCall)

export default router
