import * as chatService from './chat.service'

import type { AuthenticatedRequest } from '@lumina/core/contracts'
import type { Response } from 'express'

export async function getChatToken(req: Request & AuthenticatedRequest, res: Response) {
  try {
    const userId = req.user.id
    const token = await chatService.generateChatToken(userId)

    return res.status(200).json({
      success: true,
      token,
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

    const { otherUserId } = req.body

    if (!otherUserId) {
      return res.status(400).json({
        success: false,
        message: 'otherUserId is required',
      })
    }

    const conversation = await chatService.createOneToOneConversation({
      userId,
      otherUserId,
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
      message: 'Internal server error',
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
  } catch (error) {
    console.error('GET CONVERSATIONS ERROR:', error)

    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    })
  }
}
