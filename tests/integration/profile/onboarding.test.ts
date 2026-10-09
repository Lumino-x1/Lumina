import { createTestApp } from '../helpers/app'
import {
  buildCookieHeader,
  clearCapturedEmails,
  getSetCookieHeader,
  signUpWithEmail,
} from '../helpers/auth'
import {
  clearDatabase,
  connectTestDatabase,
  disconnectTestDatabase,
  prepareTestDatabase,
  setTestDatabaseUrl,
} from '../helpers/database'
import { generateRandomUser } from '../helpers/factories'
import { prisma } from '@db/client'
import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest'

describe('Profile | onboarding profile persistence', () => {
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

  it('persists all 15 onboarding fields to PostgreSQL database', async () => {
    const credentials = generateRandomUser({
      email: 'alex.rivera@stanford.test',
      name: 'Alex Rivera',
    })
    const signupResponse = await signUpWithEmail(app, credentials)
    const sessionCookie = buildCookieHeader(getSetCookieHeader(signupResponse))
    const user = await prisma.user.findUniqueOrThrow({ where: { email: credentials.email } })

    const onboardingPayload = {
      userId: user.id,
      email: user.email,
      firstName: 'Alex',
      lastName: 'Rivera',
      username: 'alexrivera',
      profilePicture: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
      college: 'Stanford University',
      department: 'Computer Science',
      year: 1,
      interests: ['Technology', 'AI & Machine Learning', 'Startups'],
      skills: ['React', 'TypeScript'],
      bio: 'Fullstack developer & machine learning enthusiast.',
      leetcodeUrl: 'https://leetcode.com/alexrivera',
      github: 'https://github.com/alexrivera',
      linkedin: 'https://linkedin.com/in/alexrivera',
      portfolio: 'https://alexrivera.dev',
      location: 'Stanford, CA',
    }

    const response = await import('supertest').then(({ default: request }) =>
      request(app)
        .post('/api/profile/onboarding')
        .set('Origin', process.env.CORS_ORIGIN ?? 'http://localhost:3000')
        .set('Cookie', sessionCookie ?? '')
        .send(onboardingPayload)
    )

    expect(response.status).toBe(200)
    expect(response.body.success).toBe(true)

    // 1. Verify User table fields
    const updatedUser = await prisma.user.findUniqueOrThrow({
      where: { id: user.id },
      include: {
        college: true,
        department: true,
        profile: true,
      },
    })

    expect(updatedUser.username).toBe('alexrivera')
    expect(updatedUser.image).toBe(onboardingPayload.profilePicture)
    expect(updatedUser.status).toBe('ACTIVE')
    expect(updatedUser.college?.name).toBe('Stanford University')
    expect(updatedUser.department?.name).toBe('Computer Science')

    // 2. Verify Profile table fields
    const profile = updatedUser.profile
    expect(profile).not.toBeNull()
    expect(profile?.firstName).toBe('Alex')
    expect(profile?.lastName).toBe('Rivera')
    expect(profile?.email).toBe(user.email)
    expect(profile?.profilePicture).toBe(onboardingPayload.profilePicture)
    expect(profile?.year).toBe(1)
    expect(profile?.interests).toEqual(['Technology', 'AI & Machine Learning', 'Startups'])
    expect(profile?.skills).toEqual(['React', 'TypeScript'])
    expect(profile?.bio).toBe('Fullstack developer & machine learning enthusiast.')
    expect(profile?.leetcodeUrl).toBe('https://leetcode.com/alexrivera')
    expect(profile?.leetcodeUsername).toBe('alexrivera')
    expect(profile?.github).toBe('https://github.com/alexrivera')
    expect(profile?.linkedin).toBe('https://linkedin.com/in/alexrivera')
    expect(profile?.portfolio).toBe('https://alexrivera.dev')
    expect(profile?.location).toBe('Stanford, CA')

    // 3. Verify GET /api/profile/me retrieves all fields
    const meResponse = await import('supertest').then(({ default: request }) =>
      request(app)
        .get('/api/profile/me')
        .set('Origin', process.env.CORS_ORIGIN ?? 'http://localhost:3000')
        .set('Cookie', sessionCookie ?? '')
        .send()
    )

    expect(meResponse.status).toBe(200)
    expect(meResponse.body.firstName).toBe('Alex')
    expect(meResponse.body.lastName).toBe('Rivera')
    expect(meResponse.body.username).toBe('alexrivera')
    expect(meResponse.body.college.name).toBe('Stanford University')
    expect(meResponse.body.department.name).toBe('Computer Science')
    expect(meResponse.body.interests).toEqual(['Technology', 'AI & Machine Learning', 'Startups'])
    expect(meResponse.body.skills).toEqual(['React', 'TypeScript'])
    expect(meResponse.body.leetcodeUrl).toBe('https://leetcode.com/alexrivera')
    expect(meResponse.body.leetcodeUsername).toBe('alexrivera')
    expect(meResponse.body.location).toBe('Stanford, CA')
  })
})
