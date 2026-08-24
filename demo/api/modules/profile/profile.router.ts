import { boundConcurrentUploads, optionalAuth, requireAuth, upload } from '../../middleware'
import {
  deleteCoverImage,
  deleteProfilePicture,
  getMyProfile,
  getProfileByUsername,
  updateMyProfile,
  uploadCoverImage,
  uploadProfilePicture,
} from './profile.handler'
import { MSG_PROFILE_ROUTER_WORKS } from '@lumina/core/constants'
import { Router } from 'express'

export const profileRouter = Router()

profileRouter.get('/test', (req, res) => {
  res.json({ message: MSG_PROFILE_ROUTER_WORKS })
})

profileRouter.get('/me', requireAuth, getMyProfile)
profileRouter.patch('/me', requireAuth, updateMyProfile)
profileRouter.get('/:username', optionalAuth, getProfileByUsername as any)
profileRouter.patch(
  '/avatar',
  requireAuth,
  boundConcurrentUploads,
  upload.single('image'),
  uploadProfilePicture
)
profileRouter.delete('/avatar', requireAuth, deleteProfilePicture)
profileRouter.patch(
  '/cover',
  requireAuth,
  boundConcurrentUploads,
  upload.single('image'),
  uploadCoverImage
)
profileRouter.delete('/cover', requireAuth, deleteCoverImage)

export default profileRouter
