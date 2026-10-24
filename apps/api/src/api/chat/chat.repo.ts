import { prisma } from '@lumina/db'

export namespace ChatRepo {
  export const findUserById = async (userId: string) => {
    return prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        username: true,
        name: true,
        image: true,
      },
    })
  }

  export const findUsersByIds = async (userIds: string[]) => {
    return prisma.user.findMany({
      where: {
        id: {
          in: userIds,
        },
      },
      select: {
        id: true,
        username: true,
        name: true,
        image: true,
      },
    })
  }
}

export const findUserById = ChatRepo.findUserById
export const findUsersByIds = ChatRepo.findUsersByIds
