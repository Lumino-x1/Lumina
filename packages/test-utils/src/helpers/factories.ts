import { randomUUID } from 'node:crypto'
import { prisma } from '@lumina/db'

type SignUpOverrides = {
  name?: string
  email?: string
  password?: string
  image?: string
}

type UserOverrides = {
  id?: string
  email?: string
  name?: string
  username?: string | null
  role?:
    | 'STUDENT'
    | 'FACULTY'
    | 'ALUMNI'
    | 'CLUB_ADMIN'
    | 'COMMUNITY_MODERATOR'
    | 'COLLEGE_ADMIN'
    | 'SUPER_ADMIN'
  status?: 'PENDING' | 'ACTIVE' | 'SUSPENDED' | 'BANNED' | 'DELETED'
  collegeId?: string | null
}

type CollegeOverrides = {
  id?: string
  name?: string
  shortName?: string | null
  domain?: string
  logo?: string | null
  website?: string | null
  city?: string | null
  state?: string | null
  country?: string | null
}

type ProfileOverrides = {
  firstName?: string
  lastName?: string
  bio?: string | null
  about?: string | null
  profilePicture?: string | null
  coverImage?: string | null
  hometown?: string | null
  location?: string | null
  cgpa?: number | null
  semester?: number | null
  year?: number | null
  batch?: string | null
  rollNumber?: string | null
  skills?: string[]
  interests?: string[]
  languages?: string[]
  github?: string | null
  linkedin?: string | null
  portfolio?: string | null
  leetcode?: string | null
  codeforces?: string | null
  hackerrank?: string | null
  profileVisibility?: 'PUBLIC' | 'COLLEGE' | 'FRIENDS' | 'PRIVATE'
  hideEmail?: boolean
  hidePhone?: boolean
  hideCgpa?: boolean
}

export function generateRandomUser(overrides: SignUpOverrides = {}) {
  const token = randomUUID().slice(0, 8)

  return {
    name: overrides.name ?? `Aarav Kumar ${token}`,
    email: overrides.email ?? `aarav.${token}@lumina.test`,
    password: overrides.password ?? `StrongPass!${token}9`,
    image: overrides.image ?? `https://images.example.com/profiles/${token}.png`,
  }
}

export async function createCollege(overrides: CollegeOverrides = {}) {
  const token = randomUUID().slice(0, 8)

  return prisma.college.create({
    data: {
      id: overrides.id,
      name: overrides.name ?? `Lumina Institute ${token}`,
      shortName: overrides.shortName ?? `LI${token.slice(0, 4).toUpperCase()}`,
      domain: overrides.domain ?? `college-${token}.lumina.test`,
      logo: overrides.logo ?? `https://images.example.com/colleges/${token}.png`,
      website: overrides.website ?? `https://college-${token}.lumina.test`,
      city: overrides.city ?? 'Bengaluru',
      state: overrides.state ?? 'Karnataka',
      country: overrides.country ?? 'India',
    },
  })
}

export async function createTestUser(overrides: UserOverrides = {}) {
  const token = randomUUID().slice(0, 8)

  return prisma.user.create({
    data: {
      id: overrides.id,
      email: overrides.email ?? `student.${token}@lumina.test`,
      name: overrides.name ?? `Student ${token}`,
      username: overrides.username ?? `student_${token}`,
      role: overrides.role ?? 'STUDENT',
      status: overrides.status ?? 'ACTIVE',
      collegeId: overrides.collegeId ?? null,
    },
  })
}

export async function createProfile(userId: string, overrides: ProfileOverrides = {}) {
  const token = randomUUID().slice(0, 8)
  const linkedUser = await prisma.user.findUniqueOrThrow({
    where: { id: userId },
    select: { username: true },
  })

  return prisma.profile.create({
    data: {
      userId,
      username: linkedUser.username ?? `profile_${token}`,
      firstName: overrides.firstName ?? 'Aarav',
      lastName: overrides.lastName ?? 'Kumar',
      bio: overrides.bio ?? 'Engineering student building reliable product systems.',
      about:
        overrides.about ?? 'Interested in distributed systems, payments, and developer tooling.',
      profilePicture:
        overrides.profilePicture ?? `https://images.example.com/profiles/${token}.png`,
      coverImage: overrides.coverImage ?? `https://images.example.com/covers/${token}.png`,
      hometown: overrides.hometown ?? 'Mysuru',
      location: overrides.location ?? 'Bengaluru, India',
      cgpa: overrides.cgpa ?? 8.4,
      semester: overrides.semester ?? 6,
      year: overrides.year ?? 3,
      batch: overrides.batch ?? '2024',
      rollNumber: overrides.rollNumber ?? `21CS${token.slice(0, 4).toUpperCase()}`,
      skills: overrides.skills ?? ['TypeScript', 'PostgreSQL', 'Express'],
      interests: overrides.interests ?? ['Backend Engineering', 'Platform Reliability'],
      languages: overrides.languages ?? ['English', 'Hindi', 'Kannada'],
      github: overrides.github ?? `https://github.com/${token}`,
      linkedin: overrides.linkedin ?? `https://linkedin.com/in/${token}`,
      portfolio: overrides.portfolio ?? `https://portfolio-${token}.test`,
      leetcode: overrides.leetcode ?? `https://leetcode.com/${token}`,
      codeforces: overrides.codeforces ?? `https://codeforces.com/profile/${token}`,
      hackerrank: overrides.hackerrank ?? `https://hackerrank.com/${token}`,
      profileVisibility: overrides.profileVisibility ?? 'PUBLIC',
      hideEmail: overrides.hideEmail ?? false,
      hidePhone: overrides.hidePhone ?? false,
      hideCgpa: overrides.hideCgpa ?? false,
    },
  })
}
