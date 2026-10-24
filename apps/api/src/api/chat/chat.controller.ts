import type { AuthenticatedRequest } from '@lumina/contracts'
import type { Request, Response } from 'express'
import * as chatService from './chat.service'

export async function getChatToken(req: Request & AuthenticatedRequest, res: Response) {
  try {
    const userId = req.user.id
    const token = await chatService.generateChatToken(userId)

    res.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate')
    return res.status(200).json({
      success: true,
      token,
      apiKey: process.env.STREAM_API_KEY,
      userId: req.user.id,
      user: {
        id: req.user.id,
        name: req.user.name || (req.user as any).username || 'User',
        image: req.user.image || null,
      },
    })
  } catch (error: any) {
    console.error('GET CHAT TOKEN ERROR:', error)

    if (error.message === 'USER_NOT_FOUND') {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      })
    }

    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    })
  }
}

export const createOneToOneConversation = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user.id
    const otherUserId = req.body.otherUserId || req.body.targetUserId
    const { otherName, otherUsername, otherAvatar } = req.body

    if (!otherUserId) {
      return res.status(400).json({
        success: false,
        message: 'otherUserId is required',
      })
    }

    const conversation = await chatService.createOneToOneConversation({
      userId,
      otherUserId,
      otherName,
      otherUsername,
      otherAvatar,
    })

    return res.status(201).json({
      success: true,
      conversation,
    })
  } catch (error: any) {
    console.error('CREATE CONVERSATION ERROR:', error)

    if (error.message === 'USER_NOT_FOUND') {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      })
    }

    if (error.message === 'CANNOT_CHAT_WITH_SELF') {
      return res.status(400).json({
        success: false,
        message: 'You cannot chat with yourself',
      })
    }

    return res.status(500).json({
      success: false,
      message: error?.message || 'Internal server error',
    })
  }
}

export const createGroupConversation = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user.id
    const { name, memberIds, image } = req.body

    if (!name || typeof name !== 'string' || !name.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Group name is required',
      })
    }

    const members = Array.isArray(memberIds) ? memberIds : []

    const conversation = await chatService.createGroupConversation({
      userId,
      name: name.trim(),
      memberIds: members,
      image,
    })

    return res.status(201).json({
      success: true,
      conversation,
    })
  } catch (error: any) {
    console.error('CREATE GROUP ERROR:', error)
    return res.status(500).json({
      success: false,
      message: error?.message || 'Internal server error',
    })
  }
}

export const getMyConversations = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user.id
    const conversations = await chatService.getMyConversations(userId)

    return res.status(200).json({
      success: true,
      conversations,
    })
  } catch (error: any) {
    console.error('GET CONVERSATIONS ERROR:', error)

    return res.status(500).json({
      success: false,
      message: error?.message || 'Internal server error',
    })
  }
}

export const sendMessage = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user.id
    const channelId = req.params.channelId
    const { text, parentId, attachments } = req.body

    if (!text && (!attachments || attachments.length === 0)) {
      return res.status(400).json({
        success: false,
        message: 'text or attachments are required',
      })
    }

    const result = await chatService.sendMessage({
      userId,
      channelId,
      text: typeof text === 'string' ? text.trim() : '',
      parentId,
      attachments,
    })

    return res.status(201).json({
      success: true,
      message: result.message,
    })
  } catch (error: any) {
    console.error('SEND MESSAGE ERROR:', error)
    return res.status(500).json({
      success: false,
      message: error?.message || 'Internal server error',
    })
  }
}

export const getChannelMessages = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user.id
    const channelId = req.params.channelId
    const limit = req.query.limit ? Number(req.query.limit) : 50

    const result = await chatService.getChannelMessages({
      userId,
      channelId,
      limit,
    })

    return res.status(200).json({
      success: true,
      messages: result.messages,
      members: result.members,
      channel: result.channel,
    })
  } catch (error: any) {
    console.error('GET CHANNEL MESSAGES ERROR:', error)
    return res.status(500).json({
      success: false,
      message: error?.message || 'Internal server error',
    })
  }
}

export const editMessage = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user.id
    const messageId = req.params.messageId
    const { text } = req.body

    if (!text || typeof text !== 'string' || !text.trim()) {
      return res.status(400).json({
        success: false,
        message: 'text is required to edit message',
      })
    }

    const result = await chatService.editMessage({
      userId,
      messageId,
      text: text.trim(),
    })

    return res.status(200).json({
      success: true,
      message: result.message,
    })
  } catch (error: any) {
    console.error('EDIT MESSAGE ERROR:', error)
    return res.status(500).json({
      success: false,
      message: error?.message || 'Internal server error',
    })
  }
}

export const deleteMessage = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user.id
    const messageId = req.params.messageId
    const hard = req.query.hard === 'true'

    const result = await chatService.deleteMessage({
      userId,
      messageId,
      hard,
    })

    return res.status(200).json({
      success: true,
      message: result.message,
    })
  } catch (error: any) {
    console.error('DELETE MESSAGE ERROR:', error)
    return res.status(500).json({
      success: false,
      message: error?.message || 'Internal server error',
    })
  }
}

export const sendReaction = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user.id
    const channelId = req.params.channelId
    const messageId = req.params.messageId
    const { type } = req.body

    if (!type || typeof type !== 'string') {
      return res.status(400).json({
        success: false,
        message: 'Reaction type is required',
      })
    }

    const result = await chatService.sendReaction({
      userId,
      channelId,
      messageId,
      type: type.trim(),
    })

    return res.status(201).json({
      success: true,
      reaction: result.reaction,
      message: result.message,
    })
  } catch (error: any) {
    console.error('SEND REACTION ERROR:', error)
    return res.status(500).json({
      success: false,
      message: error?.message || 'Internal server error',
    })
  }
}

export const deleteReaction = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user.id
    const channelId = req.params.channelId
    const messageId = req.params.messageId
    const reactionType = req.params.type

    const result = await chatService.deleteReaction({
      userId,
      channelId,
      messageId,
      type: reactionType,
    })

    return res.status(200).json({
      success: true,
      message: result.message,
    })
  } catch (error: any) {
    console.error('DELETE REACTION ERROR:', error)
    return res.status(500).json({
      success: false,
      message: error?.message || 'Internal server error',
    })
  }
}

export const getMessageReplies = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const channelId = req.params.channelId
    const messageId = req.params.messageId
    const limit = req.query.limit ? Number(req.query.limit) : 50

    const result = await chatService.getMessageReplies({
      channelId,
      messageId,
      limit,
    })

    return res.status(200).json({
      success: true,
      messages: result.messages,
    })
  } catch (error: any) {
    console.error('GET REPLIES ERROR:', error)
    return res.status(500).json({
      success: false,
      message: error?.message || 'Internal server error',
    })
  }
}

export const pinMessage = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user.id
    const messageId = req.params.messageId

    const result = await chatService.pinMessage({
      userId,
      messageId,
    })

    return res.status(200).json({
      success: true,
      message: result.message,
    })
  } catch (error: any) {
    console.error('PIN MESSAGE ERROR:', error)
    return res.status(500).json({
      success: false,
      message: error?.message || 'Internal server error',
    })
  }
}

export const unpinMessage = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user.id
    const messageId = req.params.messageId

    const result = await chatService.unpinMessage({
      userId,
      messageId,
    })

    return res.status(200).json({
      success: true,
      message: result.message,
    })
  } catch (error: any) {
    console.error('UNPIN MESSAGE ERROR:', error)
    return res.status(500).json({
      success: false,
      message: error?.message || 'Internal server error',
    })
  }
}

export const markRead = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user.id
    const channelId = req.params.channelId

    await chatService.markRead({
      userId,
      channelId,
    })

    return res.status(200).json({
      success: true,
    })
  } catch (error: any) {
    console.error('MARK READ ERROR:', error)
    return res.status(500).json({
      success: false,
      message: error?.message || 'Internal server error',
    })
  }
}

export const sendTypingIndicator = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user.id
    const channelId = req.params.channelId

    await chatService.sendTypingIndicator({
      userId,
      channelId,
    })

    return res.status(200).json({
      success: true,
    })
  } catch (error: any) {
    console.error('TYPING INDICATOR ERROR:', error)
    return res.status(500).json({
      success: false,
      message: error?.message || 'Internal server error',
    })
  }
}

export const addChannelMembers = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user.id
    const channelId = req.params.channelId
    const { memberIds } = req.body

    if (!Array.isArray(memberIds) || memberIds.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'memberIds array is required',
      })
    }

    const result = await chatService.addChannelMembers({
      userId,
      channelId,
      memberIds,
    })

    return res.status(200).json({
      success: true,
      channel: result.channel,
      members: result.members,
    })
  } catch (error: any) {
    console.error('ADD MEMBERS ERROR:', error)
    return res.status(500).json({
      success: false,
      message: error?.message || 'Internal server error',
    })
  }
}

export const removeChannelMember = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user.id
    const channelId = req.params.channelId
    const memberId = req.params.memberId

    const result = await chatService.removeChannelMember({
      userId,
      channelId,
      memberId,
    })

    return res.status(200).json({
      success: true,
      channel: result.channel,
      members: result.members,
    })
  } catch (error: any) {
    console.error('REMOVE MEMBER ERROR:', error)
    return res.status(500).json({
      success: false,
      message: error?.message || 'Internal server error',
    })
  }
}

export const muteChannel = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user.id
    const channelId = req.params.channelId

    await chatService.muteChannel({
      userId,
      channelId,
    })

    return res.status(200).json({
      success: true,
      muted: true,
    })
  } catch (error: any) {
    console.error('MUTE CHANNEL ERROR:', error)
    return res.status(500).json({
      success: false,
      message: error?.message || 'Internal server error',
    })
  }
}

export const unmuteChannel = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user.id
    const channelId = req.params.channelId

    await chatService.unmuteChannel({
      userId,
      channelId,
    })

    return res.status(200).json({
      success: true,
      muted: false,
    })
  } catch (error: any) {
    console.error('UNMUTE CHANNEL ERROR:', error)
    return res.status(500).json({
      success: false,
      message: error?.message || 'Internal server error',
    })
  }
}

export const searchMessages = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user.id
    const query = typeof req.query.q === 'string' ? req.query.q.trim() : ''

    if (!query) {
      return res.status(200).json({
        success: true,
        results: [],
      })
    }

    const result = await chatService.searchMessages({
      userId,
      query,
    })

    return res.status(200).json({
      success: true,
      results: result.results,
    })
  } catch (error: any) {
    console.error('SEARCH MESSAGES ERROR:', error)
    return res.status(500).json({
      success: false,
      message: error?.message || 'Internal server error',
    })
  }
}
