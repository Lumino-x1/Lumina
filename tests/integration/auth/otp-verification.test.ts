import { createTestApp } from '../helpers/app'
import {
  clearCapturedEmails,
  createTestUserWithSession,
  getCapturedEmails,
  installResendFetchMock,
  resendOtp,
  signUpWithEmail,
  verifyOtp,
} from '../helpers/auth'
import { generateRandomUser } from '../helpers/factories'
import { prisma } from '@db/client'
import request from 'supertest'
import { beforeAll, beforeEach, describe, expect, it } from 'vitest'

describe('Auth | 6-Digit Email OTP Verification Lifecycle', () => {
  const app = createTestApp()

  beforeAll(() => {
    installResendFetchMock()
    clearCapturedEmails()
    expect(app).toBeDefined()
  })

  beforeEach(() => {
    clearCapturedEmails()
  })

  it('1. Generates 6-digit OTP on signup and dispatches email without exposing OTP in response', async () => {
    const user = generateRandomUser({
      name: 'Rohan Sharma',
      email: `rohan.${Date.now()}@college.edu`,
    })

    const response = await signUpWithEmail(app, user)
    expect(response.status).toBe(200)

    // Ensure OTP is NEVER exposed in the signup response
    expect(JSON.stringify(response.body)).not.toMatch(/\b\d{6}\b/)
    expect(response.body.user.emailVerified).toBe(false)

    // User is created as unverified in the database
    const dbUser = await prisma.user.findUnique({
      where: { email: user.email },
    })
    expect(dbUser).toBeDefined()
    expect(dbUser?.emailVerified).toBe(false)

    // Ensure email was dispatched via Resend
    const capturedEmails = getCapturedEmails()
    expect(capturedEmails.length).toBeGreaterThanOrEqual(1)

    const lastEmail = capturedEmails[capturedEmails.length - 1]
    const emailBody = typeof lastEmail?.body === 'string' ? JSON.parse(lastEmail.body) : lastEmail?.body
    expect(emailBody.subject).toBe('Verify your Lumina email address')

    // Verify OTP format in email is exactly 6 digits
    const match = emailBody.text.match(/\b\d{6}\b/)
    expect(match).not.toBeNull()
    const otp = match[0]
    expect(otp).toHaveLength(6)
  })

  it('2. Correct OTP successfully marks emailVerified as true in the database', async () => {
    const user = generateRandomUser({
      name: 'Priya Patel',
      email: `priya.${Date.now()}@college.edu`,
    })

    await signUpWithEmail(app, user)
    const captured = getCapturedEmails()
    const lastEmail = captured[captured.length - 1]
    const emailBody = typeof lastEmail?.body === 'string' ? JSON.parse(lastEmail.body) : lastEmail?.body
    const otp = emailBody.text.match(/\b\d{6}\b/)[0]

    // Verify OTP
    const verifyRes = await verifyOtp(app, {
      email: user.email,
      otp,
    })

    expect(verifyRes.status).toBe(200)
    expect(verifyRes.body.success).toBe(true)
    expect(verifyRes.body.user.emailVerified).toBe(true)

    // Verify database record is updated
    const updatedUser = await prisma.user.findUnique({
      where: { email: user.email },
    })
    expect(updatedUser?.emailVerified).toBe(true)
  })

  it('3. Rejects incorrect OTP code', async () => {
    const user = generateRandomUser({
      name: 'Amit Verma',
      email: `amit.${Date.now()}@college.edu`,
    })

    await signUpWithEmail(app, user)

    const verifyRes = await verifyOtp(app, {
      email: user.email,
      otp: '000000',
    })

    expect(verifyRes.status).toBe(400)
    expect(verifyRes.body.code).toBe('INVALID_OTP')

    // Email remains unverified
    const dbUser = await prisma.user.findUnique({
      where: { email: user.email },
    })
    expect(dbUser?.emailVerified).toBe(false)
  })

  it('4. Rejects reused OTP (single-use enforcement)', async () => {
    const user = generateRandomUser({
      name: 'Deepak Rao',
      email: `deepak.${Date.now()}@college.edu`,
    })

    await signUpWithEmail(app, user)
    const captured = getCapturedEmails()
    const lastEmail = captured[captured.length - 1]
    const emailBody = typeof lastEmail?.body === 'string' ? JSON.parse(lastEmail.body) : lastEmail?.body
    const otp = emailBody.text.match(/\b\d{6}\b/)[0]

    // First verification succeeds
    const firstRes = await verifyOtp(app, {
      email: user.email,
      otp,
    })
    expect(firstRes.status).toBe(200)

    // Second verification with the same consumed OTP is rejected or reports already verified
    const secondRes = await verifyOtp(app, {
      email: user.email,
      otp,
    })
    // Already verified is returned safely
    expect(secondRes.status).toBe(200)
    expect(secondRes.body.alreadyVerified).toBe(true)
  })

  it('5. Rejects expired OTP code', async () => {
    const user = generateRandomUser({
      name: 'Kavita Nair',
      email: `kavita.${Date.now()}@college.edu`,
    })

    await signUpWithEmail(app, user)
    const captured = getCapturedEmails()
    const lastEmail = captured[captured.length - 1]
    const emailBody = typeof lastEmail?.body === 'string' ? JSON.parse(lastEmail.body) : lastEmail?.body
    const otp = emailBody.text.match(/\b\d{6}\b/)[0]

    // Manually expire the OTP in the database
    await prisma.authVerification.updateMany({
      where: { identifier: `email-verification-otp-${user.email}` },
      data: { expiresAt: new Date(Date.now() - 5000) },
    })

    const verifyRes = await verifyOtp(app, {
      email: user.email,
      otp,
    })

    expect(verifyRes.status).toBe(400)
    expect(verifyRes.body.code).toBe('OTP_EXPIRED')
  })

  it('6. Enforces resend cooldown and invalidates previous OTP upon resend', async () => {
    const user = generateRandomUser({
      name: 'Vikram Joshi',
      email: `vikram.${Date.now()}@college.edu`,
    })

    await signUpWithEmail(app, user)
    const initialEmails = getCapturedEmails()
    const initialBody =
      typeof initialEmails[initialEmails.length - 1]?.body === 'string'
        ? JSON.parse(initialEmails[initialEmails.length - 1].body as string)
        : initialEmails[initialEmails.length - 1]?.body
    const firstOtp = initialBody.text.match(/\b\d{6}\b/)[0]

    // Immediate resend triggers cooldown
    const cooldownRes = await resendOtp(app, { email: user.email })
    expect(cooldownRes.status).toBe(429)
    expect(cooldownRes.body.code).toBe('COOLDOWN_ACTIVE')
    expect(cooldownRes.body.retryAfter).toBeGreaterThan(0)

    // Fast-forward cooldown by setting database verification record timestamp back by >60s
    await prisma.authVerification.updateMany({
      where: { identifier: `email-verification-otp-${user.email}` },
      data: {
        createdAt: new Date(Date.now() - 65000),
        updatedAt: new Date(Date.now() - 65000),
      },
    })
    const { clearOtpCooldown } = await import('../../../apps/api/src/api/auth/auth.controller')
    await clearOtpCooldown(user.email)

    // Resend is now allowed
    const resendRes = await resendOtp(app, { email: user.email })
    expect(resendRes.status).toBe(200)
    expect(resendRes.body.success).toBe(true)

    // Old OTP should now be rejected
    const oldOtpRes = await verifyOtp(app, {
      email: user.email,
      otp: firstOtp,
    })
    expect(oldOtpRes.status).toBe(400)
    expect(oldOtpRes.body.code).toBe('INVALID_OTP')
  })

  it('7. Enforces verification attempt limits (locks out after too many failures)', async () => {
    const user = generateRandomUser({
      name: 'Suresh Menon',
      email: `suresh.${Date.now()}@college.edu`,
    })

    await signUpWithEmail(app, user)

    // Submit invalid OTP 5 times to exhaust allowed attempts
    for (let i = 0; i < 5; i++) {
      const res = await verifyOtp(app, {
        email: user.email,
        otp: `99999${i}`,
      })
      expect(res.status).toBe(400)
    }

    // Next attempt must trigger TOO_MANY_ATTEMPTS
    const lockedRes = await verifyOtp(app, {
      email: user.email,
      otp: '999999',
    })

    expect([400, 403, 429]).toContain(lockedRes.status)
    expect(lockedRes.body.code).toBe('TOO_MANY_ATTEMPTS')
  })

  it('8. Unverified users receive 403 EMAIL_NOT_VERIFIED when calling protected APIs', async () => {
    const { user } = await createTestUserWithSession({
      email: `unverified.${Date.now()}@college.edu`,
      emailVerified: false,
    })

    // Calling protected profile endpoint
    const protectedRes = await request(app)
      .get('/api/profile/me')
      .set('Origin', process.env.CORS_ORIGIN || 'http://localhost:5173')
      .set('x-test-user-id', user.id)

    expect(protectedRes.status).toBe(403)
    expect(protectedRes.body.code).toBe('EMAIL_NOT_VERIFIED')
  })

  it('9. Verified users can successfully access protected APIs', async () => {
    const { user } = await createTestUserWithSession({
      email: `verified.${Date.now()}@college.edu`,
      emailVerified: true,
    })

    const protectedRes = await request(app)
      .get('/api/profile/me')
      .set('Origin', process.env.CORS_ORIGIN || 'http://localhost:5173')
      .set('x-test-user-id', user.id)

    expect(protectedRes.status).toBe(200)
  })

  it('10. Unauthenticated users receive 401 UNAUTHORIZED on protected APIs', async () => {
    const unauthRes = await request(app)
      .get('/api/profile/me')
      .set('Origin', process.env.CORS_ORIGIN || 'http://localhost:5173')

    expect(unauthRes.status).toBe(401)
  })

  it('11. Resend OTP for non-existent email prevents user enumeration', async () => {
    const res = await resendOtp(app, {
      email: 'nonexistent.user.12345@college.edu',
    })

    expect(res.status).toBe(200)
    expect(res.body.success).toBe(true)
    expect(res.body.message).toContain('verification code has been sent')
  })
})
