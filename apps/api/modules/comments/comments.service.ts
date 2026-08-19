import {
  createCommentRecord,
  createMentionsRepo,
  createReportRepo,
  findCommentById,
  findPostById,
  getCommentEditHistoryRepo,
  getCommentsForPostRepo,
  removeReactionRepo,
  softDeleteCommentRepo,
  togglePinCommentRepo,
  toggleReactionRepo,
  updateCommentContentRepo,
} from './comments.repo'
import { prisma } from '@lumina/db'
import { logger } from '@lumina/observability'

export const MAX_COMMENT_DEPTH = 10 // Depths 0 through 9 (max depth limit 10)
export const MAX_PINNED_COMMENTS_PER_POST = 3
export const DEFAULT_PAGE_LIMIT = 20
export const MAX_PAGE_LIMIT = 50

const EMOJI_REGEX = /^(\p{Extended_Pictographic}|\p{Emoji_Presentation}|\u200d|\ufe0f){1,16}$/u

export function validateEmoji(emoji: string): string {
  const trimmed = emoji?.trim()
  if (!trimmed || trimmed.length === 0) {
    throw { status: 400, message: 'Emoji character is required' }
  }
  if (trimmed.length > 16 || !EMOJI_REGEX.test(trimmed)) {
    throw { status: 400, message: 'INVALID_EMOJI_FORMAT' }
  }
  return trimmed
}

export async function createCommentService(params: {
  postId: string
  userId: string
  content: string
  parentId?: string
}) {
  const { postId, userId, content, parentId } = params

  const trimmedContent = content?.trim()
  if (!trimmedContent || trimmedContent.length === 0) {
    throw { status: 400, message: 'Comment content cannot be empty' }
  }

  if (trimmedContent.length > 2000) {
    throw { status: 400, message: 'Comment content exceeds maximum limit of 2000 characters' }
  }

  const post = await findPostById(postId)
  if (!post) {
    throw { status: 404, message: 'POST_NOT_FOUND' }
  }

  let calculatedDepth = 0
  if (parentId) {
    const parentComment = await findCommentById(parentId)
    if (!parentComment) {
      throw { status: 404, message: 'PARENT_COMMENT_NOT_FOUND' }
    }

    if (parentComment.postId !== postId) {
      throw { status: 400, message: 'PARENT_COMMENT_POST_MISMATCH' }
    }

    if (parentComment.isDeleted) {
      throw { status: 400, message: 'CANNOT_REPLY_TO_DELETED_COMMENT' }
    }

    if (parentComment.depth >= MAX_COMMENT_DEPTH - 1) {
      throw { status: 422, message: 'COMMENT_MAX_DEPTH_EXCEEDED' }
    }

    calculatedDepth = parentComment.depth + 1
  }

  const comment = await createCommentRecord({
    content: trimmedContent,
    postId,
    userId,
    parentId,
    depth: calculatedDepth,
  })

  // Parse @username mentions
  const mentionMatches = trimmedContent.match(/@([a-zA-Z0-9_]+)/g)
  if (mentionMatches && mentionMatches.length > 0) {
    const usernames = Array.from(new Set(mentionMatches.map((m) => m.substring(1))))
    const mentionedUserIds = await createMentionsRepo(comment.id, usernames)

    for (const mentionedUserId of mentionedUserIds) {
      if (mentionedUserId !== userId) {
        await prisma.notification.create({
          data: {
            userId: mentionedUserId,
            title: 'You were mentioned in a comment',
            body: `${comment.user.name || 'Someone'} mentioned you in a comment`,
            type: 'COMMENT_MENTION',
          },
        })
      }
    }
  }

  // Create notification for post author / parent author
  if (post.authorId !== userId) {
    await prisma.notification.create({
      data: {
        userId: post.authorId,
        title: parentId ? 'New reply to comment' : 'New comment on your post',
        body: `${comment.user.name || 'Someone'} ${parentId ? 'replied to a comment' : 'commented on your post'}`,
        type: parentId ? 'COMMENT_REPLY' : 'COMMENT',
      },
    })
  }

  return comment
}

export async function getCommentsForPostService(postId: string, cursor?: string, limit = 20) {
  const post = await findPostById(postId)
  if (!post) {
    throw { status: 404, message: 'POST_NOT_FOUND' }
  }

  const numLimit =
    typeof limit === 'number' ? limit : parseInt(String(limit), 10) || DEFAULT_PAGE_LIMIT
  const safeLimit = Math.min(Math.max(1, numLimit), MAX_PAGE_LIMIT)

  return getCommentsForPostRepo(postId, cursor, safeLimit)
}

export async function editCommentService(params: {
  commentId: string
  userId: string
  content: string
}) {
  const { commentId, userId, content } = params

  const trimmedContent = content?.trim()
  if (!trimmedContent || trimmedContent.length === 0) {
    throw { status: 400, message: 'Comment content cannot be empty' }
  }

  const comment = await findCommentById(commentId)
  if (!comment) {
    throw { status: 404, message: 'COMMENT_NOT_FOUND' }
  }

  if (comment.userId !== userId) {
    throw { status: 403, message: 'NOT_AUTHORIZED_TO_EDIT_COMMENT' }
  }

  if (comment.isDeleted) {
    throw { status: 400, message: 'CANNOT_EDIT_DELETED_COMMENT' }
  }

  return updateCommentContentRepo(
    commentId,
    trimmedContent,
    comment.content,
    userId,
    comment.version
  )
}

export async function getCommentEditHistoryService(commentId: string) {
  const comment = await findCommentById(commentId)
  if (!comment) {
    throw { status: 404, message: 'COMMENT_NOT_FOUND' }
  }

  return getCommentEditHistoryRepo(commentId)
}

export async function deleteCommentService(params: {
  commentId: string
  userId: string
  userRole?: string
}) {
  const { commentId, userId, userRole } = params

  const comment = await findCommentById(commentId)
  if (!comment) {
    throw { status: 404, message: 'COMMENT_NOT_FOUND' }
  }

  if (comment.isDeleted) {
    throw { status: 400, message: 'COMMENT_ALREADY_DELETED' }
  }

  const isOwner = comment.userId === userId
  const isPostOwner = comment.post.authorId === userId
  const isAdmin = userRole === 'ADMIN' || userRole === 'MODERATOR'

  if (!isOwner && !isPostOwner && !isAdmin) {
    throw { status: 403, message: 'NOT_AUTHORIZED_TO_DELETE_COMMENT' }
  }

  return softDeleteCommentRepo(commentId)
}

export async function toggleReactionService(params: {
  commentId: string
  userId: string
  emoji: string
}) {
  const { commentId, userId, emoji } = params
  const validEmoji = validateEmoji(emoji)

  const comment = await findCommentById(commentId)
  if (!comment) {
    throw { status: 404, message: 'COMMENT_NOT_FOUND' }
  }

  if (comment.isDeleted) {
    throw { status: 400, message: 'CANNOT_REACT_TO_DELETED_COMMENT' }
  }

  const result = await toggleReactionRepo(commentId, userId, validEmoji)

  if (result.action === 'added' && comment.userId !== userId) {
    await prisma.notification.create({
      data: {
        userId: comment.userId,
        title: 'New reaction on your comment',
        body: `Someone reacted with ${validEmoji} to your comment`,
        type: 'COMMENT_REACTION',
      },
    })
  }

  return result
}

export async function removeReactionService(params: {
  commentId: string
  userId: string
  emoji: string
}) {
  const { commentId, userId, emoji } = params
  const validEmoji = validateEmoji(emoji)

  const comment = await findCommentById(commentId)
  if (!comment) {
    throw { status: 404, message: 'COMMENT_NOT_FOUND' }
  }

  return removeReactionRepo(commentId, userId, validEmoji)
}

export async function togglePinCommentService(params: {
  commentId: string
  userId: string
  userRole?: string
}) {
  const { commentId, userId, userRole } = params

  const comment = await findCommentById(commentId)
  if (!comment) {
    throw { status: 404, message: 'COMMENT_NOT_FOUND' }
  }

  if (comment.isDeleted) {
    throw { status: 400, message: 'CANNOT_PIN_DELETED_COMMENT' }
  }

  const isPostOwner = comment.post.authorId === userId
  const isAdminOrModerator = userRole === 'ADMIN' || userRole === 'MODERATOR'

  if (!isPostOwner && !isAdminOrModerator) {
    throw { status: 403, message: 'NOT_AUTHORIZED_TO_PIN_COMMENT' }
  }

  return togglePinCommentRepo(commentId, comment.postId, MAX_PINNED_COMMENTS_PER_POST)
}

export async function reportCommentService(params: {
  commentId: string
  reporterUserId: string
  reason: string
  details?: string
}) {
  const { commentId, reporterUserId, reason, details } = params

  if (!reason || reason.trim().length === 0) {
    throw { status: 400, message: 'Reason for report is required' }
  }

  const comment = await findCommentById(commentId)
  if (!comment) {
    throw { status: 404, message: 'COMMENT_NOT_FOUND' }
  }

  if (comment.isDeleted) {
    throw { status: 400, message: 'CANNOT_REPORT_DELETED_COMMENT' }
  }

  try {
    const report = await createReportRepo(commentId, reporterUserId, reason.trim(), details?.trim())

    logger.info('[moderation] Comment report filed', {
      metadata: {
        reportId: report.id,
        commentId,
        reason: reason.trim(),
        status: report.status,
      },
    })

    return report
  } catch (err: any) {
    if (err.code === 'P2002') {
      throw { status: 409, message: 'ALREADY_REPORTED_COMMENT' }
    }
    throw err
  }
}
