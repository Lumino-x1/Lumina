import { prisma, Prisma } from '@lumina/db';





export namespace UsersRepo {
  export async function findProfileByUserId(userId: string) {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        email: true,
        phone: true,
        emailVerified: true,
        phoneVerified: true,
        username: true,
        role: true,
        status: true,

        profile: {
          select: {
            firstName: true,
            lastName: true,
            bio: true,
            about: true,
            profilePicture: true,
            profilePictureKey: true,
            coverImage: true,
            cgpa: true,
            semester: true,
            year: true,
            batch: true,
            skills: true,
            interests: true,
            github: true,
            linkedin: true,
            portfolio: true,
            location: true,
            leetcodeUrl: true,
            leetcodeUsername: true,
            leetcodeRating: true,
            leetcodeSolved: true,
            leetcodeEasy: true,
            leetcodeMedium: true,
            leetcodeHard: true,
            leetcodeGlobalRank: true,
            coverImageKey : true
          },
        },

        college: {
          select: {
            id: true,
            name: true,
          },
        },

        department: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    })
    return user;
  }

  export async function findProfileByUsername(username: string) {
    return prisma.profile.findFirst({
      where: { user: { username } },
      include: { user: true },
    })
  }

  export async function updateProfile(userId: string, data: Prisma.ProfileUncheckedUpdateInput) {
    const firstName = typeof data.firstName === 'string' ? data.firstName : 'Student'
    const lastName = typeof data.lastName === 'string' ? data.lastName : 'User'
    let email = typeof data.email === 'string' ? data.email : ''
    if (!email) {
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { email: true },
      })
      email = user?.email || `user.${userId}@lumina.test`
    }

    return prisma.profile.upsert({
      where: { userId },
      update: data,
      create: { ...(data as Prisma.ProfileUncheckedCreateInput), userId, email, firstName, lastName },
    })
  }

  export async function updateProfilePicture(
    userId: string,
    profileImageUrl: string,
    profileImageKey: string
  ) {
    return prisma.profile.update({
      where: { userId },
      data: { profilePicture: profileImageUrl, profilePictureKey: profileImageKey },
    })
  }

  export async function removeProfilePicture(userId: string) {
    return prisma.profile.update({
      where: { userId },
      data: { profilePicture: null, profilePictureKey: null },
    })
  }

  export async function updateCoverImage(
    userId: string,
    coverImageUrl: string,
    coverImageKey: string
  ) {
    return prisma.profile.update({
      where: { userId },
      data: { coverImage: coverImageUrl, coverImageKey },
    })
  }

  export async function removeCoverImage(userId: string) {
    return prisma.profile.update({
      where: { userId },
      data: { coverImage: null, coverImageKey: null },
    })
  }

  export async function findAcceptedFriendship(userId: string, friendId: string) {
    return prisma.friendRequest.findFirst({
      where: {
        status: 'ACCEPTED',
        OR: [
          { senderId: userId, receiverId: friendId },
          { senderId: friendId, receiverId: userId },
        ],
      },
    })
  }

  export async function findUserCollegeId(userId: string) {
    return prisma.user.findUnique({ where: { id: userId }, select: { collegeId: true } })
  }
}