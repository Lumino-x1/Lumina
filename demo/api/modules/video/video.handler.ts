import { sendError } from '../../lib/send-error.ts'
import * as videoService from './video.service.ts'
import { logger } from '@lumina/observability'
import { createCallSchema, respondInviteSchema } from '@lumina/core/validators'

import type { AuthRequest } from '../../middleware'
import type { Request, Response } from 'express'

function userIdOf(req: Request) {
  return (req as AuthRequest).user?.id
}

export const getVideoToken = async (req: Request, res: Response) => {
  try {
    const userId = userIdOf(req)
    if (!userId) {
      return res.status(401).json({ message: 'UNAUTHORIZED' })
    }
    const tokenData = await videoService.generateVideoToken(userId)
    return res.status(200).json(tokenData)
  } catch (error) {
    logger.error('Failed to generate video token', { metadata: { error: String(error) } })
    return sendError(res, error)
  }
}

export const createCall = async (req: Request, res: Response) => {
  try {
    const userId = userIdOf(req)
    if (!userId) {
      return res.status(401).json({ message: 'UNAUTHORIZED' })
    }
    const parsed = createCallSchema.safeParse(req.body)
    if (!parsed.success) {
      return res.status(400).json({ message: 'INVALID_CALL_PAYLOAD' })
    }
    const callData = await videoService.createCall({
      userId,
      type: parsed.data.type,
      title: parsed.data.title,
      participantIds: parsed.data.participantIds,
    })
    return res.status(201).json(callData)
  } catch (error) {
    return sendError(res, error)
  }
}

export const getCallDetails = async (req: Request, res: Response) => {
  try {
    const userId = userIdOf(req)
    if (!userId) {
      return res.status(401).json({ message: 'UNAUTHORIZED' })
    }
    const { callId } = req.params
    const call = await videoService.getCallDetails(callId as string, userId)
    return res.status(200).json(call)
  } catch (error) {
    return sendError(res, error)
  }
}

export const joinCall = async (req: Request, res: Response) => {
  try {
    const userId = userIdOf(req)
    if (!userId) {
      return res.status(401).json({ message: 'UNAUTHORIZED' })
    }
    const { callId } = req.params
    const joinData = await videoService.joinCall(callId as string, userId)
    return res.status(200).json(joinData)
  } catch (error) {
    return sendError(res, error)
  }
}

export const respondToInvite = async (req: Request, res: Response) => {
  try {
    const userId = userIdOf(req)
    if (!userId) {
      return res.status(401).json({ message: 'UNAUTHORIZED' })
    }
    const { callId } = req.params
    const parsed = respondInviteSchema.safeParse(req.body)
    if (!parsed.success) {
      return res.status(400).json({ message: 'INVALID_RESPONSE' })
    }
    const result = await videoService.respondToCallInvite(
      callId as string,
      userId,
      parsed.data.response as 'ACCEPT' | 'REJECT'
    )
    return res.status(200).json(result)
  } catch (error) {
    return sendError(res, error)
  }
}

export const endCall = async (req: Request, res: Response) => {
  try {
    const userId = userIdOf(req)
    if (!userId) {
      return res.status(401).json({ message: 'UNAUTHORIZED' })
    }
    const { callId } = req.params
    const result = await videoService.endCall(callId as string, userId)
    return res.status(200).json(result)
  } catch (error) {
    return sendError(res, error)
  }
}

export const getCallHistory = async (req: Request, res: Response) => {
  try {
    const userId = userIdOf(req)
    if (!userId) {
      return res.status(401).json({ message: 'UNAUTHORIZED' })
    }
    const history = await videoService.getCallHistory(userId)
    return res.status(200).json(history)
  } catch (error) {
    logger.error('Failed to fetch call history', { metadata: { error: String(error) } })
    return res.status(500).json({ message: 'SERVER_ERROR' })
  }
}
