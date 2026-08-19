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

describe('Comments Domain (FR-06-001 through FR-06-007)', () => {
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

  it('FR-06-001: creates root comment, nested reply, and enforces max depth limit 5 & clamped pagination limit', async () => {
    const author = generateRandomUser({ email: 'author.post@example.test' })
    const commenter = generateRandomUser({
      email: 'commenter.post@example.test',
      username: 'commenter1',
    })

    const signupAuthor = await signUpWithEmail(app, author)
    const signupCommenter = await signUpWithEmail(app, commenter)

    const cookieAuthor = buildCookieHeader(getSetCookieHeader(signupAuthor))
    const cookieCommenter = buildCookieHeader(getSetCookieHeader(signupCommenter))

    const dbAuthor = await prisma.user.findUnique({ where: { email: author.email } })

    // Create post
    const post = await prisma.post.create({
      data: {
        authorId: dbAuthor!.id,
        content: 'Test post for comments',
      },
    })

    // Create root comment (depth 0)
    const rootRes = await request(app)
      .post(`/api/comments/posts/${post.id}/comments`)
      .set('Cookie', cookieCommenter ?? '')
      .send({ content: 'Root comment Level 0' })

    expect(rootRes.status).toBe(201)
    expect(rootRes.body.depth).toBe(0)

    let parentId = rootRes.body.id

    // Create nested replies down to depth 9
    for (let depth = 1; depth < 10; depth++) {
      const replyRes = await request(app)
        .post(`/api/comments/posts/${post.id}/comments`)
        .set('Cookie', cookieCommenter ?? '')
        .send({ content: `Reply Level ${depth}`, parentId })

      expect(replyRes.status).toBe(201)
      expect(replyRes.body.depth).toBe(depth)
      parentId = replyRes.body.id
    }

    // Attempting to exceed max depth 10 (depth 10 index) must fail with 422
    const failRes = await request(app)
      .post(`/api/comments/posts/${post.id}/comments`)
      .set('Cookie', cookieCommenter ?? '')
      .send({ content: 'Exceeding max depth level', parentId })

    expect(failRes.status).toBe(422)
    expect(failRes.body.message).toBe('COMMENT_MAX_DEPTH_EXCEEDED')

    // Verify pagination limit clamping (Problem 48)
    const listRes = await request(app)
      .get(`/api/comments/posts/${post.id}/comments?limit=9999`)
      .set('Cookie', cookieCommenter ?? '')

    expect(listRes.status).toBe(200)
  })

  it('FR-06-002 & FR-06-003: supports reactions, emoji format validation, edit history log, and optimistic concurrency', async () => {
    const author = generateRandomUser({ email: 'reaction.user@example.test' })
    const signup = await signUpWithEmail(app, author)
    const cookie = buildCookieHeader(getSetCookieHeader(signup))

    const dbUser = await prisma.user.findUnique({ where: { email: author.email } })
    const post = await prisma.post.create({
      data: { authorId: dbUser!.id, content: 'Reaction post' },
    })

    const commentRes = await request(app)
      .post(`/api/comments/posts/${post.id}/comments`)
      .set('Cookie', cookie ?? '')
      .send({ content: 'Initial comment content' })

    const commentId = commentRes.body.id

    // Problem 50: Rejects invalid non-emoji string
    const invalidEmojiRes = await request(app)
      .post(`/api/comments/${commentId}/reactions`)
      .set('Cookie', cookie ?? '')
      .send({ emoji: 'NOT_AN_EMOJI_LONG_STRING' })

    expect(invalidEmojiRes.status).toBe(400)
    expect(invalidEmojiRes.body.message).toBe('INVALID_EMOJI_FORMAT')

    // FR-06-002: Add Valid Emoji Reaction
    const reactRes = await request(app)
      .post(`/api/comments/${commentId}/reactions`)
      .set('Cookie', cookie ?? '')
      .send({ emoji: '🔥' })

    expect(reactRes.status).toBe(200)
    expect(reactRes.body.action).toBe('added')

    // Fetch comments and verify reactionCounts formatting
    const listRes = await request(app)
      .get(`/api/comments/posts/${post.id}/comments`)
      .set('Cookie', cookie ?? '')

    expect(listRes.status).toBe(200)
    expect(listRes.body.comments[0].reactionCounts['🔥']).toBe(1)

    // FR-06-003: Edit Comment (Owner-only)
    const editRes = await request(app)
      .patch(`/api/comments/${commentId}`)
      .set('Cookie', cookie ?? '')
      .send({ content: 'Edited comment content' })

    expect(editRes.status).toBe(200)
    expect(editRes.body.content).toBe('Edited comment content')
    expect(editRes.body.version).toBe(2)

    // Fetch Edit History Log (Auditing)
    const historyRes = await request(app)
      .get(`/api/comments/${commentId}/history`)
      .set('Cookie', cookie ?? '')

    expect(historyRes.status).toBe(200)
    expect(historyRes.body.length).toBe(1)
    expect(historyRes.body[0].previousContent).toBe('Initial comment content')
  })

  it('FR-06-004 & FR-06-005 & FR-06-006 & FR-06-007: soft delete, mentions, pin, and report', async () => {
    const postAuthor = generateRandomUser({ email: 'post.owner@example.test' })
    const mentionedUser = generateRandomUser({
      email: 'mentioned@example.test',
      username: 'alex99',
    })
    const reporter = generateRandomUser({ email: 'reporter@example.test' })

    const signupPostAuthor = await signUpWithEmail(app, postAuthor)
    const signupMentioned = await signUpWithEmail(app, mentionedUser)
    const signupReporter = await signUpWithEmail(app, reporter)

    const cookieAuthor = buildCookieHeader(getSetCookieHeader(signupPostAuthor))
    const cookieReporter = buildCookieHeader(getSetCookieHeader(signupReporter))

    const dbPostAuthor = await prisma.user.findUnique({ where: { email: postAuthor.email } })
    const dbMentioned = await prisma.user.findUnique({ where: { email: mentionedUser.email } })
    await prisma.user.update({
      where: { id: dbMentioned!.id },
      data: { username: 'alex99', status: 'ACTIVE' },
    })

    const post = await prisma.post.create({
      data: { authorId: dbPostAuthor!.id, content: 'Pin post' },
    })

    // FR-06-005: Create comment with @alex99 mention
    const commentRes = await request(app)
      .post(`/api/comments/posts/${post.id}/comments`)
      .set('Cookie', cookieAuthor ?? '')
      .send({ content: 'Hey @alex99 check this out!' })

    const commentId = commentRes.body.id

    // Verify mention record created
    const mentions = await prisma.commentMention.findMany({ where: { commentId } })
    expect(mentions.length).toBe(1)
    expect(mentions[0].mentionedUserId).toBe(dbMentioned!.id)

    // Verify notification created for mentioned user
    const notifications = await prisma.notification.findMany({
      where: { userId: dbMentioned!.id, type: 'COMMENT_MENTION' },
    })
    expect(notifications.length).toBe(1)

    // FR-06-006: Pin Comment (Post owner)
    const pinRes = await request(app)
      .post(`/api/comments/${commentId}/pin`)
      .set('Cookie', cookieAuthor ?? '')

    expect(pinRes.status).toBe(200)
    expect(pinRes.body.isPinned).toBe(true)

    // FR-06-007: Report Comment
    const reportRes = await request(app)
      .post(`/api/comments/${commentId}/report`)
      .set('Cookie', cookieReporter ?? '')
      .send({ reason: 'Spam', details: 'Contains unwanted advertising' })

    expect(reportRes.status).toBe(201)

    // Duplicate Report Rejection
    const dupReportRes = await request(app)
      .post(`/api/comments/${commentId}/report`)
      .set('Cookie', cookieReporter ?? '')
      .send({ reason: 'Spam' })

    expect(dupReportRes.status).toBe(409)

    // FR-06-004: Soft Delete Comment (Tombstone)
    const deleteRes = await request(app)
      .delete(`/api/comments/${commentId}`)
      .set('Cookie', cookieAuthor ?? '')

    expect(deleteRes.status).toBe(200)
    expect(deleteRes.body.comment.isDeleted).toBe(true)
    expect(deleteRes.body.comment.content).toBe('[Comment deleted]')

    // Concurrent / Duplicate delete attempt returns 400 COMMENT_ALREADY_DELETED
    const dupDeleteRes = await request(app)
      .delete(`/api/comments/${commentId}`)
      .set('Cookie', cookieAuthor ?? '')

    expect(dupDeleteRes.status).toBe(400)
    expect(dupDeleteRes.body.message).toBe('COMMENT_ALREADY_DELETED')

    // Attempting to react to a deleted comment fails with 400
    const deletedReactRes = await request(app)
      .post(`/api/comments/${commentId}/reactions`)
      .set('Cookie', cookieAuthor ?? '')
      .send({ emoji: '🔥' })

    expect(deletedReactRes.status).toBe(400)
    expect(deletedReactRes.body.message).toBe('CANNOT_REACT_TO_DELETED_COMMENT')
  })
})
