import type { Request } from 'express'

export interface AuthenticatedRequest extends Request {
  user: {
    id: string
    email: string
    role: string
  }
}

export interface SignUpInput {
  name: string
  email: string
  password: string
  rememberMe?: boolean
}

export interface SignInInput {
  email: string
  password: string
  rememberMe?: boolean
}

export interface UsernameParams {
  username: string
}

export interface UploadFileOptions {
  buffer?: Buffer
  mimeType: string
  folder: string
  fileName?: string
}

export interface CreatePostInput {
  userId: string
  body: {
    content?: string
    visibility: 'PUBLIC' | 'COLLEGE' | 'FRIENDS' | 'PRIVATE'
    anonymous?: boolean
    location?: string
  }
  files: Array<{
    buffer: Buffer
    mimetype: string
    size: number
    originalname: string
  }>
}

export interface LeaderboardEntry {
  rank: number
  userId: string
  solvedCount: number
  username: string | null
  name: string | null
  profilePicture: string | null
  leetcodeUsername: string | null
  easySolved: number | null
  mediumSolved: number | null
  hardSolved: number | null
  leetcodeRating: number | null
  lastSyncedAt: Date | null
}
