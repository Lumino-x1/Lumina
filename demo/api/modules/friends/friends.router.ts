import { requireAuth } from '../../middleware'
import * as friendsController from './friends.handler'
import express from 'express'

const router = express.Router()

router.post('/request/:userId', requireAuth, friendsController.sendFriendRequest)
router.patch('/request/:requestId/accept', requireAuth, friendsController.acceptFriendRequest)
router.patch('/request/:requestId/reject', requireAuth, friendsController.rejectFriendRequest)
router.delete('/request/:requestId', requireAuth, friendsController.cancelFriendRequest)
router.delete('/:friendId', requireAuth, friendsController.unfriend)
router.get('/', requireAuth, friendsController.getMyFriends)
router.get('/mutual/:userId', requireAuth, friendsController.getMutualFriends)
router.get('/requests/incoming', requireAuth, friendsController.getIncomingRequests)
router.get('/requests/outgoing', requireAuth, friendsController.getOutgoingRequests)

export default router
