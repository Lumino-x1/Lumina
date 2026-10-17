import { sendError } from '../../../lib/send-error'
import { CommentsService } from './comments.service'
import { MSG_COMMENT_CANNOT_BE_EMPTY } from '@lumina/constants'

import type { AuthenticatedRequest } from '@lumina/contracts'
import type { Response } from 'express'

// Dedicated Comments module HTTP handlers (/api/comments)

export async function createCommentHandler(req: AuthenticatedRequest, res: Response) {
  try {
    const userId = req.user.id
    const { postId } = req.params
    const { content, parentId } = req.body

    const comment = await CommentsService.createCommentService({
      postId: postId as string,
      userId,
      content,
      parentId,
    })

    res.status(201).json(comment)
  } catch (err: any) {
    const status = err.status || 500
    res.status(status).json({ message: err.message || 'Failed to create comment' })
  }
}

export async function getCommentsForPostHandler(req: AuthenticatedRequest, res: Response) {
  try {
    const { postId } = req.params
    const { cursor, limit } = req.query

    const currentUserId = req.user?.id
    const result = await CommentsService.getCommentsForPostService(
      postId as string,
      cursor as string | undefined,
      limit ? parseInt(limit as string, 10) : 20,
      currentUserId
    )
    res.status(200).json({
      success: true,
      comments: result.comments,
      nextCursor: result.nextCursor,
    })
  } catch (err: any) {
    const status = err.status || 500
    res.status(status).json({ message: err.message || 'Failed to fetch comments' })
  }
}

export async function editCommentHandler(req: AuthenticatedRequest, res: Response) {
  try {
    const userId = req.user.id
    const { commentId } = req.params
    const { content, version } = req.body

    const comment = await CommentsService.editCommentService({
      commentId: commentId as string,
      userId,
      content,
      version: typeof version === 'number' ? version : undefined,
    })

    res.status(200).json(comment)
  } catch (err: any) {
    const status = err.status || 500
    res.status(status).json({ message: err.message || 'Failed to edit comment' })
  }
}

export async function getCommentEditHistoryHandler(req: AuthenticatedRequest, res: Response) {
  try {
    const { commentId } = req.params

    const history = await CommentsService.getCommentEditHistoryService(commentId as string)

    res.status(200).json(history)
  } catch (err: any) {
    const status = err.status || 500
    res.status(status).json({ message: err.message || 'Failed to fetch comment edit history' })
  }
}

export async function deleteCommentHandler(req: AuthenticatedRequest, res: Response) {
  try {
    const userId = req.user.id
    const userRole = (req.user as any).role
    const { commentId } = req.params

    const comment = await CommentsService.deleteCommentService({
      commentId: commentId as string,
      userId,
      userRole,
    })

    res.status(200).json({ message: 'Comment deleted successfully', comment })
  } catch (err: any) {
    const status = err.status || 500
    res.status(status).json({ message: err.message || 'Failed to delete comment' })
  }
}

export async function toggleReactionHandler(req: AuthenticatedRequest, res: Response) {
  try {
    const userId = req.user.id
    const { commentId } = req.params
    const { emoji } = req.body

    const result = await CommentsService.toggleReactionService({
      commentId: commentId as string,
      userId,
      emoji,
    })

    res.status(200).json(result)
  } catch (err: any) {
    const status = err.status || 500
    res.status(status).json({ message: err.message || 'Failed to update reaction' })
  }
}

export async function removeReactionHandler(req: AuthenticatedRequest, res: Response) {
  try {
    const userId = req.user.id
    const { commentId } = req.params
    const { emoji } = req.body

    const result = await CommentsService.removeReactionService({
      commentId: commentId as string,
      userId,
      emoji,
    })

    res.status(200).json(result)
  } catch (err: any) {
    const status = err.status || 500
    res.status(status).json({ message: err.message || 'Failed to remove reaction' })
  }
}

export async function togglePinHandler(req: AuthenticatedRequest, res: Response) {
  try {
    const userId = req.user.id
    const userRole = (req.user as any).role
    const { commentId } = req.params

    const comment = await CommentsService.togglePinCommentService({
      commentId: commentId as string,
      userId,
      userRole,
    })

    res.status(200).json(comment)
  } catch (err: any) {
    const status = err.status || 500
    res.status(status).json({ message: err.message || 'Failed to pin/unpin comment' })
  }
}

export async function reportCommentHandler(req: AuthenticatedRequest, res: Response) {
  try {
    const reporterUserId = req.user.id
    const { commentId } = req.params
    const { reason, details } = req.body

    const report = await CommentsService.reportCommentService({
      commentId: commentId as string,
      reporterUserId,
      reason,
      details,
    })

    res.status(201).json(report)
  } catch (err: any) {
    const status = err.status || 500
    res.status(status).json({ message: err.message || 'Failed to report comment' })
  }
}

export const createPostComment = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { content } = req.body
    if (!content || typeof content !== 'string' || !content.trim())
      return res.status(400).json({ message: MSG_COMMENT_CANNOT_BE_EMPTY })
    const comment = await CommentsService.createComment({
      postId: req.params.id as string,
      userId: req.user.id,
      content,
      parentId: req.body.parentId,
    })
    return res.status(201).json({ success: true, data: comment })
  } catch (error) {
    return sendError(res, error)
  }
}

export const listPostComments = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const limit = Math.min(Number(req.query.limit) || 20, 50)
    const cursor = (req.query.cursor as string) || undefined
    const comments = await CommentsService.listComments(req.params.id as string, limit, cursor)
    return res.status(200).json({ success: true, comments })
  } catch (error) {
    return sendError(res, error)
  }
}

export const pinPostComment = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const result = await CommentsService.pinComment(
      req.user.id,
      req.params.commentId as string,
      req.body.isPinned
    )
    return res.status(200).json({ success: true, isPinned: result.isPinned })
  } catch (error) {
    return sendError(res, error)
  }
}

export const deletePostComment = async (req: AuthenticatedRequest, res: Response) => {
  try {
    await CommentsService.deleteComment(req.user.id, req.params.commentId as string)
    return res.status(200).json({ success: true, message: 'Comment deleted successfully' })
  } catch (error) {
    return sendError(res, error)
  }
}
