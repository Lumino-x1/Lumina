import { createTestApp } from '../helpers/app'
import {
  clearCapturedEmails,
  createTestUserWithSession,
  TEST_ORIGIN,
} from '../helpers/auth'
import {
  clearDatabase,
  connectTestDatabase,
  disconnectTestDatabase,
  prepareTestDatabase,
  setTestDatabaseUrl,
} from '../helpers/database'
import { createTestUser } from '../helpers/factories'
import request from 'supertest'
import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest'

describe('Friends | POST /api/friends/request/:userId', () => {
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

  it('sends friend request successfully to another user', async () => {
    const { user: sender, cookie } = await createTestUserWithSession({ name: 'Sender User' })
    const receiver = await createTestUser({ name: 'Receiver User' })

    const res = await request(app)
      .post(`/api/friends/request/${receiver.id}`)
      .set('Origin', TEST_ORIGIN)
      .set('Cookie', cookie)
      .set('x-test-user-id', sender.id)

    expect(res.status).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.senderId).toBe(sender.id)
    expect(res.body.receiverId).toBe(receiver.id)
    expect(res.body.status).toBe('PENDING')
  })

  it('works using root alias /friends/request/:userId', async () => {
    const { user: sender, cookie } = await createTestUserWithSession({ name: 'Sender User 2' })
    const receiver = await createTestUser({ name: 'Receiver User 2' })

    const res = await request(app)
      .post(`/friends/request/${receiver.id}`)
      .set('Origin', TEST_ORIGIN)
      .set('Cookie', cookie)
      .set('x-test-user-id', sender.id)

    expect(res.status).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.senderId).toBe(sender.id)
    expect(res.body.receiverId).toBe(receiver.id)
    expect(res.body.status).toBe('PENDING')
  })

  it('returns 409 conflict when request already exists', async () => {
    const { user: sender, cookie } = await createTestUserWithSession({ name: 'Sender User 3' })
    const receiver = await createTestUser({ name: 'Receiver User 3' })

    // First request
    const firstRes = await request(app)
      .post(`/api/friends/request/${receiver.id}`)
      .set('Origin', TEST_ORIGIN)
      .set('Cookie', cookie)
      .set('x-test-user-id', sender.id)
    expect(firstRes.status).toBe(201)

    // Second duplicate request
    const secondRes = await request(app)
      .post(`/api/friends/request/${receiver.id}`)
      .set('Origin', TEST_ORIGIN)
      .set('Cookie', cookie)
      .set('x-test-user-id', sender.id)
    expect(secondRes.status).toBe(409)
  })

  it('returns 400 when attempting to send request to self', async () => {
    const { user: sender, cookie } = await createTestUserWithSession({ name: 'Self User' })

    const res = await request(app)
      .post(`/api/friends/request/${sender.id}`)
      .set('Origin', TEST_ORIGIN)
      .set('Cookie', cookie)
      .set('x-test-user-id', sender.id)

    expect(res.status).toBe(400)
  })

  it('returns 401 when not authenticated', async () => {
    const receiver = await createTestUser({ name: 'Target User' })

    const res = await request(app)
      .post(`/api/friends/request/${receiver.id}`)
      .set('Origin', TEST_ORIGIN)

    expect(res.status).toBe(401)
  })
})
