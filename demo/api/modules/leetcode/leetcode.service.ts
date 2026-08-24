import type { LeetCodeStats } from './leetcode.types'

const LEETCODE_URL = process.env.LEETCODE_URL || 'https://leetcode.com/graphql'

interface LeetCodeGraphQLResponse {
  data?: {
    matchedUser?: {
      username: string
      submitStats?: {
        acSubmissionNum?: {
          difficulty: string
          count: number
        }[]
      }
    }
    userContestRanking?: {
      rating?: number
      globalRanking?: number
    }
  }
  errors?: unknown[]
}

export async function fetchLeetCodeStats(username: string) {
  const query = `
    query userProfile($username: String!) {
      matchedUser(username: $username) {
        username
        submitStats {
          acSubmissionNum {
            difficulty
            count
          }
        }
      }
      userContestRanking(username: $username) {
        rating
        globalRanking
      }
    }
  `

  const response = await fetch(LEETCODE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Referer: 'https://leetcode.com/',
      'User-Agent': 'Mozilla/5.0',
    },
    body: JSON.stringify({
      query,
      variables: { username },
    }),
  })

  if (!response.ok) {
    throw new Error(`LEETCODE_HTTP_${response.status}`)
  }

  const result = (await response.json()) as LeetCodeGraphQLResponse

  if (result.errors?.length) {
    throw new Error('LEETCODE_GRAPHQL_ERROR')
  }

  if (!result.data) {
    throw new Error('LEETCODE_EMPTY_RESPONSE')
  }

  return result.data
}

export function transformLeetCodeStats(
  data: NonNullable<LeetCodeGraphQLResponse['data']>
): LeetCodeStats {
  const user = data.matchedUser

  if (!user) {
    throw new Error('LEETCODE_USER_NOT_FOUND')
  }

  const submissions = user.submitStats?.acSubmissionNum ?? []
  const easySolved = submissions.find((entry) => entry.difficulty === 'Easy')?.count ?? 0
  const mediumSolved = submissions.find((entry) => entry.difficulty === 'Medium')?.count ?? 0
  const hardSolved = submissions.find((entry) => entry.difficulty === 'Hard')?.count ?? 0

  return {
    username: user.username,
    solvedCount: easySolved + mediumSolved + hardSolved,
    easySolved,
    mediumSolved,
    hardSolved,
    rating: data.userContestRanking?.rating ? Math.round(data.userContestRanking.rating) : null,
    globalRank: data.userContestRanking?.globalRanking ?? null,
  }
}
