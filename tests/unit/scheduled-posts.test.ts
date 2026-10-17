import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest'

// Mock dependencies before importing the modules under test
vi.mock('@lumina/db', () => {
  const mockPost = {
    findUnique: vi.fn(),
    findFirst: vi.fn(),
    findMany: vi.fn(),
    updateMany: vi.fn(),
    findUniqueOrThrow: vi.fn(),
  }
  const mockPublishOutboxEvent = {
    upsert: vi.fn(),
    deleteMany: vi.fn(),
    findMany: vi.fn(),
    update: vi.fn(),
  }
  return {
    prisma: {
      post: mockPost,
      publishOutboxEvent: mockPublishOutboxEvent,
      $transaction: vi.fn(async (cb: any) =>
        cb({
          post: mockPost,
          publishOutboxEvent: mockPublishOutboxEvent,
        })
      ),
    },
    Prisma: {},
  }
})

vi.mock('@lumina/observability', () => ({
  logger: {
    info: vi.fn(),
    warn: vi.fn(),
    error: vi.fn(),
  },
}))

vi.mock('../../apps/api/config/config.redis', () => ({
  redis: {},
}))

vi.mock('../../apps/api/src/api/publish/publish.queue', () => ({
  publishingQueue: {
    add: vi.fn(),
    getJob: vi.fn(),
    close: vi.fn(),
  },
  enqueuePublishPost: vi.fn().mockResolvedValue({ id: 'job-1' }),
  removePublishPost: vi.fn().mockResolvedValue(undefined),
  publishJobId: (postId: string, v: number) => `publish-${postId}-v${v}`,
}))

import { prisma } from '@lumina/db'
import { PostsService } from '../../apps/api/src/api/posts/posts.service'
import { PostsRepo } from '../../apps/api/src/api/posts/posts.repo'
import { processPublishPostJob } from '../../apps/api/src/api/publish/publish.worker'
import { dispatchPublishOutbox, reconcileOverduePublishedPosts } from '../../apps/api/src/api/publish/publish.outbox'
import { enqueuePublishPost, removePublishPost } from '../../apps/api/src/api/publish/publish.queue'

describe('Scheduled Posts - Unit Tests', () => {
  const authorId = 'author-user-1'
  const otherUserId = 'other-user-2'
  const postId = 'post-123'
  const futureIso = new Date(Date.now() + 3600 * 1000).toISOString()
  const pastIso = new Date(Date.now() - 3600 * 1000).toISOString()

  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(prisma.publishOutboxEvent.findMany).mockResolvedValue([])
    vi.mocked(prisma.post.findMany).mockResolvedValue([])
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('1. AUTHORIZATION', () => {
    it('allows author to schedule their own draft', async () => {
      const mockPost = {
        id: postId,
        authorId,
        status: 'DRAFT',
        scheduleVersion: 0,
      }
      vi.spyOn(PostsRepo, 'findPostById').mockResolvedValue(mockPost as any)
      vi.spyOn(PostsRepo, 'schedulePost').mockResolvedValue({
        ...mockPost,
        status: 'SCHEDULED',
        scheduledAt: new Date(futureIso),
        scheduleVersion: 1,
      } as any)

      const result = await PostsService.schedulePost(authorId, postId, futureIso)
      expect(result.status).toBe('SCHEDULED')
      expect(result.scheduleVersion).toBe(1)
    })

    it('rejects another user from scheduling the post (ONLY_AUTHOR_CAN_SCHEDULE)', async () => {
      const mockPost = {
        id: postId,
        authorId,
        status: 'DRAFT',
        scheduleVersion: 0,
      }
      vi.spyOn(PostsRepo, 'findPostById').mockResolvedValue(mockPost as any)

      await expect(PostsService.schedulePost(otherUserId, postId, futureIso)).rejects.toThrow(
        expect.objectContaining({ code: 'ONLY_AUTHOR_CAN_SCHEDULE' })
      )
    })

    it('rejects another user from rescheduling the post (ONLY_AUTHOR_CAN_RESCHEDULE)', async () => {
      const mockPost = {
        id: postId,
        authorId,
        status: 'SCHEDULED',
        scheduleVersion: 1,
      }
      vi.spyOn(PostsRepo, 'findPostById').mockResolvedValue(mockPost as any)

      await expect(PostsService.reschedulePost(otherUserId, postId, futureIso)).rejects.toThrow(
        expect.objectContaining({ code: 'ONLY_AUTHOR_CAN_RESCHEDULE' })
      )
    })

    it('rejects another user from canceling the scheduled post (ONLY_AUTHOR_CAN_DELETE_SCHEDULED_POST)', async () => {
      const mockPost = {
        id: postId,
        authorId,
        status: 'SCHEDULED',
        scheduleVersion: 1,
      }
      vi.spyOn(PostsRepo, 'findPostById').mockResolvedValue(mockPost as any)

      await expect(PostsService.deleteScheduledPost(otherUserId, postId)).rejects.toThrow(
        expect.objectContaining({ code: 'ONLY_AUTHOR_CAN_DELETE_SCHEDULED_POST' })
      )
    })

    it('rejects another user from publishing the post immediately (ONLY_AUTHOR_CAN_PUBLISH)', async () => {
      const mockPost = {
        id: postId,
        authorId,
        status: 'SCHEDULED',
        scheduleVersion: 1,
      }
      vi.spyOn(PostsRepo, 'findPostById').mockResolvedValue(mockPost as any)

      await expect(PostsService.publishPostImmediately(otherUserId, postId)).rejects.toThrow(
        expect.objectContaining({ code: 'ONLY_AUTHOR_CAN_PUBLISH' })
      )
    })

    it('filters scheduled posts strictly by authenticated userId', async () => {
      vi.mocked(prisma.post.findMany).mockResolvedValueOnce([
        { id: 'post-1', authorId, status: 'SCHEDULED' },
      ] as any)

      await PostsService.getScheduledPosts(authorId)

      expect(prisma.post.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: {
            authorId,
            status: 'SCHEDULED',
          },
        })
      )
    })
  })

  describe('2. VALIDATION', () => {
    it('rejects non-existent post (POST_NOT_FOUND)', async () => {
      vi.spyOn(PostsRepo, 'findPostById').mockResolvedValue(null)

      await expect(PostsService.schedulePost(authorId, 'non-existent', futureIso)).rejects.toThrow(
        expect.objectContaining({ code: 'POST_NOT_FOUND' })
      )
    })

    it('rejects invalid timestamp string (INVALID_SCHEDULE_TIME)', async () => {
      const mockPost = { id: postId, authorId, status: 'DRAFT', scheduleVersion: 0 }
      vi.spyOn(PostsRepo, 'findPostById').mockResolvedValue(mockPost as any)

      await expect(PostsService.schedulePost(authorId, postId, 'not-a-valid-date')).rejects.toThrow(
        expect.objectContaining({ code: 'INVALID_SCHEDULE_TIME' })
      )
    })

    it('rejects past timestamp (INVALID_SCHEDULE_TIME)', async () => {
      const mockPost = { id: postId, authorId, status: 'DRAFT', scheduleVersion: 0 }
      vi.spyOn(PostsRepo, 'findPostById').mockResolvedValue(mockPost as any)

      await expect(PostsService.schedulePost(authorId, postId, pastIso)).rejects.toThrow(
        expect.objectContaining({ code: 'INVALID_SCHEDULE_TIME' })
      )
    })

    it('rejects scheduling an already published post (POST_ALREADY_PUBLISHED)', async () => {
      const mockPost = { id: postId, authorId, status: 'PUBLISHED', scheduleVersion: 0 }
      vi.spyOn(PostsRepo, 'findPostById').mockResolvedValue(mockPost as any)

      await expect(PostsService.schedulePost(authorId, postId, futureIso)).rejects.toThrow(
        expect.objectContaining({ code: 'POST_ALREADY_PUBLISHED' })
      )
    })

    it('rejects canceling a non-scheduled post (POST_NOT_SCHEDULED)', async () => {
      const mockPost = { id: postId, authorId, status: 'DRAFT', scheduleVersion: 0 }
      vi.spyOn(PostsRepo, 'findPostById').mockResolvedValue(mockPost as any)

      await expect(PostsService.deleteScheduledPost(authorId, postId)).rejects.toThrow(
        expect.objectContaining({ code: 'POST_NOT_SCHEDULED' })
      )
    })

    it('rejects rescheduling a non-scheduled post (POST_NOT_SCHEDULED)', async () => {
      const mockPost = { id: postId, authorId, status: 'DRAFT', scheduleVersion: 0 }
      vi.spyOn(PostsRepo, 'findPostById').mockResolvedValue(mockPost as any)

      await expect(PostsService.reschedulePost(authorId, postId, futureIso)).rejects.toThrow(
        expect.objectContaining({ code: 'POST_NOT_SCHEDULED' })
      )
    })

    it('rejects invalid post status transitions such as ARCHIVED (POST_CANNOT_BE_SCHEDULED)', async () => {
      const mockPost = { id: postId, authorId, status: 'ARCHIVED', scheduleVersion: 0 }
      vi.spyOn(PostsRepo, 'findPostById').mockResolvedValue(mockPost as any)

      await expect(PostsService.schedulePost(authorId, postId, futureIso)).rejects.toThrow(
        expect.objectContaining({ code: 'POST_CANNOT_BE_SCHEDULED' })
      )
    })
  })

  describe('3. SCHEDULING & CONCURRENCY', () => {
    it('increments scheduleVersion and creates outbox event on schedule', async () => {
      const mockPost = { id: postId, authorId, status: 'DRAFT', scheduleVersion: 3 }
      const mockTx = {
        post: {
          findUnique: vi.fn().mockResolvedValue(mockPost),
          updateMany: vi.fn().mockResolvedValue({ count: 1 }),
        },
        publishOutboxEvent: {
          upsert: vi.fn().mockResolvedValue({}),
        },
      }
      vi.spyOn(PostsRepo, 'findPostById').mockResolvedValue({
        ...mockPost,
        status: 'SCHEDULED',
        scheduleVersion: 4,
      } as any)

      const scheduled = await PostsRepo.schedulePost(mockTx as any, authorId, postId, futureIso)
      expect(mockTx.post.updateMany).toHaveBeenCalledWith({
        where: {
          id: postId,
          authorId,
          status: 'DRAFT',
          scheduleVersion: 3,
        },
        data: {
          status: 'SCHEDULED',
          scheduledAt: expect.any(Date),
          scheduleVersion: 4,
        },
      })
      expect(mockTx.publishOutboxEvent.upsert).toHaveBeenCalledWith({
        where: {
          postId_scheduleVersion: {
            postId,
            scheduleVersion: 4,
          },
        },
        create: {
          postId,
          scheduleVersion: 4,
          scheduledAt: expect.any(Date),
        },
        update: {
          scheduledAt: expect.any(Date),
          processedAt: null,
          lastError: null,
        },
      })
      expect(scheduled?.scheduleVersion).toBe(4)
    })

    it('detects concurrent conflict during scheduling (POST_UPDATE_CONFLICT)', async () => {
      const mockPost = { id: postId, authorId, status: 'DRAFT', scheduleVersion: 0 }
      const mockTx = {
        post: {
          findUnique: vi.fn().mockResolvedValue(mockPost),
          updateMany: vi.fn().mockResolvedValue({ count: 0 }), // Lost race!
        },
      }

      await expect(PostsRepo.schedulePost(mockTx as any, authorId, postId, futureIso)).rejects.toThrow(
        expect.objectContaining({ code: 'POST_UPDATE_CONFLICT' })
      )
    })

    it('invalidates old BullMQ job after rescheduling', async () => {
      const mockPost = { id: postId, authorId, status: 'SCHEDULED', scheduleVersion: 2 }
      vi.spyOn(PostsRepo, 'findPostById').mockResolvedValue(mockPost as any)
      vi.spyOn(PostsRepo, 'reschedulePost').mockResolvedValue({
        ...mockPost,
        scheduleVersion: 3,
      } as any)

      await PostsService.reschedulePost(authorId, postId, futureIso)

      expect(removePublishPost).toHaveBeenCalledWith(postId, 2)
    })

    it('invalidates pending scheduled job upon immediate publishing', async () => {
      const mockPost = { id: postId, authorId, status: 'SCHEDULED', scheduleVersion: 4 }
      vi.spyOn(PostsRepo, 'findPostById').mockResolvedValue(mockPost as any)
      vi.spyOn(PostsRepo, 'publishPostImmediately').mockResolvedValue({
        ...mockPost,
        status: 'PUBLISHED',
        scheduleVersion: 5,
      } as any)

      await PostsService.publishPostImmediately(authorId, postId)

      expect(removePublishPost).toHaveBeenCalledWith(postId, 4)
    })

    it('orders scheduled posts by scheduledAt ascending', async () => {
      const mockTx = {
        post: {
          findMany: vi.fn().mockResolvedValue([]),
        },
      }

      await PostsRepo.findScheduledPostsByUserId(mockTx as any, authorId)
      expect(mockTx.post.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { authorId, status: 'SCHEDULED' },
          orderBy: { scheduledAt: 'asc' },
        })
      )
    })
  })

  describe('4. WORKER 15-STEP PUBLISHING LOGIC', () => {
    it('Step 1: ignores jobs with unexpected name', async () => {
      const res = await processPublishPostJob({
        name: 'other-job',
        data: { postId, scheduleVersion: 1 },
      })
      expect(res.status).toBe('skipped')
      expect(res.reason).toBe('IGNORED_JOB_NAME')
    })

    it('Step 1: handles missing or invalid job payload', async () => {
      const res = await processPublishPostJob({
        name: 'publish-post',
        data: {} as any,
      })
      expect(res.status).toBe('skipped')
      expect(res.reason).toBe('INVALID_JOB_PAYLOAD')
    })

    it('Step 3: finishes safely if post no longer exists in PostgreSQL', async () => {
      vi.mocked(prisma.post.findUnique).mockResolvedValue(null)

      const res = await processPublishPostJob({
        name: 'publish-post',
        data: { postId, scheduleVersion: 1 },
      })
      expect(res.status).toBe('skipped')
      expect(res.reason).toBe('POST_NOT_FOUND')
    })

    it('Step 4: finishes safely if post is no longer SCHEDULED', async () => {
      vi.mocked(prisma.post.findUnique).mockResolvedValue({
        id: postId,
        status: 'DRAFT',
        scheduleVersion: 1,
      } as any)

      const res = await processPublishPostJob({
        name: 'publish-post',
        data: { postId, scheduleVersion: 1 },
      })
      expect(res.status).toBe('skipped')
      expect(res.reason).toBe('POST_NOT_SCHEDULED')
    })

    it('Step 5: finishes without publishing if job version is stale', async () => {
      vi.mocked(prisma.post.findUnique).mockResolvedValue({
        id: postId,
        status: 'SCHEDULED',
        scheduleVersion: 2, // Post has been rescheduled to v2!
      } as any)

      const res = await processPublishPostJob({
        name: 'publish-post',
        data: { postId, scheduleVersion: 1 }, // Stale job v1
      })
      expect(res.status).toBe('skipped')
      expect(res.reason).toBe('STALE_VERSION')
    })

    it('Step 6: finishes safely if scheduledAt is missing', async () => {
      vi.mocked(prisma.post.findUnique).mockResolvedValue({
        id: postId,
        status: 'SCHEDULED',
        scheduleVersion: 1,
        scheduledAt: null,
      } as any)

      const res = await processPublishPostJob({
        name: 'publish-post',
        data: { postId, scheduleVersion: 1 },
      })
      expect(res.status).toBe('skipped')
      expect(res.reason).toBe('MISSING_SCHEDULED_AT')
    })

    it('Step 7: re-enqueues delayed job if scheduledAt is still in the future', async () => {
      const futureDate = new Date(Date.now() + 60000)
      vi.mocked(prisma.post.findUnique).mockResolvedValue({
        id: postId,
        status: 'SCHEDULED',
        scheduleVersion: 1,
        scheduledAt: futureDate,
      } as any)

      const res = await processPublishPostJob({
        name: 'publish-post',
        data: { postId, scheduleVersion: 1 },
      })
      expect(res.status).toBe('delayed')
      expect(enqueuePublishPost).toHaveBeenCalledWith(postId, 1, futureDate)
    })

    it('Step 8-13: atomically publishes due post and logs success', async () => {
      const dueDate = new Date(Date.now() - 5000)
      vi.mocked(prisma.post.findUnique).mockResolvedValue({
        id: postId,
        status: 'SCHEDULED',
        scheduleVersion: 1,
        scheduledAt: dueDate,
      } as any)

      vi.spyOn(PostsRepo, 'publishScheduledPost').mockResolvedValue({
        id: postId,
        status: 'PUBLISHED',
        publishedAt: new Date(),
        scheduledAt: null,
      } as any)

      const res = await processPublishPostJob({
        name: 'publish-post',
        data: { postId, scheduleVersion: 1 },
      })
      expect(res.status).toBe('published')
      expect(PostsRepo.publishScheduledPost).toHaveBeenCalledWith(postId, 1)
    })

    it('Step 9: handles concurrent worker claim safely without duplicate publishing', async () => {
      const dueDate = new Date(Date.now() - 5000)
      vi.mocked(prisma.post.findUnique).mockResolvedValue({
        id: postId,
        status: 'SCHEDULED',
        scheduleVersion: 1,
        scheduledAt: dueDate,
      } as any)

      // Another worker already claimed the post
      vi.spyOn(PostsRepo, 'publishScheduledPost').mockResolvedValue(null)

      const res = await processPublishPostJob({
        name: 'publish-post',
        data: { postId, scheduleVersion: 1 },
      })
      expect(res.status).toBe('skipped')
      expect(res.reason).toBe('CONCURRENT_CLAIM_LOST')
    })
  })

  describe('5. OUTBOX DISPATCHER & RECONCILIATION', () => {
    it('dispatches unprocessed outbox events into BullMQ and marks processed', async () => {
      const event = {
        id: 'outbox-1',
        postId,
        scheduleVersion: 1,
        scheduledAt: new Date(futureIso),
        processedAt: null,
      }
      vi.mocked(prisma.publishOutboxEvent.findMany).mockResolvedValue([event] as any)
      vi.mocked(prisma.post.findUnique).mockResolvedValue({
        status: 'SCHEDULED',
        scheduleVersion: 1,
        scheduledAt: new Date(futureIso),
      } as any)
      vi.mocked(prisma.publishOutboxEvent.update).mockResolvedValue({} as any)

      const count = await dispatchPublishOutbox(10)
      expect(count).toBe(1)
      expect(enqueuePublishPost).toHaveBeenCalledWith(postId, 1, expect.any(Date))
      expect(prisma.publishOutboxEvent.update).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { id: 'outbox-1' },
          data: expect.objectContaining({ processedAt: expect.any(Date) }),
        })
      )
    })

    it('reconciles overdue scheduled posts and re-enqueues them', async () => {
      const overduePost = {
        id: postId,
        scheduleVersion: 2,
        scheduledAt: new Date(Date.now() - 60000),
      }
      vi.mocked(prisma.post.findMany).mockResolvedValue([overduePost] as any)

      const count = await reconcileOverduePublishedPosts(10)
      expect(count).toBe(1)
      expect(enqueuePublishPost).toHaveBeenCalledWith(postId, 2, overduePost.scheduledAt)
    })
  })
})
