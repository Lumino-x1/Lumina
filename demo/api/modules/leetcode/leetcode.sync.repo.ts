import { prisma } from '@lumina/db'

import type { LeetCodeStats } from './leetcode.types'

const profileSelect = {
  id: true,
  userId: true,
  leetcodeUsername: true,
  leetcodeSolved: true,
  leetcodeEasy: true,
  leetcodeMedium: true,
  leetcodeHard: true,
  leetcodeRating: true,
  leetcodeGlobalRank: true,
} as const

export async function findProfileById(profileId: string) {
  return prisma.profile.findUnique({
    where: { id: profileId },
    select: profileSelect,
  })
}

export async function findProfileByUserId(userId: string) {
  return prisma.profile.findUnique({
    where: { userId },
    select: profileSelect,
  })
}

export async function findStaleProfiles(syncedBefore: Date) {
  return prisma.profile.findMany({
    where: {
      leetcodeUsername: { not: null },
      OR: [{ leetcodeUpdatedAt: null }, { leetcodeUpdatedAt: { lt: syncedBefore } }],
    },
    select: { id: true },
    orderBy: { leetcodeUpdatedAt: 'asc' },
  })
}

export async function findSuccessfulProfilesForRebuild() {
  return prisma.profile.findMany({
    where: {
      leetcodeUsername: { not: null },
      leetcodeSyncStatus: 'SUCCESS',
      leetcodeSolved: { gt: 0 },
    },
    select: {
      userId: true,
      leetcodeSolved: true,
    },
  })
}

export function hasStatsChanged(
  profile: {
    leetcodeSolved: number | null
    leetcodeEasy: number | null
    leetcodeMedium: number | null
    leetcodeHard: number | null
    leetcodeRating: number | null
    leetcodeGlobalRank: number | null
  },
  stats: LeetCodeStats
) {
  return (
    profile.leetcodeSolved !== stats.solvedCount ||
    profile.leetcodeEasy !== stats.easySolved ||
    profile.leetcodeMedium !== stats.mediumSolved ||
    profile.leetcodeHard !== stats.hardSolved ||
    profile.leetcodeRating !== stats.rating ||
    profile.leetcodeGlobalRank !== stats.globalRank
  )
}

export async function updateStats(profileId: string, stats: LeetCodeStats) {
  return prisma.profile.update({
    where: { id: profileId },
    data: {
      leetcodeUsername: stats.username,
      leetcodeSolved: stats.solvedCount,
      leetcodeEasy: stats.easySolved,
      leetcodeMedium: stats.mediumSolved,
      leetcodeHard: stats.hardSolved,
      leetcodeRating: stats.rating,
      leetcodeGlobalRank: stats.globalRank,
      leetcodeUpdatedAt: new Date(),
      leetcodeSyncStatus: 'SUCCESS',
      leetcodeSyncError: null,
    },
  })
}

export async function touchSyncSuccess(profileId: string) {
  return prisma.profile.update({
    where: { id: profileId },
    data: {
      leetcodeUpdatedAt: new Date(),
      leetcodeSyncStatus: 'SUCCESS',
      leetcodeSyncError: null,
    },
  })
}

export async function markSyncFailed(profileId: string, error: string) {
  return prisma.profile.update({
    where: { id: profileId },
    data: {
      leetcodeSyncStatus: 'FAILED',
      leetcodeSyncError: error.slice(0, 500),
    },
  })
}
