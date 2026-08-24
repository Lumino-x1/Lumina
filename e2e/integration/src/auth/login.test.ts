import { createTestApp } from '@lumina/test-utils'
import {
  buildCookieHeader,
  clearCapturedEmails,
  getCookieValue,
  getSetCookieHeader,
  signInWithEmail,
  signUpWithEmail,
} from '@lumina/test-utils'
import {
  clearDatabase,
  connectTestDatabase,
  disconnectTestDatabase,
  prepareTestDatabase,
  setTestDatabaseUrl,
} from '@lumina/test-utils'
import { generateRandomUser } from '@lumina/test-utils'
import { prisma } from '@lumina/db'
import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest'

describe('Auth | sign in', () => {
  const app = createTestApp()

  beforeAll(() => {
    setTestDatabaseUrl()
    return prepareTestDatabase().then(() => connectTestDatabase())
  })

  afterAll(async () => {
    await disconnectTestDatabase()
  })

  afterEach(async () => {
    await clearDatabase()
    clearCapturedEmails()
  })

  it('signs in with valid credentials and returns a fresh session cookie', async () => {
    const credentials = generateRandomUser({
      email: 'signin.success@example.test',
      name: 'Riya Mehta',
    })

    await signUpWithEmail(app, credentials)

    const response = await signInWithEmail(app, {
      email: credentials.email,
      password: credentials.password,
      rememberMe: true,
    })
    const setCookie = getSetCookieHeader(response)
    const sessionToken = getCookieValue(setCookie)

    expect(response.status).toBe(200)
    expect(sessionToken).toBeTruthy()
    expect(setCookie.join(';')).toContain('better-auth.session_token=')

    const sessionResponse = await requestSession(app, setCookie)

    expect(sessionResponse.status).toBe(200)
    expect(sessionResponse.body).toEqual(
      expect.objectContaining({
        user: expect.objectContaining({
          email: credentials.email,
        }),
      })
    )
  })

  it('rejects an incorrect password', async () => {
    const credentials = generateRandomUser({ email: 'signin.wrong@example.test' })
    await signUpWithEmail(app, credentials)

    const response = await signInWithEmail(app, {
      email: credentials.email,
      password: 'incorrect-password',
    })

    expect([400, 401, 403]).toContain(response.status)
  })

  it('rejects an unknown email', async () => {
    const response = await signInWithEmail(app, {
      email: 'missing.user@example.test',
      password: 'StrongPass!Missing9',
    })

    expect([400, 401, 403]).toContain(response.status)
  })

  it('rejects a locked account', async () => {
    const credentials = generateRandomUser({ email: 'signin.locked@example.test' })
    const signupResponse = await signUpWithEmail(app, credentials)
    const sessionCookie = buildCookieHeader(getSetCookieHeader(signupResponse))

    const user = await prisma.user.findUnique({
      where: { email: credentials.email },
    })

    await prisma.user.update({
      where: { id: user!.id },
      data: { status: 'SUSPENDED' },
    })

    const response = await signInWithEmail(app, {
      email: credentials.email,
      password: credentials.password,
    })

    expect([401, 403]).toContain(response.status)
    expect(sessionCookie).toContain('better-auth.session_token=')
  })

  it('rejects malformed payloads', async () => {
    const response = await signInWithEmail(app, {
      email: 'not-an-email',
      password: '123',
    })

    expect([400, 401, 422]).toContain(response.status)
  })
})

async function requestSession(app: ReturnType<typeof createTestApp>, setCookie: string[]) {
  const { default: request } = await import('supertest')
  const cookieHeader = buildCookieHeader(setCookie)

  return request(app)
    .get('/api/auth/get-session')
    .set('Origin', process.env.CORS_ORIGIN ?? 'http://localhost:3000')
    .set('Cookie', cookieHeader ?? '')
    .send()
}
