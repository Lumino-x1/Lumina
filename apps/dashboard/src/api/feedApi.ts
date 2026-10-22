import { handleAuthResponseError } from './authApi'
import { getBaseApiUrl } from './profileApi'

function getFeedHeaders(extra?: Record<string, string>): Record<string, string> {
  const origin = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:5173'
  return {
    Accept: 'application/json',
    'ngrok-skip-browser-warning': 'true',
    Origin: origin,
    ...extra,
  }
}

export interface FeedMedia {
  id: string
  postId?: string
  type: string
  url: string
  key?: string
  mimeType?: string
  size?: number
  width?: number | null
  height?: number | null
  duration?: number | null
  order?: number
}

export interface FeedAuthor {
  id: string
  username?: string | null
  name?: string | null
  image?: string | null
}

export interface FeedPostItem {
  id: string
  title: string
  subtitle?: string | null
  coverImage?: string | null
  blocks?: any[] | null
  content?: string | null
  category?: string | null
  topics?: string[]
  visibility?: 'PUBLIC' | 'COLLEGE' | 'DEPARTMENT'
  anonymous?: boolean
  isAnnouncement?: boolean
  location?: string | null
  createdAt: string
  updatedAt: string
  likeCount?: number
  isLiked?: boolean
  commentCount?: number
  totalComments?: number
  viewCount?: number
  shareCount?: number
  saveCount?: number
  isSaved?: boolean
  author?: FeedAuthor | null
  media?: FeedMedia[]
}

export interface FeedApiResponse {
  success: boolean
  data: {
    items: FeedPostItem[]
    nextCursor?: string | null
  }
}

export interface FeedStory {
  id: string
  title: string
  description?: string
  authorName: string
  authorAvatar: string
  publication?: string
  date: string
  image?: string | null
  likes: number
  isLiked?: boolean
  comments: number
  totalComments?: number
  shares?: number
  saves?: number
  isSaved?: boolean
  views?: number
  isCurated?: boolean
  isAnnouncement?: boolean
  category?: string
  topics?: string[]
  location?: string
  content?: string | null
  blocks?: any[] | null
  authorUsername?: string | null
  authorRole?: string
  authorVerified?: boolean
  authorId?: string
  media?: FeedMedia[]
}

export function mapFeedPostToStory(item: FeedPostItem): FeedStory {
  const fallbackImages: Record<string, string> = {
    Technology:
      'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&auto=format&fit=crop&q=80',
    Education:
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=80',
    Announcement:
      'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&auto=format&fit=crop&q=80',
    Default:
      'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80',
  }

  const isSeedPost = typeof item.id === 'string' && item.id.startsWith('post_seed_')

  // Pick cover image or first media image
  let image = item.coverImage || item.media?.find((m) => m.type === 'IMAGE' || m.url)?.url

  // If no cover image was set, check if post blocks contain an image block
  if (!image && Array.isArray(item.blocks)) {
    const firstImgBlock = item.blocks.find(
      (b: any) =>
        (b.type === 'image' || b.type === 'unsplash') &&
        (b.metadata?.url ||
          b.metadata?.publicUrl ||
          (typeof b.content === 'string' && b.content.startsWith('http')))
    )
    if (firstImgBlock) {
      image =
        firstImgBlock.metadata?.url || firstImgBlock.metadata?.publicUrl || firstImgBlock.content
    }
  }

  // Only apply seed mock images to designated demo seed posts
  if (isSeedPost) {
    if (item.id === 'post_seed_leetcode_patterns') {
      image =
        'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&auto=format&fit=crop&q=80'
    } else if (item.id === 'post_seed_internship_30') {
      image =
        'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&auto=format&fit=crop&q=80'
    } else if (item.id === 'post_seed_stress_6') {
      image =
        'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=80'
    } else if (item.id === 'post_seed_oss_15') {
      image =
        'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&auto=format&fit=crop&q=80'
    }
  } else if (!image || image.includes('example.com')) {
    image = fallbackImages[item.category || ''] || fallbackImages.Default
  }

  let authorAvatar = item.author?.image
  let authorRole = 'Student · PSG College of Technology'
  let authorVerified = false

  if (isSeedPost) {
    if (item.id === 'post_seed_leetcode_patterns') {
      authorAvatar =
        'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80'
      authorRole = 'Software Architect · Google'
      authorVerified = true
    } else if (item.id === 'post_seed_internship_30') {
      authorAvatar =
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80'
      authorRole = '3rd year CSE · PSG College of Technology'
      authorVerified = true
    } else if (item.id === 'post_seed_stress_6') {
      authorAvatar =
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80'
      authorRole = 'Final year · PSG College of Technology'
    } else if (item.id === 'post_seed_oss_15') {
      authorAvatar =
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80'
      authorRole = 'Alumni · Product Designer'
    }
  }

  if (!authorAvatar || authorAvatar.includes('example.com')) {
    authorAvatar =
      'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80'
  }

  const createdDate = new Date(item.createdAt)
  const isInvalidDate = isNaN(createdDate.getTime())
  const dateFormatted = !isInvalidDate
    ? createdDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    : 'Oct 7'

  const totalCommentCount = item.totalComments ?? item.commentCount ?? 0

  return {
    id: item.id,
    title: item.title,
    description: item.subtitle || item.content || undefined,
    publication: item.isAnnouncement ? 'Campus Announcement' : undefined,
    authorName: item.author?.username
      ? `@${item.author.username.replace(/^@/, '')}`
      : item.author?.name || 'Student',
    authorAvatar,
    authorRole,
    authorVerified,
    authorUsername: item.author?.username ? item.author.username.replace(/^@/, '') : undefined,
    date: dateFormatted,
    image,
    likes: item.likeCount ?? 0,
    isLiked: Boolean(item.isLiked),
    comments: totalCommentCount,
    totalComments: totalCommentCount,
    shares: item.shareCount ?? 0,
    saves: item.saveCount ?? 0,
    isSaved: Boolean(item.isSaved),
    views: item.viewCount ?? 0,
    isAnnouncement: item.isAnnouncement ?? false,
    isCurated: (item.likeCount && item.likeCount > 20) || item.isAnnouncement || false,
    category: item.category || undefined,
    topics: item.topics && item.topics.length > 0 ? item.topics : ['general', 'college'],
    location: item.location || undefined,
    content: item.content || undefined,
    blocks: item.blocks || undefined,
    media: item.media || undefined,
    authorId: item.author?.id || (item as any).authorId || (item as any).userId,
  }
}

/**
 * Standard default items matching the dashboard feed screenshot
 */
export const DEFAULT_FEED_ITEMS: FeedPostItem[] = [
  {
    id: 'post_seed_leetcode_patterns',
    title: '12 LeetCode Patterns That Cover 80% of FAANG Questions',
    subtitle:
      'A structured approach to pattern recognition for technical interviews, covering two-pointer, sliding window, topological sort, and monotonic stack techniques.',
    coverImage:
      'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&auto=format&fit=crop&q=80',
    content:
      'A structured approach to pattern recognition for technical interviews, covering two-pointer, sliding window, topological sort, and monotonic stack techniques.',
    category: 'JavaScript in Plain English',
    topics: ['leetcode', 'faang', 'algorithms', 'javascript'],
    visibility: 'PUBLIC',
    anonymous: false,
    isAnnouncement: false,
    createdAt: '2026-09-07T14:00:00.000Z',
    updatedAt: '2026-09-07T14:00:00.000Z',
    likeCount: 178,
    commentCount: 1,
    totalComments: 1,
    viewCount: 1420,
    shareCount: 1,
    saveCount: 89,
    author: {
      id: 'user_santosh_yadav',
      username: 'santoshyadav',
      name: 'Santosh Yadav',
      image:
        'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80',
    },
  },
  {
    id: 'post_seed_internship_30',
    title: 'Finding Your First Internship – Part 30',
    subtitle:
      'Practical ideas and lessons for students in our college community. In this part, I’ll cover how to build a strong resume, what to focus on in the first year, and common mistakes to avoid.',
    coverImage:
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&auto=format&fit=crop&q=80',
    content:
      'Practical ideas and lessons for students in our college community. In this part, I’ll cover how to build a strong resume, what to focus on in the first year, and common mistakes to avoid.',
    category: 'Career',
    topics: ['internships', 'career', 'students'],
    visibility: 'COLLEGE',
    anonymous: false,
    isAnnouncement: false,
    createdAt: '2026-10-07T12:00:00.000Z',
    updatedAt: '2026-10-07T12:00:00.000Z',
    likeCount: 128,
    commentCount: 24,
    totalComments: 24,
    viewCount: 640,
    shareCount: 12,
    saveCount: 45,
    author: {
      id: 'user_sunil_01',
      username: 'sunilkumar',
      name: 'sunilkumar T',
      image:
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
    },
  },
  {
    id: 'post_seed_stress_6',
    title: 'Managing Stress During Exam Season – Part 6',
    subtitle:
      'Sharing what worked for me and what didn’t. Tips on time management, study routines, and maintaining mental health during exams.',
    coverImage:
      'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=80',
    content:
      'Sharing what worked for me and what didn’t. Tips on time management, study routines, and maintaining mental health during exams.',
    category: 'Wellness',
    topics: ['wellness', 'exams', 'mental-health'],
    visibility: 'COLLEGE',
    anonymous: false,
    isAnnouncement: false,
    createdAt: '2026-10-07T10:00:00.000Z',
    updatedAt: '2026-10-07T10:00:00.000Z',
    likeCount: 96,
    commentCount: 18,
    totalComments: 18,
    viewCount: 412,
    shareCount: 6,
    saveCount: 28,
    author: {
      id: 'user_priya_02',
      username: 'priya_v',
      name: 'Priya V',
      image:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
    },
  },
  {
    id: 'post_seed_oss_15',
    title: 'The Complete Guide to Open Source Contributions – Part 15',
    subtitle:
      'Everything you need to know to make meaningful contributions to open source as a student. Tools, workflow, and best practices.',
    coverImage:
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&auto=format&fit=crop&q=80',
    content:
      'Everything you need to know to make meaningful contributions to open source as a student. Tools, workflow, and best practices.',
    category: 'Technology',
    topics: ['open-source', 'coding', 'community'],
    visibility: 'PUBLIC',
    anonymous: false,
    isAnnouncement: false,
    createdAt: '2026-10-07T08:00:00.000Z',
    updatedAt: '2026-10-07T08:00:00.000Z',
    likeCount: 142,
    commentCount: 32,
    totalComments: 32,
    viewCount: 890,
    shareCount: 18,
    saveCount: 62,
    author: {
      id: 'user_stanford_author',
      username: 'stanford_author',
      name: 'Stanford Mock Blog Author',
      image:
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
    },
  },
]

export interface FetchFeedPageResult {
  items: FeedPostItem[]
  nextCursor: string | null
}

/**
 * Fetch college feed page with nextCursor from GET /api/feed
 * Always sends credentials: 'include' and authorization bearer token
 */
export async function fetchFeedPageApi(options?: {
  limit?: number
  cursor?: string
}): Promise<FetchFeedPageResult> {
  const baseUrl = getBaseApiUrl()
  const limit = options?.limit || 15
  const cursorParam = options?.cursor ? `&cursor=${encodeURIComponent(options.cursor)}` : ''
  const endpoint = `${baseUrl}/api/feed?limit=${limit}${cursorParam}`

  const headers: Record<string, string> = getFeedHeaders({
    'Content-Type': 'application/json',
  })

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
    let res = await fetch(endpoint, {
      method: 'GET',
      headers,
      credentials: 'include',
    })

    if (!res.ok && endpoint.startsWith('http')) {
      // Also try relative /api/feed via Vite proxy for reliable cookie transfer
      try {
        const proxyRes = await fetch(`/api/feed?limit=${limit}${cursorParam}`, {
          method: 'GET',
          headers,
          credentials: 'include',
        })
        if (proxyRes.ok) {
          res = proxyRes
        }
      } catch {
        // ignore proxy fallback failure
      }
    }

    if (res.ok) {
      const payload = (await res.json()) as FeedApiResponse
      if (payload.success && Array.isArray(payload.data?.items)) {
        return {
          items: payload.data.items,
          nextCursor: payload.data.nextCursor ?? null,
        }
      }
    } else {
      handleAuthResponseError(res)
    }
  } catch (err) {
    console.error('Failed to fetch from /api/feed:', err)
  }

  return { items: [], nextCursor: null }
}

/**
 * Fetch college feed from GET /api/feed
 * Always sends credentials: 'include' and authorization bearer token
 */
export async function fetchFeedApi(options?: {
  limit?: number
  cursor?: string
}): Promise<FeedPostItem[]> {
  const result = await fetchFeedPageApi(options)
  return result.items
}

/**
 * Fetch authenticated user's published posts from GET /api/posts/my
 * Always sends credentials: 'include' and authorization bearer token
 */
export async function fetchMyPostsApi(options?: {
  limit?: number
  cursor?: string
}): Promise<FeedPostItem[]> {
  const baseUrl = getBaseApiUrl()
  const limit = options?.limit || 50
  const cursorParam = options?.cursor ? `&cursor=${encodeURIComponent(options.cursor)}` : ''
  const endpoint = `${baseUrl}/api/posts/my?limit=${limit}${cursorParam}`

  const headers: Record<string, string> = getFeedHeaders({
    'Content-Type': 'application/json',
  })

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
    let res = await fetch(endpoint, {
      method: 'GET',
      headers,
      credentials: 'include',
    })

    if (!res.ok && endpoint.startsWith('http')) {
      // Also try relative /api/posts/my via Vite proxy
      try {
        const proxyRes = await fetch(`/api/posts/my?limit=${limit}${cursorParam}`, {
          method: 'GET',
          headers,
          credentials: 'include',
        })
        if (proxyRes.ok) {
          res = proxyRes
        }
      } catch {
        // ignore proxy fallback failure
      }
    }

    if (res.ok) {
      const payload = (await res.json()) as FeedApiResponse
      if (payload.success && Array.isArray(payload.data?.items)) {
        return payload.data.items
      }
    } else {
      handleAuthResponseError(res)
    }
  } catch (err) {
    console.error('Failed to fetch from /api/posts/my:', err)
  }

  return []
}

export interface ToggleLikeApiResponse {
  success: boolean
  message?: string
  data?: {
    liked: boolean
  }
}

/**
 * Toggle like on a post matching request specification:
 * - url: {{baseUrl}}/api/posts/{{postId}}/like
 * - method: POST
 * - body: none
 * - headers: Origin, Accept, Cookie, Authorization
 */
export async function togglePostLikeApi(postId: string): Promise<ToggleLikeApiResponse | null> {
  const baseUrl = getBaseApiUrl()
  const endpoint = `${baseUrl}/api/posts/${encodeURIComponent(postId)}/like`

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
    // ignore
  }

  const headers: Record<string, string> = getFeedHeaders()

  if (sessionToken) {
    try {
      headers['Cookie'] = `better-auth.session_token=${sessionToken}`
    } catch {
      // In browser, Cookie may be protected from manual set; credentials: 'include' handles it
    }
    headers['Authorization'] = `Bearer ${sessionToken}`
  }

  try {
    let res = await fetch(endpoint, {
      method: 'POST',
      headers,
      credentials: 'include',
    })

    if (!res.ok && endpoint.startsWith('http')) {
      // Also try relative /api/posts/:postId/like via Vite proxy
      try {
        const proxyRes = await fetch(`/api/posts/${encodeURIComponent(postId)}/like`, {
          method: 'POST',
          headers,
          credentials: 'include',
        })
        if (proxyRes.ok) {
          res = proxyRes
        }
      } catch {
        // ignore
      }
    }

    if (res.ok) {
      const data = (await res.json()) as ToggleLikeApiResponse
      return data
    } else {
      console.warn(`Toggle like responded with HTTP status ${res.status}`)
    }
  } catch (err) {
    console.error(`Failed to toggle like for post ${postId}:`, err)
  }

  return null
}

export interface ToggleSaveApiResponse {
  success: boolean
  message?: string
  saved?: boolean
  isSaved?: boolean
  data?: {
    saved?: boolean
    isSaved?: boolean
  }
}

/**
 * Toggle save on a post matching request specification:
 * - url: {{baseUrl}}/api/posts/{{postId}}/save
 * - method: POST
 * - body: none
 * - headers: Origin, Accept, Cookie, Authorization
 */
export async function toggleSavePostApi(postId: string): Promise<ToggleSaveApiResponse | null> {
  const baseUrl = getBaseApiUrl()
  const endpoint = `${baseUrl}/api/posts/${encodeURIComponent(postId)}/save`

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
    // ignore
  }

  const headers: Record<string, string> = getFeedHeaders()

  if (sessionToken) {
    try {
      headers['Cookie'] = `better-auth.session_token=${sessionToken}`
    } catch {
      // In browser, Cookie may be protected from manual set; credentials: 'include' handles it
    }
    headers['Authorization'] = `Bearer ${sessionToken}`
  }

  try {
    let res = await fetch(endpoint, {
      method: 'POST',
      headers,
      credentials: 'include',
    })

    if (!res.ok && endpoint.startsWith('http')) {
      // Also try relative /api/posts/:postId/save via Vite proxy
      try {
        const proxyRes = await fetch(`/api/posts/${encodeURIComponent(postId)}/save`, {
          method: 'POST',
          headers,
          credentials: 'include',
        })
        if (proxyRes.ok) {
          res = proxyRes
        }
      } catch {
        // ignore
      }
    }

    if (res.ok) {
      const data = (await res.json()) as ToggleSaveApiResponse
      return data
    } else {
      console.warn(`Toggle save responded with HTTP status ${res.status}`)
    }
  } catch (err) {
    console.error(`Failed to toggle save for post ${postId}:`, err)
  }

  return null
}

/**
 * Fetch saved post IDs for the authenticated user from GET /api/posts/saved
 */
export async function fetchMySavedPostIdsApi(): Promise<string[]> {
  const baseUrl = getBaseApiUrl()
  const endpoint = `${baseUrl}/api/posts/saved`

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
    // ignore
  }

  const headers: Record<string, string> = getFeedHeaders()

  if (sessionToken) {
    try {
      headers['Cookie'] = `better-auth.session_token=${sessionToken}`
    } catch {
      // ignore
    }
    headers['Authorization'] = `Bearer ${sessionToken}`
  }

  try {
    let res = await fetch(endpoint, {
      method: 'GET',
      headers,
      credentials: 'include',
    })

    if (!res.ok && endpoint.startsWith('http')) {
      try {
        const proxyRes = await fetch(`/api/posts/saved`, {
          method: 'GET',
          headers,
          credentials: 'include',
        })
        if (proxyRes.ok) res = proxyRes
      } catch {
        // ignore
      }
    }

    if (res.ok) {
      const payload = await res.json()
      if (payload && payload.success && Array.isArray(payload.savedPosts)) {
        return payload.savedPosts
          .map((item: any) => item.postId || item.post?.id || item.id)
          .filter(Boolean)
      }
    }
  } catch (err) {
    console.error('Failed to fetch saved posts:', err)
  }

  return []
}

export interface PostLikeInfo {
  count: number
  isLiked: boolean
}

export interface LikeCountApiResponse {
  success: boolean
  message?: string
  data?: number | { count: number; isLiked?: boolean }
}

/**
 * Fetch like count and isLiked status for a post matching request specification:
 * - url: {{baseUrl}}/api/posts/{{postId}}/likes/count
 * - method: GET
 * - body: none
 * - headers: Origin, Accept, Cookie, Authorization
 */
export async function fetchPostLikeInfoApi(postId: string): Promise<PostLikeInfo | null> {
  const baseUrl = getBaseApiUrl()
  const endpoint = `${baseUrl}/api/posts/${encodeURIComponent(postId)}/likes/count`

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
    // ignore
  }

  const headers: Record<string, string> = getFeedHeaders()

  if (sessionToken) {
    try {
      headers['Cookie'] = `better-auth.session_token=${sessionToken}`
    } catch {
      // In browser, Cookie may be protected from manual set; credentials: 'include' handles it
    }
    headers['Authorization'] = `Bearer ${sessionToken}`
  }

  try {
    let res = await fetch(endpoint, {
      method: 'GET',
      headers,
      credentials: 'include',
    })

    if (!res.ok && endpoint.startsWith('http')) {
      // Fallback via Vite proxy
      try {
        const proxyRes = await fetch(`/api/posts/${encodeURIComponent(postId)}/likes/count`, {
          method: 'GET',
          headers,
          credentials: 'include',
        })
        if (proxyRes.ok) {
          res = proxyRes
        }
      } catch {
        // ignore
      }
    }

    if (res.ok) {
      const payload = (await res.json()) as LikeCountApiResponse
      if (payload && payload.success) {
        if (typeof payload.data === 'number') {
          return { count: payload.data, isLiked: false }
        }
        if (payload.data && typeof (payload.data as any).count === 'number') {
          return {
            count: (payload.data as any).count,
            isLiked: Boolean((payload.data as any).isLiked),
          }
        }
      }
    }
  } catch (err) {
    // ignore
  }

  return null
}

/**
 * Fetch like count for a post matching request specification:
 * - url: {{baseUrl}}/api/posts/{{postId}}/likes/count
 * - method: GET
 * - body: none
 * - headers: Origin, Accept, Cookie, Authorization
 */
export async function fetchPostLikeCountApi(postId: string): Promise<number | null> {
  const info = await fetchPostLikeInfoApi(postId)
  return info ? info.count : null
}

/**
 * Fetch like info (count & isLiked) for all given post IDs in parallel
 */
export async function fetchAllPostsLikeInfoApi(
  postIds: string[]
): Promise<Record<string, PostLikeInfo>> {
  const map: Record<string, PostLikeInfo> = {}
  if (!Array.isArray(postIds) || postIds.length === 0) return map

  await Promise.all(
    postIds.map(async (id) => {
      const info = await fetchPostLikeInfoApi(id)
      if (info) {
        map[id] = info
      }
    })
  )

  return map
}

/**
 * Fetch like counts for all given post IDs in parallel
 */
export async function fetchAllPostsLikeCountsApi(
  postIds: string[]
): Promise<Record<string, number>> {
  const infoMap = await fetchAllPostsLikeInfoApi(postIds)
  const map: Record<string, number> = {}
  for (const [id, info] of Object.entries(infoMap)) {
    map[id] = info.count
  }
  return map
}

export interface CommentUser {
  id: string
  name?: string | null
  username?: string | null
  image?: string | null
  pronouns?: string | null
}

export interface PostCommentItem {
  id: string
  content: string
  postId: string
  userId: string
  parentId?: string | null
  depth?: number
  isDeleted?: boolean
  isPinned?: boolean
  version?: number
  createdAt: string
  updatedAt?: string
  user?: CommentUser | null
  replies?: PostCommentItem[]
  claps?: number
  likesCount?: number
  isLiked?: boolean
  canPin?: boolean
  canDelete?: boolean
  isAuthor?: boolean
  quote?: string | null
}

export interface FetchCommentsPageResult {
  comments: PostCommentItem[]
  nextCursor: string | null
}

/**
 * Fetch comments page with nextCursor from GET /api/comments/posts/:postId/comments
 */
export async function fetchPostCommentsPageApi(
  postId: string,
  options?: { cursor?: string; limit?: number }
): Promise<FetchCommentsPageResult> {
  const baseUrl = getBaseApiUrl()
  const limit = options?.limit ?? 10
  const cursorParam = options?.cursor ? `&cursor=${encodeURIComponent(options.cursor)}` : ''
  const endpoint = `${baseUrl}/api/comments/posts/${encodeURIComponent(postId)}/comments?limit=${limit}${cursorParam}`

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
    // ignore
  }

  const headers: Record<string, string> = getFeedHeaders()

  if (sessionToken) {
    headers['Authorization'] = `Bearer ${sessionToken}`
    try {
      headers['Cookie'] = `better-auth.session_token=${sessionToken}`
    } catch {
      // ignore
    }
  }

  try {
    let res = await fetch(endpoint, {
      method: 'GET',
      headers,
      credentials: 'include',
    })

    if (!res.ok && endpoint.startsWith('http')) {
      try {
        const proxyRes = await fetch(
          `/api/comments/posts/${encodeURIComponent(postId)}/comments?limit=${limit}${cursorParam}`,
          {
            method: 'GET',
            headers,
            credentials: 'include',
          }
        )
        if (proxyRes.ok) res = proxyRes
      } catch {
        // ignore
      }
    }

    if (!res.ok) {
      try {
        const fallbackRes = await fetch(
          `${baseUrl}/api/posts/${encodeURIComponent(postId)}/comments?limit=${limit}${cursorParam}`,
          {
            method: 'GET',
            headers,
            credentials: 'include',
          }
        )
        if (fallbackRes.ok) res = fallbackRes
      } catch {
        // ignore
      }
    }

    if (res.ok) {
      const payload = await res.json()
      let comments: PostCommentItem[] = []
      let nextCursor: string | null = payload?.nextCursor ?? null

      if (payload && Array.isArray(payload.data)) {
        comments = payload.data as PostCommentItem[]
        if (!nextCursor && payload.dataNextCursor) nextCursor = payload.dataNextCursor
      } else if (payload && Array.isArray(payload.comments)) {
        comments = payload.comments as PostCommentItem[]
      } else if (Array.isArray(payload)) {
        comments = payload as PostCommentItem[]
      }

      return { comments, nextCursor }
    }
  } catch (err) {
    console.error(`Failed to fetch comments for post ${postId}:`, err)
  }

  return { comments: [], nextCursor: null }
}

/**
 * Fetch comments tree for a post from GET /api/comments/posts/:postId/comments
 */
export async function fetchPostCommentsApi(
  postId: string,
  options?: { cursor?: string; limit?: number }
): Promise<PostCommentItem[]> {
  const result = await fetchPostCommentsPageApi(postId, options)
  return result.comments
}

/**
 * Create a new comment on a post via POST /api/comments/posts/:postId/comments
 */
export async function createPostCommentApi(
  postId: string,
  content: string,
  parentId?: string | null
): Promise<PostCommentItem | null> {
  const baseUrl = getBaseApiUrl()
  const endpoint = `${baseUrl}/api/comments/posts/${encodeURIComponent(postId)}/comments`

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
    // ignore
  }

  const headers: Record<string, string> = getFeedHeaders({
    'Content-Type': 'application/json',
  })

  if (sessionToken) {
    headers['Authorization'] = `Bearer ${sessionToken}`
    try {
      headers['Cookie'] = `better-auth.session_token=${sessionToken}`
    } catch {
      // ignore
    }
  }

  const payloadBody = JSON.stringify({
    content,
    parentId: parentId ?? null,
  })

  try {
    let res = await fetch(endpoint, {
      method: 'POST',
      headers,
      credentials: 'include',
      body: payloadBody,
    })

    if (!res.ok && endpoint.startsWith('http')) {
      try {
        const proxyRes = await fetch(`/api/comments/posts/${encodeURIComponent(postId)}/comments`, {
          method: 'POST',
          headers,
          credentials: 'include',
          body: payloadBody,
        })
        if (proxyRes.ok) res = proxyRes
      } catch {
        // ignore
      }
    }

    if (res.ok) {
      const payload = await res.json()
      if (payload && payload.success && payload.data) {
        return payload.data as PostCommentItem
      }
      if (payload && payload.id) {
        return payload as PostCommentItem
      }
      if (payload && payload.comment) {
        return payload.comment as PostCommentItem
      }
    }
  } catch (err) {
    console.error(`Failed to create comment for post ${postId}:`, err)
  }

  return null
}

/**
 * Toggle like/reaction on a comment via POST /api/comments/:commentId/reactions
 */
export async function toggleCommentLikeApi(
  commentId: string,
  emoji = '❤️'
): Promise<{ action: 'added' | 'removed'; isLiked: boolean; likesCount: number } | null> {
  const baseUrl = getBaseApiUrl()
  const endpoint = `${baseUrl}/api/comments/${encodeURIComponent(commentId)}/reactions`

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
    // ignore
  }

  const headers: Record<string, string> = getFeedHeaders({
    'Content-Type': 'application/json',
  })
  if (sessionToken) {
    headers['Authorization'] = `Bearer ${sessionToken}`
    try {
      headers['Cookie'] = `better-auth.session_token=${sessionToken}`
    } catch {
      // ignore
    }
  }

  const payloadBody = JSON.stringify({ emoji })

  try {
    let res = await fetch(endpoint, {
      method: 'POST',
      headers,
      credentials: 'include',
      body: payloadBody,
    })

    if (!res.ok && endpoint.startsWith('http')) {
      try {
        const proxyRes = await fetch(`/api/comments/${encodeURIComponent(commentId)}/reactions`, {
          method: 'POST',
          headers,
          credentials: 'include',
          body: payloadBody,
        })
        if (proxyRes.ok) res = proxyRes
      } catch {
        // ignore
      }
    }

    if (res.ok) {
      const data = await res.json()
      return data
    }
  } catch (err) {
    console.error(`Failed to toggle like on comment ${commentId}:`, err)
  }
  return null
}

/**
 * Toggle pin status on a comment via POST /api/comments/:commentId/pin
 */
export async function togglePinCommentApi(
  commentId: string
): Promise<{ isPinned: boolean } | null> {
  const baseUrl = getBaseApiUrl()
  const endpoint = `${baseUrl}/api/comments/${encodeURIComponent(commentId)}/pin`

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
    // ignore
  }

  const headers: Record<string, string> = getFeedHeaders({
    'Content-Type': 'application/json',
  })
  if (sessionToken) {
    headers['Authorization'] = `Bearer ${sessionToken}`
    try {
      headers['Cookie'] = `better-auth.session_token=${sessionToken}`
    } catch {
      // ignore
    }
  }

  try {
    let res = await fetch(endpoint, {
      method: 'POST',
      headers,
      credentials: 'include',
    })

    if (!res.ok && endpoint.startsWith('http')) {
      try {
        const proxyRes = await fetch(`/api/comments/${encodeURIComponent(commentId)}/pin`, {
          method: 'POST',
          headers,
          credentials: 'include',
        })
        if (proxyRes.ok) res = proxyRes
      } catch {
        // ignore
      }
    }

    if (res.ok) {
      const data = await res.json()
      return { isPinned: Boolean(data?.isPinned ?? data?.comment?.isPinned) }
    }
  } catch (err) {
    console.error(`Failed to toggle pin on comment ${commentId}:`, err)
  }
  return null
}

/**
 * Delete (soft-delete) a comment via DELETE /api/comments/:commentId
 */
export async function deleteCommentApi(commentId: string): Promise<boolean> {
  const baseUrl = getBaseApiUrl()
  const endpoint = `${baseUrl}/api/comments/${encodeURIComponent(commentId)}`

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
    // ignore
  }

  const headers: Record<string, string> = getFeedHeaders()
  if (sessionToken) {
    headers['Authorization'] = `Bearer ${sessionToken}`
    try {
      headers['Cookie'] = `better-auth.session_token=${sessionToken}`
    } catch {
      // ignore
    }
  }

  try {
    let res = await fetch(endpoint, {
      method: 'DELETE',
      headers,
      credentials: 'include',
    })

    if (!res.ok && endpoint.startsWith('http')) {
      try {
        const proxyRes = await fetch(`/api/comments/${encodeURIComponent(commentId)}`, {
          method: 'DELETE',
          headers,
          credentials: 'include',
        })
        if (proxyRes.ok) res = proxyRes
      } catch {
        // ignore
      }
    }

    return res.ok
  } catch (err) {
    console.error(`Failed to delete comment ${commentId}:`, err)
    return false
  }
}

/**
 * Report a comment via POST /api/comments/:commentId/report
 */
export async function reportCommentApi(
  commentId: string,
  reason = 'Inappropriate content',
  details?: string
): Promise<boolean> {
  const baseUrl = getBaseApiUrl()
  const endpoint = `${baseUrl}/api/comments/${encodeURIComponent(commentId)}/report`

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
    // ignore
  }

  const headers: Record<string, string> = getFeedHeaders({
    'Content-Type': 'application/json',
  })
  if (sessionToken) {
    headers['Authorization'] = `Bearer ${sessionToken}`
    try {
      headers['Cookie'] = `better-auth.session_token=${sessionToken}`
    } catch {
      // ignore
    }
  }

  try {
    let res = await fetch(endpoint, {
      method: 'POST',
      headers,
      credentials: 'include',
      body: JSON.stringify({ reason, details: details || 'Flagged by reader via comment actions' }),
    })

    if (!res.ok && endpoint.startsWith('http')) {
      try {
        const proxyRes = await fetch(`/api/comments/${encodeURIComponent(commentId)}/report`, {
          method: 'POST',
          headers,
          credentials: 'include',
          body: JSON.stringify({ reason, details: details || 'Flagged by reader via comment actions' }),
        })
        if (proxyRes.ok) res = proxyRes
      } catch {
        // ignore
      }
    }

    return res.ok
  } catch (err) {
    console.error(`Failed to report comment ${commentId}:`, err)
    return false
  }
}
