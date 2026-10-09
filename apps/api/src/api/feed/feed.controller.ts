import { parseLimit } from '../../../lib/pagination'
import { sendError } from '../../../lib/send-error'
import { getMyFeed } from './feed.service'

import type { AuthenticatedRequest } from '@lumina/contracts'
import type { Request, Response } from 'express'

export async function getFeed(req: Request, res: Response) {
  try {
    const userId = (req as AuthenticatedRequest).user.id
    const limit = parseLimit(req.query.limit)
    const cursor = typeof req.query.cursor === 'string' ? req.query.cursor : undefined

    return res.status(200).json({
      success: true,
      data: await getMyFeed(userId, { limit, cursor }),
    })
  } catch (error) {
    return sendError(res, error)
  }
}
