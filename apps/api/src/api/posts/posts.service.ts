import { badRequest, conflict, forbidden, notFound } from '../../../lib/http-error'
import { PostsRepo } from './posts.repo'
import { prisma, Prisma } from '@lumina/db'

import type { CreatePostInput, PostMediaCreateData } from './posts.types'

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
    const post = await PostsRepo.findPostById(prisma as any, postId)

    if (!post) {
      throw new Error('POST_NOT_FOUND')
    }

    const existing = await PostsRepo.findSavedPost(prisma, userId, postId)

    if (existing) {
      await PostsRepo.deleteSavedPost(prisma as any, userId, postId)

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
    return PostsRepo.findSavedPostsByUser(prisma as any, userId)
  }

  export const createComment = async ({
    postId,
    userId,
    content,
    parentId,
  }: {
    postId: string
    userId: string
    content: string
    parentId?: string | null
  }) => {
    const post = await PostsRepo.findPostWithAuthor(postId)
    if (!post) throw notFound('POST_NOT_FOUND')

    if (parentId) {
      const parentComment = await PostsRepo.findCommentById(parentId)
      if (!parentComment) throw notFound('PARENT_COMMENT_NOT_FOUND')
      if (parentComment.postId !== postId) throw badRequest('INVALID_PARENT_COMMENT')
    }

    const comment = await PostsRepo.createComment({ postId, userId, content, parentId })
    if (post.authorId !== userId) {
      await PostsRepo.createCommentNotification(post.authorId)
    }
    return comment
  }

  export const listComments = async (postId: string, limit: number, cursor?: string) => {
    const post = await PostsRepo.findPostWithAuthor(postId)
    if (!post) throw notFound('POST_NOT_FOUND')
    return PostsRepo.listComments(postId, limit, cursor)
  }

  export const pinComment = async (userId: string, commentId: string, isPinned: boolean) => {
    const comment = await PostsRepo.findCommentById(commentId)
    if (!comment) throw notFound('COMMENT_NOT_FOUND')
    const post = await PostsRepo.findPostWithAuthor(comment.postId)
    if (!post) throw notFound('POST_NOT_FOUND')
    if (post.authorId !== userId) throw forbidden('ONLY_AUTHOR_CAN_PIN')

    return prisma.$transaction(
      async (tx: Prisma.TransactionClient) => {
        if (isPinned) {
          const pinned = await PostsRepo.countPinnedComments(tx, comment.postId)
          if (pinned >= 3) {
            throw conflict('PIN_LIMIT_REACHED', 'Maximum pinned comments exceeded')
          }
        }
        return PostsRepo.setCommentPinned(tx, commentId, isPinned)
      },
      { isolationLevel: 'Serializable' }
    )
  }

  export const deleteComment = async (userId: string, commentId: string) => {
    const comment = await PostsRepo.findCommentById(commentId)
    if (!comment) throw notFound('COMMENT_NOT_FOUND')
    const post = await PostsRepo.findPostWithAuthor(comment.postId)
    if (!post) throw notFound('POST_NOT_FOUND')
    if (comment.userId !== userId && post.authorId !== userId) {
      throw forbidden('COMMENT_DELETE_FORBIDDEN')
    }
    return PostsRepo.deleteComment(commentId)
  }
  export const countComment = async (postId: string) => {
    return PostsRepo.countComments(postId)
  }
}
