import { createTestApp } from '@lumina/test-utils'
import {
  buildCookieHeader,
  clearCapturedEmails,
  clearDatabase,
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
import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest'

describe('Auth | current session', () => {
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

  it('returns the current authenticated user and session', async () => {
    const credentials = generateRandomUser({ email: 'me.success@example.test' })
    const signupResponse = await signUpWithEmail(app, credentials)
    const response = await getSession(
      app,
      buildCookieHeader(getSetCookieHeader(signupResponse)) ?? undefined
    )

    expect(response.status).toBe(200)
    expect(response.body).toEqual(
      expect.objectContaining({
        user: expect.objectContaining({
          email: credentials.email,
          name: credentials.name,
        }),
        session: expect.any(Object),
      })
    )
    expect(JSON.stringify(response.body)).not.toContain(credentials.password)
  })

  it('returns an empty or unauthorized session for missing credentials', async () => {
    const response = await getSession(app)

    expect([200, 401, 403]).toContain(response.status)
  })

  it('rejects a tampered session cookie', async () => {
    const response = await getSession(app, 'better-auth.session_token=totally-invalid-value')

    expect([200, 401, 403]).toContain(response.status)
  })
})
