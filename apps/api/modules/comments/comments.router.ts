import { requireAuth } from '../../middleware'
import {
  createCommentHandler,
  deleteCommentHandler,
  editCommentHandler,
  getCommentEditHistoryHandler,
  getCommentsForPostHandler,
  removeReactionHandler,
  reportCommentHandler,
  togglePinHandler,
  toggleReactionHandler,
} from './comments.handler'
import { Router } from 'express'
import rateLimit from 'express-rate-limit'

import type { AuthenticatedRequest } from '@lumina/contracts'
import type { NextFunction, Request, Response } from 'express'

const commentsRouter = Router()

const commentRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 60, // 60 requests per 15 minutes
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: { status: 'error', message: 'Too many comment requests, please try again later.' },
})

// Post-level comment endpoints
commentsRouter.post(
  '/posts/:postId/comments',
  requireAuth,
  commentRateLimiter,
  async (req: Request, res: Response) => {
    await createCommentHandler(req as AuthenticatedRequest, res)
  }
)

commentsRouter.get('/posts/:postId/comments', requireAuth, async (req: Request, res: Response) => {
  await getCommentsForPostHandler(req as AuthenticatedRequest, res)
})

// Comment-level endpoints
commentsRouter.patch(
  '/:commentId',
  requireAuth,
  commentRateLimiter,
  async (req: Request, res: Response) => {
    await editCommentHandler(req as AuthenticatedRequest, res)
  }
)

commentsRouter.get('/:commentId/history', requireAuth, async (req: Request, res: Response) => {
  await getCommentEditHistoryHandler(req as AuthenticatedRequest, res)
})

commentsRouter.delete('/:commentId', requireAuth, async (req: Request, res: Response) => {
  await deleteCommentHandler(req as AuthenticatedRequest, res)
})

commentsRouter.post('/:commentId/reactions', requireAuth, async (req: Request, res: Response) => {
  await toggleReactionHandler(req as AuthenticatedRequest, res)
})

commentsRouter.delete('/:commentId/reactions', requireAuth, async (req: Request, res: Response) => {
  await removeReactionHandler(req as AuthenticatedRequest, res)
})

commentsRouter.post('/:commentId/pin', requireAuth, async (req: Request, res: Response) => {
  await togglePinHandler(req as AuthenticatedRequest, res)
})

commentsRouter.post('/:commentId/report', requireAuth, async (req: Request, res: Response) => {
  await reportCommentHandler(req as AuthenticatedRequest, res)
})

export default commentsRouter
