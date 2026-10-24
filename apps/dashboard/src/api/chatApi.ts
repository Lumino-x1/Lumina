import { getBaseApiUrl } from './profileApi'

export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
}

export interface ChatParticipant {
  id: string
  name: string
  username: string
  image?: string | null
  online?: boolean
}

export interface ChatConversationItem {
  id: string
  channelId: string
  cid?: string
  type?: string
  name?: string
  image?: string | null
  isGroup?: boolean
  membersCount?: number
  members?: Record<string, any>
  otherUser?: ChatParticipant | null
  lastMessage?: {
    id: string
    text: string
    senderId?: string
    createdAt?: string
  } | null
}

export interface ChatMessageItem {
  id: string
  text: string
  user_id?: string
  user?: {
    id: string
    name?: string
    image?: string
  }
  created_at: string
  parent_id?: string
  reply_count?: number
  pinned?: boolean
  reaction_counts?: Record<string, number>
  own_reactions?: Array<{ type: string }>
  latest_reactions?: Array<{ type: string, user_id?: string, user?: { id: string, name?: string } }>
  attachments?: Array<{
    type?: string
    title?: string
    file_size?: number
    image_url?: string
    asset_url?: string
  }>
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
    let token =
      localStorage.getItem('lumina_session_token') ||
      localStorage.getItem('better-auth.session_token') ||
      ''
    if (!token && typeof document !== 'undefined') {
      const match = document.cookie.match(/(?:^|;\s*)better-auth\.session_token=([^;]+)/)
      if (match && match[1]) {
        token = decodeURIComponent(match[1])
      }
    }
    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }
  } catch {
    // ignore
  }

  return headers
}

/**
 * Create or open a 1-on-1 chat channel with another user
 * Calls POST /api/chat/conversations
 */
export async function createConversationApi(params: {
  otherUserId: string
  otherName?: string
  otherUsername?: string
  otherAvatar?: string
}): Promise<ApiResponse<{
  channelId: string
  type: string
  created_by_id: string
  members: string[]
  otherUser?: ChatParticipant
}>> {
  try {
    const baseUrl = getBaseApiUrl()
    const endpoint = `${baseUrl}/api/chat/conversations`
    const headers = getAuthHeaders()

    const res = await fetch(endpoint, {
      method: 'POST',
      headers,
      credentials: 'include',
      body: JSON.stringify({
        otherUserId: params.otherUserId,
        targetUserId: params.otherUserId,
        otherName: params.otherName,
        otherUsername: params.otherUsername,
        otherAvatar: params.otherAvatar,
      }),
    })

    const data = await res.json().catch(() => ({}))

    if (res.ok && data.success) {
      return { success: true, data: data.conversation }
    }

    return {
      success: false,
      error: data.message || `Failed to create chat channel (${res.status})`,
    }
  } catch (err: any) {
    console.error('createConversationApi error:', err)
    return {
      success: false,
      error: err?.message || 'Network error while creating chat channel',
    }
  }
}

/**
 * Create a new group channel
 * Calls POST /api/chat/groups
 */
export async function createGroupConversationApi(params: {
  name: string
  memberIds: string[]
  image?: string
}): Promise<ApiResponse<{
  channelId: string
  type: string
  name: string
  isGroup: boolean
  members: string[]
}>> {
  try {
    const baseUrl = getBaseApiUrl()
    const endpoint = `${baseUrl}/api/chat/groups`
    const headers = getAuthHeaders()

    const res = await fetch(endpoint, {
      method: 'POST',
      headers,
      credentials: 'include',
      body: JSON.stringify(params),
    })

    const data = await res.json().catch(() => ({}))

    if (res.ok && data.success) {
      return { success: true, data: data.conversation }
    }

    return {
      success: false,
      error: data.message || `Failed to create group channel (${res.status})`,
    }
  } catch (err: any) {
    console.error('createGroupConversationApi error:', err)
    return {
      success: false,
      error: err?.message || 'Network error while creating group channel',
    }
  }
}

/**
 * Fetch all conversations for the authenticated user
 * Calls GET /api/chat/conversations
 */
export async function fetchMyConversationsApi(): Promise<ApiResponse<ChatConversationItem[]>> {
  try {
    const baseUrl = getBaseApiUrl()
    const endpoint = `${baseUrl}/api/chat/conversations`
    const headers = getAuthHeaders()

    const res = await fetch(endpoint, {
      method: 'GET',
      headers,
      credentials: 'include',
    })

    const data = await res.json().catch(() => ({}))

    if (res.ok && data.success && Array.isArray(data.conversations)) {
      return { success: true, data: data.conversations }
    }

    return {
      success: false,
      error: data.message || 'Failed to fetch conversations',
    }
  } catch (err: any) {
    console.error('fetchMyConversationsApi error:', err)
    return {
      success: false,
      error: err?.message || 'Network error while fetching conversations',
    }
  }
}

/**
 * Fetch messages for a specific channel
 * Calls GET /api/chat/conversations/:channelId/messages
 */
export async function fetchChannelMessagesApi(channelId: string): Promise<ApiResponse<ChatMessageItem[]>> {
  try {
    const baseUrl = getBaseApiUrl()
    const endpoint = `${baseUrl}/api/chat/conversations/${encodeURIComponent(channelId)}/messages`
    const headers = getAuthHeaders()

    const res = await fetch(endpoint, {
      method: 'GET',
      headers,
      credentials: 'include',
    })

    const data = await res.json().catch(() => ({}))

    if (res.ok && data.success && Array.isArray(data.messages)) {
      return { success: true, data: data.messages }
    }

    return {
      success: false,
      error: data.message || 'Failed to fetch messages',
    }
  } catch (err: any) {
    console.error('fetchChannelMessagesApi error:', err)
    return {
      success: false,
      error: err?.message || 'Network error while fetching messages',
    }
  }
}

/**
 * Send a message to a specific channel
 * Calls POST /api/chat/conversations/:channelId/messages
 */
export async function sendMessageApi(
  channelId: string,
  text: string,
  parentId?: string,
  attachments?: Array<Record<string, any>>
): Promise<ApiResponse<any>> {
  try {
    const baseUrl = getBaseApiUrl()
    const endpoint = `${baseUrl}/api/chat/conversations/${encodeURIComponent(channelId)}/messages`
    const headers = getAuthHeaders()

    const res = await fetch(endpoint, {
      method: 'POST',
      headers,
      credentials: 'include',
      body: JSON.stringify({ text, parentId, attachments }),
    })

    const data = await res.json().catch(() => ({}))

    if (res.ok && data.success) {
      return { success: true, data: data.message }
    }

    return {
      success: false,
      error: data.message || 'Failed to send message',
    }
  } catch (err: any) {
    console.error('sendMessageApi error:', err)
    return {
      success: false,
      error: err?.message || 'Network error while sending message',
    }
  }
}

/**
 * Edit an existing message
 * Calls PUT /api/chat/conversations/:channelId/messages/:messageId
 */
export async function editMessageApi(
  channelId: string,
  messageId: string,
  text: string
): Promise<ApiResponse<any>> {
  try {
    const baseUrl = getBaseApiUrl()
    const endpoint = `${baseUrl}/api/chat/conversations/${encodeURIComponent(channelId)}/messages/${encodeURIComponent(messageId)}`
    const headers = getAuthHeaders()

    const res = await fetch(endpoint, {
      method: 'PUT',
      headers,
      credentials: 'include',
      body: JSON.stringify({ text }),
    })

    const data = await res.json().catch(() => ({}))
    if (res.ok && data.success) {
      return { success: true, data: data.message }
    }
    return { success: false, error: data.message || 'Failed to edit message' }
  } catch (err: any) {
    return { success: false, error: err?.message || 'Network error' }
  }
}

/**
 * Delete a message
 * Calls DELETE /api/chat/conversations/:channelId/messages/:messageId
 */
export async function deleteMessageApi(
  channelId: string,
  messageId: string,
  hard = false
): Promise<ApiResponse<any>> {
  try {
    const baseUrl = getBaseApiUrl()
    const endpoint = `${baseUrl}/api/chat/conversations/${encodeURIComponent(channelId)}/messages/${encodeURIComponent(messageId)}?hard=${hard}`
    const headers = getAuthHeaders()

    const res = await fetch(endpoint, {
      method: 'DELETE',
      headers,
      credentials: 'include',
    })

    const data = await res.json().catch(() => ({}))
    if (res.ok && data.success) {
      return { success: true, data: data.message }
    }
    return { success: false, error: data.message || 'Failed to delete message' }
  } catch (err: any) {
    return { success: false, error: err?.message || 'Network error' }
  }
}

/**
 * Send reaction to a message
 * Calls POST /api/chat/conversations/:channelId/messages/:messageId/reactions
 */
export async function sendReactionApi(
  channelId: string,
  messageId: string,
  type: string
): Promise<ApiResponse<any>> {
  try {
    const baseUrl = getBaseApiUrl()
    const endpoint = `${baseUrl}/api/chat/conversations/${encodeURIComponent(channelId)}/messages/${encodeURIComponent(messageId)}/reactions`
    const headers = getAuthHeaders()

    const res = await fetch(endpoint, {
      method: 'POST',
      headers,
      credentials: 'include',
      body: JSON.stringify({ type }),
    })

    const data = await res.json().catch(() => ({}))
    if (res.ok && data.success) {
      return { success: true, data: data.reaction }
    }
    return { success: false, error: data.message || 'Failed to send reaction' }
  } catch (err: any) {
    return { success: false, error: err?.message || 'Network error' }
  }
}

/**
 * Remove reaction from a message
 * Calls DELETE /api/chat/conversations/:channelId/messages/:messageId/reactions/:type
 */
export async function deleteReactionApi(
  channelId: string,
  messageId: string,
  type: string
): Promise<ApiResponse<any>> {
  try {
    const baseUrl = getBaseApiUrl()
    const endpoint = `${baseUrl}/api/chat/conversations/${encodeURIComponent(channelId)}/messages/${encodeURIComponent(messageId)}/reactions/${encodeURIComponent(type)}`
    const headers = getAuthHeaders()

    const res = await fetch(endpoint, {
      method: 'DELETE',
      headers,
      credentials: 'include',
    })

    const data = await res.json().catch(() => ({}))
    if (res.ok && data.success) {
      return { success: true }
    }
    return { success: false, error: data.message || 'Failed to delete reaction' }
  } catch (err: any) {
    return { success: false, error: err?.message || 'Network error' }
  }
}

/**
 * Pin a message in channel
 * Calls POST /api/chat/conversations/:channelId/messages/:messageId/pin
 */
export async function pinMessageApi(
  channelId: string,
  messageId: string
): Promise<ApiResponse<any>> {
  try {
    const baseUrl = getBaseApiUrl()
    const endpoint = `${baseUrl}/api/chat/conversations/${encodeURIComponent(channelId)}/messages/${encodeURIComponent(messageId)}/pin`
    const headers = getAuthHeaders()

    const res = await fetch(endpoint, {
      method: 'POST',
      headers,
      credentials: 'include',
    })

    const data = await res.json().catch(() => ({}))
    if (res.ok && data.success) {
      return { success: true, data: data.message }
    }
    return { success: false, error: data.message || 'Failed to pin message' }
  } catch (err: any) {
    return { success: false, error: err?.message || 'Network error' }
  }
}

/**
 * Unpin a message in channel
 * Calls DELETE /api/chat/conversations/:channelId/messages/:messageId/pin
 */
export async function unpinMessageApi(
  channelId: string,
  messageId: string
): Promise<ApiResponse<any>> {
  try {
    const baseUrl = getBaseApiUrl()
    const endpoint = `${baseUrl}/api/chat/conversations/${encodeURIComponent(channelId)}/messages/${encodeURIComponent(messageId)}/pin`
    const headers = getAuthHeaders()

    const res = await fetch(endpoint, {
      method: 'DELETE',
      headers,
      credentials: 'include',
    })

    const data = await res.json().catch(() => ({}))
    if (res.ok && data.success) {
      return { success: true, data: data.message }
    }
    return { success: false, error: data.message || 'Failed to unpin message' }
  } catch (err: any) {
    return { success: false, error: err?.message || 'Network error' }
  }
}

/**
 * Get thread replies
 * Calls GET /api/chat/conversations/:channelId/messages/:messageId/replies
 */
export async function getMessageRepliesApi(
  channelId: string,
  messageId: string
): Promise<ApiResponse<ChatMessageItem[]>> {
  try {
    const baseUrl = getBaseApiUrl()
    const endpoint = `${baseUrl}/api/chat/conversations/${encodeURIComponent(channelId)}/messages/${encodeURIComponent(messageId)}/replies`
    const headers = getAuthHeaders()

    const res = await fetch(endpoint, {
      method: 'GET',
      headers,
      credentials: 'include',
    })

    const data = await res.json().catch(() => ({}))
    if (res.ok && data.success && Array.isArray(data.messages)) {
      return { success: true, data: data.messages }
    }
    return { success: false, error: data.message || 'Failed to get replies' }
  } catch (err: any) {
    return { success: false, error: err?.message || 'Network error' }
  }
}

/**
 * Mark channel messages as read
 * Calls POST /api/chat/conversations/:channelId/read
 */
export async function markChannelReadApi(channelId: string): Promise<ApiResponse<any>> {
  try {
    const baseUrl = getBaseApiUrl()
    const endpoint = `${baseUrl}/api/chat/conversations/${encodeURIComponent(channelId)}/read`
    const headers = getAuthHeaders()

    const res = await fetch(endpoint, {
      method: 'POST',
      headers,
      credentials: 'include',
    })

    const data = await res.json().catch(() => ({}))
    return { success: res.ok && data.success }
  } catch (err: any) {
    return { success: false, error: err?.message }
  }
}

/**
 * Send typing indicator
 * Calls POST /api/chat/conversations/:channelId/typing
 */
export async function sendTypingIndicatorApi(channelId: string): Promise<ApiResponse<any>> {
  try {
    const baseUrl = getBaseApiUrl()
    const endpoint = `${baseUrl}/api/chat/conversations/${encodeURIComponent(channelId)}/typing`
    const headers = getAuthHeaders()

    const res = await fetch(endpoint, {
      method: 'POST',
      headers,
      credentials: 'include',
    })

    const data = await res.json().catch(() => ({}))
    return { success: res.ok && data.success }
  } catch (err: any) {
    return { success: false, error: err?.message }
  }
}

/**
 * Mute channel notifications
 * Calls POST /api/chat/conversations/:channelId/mute
 */
export async function muteChannelApi(channelId: string): Promise<ApiResponse<any>> {
  try {
    const baseUrl = getBaseApiUrl()
    const endpoint = `${baseUrl}/api/chat/conversations/${encodeURIComponent(channelId)}/mute`
    const headers = getAuthHeaders()

    const res = await fetch(endpoint, {
      method: 'POST',
      headers,
      credentials: 'include',
    })

    const data = await res.json().catch(() => ({}))
    return { success: res.ok && data.success, data }
  } catch (err: any) {
    return { success: false, error: err?.message }
  }
}

/**
 * Unmute channel notifications
 * Calls POST /api/chat/conversations/:channelId/unmute
 */
export async function unmuteChannelApi(channelId: string): Promise<ApiResponse<any>> {
  try {
    const baseUrl = getBaseApiUrl()
    const endpoint = `${baseUrl}/api/chat/conversations/${encodeURIComponent(channelId)}/unmute`
    const headers = getAuthHeaders()

    const res = await fetch(endpoint, {
      method: 'POST',
      headers,
      credentials: 'include',
    })

    const data = await res.json().catch(() => ({}))
    return { success: res.ok && data.success, data }
  } catch (err: any) {
    return { success: false, error: err?.message }
  }
}

/**
 * Search messages across user's channels
 * Calls GET /api/chat/search?q=...
 */
export async function searchMessagesApi(query: string): Promise<ApiResponse<any[]>> {
  try {
    const baseUrl = getBaseApiUrl()
    const endpoint = `${baseUrl}/api/chat/search?q=${encodeURIComponent(query)}`
    const headers = getAuthHeaders()

    const res = await fetch(endpoint, {
      method: 'GET',
      headers,
      credentials: 'include',
    })

    const data = await res.json().catch(() => ({}))
    if (res.ok && data.success && Array.isArray(data.results)) {
      return { success: true, data: data.results }
    }
    return { success: false, error: data.message || 'Search failed' }
  } catch (err: any) {
    return { success: false, error: err?.message }
  }
}

export interface ChatTokenResult {
  token: string
  apiKey: string
  userId?: string
  user?: {
    id: string
    name?: string
    image?: string | null
  }
}

/**
 * Generate a Stream Chat user token & apiKey
 * Calls GET /api/chat/token
 */
export async function getChatTokenApi(): Promise<ApiResponse<ChatTokenResult>> {
  try {
    const baseUrl = getBaseApiUrl()
    const endpoint = `${baseUrl}/api/chat/token`
    const headers = getAuthHeaders()

    const res = await fetch(endpoint, {
      method: 'GET',
      headers,
      credentials: 'include',
    })

    const data = await res.json().catch(() => ({}))

    if (res.ok && data.success && data.token) {
      return {
        success: true,
        data: {
          token: data.token,
          apiKey: data.apiKey || 'mxqc6hg2sajb',
          userId: data.userId,
          user: data.user,
        },
      }
    }

    return {
      success: false,
      error: data.message || 'Failed to get chat token',
    }
  } catch (err: any) {
    console.error('getChatTokenApi error:', err)
    return {
      success: false,
      error: err?.message || 'Network error while getting chat token',
    }
  }
}
