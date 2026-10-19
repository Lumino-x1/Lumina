import { handleAuthResponseError } from './authApi'

export interface ProfileData {
  id?: string
  userId?: string
  firstName?: string
  lastName?: string
  username?: string | null
  email?: string
  bio?: string | null
  about?: string | null
  profilePicture?: string | null
  profilePictureKey?: string | null
  coverImage?: string | null
  coverImageKey?: string | null
  gender?: 'MALE' | 'FEMALE' | 'OTHER' | null
  dob?: string | null
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
  leetcodeUrl?: string | null
  leetcodeUsername?: string | null
  leetcodeRating?: number | null
  leetcodeSolved?: number | null
  leetcodeEasy?: number | null
  leetcodeMedium?: number | null
  leetcodeHard?: number | null
  leetcodeGlobalRank?: number | null
  leetcodeUpdatedAt?: string | null
  leetcodeSyncStatus?: 'PENDING' | 'SUCCESS' | 'FAILED' | null
  leetcodeSyncError?: string | null
  codeforces?: string | null
  hackerrank?: string | null
  profileVisibility?: 'PUBLIC' | 'COLLEGE' | 'FRIENDS' | 'PRIVATE'
  hideEmail?: boolean
  hidePhone?: boolean
  hideCgpa?: boolean
  createdAt?: string
  updatedAt?: string
  user?: {
    id: string
    email: string
    username?: string | null
    name?: string
    image?: string | null
    role?: string
    status?: string
    collegeId?: string | null
    departmentId?: string | null
  }
  college?: { id?: string; name: string; shortName?: string | null } | null
  department?: { id?: string; name: string; code?: string | null } | null
}

export interface MergedUser {
  id?: string
  userId?: string
  name?: string
  firstName?: string
  lastName?: string
  email?: string
  emailVerified?: boolean
  username?: string
  role?: string
  image?: string
  profilePicture?: string | null
  coverImage?: string | null
  bio?: string | null
  about?: string | null
  college?: string | null
  collegeShort?: string | null
  collegeId?: string | null
  department?: string | null
  departmentCode?: string | null
  location?: string | null
  hometown?: string | null
  batch?: string | null
  semester?: number | null
  year?: number | null
  cgpa?: number | null
  skills?: string[]
  interests?: string[]
  languages?: string[]
  github?: string | null
  linkedin?: string | null
  portfolio?: string | null
  leetcode?: {
    username?: string | null
    rating?: number | null
    solved?: number | null
    easy?: number | null
    medium?: number | null
    hard?: number | null
    globalRank?: number | null
    url?: string | null
  }
}

export function getBaseApiUrl(): string {
  if (typeof window !== 'undefined' && (import.meta as any).env?.VITE_API_URL) {
    return (import.meta as any).env.VITE_API_URL.replace(/\/$/, '')
  }
  return ''
}

/**
 * Fetch profile data for the current authenticated user from GET /api/profile/me
 */
export async function fetchMyProfile(): Promise<ProfileData | null> {
  const baseUrl = getBaseApiUrl()
  const endpoint = `${baseUrl}/api/profile/me`

  const origin =
    typeof window !== 'undefined' ? window.location.origin : 'http://localhost:5173'
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'ngrok-skip-browser-warning': 'true',
    Origin: origin,
  }

  try {
    const token =
      localStorage.getItem('lumina_session_token') ||
      localStorage.getItem('better-auth.session_token')
    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }
  } catch {
    // ignore
  }

  try {
    const res = await fetch(endpoint, {
      method: 'GET',
      headers,
      credentials: 'include',
    })

    if (res.ok) {
      const data = await res.json()
      return data as ProfileData
    } else {
      handleAuthResponseError(res)
    }
  } catch (err) {
    console.error('Failed to fetch profile from /api/profile/me:', err)
  }

  return null
}

/**
 * Merge raw Auth user and backend Profile into a unified user model for the dashboard
 */
export function buildMergedUser(
  authUser?: Record<string, any> | null,
  profile?: ProfileData | null
): MergedUser {
  const p = profile as any
  const firstName =
    profile?.firstName ||
    p?.profile?.firstName ||
    authUser?.firstName ||
    (authUser?.name ? authUser.name.split(' ')[0] : '') ||
    ''

  const lastName =
    profile?.lastName ||
    p?.profile?.lastName ||
    authUser?.lastName ||
    (authUser?.name ? authUser.name.split(' ').slice(1).join(' ') : '') ||
    ''

  const fullName =
    firstName || lastName
      ? `${firstName} ${lastName}`.trim()
      : authUser?.name || 'Student User'

  const userAvatar =
    profile?.profilePicture ||
    p?.profile?.profilePicture ||
    authUser?.image ||
    authUser?.profilePicture ||
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80'

  const collegeName =
    (typeof profile?.college === 'object' && profile?.college?.name) ||
    (typeof profile?.college === 'string' ? profile.college : null) ||
    (typeof p?.profile?.college === 'object' && p?.profile?.college?.name) ||
    (typeof p?.profile?.college === 'string' ? p?.profile?.college : null) ||
    (typeof authUser?.college === 'object' && authUser?.college?.name) ||
    (typeof authUser?.college === 'string' ? authUser.college : null) ||
    null

  const departmentName =
    (typeof profile?.department === 'object' && profile?.department?.name) ||
    (typeof profile?.department === 'string' ? profile.department : null) ||
    (typeof p?.profile?.department === 'object' && p?.profile?.department?.name) ||
    (typeof p?.profile?.department === 'string' ? p?.profile?.department : null) ||
    (typeof authUser?.department === 'object' && authUser?.department?.name) ||
    (typeof authUser?.department === 'string' ? authUser.department : null) ||
    null

  const yearVal =
    profile?.year ??
    p?.profile?.year ??
    authUser?.year ??
    null

  const batchVal =
    profile?.batch ||
    p?.profile?.batch ||
    (yearVal ? `Class of ${2022 + yearVal}` : null) ||
    authUser?.batch ||
    null

  const usernameVal =
    profile?.username ||
    p?.username ||
    p?.user?.username ||
    authUser?.username ||
    profile?.leetcodeUsername ||
    undefined

  const emailVal =
    profile?.email ||
    p?.user?.email ||
    authUser?.email ||
    ''

  const interestsVal =
    profile?.interests ||
    p?.profile?.interests ||
    authUser?.interests ||
    []

  const skillsVal =
    profile?.skills ||
    p?.profile?.skills ||
    authUser?.skills ||
    []

  return {
    id: authUser?.id || profile?.userId || profile?.id || p?.user?.id,
    userId: profile?.userId || p?.user?.id || authUser?.id,
    name: fullName,
    firstName,
    lastName,
    email: emailVal,
    emailVerified: (authUser as any)?.emailVerified ?? (p as any)?.user?.emailVerified ?? true,
    username: usernameVal,
    role: p?.user?.role || authUser?.role || 'STUDENT',
    image: userAvatar,
    profilePicture: profile?.profilePicture || p?.profile?.profilePicture || authUser?.image,
    coverImage: profile?.coverImage || p?.profile?.coverImage || null,
    bio: profile?.bio || p?.profile?.bio || null,
    about: profile?.about || p?.profile?.about || null,
    college: collegeName,
    collegeShort:
      (typeof profile?.college === 'object' && profile?.college?.shortName) ||
      (typeof p?.profile?.college === 'object' && p?.profile?.college?.shortName) ||
      null,
    collegeId:
      profile?.user?.collegeId ||
      p?.user?.collegeId ||
      (authUser as any)?.collegeId ||
      profile?.college?.id ||
      p?.college?.id ||
      null,
    department: departmentName,
    departmentCode:
      (typeof profile?.department === 'object' && profile?.department?.code) ||
      (typeof p?.profile?.department === 'object' && p?.profile?.department?.code) ||
      null,
    location: profile?.location || p?.profile?.location || profile?.hometown || null,
    hometown: profile?.hometown || p?.profile?.hometown || null,
    batch: batchVal,
    semester: profile?.semester ?? p?.profile?.semester ?? null,
    year: yearVal,
    cgpa: profile?.cgpa ?? p?.profile?.cgpa ?? null,
    skills: skillsVal,
    interests: interestsVal,
    languages: profile?.languages || p?.profile?.languages || [],
    github: profile?.github || p?.profile?.github || null,
    linkedin: profile?.linkedin || p?.profile?.linkedin || null,
    portfolio: profile?.portfolio || p?.profile?.portfolio || null,
    leetcode: {
      username: profile?.leetcodeUsername || p?.profile?.leetcodeUsername || null,
      rating: profile?.leetcodeRating ?? p?.profile?.leetcodeRating ?? null,
      solved: profile?.leetcodeSolved ?? p?.profile?.leetcodeSolved ?? null,
      easy: profile?.leetcodeEasy ?? p?.profile?.leetcodeEasy ?? null,
      medium: profile?.leetcodeMedium ?? p?.profile?.leetcodeMedium ?? null,
      hard: profile?.leetcodeHard ?? p?.profile?.leetcodeHard ?? null,
      globalRank: profile?.leetcodeGlobalRank ?? p?.profile?.leetcodeGlobalRank ?? null,
      url: profile?.leetcodeUrl || p?.profile?.leetcodeUrl || null,
    },
  }
}
