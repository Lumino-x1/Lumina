import { createTestApp } from '@lumina/test-utils'
import {
  buildCookieHeader,
  clearCapturedEmails,
  getSetCookieHeader,
  signUpWithEmail,
} from '@lumina/test-utils'
import {
  clearDatabase,
  connectTestDatabase,
  disconnectTestDatabase,
  prepareTestDatabase,
  setTestDatabaseUrl,
} from '@lumina/test-utils'
import {
  createCollege,
  createProfile,
  createTestUser,
  generateRandomUser,
} from '@lumina/test-utils'
import { prisma } from '@lumina/db'
import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest'

describe('Profile | get profile', () => {
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

  it('returns the current authenticated profile', async () => {
    const credentials = generateRandomUser({ email: 'profile.me@example.test', name: 'Naina Shah' })
    const signupResponse = await signUpWithEmail(app, credentials)
    const user = await prisma.user.findUniqueOrThrow({ where: { email: credentials.email } })

    await createProfile(user.id, {
      firstName: 'Naina',
      lastName: 'Shah',
      bio: 'Building reliable platforms for student communities.',
    })

    const response = await import('supertest').then(({ default: request }) =>
      request(app)
        .get('/api/profile/me')
        .set('Origin', process.env.CORS_ORIGIN ?? 'http://localhost:3000')
        .set('Cookie', buildCookieHeader(getSetCookieHeader(signupResponse)) ?? '')
        .send()
    )

    expect(response.status).toBe(200)
    expect(response.body).toEqual(
      expect.objectContaining({
        firstName: 'Naina',
        lastName: 'Shah',
        bio: 'Building reliable platforms for student communities.',
        userId: user.id,
      })
    )
  })

  it('returns profile data by username with the linked user included', async () => {
    const college = await createCollege({ domain: 'profile-user.lumina.test' })
    const user = await createTestUser({
      collegeId: college.id,
      name: 'Kabir Singh',
      username: 'kabir_singh',
      email: 'kabir.singh@example.test',
    })
    const profile = await createProfile(user.id, {
      firstName: 'Kabir',
      lastName: 'Singh',
      profileVisibility: 'PUBLIC',
    })

    const response = await import('supertest').then(({ default: request }) =>
      request(app)
        .get(`/api/profile/${user.username}`)
        .set('Origin', process.env.CORS_ORIGIN ?? 'http://localhost:3000')
        .send()
    )

    expect(response.status).toBe(200)
    expect(response.body).toEqual(
      expect.objectContaining({
        id: profile.id,
        firstName: 'Kabir',
        lastName: 'Singh',
        user: expect.objectContaining({
          id: user.id,
          email: user.email,
          username: user.username,
        }),
      })
    )
    expect(JSON.stringify(response.body)).not.toContain('password')
  })

  it('returns 404 when the profile does not exist', async () => {
    const response = await import('supertest').then(({ default: request }) =>
      request(app)
        .get('/api/profile/missing-user-404')
        .set('Origin', process.env.CORS_ORIGIN ?? 'http://localhost:3000')
        .send()
    )

    expect(response.status).toBe(404)
    expect(response.body).toEqual(
      expect.objectContaining({
        message: 'Profile not found',
      })
    )
  })
})
