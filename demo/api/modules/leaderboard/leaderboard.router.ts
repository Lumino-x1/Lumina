import { requireAuth } from '../../middleware'
import {
  getLeaderboard,
  getLeaderboardAroundMe,
  getMyLeaderboardStats,
  getUserLeaderboardStats,
} from './leaderboard.handler'
import { Router } from 'express'

import type { RequestHandler } from 'express'

const router = Router()

router.get('/', requireAuth, getLeaderboard as RequestHandler)
router.get('/me/around', requireAuth, getLeaderboardAroundMe as RequestHandler)
router.get('/me', requireAuth, getMyLeaderboardStats as RequestHandler)
router.get('/:userId', requireAuth, getUserLeaderboardStats as RequestHandler)

export default router
