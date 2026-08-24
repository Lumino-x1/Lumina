import * as syncRepository from '../leetcode/leetcode.sync.repo'
import * as repository from './leaderboard.repo'
import { prisma } from '@lumina/db'

import type { LeaderboardEntry } from '@lumina/core/contracts'

const DEFAULT_LIMIT = 50
const MAX_LIMIT = 100
const AROUND_RANGE = 5

const profileSelect = {
  userId: true,
  firstName: true,
  lastName: true,
  profilePicture: true,
  leetcodeUsername: true,
  leetcodeSolved: true,
  leetcodeEasy: true,
  leetcodeMedium: true,
  leetcodeHard: true,
  leetcodeRating: true,
  leetcodeUpdatedAt: true,
  user: {
    select: {
      username: true,
      name: true,
    },
  },
} as const

async function enrichEntries(
  entries: { userId: string; solvedCount: number }[],
  startRank: number
): Promise<LeaderboardEntry[]> {
  if (entries.length === 0) return []

  const userIds = entries.map((entry) => entry.userId)
  const profiles = await prisma.profile.findMany({
    where: { userId: { in: userIds } },
    select: profileSelect,
  })

  const profileMap = new Map(profiles.map((profile) => [profile.userId, profile]))

  return entries.map((entry, index) => {
    const profile = profileMap.get(entry.userId)

    return {
      rank: startRank + index,
      userId: entry.userId,
      solvedCount: entry.solvedCount,
      username: profile?.user?.username ?? null,
      name:
        profile?.user?.name ||
        `${profile?.firstName ?? ''} ${profile?.lastName ?? ''}`.trim() ||
        null,
      profilePicture: profile?.profilePicture ?? null,
      leetcodeUsername: profile?.leetcodeUsername ?? null,
      easySolved: profile?.leetcodeEasy ?? null,
      mediumSolved: profile?.leetcodeMedium ?? null,
      hardSolved: profile?.leetcodeHard ?? null,
      leetcodeRating: profile?.leetcodeRating ?? null,
      lastSyncedAt: profile?.leetcodeUpdatedAt ?? null,
    }
  })
}

export async function rebuildLeaderboardFromDatabase() {
  const profiles = await syncRepository.findSuccessfulProfilesForRebuild()

  await repository.clearLeaderboard()
  await repository.bulkUpsertEntries(
    profiles
      .filter((profile) => profile.leetcodeSolved != null)
      .map((profile) => ({
        userId: profile.userId,
        solvedCount: profile.leetcodeSolved!,
      }))
  )

  return profiles.length
}

async function ensureLeaderboardReady() {
  const total = await repository.getTotalCount()
  if (total === 0) {
    await rebuildLeaderboardFromDatabase()
  }
}

export function parsePagination(query: { page?: unknown; limit?: unknown }) {
  const page = Math.max(Number(query.page) || 1, 1)
  const limit = Math.min(Math.max(Number(query.limit) || DEFAULT_LIMIT, 1), MAX_LIMIT)
  const offset = (page - 1) * limit

  return { page, limit, offset }
}

export async function getLeaderboard(page = 1, limit = DEFAULT_LIMIT) {
  await ensureLeaderboardReady()

  const offset = (page - 1) * limit
  const [totalUsers, entries] = await Promise.all([
    repository.getTotalCount(),
    repository.getEntriesByOffset(limit, offset),
  ])

  return {
    page,
    limit,
    totalUsers,
    entries: await enrichEntries(entries, offset + 1),
  }
}

export async function getMyLeaderboardStats(userId: string) {
  await ensureLeaderboardReady()

  const [rank, solvedCount, totalUsers] = await Promise.all([
    repository.getUserRank(userId),
    repository.getUserScore(userId),
    repository.getTotalCount(),
  ])

  return {
    rank,
    solvedCount,
    totalUsers,
  }
}

export async function getUserLeaderboardStats(userId: string) {
  const stats = await getMyLeaderboardStats(userId)

  if (stats.rank === null) {
    return null
  }

  const profile = await prisma.profile.findUnique({
    where: { userId },
    select: profileSelect,
  })

  return {
    ...stats,
    user: profile
      ? {
          userId: profile.userId,
          username: profile.user?.username ?? null,
          name:
            profile.user?.name ||
            `${profile.firstName ?? ''} ${profile.lastName ?? ''}`.trim() ||
            null,
          profilePicture: profile.profilePicture,
          leetcodeUsername: profile.leetcodeUsername,
          easySolved: profile.leetcodeEasy,
          mediumSolved: profile.leetcodeMedium,
          hardSolved: profile.leetcodeHard,
          leetcodeRating: profile.leetcodeRating,
          lastSyncedAt: profile.leetcodeUpdatedAt,
        }
      : null,
  }
}

export async function getLeaderboardAroundUser(userId: string, range = AROUND_RANGE) {
  await ensureLeaderboardReady()

  const [myRank, totalUsers] = await Promise.all([
    repository.getUserRank(userId),
    repository.getTotalCount(),
  ])

  if (myRank === null) {
    return {
      myRank: null,
      totalUsers,
      entries: [] as LeaderboardEntry[],
    }
  }

  const startRank = Math.max(myRank - range, 1)
  const endRank = Math.min(myRank + range, totalUsers)
  const entries = await repository.getEntriesByRankRange(startRank, endRank)

  return {
    myRank,
    totalUsers,
    entries: await enrichEntries(entries, startRank),
  }
}
