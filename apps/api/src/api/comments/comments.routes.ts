import { requireAuth } from '../../../middleware'
import * as commentsController from './comments.controller'
import { Router } from 'express'
import rateLimit from 'express-rate-limit'

import type { AuthenticatedRequest } from '@lumina/contracts'
import type { Request, Response } from 'express'

const commentsRouter = Router()

const commentRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 60,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: { status: 'error', message: 'Too many comment requests, please try again later.' },
})

commentsRouter.post(
  '/posts/:postId/comments',
  requireAuth,
  commentRateLimiter,
  async (req: Request, res: Response) => {
    await commentsController.createCommentHandler(req as AuthenticatedRequest, res)
  }
)

commentsRouter.get('/posts/:postId/comments', requireAuth, async (req: Request, res: Response) => {
  await commentsController.getCommentsForPostHandler(req as AuthenticatedRequest, res)
})

commentsRouter.patch(
  '/:commentId',
  requireAuth,
  commentRateLimiter,
  async (req: Request, res: Response) => {
    await commentsController.editCommentHandler(req as AuthenticatedRequest, res)
  }
)

commentsRouter.get('/:commentId/history', requireAuth, async (req: Request, res: Response) => {
  await commentsController.getCommentEditHistoryHandler(req as AuthenticatedRequest, res)
})

commentsRouter.delete('/:commentId', requireAuth, async (req: Request, res: Response) => {
  await commentsController.deleteCommentHandler(req as AuthenticatedRequest, res)
})

commentsRouter.post('/:commentId/reactions', requireAuth, async (req: Request, res: Response) => {
  await commentsController.toggleReactionHandler(req as AuthenticatedRequest, res)
})

commentsRouter.post(
  '/:commentId/like',
  requireAuth,
  commentRateLimiter,
  async (req: Request, res: Response) => {
    req.body = { ...(req.body || {}), emoji: (req.body && req.body.emoji) || '❤️' }
    await commentsController.toggleReactionHandler(req as AuthenticatedRequest, res)
  }
)

commentsRouter.delete('/:commentId/reactions', requireAuth, async (req: Request, res: Response) => {
  await commentsController.removeReactionHandler(req as AuthenticatedRequest, res)
})

commentsRouter.post('/:commentId/pin', requireAuth, async (req: Request, res: Response) => {
  await commentsController.togglePinHandler(req as AuthenticatedRequest, res)
})

commentsRouter.post('/:commentId/report', requireAuth, async (req: Request, res: Response) => {
  await commentsController.reportCommentHandler(req as AuthenticatedRequest, res)
})

export default commentsRouter
