import { enqueueProfileSync } from '../../config/leetcode.queue'
import * as syncRepository from './leetcode.sync.repo'
import {
  canManualSync,
  getManualSyncCooldownSeconds,
  recordManualSync,
} from './leetcode.sync.service'
import {
  MSG_FAILED_TO_SYNC_LEETCODE,
  MSG_LEETCODE_SYNC_QUEUED,
  MSG_LEETCODE_SYNC_RATE_LIMITED,
  MSG_PROFILE_NOT_FOUND,
} from '@lumina/core/constants'

import type { AuthenticatedRequest } from '@lumina/core/contracts'
import type { Request, Response } from 'express'

export async function manualSyncLeetCode(req: Request, res: Response) {
  try {
    const { user } = req as AuthenticatedRequest
    const profile = await syncRepository.findProfileByUserId(user.id)

    if (!profile) {
      return res.status(404).json({ message: MSG_PROFILE_NOT_FOUND })
    }

    if (!profile.leetcodeUsername) {
      return res.status(400).json({
        message: 'LeetCode username is not linked to your profile',
      })
    }

    const allowed = await canManualSync(user.id)
    if (!allowed) {
      const retryAfterSeconds = await getManualSyncCooldownSeconds(user.id)
      return res.status(429).json({
        message: MSG_LEETCODE_SYNC_RATE_LIMITED,
        retryAfterSeconds,
      })
    }

    await recordManualSync(user.id)

    const job = await enqueueProfileSync(profile.id, { priority: 1 })

    return res.status(202).json({
      message: MSG_LEETCODE_SYNC_QUEUED,
      jobId: job.id,
    })
  } catch (err) {
    console.error('[leetcode] Manual sync failed:', err)

    return res.status(500).json({
      message: MSG_FAILED_TO_SYNC_LEETCODE,
      error: err instanceof Error ? err.message : String(err),
    })
  }
}
