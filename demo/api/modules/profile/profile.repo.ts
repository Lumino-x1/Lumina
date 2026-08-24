import { prisma } from '@lumina/db'

import type { Prisma } from '@lumina/db'

export async function findByUserId(userId: string) {
  return prisma.profile.findUnique({
    where: {
      userId,
    },
  })
}

export async function findByUsername(username: string) {
  return prisma.profile.findFirst({
    where: {
      user: {
        username,
      },
    },
    include: {
      user: true,
    },
  })
}

export async function updateProfile(userId: string, data: Prisma.ProfileUncheckedUpdateInput) {
  const firstName = typeof data.firstName === 'string' ? data.firstName : 'Student'
  const lastName = typeof data.lastName === 'string' ? data.lastName : 'User'

  return prisma.profile.upsert({
    where: { userId },
    update: data,
    create: {
      ...(data as Prisma.ProfileUncheckedCreateInput),
      userId,
      firstName,
      lastName,
    },
  })
}

export const updateProfilePicture = async (
  userId: string,
  profileImageUrl: string,
  profileImageKey: string
) => {
  return prisma.profile.update({
    where: {
      userId,
    },
    data: {
      profilePicture: profileImageUrl,
      profilePictureKey: profileImageKey,
    },
  })
}

export const removeProfilePicture = async (userId: string) => {
  return prisma.profile.update({
    where: {
      userId,
    },
    data: {
      profilePicture: null,
      profilePictureKey: null,
    },
  })
}

export const updateCoverImage = async (
  userId: string,
  coverImageUrl: string,
  coverImageKey: string
) => {
  return prisma.profile.update({
    where: {
      userId,
    },
    data: {
      coverImage: coverImageUrl,
      coverImageKey: coverImageKey,
    },
  })
}

export const removeCoverImage = async (userId: string) => {
  return prisma.profile.update({
    where: {
      userId,
    },
    data: {
      coverImage: null,
      coverImageKey: null,
    },
  })
}
