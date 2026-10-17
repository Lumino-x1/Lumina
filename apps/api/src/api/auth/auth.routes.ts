import { Router } from 'express'
import rateLimit from 'express-rate-limit'
import { resendOtpController, verifyOtpController } from './auth.controller'

const authRouter = Router()

const verifyOtpLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 25,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  skip: () => process.env.NODE_ENV === 'test',
  message: {
    code: 'RATE_LIMIT_EXCEEDED',
    message: 'Too many verification attempts, please try again later.',
  },
})

const resendOtpLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  skip: () => process.env.NODE_ENV === 'test',
  message: {
    code: 'RATE_LIMIT_EXCEEDED',
    message: 'Too many code resend requests, please try again later.',
  },
})

authRouter.post('/verify-otp', verifyOtpLimiter, verifyOtpController)
authRouter.post('/resend-otp', resendOtpLimiter, resendOtpController)

export default authRouter
