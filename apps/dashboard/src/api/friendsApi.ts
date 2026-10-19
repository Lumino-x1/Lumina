import { getBaseApiUrl } from './profileApi'

export interface FriendRequestResult {
  id: string
  senderId: string
  receiverId: string
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'CANCELLED'
  createdAt: string
  updatedAt: string
}

export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
}

function getAuthHeaders(): Record<string, string> {
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

  return headers
}

/**
 * Send a friend request to a user by their userId
 * Calls POST /api/friends/request/:userId
 */
export async function sendFriendRequestApi(
  userId: string
): Promise<ApiResponse<FriendRequestResult>> {
  try {
    const baseUrl = getBaseApiUrl()
    const endpoint = `${baseUrl}/api/friends/request/${encodeURIComponent(userId)}`
    const headers = getAuthHeaders()

    const res = await fetch(endpoint, {
      method: 'POST',
      headers,
      credentials: 'include',
    })

    if (res.ok) {
      const data = await res.json()
      return { success: true, data }
    }

    // Try fallback without /api prefix if 404
    if (res.status === 404) {
      const fallbackEndpoint = `${baseUrl}/friends/request/${encodeURIComponent(userId)}`
      const fallbackRes = await fetch(fallbackEndpoint, {
        method: 'POST',
        headers,
        credentials: 'include',
      })
      if (fallbackRes.ok) {
        const data = await fallbackRes.json()
        return { success: true, data }
      }
    }

    const errorJson = await res.json().catch(() => ({}))
    return {
      success: false,
      error:
        errorJson.message ||
        errorJson.error ||
        `Request failed with status ${res.status}`,
    }
  } catch (err: any) {
    console.error('sendFriendRequestApi error:', err)
    return {
      success: false,
      error: err?.message || 'Network error while sending friend request',
    }
  }
}

/**
 * Cancel an outgoing friend request
 * Calls DELETE /api/friends/request/:requestId
 */
export async function cancelFriendRequestApi(
  requestId: string
): Promise<ApiResponse> {
  try {
    const baseUrl = getBaseApiUrl()
    const endpoint = `${baseUrl}/api/friends/request/${encodeURIComponent(requestId)}`
    const headers = getAuthHeaders()

    const res = await fetch(endpoint, {
      method: 'DELETE',
      headers,
      credentials: 'include',
    })

    if (res.ok) {
      const data = await res.json().catch(() => ({}))
      return { success: true, data }
    }

    const errorJson = await res.json().catch(() => ({}))
    return {
      success: false,
      error: errorJson.message || `Cancel failed with status ${res.status}`,
    }
  } catch (err: any) {
    console.error('cancelFriendRequestApi error:', err)
    return {
      success: false,
      error: err?.message || 'Network error while canceling friend request',
    }
  }
}

/**
 * Unfriend an existing friend
 * Calls DELETE /api/friends/:friendId
 */
export async function unfriendApi(
  friendId: string
): Promise<ApiResponse> {
  try {
    const baseUrl = getBaseApiUrl()
    const endpoint = `${baseUrl}/api/friends/${encodeURIComponent(friendId)}`
    const headers = getAuthHeaders()

    const res = await fetch(endpoint, {
      method: 'DELETE',
      headers,
      credentials: 'include',
    })

    if (res.ok) {
      const data = await res.json().catch(() => ({}))
      return { success: true, data }
    }

    const errorJson = await res.json().catch(() => ({}))
    return {
      success: false,
      error: errorJson.message || `Unfriend failed with status ${res.status}`,
    }
  } catch (err: any) {
    console.error('unfriendApi error:', err)
    return {
      success: false,
      error: err?.message || 'Network error while unfriending',
    }
  }
}
