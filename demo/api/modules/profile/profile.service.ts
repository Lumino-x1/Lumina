import { assertDeclaredMimeMatchesContent } from '../../lib/file-signature'
import { badRequest, notFound } from '../../lib/http-error'
import * as friendsRepo from '../friends/friends.repo'
import { canViewProfile, toPublicProfileDto } from './profile.dto'
import * as repository from './profile.repo'
import { prisma } from '@lumina/db'
import { deleteFile, uploadFile } from '@lumina/storage'
import { profileUpdateSchema, protectedProfileFields } from '@lumina/core/validators'

import type { AuthenticatedRequest } from '@lumina/core/contracts'
import type { Prisma } from '@lumina/db'

function extractLeetcodeUsername(leetcodeUrl: string | null | undefined) {
  if (!leetcodeUrl) {
    return null
  }
  return leetcodeUrl.split('/').filter(Boolean).pop() ?? null
}

export async function getMyProfile(userId: string) {
  return repository.findByUserId(userId)
}

export async function updateMyProfile(userId: string, body: unknown) {
  const parsed = profileUpdateSchema.safeParse(body)
  if (!parsed.success) {
    throw badRequest('INVALID_PROFILE_PAYLOAD', parsed.error.issues[0]?.message)
  }

  for (const field of protectedProfileFields) {
    if (field in (body as object)) {
      throw badRequest('PROTECTED_FIELD', `Cannot update ${field}`)
    }
  }

  const data: Prisma.ProfileUncheckedUpdateInput = { ...parsed.data }
  if (parsed.data.dob) {
    data.dob = new Date(parsed.data.dob)
  }
  if (parsed.data.leetcodeUrl !== undefined) {
    data.leetcodeUsername = extractLeetcodeUsername(parsed.data.leetcodeUrl)
  }

  return repository.updateProfile(userId, data)
}

export async function getProfileByUsername(
  username: string,
  viewer?: AuthenticatedRequest['user']
) {
  const profile = await repository.findByUsername(username)
  if (!profile) {
    throw notFound('PROFILE_NOT_FOUND')
  }

  const isOwner = viewer?.id === profile.userId
  const isFriend = viewer
    ? Boolean(await friendsRepo.findAcceptedFriendship(viewer.id, profile.userId))
    : false
  const viewerRecord = viewer
    ? await prisma.user.findUnique({ where: { id: viewer.id }, select: { collegeId: true } })
    : null

  const allowed = canViewProfile({
    visibility: profile.profileVisibility,
    ownerUserId: profile.userId,
    ownerCollegeId: profile.user.collegeId,
    viewerId: viewer?.id,
    viewerCollegeId: viewerRecord?.collegeId,
    isFriend,
  })

  if (!allowed) {
    throw notFound('PROFILE_NOT_FOUND')
  }

  return toPublicProfileDto(profile, { isOwner })
}

async function replaceImage(args: {
  userId: string
  file: Express.Multer.File
  folder: string
  currentKey: string | null
  persist: (url: string, key: string) => Promise<unknown>
}) {
  if (!args.file) {
    throw badRequest('FILE_REQUIRED', 'Image file is required.')
  }

  const buffer = args.file.buffer
  if (!buffer) {
    throw badRequest('FILE_REQUIRED', 'Image file is required.')
  }

  try {
    assertDeclaredMimeMatchesContent(args.file.mimetype, buffer)
  } catch {
    throw badRequest('INVALID_FILE', 'File content does not match the declared type.')
  }

  const uploaded = await uploadFile({
    buffer,
    mimeType: args.file.mimetype,
    folder: args.folder,
  })
  if (!uploaded?.url || !uploaded?.key) {
    throw new Error('Failed to upload file to S3.')
  }

  const saved = await args.persist(uploaded.url, uploaded.key)

  if (args.currentKey && args.currentKey !== uploaded.key) {
    try {
      await deleteFile(args.currentKey)
    } catch {
      // Orphan cleanup is best-effort after the new object is referenced.
    }
  }

  return saved
}

export const uploadProfilePicture = async (userId: string, file: Express.Multer.File) => {
  const profile = await repository.findByUserId(userId)
  if (!profile) {
    throw notFound('PROFILE_NOT_FOUND')
  }

  return replaceImage({
    userId,
    file,
    folder: `users/${userId}/profile`,
    currentKey: profile.profilePictureKey,
    persist: (url, key) => repository.updateProfilePicture(userId, url, key),
  })
}

export const deleteProfilePicture = async (userId: string) => {
  const profile = await repository.findByUserId(userId)
  if (!profile) {
    throw notFound('PROFILE_NOT_FOUND')
  }

  const removed = await repository.removeProfilePicture(userId)
  if (profile.profilePictureKey) {
    try {
      await deleteFile(profile.profilePictureKey)
    } catch {
      // best-effort
    }
  }
  return removed
}

export const uploadCoverImage = async (userId: string, file: Express.Multer.File) => {
  const profile = await repository.findByUserId(userId)
  if (!profile) {
    throw notFound('PROFILE_NOT_FOUND')
  }

  return replaceImage({
    userId,
    file,
    folder: `users/${userId}/cover`,
    currentKey: profile.coverImageKey,
    persist: (url, key) => repository.updateCoverImage(userId, url, key),
  })
}

export const deleteCoverImage = async (userId: string) => {
  const profile = await repository.findByUserId(userId)
  if (!profile) {
    throw notFound('PROFILE_NOT_FOUND')
  }

  const removed = await repository.removeCoverImage(userId)
  if (profile.coverImageKey) {
    try {
      await deleteFile(profile.coverImageKey)
    } catch {
      // best-effort
    }
  }
  return removed
}
