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
import { PostsRepo } from '../../../apps/api/src/api/posts/posts.repo'

describe('Scheduled Posts - Integration Tests', () => {
  const app = createTestApp()

  beforeAll(async () => {
    process.env.SKIP_DB_PUSH = 'true'
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

  it('verifies the full scheduled post lifecycle: authorization, validation, scheduling, rescheduling, cancellation, and immediate publishing', async () => {
    const authorUser = generateRandomUser({ email: 'author.scheduled@example.test', username: 'authoruser' })
    const otherUser = generateRandomUser({ email: 'other.scheduled@example.test', username: 'otheruser' })

    const signupAuthor = await signUpWithEmail(app, authorUser)
    const signupOther = await signUpWithEmail(app, otherUser)

    const authorCookie = buildCookieHeader(getSetCookieHeader(signupAuthor))
    const otherCookie = buildCookieHeader(getSetCookieHeader(signupOther))

    const dbAuthor = await prisma.user.findUnique({ where: { email: authorUser.email } })
    const dbOther = await prisma.user.findUnique({ where: { email: otherUser.email } })

    expect(dbAuthor).toBeDefined()
    expect(dbOther).toBeDefined()

    await prisma.user.updateMany({
      where: { id: { in: [dbAuthor!.id, dbOther!.id] } },
      data: { emailVerified: true },
    })

    // 1. Create a draft post as author
    const draftPost = await prisma.post.create({
      data: {
        authorId: dbAuthor!.id,
        title: 'Draft Article for Scheduling',
        content: 'This is a test draft article.',
        status: 'DRAFT',
      },
    })

    const futureTime = new Date(Date.now() + 24 * 3600 * 1000).toISOString()
    const pastTime = new Date(Date.now() - 3600 * 1000).toISOString()

    // 2. Authorization: Non-author cannot schedule
    const unauthorizedSchedule = await request(app)
      .post(`/api/posts/${draftPost.id}/schedule`)
      .set('Cookie', otherCookie)
      .send({ scheduleTime: futureTime })

    expect(unauthorizedSchedule.status).toBe(403)
    expect(unauthorizedSchedule.body.code).toBe('ONLY_AUTHOR_CAN_SCHEDULE')

    // 3. Validation: Invalid timestamp rejected
    const invalidTimeSchedule = await request(app)
      .post(`/api/posts/${draftPost.id}/schedule`)
      .set('Cookie', authorCookie)
      .send({ scheduleTime: 'invalid-date' })

    expect(invalidTimeSchedule.status).toBe(400)
    expect(invalidTimeSchedule.body.code).toBe('INVALID_SCHEDULE_TIME')

    // 4. Validation: Past timestamp rejected
    const pastTimeSchedule = await request(app)
      .post(`/api/posts/${draftPost.id}/schedule`)
      .set('Cookie', authorCookie)
      .send({ scheduleTime: pastTime })

    expect(pastTimeSchedule.status).toBe(400)
    expect(pastTimeSchedule.body.code).toBe('INVALID_SCHEDULE_TIME')

    // 5. Scheduling: Author schedules draft post
    const scheduleRes = await request(app)
      .post(`/api/posts/${draftPost.id}/schedule`)
      .set('Cookie', authorCookie)
      .send({ scheduleTime: futureTime })

    expect(scheduleRes.status).toBe(201)
    expect(scheduleRes.body.success).toBe(true)
    expect(scheduleRes.body.data.status).toBe('SCHEDULED')
    expect(scheduleRes.body.data.scheduleVersion).toBe(1)
    expect(new Date(scheduleRes.body.data.scheduledAt).toISOString()).toBe(new Date(futureTime).toISOString())

    // Verify PostgreSQL state & outbox event
    const postInDb = await prisma.post.findUnique({ where: { id: draftPost.id } })
    expect(postInDb?.status).toBe('SCHEDULED')
    expect(postInDb?.scheduleVersion).toBe(1)

    const outboxEvent = await prisma.publishOutboxEvent.findUnique({
      where: {
        postId_scheduleVersion: {
          postId: draftPost.id,
          scheduleVersion: 1,
        },
      },
    })
    expect(outboxEvent).toBeDefined()
    expect(outboxEvent?.scheduleVersion).toBe(1)

    // 6. User Isolation: Non-author cannot see scheduled posts
    const otherScheduledList = await request(app)
      .get('/api/posts/scheduled')
      .set('Cookie', otherCookie)

    expect(otherScheduledList.status).toBe(200)
    expect(otherScheduledList.body.data).toHaveLength(0)

    // Author sees their scheduled post
    const authorScheduledList = await request(app)
      .get('/api/posts/scheduled')
      .set('Cookie', authorCookie)

    expect(authorScheduledList.status).toBe(200)
    expect(authorScheduledList.body.data).toHaveLength(1)
    expect(authorScheduledList.body.data[0].id).toBe(draftPost.id)

    // 7. Authorization: Non-author cannot reschedule
    const newFutureTime = new Date(Date.now() + 48 * 3600 * 1000).toISOString()
    const unauthorizedReschedule = await request(app)
      .patch(`/api/posts/${draftPost.id}/schedule`)
      .set('Cookie', otherCookie)
      .send({ scheduleTime: newFutureTime })

    expect(unauthorizedReschedule.status).toBe(403)
    expect(unauthorizedReschedule.body.code).toBe('ONLY_AUTHOR_CAN_RESCHEDULE')

    // 8. Rescheduling: Author reschedules post
    const rescheduleRes = await request(app)
      .patch(`/api/posts/${draftPost.id}/schedule`)
      .set('Cookie', authorCookie)
      .send({ scheduleTime: newFutureTime })

    expect(rescheduleRes.status).toBe(200)
    expect(rescheduleRes.body.data.status).toBe('SCHEDULED')
    expect(rescheduleRes.body.data.scheduleVersion).toBe(2)

    const updatedPostInDb = await prisma.post.findUnique({ where: { id: draftPost.id } })
    expect(updatedPostInDb?.scheduleVersion).toBe(2)

    // 9. Authorization: Non-author cannot cancel/delete scheduled post
    const unauthorizedCancel = await request(app)
      .delete(`/api/posts/${draftPost.id}/schedule`)
      .set('Cookie', otherCookie)

    expect(unauthorizedCancel.status).toBe(403)
    expect(unauthorizedCancel.body.code).toBe('ONLY_AUTHOR_CAN_DELETE_SCHEDULED_POST')

    // 10. Cancellation: Author cancels scheduled post (returns to DRAFT)
    const cancelRes = await request(app)
      .delete(`/api/posts/${draftPost.id}/schedule`)
      .set('Cookie', authorCookie)

    expect(cancelRes.status).toBe(200)
    expect(cancelRes.body.data.status).toBe('DRAFT')
    expect(cancelRes.body.data.scheduledAt).toBeNull()
    expect(cancelRes.body.data.scheduleVersion).toBe(3)

    const canceledPostInDb = await prisma.post.findUnique({ where: { id: draftPost.id } })
    expect(canceledPostInDb?.status).toBe('DRAFT')
    expect(canceledPostInDb?.scheduledAt).toBeNull()

    // 11. Validation: Cannot cancel or reschedule a post that is now a DRAFT
    const reCancelRes = await request(app)
      .delete(`/api/posts/${draftPost.id}/schedule`)
      .set('Cookie', authorCookie)

    expect(reCancelRes.status).toBe(400)
    expect(reCancelRes.body.code).toBe('POST_NOT_SCHEDULED')

    const reRescheduleRes = await request(app)
      .patch(`/api/posts/${draftPost.id}/schedule`)
      .set('Cookie', authorCookie)
      .send({ scheduleTime: newFutureTime })

    expect(reRescheduleRes.status).toBe(400)
    expect(reRescheduleRes.body.code).toBe('POST_NOT_SCHEDULED')

    // 12. Immediate Publishing: Non-author cannot publish
    const unauthorizedPublish = await request(app)
      .post(`/api/posts/${draftPost.id}/publish`)
      .set('Cookie', otherCookie)

    expect(unauthorizedPublish.status).toBe(403)
    expect(unauthorizedPublish.body.code).toBe('ONLY_AUTHOR_CAN_PUBLISH')

    // Author publishes immediately
    const publishRes = await request(app)
      .post(`/api/posts/${draftPost.id}/publish`)
      .set('Cookie', authorCookie)

    expect(publishRes.status).toBe(200)
    expect(publishRes.body.data.status).toBe('PUBLISHED')
    expect(publishRes.body.data.publishedAt).toBeDefined()
    expect(publishRes.body.data.scheduledAt).toBeNull()

    const publishedPostInDb = await prisma.post.findUnique({ where: { id: draftPost.id } })
    expect(publishedPostInDb?.status).toBe('PUBLISHED')

    // 13. Published post cannot be scheduled or published again
    const schedulePublishedRes = await request(app)
      .post(`/api/posts/${draftPost.id}/schedule`)
      .set('Cookie', authorCookie)
      .send({ scheduleTime: futureTime })

    expect(schedulePublishedRes.status).toBe(409)
    expect(schedulePublishedRes.body.code).toBe('POST_ALREADY_PUBLISHED')

    const republishRes = await request(app)
      .post(`/api/posts/${draftPost.id}/publish`)
      .set('Cookie', authorCookie)

    expect(republishRes.status).toBe(409)
    expect(republishRes.body.code).toBe('POST_ALREADY_PUBLISHED')
  })

  it('verifies atomic worker claiming on due scheduled posts', async () => {
    const authorUser = generateRandomUser({ email: 'worker.test@example.test', username: 'workeruser' })
    const signupAuthor = await signUpWithEmail(app, authorUser)
    const dbAuthor = await prisma.user.findUnique({ where: { email: authorUser.email } })

    // Create post scheduled in the past (due now)
    const pastTime = new Date(Date.now() - 10000)
    const post = await prisma.post.create({
      data: {
        authorId: dbAuthor!.id,
        title: 'Due Post',
        content: 'Ready to publish',
        status: 'SCHEDULED',
        scheduledAt: pastTime,
        scheduleVersion: 1,
      },
    })

    // First worker claims and publishes
    const published = await PostsRepo.publishScheduledPost(post.id, 1)
    expect(published).toBeDefined()
    expect(published?.status).toBe('PUBLISHED')
    expect(published?.scheduledAt).toBeNull()

    // Second concurrent worker attempts to publish same post & version
    const secondClaim = await PostsRepo.publishScheduledPost(post.id, 1)
    expect(secondClaim).toBeNull() // Atomic claim prevented duplicate publication!
  })
})
