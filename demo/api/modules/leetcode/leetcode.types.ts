export interface LeetCodeStats {
  username: string
  solvedCount: number
  easySolved: number
  mediumSolved: number
  hardSolved: number
  rating: number | null
  globalRank: number | null
}

export interface ProfileLeetCodeSnapshot {
  id: string
  userId: string
  leetcodeUsername: string | null
  leetcodeSolved: number | null
  leetcodeEasy: number | null
  leetcodeMedium: number | null
  leetcodeHard: number | null
  leetcodeRating: number | null
  leetcodeGlobalRank: number | null
}

export type SyncResult =
  | { status: 'success'; changed: boolean; stats: LeetCodeStats }
  | { status: 'skipped'; reason: string }
  | { status: 'failed'; error: string }
