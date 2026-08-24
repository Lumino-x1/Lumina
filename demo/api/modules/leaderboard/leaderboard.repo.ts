import { redis } from '../../config/config.redis'

export const LEADERBOARD_KEY = 'leaderboard:problems_solved'

export async function upsertEntry(userId: string, solvedCount: number) {
  if (solvedCount <= 0) {
    await redis.zrem(LEADERBOARD_KEY, userId)
    return
  }

  await redis.zadd(LEADERBOARD_KEY, solvedCount, userId)
}

export async function removeEntry(userId: string) {
  await redis.zrem(LEADERBOARD_KEY, userId)
}

export async function bulkUpsertEntries(entries: { userId: string; solvedCount: number }[]) {
  if (entries.length === 0) return

  const pipeline = redis.pipeline()
  for (const { userId, solvedCount } of entries) {
    if (solvedCount > 0) {
      pipeline.zadd(LEADERBOARD_KEY, solvedCount, userId)
    }
  }
  await pipeline.exec()
}

export async function clearLeaderboard() {
  await redis.del(LEADERBOARD_KEY)
}

export async function getTotalCount() {
  return redis.zcard(LEADERBOARD_KEY)
}

export async function getUserRank(userId: string) {
  const rank = await redis.zrevrank(LEADERBOARD_KEY, userId)
  return rank === null ? null : rank + 1
}

export async function getUserScore(userId: string) {
  const score = await redis.zscore(LEADERBOARD_KEY, userId)
  return score === null ? null : Number(score)
}

export async function getEntriesByOffset(limit: number, offset: number) {
  const results = await redis.zrevrange(LEADERBOARD_KEY, offset, offset + limit - 1, 'WITHSCORES')

  const entries: { userId: string; solvedCount: number }[] = []
  for (let i = 0; i < results.length; i += 2) {
    entries.push({
      userId: results[i] ?? '',
      solvedCount: Number(results[i + 1]),
    })
  }

  return entries
}

export async function getEntriesByRankRange(startRank: number, endRank: number) {
  const offset = Math.max(startRank - 1, 0)
  const limit = Math.max(endRank - startRank + 1, 0)
  return getEntriesByOffset(limit, offset)
}
