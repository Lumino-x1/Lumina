import { sendError } from '../../lib/send-error'
import * as friendsService from './friends.service'

import type { AuthenticatedRequest } from '@lumina/core/contracts'
import type { Request, Response } from 'express'

export async function sendFriendRequest(req: Request, res: Response) {
  try {
    const { user } = req as AuthenticatedRequest
    const result = await friendsService.sendFriendRequest(user.id, req.params.userId as string)
    return res.status(201).json(result)
  } catch (err) {
    return sendError(res, err)
  }
}

export async function acceptFriendRequest(req: Request, res: Response) {
  try {
    const { user } = req as AuthenticatedRequest
    const result = await friendsService.acceptFriendRequest(user.id, req.params.requestId as string)
    return res.status(200).json(result)
  } catch (err) {
    return sendError(res, err)
  }
}

export async function rejectFriendRequest(req: Request, res: Response) {
  try {
    const { user } = req as AuthenticatedRequest
    const result = await friendsService.rejectFriendRequest(user.id, req.params.requestId as string)
    return res.status(200).json(result)
  } catch (err) {
    return sendError(res, err)
  }
}

export async function cancelFriendRequest(req: Request, res: Response) {
  try {
    const { user } = req as AuthenticatedRequest
    const result = await friendsService.cancelFriendRequest(user.id, req.params.requestId as string)
    return res.status(200).json(result)
  } catch (err) {
    return sendError(res, err)
  }
}

export async function unfriend(req: Request, res: Response) {
  try {
    const { user } = req as AuthenticatedRequest
    const result = await friendsService.unfriend(user.id, req.params.friendId as string)
    return res.status(200).json(result)
  } catch (err) {
    return sendError(res, err)
  }
}

export async function getMyFriends(req: Request, res: Response) {
  try {
    const { user } = req as AuthenticatedRequest
    const friends = await friendsService.getMyFriends(user.id)
    return res.status(200).json(friends)
  } catch (err) {
    return sendError(res, err)
  }
}

export async function getIncomingRequests(req: Request, res: Response) {
  try {
    const { user } = req as AuthenticatedRequest
    const requests = await friendsService.getIncomingRequests(user.id)
    return res.status(200).json(requests)
  } catch (err) {
    return sendError(res, err)
  }
}

export async function getOutgoingRequests(req: Request, res: Response) {
  try {
    const { user } = req as AuthenticatedRequest
    const requests = await friendsService.getOutgoingRequests(user.id)
    return res.status(200).json(requests)
  } catch (err) {
    return sendError(res, err)
  }
}

export async function getMutualFriends(req: Request, res: Response) {
  try {
    const { user } = req as AuthenticatedRequest
    const friends = await friendsService.getMutualFriends(user.id, req.params.userId as string)
    return res.status(200).json(friends)
  } catch (err) {
    return sendError(res, err)
  }
}
