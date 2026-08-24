import { redis } from '../../config/config.redis'
import * as leaderboardRepository from '../leaderboard/leaderboard.repo'
import { fetchLeetCodeStats, transformLeetCodeStats } from './leetcode.service'
import * as syncRepository from './leetcode.sync.repo'

import type { LeetCodeStats, ProfileLeetCodeSnapshot, SyncResult } from './leetcode.types'

const MANUAL_SYNC_RATE_LIMIT_KEY = (userId: string) => `leetcode:sync:ratelimit:${userId}`
const MANUAL_SYNC_RATE_LIMIT_SECONDS = 300

function isValidStats(stats: LeetCodeStats, profile: ProfileLeetCodeSnapshot) {
  if (
    stats.easySolved < 0 ||
    stats.mediumSolved < 0 ||
    stats.hardSolved < 0 ||
    stats.solvedCount < 0
  ) {
    return false
  }

  if (stats.solvedCount !== stats.easySolved + stats.mediumSolved + stats.hardSolved) {
    return false
  }

  const previousSolved = profile.leetcodeSolved ?? 0

  if (previousSolved > 0 && stats.solvedCount === 0) {
    return false
  }

  return true
}

export async function syncProfileById(profileId: string): Promise<SyncResult> {
  const profile = await syncRepository.findProfileById(profileId)

  if (!profile) {
    throw new Error('PROFILE_NOT_FOUND')
  }

  return syncProfile(profile)
}

export async function syncProfileByUserId(userId: string): Promise<SyncResult> {
  const profile = await syncRepository.findProfileByUserId(userId)

  if (!profile) {
    throw new Error('PROFILE_NOT_FOUND')
  }

  return syncProfile(profile)
}

async function syncProfile(profile: ProfileLeetCodeSnapshot): Promise<SyncResult> {
  if (!profile.leetcodeUsername) {
    return { status: 'skipped', reason: 'NO_LEETCODE_USERNAME' }
  }

  try {
    const raw = await fetchLeetCodeStats(profile.leetcodeUsername)
    const stats = transformLeetCodeStats(raw)

    if (!isValidStats(stats, profile)) {
      const error = 'INVALID_STATS_RESPONSE'
      await syncRepository.markSyncFailed(profile.id, error)
      console.warn(
        `[leetcode-sync] Invalid stats for ${profile.leetcodeUsername}: refusing to overwrite stored data`
      )
      return { status: 'failed', error }
    }

    const changed = syncRepository.hasStatsChanged(profile, stats)

    if (changed) {
      await syncRepository.updateStats(profile.id, stats)
      console.log(
        `[leetcode-sync] Updated ${profile.leetcodeUsername}: ${profile.leetcodeSolved ?? 0} -> ${stats.solvedCount}`
      )
    } else {
      await syncRepository.touchSyncSuccess(profile.id)
      console.log(`[leetcode-sync] No changes for ${profile.leetcodeUsername}`)
    }

    await leaderboardRepository.upsertEntry(profile.userId, stats.solvedCount)

    return { status: 'success', changed, stats }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'LEETCODE_SYNC_FAILED'
    await syncRepository.markSyncFailed(profile.id, message)
    console.error(`[leetcode-sync] Failed for ${profile.leetcodeUsername}:`, message)
    throw error
  }
}

export async function canManualSync(userId: string) {
  const exists = await redis.exists(MANUAL_SYNC_RATE_LIMIT_KEY(userId))
  return exists === 0
}

export async function recordManualSync(userId: string) {
  await redis.set(MANUAL_SYNC_RATE_LIMIT_KEY(userId), '1', 'EX', MANUAL_SYNC_RATE_LIMIT_SECONDS)
}

export async function getManualSyncCooldownSeconds(userId: string) {
  const ttl = await redis.ttl(MANUAL_SYNC_RATE_LIMIT_KEY(userId))
  return ttl > 0 ? ttl : 0
}
