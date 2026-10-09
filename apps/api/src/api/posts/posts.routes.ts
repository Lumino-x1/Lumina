import { requireAuth } from '../../../middleware'
import * as postController from './posts.controller'
import { Router } from 'express'

import type { AuthenticatedRequest } from '@lumina/contracts'
import type { NextFunction, Request, Response } from 'express'

const postsRouter = Router()

postsRouter.get('/saved', requireAuth, async (req: Request, res: Response) => {
  await postController.getMySavedPosts(req as AuthenticatedRequest, res)
})

postsRouter.post('/', requireAuth, async (req: Request, res: Response, next: NextFunction) => {
  await postController.createPost(req as AuthenticatedRequest, res, next)
})

postsRouter.post('/:id/like', requireAuth, async (req: Request, res: Response) => {
  await postController.toggleLike(req as AuthenticatedRequest, res)
})

postsRouter.post('/:id/save', requireAuth, async (req: Request, res: Response) => {
  await postController.toggleSavePost(req as AuthenticatedRequest, res)
})

postsRouter.get('/:id/comments', requireAuth, async (req: Request, res: Response) => {
  await postController.listComments(req as AuthenticatedRequest, res)
})

postsRouter.post('/:id/comments', requireAuth, async (req: Request, res: Response) => {
  await postController.createComment(req as AuthenticatedRequest, res)
})

postsRouter.patch(
  '/:id/comments/:commentId/pin',
  requireAuth,
  async (req: Request, res: Response) => {
    await postController.pinComment(req as AuthenticatedRequest, res)
  }
)

postsRouter.delete('/:id/comments/:commentId', requireAuth, async (req: Request, res: Response) => {
  await postController.deleteComment(req as AuthenticatedRequest, res)
})

export default postsRouter
