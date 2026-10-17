import { createTestApp } from '../helpers/app'
import {
  buildCookieHeader,
  clearCapturedEmails,
  getSetCookieHeader,
  installResendFetchMock,
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
import { findCollegeFeed } from '../../../apps/api/src/api/feed/feed.repo'

describe('Post Author Username Generation and Selection', () => {
  const app = createTestApp()

  beforeAll(async () => {
    installResendFetchMock()
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

  it('generates username using firstName + lastName + 4 digits upon signup and exposes it in posts', async () => {
    const userPayload = generateRandomUser({
      name: 'Pooja Sharma',
    })

    const signupRes = await signUpWithEmail(app, userPayload)
    expect(signupRes.status).toBe(200)

    const user = signupRes.body.user
    expect(user.username).toMatch(/^poojasharma\d{4}$/)

    const dbUser = await prisma.user.findUnique({
      where: { id: user.id },
    })
    expect(dbUser?.username).toBe(user.username)

    // Create a post as this user
    const post = await prisma.post.create({
      data: {
        authorId: user.id,
        title: 'Building Modern Web Apps',
        content: 'Technical insights on microfrontends and reactivity.',
        visibility: 'PUBLIC',
      },
    })

    // Verify findPostById selects author with username and name
    const foundPost = await PostsRepo.findPostById(prisma, post.id)
    expect(foundPost).toBeDefined()
    expect(foundPost?.author).toEqual(
      expect.objectContaining({
        id: user.id,
        name: 'Pooja Sharma',
        username: user.username,
      })
    )

    // Verify feed repository also selects author.username
    const college = await prisma.college.create({
      data: {
        name: 'PSG Tech',
        slug: `psg-${Date.now()}`,
        domain: `psg-${Date.now()}.edu`,
      },
    })
    await prisma.user.update({
      where: { id: user.id },
      data: { collegeId: college.id },
    })

    const feedItems = await findCollegeFeed(college.id, 10)
    expect(feedItems.length).toBeGreaterThanOrEqual(1)
    const feedItem = feedItems.find((item) => item.id === post.id)
    expect(feedItem).toBeDefined()
    expect(feedItem?.author).toEqual(
      expect.objectContaining({
        id: user.id,
        name: 'Pooja Sharma',
        username: user.username,
      })
    )
  })

  it('generates username for single name without last name (firstName + 4 digits)', async () => {
    const userPayload = generateRandomUser({
      name: 'Kavitha',
    })

    const signupRes = await signUpWithEmail(app, userPayload)
    expect(signupRes.status).toBe(200)

    const user = signupRes.body.user
    expect(user.username).toMatch(/^kavitha\d{4}$/)

    const dbUser = await prisma.user.findUnique({
      where: { id: user.id },
    })
    expect(dbUser?.username).toBe(user.username)
  })
})
