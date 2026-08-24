import { createTestApp } from '@lumina/test-utils'
import {
  buildCookieHeader,
  getCapturedEmails,
  getCookieValue,
  getSetCookieHeader,
  signUpWithEmail,
} from '@lumina/test-utils'
import { generateRandomUser } from '@lumina/test-utils'
import { prisma } from '@lumina/db'
import { beforeAll, describe, expect, it } from 'vitest'

describe('Auth | sign up', () => {
  const app = createTestApp()

  beforeAll(() => {
    expect(app).toBeDefined()
  })

  it('creates a user, session, account, and verification email for a valid signup', async () => {
    const user = generateRandomUser({ name: 'Aarav Kumar', email: 'aarav.kumar@example.test' })

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
    expect(response.body).not.toHaveProperty('password')
    expect(setCookie.join(';')).toContain('better-auth.session_token=')
    expect(sessionToken).toBeTruthy()

    const createdUser = await prisma.user.findUnique({
      where: { email: user.email },
      include: { accounts: true, sessions: true },
    })

    expect(createdUser).toBeTruthy()
    expect(createdUser?.name).toBe(user.name)
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
    const user = generateRandomUser({ email: 'duplicate@example.test' })
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

  it('keeps the response free of sensitive fields', async () => {
    const user = generateRandomUser({ email: 'schema@example.test' })

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
