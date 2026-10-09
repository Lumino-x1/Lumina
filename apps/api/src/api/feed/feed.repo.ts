import { prisma } from '@lumina/db'

const feedPostSelect = {
  id: true,
  title: true,
  subtitle: true,
  coverImage: true,
  blocks: true,
  content: true,
  category: true,
  topics: true,
  visibility: true,
  anonymous: true,
  isAnnouncement: true,
  location: true,
  createdAt: true,
  updatedAt: true,
  likeCount: true,
  commentCount: true,
  viewCount: true,
  shareCount: true,
  saveCount: true,
  author: {
    select: {
      id: true,
      username: true,
      name: true,
      image: true,
    },
  },
  media: {
    orderBy: { order: 'asc' as const },
  },
} as const

export async function findCollegeFeed(collegeId: string, limit: number, cursor?: string) {
  return prisma.post.findMany({
    where: {
      deletedAt: null,
      visibility: { in: ['PUBLIC', 'COLLEGE'] },
      author: { collegeId },
    },
    orderBy: [{ createdAt: 'desc' }, { id: 'desc' }],
    take: limit + 1,
    ...(cursor ? { skip: 1, cursor: { id: cursor } } : {}),
    select: feedPostSelect,
  })
}
