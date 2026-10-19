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

  /**
   * Finds all user IDs who have an accepted friendship with the given user.
   */
  export async function findFriendUserIds(currentUserId: string): Promise<string[]> {
    if (!currentUserId) return []
    const accepted = await prisma.friendRequest.findMany({
      where: {
        status: 'ACCEPTED',
        OR: [
          { senderId: currentUserId },
          { receiverId: currentUserId },
        ],
      },
      select: {
        senderId: true,
        receiverId: true,
      },
    })

    const friendIds = new Set<string>()
    for (const r of accepted) {
      if (r.senderId === currentUserId && r.receiverId) {
        friendIds.add(r.receiverId)
      } else if (r.receiverId === currentUserId && r.senderId) {
        friendIds.add(r.senderId)
      }
    }
    return Array.from(friendIds)
  }

  export async function findRecommendedStudents(
    collegeId: string,
    excludeUserIds: string[] = [],
    limit: number = 5
  ) {
    return prisma.user.findMany({
      where: {
        collegeId,
        ...(excludeUserIds.length > 0 ? { id: { notIn: excludeUserIds } } : {}),
      },
      take: Math.max(limit * 2, 10),
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

  export async function findFallbackStudents(excludeUserIds: string[] = [], limit: number = 5) {
    return prisma.user.findMany({
      where: excludeUserIds.length > 0
        ? { id: { notIn: excludeUserIds } }
        : undefined,
      take: Math.max(limit * 2, 10),
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
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        id: true,
        senderId: true,
        receiverId: true,
        status: true,
        createdAt: true,
      },
    })
  }
}
