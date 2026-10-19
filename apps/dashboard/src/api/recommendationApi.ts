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

export async function fetchRecommendedStudentsApi(
  collegeId: string = 'cmv9h829300024y8akviwpsmm',
  limit: number = 5
): Promise<RecommendedStudent[]> {
  try {
    const baseUrl = getBaseApiUrl()
    const endpoint = `${baseUrl}/api/recommendation/${encodeURIComponent(collegeId)}?limit=${limit}`

    const res = await fetch(endpoint, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'ngrok-skip-browser-warning': 'true',
      },
      credentials: 'include',
    })

    if (!res.ok) {
      // Fallback try root alias /recommendation/:collegeId
      const fallbackEndpoint = `${baseUrl}/recommendation/${encodeURIComponent(collegeId)}?limit=${limit}`
      const fallbackRes = await fetch(fallbackEndpoint, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'ngrok-skip-browser-warning': 'true',
        },
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
