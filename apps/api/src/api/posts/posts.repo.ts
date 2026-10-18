import { badRequest, conflict, forbidden, notFound } from '../../../lib/http-error'
import { CommentsRepo } from '../comments/comments.repo'
import { prisma, Prisma } from '@lumina/db'

import type { PostCreateData, PostMediaCreateData } from './posts.types'

export namespace PostsRepo {
  type DbClient = Prisma.TransactionClient | typeof prisma
  export const createPost = async (tx: Prisma.TransactionClient, data: PostCreateData) => {
    return tx.post.create({
      data: {
        status: 'PUBLISHED',
        publishedAt: new Date(),
        ...data,
      },
    })
  }

  export const createMedia = async (
    tx: Prisma.TransactionClient,
    postId: string,
    media: PostMediaCreateData[]
  ) => {
    return tx.postMedia.createMany({
      data: media.map((item, index) => ({
        postId,
        type: item.type,
        url: item.url,
        key: item.key,
        mimeType: item.mimeType,
        size: item.size,
        width: item.width ?? null,
        height: item.height ?? null,
        duration: item.duration ?? null,
        order: index,
      })),
    })
  }

  export const createPostWithMedia = async (data: PostCreateData, media: PostMediaCreateData[]) => {
    return prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      const post = await createPost(tx, data)

      if (media.length > 0) {
        await createMedia(tx, post.id, media)
      }

      return findPostById(tx, post.id)
    })
  }

  export const findPostById = async (tx: DbClient, postId: string) => {
    return tx.post.findUnique({
      where: {
        id: postId,
      },
      include: {
        author: {
          select: {
            id: true,
            username: true,
            name: true,
            image: true,
          },
        },
        media: {
          orderBy: {
            order: 'asc',
          },
        },
      },
    })
  }

  export const findLike = (tx: Prisma.TransactionClient, userId: string, postId: string) => {
    return tx.like.findUnique({
      where: {
        userId_postId: {
          userId,
          postId,
        },
      },
    })
  }

  export const getLikeCount = async (tx: Prisma.TransactionClient, postId: string) => {
    return tx.like.count({
      where: {
        postId,
      },
    })
  }

  export const findPostWithAuthor = async (postId: string) =>
    prisma.post.findUnique({
      where: { id: postId },
      select: { id: true, authorId: true },
    })

  export const findCommentById = CommentsRepo.findCommentById
  export const createComment = CommentsRepo.createComment
  export const createCommentNotification = CommentsRepo.createCommentNotification

  export const findSavedPost = async (
    tx: Prisma.TransactionClient,
    userId: string,

    postId: string
  ) => {
    return tx.savedPost.findUnique({
      where: {
        userId_postId: {
          userId,

          postId,
        },
      },
    })
  }

  export const createSavedPost = async (
    tx: Prisma.TransactionClient,

    userId: string,

    postId: string
  ) => {
    return tx.savedPost.create({
      data: {
        userId,

        postId,
      },
    })
  }

  export const deleteSavedPost = async (
    tx: Prisma.TransactionClient,
    userId: string,
    postId: string
  ) => {
    return tx.savedPost.delete({
      where: {
        userId_postId: {
          userId,

          postId,
        },
      },
    })
  }

  export const findSavedPostsByUser = async (tx: Prisma.TransactionClient, userId: string) => {
    return tx.savedPost.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        post: {
          include: {
            author: {
              select: { id: true, username: true, name: true, image: true },
            },
          },
        },
      },
    })
  }

  export const isLiked = async (
    tx: Prisma.TransactionClient,
    userId: string,
    postId: string
  ): Promise<boolean> => {
    const like = await tx.like.findUnique({
      where: {
        userId_postId: {
          userId,
          postId,
        },
      },
      select: { id: true },
    })

    return like !== null
  }

  export const isSaved = async (
    tx: Prisma.TransactionClient,
    userId: string,
    postId: string
  ): Promise<boolean> => {
    const save = await tx.savedPost.findUnique({
      where: {
        userId_postId: {
          userId,
          postId,
        },
      },
      select: { id: true },
    })

    return save !== null
  }

  export const feedPostSelect = {
    id: true,
    title: true,
    subtitle: true,
    coverImage: true,
    blocks: true,
    content: true,
    category: true,
    topics: true,
    visibility: true,
    anonymous: true,
    isAnnouncement: true,
    location: true,
    createdAt: true,
    updatedAt: true,
    likeCount: true,
    commentCount: true,
    viewCount: true,
    shareCount: true,
    saveCount: true,
    author: {
      select: {
        id: true,
        username: true,
        name: true,
        image: true,
      },
    },
    media: {
      orderBy: {
        order: 'asc' as const,
      },
    },
  } as const

  export const findPublishedPostsByUserId = async (
    tx: DbClient,
    userId: string,
    limit = 20,
    cursor?: string
  ) => {
    return tx.post.findMany({
      where: {
        authorId: userId,
        deletedAt: null,
        scheduledAt: null,
        status: { not: 'SCHEDULED' },
      },
      orderBy: [{ createdAt: 'desc' }, { id: 'desc' }],
      take: limit + 1,
      ...(cursor ? { skip: 1, cursor: { id: cursor } } : {}),
      select: feedPostSelect,
    })
  }

  export const findScheduledPostsByUserId = async (
    tx: DbClient,
    userId: string,
    limit = 50,
    cursor?: string
  ) => {
    return tx.post.findMany({
      where: {
        authorId: userId,
        status: 'SCHEDULED',
      },
      orderBy: {
        scheduledAt: 'asc',
      },
      take: limit,
      ...(cursor ? { skip: 1, cursor: { id: cursor } } : {}),
      include: {
        author: {
          select: {
            id: true,
            username: true,
            name: true,
            image: true,
          },
        },
        media: {
          orderBy: {
            order: 'asc',
          },
        },
      },
    })
  }

  export const schedulePost = async (
    tx: Prisma.TransactionClient,
    userId: string,
    postId: string,
    scheduleTime: string
  ) => {
    const scheduledAt = new Date(scheduleTime)

    if (isNaN(scheduledAt.getTime()) || scheduledAt.getTime() <= Date.now()) {
      throw badRequest('INVALID_SCHEDULE_TIME', 'Schedule time must be a valid future ISO timestamp')
    }

    const current = await tx.post.findUnique({
      where: {
        id: postId,
      },
    })

    if (!current) {
      throw notFound('POST_NOT_FOUND')
    }

    if (current.authorId !== userId) {
      throw forbidden('ONLY_AUTHOR_CAN_SCHEDULE')
    }

    if (current.status === 'PUBLISHED') {
      throw conflict('POST_ALREADY_PUBLISHED')
    }

    if (current.status !== 'DRAFT' && current.status !== 'SCHEDULED') {
      throw badRequest('POST_CANNOT_BE_SCHEDULED')
    }

    const nextVersion = current.scheduleVersion + 1

    const result = await tx.post.updateMany({
      where: {
        id: postId,
        authorId: userId,
        status: current.status,
        scheduleVersion: current.scheduleVersion,
      },
      data: {
        status: 'SCHEDULED',
        scheduledAt,
        scheduleVersion: nextVersion,
      },
    })

    if (result.count !== 1) {
      throw conflict('POST_UPDATE_CONFLICT')
    }

    await tx.publishOutboxEvent.upsert({
      where: {
        postId_scheduleVersion: {
          postId,
          scheduleVersion: nextVersion,
        },
      },
      create: {
        postId,
        scheduleVersion: nextVersion,
        scheduledAt,
      },
      update: {
        scheduledAt,
        processedAt: null,
        lastError: null,
      },
    })

    return findPostById(tx, postId)
  }

  export const reschedulePost = async (
    tx: Prisma.TransactionClient,
    userId: string,
    postId: string,
    scheduleTime: string
  ) => {
    const scheduledAt = new Date(scheduleTime)

    if (isNaN(scheduledAt.getTime()) || scheduledAt.getTime() <= Date.now()) {
      throw badRequest('INVALID_SCHEDULE_TIME', 'Schedule time must be a valid future ISO timestamp')
    }

    const current = await tx.post.findUnique({
      where: {
        id: postId,
      },
    })

    if (!current) {
      throw notFound('POST_NOT_FOUND')
    }

    if (current.authorId !== userId) {
      throw forbidden('ONLY_AUTHOR_CAN_RESCHEDULE')
    }

    if (current.status === 'PUBLISHED') {
      throw conflict('POST_ALREADY_PUBLISHED')
    }

    if (current.status !== 'SCHEDULED') {
      throw badRequest('POST_NOT_SCHEDULED')
    }

    const nextVersion = current.scheduleVersion + 1

    const result = await tx.post.updateMany({
      where: {
        id: postId,
        authorId: userId,
        status: 'SCHEDULED',
        scheduleVersion: current.scheduleVersion,
      },
      data: {
        scheduledAt,
        scheduleVersion: nextVersion,
      },
    })

    if (result.count !== 1) {
      throw conflict('POST_UPDATE_CONFLICT')
    }

    await tx.publishOutboxEvent.upsert({
      where: {
        postId_scheduleVersion: {
          postId,
          scheduleVersion: nextVersion,
        },
      },
      create: {
        postId,
        scheduleVersion: nextVersion,
        scheduledAt,
      },
      update: {
        scheduledAt,
        processedAt: null,
        lastError: null,
      },
    })

    return findPostById(tx, postId)
  }

  export const deleteScheduledPost = async (
    tx: Prisma.TransactionClient,
    userId: string,
    postId: string
  ) => {
    const current = await tx.post.findUnique({
      where: {
        id: postId,
      },
    })

    if (!current) {
      throw notFound('POST_NOT_FOUND')
    }

    if (current.authorId !== userId) {
      throw forbidden('ONLY_AUTHOR_CAN_DELETE_SCHEDULED_POST')
    }

    if (current.status !== 'SCHEDULED') {
      throw badRequest('POST_NOT_SCHEDULED')
    }

    const nextVersion = current.scheduleVersion + 1

    const result = await tx.post.updateMany({
      where: {
        id: postId,
        authorId: userId,
        status: 'SCHEDULED',
        scheduleVersion: current.scheduleVersion,
      },
      data: {
        status: 'DRAFT',
        scheduledAt: null,
        scheduleVersion: nextVersion,
      },
    })

    if (result.count !== 1) {
      throw conflict('POST_UPDATE_CONFLICT')
    }

    await tx.publishOutboxEvent.deleteMany({
      where: {
        postId,
        processedAt: null,
      },
    })

    return findPostById(tx, postId)
  }

  export const publishPostImmediately = async (
    tx: Prisma.TransactionClient,
    userId: string,
    postId: string
  ) => {
    const current = await tx.post.findUnique({
      where: {
        id: postId,
      },
    })

    if (!current) {
      throw notFound('POST_NOT_FOUND')
    }

    if (current.authorId !== userId) {
      throw forbidden('ONLY_AUTHOR_CAN_PUBLISH')
    }

    if (current.status === 'PUBLISHED') {
      throw conflict('POST_ALREADY_PUBLISHED')
    }

    if (current.status !== 'DRAFT' && current.status !== 'SCHEDULED') {
      throw badRequest('POST_CANNOT_BE_SCHEDULED')
    }

    const nextVersion =
      current.status === 'SCHEDULED' ? current.scheduleVersion + 1 : current.scheduleVersion

    const result = await tx.post.updateMany({
      where: {
        id: postId,
        authorId: userId,
        status: current.status,
        scheduleVersion: current.scheduleVersion,
      },
      data: {
        status: 'PUBLISHED',
        publishedAt: new Date(),
        scheduledAt: null,
        scheduleVersion: nextVersion,
      },
    })

    if (result.count !== 1) {
      throw conflict('POST_UPDATE_CONFLICT')
    }

    await tx.publishOutboxEvent.deleteMany({
      where: {
        postId,
        processedAt: null,
      },
    })

    return findPostById(tx, postId)
  }

  export const publishScheduledPost = async (
    postId: string,
    scheduleVersion: number
  ) => {
    return prisma.$transaction(async (tx) => {
      const updated = await tx.post.updateMany({
        where: {
          id: postId,
          status: 'SCHEDULED',
          scheduleVersion,
          scheduledAt: {
            lte: new Date(),
          },
        },
        data: {
          status: 'PUBLISHED',
          publishedAt: new Date(),
          scheduledAt: null,
        },
      })

      if (updated.count !== 1) {
        return null
      }

      await tx.publishOutboxEvent.deleteMany({
        where: {
          postId,
          scheduleVersion,
        },
      })

      return findPostById(tx, postId)
    })
  }
}
