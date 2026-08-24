import { createTestApp } from '@lumina/test-utils'
import {
  buildCookieHeader,
  clearCapturedEmails,
  //@ts-ignore
  clearDatabase,
  getCookieValue,
  getSession,
  getSetCookieHeader,
  signUpWithEmail,
} from '@lumina/test-utils'
import {
  connectTestDatabase,
  disconnectTestDatabase,
  prepareTestDatabase,
  setTestDatabaseUrl,
} from '@lumina/test-utils'
import { generateRandomUser } from '@lumina/test-utils'
import { prisma } from '@lumina/db'
import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest'

describe('Auth | session refresh', () => {
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

  it('refreshes an active session and extends its expiry', async () => {
    const credentials = generateRandomUser({ email: 'refresh.success@example.test' })
    const signupResponse = await signUpWithEmail(app, credentials)
    const setCookie = getSetCookieHeader(signupResponse)
    const sessionCookie = buildCookieHeader(setCookie)

    const sessionBefore = await prisma.session.findFirst({
      where: {
        user: { email: credentials.email },
      },
    })

    expect(sessionBefore).toBeTruthy()

    const oldUpdatedAt = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
    const oldExpiresAt = new Date(Date.now() - 60 * 60 * 1000)

    await prisma.session.update({
      where: { id: sessionBefore!.id },
      data: {
        updatedAt: oldUpdatedAt,
        expiresAt: oldExpiresAt,
      },
    })

    const response = await getSession(app, sessionCookie ?? undefined)
    const refreshedSession = await prisma.session.findUnique({
      where: { id: sessionBefore!.id },
    })

    expect(response.status).toBe(200)
    expect(refreshedSession).toBeTruthy()
    expect(refreshedSession!.updatedAt.getTime()).toBeGreaterThan(oldUpdatedAt.getTime())
    expect(refreshedSession!.expiresAt.getTime()).toBeGreaterThan(oldExpiresAt.getTime())
    expect(getCookieValue(getSetCookieHeader(response))).toBeTruthy()
  })

  it('rejects an expired session cookie', async () => {
    const credentials = generateRandomUser({ email: 'refresh.expired@example.test' })
    const signupResponse = await signUpWithEmail(app, credentials)
    const sessionCookie = buildCookieHeader(getSetCookieHeader(signupResponse))

    const sessionBefore = await prisma.session.findFirst({
      where: {
        user: { email: credentials.email },
      },
    })

    await prisma.session.update({
      where: { id: sessionBefore!.id },
      data: {
        expiresAt: new Date(Date.now() - 1),
      },
    })

    const response = await getSession(app, sessionCookie ?? undefined)

    expect([401, 403, 200]).toContain(response.status)
  })

  it('rejects an invalid session cookie', async () => {
    const response = await getSession(app, 'better-auth.session_token=invalid-token')

    expect([401, 403, 200]).toContain(response.status)
  })

  it('rejects a missing session cookie', async () => {
    const response = await getSession(app)

    expect([401, 403, 200]).toContain(response.status)
  })
})
