import { boundConcurrentUploads, optionalAuth, requireAuth, upload } from '../../../middleware'
import * as userController from './users.controller'
import { MSG_PROFILE_ROUTER_WORKS } from '@lumina/constants'
import { Router } from 'express'

const usersRouter = Router()

usersRouter.get('/test', (_req, res) => {
  res.json({ message: MSG_PROFILE_ROUTER_WORKS })
})
usersRouter.get('/me', requireAuth, userController.getMyProfile)
usersRouter.patch('/me', requireAuth, userController.updateMyProfile)
usersRouter.post('/onboarding', optionalAuth, userController.saveOnboardingProfile)
usersRouter.patch('/onboarding', optionalAuth, userController.saveOnboardingProfile)
usersRouter.get('/:username', optionalAuth, userController.getProfileByUsername)
usersRouter.patch(
  '/avatar',
  requireAuth,
  boundConcurrentUploads,
  upload.single('image'),
  userController.uploadProfilePicture
)
usersRouter.delete('/avatar', requireAuth, userController.deleteProfilePicture)
usersRouter.patch(
  '/cover',
  requireAuth,
  boundConcurrentUploads,
  upload.single('image'),
  userController.uploadCoverImage
)
usersRouter.delete('/cover', requireAuth, userController.deleteCoverImage)

export default usersRouter
