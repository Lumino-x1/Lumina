import { assertDeclaredMimeMatchesContent } from '../../../lib/file-signature';
import { badRequest, notFound } from '../../../lib/http-error';
import { UsersRepo } from './users.repo';
import { MSG_PROFILE_NOT_FOUND } from '@lumina/constants';
import { prisma } from '@lumina/db';
import { deleteFile, uploadFile } from '@lumina/storage';
import { profileUpdateSchema, protectedProfileFields } from '@lumina/validators';
import type { AuthenticatedRequest } from '@lumina/contracts';
import type { Prisma, Profile, User, Visibility } from '@lumina/db';


namespace UsersDto {
  const publicFields = [
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

  type ProfileWithUser = Profile & {
    user: Pick<User, 'id' | 'username' | 'name' | 'image' | 'email' | 'phone' | 'collegeId'>
  }

  export function canViewProfile(args: {
    visibility: Visibility
    ownerUserId: string
    ownerCollegeId: string | null
    viewerId?: string
    viewerCollegeId?: string | null
    isFriend?: boolean
  }) {
    if (args.viewerId === args.ownerUserId) return true
    if (args.visibility === 'PUBLIC') return true
    if (args.visibility === 'COLLEGE') {
      return Boolean(args.viewerCollegeId && args.ownerCollegeId === args.viewerCollegeId)
    }
    return args.visibility === 'FRIENDS' && Boolean(args.isFriend)
  }

  export function toPublicProfileDto(profile: ProfileWithUser, isOwner: boolean) {
    const base = Object.fromEntries(publicFields.map((field) => [field, profile[field]]))
    const user: PublicUser = {
      id: profile.user.id,
      username: profile.user.username,
      name: profile.user.name,
      image: profile.user.image,
    }
    if (isOwner || !profile.hideEmail) user.email = profile.user.email
    if (isOwner || !profile.hidePhone) user.phone = profile.user.phone ?? undefined
    return {
      ...base,
      cgpa: isOwner || !profile.hideCgpa ? profile.cgpa : undefined,
      user,
    }
  }
}

function extractLeetcodeUsername(leetcodeUrl: string | null | undefined) {
  return leetcodeUrl?.split('/').filter(Boolean).pop() ?? null
}

export namespace UsersService {
  export async function getMyProfile(userId: string) {
    const userWithProfile = await UsersRepo.findProfileByUserId(userId)
    if (!userWithProfile) return null
    if (userWithProfile.profile) {
      return {
        ...userWithProfile.profile,
        username: userWithProfile.username,
        email: userWithProfile.email,
        college: userWithProfile.college,
        department: userWithProfile.department,
        profile: userWithProfile.profile,
        user: {
          email: userWithProfile.email,
          username: userWithProfile.username,
          role: userWithProfile.role,
          status: userWithProfile.status,
          collegeId: userWithProfile.college?.id,
          departmentId: userWithProfile.department?.id,
        },
      }
    }
    return userWithProfile
  }

  export async function saveOnboardingProfile(userIdFromSession: string | undefined, body: any) {
    if (!body || typeof body !== 'object') {
      throw badRequest('INVALID_PAYLOAD', 'Onboarding payload must be an object')
    }

    // 1. Identify user
    let user = null
    const candidateId = userIdFromSession || body.userId
    if (candidateId && typeof candidateId === 'string') {
      user = await prisma.user.findUnique({
        where: { id: candidateId },
      })
    }
    if (!user && body.email && typeof body.email === 'string') {
      user = await prisma.user.findUnique({
        where: { email: body.email.trim().toLowerCase() },
      })
    }

    if (!user) {
      throw badRequest('USER_NOT_FOUND', 'Could not locate account to save onboarding profile')
    }

    // 2. Resolve or create College && Automatically identify College using the user's email domain
    let collegeId: string | undefined

    const candidateEmail =
      (typeof body.collegeEmail === 'string' && body.collegeEmail.trim()) ||
      (typeof body.college_email === 'string' && body.college_email.trim()) ||
      (typeof body.email === 'string' && body.email.trim() && body.email.includes('@')
        ? body.email.trim()
        : '') ||
      user.email.trim()

    const emailDomain = candidateEmail.includes('@')
      ? candidateEmail.split('@')[1]?.toLowerCase().trim()
      : undefined

    if (emailDomain) {
      try {
        // 1. Exact match in CollegeEmailDomain
        const collegeEmailDomain = await prisma.collegeEmailDomain.findFirst({
          where: {
            domain: { equals: emailDomain, mode: 'insensitive' },
          },
          include: {
            college: {
              select: {
                id: true,
                name: true,
                isActive: true,
              },
            },
          },
        })

        if (collegeEmailDomain?.college?.isActive) {
          collegeId = collegeEmailDomain.college.id
        }

        // 2. Subdomain fallback in CollegeEmailDomain (e.g. cse.psgtech.ac.in -> psgtech.ac.in)
        if (!collegeId) {
          const domainParts = emailDomain.split('.')
          for (let i = 1; i < domainParts.length - 1; i++) {
            const parentDomain = domainParts.slice(i).join('.')
            const parentMatch = await prisma.collegeEmailDomain.findFirst({
              where: { domain: { equals: parentDomain, mode: 'insensitive' } },
              include: { college: { select: { id: true, name: true, isActive: true } } },
            })
            if (parentMatch?.college?.isActive) {
              collegeId = parentMatch.college.id
              break
            }
          }
        }

        // 3. Check College.domain directly if not matched in CollegeEmailDomain
        if (!collegeId) {
          const directCollege = await prisma.college.findFirst({
            where: {
              domain: { equals: emailDomain, mode: 'insensitive' },
            },
            select: {
              id: true,
              name: true,
              isActive: true,
            },
          })
          if (directCollege?.isActive) {
            collegeId = directCollege.id
          }
        }

        // 4. Subdomain fallback in College.domain
        if (!collegeId) {
          const domainParts = emailDomain.split('.')
          for (let i = 1; i < domainParts.length - 1; i++) {
            const parentDomain = domainParts.slice(i).join('.')
            const parentDirect = await prisma.college.findFirst({
              where: { domain: { equals: parentDomain, mode: 'insensitive' } },
              select: { id: true, name: true, isActive: true },
            })
            if (parentDirect?.isActive) {
              collegeId = parentDirect.id
              break
            }
          }
        }

        // 5. Auto-provision college for institutional / college domains (e.g. psgtech.ac.in, .edu, .ac.in, etc.)
        const genericWebmail = new Set([
          'gmail.com',
          'googlemail.com',
          'yahoo.com',
          'ymail.com',
          'hotmail.com',
          'outlook.com',
          'live.com',
          'icloud.com',
          'proton.me',
          'protonmail.com',
          'aol.com',
          'zoho.com',
        ])

        if (!collegeId && !genericWebmail.has(emailDomain)) {
          let collegeName = 'Campus'
          if (emailDomain.includes('psgtech')) {
            collegeName = 'PSG College of Technology'
          } else if (emailDomain.includes('stanford')) {
            collegeName = 'Stanford University'
          } else if (emailDomain.includes('mit.edu')) {
            collegeName = 'Massachusetts Institute of Technology'
          } else if (emailDomain.includes('harvard')) {
            collegeName = 'Harvard University'
          } else if (emailDomain.includes('berkeley')) {
            collegeName = 'UC Berkeley'
          } else {
            const rawPart = emailDomain.split('.')[0] || 'Campus'
            collegeName =
              rawPart.length <= 4
                ? rawPart.toUpperCase()
                : rawPart.charAt(0).toUpperCase() + rawPart.slice(1)
          }

          const slug = emailDomain
            .toLowerCase()
            .replace(/[^a-z0-9]/g, '-')
            .slice(0, 30)

          const newCollege = await prisma.college.upsert({
            where: { domain: emailDomain },
            update: {
              name: collegeName,
              isActive: true,
            },
            create: {
              name: collegeName,
              domain: emailDomain,
              slug: `${slug}-${Math.random().toString(36).slice(2, 6)}`,
              isActive: true,
              isVerified: true,
              emailDomains: {
                create: {
                  domain: emailDomain,
                },
              },
            },
          })

          collegeId = newCollege.id
        }
      } catch (err) {
        console.warn('Could not auto-resolve college from domain:', err)
      }
    }

    if (!collegeId && typeof body.collegeId === 'string' && body.collegeId.trim()) {
      try {
        const direct = await prisma.college.findUnique({
          where: { id: body.collegeId.trim() },
          select: { id: true, isActive: true },
        })
        if (direct?.isActive) {
          collegeId = direct.id
        }
      } catch (err) {
        console.warn('Could not resolve college from body.collegeId:', err)
      }
    }

    if (!collegeId && body.college && typeof body.college === 'string' && body.college.trim()) {
      try {
        const collegeName = body.college.trim()
        let college = await prisma.college.findFirst({
          where: { name: { equals: collegeName, mode: 'insensitive' } },
        })

        if (!college) {
          const slug = collegeName.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').slice(0, 30)
          const domain = `${slug || 'campus'}-${Math.random().toString(36).slice(2, 7)}.lumina.edu`
          college = await prisma.college.create({
            data: {
              name: collegeName,
              domain,
              slug,
            },
          })
        }
        collegeId = college.id
      } catch (err) {
        console.warn('Could not resolve college from body.college:', err)
      }
    }

    if (!collegeId && user.collegeId) {
      collegeId = user.collegeId
    }

    let departmentId: string | undefined = undefined
    if (
      collegeId &&
      body.department &&
      typeof body.department === 'string' &&
      body.department.trim()
    ) {
      const deptName = body.department.trim()
      let dept = await prisma.department.findFirst({
        where: {
          collegeId,
          name: { equals: deptName, mode: 'insensitive' },
        },
      })

      if (!dept) {
        dept = await prisma.department.create({
          data: {
            collegeId,
            name: deptName,
          },
        })
      }
      departmentId = dept.id
    }

    // 4. Update User record (username, image, name, college, department, status)
    const userUpdate: Prisma.UserUpdateInput = {
      status: 'ACTIVE',
    }

   const firstName = typeof body.firstName === 'string' ? body.firstName.trim() : ''
   const lastName = typeof body.lastName === 'string' ? body.lastName.trim() : ''
   const fullName = `${firstName} ${lastName}`.trim()

   if (fullName) {
     userUpdate.name = fullName
   }

   if (body.username && typeof body.username === 'string') {
     const cleanUsername = body.username.trim().replace(/^@+/, '')
     if (cleanUsername) {
       const existingUsername = await prisma.user.findFirst({
         where: {
           username: { equals: cleanUsername, mode: 'insensitive' },
           id: { not: user.id },
         },
       })
       if (!existingUsername) {
         userUpdate.username = cleanUsername
       }
     }
   } else if (!user.username) {
     const usernameBase = (fullName || user.email.split('@')[0] || 'user')
       .toLowerCase()
       .replace(/[^a-z0-9]+/g, '')
       .slice(0, 20)

     const usernameSuffix = user.id
       .replace(/[^a-zA-Z0-9]/g, '')
       .slice(-8)
       .toLowerCase()

     userUpdate.username = `${usernameBase || 'user'}_${usernameSuffix}`
   }

    if (body.profilePicture && typeof body.profilePicture === 'string') {
      userUpdate.image = body.profilePicture
    }

    if (collegeId) {
      userUpdate.college = { connect: { id: collegeId } }
    }
    if (departmentId) {
      userUpdate.department = { connect: { id: departmentId } }
    }

    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: userUpdate,
    })

    // 5. Parse Year
    let parsedYear: number | null = null
    if (typeof body.year === 'number') {
      parsedYear = body.year
    } else if (typeof body.year === 'string') {
      const match = body.year.match(/\d+/)
      if (match) parsedYear = parseInt(match[0], 10)
    }

    // Helper for URLs
    const formatUrl = (urlVal: unknown): string | null => {
      if (!urlVal || typeof urlVal !== 'string') return null
      const trimmed = urlVal.trim()
      if (!trimmed) return null
      if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) return trimmed
      return `https://${trimmed}`
    }

    const formatLeetcodeUrl = (urlVal: unknown): string | null => {
      if (!urlVal || typeof urlVal !== 'string') return null
      const trimmed = urlVal.trim().replace(/^@+/, '')
      if (!trimmed) return null
      if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) return trimmed
      if (trimmed.includes('leetcode.com')) return `https://${trimmed}`
      return `https://leetcode.com/u/${trimmed}`
    }

    const leetcodeUrl = formatLeetcodeUrl(body.leetcodeUrl || body.leetcode)
    const leetcodeUsername = extractLeetcodeUsername(leetcodeUrl)

    // 6. Upsert Profile
    const profileData = {
      firstName: firstName || updatedUser.name.split(' ')[0] || 'Student',
      lastName: lastName || updatedUser.name.split(' ').slice(1).join(' ') || '',
      email: updatedUser.email,
      bio: typeof body.bio === 'string' ? body.bio.trim() || null : null,
      about: typeof body.about === 'string' ? body.about.trim() || null : null,
      profilePicture: typeof body.profilePicture === 'string' ? body.profilePicture : updatedUser.image,
      year: parsedYear,
      interests: Array.isArray(body.interests) ? body.interests.map(String) : [],
      skills: Array.isArray(body.skills) ? body.skills.map(String) : [],
      github: formatUrl(body.github),
      linkedin: formatUrl(body.linkedin),
      portfolio: formatUrl(body.portfolio),
      leetcodeUrl: leetcodeUrl,
      leetcodeUsername: leetcodeUsername,
      location: typeof body.location === 'string' ? body.location.trim() || null : null,
    }

    const profile = await prisma.profile.upsert({
      where: { userId: user.id },
      update: profileData,
      create: {
        ...profileData,
        userId: user.id,
      },
    })

    return {
      success: true,
      user: {
        id: updatedUser.id,
        email: updatedUser.email,
        username: updatedUser.username,
        name: updatedUser.name,
        image: updatedUser.image,
        collegeId: updatedUser.collegeId,
        departmentId: updatedUser.departmentId,
        status: updatedUser.status,
      },
      profile,
    }
  }

  export async function updateMyProfile(userId: string, body: unknown) {
    if (!body || typeof body !== 'object' || Object.keys(body).length === 0) {
      throw badRequest('INVALID_PROFILE_PAYLOAD', 'At least one field must be provided to update profile')
    }

    if (
      'college' in body ||
      'collegeId' in body ||
      'collegeEmail' in body ||
      'college_email' in body ||
      'department' in body ||
      'username' in body ||
      'profilePicture' in body
    ) {
      const res = await saveOnboardingProfile(userId, body)
      return res.profile
    }

    const parsed = profileUpdateSchema.safeParse(body)
    if (!parsed.success)
      throw badRequest('INVALID_PROFILE_PAYLOAD', parsed.error.issues[0]?.message)
    for (const field of protectedProfileFields) {
      if (field in (body as object)) throw badRequest('PROTECTED_FIELD', `Cannot update ${field}`)
    }
    const data: Prisma.ProfileUncheckedUpdateInput = { ...parsed.data }
    if (parsed.data.dob) data.dob = new Date(parsed.data.dob)
    if (parsed.data.leetcodeUrl !== undefined) {
      data.leetcodeUsername = extractLeetcodeUsername(parsed.data.leetcodeUrl)
    }
    return UsersRepo.updateProfile(userId, data)
  }

  export async function getProfileByUsername(
    username: string,
    viewer?: AuthenticatedRequest['user']
  ) {
    const profile = await UsersRepo.findProfileByUsername(username)
    if (!profile) throw notFound('PROFILE_NOT_FOUND', MSG_PROFILE_NOT_FOUND)
    const isOwner = viewer?.id === profile.userId
    const isFriend = viewer
      ? Boolean(await UsersRepo.findAcceptedFriendship(viewer.id, profile.userId))
      : false
    const viewerRecord = viewer ? await UsersRepo.findUserCollegeId(viewer.id) : null
    if (
      !UsersDto.canViewProfile({
        visibility: profile.profileVisibility,
        ownerUserId: profile.userId,
        ownerCollegeId: profile.user.collegeId,
        viewerId: viewer?.id,
        viewerCollegeId: viewerRecord?.collegeId,
        isFriend,
      })
    )
      throw notFound('PROFILE_NOT_FOUND', MSG_PROFILE_NOT_FOUND)
    return UsersDto.toPublicProfileDto(profile, isOwner)
  }

  async function replaceImage(args: {
    userId: string
    file: Express.Multer.File
    folder: string
    currentKey: string | null | undefined
    persist: (url: string, key: string) => Promise<unknown>
  }) {
    if (!args.file?.buffer) throw badRequest('FILE_REQUIRED', 'Image file is required.')
    try {
      assertDeclaredMimeMatchesContent(args.file.mimetype, args.file.buffer)
    } catch {
      throw badRequest('INVALID_FILE', 'File content does not match the declared type.')
    }
    const uploaded = await uploadFile({
      buffer: args.file.buffer,
      mimeType: args.file.mimetype,
      folder: args.folder,
    })
    if (!uploaded?.url || !uploaded?.key) throw new Error('Failed to upload file to S3.')
    const saved = await args.persist(uploaded.url, uploaded.key)
    if (args.currentKey && args.currentKey !== uploaded.key) {
      try {
        await deleteFile(args.currentKey)
      } catch {
        /* best effort */
      }
    }
    return saved
  }

  export async function uploadProfilePicture(userId: string, file: Express.Multer.File) {
    const profile = await UsersRepo.findProfileByUserId(userId)
    if (!profile) throw notFound('PROFILE_NOT_FOUND')
    return replaceImage({
      userId,
      file,
      folder: `users/${userId}/profile`,
      currentKey: profile?.profile?.profilePictureKey,
      persist: (url, key) => UsersRepo.updateProfilePicture(userId, url, key),
    })
  }

  export async function deleteProfilePicture(userId: string) {
    const profile = await UsersRepo.findProfileByUserId(userId)
    if (!profile) throw notFound('PROFILE_NOT_FOUND')
    const removed = await UsersRepo.removeProfilePicture(userId)
    if (profile.profile?.profilePictureKey) {
      try {
        await deleteFile(profile?.profile?.profilePictureKey)
      } catch {
        /* best effort */
      }
    }
    return removed
  }

  export async function uploadCoverImage(userId: string, file: Express.Multer.File) {
    const profile = await UsersRepo.findProfileByUserId(userId)
    if (!profile) throw notFound('PROFILE_NOT_FOUND')
    return replaceImage({
      userId,
      file,
      folder: `users/${userId}/cover`,
      currentKey: profile?.profile?.coverImageKey,
      persist: (url, key) => UsersRepo.updateCoverImage(userId, url, key),
    })
  }

  export async function deleteCoverImage(userId: string) {
    const profile = await UsersRepo.findProfileByUserId(userId)
    if (!profile) throw notFound('PROFILE_NOT_FOUND')
    const removed = await UsersRepo.removeCoverImage(userId)
    if (profile.profile?.coverImageKey) {
      try {
        await deleteFile(profile.profile?.coverImageKey)
      } catch {
        /* best effort */
      }
    }
    return removed
  }
}