import { boundConcurrentUploads, requireAuth, uploadPostMedia } from '../../middleware'
import {
  createComment,
  createPost,
  deleteComment,
  getLikeCount,
  getMySavedPosts,
  listComments,
  pinComment,
  toggleLike,
  toggleSavePost,
} from './posts.handler'
import { Router } from 'express'

import type { AuthenticatedRequest } from '@lumina/core/contracts'
import type { NextFunction, Request, Response } from 'express'

const router = Router()

router.get('/saved', requireAuth, async (req: Request, res: Response) => {
  await getMySavedPosts(req as AuthenticatedRequest, res)
})

router.post(
  '/',
  requireAuth,
  boundConcurrentUploads,
  uploadPostMedia.array('media', 10),
  async (req: Request, res: Response, next: NextFunction) => {
    await createPost(req as AuthenticatedRequest, res, next)
  }
)
router.post('/:id/like', requireAuth, async (req: Request, res: Response) => {
  await toggleLike(req as AuthenticatedRequest, res)
})
router.get('/:id/likes/count', requireAuth, async (req: Request, res: Response) => {
  await getLikeCount(req as AuthenticatedRequest, res)
})

router.get('/:id/comments', requireAuth, async (req: Request, res: Response) => {
  await listComments(req as AuthenticatedRequest, res)
})
router.post('/:id/comments', requireAuth, async (req: Request, res: Response) => {
  await createComment(req as AuthenticatedRequest, res)
})
router.patch('/:id/comments/:commentId/pin', requireAuth, async (req: Request, res: Response) => {
  await pinComment(req as AuthenticatedRequest, res)
})
router.delete('/:id/comments/:commentId', requireAuth, async (req: Request, res: Response) => {
  await deleteComment(req as AuthenticatedRequest, res)
})

router.post('/:id/save', requireAuth, async (req: Request, res: Response) => {
  await toggleSavePost(req as AuthenticatedRequest, res)
})

export default router
