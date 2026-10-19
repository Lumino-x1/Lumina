import { sendError } from '../../../lib/send-error'
import {
  computePersonRequestStatus,
  RecommendationService,
  type PersonRequestStatus,
  type PersonRequestStatusType,
} from './recommendation.service'

import type { AuthenticatedRequest } from '@lumina/contracts'
import type { Request, Response } from 'express'

/**
 * Extracts the effective user ID from the request context, authorization headers, or query parameters.
 */
export function extractCurrentUserId(req: Request): string | undefined {
  return (
    (req as AuthenticatedRequest)?.user?.id ||
    (req.headers['x-user-id'] as string) ||
    (req.headers['x-test-user-id'] as string) ||
    (req.query.userId as string) ||
    (req.query.currentUserId as string) ||
    undefined
  )
}

/**
 * GET /api/recommendation/:collegeId
 * Returns recommended students for a college, including the friend request status of each person.
 */
export async function getRecommendations(req: Request, res: Response) {
  try {
    const collegeId = (req.params.collegeId || req.query.collegeId) as string
    if (!collegeId) {
      return res.status(400).json({
        success: false,
        message: 'collegeId is required',
      })
    }

    const currentUserId = extractCurrentUserId(req)
    const limitParam = req.query.limit
    const limit = limitParam
      ? Math.min(Math.max(parseInt(String(limitParam), 10) || 5, 1), 20)
      : 5

    const result = await RecommendationService.getRecommendations(collegeId, currentUserId, limit)
    return res.status(200).json(result)
  } catch (err) {
    return sendError(res, err)
  }
}

/**
 * GET /api/recommendation/status/:targetUserId
 * GET /api/recommendation/person/:targetUserId/status
 * Logic which checks and reports the status of a specific person's friend request.
 */
export async function getPersonRequestStatus(req: Request, res: Response) {
  try {
    const targetUserId = (
      req.params.targetUserId ||
      req.params.userId ||
      req.query.targetUserId ||
      req.query.userId
    ) as string

    if (!targetUserId) {
      return res.status(400).json({
        success: false,
        message: 'targetUserId is required',
      })
    }

    const currentUserId = extractCurrentUserId(req)
    const statusInfo: PersonRequestStatus = await RecommendationService.getPersonRequestStatus(
      currentUserId,
      targetUserId
    )

    return res.status(200).json({
      success: true,
      currentUserId: currentUserId || null,
      targetUserId,
      ...statusInfo,
    })
  } catch (err) {
    return sendError(res, err)
  }
}

export { computePersonRequestStatus }
export type { PersonRequestStatus, PersonRequestStatusType }

