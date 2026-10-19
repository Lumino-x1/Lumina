import { sendError } from '../../../lib/send-error'
import { RecommendationService } from './recommendation.service'

import type { AuthenticatedRequest } from '@lumina/contracts'
import type { Request, Response } from 'express'

export async function getRecommendations(req: Request, res: Response) {
  try {
    const collegeId = (req.params.collegeId || req.query.collegeId) as string
    if (!collegeId) {
      return res.status(400).json({
        success: false,
        message: 'collegeId is required',
      })
    }

    const currentUserId = (req as AuthenticatedRequest)?.user?.id
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
