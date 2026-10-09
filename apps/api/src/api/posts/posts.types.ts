import type { Prisma, Visibility } from '@lumina/db';

export type PostCreateData = {
  authorId: string
  title?: string
  subtitle?: string
  coverImage?: string
  blocks?: Prisma.InputJsonValue
  content?: string
  category?: string
  topics: string[]
  visibility: Visibility
  anonymous: boolean
  location?: string
}

export type PostMediaCreateData = {
  type: 'IMAGE' | 'VIDEO'
  url: string
  key: string
  mimeType: string
  size: number
  width: number | null
  height: number | null
  duration: number | null
}

export type  CreatePostInput = {
  userId: string
  body: {
    title?: string
    subtitle?: string
    coverImage?: string
    blocks?: unknown
    content?: string
    category?: string
    topics?: string[] | string
    visibility?: 'PUBLIC' | 'COLLEGE' | 'FRIENDS' | 'PRIVATE'
    anonymous?: boolean
    location?: string
    media: []
  }
}