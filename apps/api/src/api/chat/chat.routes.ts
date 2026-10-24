import { requireAuth } from '../../../middleware'
import { Router } from 'express'
import * as chatController from './chat.controller'

const chatRouter = Router()

// Authentication & Token
chatRouter.get('/token', requireAuth, chatController.getChatToken as never)

// Channels & Conversations
chatRouter.post('/conversations', requireAuth, chatController.createOneToOneConversation as never)
chatRouter.post('/groups', requireAuth, chatController.createGroupConversation as never)
chatRouter.get('/conversations', requireAuth, chatController.getMyConversations as never)
chatRouter.get('/search', requireAuth, chatController.searchMessages as never)

// Messages
chatRouter.get('/conversations/:channelId/messages', requireAuth, chatController.getChannelMessages as never)
chatRouter.post('/conversations/:channelId/messages', requireAuth, chatController.sendMessage as never)
chatRouter.put('/conversations/:channelId/messages/:messageId', requireAuth, chatController.editMessage as never)
chatRouter.delete('/conversations/:channelId/messages/:messageId', requireAuth, chatController.deleteMessage as never)

// Reactions
chatRouter.post('/conversations/:channelId/messages/:messageId/reactions', requireAuth, chatController.sendReaction as never)
chatRouter.delete('/conversations/:channelId/messages/:messageId/reactions/:type', requireAuth, chatController.deleteReaction as never)

// Threads & Replies
chatRouter.get('/conversations/:channelId/messages/:messageId/replies', requireAuth, chatController.getMessageReplies as never)

// Pinning
chatRouter.post('/conversations/:channelId/messages/:messageId/pin', requireAuth, chatController.pinMessage as never)
chatRouter.delete('/conversations/:channelId/messages/:messageId/pin', requireAuth, chatController.unpinMessage as never)

// Read receipts & Typing
chatRouter.post('/conversations/:channelId/read', requireAuth, chatController.markRead as never)
chatRouter.post('/conversations/:channelId/typing', requireAuth, chatController.sendTypingIndicator as never)

// Group Members Management
chatRouter.post('/conversations/:channelId/members', requireAuth, chatController.addChannelMembers as never)
chatRouter.delete('/conversations/:channelId/members/:memberId', requireAuth, chatController.removeChannelMember as never)

// Channel Notifications / Mute
chatRouter.post('/conversations/:channelId/mute', requireAuth, chatController.muteChannel as never)
chatRouter.post('/conversations/:channelId/unmute', requireAuth, chatController.unmuteChannel as never)

export default chatRouter
