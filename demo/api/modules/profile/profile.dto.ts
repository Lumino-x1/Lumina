import type { Profile, User, Visibility } from '@lumina/db'

const PUBLIC_PROFILE_FIELDS = [
  'id',
  'userId',
  'firstName',
  'lastName',
  'bio',
  'about',
  'profilePicture',
  'coverImage',
  'gender',
  'hometown',
  'location',
  'semester',
  'year',
  'batch',
  'skills',
  'interests',
  'languages',
  'github',
  'linkedin',
  'portfolio',
  'leetcodeUrl',
  'leetcodeUsername',
  'leetcodeRating',
  'leetcodeSolved',
  'leetcodeEasy',
  'leetcodeMedium',
  'leetcodeHard',
  'leetcodeGlobalRank',
  'profileVisibility',
  'hideEmail',
  'hidePhone',
  'hideCgpa',
] as const

type PublicUser = {
  id: string
  username: string | null
  name: string
  image: string | null
  email?: string
  phone?: string
}

export type PublicProfileDto = Pick<Profile, (typeof PUBLIC_PROFILE_FIELDS)[number]> & {
  cgpa?: number | null
  user: PublicUser
}

type ProfileWithUser = Profile & {
  user: Pick<User, 'id' | 'username' | 'name' | 'image' | 'email' | 'phone' | 'collegeId'>
}

export function toOwnerProfileDto(profile: Profile): Profile {
  return profile
}

export function canViewProfile(args: {
  visibility: Visibility
  ownerUserId: string
  ownerCollegeId: string | null
  viewerId?: string
  viewerCollegeId?: string | null
  isFriend?: boolean
}) {
  if (args.viewerId && args.viewerId === args.ownerUserId) {
    return true
  }

  switch (args.visibility) {
    case 'PUBLIC':
      return true
    case 'COLLEGE':
      return Boolean(
        args.viewerCollegeId && args.ownerCollegeId && args.viewerCollegeId === args.ownerCollegeId
      )
    case 'FRIENDS':
      return Boolean(args.isFriend)
    case 'PRIVATE':
      return false
    default:
      return false
  }
}

export function toPublicProfileDto(
  profile: ProfileWithUser,
  options: { isOwner: boolean }
): PublicProfileDto {
  const base = Object.fromEntries(
    PUBLIC_PROFILE_FIELDS.map((field) => [field, profile[field]])
  ) as Pick<Profile, (typeof PUBLIC_PROFILE_FIELDS)[number]>

  const user: PublicUser = {
    id: profile.user.id,
    username: profile.user.username,
    name: profile.user.name,
    image: profile.user.image,
  }

  if (options.isOwner || !profile.hideEmail) {
    user.email = profile.user.email
  }
  if (options.isOwner || !profile.hidePhone) {
    user.phone = profile.user.phone ?? undefined
  }

  return {
    ...base,
    cgpa: options.isOwner || !profile.hideCgpa ? profile.cgpa : undefined,
    user,
  }
}

export const publicUserSelect = {
  id: true,
  username: true,
  name: true,
  image: true,
  email: true,
  phone: true,
  collegeId: true,
} as const
