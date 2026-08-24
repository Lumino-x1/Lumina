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
import request from 'supertest'
import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest'

describe('Video Call Module Integration Tests', () => {
  const app = createTestApp()

  beforeAll(async () => {
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

  it('generates Stream Video user token for authenticated user', async () => {
    const user = generateRandomUser({ email: 'video.token@example.test' })
    const signupRes = await signUpWithEmail(app, user)
    const cookieHeader = buildCookieHeader(getSetCookieHeader(signupRes))

    const res = await request(app)
      .post('/api/video/token')
      .set('Cookie', cookieHeader ?? '')

    expect(res.status).toBe(200)
    expect(res.body.token).toBeTruthy()
    expect(res.body.apiKey).toBeTruthy()
    expect(res.body.userId).toBeTruthy()
  })

  it('creates 1-on-1 video call and authorizes participant', async () => {
    const userA = generateRandomUser({ email: 'usera.call@example.test' })
    const userB = generateRandomUser({ email: 'userb.call@example.test' })

    const signupA = await signUpWithEmail(app, userA)
    const signupB = await signUpWithEmail(app, userB)

    const cookieA = buildCookieHeader(getSetCookieHeader(signupA))
    const cookieB = buildCookieHeader(getSetCookieHeader(signupB))

    const dbUserB = await prisma.user.findUnique({ where: { email: userB.email } })

    const createCallRes = await request(app)
      .post('/api/video/calls')
      .set('Cookie', cookieA ?? '')
      .send({
        type: 'ONE_ON_ONE',
        title: 'Mentorship Session',
        participantIds: [dbUserB!.id],
      })

    expect(createCallRes.status).toBe(201)
    expect(createCallRes.body.callId).toBeTruthy()
    expect(createCallRes.body.streamCallId).toContain('lumina_call_')
    expect(createCallRes.body.status).toBe('ACTIVE')

    const callId = createCallRes.body.callId

    // Authorized User B joins call
    const joinBRes = await request(app)
      .post(`/api/video/calls/${callId}/join`)
      .set('Cookie', cookieB ?? '')

    expect(joinBRes.status).toBe(200)
    expect(joinBRes.body.token).toBeTruthy()
  })

  it('denies unauthorized user from joining private call', async () => {
    const userA = generateRandomUser({ email: 'usera.private@example.test' })
    const userB = generateRandomUser({ email: 'userb.private@example.test' })
    const userC = generateRandomUser({ email: 'userc.attacker@example.test' })

    const signupA = await signUpWithEmail(app, userA)
    const signupC = await signUpWithEmail(app, userC)

    const cookieA = buildCookieHeader(getSetCookieHeader(signupA))
    const cookieC = buildCookieHeader(getSetCookieHeader(signupC))

    const dbUserB = await prisma.user.create({
      data: { email: userB.email, name: userB.name },
    })

    const createCallRes = await request(app)
      .post('/api/video/calls')
      .set('Cookie', cookieA ?? '')
      .send({
        type: 'ONE_ON_ONE',
        title: 'Private Discussion',
        participantIds: [dbUserB.id],
      })

    const callId = createCallRes.body.callId

    // Unauthorized User C attempts to join
    const joinCRes = await request(app)
      .post(`/api/video/calls/${callId}/join`)
      .set('Cookie', cookieC ?? '')

    expect(joinCRes.status).toBe(403)
    expect(joinCRes.body.message).toBe('CALL_UNAUTHORIZED')
  })

  it('allows host to end video call and updates call history', async () => {
    const userA = generateRandomUser({ email: 'usera.host@example.test' })
    const signupA = await signUpWithEmail(app, userA)
    const cookieA = buildCookieHeader(getSetCookieHeader(signupA))

    const createCallRes = await request(app)
      .post('/api/video/calls')
      .set('Cookie', cookieA ?? '')
      .send({
        type: 'GROUP',
        title: 'Coding Club Sprint Sync',
      })

    const callId = createCallRes.body.callId

    const endRes = await request(app)
      .post(`/api/video/calls/${callId}/end`)
      .set('Cookie', cookieA ?? '')

    expect(endRes.status).toBe(200)
    expect(endRes.body.status).toBe('ENDED')

    const historyRes = await request(app)
      .get('/api/video/calls/history')
      .set('Cookie', cookieA ?? '')

    expect(historyRes.status).toBe(200)
    expect(historyRes.body.length).toBeGreaterThan(0)
    expect(historyRes.body[0].title).toBe('Coding Club Sprint Sync')
  })
})
