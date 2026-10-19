import { getBaseApiUrl } from './profileApi'

export interface RecommendedStudent {
  id: string
  name: string
  username: string | null
  avatar: string | null
  department: string
  departmentCode?: string | null
  college: string
  year?: string | null
  friendshipStatus?: 'NONE' | 'PENDING' | 'RECEIVED' | 'ACCEPTED' | 'REJECTED' | 'CANCELLED' | 'SELF'
  requestStatus?: 'NONE' | 'PENDING' | 'RECEIVED' | 'ACCEPTED' | 'REJECTED' | 'CANCELLED' | 'SELF'
  requestDirection?: 'OUTGOING' | 'INCOMING' | null
  statusMessage?: string
  isFriend?: boolean
  hasPendingRequest?: boolean
  canSendRequest?: boolean
  canCancelRequest?: boolean
  requestId?: string | null
}

export interface RecommendationResponse {
  success: boolean
  collegeId: string
  college?: {
    id: string
    name: string
    shortName: string | null
  } | null
  students: RecommendedStudent[]
}

export const DEFAULT_FALLBACK_STUDENTS: RecommendedStudent[] = [
  {
    id: 'a6W4aRCM2N9FMnX4EVqwUbLKBnM3lgyp',
    name: 'Jane Doe',
    username: 'jane_doe',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
    department: 'Computer Science & Engineering',
    college: 'PSG Tech',
    year: 'Year 3',
  },
  {
    id: 'Fg7AfX7oXnOrGUHkXQOPvdQB3fQOSfay',
    name: 'John Doe',
    username: 'john_doe',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
    department: 'Computer Science & Engineering',
    college: 'PSG Tech',
    year: 'Year 3',
  },
  {
    id: 'cZM92pL0HMKQBHh5mEuFY6jJwExWX6aR',
    name: 'Kavitha',
    username: 'kavitha',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80',
    department: 'Computer Science & Engineering',
    college: 'PSG Tech',
    year: 'Year 3',
  },
  {
    id: 'dNL1IidK7iyDhuhDQD1EU8HuuJbUXo4L',
    name: 'Pooja Sharma',
    username: 'pooja_s',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80',
    department: 'Computer Science & Engineering',
    college: 'PSG Tech',
    year: 'Year 3',
  },
  {
    id: 'cmv9pbztq0000ts8a2am9f74t',
    name: 'Aarav Patel',
    username: 'aarav_p',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=120&q=80',
    department: 'Computer Science & Engineering',
    college: 'PSG Tech',
    year: 'Year 3',
  },
]

function getAuthHeaders(): Record<string, string> {
  const headers: Record<string, string> = {
    Accept: 'application/json',
    'ngrok-skip-browser-warning': 'true',
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
  return headers
}

export async function fetchRecommendedStudentsApi(
  collegeId: string = 'cmv9h829300024y8akviwpsmm',
  limit: number = 5
): Promise<RecommendedStudent[]> {
  try {
    const baseUrl = getBaseApiUrl()
    const endpoint = `${baseUrl}/api/recommendation/${encodeURIComponent(collegeId)}?limit=${limit}`
    const headers = getAuthHeaders()

    const res = await fetch(endpoint, {
      method: 'GET',
      headers,
      credentials: 'include',
    })

    if (!res.ok) {
      // Fallback try root alias /recommendation/:collegeId
      const fallbackEndpoint = `${baseUrl}/recommendation/${encodeURIComponent(collegeId)}?limit=${limit}`
      const fallbackRes = await fetch(fallbackEndpoint, {
        method: 'GET',
        headers,
        credentials: 'include',
      })
      if (!fallbackRes.ok) {
        throw new Error(`Failed to fetch recommendations: ${res.statusText}`)
      }
      const data: RecommendationResponse = await fallbackRes.json()
      if (Array.isArray(data.students) && data.students.length > 0) {
        return data.students
      }
      return DEFAULT_FALLBACK_STUDENTS.slice(0, limit)
    }

    const data: RecommendationResponse = await res.json()
    if (Array.isArray(data.students) && data.students.length > 0) {
      return data.students
    }
    return DEFAULT_FALLBACK_STUDENTS.slice(0, limit)
  } catch (err) {
    console.warn('[recommendationApi] Error fetching recommendations, using fallback:', err)
    return DEFAULT_FALLBACK_STUDENTS.slice(0, limit)
  }
}

export interface PersonRequestStatusResponse {
  success: boolean
  currentUserId: string | null
  targetUserId: string
  status: string
  requestStatus: string
  direction: 'OUTGOING' | 'INCOMING' | null
  statusMessage: string
  isFriend: boolean
  hasPendingRequest: boolean
  canSendRequest: boolean
  canCancelRequest: boolean
  canAcceptRequest: boolean
  canRejectRequest: boolean
  requestId: string | null
}

export async function fetchPersonRequestStatusApi(
  targetUserId: string
): Promise<PersonRequestStatusResponse | null> {
  try {
    const baseUrl = getBaseApiUrl()
    const endpoint = `${baseUrl}/api/recommendation/status/${encodeURIComponent(targetUserId)}`
    const headers = getAuthHeaders()

    const res = await fetch(endpoint, {
      method: 'GET',
      headers,
      credentials: 'include',
    })

    if (!res.ok) {
      const fallbackEndpoint = `${baseUrl}/recommendation/status/${encodeURIComponent(targetUserId)}`
      const fallbackRes = await fetch(fallbackEndpoint, {
        method: 'GET',
        headers,
        credentials: 'include',
      })
      if (!fallbackRes.ok) {
        return null
      }
      return (await fallbackRes.json()) as PersonRequestStatusResponse
    }

    return (await res.json()) as PersonRequestStatusResponse
  } catch (err) {
    console.warn('[recommendationApi] Error fetching person request status:', err)
    return null
  }
}

