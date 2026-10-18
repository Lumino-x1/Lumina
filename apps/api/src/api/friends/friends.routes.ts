import { requireAuth } from '../../../middleware'
import * as friendsController from './friends.controller'
import { Router } from 'express'

const friendsRouter = Router()

// Specific GET routes before root
friendsRouter.get('/requests/incoming', requireAuth, friendsController.getIncomingRequests)
friendsRouter.get('/requests/outgoing', requireAuth, friendsController.getOutgoingRequests)
friendsRouter.get('/mutual/:userId', requireAuth, friendsController.getMutualFriends)
friendsRouter.get('/', requireAuth, friendsController.getMyFriends)

// Friend request actions
friendsRouter.post('/request/:userId', requireAuth, friendsController.sendFriendRequest)
friendsRouter.patch(
  '/request/:requestId/accept',
  requireAuth,
  friendsController.acceptFriendRequest
)
friendsRouter.patch(
  '/request/:requestId/reject',
  requireAuth,
  friendsController.rejectFriendRequest
)
friendsRouter.delete('/request/:requestId', requireAuth, friendsController.cancelFriendRequest)

// Unfriend
friendsRouter.delete('/:friendId', requireAuth, friendsController.unfriend)

export default friendsRouter
