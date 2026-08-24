import { prisma } from '@lumina/db'

export const findUserById = async (userId: string) => {
  return prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      id: true,
      username: true,
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
      image: true,
    },
  })
}
