import { prisma } from '@lumina/db'

export namespace RecommendationRepo {
  export async function findCollege(collegeId: string) {
    return prisma.college.findFirst({
      where: {
        OR: [
          { id: collegeId },
          { slug: collegeId },
          { domain: collegeId },
          { name: { contains: collegeId, mode: 'insensitive' } },
        ],
      },
    })
  }

  export async function findRecommendedStudents(
    collegeId: string,
    excludeUserId?: string,
    limit: number = 5
  ) {
    return prisma.user.findMany({
      where: excludeUserId
        ? { collegeId, id: { not: excludeUserId } }
        : { collegeId },
      take: limit,
      orderBy: [
        { createdAt: 'desc' },
      ],
      select: {
        id: true,
        name: true,
        username: true,
        image: true,
        role: true,
        collegeId: true,
        college: {
          select: {
            id: true,
            name: true,
            shortName: true,
          },
        },
        departmentId: true,
        department: {
          select: {
            id: true,
            name: true,
            code: true,
          },
        },
        profile: {
          select: {
            firstName: true,
            lastName: true,
            profilePicture: true,
            bio: true,
            year: true,
            batch: true,
          },
        },
      },
    })
  }

  export async function findFallbackStudents(excludeUserId?: string, limit: number = 5) {
    return prisma.user.findMany({
      where: excludeUserId
        ? { id: { not: excludeUserId } }
        : undefined,
      take: limit,
      orderBy: [
        { createdAt: 'desc' },
      ],
      select: {
        id: true,
        name: true,
        username: true,
        image: true,
        role: true,
        collegeId: true,
        college: {
          select: {
            id: true,
            name: true,
            shortName: true,
          },
        },
        departmentId: true,
        department: {
          select: {
            id: true,
            name: true,
            code: true,
          },
        },
        profile: {
          select: {
            firstName: true,
            lastName: true,
            profilePicture: true,
            bio: true,
            year: true,
            batch: true,
          },
        },
      },
    })
  }

  export async function findFriendRequestsBetween(
    currentUserId: string,
    targetUserIds: string[]
  ) {
    if (!currentUserId || targetUserIds.length === 0) return []
    return prisma.friendRequest.findMany({
      where: {
        OR: [
          { senderId: currentUserId, receiverId: { in: targetUserIds } },
          { senderId: { in: targetUserIds }, receiverId: currentUserId },
        ],
      },
      select: {
        id: true,
        senderId: true,
        receiverId: true,
        status: true,
      },
    })
  }
}
