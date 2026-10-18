import { badRequest, conflict, forbidden, notFound } from '../../../lib/http-error';
import { PostsRepo } from './posts.repo';
import { prisma, Prisma } from '@lumina/db';
import { logger } from '@lumina/observability'

import { dispatchPublishOutbox } from '../publish/publish.outbox'
import { removePublishPost } from '../publish/publish.queue'
import { CommentsService } from '../comments/comments.service'
import type { CreatePostInput, PostMediaCreateData } from './posts.types';




export namespace PostsService {
  function parsePostJsonField(value: unknown, field: string): unknown {
    if (typeof value !== 'string') return value
    try {
      return JSON.parse(value)
    } catch {
      throw badRequest('INVALID_POST_PAYLOAD', `${field} must be valid JSON.`)
    }
  }

  export const createPost = async ({ userId, body }: CreatePostInput) => {
    const {
      title,
      subtitle,
      coverImage,
      blocks,
      content,
      category,
      topics: rawTopics,
      visibility = 'PUBLIC',
      anonymous = false,
      location = 'Unknown',
      media: rawMedia,
    } = body

    const topics =
      typeof rawTopics === 'string' && !rawTopics.trim().startsWith('[')
        ? rawTopics.split(',')
        : (parsePostJsonField(rawTopics, 'topics') ?? [])

    if (
      !Array.isArray(topics) ||
      topics.some((topic) => typeof topic !== 'string') ||
      topics.length > 20
    ) {
      throw badRequest('INVALID_POST_TOPICS', 'Topics must be an array of at most 20 strings.')
    }

    const normalizedTopics = topics.map((topic) => topic.trim()).filter(Boolean)

    const normalizedBlocks = parsePostJsonField(blocks, 'blocks')

    if (
      normalizedBlocks !== undefined &&
      normalizedBlocks !== null &&
      typeof normalizedBlocks !== 'object'
    ) {
      throw badRequest('INVALID_POST_BLOCKS', 'Blocks must be a JSON object or array.')
    }

    const trimmedLocation = location?.trim() || null

    const preUploadedMedia =
      typeof rawMedia === 'string'
        ? (parsePostJsonField(rawMedia, 'media') ?? [])
        : Array.isArray(rawMedia)
          ? rawMedia
          : []

    if (!Array.isArray(preUploadedMedia)) {
      throw badRequest('INVALID_POST_MEDIA', 'Media must be an array.')
    }

    if (preUploadedMedia.length > 20) {
      throw badRequest('TOO_MANY_MEDIA', 'Maximum 20 media files are allowed.')
    }

    const uploadedMedia: PostMediaCreateData[] = []

    for (const item of preUploadedMedia) {
      if (!item || typeof item !== 'object') {
        throw badRequest('INVALID_POST_MEDIA', 'Invalid media metadata.')
      }

      if (!item.key || !item.url) {
        throw badRequest('INVALID_POST_MEDIA', 'Media key and URL are required.')
      }

      const type = item.type === 'VIDEO' ? 'VIDEO' : 'IMAGE'

      uploadedMedia.push({
        type,
        url: item.url,
        key: item.key,
        mimeType:
          typeof item.mimeType === 'string'
            ? item.mimeType
            : type === 'VIDEO'
              ? 'video/mp4'
              : 'image/jpeg',
        size: Number(item.size) || 0,
        width: item.width ?? null,
        height: item.height ?? null,
        duration: item.duration ?? null,
      })
    }

    if (
      [title, subtitle, content, coverImage].every((value) => !value || value.trim() === '') &&
      normalizedBlocks === undefined &&
      uploadedMedia.length === 0
    ) {
      throw badRequest('EMPTY_POST', 'Post must contain content, blocks, or media.')
    }

    return PostsRepo.createPostWithMedia(
      {
        authorId: userId,
        title: title?.trim() || undefined,
        subtitle: subtitle?.trim() || undefined,
        coverImage: coverImage?.trim() || undefined,
        blocks: normalizedBlocks as Prisma.InputJsonValue | undefined,
        content: content?.trim() || undefined,
        category: category?.trim() || undefined,
        topics: normalizedTopics,
        visibility,
        anonymous,
        location: trimmedLocation || undefined,
      },
      uploadedMedia
    )
  }

  export const toggleLike = async (userId: string, postId: string) => {
    return prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      const existing = await PostsRepo.findLike(tx, userId, postId)
      if (existing) {
        await tx.like.delete({
          where: { id: existing.id },
        })

        await tx.post.update({
          where: { id: postId },
          data: {
            likeCount: {
              decrement: 1,
            },
          },
        })

        return {
          liked: false,
        }
      }

      await tx.like.create({
        data: {
          userId,
          postId,
        },
      })

      await tx.post.update({
        where: { id: postId },
        data: {
          likeCount: {
            increment: 1,
          },
        },
      })

      return {
        liked: true,
      }
    })
  }

  export const getLikeCount = async (postId: string) => {
    return prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      const count = await PostsRepo.getLikeCount(tx, postId)
      return count
    })
  }

  export const isLiked = async (userId: string, postId: string) => {
    return prisma.$transaction((tx: Prisma.TransactionClient) =>
      PostsRepo.isLiked(tx, userId, postId)
    )
  }
  export const isSaved = async (userId: string, postId: string) => {
    return prisma.$transaction((tx: Prisma.TransactionClient) =>
      PostsRepo.isSaved(tx, userId, postId)
    )
  }

  export const toggleSavePost = async ({ postId, userId }: { postId: string; userId: string }) => {
    const post = await PostsRepo.findPostById(prisma, postId)

    if (!post) {
      throw new Error('POST_NOT_FOUND')
    }

    const existing = await PostsRepo.findSavedPost(prisma, userId, postId)

    if (existing) {
      await PostsRepo.deleteSavedPost(prisma, userId, postId)

      return {
        saved: false,
      }
    }

    await PostsRepo.createSavedPost(prisma, userId, postId)

    return {
      saved: true,
    }
  }

  export const getMySavedPosts = async (userId: string) => {
    return PostsRepo.findSavedPostsByUser(prisma, userId)
  }

  export const createComment = CommentsService.createComment
  export const listComments = CommentsService.listComments
  export const pinComment = CommentsService.pinComment
  export const deleteComment = CommentsService.deleteComment
  export const countComment = CommentsService.countComment
  export const schedulePost = async (userId: string, postId: string, scheduleTime: string) => {
    const post = await PostsRepo.findPostById(prisma, postId)
    if (!post) throw notFound('POST_NOT_FOUND')
    if (post.authorId !== userId) throw forbidden('ONLY_AUTHOR_CAN_SCHEDULE')
    if (post.status === 'PUBLISHED') throw conflict('POST_ALREADY_PUBLISHED')
    if (post.status !== 'DRAFT' && post.status !== 'SCHEDULED') {
      throw badRequest('POST_CANNOT_BE_SCHEDULED')
    }

    const scheduled = await PostsRepo.schedulePost(prisma, userId, postId, scheduleTime)
    try {
      await dispatchPublishOutbox()
    } catch (error) {
      logger.error('Unable to dispatch scheduled post immediately', { metadata: { postId, error: String(error) } })
    }
    return scheduled
  }

  export const reschedulePost = async (userId: string, postId: string, scheduleTime: string) => {
    const post = await PostsRepo.findPostById(prisma, postId)
    if (!post) throw notFound('POST_NOT_FOUND')
    if (post.authorId !== userId) throw forbidden('ONLY_AUTHOR_CAN_RESCHEDULE')
    if (post.status === 'PUBLISHED') throw conflict('POST_ALREADY_PUBLISHED')
    if (post.status !== 'SCHEDULED') throw badRequest('POST_NOT_SCHEDULED')

    const scheduled = await PostsRepo.reschedulePost(prisma, userId, postId, scheduleTime)
    try {
      await removePublishPost(postId, post.scheduleVersion)
      await dispatchPublishOutbox()
    } catch (error) {
      logger.error('Unable to dispatch rescheduled post immediately', { metadata: { postId, error: String(error) } })
    }
    return scheduled
  }

  export const deleteScheduledPost = async (userId: string, postId: string) => {
    const post = await PostsRepo.findPostById(prisma, postId)
    if (!post) throw notFound('POST_NOT_FOUND')
    if (post.authorId !== userId) throw forbidden('ONLY_AUTHOR_CAN_DELETE_SCHEDULED_POST')
    if (post.status !== 'SCHEDULED') throw badRequest('POST_NOT_SCHEDULED')

    const draft = await PostsRepo.deleteScheduledPost(prisma, userId, postId)
    try {
      await removePublishPost(postId, post.scheduleVersion)
    } catch {
      // safe fallback
    }
    return draft
  }

  export const publishPostImmediately = async (userId: string, postId: string) => {
    const post = await PostsRepo.findPostById(prisma, postId)
    if (!post) throw notFound('POST_NOT_FOUND')
    if (post.authorId !== userId) throw forbidden('ONLY_AUTHOR_CAN_PUBLISH')
    if (post.status === 'PUBLISHED') throw conflict('POST_ALREADY_PUBLISHED')
    if (post.status !== 'DRAFT' && post.status !== 'SCHEDULED') {
      throw badRequest('POST_CANNOT_BE_SCHEDULED')
    }

    const published = await PostsRepo.publishPostImmediately(prisma, userId, postId)
    if (post.status === 'SCHEDULED') {
      try {
        await removePublishPost(postId, post.scheduleVersion)
      } catch {
        // safe fallback
      }
    }
    return published
  }

  export const getScheduledPosts = async (userId: string, limit?: number, cursor?: string) => {
    return PostsRepo.findScheduledPostsByUserId(prisma, userId, limit, cursor)
  }

  export const getMyPosts = async (userId: string, limit = 20, cursor?: string) => {
    const posts = await PostsRepo.findPublishedPostsByUserId(prisma, userId, limit, cursor)
    const hasMore = posts.length > limit
    const page = hasMore ? posts.slice(0, limit) : posts

    const postIds = page.map((p) => p.id)
    const [likedList, savedList] = await Promise.all([
      prisma.like.findMany({
        where: { userId, postId: { in: postIds } },
        select: { postId: true },
      }),
      prisma.savedPost.findMany({
        where: { userId, postId: { in: postIds } },
        select: { postId: true },
      }),
    ])
    const likedSet = new Set(likedList.map((l) => l.postId))
    const savedSet = new Set(savedList.map((s) => s.postId))

    const items = page.map((post) => ({
      ...post,
      isLiked: likedSet.has(post.id),
      isSaved: savedSet.has(post.id),
      totalComments: post.commentCount,
    }))

    return {
      items,
      nextCursor: hasMore ? (items[items.length - 1]?.id ?? null) : null,
    }
  }
}
