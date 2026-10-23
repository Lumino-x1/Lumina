import { requireAuth } from '../../../middleware'
import { Router } from 'express'
import * as chatController from './chat.controller'

const chatRouter = Router()

chatRouter.get('/token', requireAuth, chatController.getChatToken as never)
chatRouter.post('/conversations', requireAuth, chatController.createOneToOneConversation as never)
chatRouter.get('/conversations', requireAuth, chatController.getMyConversations as never)

export default chatRouter
