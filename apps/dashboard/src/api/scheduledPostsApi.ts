import { getBaseApiUrl } from './profileApi'

export interface ScheduledPostItem {
  id: string
  title: string
  subtitle?: string | null
  coverImage?: string | null
  content?: string | null
  status: 'DRAFT' | 'SCHEDULED' | 'PUBLISHED' | 'ARCHIVED'
  scheduledAt: string
  scheduleVersion: number
  createdAt?: string
  updatedAt?: string
  author?: {
    id: string
    name?: string | null
    username?: string | null
    image?: string | null
  }
}

function getAuthHeaders(): Record<string, string> {
  const origin = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:5173'
  let sessionToken = ''
  try {
    sessionToken =
      localStorage.getItem('better-auth.session_token') ||
      localStorage.getItem('lumina_session_token') ||
      ''
    if (!sessionToken && typeof document !== 'undefined') {
      const match = document.cookie.match(/(?:^|;\s*)better-auth\.session_token=([^;]+)/)
      if (match && match[1]) sessionToken = decodeURIComponent(match[1])
    }
  } catch {
    // Ignore storage errors
  }

  const headers: Record<string, string> = {
    Accept: 'application/json',
    'ngrok-skip-browser-warning': 'true',
    Origin: origin,
  }

  if (sessionToken) {
    headers['Authorization'] = `Bearer ${sessionToken}`
  }

  return headers
}

/**
 * Fetches the authenticated author's scheduled posts from GET /api/posts/scheduled
 */
export async function fetchScheduledPostsApi(): Promise<ScheduledPostItem[]> {
  const baseUrl = getBaseApiUrl()
  const endpoint = `${baseUrl}/api/posts/scheduled`
  const headers = getAuthHeaders()

  const response = await fetch(endpoint, {
    method: 'GET',
    headers,
    credentials: 'include',
  })

  if (!response.ok) {
    throw new Error(`Failed to fetch scheduled posts: ${response.status}`)
  }

  const json = await response.json()
  return json.data || []
}

/**
 * Reschedules an existing scheduled post to a new timestamp via PATCH /api/posts/:id/schedule
 */
export async function reschedulePostApi(postId: string, scheduleTime: string): Promise<ScheduledPostItem> {
  const baseUrl = getBaseApiUrl()
  const endpoint = `${baseUrl}/api/posts/${encodeURIComponent(postId)}/schedule`
  const headers = {
    ...getAuthHeaders(),
    'Content-Type': 'application/json',
  }

  const response = await fetch(endpoint, {
    method: 'PATCH',
    headers,
    credentials: 'include',
    body: JSON.stringify({ scheduleTime }),
  })

  if (!response.ok) {
    const errData = await response.json().catch(() => ({}))
    throw new Error(errData.message || `Failed to reschedule post: ${response.status}`)
  }

  const json = await response.json()
  return json.data
}

/**
 * Cancels a scheduled post and reverts it to DRAFT via DELETE /api/posts/:id/schedule
 */
export async function cancelScheduledPostApi(postId: string): Promise<ScheduledPostItem> {
  const baseUrl = getBaseApiUrl()
  const endpoint = `${baseUrl}/api/posts/${encodeURIComponent(postId)}/schedule`
  const headers = getAuthHeaders()

  const response = await fetch(endpoint, {
    method: 'DELETE',
    headers,
    credentials: 'include',
  })

  if (!response.ok) {
    const errData = await response.json().catch(() => ({}))
    throw new Error(errData.message || `Failed to cancel scheduled post: ${response.status}`)
  }

  const json = await response.json()
  return json.data
}

/**
 * Publishes an eligible draft or scheduled post immediately via POST /api/posts/:id/publish
 */
export async function publishPostImmediatelyApi(postId: string): Promise<ScheduledPostItem> {
  const baseUrl = getBaseApiUrl()
  const endpoint = `${baseUrl}/api/posts/${encodeURIComponent(postId)}/publish`
  const headers = getAuthHeaders()

  const response = await fetch(endpoint, {
    method: 'POST',
    headers,
    credentials: 'include',
  })

  if (!response.ok) {
    const errData = await response.json().catch(() => ({}))
    throw new Error(errData.message || `Failed to publish post: ${response.status}`)
  }

  const json = await response.json()
  return json.data
}
