import React, { useState, useEffect } from 'react'
import {
  Search,
  ArrowLeft,
  SquarePen,
  Users,
  Check,
  Plus,
  Heart,
  Bookmark,
  MessageSquare,
  Repeat,
  Calendar,
  Clock,
  FileText,
  Trash2,
  Send,
  X,
  Sparkles,
  Award,
  Pencil,
  BadgeCheck,
  Loader2,
} from 'lucide-react'
import './ProfilePage.css'
import './DashboardPage.css'
import './Navbar.css'
import type { DashboardUser } from './DashboardPage'
import { DEFAULT_WHATSAPP_AVATAR } from './components/WhatsAppDefaultAvatar'
import { useTheme } from './lib/themeContext'
import {
  fetchRecommendedStudentsApi,
  type RecommendedStudent,
} from './api/recommendationApi'
import {
  sendFriendRequestApi,
  cancelFriendRequestApi,
  fetchOutgoingRequestsApi,
  fetchMyFriendsApi,
  unfriendApi,
} from './api/friendsApi'
import { NotificationDropdown } from './components/NotificationDropdown'
import { fetchMyProfile, type ProfileData } from './api/profileApi'
import {
  type ScheduledPostItem,
  fetchScheduledPostsApi,
  reschedulePostApi,
  cancelScheduledPostApi,
  publishPostImmediatelyApi,
} from './api/scheduledPostsApi'
import {
  type FeedPostItem,
  type FeedStory,
  fetchMyPostsApi,
  fetchSavedPostsApi,
  mapFeedPostToStory,
  togglePostLikeApi,
  toggleSavePostApi,
} from './api/feedApi'
import { createConversationApi } from './api/chatApi'
import BlogReaderView from './BlogReaderView'

export interface FriendUserItem {
  id: string
  name: string
  username: string
  avatar: string
}

export interface ProfilePageProps {
  user?: DashboardUser | null
  onBackToDashboard?: (targetHash?: string) => void
  onNavigateHome?: () => void
  onLogout?: () => void
}

const LinkedInSilhouette: React.FC = () => (
  <svg viewBox="0 0 140 140" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="140" height="140" fill="#F7F3EB" />
    <circle cx="70" cy="50" r="26" fill="#191919" opacity="0.4" />
    <path d="M18 136 C22 96 46 86 70 86 C94 86 118 96 122 136 Z" fill="#191919" opacity="0.4" />
  </svg>
)

const Icons = {
  LuminaLogo: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <rect width="24" height="24" rx="6" fill="currentColor" />
      <path d="M6.5 17.5V6.5L12 12L6.5 17.5Z" fill="white" opacity="0.95" />
      <circle cx="16.5" cy="12" r="2.5" fill="white" />
    </svg>
  ),
  ChevronsUpDown: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="7 15 12 20 17 15" />
      <polyline points="7 9 12 4 17 9" />
    </svg>
  ),
  User: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  ),
  Home: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  ),
  Feed: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 11a9 9 0 0 1 9 9" />
      <path d="M4 4a16 16 0 0 1 16 16" />
      <circle cx="5" cy="19" r="1" />
    </svg>
  ),
  Discover: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
    </svg>
  ),
  Following: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="8.5" cy="7" r="4" />
      <line x1="20" y1="8" x2="20" y2="14" />
      <line x1="23" y1="11" x2="17" y2="11" />
    </svg>
  ),
  People: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  Communities: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  ),
  AcademicDashboard: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
    </svg>
  ),
  Calendar: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  ),
  Sparkles: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3L12 3z" />
    </svg>
  ),
  MessageSquare: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  ),
  FileText: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
    </svg>
  ),
  Assignments: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
      <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
    </svg>
  ),
  Search: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  ),
  Bell: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  ),
  Sun: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  ),
  Moon: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  ),
  Plus: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  ),
  Camera: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
      <circle cx="12" cy="13" r="4" />
    </svg>
  ),
  CheckCircle: (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      aria-label="Verified"
      style={{ display: 'inline-block', verticalAlign: 'middle' }}
    >
      <path
        d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"
        fill="currentColor"
      />
      <path
        d="m16 9-5.5 5.5L8 12"
        stroke="#ffffff"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  Edit: (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
    </svg>
  ),
  Share: (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
    </svg>
  ),
  MoreHorizontal: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="1" />
      <circle cx="19" cy="12" r="1" />
      <circle cx="5" cy="12" r="1" />
    </svg>
  ),
  MapPin: (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  ),
  Zap: (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  ),
  Star: (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  ),
  Bookmark: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
    </svg>
  ),
  Pin: (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="17" x2="12" y2="22" />
      <path d="M5 17h14v-1.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V6h1a1 1 0 0 0 0-2H8a1 1 0 0 0 0 2h1v4.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24Z" />
    </svg>
  ),
  ExternalLink: (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  ),
  Download: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  ),
  ThumbsUp: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
    </svg>
  ),
  Repeat: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="17 1 21 5 17 9" />
      <path d="M3 11V9a4 4 0 0 1 4-4h14" />
      <polyline points="7 23 3 19 7 15" />
      <path d="M21 13v2a4 4 0 0 1-4 4H3" />
    </svg>
  ),
  GraduationCap: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c3 3 9 3 12 0v-5" />
    </svg>
  ),
  Send: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  ),
  Handshake: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m11 17 2 2a1 1 0 0 0 1.4 0l4.3-4.3a1 1 0 0 0 0-1.4l-2-2" />
      <path d="m18 10 1.3-1.3a1 1 0 0 0 0-1.4l-2-2a1 1 0 0 0-1.4 0L14 7" />
      <path d="m3 21 9-9" />
      <path d="m5 11 2-2a1 1 0 0 1 1.4 0l4.3 4.3a1 1 0 0 1 0 1.4l-2 2" />
    </svg>
  ),
}

const DEFAULT_SCHEDULED_POSTS: ScheduledPostItem[] = []

const DEFAULT_DRAFT_POSTS: Array<{
  id: string
  title: string
  subtitle: string
  content: string
  updatedAt: string
  readTime: string
  status: 'DRAFT'
}> = []

const formatPostDate = (dateStr?: string): string => {
  if (!dateStr) return 'Sep 7'
  try {
    const d = new Date(dateStr)
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  } catch {
    return 'Sep 7'
  }
}

export const ProfilePage: React.FC<ProfilePageProps> = ({
  user,
  onBackToDashboard,
  onNavigateHome: _onNavigateHome,
  onLogout: _onLogout,
}) => {
  const { theme: _theme } = useTheme()
  const [activeTab, setActiveTab] = useState<'posts' | 'about' | 'projects' | 'achievements' | 'communities' | 'saved' | 'friends'>('posts')
  const [searchQuery, setSearchQuery] = useState('')
  const [searchFocused, setSearchFocused] = useState(false)
  const [meProfile, setMeProfile] = useState<ProfileData | null>(null)
  const [loadingProfile, setLoadingProfile] = useState<boolean>(true)
  const [friendsCount, setFriendsCount] = useState<number | null>(null)
  const [showFriendsModal, setShowFriendsModal] = useState<boolean>(false)
  const [friendsList, setFriendsList] = useState<FriendUserItem[]>([])
  const [isFriendsLoading, setIsFriendsLoading] = useState<boolean>(true)
  const [friendsSearchQuery, setFriendsSearchQuery] = useState<string>('')
  const [startingChatFriendId, setStartingChatFriendId] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true
    fetchMyProfile()
      .then((data) => {
        if (isMounted && data) {
          setMeProfile(data)
        }
      })
      .catch((err) => {
        console.warn('[ProfilePage] Failed to fetch profile:', err)
      })
      .finally(() => {
        if (isMounted) {
          setLoadingProfile(false)
        }
      })

    return () => {
      isMounted = false
    }
  }, [user?.id])

  useEffect(() => {
    let isMounted = true
    setIsFriendsLoading(true)
    fetchMyFriendsApi()
      .then((res) => {
        if (isMounted && res.success && Array.isArray(res.data)) {
          setFriendsCount(res.data.length)
          const myId = user?.id || meProfile?.userId || meProfile?.user?.id || meProfile?.id
          const myEmail = user?.email || (meProfile as any)?.email
          const realFriends: FriendUserItem[] = res.data.map((item: any) => {
            const isSenderMe =
              (myId && (item.sender?.id === myId || item.senderId === myId)) ||
              (myEmail && item.sender?.email === myEmail)
            const other = isSenderMe ? item.receiver : item.sender
            return {
              id: other?.id || item.id,
              name: other?.name || other?.profile?.name || 'Classmate',
              username:
                other?.username ||
                (other?.email ? other.email.split('@')[0] : '') ||
                'student_user',
              avatar:
                other?.image ||
                other?.profile?.avatarUrl ||
                DEFAULT_WHATSAPP_AVATAR,
            }
          })
          setFriendsList(realFriends)
        } else if (isMounted) {
          setFriendsList([])
          setFriendsCount(0)
        }
      })
      .catch((err) => {
        console.warn('[ProfilePage] Failed to fetch friends:', err)
        if (isMounted) {
          setFriendsList([])
          setFriendsCount(0)
        }
      })
      .finally(() => {
        if (isMounted) {
          setIsFriendsLoading(false)
        }
      })

    return () => {
      isMounted = false
    }
  }, [user?.id])

  const filteredFriends = friendsList.filter((f) => {
    const q = friendsSearchQuery.trim().toLowerCase()
    if (!q) return true
    return (
      f.username.toLowerCase().includes(q) ||
      f.name.toLowerCase().includes(q)
    )
  })

  const [removingFriendIds, setRemovingFriendIds] = useState<Record<string, boolean>>({})

  const handleRemoveFriend = async (friend: FriendUserItem) => {
    if (removingFriendIds[friend.id]) return

    setRemovingFriendIds((prev) => ({ ...prev, [friend.id]: true }))

    const prevFriendsList = [...friendsList]
    const prevCount = friendsCount

    // Optimistically update the list and counter
    setFriendsList((prev) => prev.filter((f) => f.id !== friend.id))
    setFriendsCount((prev) => (prev !== null ? Math.max(0, prev - 1) : 0))

    try {
      const res = await unfriendApi(friend.id)
      if (res.success) {
        setToastMessage(`Removed ${friend.name || friend.username} from friends`)
        setTimeout(() => setToastMessage(null), 3000)
      } else {
        // Rollback state on failure
        setFriendsList(prevFriendsList)
        setFriendsCount(prevCount)
        setToastMessage(res.error || 'Failed to remove friend')
        setTimeout(() => setToastMessage(null), 3500)
      }
    } catch (err: any) {
      setFriendsList(prevFriendsList)
      setFriendsCount(prevCount)
      setToastMessage(err?.message || 'Error removing friend')
      setTimeout(() => setToastMessage(null), 3500)
    } finally {
      setRemovingFriendIds((prev) => {
        const next = { ...prev }
        delete next[friend.id]
        return next
      })
    }
  }

  const handleStartChatWithFriend = async (friend: FriendUserItem) => {
    try {
      setStartingChatFriendId(friend.id)
      const res = await createConversationApi({
        otherUserId: friend.id,
        otherName: friend.name,
        otherUsername: friend.username,
        otherAvatar: friend.avatar,
      })

      const channelId = res.success && res.data?.channelId
        ? res.data.channelId
        : `direct-${friend.id}`

      try {
        sessionStorage.setItem('lumina_active_channel_id', channelId)
        sessionStorage.setItem('lumina_active_chat_friend', JSON.stringify(friend))
      } catch {
        // ignore storage errors
      }

      setShowFriendsModal(false)
      window.location.hash = 'messages'
      if (onBackToDashboard) {
        onBackToDashboard('messages')
      }
    } catch (err: any) {
      console.error('Failed to create chat channel:', err)
      try {
        sessionStorage.setItem('lumina_active_channel_id', `direct-${friend.id}`)
        sessionStorage.setItem('lumina_active_chat_friend', JSON.stringify(friend))
      } catch {
        // ignore
      }
      setShowFriendsModal(false)
      window.location.hash = 'messages'
      if (onBackToDashboard) {
        onBackToDashboard('messages')
      }
    } finally {
      setStartingChatFriendId(null)
    }
  }

  useEffect(() => {
    const handleGlobalKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setShowFriendsModal(false)
      }
    }
    window.addEventListener('keydown', handleGlobalKeyDown)
    return () => window.removeEventListener('keydown', handleGlobalKeyDown)
  }, [])

  // Interactive likes & bookmarks
  const [likedPosts, setLikedPosts] = useState<Record<string, boolean>>({})
  const [savedPosts, setSavedPosts] = useState<Record<string, boolean>>({})
  const [friendRequestsSent, setFriendRequestsSent] = useState<Record<string, string | boolean>>({})
  const [recommendedStudents, setRecommendedStudents] = useState<RecommendedStudent[]>([])
  const [isRecommendationsLoading, setIsRecommendationsLoading] = useState<boolean>(true)

  const [notificationsOpen, setNotificationsOpen] = useState<boolean>(false)
  const [unreadNotifCount, setUnreadNotifCount] = useState<number>(2)

  // Fetch initial outgoing pending friend requests
  useEffect(() => {
    let isMounted = true
    fetchOutgoingRequestsApi().then((res) => {
      if (isMounted && res.success && Array.isArray(res.data)) {
        const pendingMap: Record<string, string> = {}
        res.data.forEach((req) => {
          if (req.receiverId && req.status === 'PENDING') {
            pendingMap[req.receiverId] = req.id
          }
        })
        setFriendRequestsSent((prev) => ({ ...prev, ...pendingMap }))
      }
    })
    return () => {
      isMounted = false
    }
  }, [])

  useEffect(() => {
    let isMounted = true
    const collegeId =
      meProfile?.user?.collegeId ||
      meProfile?.college?.id ||
      user?.collegeId ||
      'cmv9h829300024y8akviwpsmm'

    setIsRecommendationsLoading(true)
    Promise.all([
      fetchRecommendedStudentsApi(collegeId, 10),
      fetchMyFriendsApi(),
    ])
      .then(([data, friendsRes]) => {
        if (!isMounted) return
        const myFriendIds = new Set<string>()
        const myFriendUsers = new Set<string>()
        if (friendsRes.success && Array.isArray(friendsRes.data)) {
          const myId = user?.id || meProfile?.userId || meProfile?.user?.id
          const myUser = (user?.username || meProfile?.user?.username || '').replace(/^@/, '').toLowerCase().trim()
          friendsRes.data.forEach((item: any) => {
            if (item.status && item.status !== 'ACCEPTED') return
            const isSenderMe =
              (myId && (item.sender?.id === myId || item.senderId === myId)) ||
              (myUser && item.sender?.username?.replace(/^@/, '').toLowerCase().trim() === myUser)
            const other = isSenderMe ? item.receiver : item.sender
            const otherId = other?.id || (isSenderMe ? item.receiverId : item.senderId)
            const otherUser = (other?.username || other?.profile?.username || '').replace(/^@/, '').toLowerCase().trim()
            if (otherId) myFriendIds.add(otherId)
            if (otherUser) myFriendUsers.add(otherUser)
            if (item.senderId && item.senderId !== myId) myFriendIds.add(item.senderId)
            if (item.receiverId && item.receiverId !== myId) myFriendIds.add(item.receiverId)
          })
        }

        const activeSuggestions = (data || []).filter((s) => {
          if (s.isFriend || s.friendshipStatus === 'ACCEPTED') return false
          if (s.id && myFriendIds.has(s.id)) return false
          const sUser = (s.username || '').replace(/^@/, '').toLowerCase().trim()
          if (sUser && myFriendUsers.has(sUser)) return false
          return true
        })

        setRecommendedStudents(activeSuggestions.slice(0, 5))
        if (activeSuggestions.length > 0) {
          const fromRecs: Record<string, string> = {}
          activeSuggestions.forEach((student) => {
            if (student.friendshipStatus === 'PENDING' && student.id) {
              fromRecs[student.id] = student.requestId || student.id
            }
          })
          if (Object.keys(fromRecs).length > 0) {
            setFriendRequestsSent((prev) => ({ ...prev, ...fromRecs }))
          }
        }
      })
      .catch((err) => {
        if (!isMounted) return
        console.error('Failed to load recommended students:', err)
        setRecommendedStudents([])
      })
      .finally(() => {
        if (isMounted) {
          setIsRecommendationsLoading(false)
        }
      })

    return () => {
      isMounted = false
    }
  }, [meProfile?.user?.collegeId, meProfile?.college?.id, user?.collegeId])

  const handleToggleFriendRequest = async (friendId: string) => {
    const isCurrentlyPending = !!friendRequestsSent[friendId]

    if (isCurrentlyPending) {
      // Currently pending -> cancel the friend request!
      const currentRequestId = friendRequestsSent[friendId]
      const paramToCancel = typeof currentRequestId === 'string' ? currentRequestId : friendId

      // Optimistically remove from pending state (revert to Follow)
      setFriendRequestsSent((prev) => {
        const next = { ...prev }
        delete next[friendId]
        return next
      })

      const res = await cancelFriendRequestApi(paramToCancel)
      if (!res.success) {
        console.warn(`Cancel friend request to ${friendId} failed:`, res.error)
        // Rollback to pending on error
        setFriendRequestsSent((prev) => ({
          ...prev,
          [friendId]: currentRequestId,
        }))
      }
    } else {
      // Not pending -> send friend request!
      // Optimistically show "Pending"
      setFriendRequestsSent((prev) => ({
        ...prev,
        [friendId]: true,
      }))

      const res = await sendFriendRequestApi(friendId)
      if (res.success && res.data?.id) {
        setFriendRequestsSent((prev) => ({
          ...prev,
          [friendId]: res.data!.id,
        }))
      } else {
        if (
          res.error?.includes('EXISTS') ||
          res.error?.includes('already exists')
        ) {
          // If request already exists, keep as pending
          setFriendRequestsSent((prev) => ({ ...prev, [friendId]: true }))
        } else {
          console.warn(`Friend request to ${friendId} failed:`, res.error)
          // Rollback on error
          setFriendRequestsSent((prev) => {
            const next = { ...prev }
            delete next[friendId]
            return next
          })
        }
      }
    }
  }

  const handleOpenComposer = () => {
    window.location.hash = '#write'
  }

  // Posts Sub-filter: 'all' | 'draft' | 'scheduled'
  const [postSubFilter, setPostSubFilter] = useState<'all' | 'draft' | 'scheduled'>('all')

  // Published posts in profile
  const [publishedPosts, setPublishedPosts] = useState<FeedPostItem[]>([])
  const [loadingPosts, setLoadingPosts] = useState<boolean>(true)
  const [selectedStoryForRead, setSelectedStoryForRead] = useState<FeedStory | null>(null)
  const [initialOpenCommentsForRead, setInitialOpenCommentsForRead] = useState<boolean>(false)

  // Saved posts in profile (fetched from GET /api/posts/saved)
  const [savedPostsList, setSavedPostsList] = useState<FeedPostItem[]>([])
  const [loadingSavedPosts, setLoadingSavedPosts] = useState<boolean>(true)

  // Scheduled posts state
  const [scheduledPosts, setScheduledPosts] = useState<ScheduledPostItem[]>(DEFAULT_SCHEDULED_POSTS)

  // Draft posts state
  const [draftPosts, setDraftPosts] = useState(DEFAULT_DRAFT_POSTS)

  // Reschedule Modal state
  const [rescheduleModalPost, setRescheduleModalPost] = useState<ScheduledPostItem | null>(null)
  const [rescheduleTime, setRescheduleTime] = useState('')
  const [isRescheduling, setIsRescheduling] = useState(false)
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  // Load scheduled posts from backend
  useEffect(() => {
    let mounted = true
    async function loadScheduled() {
      try {
        const posts = await fetchScheduledPostsApi()
        if (mounted && Array.isArray(posts) && posts.length > 0) {
          setScheduledPosts(posts)
        }
      } catch {
        // Fallback to initial local items if offline
      }
    }
    void loadScheduled()
    return () => {
      mounted = false
    }
  }, [])

  // Load published posts from backend
  useEffect(() => {
    let mounted = true
    async function loadMyPosts() {
      try {
        const posts = await fetchMyPostsApi()
        if (mounted && Array.isArray(posts)) {
          setPublishedPosts(posts)
        }
      } catch (err) {
        console.error('Failed to load published posts:', err)
      } finally {
        if (mounted) setLoadingPosts(false)
      }
    }
    void loadMyPosts()
    return () => {
      mounted = false
    }
  }, [])

  // Load saved posts from backend (GET /api/posts/saved)
  useEffect(() => {
    let mounted = true
    async function loadSaved() {
      try {
        const posts = await fetchSavedPostsApi()
        if (mounted && Array.isArray(posts)) {
          setSavedPostsList(posts)
          const savedMap: Record<string, boolean> = {}
          posts.forEach((p) => {
            savedMap[p.id] = true
          })
          setSavedPosts((prev) => ({ ...savedMap, ...prev }))
        }
      } catch (err) {
        console.error('Failed to load saved posts:', err)
      } finally {
        if (mounted) setLoadingSavedPosts(false)
      }
    }
    void loadSaved()
    return () => {
      mounted = false
    }
  }, [])

  const handleOpenPost = (post: FeedPostItem, openComments = false) => {
    const story = mapFeedPostToStory(post)
    setInitialOpenCommentsForRead(openComments)
    setSelectedStoryForRead(story)
    window.location.hash = `post/${post.id}`
  }

  const handleClosePost = () => {
    setSelectedStoryForRead(null)
    setInitialOpenCommentsForRead(false)
    if (window.location.hash.startsWith('#post')) {
      window.location.hash = 'profile'
    }
  }

  // URL hash sync for direct post link (#post/123) and browser back/forward
  useEffect(() => {
    const handleHashSync = () => {
      const hash = window.location.hash
      if (hash.startsWith('#post/')) {
        const postId = hash.replace('#post/', '')
        const found =
          publishedPosts.find((p) => p.id === postId) ||
          savedPostsList.find((p) => p.id === postId)
        if (found) {
          setSelectedStoryForRead(mapFeedPostToStory(found))
        }
      } else if (selectedStoryForRead && !hash.startsWith('#post')) {
        setSelectedStoryForRead(null)
      }
    }

    handleHashSync()
    window.addEventListener('hashchange', handleHashSync)
    window.addEventListener('popstate', handleHashSync)
    return () => {
      window.removeEventListener('hashchange', handleHashSync)
      window.removeEventListener('popstate', handleHashSync)
    }
  }, [publishedPosts, savedPostsList, selectedStoryForRead])

  const handleToggleLike = async (id: string) => {
    let nextLiked = false
    setLikedPosts((prev) => {
      const currentLiked =
        prev[id] !== undefined
          ? prev[id]
          : Boolean(publishedPosts.find((p) => p.id === id)?.isLiked || savedPostsList.find((p) => p.id === id)?.isLiked)
      nextLiked = !currentLiked
      return { ...prev, [id]: nextLiked }
    })

    const updatePostLike = (p: FeedPostItem) => {
      if (p.id !== id) return p
      const currentCount = p.likeCount ?? 0
      const isCurrentlyLiked =
        likedPosts[id] !== undefined ? likedPosts[id] : Boolean(p.isLiked)
      const willBeLiked = !isCurrentlyLiked
      const diff = willBeLiked ? 1 : -1
      return {
        ...p,
        isLiked: willBeLiked,
        likeCount: Math.max(0, currentCount + diff),
      }
    }

    setPublishedPosts((prevList) => prevList.map(updatePostLike))
    setSavedPostsList((prevList) => prevList.map(updatePostLike))

    try {
      const res = await togglePostLikeApi(id)
      if (res && res.data && typeof res.data.liked === 'boolean') {
        const serverLiked = res.data.liked
        setLikedPosts((prev) => ({ ...prev, [id]: serverLiked }))
        const syncServerLike = (p: FeedPostItem) => {
          if (p.id !== id) return p
          return { ...p, isLiked: serverLiked }
        }
        setPublishedPosts((prevList) => prevList.map(syncServerLike))
        setSavedPostsList((prevList) => prevList.map(syncServerLike))
      }
    } catch {
      // ignore
    }
  }

  const handleToggleSave = async (id: string) => {
    const isCurrentlySaved = savedPosts[id] ?? savedPostsList.some((p) => p.id === id)
    const nextSaved = !isCurrentlySaved

    setSavedPosts((prev) => ({ ...prev, [id]: nextSaved }))

    if (!nextSaved) {
      setSavedPostsList((prev) => prev.filter((p) => p.id !== id))
    } else {
      const existing = publishedPosts.find((p) => p.id === id)
      if (existing && !savedPostsList.some((p) => p.id === id)) {
        setSavedPostsList((prev) => [{ ...existing, isSaved: true }, ...prev])
      }
    }

    try {
      const res = await toggleSavePostApi(id)
      const serverSaved = res?.data?.saved ?? res?.saved
      if (typeof serverSaved === 'boolean') {
        setSavedPosts((prev) => ({ ...prev, [id]: serverSaved }))
        if (!serverSaved) {
          setSavedPostsList((prev) => prev.filter((p) => p.id !== id))
        }
      }
    } catch {
      // ignore
    }
  }

  // Auto-dismiss toast
  useEffect(() => {
    if (!toastMessage) return
    const timer = setTimeout(() => setToastMessage(null), 3500)
    return () => clearTimeout(timer)
  }, [toastMessage])

  const handleOpenReschedule = (post: ScheduledPostItem) => {
    setRescheduleModalPost(post)
    const dateObj = new Date(post.scheduledAt)
    const localIso = new Date(dateObj.getTime() - dateObj.getTimezoneOffset() * 60000)
      .toISOString()
      .slice(0, 16)
    setRescheduleTime(localIso)
  }

  const handleConfirmReschedule = async () => {
    if (!rescheduleModalPost || !rescheduleTime) return
    setIsRescheduling(true)
    const targetIso = new Date(rescheduleTime).toISOString()
    try {
      await reschedulePostApi(rescheduleModalPost.id, targetIso)
    } catch {
      // offline fallback
    }
    setScheduledPosts((prev) =>
      prev.map((p) =>
        p.id === rescheduleModalPost.id
          ? { ...p, scheduledAt: targetIso, scheduleVersion: (p.scheduleVersion || 1) + 1 }
          : p
      )
    )
    setIsRescheduling(false)
    setToastMessage(`Post successfully rescheduled for ${new Date(targetIso).toLocaleDateString()} at ${new Date(targetIso).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`)
    setRescheduleModalPost(null)
  }

  const handleCancelSchedule = async (post: ScheduledPostItem) => {
    try {
      await cancelScheduledPostApi(post.id)
    } catch {
      // offline fallback
    }
    setScheduledPosts((prev) => prev.filter((p) => p.id !== post.id))
    setDraftPosts((prev) => [
      {
        id: post.id,
        title: post.title,
        subtitle: post.subtitle || '',
        content: post.content || '',
        updatedAt: 'Just now',
        readTime: '3 min read',
        status: 'DRAFT',
      },
      ...prev,
    ])
    setToastMessage(`Scheduled post reverted to draft`)
  }

  const handlePublishImmediately = async (post: ScheduledPostItem) => {
    try {
      await publishPostImmediatelyApi(post.id)
    } catch {
      // offline fallback
    }
    setScheduledPosts((prev) => prev.filter((p) => p.id !== post.id))
    const newPublishedItem: FeedPostItem = {
      id: post.id,
      title: post.title,
      subtitle: post.subtitle || '',
      content: post.content || '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      likeCount: 0,
      commentCount: 0,
      shareCount: 0,
      saveCount: 0,
      author: {
        id: user?.id || 'me',
        name: user?.name || 'Sunilkumar T',
        username: user?.username || 'sunilkumar',
        image: user?.image || DEFAULT_WHATSAPP_AVATAR,
      },
    }
    setPublishedPosts((prev) => [newPublishedItem, ...prev])
    setToastMessage(`Post "${post.title.slice(0, 30)}..." published immediately!`)
  }

  const handlePublishDraft = (draft: { id: string; title: string; subtitle?: string; content?: string }) => {
    setDraftPosts((prev) => prev.filter((d) => d.id !== draft.id))
    const newPublishedItem: FeedPostItem = {
      id: draft.id,
      title: draft.title,
      subtitle: draft.subtitle || '',
      content: draft.content || '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      likeCount: 0,
      commentCount: 0,
      shareCount: 0,
      saveCount: 0,
      author: {
        id: user?.id || 'me',
        name: user?.name || 'Sunilkumar T',
        username: user?.username || 'sunilkumar',
        image: user?.image || DEFAULT_WHATSAPP_AVATAR,
      },
    }
    setPublishedPosts((prev) => [newPublishedItem, ...prev])
    setToastMessage(`Draft "${draft.title.slice(0, 30)}..." published!`)
  }

  const handleDeleteDraft = (draftId: string) => {
    setDraftPosts((prev) => prev.filter((d) => d.id !== draftId))
    setToastMessage('Draft deleted.')
  }

  // Resolve profile attributes from /me route data, fallback to user prop or demo defaults
  const resolvedName =
    meProfile?.user?.name ||
    (meProfile?.firstName ? `${meProfile.firstName} ${meProfile.lastName || ''}`.trim() : null) ||
    (meProfile as any)?.name ||
    user?.name ||
    'SunilKumar T'

  const rawUsername =
    meProfile?.username ||
    meProfile?.user?.username ||
    user?.username ||
    'sunilkumart2695'
  const resolvedUsername = rawUsername.replace(/^@/, '')

  const resolvedEmail =
    meProfile?.email ||
    meProfile?.user?.email ||
    user?.email ||
    'sunilbe2006@gmail.com'

  const resolvedCollege =
    meProfile?.college?.name ||
    (typeof meProfile?.college === 'string' ? meProfile.college : null) ||
    (typeof user?.college === 'string' ? user.college : (user as any)?.college?.name) ||
    'PSG College of Technology'

  const resolvedDepartment =
    meProfile?.department?.name ||
    (typeof meProfile?.department === 'string' ? meProfile.department : null) ||
    (typeof user?.department === 'string' ? user.department : (user as any)?.department?.name) ||
    'Computer Science & Engineering'


  const rawYear =
    meProfile?.year ??
    (meProfile as any)?.profile?.year ??
    user?.year ??
    (user as any)?.profile?.year ??
    null

  const formatYearLabel = (yr: number | string | null | undefined): string => {
    if (!yr) return ''
    const num = typeof yr === 'string' ? parseInt(yr, 10) : yr
    if (num === 1) return '1st Year'
    if (num === 2) return '2nd Year'
    if (num === 3) return '3rd Year'
    if (num === 4) return 'Final Year'
    if (typeof yr === 'string' && yr.trim()) {
      const trimmed = yr.trim()
      if (/^\d+$/.test(trimmed)) {
        const n = parseInt(trimmed, 10)
        if (n === 1) return '1st Year'
        if (n === 2) return '2nd Year'
        if (n === 3) return '3rd Year'
        if (n === 4) return 'Final Year'
        return `${n}th Year`
      }
      return trimmed
    }
    return ''
  }

  const yearLabel = formatYearLabel(rawYear)
  const departmentWithYear = yearLabel
    ? `${resolvedDepartment}, ${yearLabel}`
    : resolvedDepartment

  const resolvedImage =
    meProfile?.profilePicture ||
    meProfile?.user?.image ||
    user?.image ||
    ''

  const hasCustomAvatar = Boolean(
    (meProfile?.profilePicture && !meProfile.profilePicture.includes('unsplash.com')) ||
    (meProfile?.user?.image && !meProfile.user.image.includes('unsplash.com')) ||
    (user?.image && !user.image.includes('unsplash.com'))
  )

  const resolvedHeadline =
    (meProfile as any)?.headline ||
    (user as any)?.headline ||
    `${departmentWithYear} @ ${resolvedCollege} | Backend & Systems Engineering`

  const resolvedLocation =
    meProfile?.location ||
    'Coimbatore, Tamil Nadu, India'

  const resolvedConnections =
    (meProfile as any)?.connectionsCount !== undefined
      ? `${(meProfile as any).connectionsCount} connections`
      : '137 connections'

  const profile = {
    name: resolvedName,
    username: resolvedUsername,
    email: resolvedEmail,
    role: meProfile?.user?.role || 'PhD Candidate',
    avatar: resolvedImage,
    hasCustomAvatar,
    university: resolvedCollege,
    department: resolvedDepartment,
    headline: resolvedHeadline,
    bio: meProfile?.bio || 'Building distributed consensus algorithms & neural infrastructure. Previously research intern @ Stanford AI Lab. Passionate about systems engineering, peer mentorship, and open-source tooling.',
    location: resolvedLocation,
    connections: resolvedConnections,
    openTo: 'Open to Research Collaborations & Summer \'26 Eng Roles',
    joined: 'Joined Sep 2023',
    stats: {
      friends:
        friendsCount !== null && friendsCount > 0
          ? `${friendsCount.toLocaleString()}`
          : (meProfile as any)?.friendsCount !== undefined
          ? String((meProfile as any).friendsCount)
          : (meProfile as any)?._count?.friends !== undefined
          ? String((meProfile as any)._count.friends)
          : (user as any)?.friendsCount !== undefined
          ? String((user as any).friendsCount)
          : '500+',
      academicNotes: String(publishedPosts.length),
      repos: '14',
    },
  }

  if (selectedStoryForRead) {
    return (
      <BlogReaderView
        story={selectedStoryForRead}
        isLiked={likedPosts[selectedStoryForRead.id] ?? !!selectedStoryForRead.isLiked}
        isSaved={savedPosts[selectedStoryForRead.id] ?? !!selectedStoryForRead.isSaved}
        onLike={() => handleToggleLike(selectedStoryForRead.id)}
        onToggleSave={() => handleToggleSave(selectedStoryForRead.id)}
        onBack={handleClosePost}
        currentUser={user}
        initialOpenComments={initialOpenCommentsForRead}
        onCommentAdded={(storyId, newCount) => {
          if (newCount !== undefined) {
            setPublishedPosts((prev) =>
              prev.map((p) =>
                p.id === storyId
                  ? { ...p, commentCount: newCount, totalComments: newCount }
                  : p
              )
            )
          }
        }}
      />
    )
  }

  return (
    <div className="lumina-ai-profile-root dark">
      {/* MAIN APPLICATION WORKSPACE */}
      <div className="ai-app-main-layout">
        {/* TOP BAR */}
        <header className="ai-top-bar">
          <div className="ai-top-bar-left">
            {onBackToDashboard && (
              <button
                type="button"
                className="ai-top-back-btn"
                onClick={() => onBackToDashboard('feed')}
                title="Back to Feed"
                aria-label="Back to Feed"
              >
                <ArrowLeft size={16} />
                <span>Back</span>
              </button>
            )}
          </div>

          <div className="ai-top-bar-right">
            {/* Search Input (Landing Page Search Bar) */}
            <div className={`saascn-search-pill ${searchFocused ? 'is-focused' : ''}`}>
              <Search className="w-3.5 h-3.5 saascn-search-icon" aria-hidden="true" />
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                className="saascn-search-input"
                aria-label="Search"
              />
              <div className="saascn-shortcut-badge" aria-hidden="true">
                <span className="saascn-key">⌘</span>
                <span className="saascn-key">K</span>
              </div>
            </div>

            {/* Bell Notifications */}
            <div className="ai-bell-wrap" style={{ position: 'relative' }}>
              <button
                type="button"
                className={`ai-top-icon-btn ai-bell-btn ${notificationsOpen ? 'is-active' : ''}`}
                onClick={() => setNotificationsOpen((prev) => !prev)}
                title="Notifications"
                aria-label="Notifications"
                aria-expanded={notificationsOpen}
              >
                {Icons.Bell}
                {unreadNotifCount > 0 && <span className="ai-bell-dot" />}
              </button>

              <NotificationDropdown
                isOpen={notificationsOpen}
                onClose={() => setNotificationsOpen(false)}
                onUnreadCountChange={setUnreadNotifCount}
              />
            </div>

            {/* + Create Button */}
            <button
              type="button"
              className="ai-create-action-btn"
              onClick={() => {
                window.location.hash = '#editor'
              }}
              title="Create new post"
              aria-label="Create new post"
            >
              <span className="ai-create-icon">{Icons.Plus}</span>
              <span className="ai-create-btn-label">Create</span>
            </button>

            {/* Top Right Mini Avatar */}
            <div className="ai-top-avatar-wrap">
              <img
                src={profile.avatar}
                alt={profile.name}
                className="ai-top-avatar-img"
              />
            </div>
          </div>
        </header>

        {/* 3. DUAL COLUMN PROFILE WORKSPACE */}
        <div className="ai-content-columns">
          {/* CENTER PROFILE STREAM */}
          <main className="ai-center-stream profile-center-col">
            {/* PROFILE HEADER HERO CARD (LinkedIn style top intro card) */}
            <div className="ai-profile-hero-card ai-linkedin-hero-card">
              {/* Cover Banner (Dashboard Cream Color) */}
              <div
                className="ai-linkedin-banner"
                style={
                  meProfile?.coverImage
                    ? { backgroundImage: `url(${meProfile.coverImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }
                    : undefined
                }
              >
                {/* Top Right Edit Banner Button */}
                <button
                  type="button"
                  className="ai-banner-edit-pencil-btn"
                  title="Edit background banner"
                  onClick={() => alert('Change profile banner')}
                >
                  <Pencil size={15} color="currentColor" strokeWidth={2.4} />
                </button>
              </div>

              {/* Avatar Row */}
              <div className="ai-linkedin-avatar-row">
                <div className="ai-linkedin-avatar-wrapper">
                  <div className={`ai-linkedin-avatar-circle ${loadingProfile ? 'is-loading' : ''}`}>
                    {loadingProfile ? (
                      <div className="ai-avatar-skeleton-shimmer">
                        <Loader2 className="ai-profile-avatar-spinner" size={28} />
                      </div>
                    ) : profile.hasCustomAvatar ? (
                      <img
                        src={profile.avatar}
                        alt={profile.name}
                        className="ai-profile-avatar-main"
                      />
                    ) : (
                      <LinkedInSilhouette />
                    )}
                  </div>
                </div>

                {/* Card Top Right Edit Button */}
                {!loadingProfile && (
                  <button
                    type="button"
                    className="ai-linkedin-card-edit-btn"
                    title="Edit intro"
                    onClick={() => alert('Edit intro')}
                  >
                    <Pencil size={20} color="currentColor" strokeWidth={2} />
                  </button>
                )}
              </div>

              {/* Main Info Grid */}
              {loadingProfile ? (
                <div className="ai-linkedin-info-grid ai-profile-loading-grid" aria-label="Loading profile details...">
                  {/* Left Column Skeleton */}
                  <div className="ai-linkedin-left-col">
                    <div className="ai-profile-skeleton-name" />
                    <div className="ai-profile-skeleton-headline" />
                    <div className="ai-profile-skeleton-headline-sub" />
                    <div className="ai-profile-skeleton-meta" />
                    <div className="ai-profile-skeleton-stats" />
                  </div>
                </div>
              ) : (
                <div className="ai-linkedin-info-grid">
                  {/* Left Column */}
                  <div className="ai-linkedin-left-col">
                    {/* Name + Blue Tick Verified Badge */}
                    <div className="ai-linkedin-name-row">
                      <h1 className="ai-linkedin-name">{profile.name}</h1>
                      <span
                        className="ai-linkedin-blue-tick"
                        title="Verified Student Profile"
                        aria-label="Verified Profile"
                      >
                        <BadgeCheck
                          size={21}
                          fill="#FFFFFF"
                          color="#191919"
                          strokeWidth={2.2}
                        />
                      </span>
                    </div>

                    {/* Headline */}
                    <p className="ai-linkedin-headline">
                      {profile.headline}
                    </p>

                    {/* Location & Contact info */}
                    <div className="ai-linkedin-location-row">
                      <span className="ai-linkedin-location">{profile.location}</span>
                      <span className="ai-linkedin-dot">·</span>
                      <a
                        href="#contact-info"
                        className="ai-linkedin-contact-link"
                        onClick={(e) => {
                          e.preventDefault()
                          alert(`Contact Info:\nName: ${profile.name}\nEmail: ${profile.email}\nUniversity: ${profile.university}\nLocation: ${profile.location}`)
                        }}
                      >
                        Contact info
                      </a>
                    </div>

                    {/* Friends */}
                    <div className="ai-linkedin-connections-row">
                      <button
                        type="button"
                        className="ai-linkedin-connections-link ai-friends-profile-btn"
                        onClick={(e) => {
                          e.preventDefault()
                          setActiveTab('friends')
                          const tabsEl = document.querySelector('.ai-profile-tabs-card')
                          if (tabsEl) {
                            tabsEl.scrollIntoView({ behavior: 'smooth' })
                          }
                        }}
                        title="Click to view friends"
                      >
                        <span className="ai-followers-count">
                          {friendsCount !== null ? friendsCount : friendsList.length}
                        </span>{' '}
                        {friendsCount === 1 || friendsList.length === 1 ? 'friend' : 'friends'}
                      </button>
                    </div>
                  </div>
                </div>
              )}

            </div>

            {/* Navigation Tabs Card */}
            <div className="ai-profile-tabs-card">
              <div className="ai-profile-tabs-bar">
                <button
                  type="button"
                  className={`ai-profile-tab ${activeTab === 'posts' ? 'is-active' : ''}`}
                  onClick={() => setActiveTab('posts')}
                >
                  <FileText size={14} />
                  <span>Posts</span>
                </button>
                <button
                  type="button"
                  className={`ai-profile-tab ${activeTab === 'friends' ? 'is-active' : ''}`}
                  onClick={() => setActiveTab('friends')}
                >
                  <Users size={14} />
                  <span>Friends</span>
                </button>
                <button
                  type="button"
                  className={`ai-profile-tab ai-profile-blurred ${activeTab === 'about' ? 'is-active' : ''}`}
                  onClick={() => setActiveTab('about')}
                >
                  <span>About</span>
                </button>
                <button
                  type="button"
                  className={`ai-profile-tab ai-profile-blurred ${activeTab === 'projects' ? 'is-active' : ''}`}
                  onClick={() => setActiveTab('projects')}
                >
                  <span>Projects</span>
                  <span className="ai-tab-badge-num">6</span>
                </button>
                <button
                  type="button"
                  className={`ai-profile-tab ai-profile-blurred ${activeTab === 'achievements' ? 'is-active' : ''}`}
                  onClick={() => setActiveTab('achievements')}
                >
                  <span>Achievements &amp; Grants</span>
                </button>
                <button
                  type="button"
                  className={`ai-profile-tab ai-profile-blurred ${activeTab === 'communities' ? 'is-active' : ''}`}
                  onClick={() => setActiveTab('communities')}
                >
                  <span>Communities</span>
                  <span className="ai-tab-badge-num">8</span>
                </button>
                <button
                  type="button"
                  className={`ai-profile-tab ${activeTab === 'saved' ? 'is-active' : ''}`}
                  onClick={() => setActiveTab('saved')}
                >
                  <Bookmark size={14} />
                  <span>Saved</span>
                </button>
              </div>
            </div>

            {/* ACTIVE TAB: POSTS */}
            {activeTab === 'posts' && (
              <>
                {/* Minimal Post Composer Entry */}
                <div
                  className="ai-minimal-composer-card"
                  onClick={handleOpenComposer}
                  role="button"
                  tabIndex={0}
                  title="Share something with your campus... (Opens visual editor)"
                >
                  <img
                    src={profile.avatar}
                    alt={profile.name}
                    className="ai-minimal-composer-avatar"
                  />
                  <div className="ai-minimal-composer-input-area">
                    <span className="ai-minimal-composer-placeholder">
                      Share something with your campus...
                    </span>
                  </div>
                  <button
                    type="button"
                    className="ai-minimal-post-btn"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleOpenComposer()
                    }}
                  >
                    <Plus size={14} strokeWidth={2.5} />
                    <span>Post</span>
                  </button>
                </div>

                {/* POSTS SUB-TITLE & SUB-FILTERS (ALL, DRAFT, SCHEDULED) */}
                <div className="ai-posts-subbar">
                  <div className="ai-posts-subbar-left">
                    <div className="ai-posts-subtitle-wrap">
                      <h2 className="ai-posts-subtitle">Posts</h2>
                    </div>

                    <div className="ai-post-subfilters" role="tablist" aria-label="Posts filter">
                      <button
                        type="button"
                        role="tab"
                        aria-selected={postSubFilter === 'all'}
                        className={`ai-subfilter-btn ${postSubFilter === 'all' ? 'is-active' : ''}`}
                        onClick={() => setPostSubFilter('all')}
                      >
                        <span>All</span>
                        <span className="ai-subfilter-count">{publishedPosts.length}</span>
                      </button>
                      <button
                        type="button"
                        role="tab"
                        aria-selected={postSubFilter === 'draft'}
                        className={`ai-subfilter-btn ${postSubFilter === 'draft' ? 'is-active' : ''}`}
                        onClick={() => setPostSubFilter('draft')}
                      >
                        <span>Draft</span>
                        <span className="ai-subfilter-count">{draftPosts.length}</span>
                      </button>
                      <button
                        type="button"
                        role="tab"
                        aria-selected={postSubFilter === 'scheduled'}
                        className={`ai-subfilter-btn ${postSubFilter === 'scheduled' ? 'is-active' : ''}`}
                        onClick={() => setPostSubFilter('scheduled')}
                      >
                        <span>Scheduled</span>
                        <span className="ai-subfilter-count">{scheduledPosts.length}</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* SUB-VIEW 1: ALL POSTS */}
                {postSubFilter === 'all' && (
                  <div className="ai-feed-stream-list">
                    {loadingPosts ? (
                      <div className="ai-feed-loader-container" role="status" aria-label="Loading posts">
                        <div className="ai-feed-spinner" />
                      </div>
                    ) : publishedPosts.length === 0 ? (
                      <div className="ai-empty-tab-state">
                        <FileText size={36} className="ai-empty-icon" />
                        <h3 className="ai-empty-title">No posts yet</h3>
                        <p className="ai-empty-desc">
                          You haven&apos;t published any posts or academic notes yet. Stories you write and publish will appear here.
                        </p>
                        <button type="button" className="ai-empty-action-btn" onClick={handleOpenComposer}>
                          <Plus size={15} />
                          <span>Create Post</span>
                        </button>
                      </div>
                    ) : (
                      publishedPosts.map((post) => {
                        const baseLikes = post.likeCount ?? 0
                        const isPostLiked = likedPosts[post.id] ?? !!post.isLiked
                        const isPostSaved = savedPosts[post.id] ?? !!post.isSaved
                        const likeDiff =
                          likedPosts[post.id] !== undefined
                            ? likedPosts[post.id]
                              ? post.isLiked ? 0 : 1
                              : post.isLiked ? -1 : 0
                            : 0
                        const displayLikes = Math.max(0, baseLikes + likeDiff)
                        const rawUsername = post.author?.username ? post.author.username.replace(/^@/, '') : null
                        const postAuthor = rawUsername ? `@${rawUsername}` : (post.author?.name || profile.name || 'Student')
                        const postTitle = post.title || 'Untitled Post'
                        const postSubtitle =
                          post.subtitle ||
                          (typeof post.content === 'string' && post.content.trim() !== postTitle.trim()
                            ? post.content.trim()
                            : null) ||
                          (Array.isArray(post.blocks) &&
                            post.blocks.find(
                              (b: any) =>
                                (b.type === 'paragraph' || b.type === 'text') &&
                                b.content &&
                                typeof b.content === 'string' &&
                                b.content.trim() !== postTitle.trim()
                            )?.content) ||
                          null

                        // Resolve best thumbnail image
                        const imgUrl =
                          post.coverImage ||
                          (post.media && post.media.length > 0 && post.media[0].url) ||
                          (Array.isArray(post.blocks) &&
                            (post.blocks.find(
                              (b: any) =>
                                (b.type === 'image' || b.type === 'unsplash') &&
                                (b.metadata?.url || b.metadata?.publicUrl || (typeof b.content === 'string' && b.content.startsWith('http')))
                            )?.metadata?.url ||
                              post.blocks.find(
                                (b: any) =>
                                  (b.type === 'image' || b.type === 'unsplash') &&
                                  (b.metadata?.url || b.metadata?.publicUrl || (typeof b.content === 'string' && b.content.startsWith('http')))
                              )?.metadata?.publicUrl ||
                              post.blocks.find(
                                (b: any) =>
                                  (b.type === 'image' || b.type === 'unsplash') &&
                                  (b.metadata?.url || b.metadata?.publicUrl || (typeof b.content === 'string' && b.content.startsWith('http')))
                              )?.content)) ||
                          null

                        return (
                          <article
                            key={post.id}
                            className="ai-feed-post-card"
                            onClick={() => handleOpenPost(post)}
                            role="button"
                            tabIndex={0}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault()
                                handleOpenPost(post)
                              }
                            }}
                          >
                            {/* Left Content Column */}
                            <div className="ai-post-main-content">
                              {/* 1. Header Byline Line */}
                              <div className="ai-post-header-line">
                                <img
                                  src={post.author?.image || profile.avatar || DEFAULT_WHATSAPP_AVATAR}
                                  alt={postAuthor}
                                  className="ai-post-author-mini-avatar"
                                  onError={(e) => {
                                    e.currentTarget.src = DEFAULT_WHATSAPP_AVATAR
                                  }}
                                />
                                <div className="ai-post-byline">
                                  <span className="ai-byline-author">{postAuthor}</span>
                                  <span className="ai-byline-dot">·</span>
                                  <span className="ai-byline-date">{formatPostDate(post.createdAt)}</span>
                                </div>
                              </div>

                              {/* 2. Post Title & Subtitle */}
                              <h3 className="ai-post-title">
                                {postTitle}
                              </h3>
                              {postSubtitle && (
                                <p className="ai-post-subtitle">
                                  {postSubtitle}
                                </p>
                              )}

                              {/* 3. Post Actions & Stats Footer */}
                              <div className="ai-post-footer">
                                <div className="ai-post-footer-left">
                                  <button
                                    type="button"
                                    className={`ai-post-stat-btn ${isPostLiked ? 'is-liked' : ''}`}
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      handleToggleLike(post.id)
                                    }}
                                    title={isPostLiked ? 'Unlike' : 'Like'}
                                    aria-label={isPostLiked ? 'Liked post' : 'Like post'}
                                  >
                                    <Heart
                                      size={16}
                                      fill={isPostLiked ? 'currentColor' : 'none'}
                                      color="currentColor"
                                      className={`ai-heart-icon ${isPostLiked ? 'is-liked' : ''}`}
                                    />
                                    <span>{displayLikes}</span>
                                  </button>
                                  <button
                                    type="button"
                                    className="ai-post-stat-btn"
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      handleOpenPost(post, true)
                                    }}
                                    title="Responses"
                                  >
                                    <MessageSquare size={15} />
                                    <span>{post.commentCount ?? 0}</span>
                                  </button>
                                  <button
                                    type="button"
                                    className="ai-post-stat-btn"
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      const postUrl = `${window.location.origin}${window.location.pathname}#post/${post.id}`
                                      navigator.clipboard?.writeText(postUrl)
                                      alert('Post link copied to clipboard!')
                                    }}
                                    title="Repost"
                                  >
                                    <Repeat size={15} />
                                    <span>{post.shareCount ?? 0}</span>
                                  </button>
                                </div>

                                <div className="ai-post-footer-right">
                                  <button
                                    type="button"
                                    className={`ai-post-icon-btn ${isPostSaved ? 'is-saved' : ''}`}
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      handleToggleSave(post.id)
                                    }}
                                    title={isPostSaved ? 'Remove from bookmarks' : 'Save story'}
                                    aria-label={isPostSaved ? 'Remove from bookmarks' : 'Save story'}
                                  >
                                    <Bookmark size={17} strokeWidth={2} fill={isPostSaved ? 'currentColor' : 'none'} />
                                  </button>
                                </div>
                              </div>
                            </div>

                            {/* 4. Right Thumbnail Preview */}
                            {imgUrl && (
                              <div className="ai-post-thumbnail-wrap">
                                <img
                                  src={imgUrl}
                                  alt={post.title || 'Post preview'}
                                  className="ai-post-thumbnail-img"
                                  loading="lazy"
                                />
                              </div>
                            )}
                          </article>
                        )
                      })
                    )}
                  </div>
                )}

                {/* SUB-VIEW 2: DRAFT POSTS */}
                {postSubFilter === 'draft' && (
                  <div className="ai-feed-stream-list">
                    {draftPosts.length === 0 ? (
                      <div className="ai-empty-tab-state">
                        <FileText size={36} className="ai-empty-icon" />
                        <h3 className="ai-empty-title">No drafts yet</h3>
                        <p className="ai-empty-desc">
                          Any unfinished research notes or stories you save will appear here for you to refine and publish.
                        </p>
                        <button type="button" className="ai-empty-action-btn" onClick={handleOpenComposer}>
                          <Plus size={15} />
                          <span>Start New Draft</span>
                        </button>
                      </div>
                    ) : (
                      draftPosts.map((draft) => (
                        <article key={draft.id} className="ai-feed-post-card ai-draft-card">
                          <div className="ai-post-header">
                            <div className="ai-post-author-wrap">
                              <img
                                src={profile.avatar}
                                alt={profile.name}
                                className="ai-post-author-avatar"
                              />
                              <div className="ai-post-author-info">
                                <div className="ai-author-name-row">
                                  <span className="ai-draft-badge">DRAFT</span>
                                  <span className="ai-author-sep">•</span>
                                  <span className="ai-author-time">Last edited {draft.updatedAt}</span>
                                  <span className="ai-author-sep">•</span>
                                  <span className="ai-author-time">{draft.readTime}</span>
                                </div>
                                <div className="ai-author-sub">
                                  <span>Saved in Lumina Author Workspace</span>
                                </div>
                              </div>
                            </div>
                            <button
                              type="button"
                              className="ai-post-more-btn"
                              title="Delete draft"
                              onClick={() => handleDeleteDraft(draft.id)}
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>

                          <div className="ai-post-body">
                            <h4 className="ai-post-title">{draft.title}</h4>
                            <p className="ai-post-subtitle-text">{draft.subtitle}</p>
                            <p className="ai-post-paragraph">{draft.content}</p>
                          </div>

                          <div className="ai-card-actions-row">
                            <div className="ai-card-actions-left">
                              <button
                                type="button"
                                className="ai-action-primary-btn"
                                onClick={handleOpenComposer}
                              >
                                <SquarePen size={14} />
                                <span>Continue Editing</span>
                              </button>
                              <button
                                type="button"
                                className="ai-action-secondary-btn"
                                onClick={() => handlePublishDraft(draft)}
                              >
                                <Check size={14} />
                                <span>Publish Now</span>
                              </button>
                            </div>
                            <span className="ai-draft-status-indicator">Unpublished draft</span>
                          </div>
                        </article>
                      ))
                    )}
                  </div>
                )}

                {/* SUB-VIEW 3: SCHEDULED POSTS */}
                {postSubFilter === 'scheduled' && (
                  <div className="ai-feed-stream-list">
                    {scheduledPosts.length === 0 ? (
                      <div className="ai-empty-tab-state">
                        <Calendar size={36} className="ai-empty-icon" />
                        <h3 className="ai-empty-title">No scheduled posts</h3>
                        <p className="ai-empty-desc">
                          You don't have any upcoming posts scheduled for automated campus delivery.
                        </p>
                        <button type="button" className="ai-empty-action-btn" onClick={handleOpenComposer}>
                          <Plus size={15} />
                          <span>Write &amp; Schedule</span>
                        </button>
                      </div>
                    ) : (
                      scheduledPosts.map((post) => (
                        <article key={post.id} className="ai-feed-post-card ai-scheduled-card">
                          <div className="ai-post-header">
                            <div className="ai-post-author-wrap">
                              <img
                                src={profile.avatar}
                                alt={profile.name}
                                className="ai-post-author-avatar"
                              />
                              <div className="ai-post-author-info">
                                <div className="ai-author-name-row">
                                  <span className="ai-scheduled-badge">
                                    <Clock size={12} />
                                    <span>SCHEDULED</span>
                                  </span>
                                  <span className="ai-author-sep">•</span>
                                  <span className="ai-scheduled-time-label">
                                    {new Date(post.scheduledAt).toLocaleDateString('en-US', {
                                      weekday: 'short',
                                      month: 'short',
                                      day: 'numeric',
                                      year: 'numeric',
                                      hour: 'numeric',
                                      minute: '2-digit',
                                    })}
                                  </span>
                                </div>
                                <div className="ai-author-sub">
                                  <span>Target: Stanford AI Lab • Public Campus Feed</span>
                                </div>
                              </div>
                            </div>
                            <span className="ai-schedule-ver-pill">v{post.scheduleVersion || 1}</span>
                          </div>

                          <div className="ai-post-body">
                            <h4 className="ai-post-title">{post.title}</h4>
                            {post.subtitle && <p className="ai-post-subtitle-text">{post.subtitle}</p>}
                            {post.content && <p className="ai-post-paragraph">{post.content}</p>}
                          </div>

                          <div className="ai-card-actions-row">
                            <div className="ai-card-actions-left">
                              <button
                                type="button"
                                className="ai-action-primary-btn"
                                onClick={() => handleOpenReschedule(post)}
                              >
                                <Clock size={14} />
                                <span>Reschedule</span>
                              </button>
                              <button
                                type="button"
                                className="ai-action-secondary-btn"
                                onClick={() => handlePublishImmediately(post)}
                              >
                                <Send size={14} />
                                <span>Publish Immediately</span>
                              </button>
                              <button
                                type="button"
                                className="ai-action-danger-btn"
                                onClick={() => handleCancelSchedule(post)}
                              >
                                <FileText size={14} />
                                <span>Revert to Draft</span>
                              </button>
                            </div>
                            <span className="ai-scheduled-queue-indicator">Queued for automated delivery</span>
                          </div>
                        </article>
                      ))
                    )}
                  </div>
                )}
              </>
            )}

            {/* ACTIVE TAB: ABOUT (Blurred / Hidden) */}
            {activeTab === 'about' && (
              <div className="ai-feed-stream-list ai-blurred-section" aria-hidden="true">
                <div className="ai-profile-section-card">
                  <h3 className="ai-section-card-title">About {profile.name}</h3>
                  <p className="ai-section-card-desc">
                    {profile.bio}
                  </p>
                  <p className="ai-section-card-desc">
                    Focusing on high-performance distributed systems, state-machine replication protocols,
                    and hardware-software co-design for AI training clusters.
                  </p>
                </div>

                <div className="ai-profile-section-card">
                  <h3 className="ai-section-card-title">Research Focus &amp; Interests</h3>
                  <div className="ai-tech-pills-wrap">
                    <span className="ai-tech-pill is-primary">Distributed Consensus</span>
                    <span className="ai-tech-pill is-primary">Fault-Tolerant Systems</span>
                    <span className="ai-tech-pill">Memory Hierarchy Optimization</span>
                    <span className="ai-tech-pill">Neural Network Infrastructure</span>
                    <span className="ai-tech-pill">PCIe Gen5 Direct Memory Access</span>
                    <span className="ai-tech-pill">Formal Protocol Verification</span>
                  </div>
                </div>

                <div className="ai-profile-section-card">
                  <h3 className="ai-section-card-title">Academic Background</h3>
                  <div className="ai-edu-header">
                    <strong className="ai-edu-school">Stanford University</strong>
                    <span className="ai-edu-gpa">GPA 3.96</span>
                  </div>
                  <div className="ai-edu-degree">B.S. &amp; M.S. in Computer Science (Systems &amp; AI Track)</div>
                  <div className="ai-edu-sub">Expected Graduation: June 2026</div>
                </div>
              </div>
            )}

            {/* ACTIVE TAB: PROJECTS (Blurred / Hidden) */}
            {activeTab === 'projects' && (
              <div className="ai-feed-stream-list ai-blurred-section" aria-hidden="true">
                <div className="ai-grid-cards-2col">
                  <div className="ai-interactive-item-card">
                    <div className="ai-pinned-badge-row">
                      <span className="ai-pinned-tag">RUST</span>
                      <span className="ai-pinned-sep">•</span>
                      <span className="ai-pinned-sub">★ 420 stars</span>
                    </div>
                    <strong className="ai-card-title">ConsensusCore</strong>
                    <p className="ai-section-card-desc">
                      Zero-dependency, zero-alloc Raft consensus engine designed for ultra-low latency clusters.
                    </p>
                  </div>

                  <div className="ai-interactive-item-card">
                    <div className="ai-pinned-badge-row">
                      <span className="ai-pinned-tag">C++20</span>
                      <span className="ai-pinned-sep">•</span>
                      <span className="ai-pinned-sub">★ 184 stars</span>
                    </div>
                    <strong className="ai-card-title">Neural-Prefetch-PCIe</strong>
                    <p className="ai-section-card-desc">
                      Graph neural network driven memory prefetcher operating directly on PCIe 5.0 root complexes.
                    </p>
                  </div>

                  <div className="ai-interactive-item-card">
                    <div className="ai-pinned-badge-row">
                      <span className="ai-pinned-tag">TYPESCRIPT</span>
                      <span className="ai-pinned-sep">•</span>
                      <span className="ai-pinned-sub">★ 312 stars</span>
                    </div>
                    <strong className="ai-card-title">HackCampus Portal</strong>
                    <p className="ai-section-card-desc">
                      Full-stack real-time platform facilitating judging and project submissions for 1,200+ collegiate builders.
                    </p>
                  </div>

                  <div className="ai-interactive-item-card">
                    <div className="ai-pinned-badge-row">
                      <span className="ai-pinned-tag">EBPF</span>
                      <span className="ai-pinned-sep">•</span>
                      <span className="ai-pinned-sub">★ 95 stars</span>
                    </div>
                    <strong className="ai-card-title">Linux-eBPF-Trace</strong>
                    <p className="ai-section-card-desc">
                      Kernel-level packet observability agent measuring microsecond RPC jitter in containerized workloads.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* ACTIVE TAB: ACHIEVEMENTS & GRANTS (Blurred / Hidden) */}
            {activeTab === 'achievements' && (
              <div className="ai-feed-stream-list ai-blurred-section" aria-hidden="true">
                <div className="ai-grant-award-card">
                  <div className="ai-grant-left">
                    <div className="ai-grant-icon-box">
                      {Icons.GraduationCap}
                    </div>
                    <div>
                      <strong className="ai-grant-title">Stanford VPUE Major Grant</strong>
                      <p className="ai-grant-sub">
                        Full research funding for Autonomous Multi-Agent Reasoning Protocols (2024-2025)
                      </p>
                    </div>
                  </div>
                  <span className="ai-grant-amount-badge">$12,000 Award</span>
                </div>

                <div className="ai-grant-award-card">
                  <div className="ai-grant-left">
                    <div className="ai-grant-icon-box">
                      <Award size={18} />
                    </div>
                    <div>
                      <strong className="ai-grant-title">SysML Workshop &apos;24 Best Paper Honorable Mention</strong>
                      <p className="ai-grant-sub">
                        Adaptive Memory Prefetching via Graph Neural Networks on PCIe 5.0
                      </p>
                    </div>
                  </div>
                  <span className="ai-grant-amount-badge">Research Award</span>
                </div>

                <div className="ai-grant-award-card">
                  <div className="ai-grant-left">
                    <div className="ai-grant-icon-box">
                      <Sparkles size={18} />
                    </div>
                    <div>
                      <strong className="ai-grant-title">Dean&apos;s Honor List</strong>
                      <p className="ai-grant-sub">
                        Stanford School of Engineering (Academic Years 2022-2025)
                      </p>
                    </div>
                  </div>
                  <span className="ai-grant-amount-badge">Honors</span>
                </div>
              </div>
            )}

            {/* ACTIVE TAB: COMMUNITIES (Blurred / Hidden) */}
            {activeTab === 'communities' && (
              <div className="ai-feed-stream-list ai-blurred-section" aria-hidden="true">
                <div className="ai-grid-cards-2col">
                  <div className="ai-interactive-item-card">
                    <strong className="ai-card-title">Stanford Systems Reading Group</strong>
                    <span className="ai-pinned-sub">Weekly paper discussions on distributed storage and OS kernel internals</span>
                    <span className="ai-role-pill" style={{ width: 'fit-content', marginTop: '6px' }}>Core Member</span>
                  </div>

                  <div className="ai-interactive-item-card">
                    <strong className="ai-card-title">HackCampus Stanford</strong>
                    <span className="ai-pinned-sub">Directing annual flagship 1,200+ builder hackathon</span>
                    <span className="ai-role-pill" style={{ width: 'fit-content', marginTop: '6px' }}>Lead Organizer</span>
                  </div>

                  <div className="ai-interactive-item-card">
                    <strong className="ai-card-title">Stanford AI Lab Builders</strong>
                    <span className="ai-pinned-sub">Cross-disciplinary research group building open source foundation models</span>
                    <span className="ai-role-pill" style={{ width: 'fit-content', marginTop: '6px' }}>Research Fellow</span>
                  </div>

                  <div className="ai-interactive-item-card">
                    <strong className="ai-card-title">Rust Campus Guild</strong>
                    <span className="ai-pinned-sub">Systems programming workshops, crate code reviews, and mentorship</span>
                    <span className="ai-role-pill" style={{ width: 'fit-content', marginTop: '6px' }}>Founder</span>
                  </div>
                </div>
              </div>
            )}

            {/* ACTIVE TAB: SAVED */}
            {activeTab === 'saved' && (
              <div className="ai-feed-stream-list">
                <div className="ai-posts-subbar">
                  <div className="ai-posts-subtitle-wrap">
                    <h2 className="ai-posts-subtitle">Saved Items</h2>
                    <span className="ai-posts-subtitle-count">
                      ({savedPostsList.length})
                    </span>
                  </div>
                </div>

                {loadingSavedPosts ? (
                  <div className="ai-feed-loading-state" style={{ padding: '36px 0', textAlign: 'center', color: 'rgba(255, 255, 255, 0.6)' }}>
                    <Loader2 className="ai-profile-avatar-spinner" size={28} style={{ margin: '0 auto 12px' }} />
                    <p style={{ margin: 0, fontSize: '14px' }}>Loading saved posts...</p>
                  </div>
                ) : savedPostsList.length === 0 ? (
                  <div className="ai-empty-tab-state">
                    <Bookmark size={36} className="ai-empty-icon" />
                    <h3 className="ai-empty-title">No saved stories yet</h3>
                    <p className="ai-empty-desc">
                      Click the bookmark icon on any post or academic note to save it here for quick reference.
                    </p>
                  </div>
                ) : (
                  savedPostsList.map((post) => {
                    const baseLikes = post.likeCount ?? 0
                    const isPostLiked = likedPosts[post.id] ?? !!post.isLiked
                    const isPostSaved = savedPosts[post.id] ?? true
                      const likeDiff =
                        likedPosts[post.id] !== undefined
                          ? likedPosts[post.id]
                            ? post.isLiked ? 0 : 1
                            : post.isLiked ? -1 : 0
                          : 0
                      const displayLikes = Math.max(0, baseLikes + likeDiff)
                      const rawUsername = post.author?.username ? post.author.username.replace(/^@/, '') : null
                      const postAuthor = rawUsername ? `@${rawUsername}` : (post.author?.name || profile.name || 'Student')
                      const postTitle = post.title || 'Untitled Post'
                      const postSubtitle =
                        post.subtitle ||
                        (typeof post.content === 'string' && post.content.trim() !== postTitle.trim()
                          ? post.content.trim()
                          : null) ||
                        (Array.isArray(post.blocks) &&
                          post.blocks.find(
                            (b: any) =>
                              (b.type === 'paragraph' || b.type === 'text') &&
                              b.content &&
                              typeof b.content === 'string' &&
                              b.content.trim() !== postTitle.trim()
                          )?.content) ||
                        null

                      const imgUrl =
                        post.coverImage ||
                        (post.media && post.media.length > 0 && post.media[0].url) ||
                        (Array.isArray(post.blocks) &&
                          (post.blocks.find(
                            (b: any) =>
                              (b.type === 'image' || b.type === 'unsplash') &&
                              (b.metadata?.url || b.metadata?.publicUrl || (typeof b.content === 'string' && b.content.startsWith('http')))
                          )?.metadata?.url ||
                            post.blocks.find(
                              (b: any) =>
                                (b.type === 'image' || b.type === 'unsplash') &&
                                (b.metadata?.url || b.metadata?.publicUrl || (typeof b.content === 'string' && b.content.startsWith('http')))
                            )?.metadata?.publicUrl ||
                            post.blocks.find(
                              (b: any) =>
                                (b.type === 'image' || b.type === 'unsplash') &&
                                (b.metadata?.url || b.metadata?.publicUrl || (typeof b.content === 'string' && b.content.startsWith('http')))
                            )?.content)) ||
                        null

                      return (
                        <article
                          key={post.id}
                          className="ai-feed-post-card"
                          onClick={() => handleOpenPost(post)}
                          role="button"
                          tabIndex={0}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault()
                              handleOpenPost(post)
                            }
                          }}
                        >
                          <div className="ai-post-main-content">
                            <div className="ai-post-header-line">
                              <img
                                src={post.author?.image || profile.avatar || DEFAULT_WHATSAPP_AVATAR}
                                alt={postAuthor}
                                className="ai-post-author-mini-avatar"
                                onError={(e) => {
                                  e.currentTarget.src = DEFAULT_WHATSAPP_AVATAR
                                }}
                              />
                              <div className="ai-post-byline">
                                <span className="ai-byline-author">{postAuthor}</span>
                                <span className="ai-byline-dot">·</span>
                                <span className="ai-byline-date">{formatPostDate(post.createdAt)}</span>
                              </div>
                            </div>

                            <h3 className="ai-post-title">{postTitle}</h3>
                            {postSubtitle && <p className="ai-post-subtitle">{postSubtitle}</p>}

                            <div className="ai-post-footer">
                              <div className="ai-post-footer-left">
                                <button
                                  type="button"
                                  className={`ai-post-stat-btn ${isPostLiked ? 'is-liked' : ''}`}
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    handleToggleLike(post.id)
                                  }}
                                  title={isPostLiked ? 'Unlike' : 'Like'}
                                  aria-label={isPostLiked ? 'Liked post' : 'Like post'}
                                >
                                  <Heart
                                    size={16}
                                    fill={isPostLiked ? 'currentColor' : 'none'}
                                    color="currentColor"
                                    className={`ai-heart-icon ${isPostLiked ? 'is-liked' : ''}`}
                                  />
                                  <span>{displayLikes}</span>
                                </button>
                                <button
                                  type="button"
                                  className="ai-post-stat-btn"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    handleOpenPost(post, true)
                                  }}
                                  title="Responses"
                                >
                                  <MessageSquare size={15} />
                                  <span>{post.commentCount ?? 0}</span>
                                </button>
                                <button
                                  type="button"
                                  className="ai-post-stat-btn"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    const postUrl = `${window.location.origin}${window.location.pathname}#post/${post.id}`
                                    navigator.clipboard?.writeText(postUrl)
                                    alert('Post link copied to clipboard!')
                                  }}
                                  title="Repost"
                                >
                                  <Repeat size={15} />
                                  <span>{post.shareCount ?? 0}</span>
                                </button>
                              </div>

                              <div className="ai-post-footer-right">
                                <button
                                  type="button"
                                  className={`ai-post-icon-btn ${isPostSaved ? 'is-saved' : ''}`}
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    handleToggleSave(post.id)
                                  }}
                                  title={isPostSaved ? 'Remove from bookmarks' : 'Save story'}
                                  aria-label={isPostSaved ? 'Remove from bookmarks' : 'Save story'}
                                >
                                  <Bookmark size={17} strokeWidth={2} fill={isPostSaved ? 'currentColor' : 'none'} />
                                </button>
                              </div>
                            </div>
                          </div>

                          {imgUrl && (
                            <div className="ai-post-thumbnail-wrap">
                              <img
                                src={imgUrl}
                                alt={post.title || 'Post preview'}
                                className="ai-post-thumbnail-img"
                                loading="lazy"
                              />
                            </div>
                          )}
                        </article>
                      )
                    })
                )}
              </div>
            )}

            {/* ACTIVE TAB: FRIENDS */}
            {activeTab === 'friends' && (
              <div className="ai-profile-friends-tab-view">
                <div className="ai-friends-tab-card">
                  <div className="ai-friends-tab-header">
                    <div>
                      <h3 className="ai-friends-tab-title">Friends</h3>
                      <p className="ai-friends-tab-subtitle">
                        Connected classmates and peer collaborators
                      </p>
                    </div>
                    <div className="ai-friends-search-bar tab-search">
                      <Search size={15} className="ai-friends-search-icon" />
                      <input
                        type="text"
                        className="ai-friends-search-input"
                        placeholder="Search friends..."
                        value={friendsSearchQuery}
                        onChange={(e) => setFriendsSearchQuery(e.target.value)}
                      />
                      {friendsSearchQuery && (
                        <button
                          type="button"
                          className="ai-friends-search-clear"
                          onClick={() => setFriendsSearchQuery('')}
                          aria-label="Clear search"
                        >
                          <X size={14} />
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="ai-friends-list-body">
                    {isFriendsLoading ? (
                      <div className="ai-friends-empty-state">
                        <Loader2 size={24} className="animate-spin" />
                        <p className="ai-friends-empty-title">Loading friends...</p>
                      </div>
                    ) : filteredFriends.length === 0 ? (
                      <div className="ai-friends-empty-state">
                        <Users size={28} className="ai-friends-empty-icon" />
                        <p className="ai-friends-empty-title">
                          {friendsSearchQuery ? 'No friends found' : 'No friends yet'}
                        </p>
                        <span className="ai-friends-empty-sub">
                          {friendsSearchQuery ? 'Try a different search query' : 'Connect with classmates to grow your network'}
                        </span>
                      </div>
                    ) : (
                      filteredFriends.map((friend) => (
                        <div className="ai-friends-row" key={friend.id}>
                          <div className="ai-friends-left">
                            <img
                              src={friend.avatar || DEFAULT_WHATSAPP_AVATAR}
                              alt={friend.name}
                              className="ai-friends-avatar"
                              onError={(e) => {
                                e.currentTarget.src = DEFAULT_WHATSAPP_AVATAR
                              }}
                            />
                            <div className="ai-friends-info">
                              <strong className="ai-friends-username" title={friend.username}>
                                {friend.username}
                              </strong>
                              <span className="ai-friends-name" title={friend.name}>
                                {friend.name}
                              </span>
                            </div>
                          </div>
                          <div className="ai-friends-actions">
                            <button
                              type="button"
                              className="ai-friends-message-btn"
                              onClick={() => handleStartChatWithFriend(friend)}
                              disabled={startingChatFriendId === friend.id}
                              title={`Message ${friend.name || friend.username}`}
                            >
                              {startingChatFriendId === friend.id ? 'Connecting...' : 'Message'}
                            </button>
                            <button
                              type="button"
                              className="ai-friends-remove-btn"
                              onClick={() => handleRemoveFriend(friend)}
                              disabled={!!removingFriendIds[friend.id]}
                            >
                              {removingFriendIds[friend.id] ? 'Removing...' : 'Remove'}
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            )}
          </main>

          {/* 4. RIGHT SIDEBAR WIDGETS */}
          <aside className="ai-right-sidebar profile-right-col" aria-hidden="false">
            {/* WIDGET 0: Suggested Friends */}
            <div className="ai-widget-card">
              <div className="ai-card-header-row">
                <h4 className="ai-card-title">Suggested Friends</h4>
                {recommendedStudents.length > 0 && !isRecommendationsLoading && (
                  <button
                    type="button"
                    className="ai-see-all-link"
                    style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: 0 }}
                    onClick={() => setShowFriendsModal(true)}
                  >
                    See all
                  </button>
                )}
              </div>

              {isRecommendationsLoading ? (
                <div className="ai-friend-loading-container" aria-label="Loading suggested friends">
                  <Loader2 size={22} className="ai-friend-spinner" />
                  <span className="ai-friend-loading-text">Loading suggestions...</span>
                </div>
              ) : recommendedStudents.length === 0 ? (
                <div className="ai-friend-empty-state">
                  <Users size={24} className="ai-friend-empty-icon" />
                  <p className="ai-friend-empty-title">No friends to suggest</p>
                  <span className="ai-friend-empty-sub">Check back later for new classmates</span>
                </div>
              ) : (
                <div className="ai-friend-list">
                  {recommendedStudents.slice(0, 5).map((student) => {
                    const isPending = !!friendRequestsSent[student.id]
                    return (
                      <div className="ai-friend-row" key={student.id}>
                        <div className="ai-friend-left">
                          <img
                            src={student.avatar || DEFAULT_WHATSAPP_AVATAR}
                            alt={student.name}
                            className="ai-friend-avatar"
                            onError={(e) => {
                              e.currentTarget.src = DEFAULT_WHATSAPP_AVATAR
                            }}
                          />
                          <div className="ai-friend-info">
                            <strong className="ai-friend-name">{student.name}</strong>
                            <span className="ai-friend-meta">{student.department}</span>
                          </div>
                        </div>
                        <button
                          type="button"
                          className={`ai-friend-btn ${isPending ? 'is-pending is-joined' : ''}`}
                          onClick={() => handleToggleFriendRequest(student.id)}
                          title={isPending ? 'Click to cancel request' : 'Click to send friend request'}
                        >
                          {isPending ? 'Pending' : 'Follow'}
                        </button>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>

            {/* OTHER RIGHT SIDEBAR SECTIONS (Blurred per user request) */}
            <div className="ai-right-sidebar-blurred-group ai-blurred-section" aria-hidden="true">
              {/* WIDGET 1: Technical Stack */}
              <div className="ai-widget-card">
                <div className="ai-card-header-row">
                  <h4 className="ai-card-title">Technical Stack</h4>
                  <span className="ai-card-counter">SYS_CORE</span>
                </div>
                <div className="ai-tech-pills-wrap">
                  <span className="ai-tech-pill is-primary">Rust</span>
                  <span className="ai-tech-pill">C++20</span>
                  <span className="ai-tech-pill">Distributed Systems</span>
                  <span className="ai-tech-pill">PyTorch</span>
                  <span className="ai-tech-pill">Go</span>
                  <span className="ai-tech-pill">Linux eBPF</span>
                  <span className="ai-tech-pill">Kubernetes</span>
                  <span className="ai-tech-pill">x86-64 SIMD</span>
                </div>
              </div>

              {/* WIDGET 2: Education */}
              <div className="ai-widget-card">
                <div className="ai-card-header-row">
                  <h4 className="ai-card-title">Education</h4>
                  <span className="ai-header-icon">{Icons.GraduationCap}</span>
                </div>

                <div className="ai-edu-header">
                  <strong className="ai-edu-school">{user?.college || 'PSG College of Technology'}</strong>
                  <span className="ai-edu-gpa">GPA 3.96</span>
                </div>
                <div className="ai-edu-degree">{user?.department || 'B.E. in Computer Science & Engineering'}</div>
                <div className="ai-edu-sub">Class of 2026 • Systems &amp; AI Specialization</div>

                <div className="ai-coursework-block">
                  <span className="ai-coursework-title">SELECTED COURSEWORK</span>
                  <div className="ai-course-row">
                    <span className="ai-course-name">CS 244B: Distributed Systems</span>
                    <span className="ai-course-grade">A+</span>
                  </div>
                  <div className="ai-course-row">
                    <span className="ai-course-name">CS 143: Compilers Construction</span>
                    <span className="ai-course-grade">A</span>
                  </div>
                  <div className="ai-course-row">
                    <span className="ai-course-name">CS 212: Operating Systems Practicum</span>
                    <span className="ai-course-grade">A+</span>
                  </div>
                  <div className="ai-course-row">
                    <span className="ai-course-name">CS 229: Machine Learning</span>
                    <span className="ai-course-grade">A</span>
                  </div>
                </div>
              </div>

              {/* WIDGET 3: Campus Leadership */}
              <div className="ai-widget-card">
                <div className="ai-card-header-row">
                  <h4 className="ai-card-title">Campus Leadership</h4>
                </div>

                <div className="ai-leadership-list">
                  <div className="ai-leadership-item">
                    <div className="ai-lead-icon-box">
                      &lt;&gt;
                    </div>
                    <div>
                      <strong className="ai-lead-role">Lead Organizer</strong>
                      <div className="ai-lead-org">HackCampus Stanford</div>
                      <span className="ai-lead-sub">Directing 1,200+ builder hackathon</span>
                    </div>
                  </div>

                  <div className="ai-leadership-item">
                    <div className="ai-lead-icon-box">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /></svg>
                    </div>
                    <div>
                      <strong className="ai-lead-role">Teaching Assistant</strong>
                      <div className="ai-lead-org">CS 110: Principles of Computer Systems</div>
                      <span className="ai-lead-sub">Mentoring 140 undergrad engineers</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* WIDGET 4: Pre-prints & Papers */}
              <div className="ai-widget-card">
                <div className="ai-card-header-row">
                  <h4 className="ai-card-title">Pre-prints &amp; Papers</h4>
                  <span className="ai-card-counter">arXiv</span>
                </div>

                <div className="ai-papers-list">
                  <div className="ai-paper-item">
                    <div className="ai-paper-top">
                      <span className="ai-paper-arxiv">arXiv:2403.08912</span>
                      <span className="ai-paper-cites">18 Citations</span>
                    </div>
                    <strong className="ai-paper-title">
                      Decentralized Log Compaction in Low-Bandwidth Satellite Constellations
                    </strong>
                    <span className="ai-paper-authors">
                      S. T., Prof. D. Mazières • Stanford AI Lab
                    </span>
                  </div>

                  <div className="ai-paper-item">
                    <div className="ai-paper-top">
                      <span className="ai-paper-arxiv">arXiv:2311.14022</span>
                      <span className="ai-paper-cites">32 Citations</span>
                    </div>
                    <strong className="ai-paper-title">
                      Adaptive Memory Prefetching via Graph Neural Networks on PCIe 5.0
                    </strong>
                    <span className="ai-paper-authors">
                      S. T., K. Zhang • SysML Workshop &apos;24
                    </span>
                  </div>
                </div>
              </div>

              {/* BOTTOM STATUS */}
              <div className="ai-node-status-bar">
                <span className="ai-node-status-dot" />
                <span className="ai-node-status-txt">Lumina OS Node #782-SFO</span>
                <span className="ai-node-uptime-txt">99.98% uptime</span>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Reschedule Modal */}
      {rescheduleModalPost && (
        <div className="ai-modal-overlay" onClick={() => setRescheduleModalPost(null)}>
          <div className="ai-modal-container" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
            <div className="ai-modal-header">
              <div>
                <h3 className="ai-modal-title">Reschedule Post</h3>
                <p className="ai-modal-subtitle">Pick a new date and time for automatic publishing</p>
              </div>
              <button
                type="button"
                className="ai-modal-close-btn"
                onClick={() => setRescheduleModalPost(null)}
                aria-label="Close dialog"
              >
                <X size={18} />
              </button>
            </div>

            <div className="ai-modal-body">
              <div className="ai-modal-post-preview">
                <span className="ai-modal-preview-label">POST</span>
                <strong className="ai-modal-preview-title">{rescheduleModalPost.title}</strong>
              </div>

              <div className="ai-form-group">
                <label className="ai-form-label" htmlFor="reschedule-datetime-input">
                  <Clock size={14} />
                  <span>Select Date &amp; Time</span>
                </label>
                <input
                  id="reschedule-datetime-input"
                  type="datetime-local"
                  className="ai-datetime-input"
                  value={rescheduleTime}
                  onChange={(e) => setRescheduleTime(e.target.value)}
                />
              </div>

              <div className="ai-quick-presets">
                <span className="ai-presets-label">Quick adjust:</span>
                <button
                  type="button"
                  className="ai-preset-chip"
                  onClick={() => {
                    const d = new Date(Date.now() + 24 * 3600 * 1000)
                    const iso = new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 16)
                    setRescheduleTime(iso)
                  }}
                >
                  Tomorrow
                </button>
                <button
                  type="button"
                  className="ai-preset-chip"
                  onClick={() => {
                    const d = new Date(Date.now() + 3 * 24 * 3600 * 1000)
                    const iso = new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 16)
                    setRescheduleTime(iso)
                  }}
                >
                  In 3 Days
                </button>
                <button
                  type="button"
                  className="ai-preset-chip"
                  onClick={() => {
                    const d = new Date(Date.now() + 7 * 24 * 3600 * 1000)
                    const iso = new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 16)
                    setRescheduleTime(iso)
                  }}
                >
                  Next Week
                </button>
              </div>
            </div>

            <div className="ai-modal-footer">
              <button
                type="button"
                className="ai-modal-cancel-btn"
                onClick={() => setRescheduleModalPost(null)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="ai-modal-confirm-btn"
                disabled={!rescheduleTime || isRescheduling}
                onClick={handleConfirmReschedule}
              >
                {isRescheduling ? 'Rescheduling...' : 'Save New Schedule'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Friends List Modal (Instagram-style list) */}
      {showFriendsModal && (
        <div
          className="ai-friends-modal-overlay"
          onClick={() => setShowFriendsModal(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Friends list"
        >
          <div
            className="ai-friends-modal-container"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="ai-friends-modal-header">
              <div className="ai-friends-modal-title-row">
                <h3 className="ai-friends-modal-title">Friends</h3>
                <span className="ai-friends-count-pill">{friendsList.length}</span>
              </div>
              <button
                type="button"
                className="ai-friends-modal-close-btn"
                onClick={() => setShowFriendsModal(false)}
                aria-label="Close friends dialog"
              >
                <X size={18} />
              </button>
            </div>

            <div className="ai-friends-search-bar">
              <Search size={15} className="ai-friends-search-icon" />
              <input
                type="text"
                className="ai-friends-search-input"
                placeholder="Search friends by name or username..."
                value={friendsSearchQuery}
                onChange={(e) => setFriendsSearchQuery(e.target.value)}
                autoFocus
              />
              {friendsSearchQuery && (
                <button
                  type="button"
                  className="ai-friends-search-clear"
                  onClick={() => setFriendsSearchQuery('')}
                  aria-label="Clear search"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            <div className="ai-friends-list-body">
              {isFriendsLoading ? (
                <div className="ai-friends-empty-state">
                  <Loader2 size={24} className="animate-spin" />
                  <p className="ai-friends-empty-title">Loading friends...</p>
                </div>
              ) : filteredFriends.length === 0 ? (
                <div className="ai-friends-empty-state">
                  <Users size={28} className="ai-friends-empty-icon" />
                  <p className="ai-friends-empty-title">
                    {friendsSearchQuery ? 'No friends found' : 'No friends yet'}
                  </p>
                  <span className="ai-friends-empty-sub">
                    {friendsSearchQuery ? 'Try a different search query' : 'Connect with classmates to grow your network'}
                  </span>
                </div>
              ) : (
                filteredFriends.map((friend) => (
                  <div className="ai-friends-row" key={friend.id}>
                    <div className="ai-friends-left">
                      <img
                        src={friend.avatar || DEFAULT_WHATSAPP_AVATAR}
                        alt={friend.name}
                        className="ai-friends-avatar"
                        onError={(e) => {
                          e.currentTarget.src = DEFAULT_WHATSAPP_AVATAR
                        }}
                      />
                      <div className="ai-friends-info">
                        <strong className="ai-friends-username" title={friend.username}>
                          {friend.username}
                        </strong>
                        <span className="ai-friends-name" title={friend.name}>
                          {friend.name}
                        </span>
                      </div>
                    </div>
                    <div className="ai-friends-actions">
                      <button
                        type="button"
                        className="ai-friends-message-btn"
                        onClick={() => handleStartChatWithFriend(friend)}
                        disabled={startingChatFriendId === friend.id}
                        title={`Message ${friend.name || friend.username}`}
                      >
                        {startingChatFriendId === friend.id ? 'Connecting...' : 'Message'}
                      </button>
                      <button
                        type="button"
                        className="ai-friends-remove-btn"
                        onClick={() => handleRemoveFriend(friend)}
                        disabled={!!removingFriendIds[friend.id]}
                      >
                        {removingFriendIds[friend.id] ? 'Removing...' : 'Remove'}
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="ai-toast-notification" role="status" aria-live="polite">
          <Check size={16} className="ai-toast-icon" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  )
}

export default ProfilePage
