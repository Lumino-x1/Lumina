import { assertDeclaredMimeMatchesContent } from '../../lib/file-signature'
import { badRequest, conflict, forbidden, notFound } from '../../lib/http-error'
import {
  assertValidVideoDuration,
  getImageDimensions,
  getVideoMetadata,
  MAX_IMAGE_SIZE_BYTES,
  MAX_VIDEO_SIZE_BYTES,
} from './post.lib'
import * as postsRepository from './posts.repo'
import { prisma } from '@lumina/db'
import { deleteFile, uploadFile } from '@lumina/storage'
import type { CreatePostInput } from '@lumina/contracts'

export const createPost = async ({ userId, body, files }: CreatePostInput) => {
  const { content, visibility, anonymous = false, location } = body
  const trimmedLocation = location?.trim() ?? null

  const mediaFiles = files ?? []

  if ((!content || content.trim() === '') && mediaFiles.length === 0) {
    throw new Error('Post must contain either text or media.')
  }

  if (mediaFiles.length > 10) {
    throw new Error('Maximum 10 media files are allowed.')
  }

  const uploadedMedia: Array<{
    type: string
    url: string
    key: string
    mimeType: string
    size: number
    width: number | null
    height: number | null
    duration: number | null
  }> = []

  try {
    for (const file of mediaFiles) {
      if (file.mimetype.startsWith('image/')) {
        if (file.size > MAX_IMAGE_SIZE_BYTES) {
          throw badRequest('IMAGE_TOO_LARGE', 'Each image must be 5 MB or less.')
        }
        assertDeclaredMimeMatchesContent(file.mimetype, file.buffer)
        const { width, height } = await getImageDimensions(file as any)
        const uploaded = await uploadFile({
          buffer: file.buffer,
          mimeType: file.mimetype,
          folder: `posts/${userId}/media`,
        })
        uploadedMedia.push({
          type: 'IMAGE',
          url: uploaded.url,
          key: uploaded.key,
          mimeType: file.mimetype,
          size: file.size,
          width,
          height,
          duration: null,
        })
        continue
      }

      if (file.mimetype.startsWith('video/')) {
        if (file.size > MAX_VIDEO_SIZE_BYTES) {
          throw badRequest('VIDEO_TOO_LARGE', 'Each video must be 25 MB or less.')
        }
        assertDeclaredMimeMatchesContent(file.mimetype, file.buffer)
        const { width, height, duration } = await getVideoMetadata(file.buffer)
        const validatedDuration = assertValidVideoDuration(duration)
        const uploaded = await uploadFile({
          buffer: file.buffer,
          mimeType: file.mimetype,
          folder: `posts/${userId}/media`,
        })
        uploadedMedia.push({
          type: 'VIDEO',
          url: uploaded.url,
          key: uploaded.key,
          mimeType: file.mimetype,
          size: file.size,
          width,
          height,
          duration: validatedDuration,
        })
        continue
      }

      throw badRequest('UNSUPPORTED_MEDIA', 'Unsupported media type')
    }

    return await prisma.$transaction(async (tx) => {
      const post = await postsRepository.createPost(
        tx,
        userId,
        content,
        visibility,
        anonymous,
        trimmedLocation ? trimmedLocation : undefined
      )

      if (uploadedMedia.length > 0) {
        await postsRepository.createMedia(tx, post.id, uploadedMedia)
      }

      return await postsRepository.findPostById(tx, post.id)
    })
  } catch (error) {
    await Promise.all(
      uploadedMedia.map(async (media) => {
        try {
          await deleteFile(media.key)
        } catch {
          // best-effort orphan cleanup
        }
      })
    )
    throw error
  }
}

export const toggleLike = async (userId: string, postId: string) => {
  return prisma.$transaction(async (tx) => {
    const existing = await postsRepository.findLike(tx, userId, postId)
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
  return prisma.$transaction(async (tx) => {
    const count = await postsRepository.getLikeCount(tx, postId)
    return count
  })
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
  const post = await postsRepository.findPostWithAuthor(prisma, postId)

  if (!post) {
    throw notFound('POST_NOT_FOUND')
  }

  if (parentId) {
    const parentComment = await postsRepository.findCommentById(prisma, parentId)

    if (!parentComment) {
      throw notFound('PARENT_COMMENT_NOT_FOUND')
    }

    if (parentComment.postId !== postId) {
      throw badRequest('INVALID_PARENT_COMMENT')
    }
  }

  const comment = await postsRepository.createComment({
    tx: prisma,
    postId,
    userId,
    content,
    parentId,
  })

  if (post.authorId !== userId) {
    await postsRepository.createCommentNotification({
      tx: prisma,
      postAuthorId: post.authorId,
    })
  }

  return comment
}

const MAX_PINNED_COMMENTS = 3

export const listComments = async (postId: string, limit: number, cursor?: string) => {
  const post = await postsRepository.findPostById(prisma, postId)
  if (!post) {
    throw notFound('POST_NOT_FOUND')
  }
  return postsRepository.listComments(postId, limit, cursor)
}

export const pinComment = async (userId: string, commentId: string, isPinned: boolean) => {
  const comment = await postsRepository.findCommentById(prisma, commentId)
  if (!comment) {
    throw notFound('COMMENT_NOT_FOUND')
  }
  const post = await postsRepository.findPostById(prisma, comment.postId)
  if (!post) {
    throw notFound('POST_NOT_FOUND')
  }
  if (post.authorId !== userId) {
    throw forbidden('ONLY_AUTHOR_CAN_PIN')
  }

  return prisma.$transaction(
    async (tx) => {
      if (isPinned) {
        const pinned = await postsRepository.countPinnedComments(tx, comment.postId)
        if (pinned >= MAX_PINNED_COMMENTS) {
          throw conflict('PIN_LIMIT_REACHED', 'Maximum pinned comments exceeded')
        }
      }
      return postsRepository.setCommentPinned(tx, commentId, isPinned)
    },
    { isolationLevel: 'Serializable' }
  )
}

export const deleteComment = async (userId: string, commentId: string) => {
  const comment = await postsRepository.findCommentById(prisma, commentId)
  if (!comment) {
    throw notFound('COMMENT_NOT_FOUND')
  }
  const post = await postsRepository.findPostById(prisma, comment.postId)
  if (!post) {
    throw notFound('POST_NOT_FOUND')
  }
  if (comment.userId !== userId && post.authorId !== userId) {
    throw forbidden('COMMENT_DELETE_FORBIDDEN')
  }
  return postsRepository.deleteComment(commentId)
}

export const toggleSavePost = async ({ postId, userId }: { postId: string; userId: string }) => {
  const post = await postsRepository.findPostById(prisma as any, postId)

  if (!post) {
    throw new Error('POST_NOT_FOUND')
  }

  const existing = await postsRepository.findSavedPost(prisma, userId, postId)

  if (existing) {
    await postsRepository.deleteSavedPost(prisma as any, userId, postId)

    return {
      saved: false,
    }
  }

  await postsRepository.createSavedPost(prisma, userId, postId)

  return {
    saved: true,
  }
}

export const getMySavedPosts = async (userId: string) => {
  return postsRepository.findSavedPostsByUser(prisma as any, userId)
}
