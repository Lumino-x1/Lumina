import { auth } from '@lumina/auth'
import { prisma } from '@lumina/db'
import { resendOtpSchema, verifyOtpSchema } from '@lumina/validators'
import type { Request, Response } from 'express'
import { redis } from '../../../config/config.redis'

// In-memory fallback map for cooldowns when running in tests or if Redis is bypassed
const memoryCooldownMap = new Map<string, number>()

export const OTP_COOLDOWN_SECONDS = 60

export async function clearOtpCooldown(email?: string) {
  if (email) {
    const emailNorm = email.toLowerCase()
    memoryCooldownMap.delete(emailNorm)
    try {
      await redis.del(`otp_cooldown:${emailNorm}`)
    } catch {
      // ignore
    }
  } else {
    memoryCooldownMap.clear()
  }
}

/**
 * Handle verification of the 6-digit email OTP.
 * Validates input, interacts atomically with Better Auth's authoritative verification table,
 * updates the user's authoritative emailVerified flag, and returns safe responses.
 */
export async function verifyOtpController(req: Request, res: Response) {
  const parseResult = verifyOtpSchema.safeParse(req.body)
  if (!parseResult.success) {
    return res.status(400).json({
      status: 'error',
      code: 'INVALID_INPUT',
      message: 'Invalid input. Please provide a valid email and 6-digit numeric code.',
      errors: parseResult.error.issues,
    })
  }

  const email = parseResult.data.email.toLowerCase()
  const otp = parseResult.data.otp

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email },
      select: { id: true, email: true, name: true, emailVerified: true },
    })

    if (!existingUser) {
      return res.status(400).json({
        code: 'USER_NOT_FOUND',
        message: 'No user found with the provided email address.',
      })
    }

    if (existingUser.emailVerified) {
      return res.status(200).json({
        success: true,
        alreadyVerified: true,
        message: 'Email address is already verified.',
        user: existingUser,
      })
    }

    // Call Better Auth authoritative verifyEmailOTP endpoint
    const result = await auth.api.verifyEmailOTP({
      body: {
        email,
        otp,
      },
      headers: req.headers as Record<string, string>,
    })

    // Fetch updated user to return clean, verified payload
    const updatedUser = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        name: true,
        emailVerified: true,
      },
    })

    return res.status(200).json({
      success: true,
      message: 'Email verified successfully.',
      token: (result as any)?.token || null,
      user: updatedUser ?? {
        id: existingUser.id,
        email: existingUser.email,
        name: existingUser.name,
        emailVerified: true,
      },
    })
  } catch (error: any) {
    const errorCode = error?.body?.code || error?.code || ''
    const errorMessage = error?.body?.message || error?.message || 'Verification failed.'

    if (errorCode === 'INVALID_OTP') {
      return res.status(400).json({
        code: 'INVALID_OTP',
        message: 'The verification code entered is incorrect.',
      })
    }

    if (errorCode === 'OTP_EXPIRED') {
      return res.status(400).json({
        code: 'OTP_EXPIRED',
        message: 'The verification code has expired. Please request a new code.',
      })
    }

    if (errorCode === 'TOO_MANY_ATTEMPTS') {
      return res.status(429).json({
        code: 'TOO_MANY_ATTEMPTS',
        message: 'Too many failed verification attempts. Please request a new code.',
      })
    }

    if (errorCode === 'USER_NOT_FOUND') {
      return res.status(400).json({
        code: 'USER_NOT_FOUND',
        message: 'User not found.',
      })
    }

    return res.status(400).json({
      code: errorCode || 'VERIFICATION_FAILED',
      message: errorMessage,
    })
  }
}

/**
 * Handle resending of verification OTP with rate limiting and 60-second cooldown.
 * Protects against email enumeration and invalidates any previous pending OTP.
 */
export async function resendOtpController(req: Request, res: Response) {
  const parseResult = resendOtpSchema.safeParse(req.body)
  if (!parseResult.success) {
    return res.status(400).json({
      status: 'error',
      code: 'INVALID_INPUT',
      message: 'Please provide a valid email address.',
    })
  }

  const email = parseResult.data.email.toLowerCase()
  const now = Date.now()

  // 1. Enforce 60-second resend cooldown
  const cooldownKey = `otp_cooldown:${email}`
  let cooldownActive = false
  let remainingSeconds = 0

  try {
    const ttlStr = await redis.get(cooldownKey)
    if (ttlStr) {
      const expiresAt = parseInt(ttlStr, 10)
      if (expiresAt > now) {
        cooldownActive = true
        remainingSeconds = Math.ceil((expiresAt - now) / 1000)
      }
    }
  } catch {
    // Redis unavailable, fallback to memory
    const lastSent = memoryCooldownMap.get(email)
    if (lastSent && now - lastSent < OTP_COOLDOWN_SECONDS * 1000) {
      cooldownActive = true
      remainingSeconds = Math.ceil((OTP_COOLDOWN_SECONDS * 1000 - (now - lastSent)) / 1000)
    }
  }
  // Also check database verification record timestamp if Redis/memory did not trigger
  if (!cooldownActive) {
    try {
      const latestVerification = await prisma.authVerification.findFirst({
        where: { identifier: `email-verification-otp-${email}` },
        orderBy: { createdAt: 'desc' },
      })
      if (latestVerification) {
        const lastOtpTime = Math.max(
          latestVerification.createdAt.getTime(),
          latestVerification.updatedAt ? latestVerification.updatedAt.getTime() : 0
        )
        const elapsedMs = now - lastOtpTime
        if (elapsedMs < OTP_COOLDOWN_SECONDS * 1000) {
          cooldownActive = true
          remainingSeconds = Math.ceil((OTP_COOLDOWN_SECONDS * 1000 - elapsedMs) / 1000)
        }
      }
    } catch {
      // ignore database cooldown lookup errors
    }
  }

  if (cooldownActive) {
    return res.status(429).json({
      code: 'COOLDOWN_ACTIVE',
      message: `Please wait ${remainingSeconds} seconds before requesting another verification code.`,
      retryAfter: remainingSeconds,
    })
  }

  // 2. Lookup user to avoid enumeration leaking while ensuring we only send to unverified users
  const user = await prisma.user.findUnique({
    where: { email },
    select: { id: true, email: true, emailVerified: true },
  })

  // Prevent email enumeration: return standard message even if account doesn't exist
  if (!user) {
    return res.status(200).json({
      success: true,
      message: 'If an account exists with this email, a verification code has been sent.',
    })
  }

  if (user.emailVerified) {
    return res.status(200).json({
      success: true,
      alreadyVerified: true,
      message: 'Email address is already verified.',
    })
  }

  // 3. Invalidate previous outstanding OTP records for this email
  const identifier = `email-verification-otp-${email}`
  try {
    await prisma.authVerification.deleteMany({
      where: { identifier },
    })
  } catch (err) {
    console.warn(`[Auth] Note: cleanup of existing verification records for ${identifier}:`, err)
  }

  // 4. Record new cooldown (60 seconds)
  const expiresAt = now + OTP_COOLDOWN_SECONDS * 1000
  try {
    await redis.set(cooldownKey, String(expiresAt))
  } catch {
    // ignore
  }
  memoryCooldownMap.set(email, now)

  // 5. Generate and dispatch replacement OTP via Better Auth
  try {
    await auth.api.sendVerificationOTP({
      body: {
        email,
        type: 'email-verification',
      },
      headers: req.headers as Record<string, string>,
    })

    return res.status(200).json({
      success: true,
      message: 'Verification code sent.',
    })
  } catch (err: any) {
    console.error('[Auth] Error sending replacement verification OTP:', err)
    return res.status(500).json({
      code: 'DELIVERY_FAILED',
      message: 'Failed to deliver verification email. Please try again later.',
    })
  }
}
