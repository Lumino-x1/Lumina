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
 * Calls DELETE /api/friends/request/:requestId (also supports target userId)
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

    if (res.status === 404) {
      const fallbackEndpoint = `${baseUrl}/friends/request/${encodeURIComponent(requestId)}`
      const fallbackRes = await fetch(fallbackEndpoint, {
        method: 'DELETE',
        headers,
        credentials: 'include',
      })
      if (fallbackRes.ok) {
        const data = await fallbackRes.json().catch(() => ({}))
        return { success: true, data }
      }
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
 * Fetch outgoing pending friend requests
 * Calls GET /api/friends/requests/outgoing
 */
export async function fetchOutgoingRequestsApi(): Promise<ApiResponse<FriendRequestResult[]>> {
  try {
    const baseUrl = getBaseApiUrl()
    const endpoint = `${baseUrl}/api/friends/requests/outgoing`
    const headers = getAuthHeaders()

    const res = await fetch(endpoint, {
      method: 'GET',
      headers,
      credentials: 'include',
    })

    if (res.ok) {
      const data = await res.json()
      return { success: true, data }
    }

    if (res.status === 404) {
      const fallbackEndpoint = `${baseUrl}/friends/requests/outgoing`
      const fallbackRes = await fetch(fallbackEndpoint, {
        method: 'GET',
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
      error: errorJson.message || `Failed to fetch outgoing requests: ${res.status}`,
    }
  } catch (err: any) {
    console.error('fetchOutgoingRequestsApi error:', err)
    return {
      success: false,
      error: err?.message || 'Network error while fetching outgoing requests',
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
      invalidateFriendsCache()
      const data = await res.json().catch(() => ({}))
      return { success: true, data }
    }

    if (res.status === 404) {
      const fallbackEndpoint = `${baseUrl}/friends/${encodeURIComponent(friendId)}`
      const fallbackRes = await fetch(fallbackEndpoint, {
        method: 'DELETE',
        headers,
        credentials: 'include',
      })
      if (fallbackRes.ok) {
        invalidateFriendsCache()
        const data = await fallbackRes.json().catch(() => ({}))
        return { success: true, data }
      }
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

/**
 * Fetch incoming pending friend requests
 * Calls GET /api/friends/requests/incoming
 */
export async function fetchIncomingRequestsApi(): Promise<ApiResponse<any[]>> {
  try {
    const baseUrl = getBaseApiUrl()
    const endpoint = `${baseUrl}/api/friends/requests/incoming`
    const headers = getAuthHeaders()

    const res = await fetch(endpoint, {
      method: 'GET',
      headers,
      credentials: 'include',
    })

    if (res.ok) {
      const data = await res.json()
      return { success: true, data }
    }

    if (res.status === 404) {
      const fallbackEndpoint = `${baseUrl}/friends/requests/incoming`
      const fallbackRes = await fetch(fallbackEndpoint, {
        method: 'GET',
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
      error: errorJson.message || `Failed to fetch incoming requests: ${res.status}`,
    }
  } catch (err: any) {
    console.error('fetchIncomingRequestsApi error:', err)
    return {
      success: false,
      error: err?.message || 'Network error while fetching incoming requests',
    }
  }
}

/**
 * Accept a friend request
 * Calls PATCH /api/friends/request/:requestId/accept
 */
export async function acceptFriendRequestApi(requestId: string): Promise<ApiResponse> {
  try {
    const baseUrl = getBaseApiUrl()
    const endpoint = `${baseUrl}/api/friends/request/${encodeURIComponent(requestId)}/accept`
    const headers = getAuthHeaders()

    const res = await fetch(endpoint, {
      method: 'PATCH',
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
      error: errorJson.message || `Failed to accept friend request: ${res.status}`,
    }
  } catch (err: any) {
    console.error('acceptFriendRequestApi error:', err)
    return {
      success: false,
      error: err?.message || 'Network error while accepting friend request',
    }
  }
}

/**
 * Reject a friend request
 * Calls PATCH /api/friends/request/:requestId/reject
 */
export async function rejectFriendRequestApi(requestId: string): Promise<ApiResponse> {
  try {
    const baseUrl = getBaseApiUrl()
    const endpoint = `${baseUrl}/api/friends/request/${encodeURIComponent(requestId)}/reject`
    const headers = getAuthHeaders()

    const res = await fetch(endpoint, {
      method: 'PATCH',
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
      error: errorJson.message || `Failed to reject friend request: ${res.status}`,
    }
  } catch (err: any) {
    console.error('rejectFriendRequestApi error:', err)
    return {
      success: false,
      error: err?.message || 'Network error while rejecting friend request',
    }
  }
}

/**
 * Fetch user activity notifications
 * Calls GET /api/notifications
 */
export async function fetchNotificationsApi(): Promise<ApiResponse<any[]>> {
  try {
    const baseUrl = getBaseApiUrl()
    const endpoint = `${baseUrl}/api/notifications?limit=100`
    const headers = getAuthHeaders()

    const res = await fetch(endpoint, {
      method: 'GET',
      headers,
      credentials: 'include',
    })

    if (res.ok) {
      const data = await res.json()
      return { success: true, data: Array.isArray(data) ? data : [] }
    }

    return { success: false, data: [] }
  } catch (err: any) {
    return {
      success: false,
      error: err?.message || 'Network error while fetching notifications',
      data: [],
    }
  }
}

let friendsCache: { timestamp: number; data: ApiResponse<any[]> } | null = null
let inFlightFriendsRequest: Promise<ApiResponse<any[]>> | null = null

export function invalidateFriendsCache(): void {
  friendsCache = null
  inFlightFriendsRequest = null
}

/**
 * Fetch accepted friends for the current user
 * Calls GET /api/friends
 * Automatically deduplicates in-flight calls and caches responses to avoid excessive backend requests
 */
export async function fetchMyFriendsApi(force = false): Promise<ApiResponse<any[]>> {
  const now = Date.now()
  if (!force && friendsCache && now - friendsCache.timestamp < 30000) {
    return friendsCache.data
  }

  if (inFlightFriendsRequest) {
    return inFlightFriendsRequest
  }

  inFlightFriendsRequest = (async () => {
    try {
      const baseUrl = getBaseApiUrl()
      const endpoint = `${baseUrl}/api/friends`
      const headers = getAuthHeaders()

      const res = await fetch(endpoint, {
        method: 'GET',
        headers,
        credentials: 'include',
      })

      if (res.ok) {
        const data = await res.json()
        const result: ApiResponse<any[]> = { success: true, data: Array.isArray(data) ? data : [] }
        friendsCache = { timestamp: Date.now(), data: result }
        return result
      }

      if (res.status === 404) {
        const fallbackEndpoint = `${baseUrl}/friends`
        const fallbackRes = await fetch(fallbackEndpoint, {
          method: 'GET',
          headers,
          credentials: 'include',
        })
        if (fallbackRes.ok) {
          const data = await fallbackRes.json()
          const result: ApiResponse<any[]> = { success: true, data: Array.isArray(data) ? data : [] }
          friendsCache = { timestamp: Date.now(), data: result }
          return result
        }
      }

      return { success: false, data: [] }
    } catch (err: any) {
      return {
        success: false,
        error: err?.message || 'Network error while fetching friends',
        data: [],
      }
    } finally {
      inFlightFriendsRequest = null
    }
  })()

  return inFlightFriendsRequest
}
