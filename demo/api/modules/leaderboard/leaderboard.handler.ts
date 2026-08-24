import * as leaderboardService from './leaderboard.service'
import { MSG_FAILED_TO_FETCH_LEADERBOARD, MSG_LEADERBOARD_USER_NOT_FOUND } from '@lumina/core/constants'

import type { AuthenticatedRequest } from '@lumina/core/contracts'
import type { Request, Response } from 'express'

export async function getLeaderboard(req: Request, res: Response) {
  try {
    const { page, limit } = leaderboardService.parsePagination(req.query)
    const leaderboard = await leaderboardService.getLeaderboard(page, limit)

    return res.json(leaderboard)
  } catch (err) {
    console.error('[leaderboard] Failed to fetch leaderboard:', err)

    return res.status(500).json({
      message: MSG_FAILED_TO_FETCH_LEADERBOARD,
    })
  }
}

export async function getMyLeaderboardStats(req: Request, res: Response) {
  try {
    const { user } = req as AuthenticatedRequest
    const stats = await leaderboardService.getMyLeaderboardStats(user.id)

    return res.json({
      rank: stats.rank,
      solvedCount: stats.solvedCount,
      totalUsers: stats.totalUsers,
    })
  } catch (err) {
    console.error('[leaderboard] Failed to fetch my stats:', err)

    return res.status(500).json({
      message: MSG_FAILED_TO_FETCH_LEADERBOARD,
    })
  }
}

export async function getLeaderboardAroundMe(req: Request, res: Response) {
  try {
    const { user } = req as AuthenticatedRequest
    const result = await leaderboardService.getLeaderboardAroundUser(user.id)

    return res.json(result)
  } catch (err) {
    console.error('[leaderboard] Failed to fetch around-me leaderboard:', err)

    return res.status(500).json({
      message: MSG_FAILED_TO_FETCH_LEADERBOARD,
    })
  }
}

export async function getUserLeaderboardStats(req: Request, res: Response) {
  try {
    const stats = await leaderboardService.getUserLeaderboardStats(req.params.userId as string)

    if (!stats) {
      return res.status(404).json({
        message: MSG_LEADERBOARD_USER_NOT_FOUND,
      })
    }

    return res.json(stats)
  } catch (err) {
    console.error('[leaderboard] Failed to fetch user stats:', err)

    return res.status(500).json({
      message: MSG_FAILED_TO_FETCH_LEADERBOARD,
    })
  }
}
