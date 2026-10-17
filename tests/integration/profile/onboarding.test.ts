import { createTestApp } from '../helpers/app'
import {
  buildCookieHeader,
  clearCapturedEmails,
  getSetCookieHeader,
  installResendFetchMock,
  signUpWithEmail,
  getSession,
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

  beforeAll(async () => {
    installResendFetchMock()
    setTestDatabaseUrl()
    await prepareTestDatabase()
    await connectTestDatabase()
  })

  afterAll(async () => {
    await disconnectTestDatabase()
  })

  afterEach(async () => {
    await clearDatabase()
    clearCapturedEmails()
  })

  it('persists all 15 onboarding fields to PostgreSQL database including collegeId relation', async () => {
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
      profilePicture:
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
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

    // 1. Verify User table fields and collegeId relationship
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
    expect(updatedUser.collegeId).toBe(updatedUser.college?.id)
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

    // 3. Mark email as verified to access protected GET /api/profile/me
    await prisma.user.update({
      where: { id: user.id },
      data: { emailVerified: true },
    })

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

  it('automatically identifies college and sets collegeId from user college email domain', async () => {
    // Ensure college with domain exists in DB
    const college = await prisma.college.upsert({
      where: { domain: 'psgtech.ac.in' },
      update: { name: 'PSG College of Technology', isActive: true },
      create: {
        name: 'PSG College of Technology',
        slug: 'psgtech-ac-in-test',
        domain: 'psgtech.ac.in',
        isActive: true,
        emailDomains: {
          create: { domain: 'psgtech.ac.in' },
        },
      },
    })

    const credentials = generateRandomUser({
      email: `student.${Date.now()}@psgtech.ac.in`,
      name: 'Kavitha S',
    })
    const signupResponse = await signUpWithEmail(app, credentials)
    const sessionCookie = buildCookieHeader(getSetCookieHeader(signupResponse))
    const user = await prisma.user.findUniqueOrThrow({ where: { email: credentials.email } })

    // collegeId is already resolved from email domain
    expect(user.collegeId).toBe(college.id)

    // Complete onboarding without explicitly providing college name
    const onboardingPayload = {
      userId: user.id,
      firstName: 'Kavitha',
      lastName: 'S',
      department: 'Information Technology',
    }

    const response = await import('supertest').then(({ default: request }) =>
      request(app)
        .post('/api/profile/onboarding')
        .set('Origin', process.env.CORS_ORIGIN ?? 'http://localhost:3000')
        .set('Cookie', sessionCookie ?? '')
        .send(onboardingPayload)
    )

    expect(response.status).toBe(200)
    expect(response.body.user.collegeId).toBe(college.id)

    const updatedUser = await prisma.user.findUniqueOrThrow({
      where: { id: user.id },
      include: { college: true },
    })
    expect(updatedUser.collegeId).toBe(college.id)
    expect(updatedUser.college?.name).toBe('PSG College of Technology')

    // Verify Better Auth session exposes collegeId
    const sessionRes = await getSession(app, sessionCookie ?? undefined)
    expect(sessionRes.status).toBe(200)
    expect(sessionRes.body.user.collegeId).toBe(college.id)
  })

  it('identifies college from candidate collegeEmail in onboarding payload for personal email registrations', async () => {
    const college = await prisma.college.upsert({
      where: { domain: 'psgtech.ac.in' },
      update: { name: 'PSG College of Technology', isActive: true },
      create: {
        name: 'PSG College of Technology',
        slug: 'psgtech-ac-in-test2',
        domain: 'psgtech.ac.in',
        isActive: true,
        emailDomains: {
          create: { domain: 'psgtech.ac.in' },
        },
      },
    })

    // User registered with generic webmail
    const credentials = generateRandomUser({
      email: `student.${Date.now()}@gmail.com`,
      name: 'Ramesh Kumar',
    })
    const signupResponse = await signUpWithEmail(app, credentials)
    const sessionCookie = buildCookieHeader(getSetCookieHeader(signupResponse))
    const user = await prisma.user.findUniqueOrThrow({ where: { email: credentials.email } })

    expect(user.collegeId).toBeNull()

    // Onboarding provides college email with subdomain
    const onboardingPayload = {
      userId: user.id,
      collegeEmail: 'ramesh.k@cse.psgtech.ac.in',
      firstName: 'Ramesh',
      lastName: 'Kumar',
      department: 'Computer Science',
    }

    const response = await import('supertest').then(({ default: request }) =>
      request(app)
        .post('/api/profile/onboarding')
        .set('Origin', process.env.CORS_ORIGIN ?? 'http://localhost:3000')
        .set('Cookie', sessionCookie ?? '')
        .send(onboardingPayload)
    )

    expect(response.status).toBe(200)
    expect(response.body.user.collegeId).toBe(college.id)

    const updatedUser = await prisma.user.findUniqueOrThrow({
      where: { id: user.id },
      include: { college: true },
    })
    expect(updatedUser.collegeId).toBe(college.id)
    expect(updatedUser.college?.name).toBe('PSG College of Technology')
  })
})
