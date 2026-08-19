import {
  createCommentService,
  deleteCommentService,
  editCommentService,
  getCommentEditHistoryService,
  getCommentsForPostService,
  removeReactionService,
  reportCommentService,
  togglePinCommentService,
  toggleReactionService,
} from './comments.service'

import type { AuthenticatedRequest } from '@lumina/contracts'
import type { Response } from 'express'

export async function createCommentHandler(req: AuthenticatedRequest, res: Response) {
  try {
    const userId = req.user.id
    const { postId } = req.params
    const { content, parentId } = req.body

    const comment = await createCommentService({
      postId: postId!,
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

    const result = await getCommentsForPostService(
      postId!,
      cursor as string | undefined,
      limit ? parseInt(limit as string, 10) : 20
    )

    res.status(200).json(result)
  } catch (err: any) {
    const status = err.status || 500
    res.status(status).json({ message: err.message || 'Failed to fetch comments' })
  }
}

export async function editCommentHandler(req: AuthenticatedRequest, res: Response) {
  try {
    const userId = req.user.id
    const { commentId } = req.params
    const { content } = req.body

    const comment = await editCommentService({
      commentId: commentId!,
      userId,
      content,
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

    const history = await getCommentEditHistoryService(commentId!)

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

    const comment = await deleteCommentService({
      commentId: commentId!,
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

    const result = await toggleReactionService({
      commentId: commentId!,
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

    const result = await removeReactionService({
      commentId: commentId!,
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

    const comment = await togglePinCommentService({
      commentId: commentId!,
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

    const report = await reportCommentService({
      commentId: commentId!,
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
