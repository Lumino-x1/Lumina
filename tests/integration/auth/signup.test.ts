import { createTestApp } from '../helpers/app'
import {
  buildCookieHeader,
  clearCapturedEmails,
  getCapturedEmails,
  getCookieValue,
  getSetCookieHeader,
  installResendFetchMock,
  signUpWithEmail,
} from '../helpers/auth'
import { generateRandomUser } from '../helpers/factories'
import { prisma } from '@db/client'
import { beforeAll, describe, expect, it } from 'vitest'

describe('Auth | sign up', () => {
  const app = createTestApp()

  beforeAll(() => {
    installResendFetchMock()
    clearCapturedEmails()
    expect(app).toBeDefined()
  })

  it('creates a user, session, account, and verification email for a valid signup', async () => {
    const user = generateRandomUser({ name: 'Aarav Kumar' })

    const response = await signUpWithEmail(app, user)
    const setCookie = getSetCookieHeader(response)
    const sessionToken = getCookieValue(setCookie)

    expect(response.status).toBe(200)
    expect(response.body).toEqual(
      expect.objectContaining({
        user: expect.objectContaining({
          email: user.email,
          name: user.name,
        }),
      })
    )
    expect(response.body.user.username).toMatch(/^aaravkumar\d{4}$/)
    expect(response.body).not.toHaveProperty('password')
    expect(setCookie.join(';')).toContain('better-auth.session_token=')
    expect(sessionToken).toBeTruthy()

    const createdUser = await prisma.user.findUnique({
      where: { email: user.email },
      include: { accounts: true, sessions: true },
    })

    expect(createdUser).toBeTruthy()
    expect(createdUser?.name).toBe(user.name)
    expect(createdUser?.username).toBe(response.body.user.username)
    expect(createdUser?.emailVerified).toBe(false)
    expect(createdUser?.accounts).toHaveLength(1)
    expect(createdUser?.sessions).toHaveLength(1)
    expect(createdUser?.accounts[0]?.providerId).toBe('credential')
    expect(createdUser?.accounts[0]?.password).toBeTruthy()
    expect(createdUser?.accounts[0]?.password).not.toBe(user.password)
    expect(createdUser?.accounts[0]?.password).not.toContain(user.password)
    expect(getCapturedEmails()).toHaveLength(1)
    expect(getCapturedEmails()[0]?.url).toContain('api.resend.com')
  })

  it('rejects duplicate email signup', async () => {
    const user = generateRandomUser()
    await signUpWithEmail(app, user)

    const response = await signUpWithEmail(app, user)

    expect(response.status).toBe(422)
    expect(response.body).toEqual(
      expect.objectContaining({
        message: expect.any(String),
      })
    )
  })

  it('rejects invalid email payloads', async () => {
    const response = await signUpWithEmail(app, {
      ...generateRandomUser({ email: 'not-an-email' }),
      email: 'not-an-email',
    })

    expect([400, 422]).toContain(response.status)
  })

  it('rejects weak passwords', async () => {
    const response = await signUpWithEmail(app, {
      ...generateRandomUser(),
      password: 'weak',
    })

    expect([400, 422]).toContain(response.status)
  })

  it('rejects missing required fields', async () => {
    const response = await requestMissingPayload(app)

    expect([400, 422]).toContain(response.status)
  })

  it('generates username for single name without last name', async () => {
    const user = generateRandomUser({ name: 'Kavitha' })

    const response = await signUpWithEmail(app, user)

    expect(response.status).toBe(200)
    expect(response.body.user.username).toMatch(/^kavitha\d{4}$/)
  })

  it('keeps the response free of sensitive fields', async () => {
    const user = generateRandomUser()

    const response = await signUpWithEmail(app, user)

    expect(response.status).toBe(200)
    expect(response.body).toEqual(
      expect.objectContaining({
        user: expect.objectContaining({
          email: user.email,
          name: user.name,
        }),
      })
    )
    expect(JSON.stringify(response.body)).not.toContain(user.password)
    expect(JSON.stringify(response.body)).not.toContain('credential')
  })
})

async function requestMissingPayload(app: ReturnType<typeof createTestApp>) {
  return import('supertest').then(({ default: request }) =>
    request(app)
      .post('/api/auth/sign-up/email')
      .set('Origin', process.env.CORS_ORIGIN ?? 'http://localhost:3000')
      .send({})
  )
}
