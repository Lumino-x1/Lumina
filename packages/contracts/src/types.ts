import type { Request } from 'express'

export interface AuthenticatedRequest extends Request {
  user: {
    id: string
    email: string
    role: string
  }
}

export interface SignUpInput {
  firstName?: string
  lastName?: string
  email: string
  profilePicture?: string | null
  college?: string | null
  department?: string | null
  year?: number | null
  interests?: string[]
  skills?: string[]
  bio?: string
  about?: string
  github?: string
  portfolio?: string
  location?: string
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

export interface LeaderboardEntry {
  rank: number
  userId: string
  solvedCount: number
  username: string | null
  name: string | null
  profilePicture: string | null
  leetcodeUsername: string | null
  leetcodeRating: number | null
  lastSyncedAt: Date | null
}

export interface CreateClubInput {
  name: string
  description?: string | null
  category?: string | null
}

export interface UpdateClubInput {
  name?: string
  description?: string | null
  category?: string | null
  status?: 'ACTIVE' | 'ARCHIVED'
}
