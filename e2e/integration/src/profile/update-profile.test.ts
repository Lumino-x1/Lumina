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
import { createProfile, generateRandomUser } from '@lumina/test-utils'
import { prisma } from '@lumina/db'
import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest'

describe('Profile | update profile', () => {
  const app = createTestApp()

  beforeAll(() => {
    setTestDatabaseUrl()
    return prepareTestDatabase().then(() => connectTestDatabase())
  })

  afterAll(async () => {
    await disconnectTestDatabase()
  })

  afterEach(async () => {
    await clearDatabase() // Updated import from database helper
    clearCapturedEmails()
  })

  it('updates the authenticated user profile and persists the change', async () => {
    const credentials = generateRandomUser({
      email: 'profile.update@example.test',
      name: 'Sana Iyer',
    })
    const signupResponse = await signUpWithEmail(app, credentials)
    const sessionCookie = buildCookieHeader(getSetCookieHeader(signupResponse))
    const user = await prisma.user.findUniqueOrThrow({ where: { email: credentials.email } })

    await createProfile(user.id, {
      firstName: 'Sana',
      lastName: 'Iyer',
      bio: 'Original bio',
      skills: ['TypeScript'],
    })

    const payload = {
      firstName: 'Sana',
      lastName: 'Iyer',
      bio: 'Updated bio with production-ready details.',
      about: 'I lead backend systems and integration quality.',
      location: 'Pune, India',
      skills: ['TypeScript', 'PostgreSQL', 'Prisma'],
      interests: ['Testing', 'Reliability'],
      languages: ['English', 'Hindi'],
      hideEmail: true,
      hideCgpa: true,
    }

    const response = await import('supertest').then(({ default: request }) =>
      request(app)
        .patch('/api/profile/me')
        .set('Origin', process.env.CORS_ORIGIN ?? 'http://localhost:3000')
        .set('Cookie', sessionCookie ?? '')
        .send(payload)
    )

    expect(response.status).toBe(200)
    expect(response.body).toEqual(expect.objectContaining(payload))

    const storedProfile = await prisma.profile.findUniqueOrThrow({ where: { userId: user.id } })
    expect(storedProfile).toEqual(expect.objectContaining(payload))
  })

  it('rejects an unauthorized update', async () => {
    const response = await import('supertest').then(({ default: request }) =>
      request(app)
        .patch('/api/profile/me')
        .set('Origin', process.env.CORS_ORIGIN ?? 'http://localhost:3000')
        .send({ firstName: 'Unauthenticated' })
    )

    expect(response.status).toBe(401)
  })

  it('returns a failure for invalid profile payloads', async () => {
    const credentials = generateRandomUser({ email: 'profile.invalid@example.test' })
    const signupResponse = await signUpWithEmail(app, credentials)
    const sessionCookie = buildCookieHeader(getSetCookieHeader(signupResponse))

    const response = await import('supertest').then(({ default: request }) =>
      request(app)
        .patch('/api/profile/me')
        .set('Origin', process.env.CORS_ORIGIN ?? 'http://localhost:3000')
        .set('Cookie', sessionCookie ?? '')
        .send({})
    )

    expect([400, 422, 500]).toContain(response.status)
  })
})
