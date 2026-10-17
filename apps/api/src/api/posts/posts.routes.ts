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

// Static paths must precede /:id so "scheduled" is never interpreted as a post id.
postsRouter.get('/scheduled', requireAuth, async (req: Request, res: Response) => {
  await postController.getScheduledPosts(req as AuthenticatedRequest, res)
})

postsRouter.post('/:id/like', requireAuth, async (req: Request, res: Response) => {
  await postController.toggleLike(req as AuthenticatedRequest, res)
})

postsRouter.post('/:id/save', requireAuth, async (req: Request, res: Response) => {
  await postController.toggleSavePost(req as AuthenticatedRequest, res)
})
postsRouter.post("/:id/schedule", requireAuth, async (req: Request, res: Response) => {
  await postController.schedulePost(req as AuthenticatedRequest, res)
});

postsRouter.patch("/:id/schedule", requireAuth, async (req: Request, res: Response) => {
  await postController.reschedulePost(req as AuthenticatedRequest, res)
});

postsRouter.delete("/:id/schedule", requireAuth, async (req: Request, res: Response) => {
  await postController.deleteScheduledPost(req as AuthenticatedRequest, res)
});
postsRouter.post("/:id/publish", requireAuth, async (req: Request, res: Response) => {
  await postController.publishPostImmediately(req as AuthenticatedRequest, res)
});

export default postsRouter
