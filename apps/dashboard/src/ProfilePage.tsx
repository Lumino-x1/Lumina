import React, { useState, useRef, useEffect } from 'react'
import {
  Search,
  PanelLeft,
  Inbox,
  SquarePen,
  ArrowUpCircle,
  Settings,
  Users,
  UserPlus,
  MoreHorizontal,
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
  ArrowLeft,
  Pencil,
  BadgeCheck,
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
  DEFAULT_FALLBACK_STUDENTS,
} from './api/recommendationApi'
import {
  sendFriendRequestApi,
  cancelFriendRequestApi,
  fetchOutgoingRequestsApi,
} from './api/friendsApi'
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
  mapFeedPostToStory,
  togglePostLikeApi,
  toggleSavePostApi,
} from './api/feedApi'
import BlogReaderView from './BlogReaderView'

export interface ProfilePageProps {
  user?: DashboardUser | null
  onBackToDashboard?: () => void
  onNavigateHome?: () => void
  onLogout?: () => void
}

const LinkedInSilhouette: React.FC = () => (
  <svg viewBox="0 0 140 140" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="140" height="140" fill="#D9E2EC" />
    <circle cx="70" cy="50" r="26" fill="#627D98" />
    <path d="M18 136 C22 96 46 86 70 86 C94 86 118 96 122 136 Z" fill="#627D98" />
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
        fill="var(--ai-linkedin-blue, #0a66c2)"
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
  onNavigateHome,
  onLogout,
}) => {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'
  const [activeTab, setActiveTab] = useState<'posts' | 'about' | 'projects' | 'achievements' | 'communities' | 'saved'>('posts')
  const [activeNav, setActiveNav] = useState('Profile')
  const [searchQuery, setSearchQuery] = useState('')
  const [searchFocused, setSearchFocused] = useState(false)
  const [sidebarSearchQuery, setSidebarSearchQuery] = useState('')
  const [settingsMenuOpen, setSettingsMenuOpen] = useState(false)
  const [currentWorkspace, setCurrentWorkspace] = useState<'primary' | 'secondary'>('primary')
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const [meProfile, setMeProfile] = useState<ProfileData | null>(null)

  useEffect(() => {
    let isMounted = true
    fetchMyProfile()
      .then((data) => {
        if (isMounted && data) {
          setMeProfile(data)
        }
      })
      .catch(() => {})
    return () => {
      isMounted = false
    }
  }, [])

  const settingsMenuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!settingsMenuOpen) return
    const handleClickOutside = (event: MouseEvent) => {
      if (
        settingsMenuRef.current &&
        !settingsMenuRef.current.contains(event.target as Node)
      ) {
        setSettingsMenuOpen(false)
      }
    }
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSettingsMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [settingsMenuOpen])

  // Interactive likes & bookmarks
  const [likedPosts, setLikedPosts] = useState<Record<string, boolean>>({})
  const [savedPosts, setSavedPosts] = useState<Record<string, boolean>>({})
  const [friendRequestsSent, setFriendRequestsSent] = useState<Record<string, string | boolean>>({})
  const [recommendedStudents, setRecommendedStudents] = useState<RecommendedStudent[]>(DEFAULT_FALLBACK_STUDENTS)

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
    fetchRecommendedStudentsApi(collegeId, 5).then((data) => {
      if (isMounted && data && data.length > 0) {
        setRecommendedStudents(data)
        const fromRecs: Record<string, string> = {}
        data.forEach((student) => {
          if (student.friendshipStatus === 'PENDING' && student.id) {
            fromRecs[student.id] = student.requestId || student.id
          }
        })
        if (Object.keys(fromRecs).length > 0) {
          setFriendRequestsSent((prev) => ({ ...prev, ...fromRecs }))
        }
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
        const found = publishedPosts.find((p) => p.id === postId)
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
  }, [publishedPosts, selectedStoryForRead])

  const handleToggleLike = async (id: string) => {
    let nextLiked = false
    setLikedPosts((prev) => {
      const currentLiked =
        prev[id] !== undefined
          ? prev[id]
          : Boolean(publishedPosts.find((p) => p.id === id)?.isLiked)
      nextLiked = !currentLiked
      return { ...prev, [id]: nextLiked }
    })

    setPublishedPosts((prevList) =>
      prevList.map((p) => {
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
      })
    )

    try {
      const res = await togglePostLikeApi(id)
      if (res && res.data && typeof res.data.liked === 'boolean') {
        const serverLiked = res.data.liked
        setLikedPosts((prev) => ({ ...prev, [id]: serverLiked }))
        setPublishedPosts((prevList) =>
          prevList.map((p) => {
            if (p.id !== id) return p
            return {
              ...p,
              isLiked: serverLiked,
            }
          })
        )
      }
    } catch {
      // ignore
    }
  }

  const handleToggleSave = async (id: string) => {
    setSavedPosts((prev) => ({ ...prev, [id]: !prev[id] }))
    try {
      const res = await toggleSavePostApi(id)
      const serverSaved = res?.data?.saved ?? res?.saved
      if (typeof serverSaved === 'boolean') {
        setSavedPosts((prev) => ({ ...prev, [id]: serverSaved }))
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
      followers:
        (meProfile as any)?.followersCount !== undefined
          ? String((meProfile as any).followersCount)
          : (meProfile as any)?._count?.followers !== undefined
          ? String((meProfile as any)._count.followers)
          : (user as any)?.followersCount !== undefined
          ? String((user as any).followersCount)
          : '1,480',
      following:
        (meProfile as any)?.followingCount !== undefined
          ? String((meProfile as any).followingCount)
          : (meProfile as any)?._count?.following !== undefined
          ? String((meProfile as any)._count.following)
          : (user as any)?.followingCount !== undefined
          ? String((user as any).followingCount)
          : '342',
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
    <div className={`lumina-ai-profile-root ${theme === 'dark' ? 'dark' : 'light'}`}>
      {/* 1. LEFT SIDEBAR (Blurred per user request) */}
      <aside className={`ai-sidebar ai-blurred-section ${isSidebarCollapsed ? 'is-collapsed' : ''}`} aria-hidden="true">
        {/* Sidebar Header matching reference image */}
        <div className="ai-sidebar-top-section">
          <div className="ai-sidebar-action-row">
            <button
              type="button"
              className="ai-sidebar-icon-btn"
              title={isSidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
              aria-label={isSidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
              onClick={() => setIsSidebarCollapsed((prev) => !prev)}
            >
              <PanelLeft size={18} />
            </button>
            <div className="ai-sidebar-action-group">
              <button
                type="button"
                className="ai-sidebar-icon-btn ai-inbox-btn"
                title="Inbox (2 new)"
                aria-label="Inbox"
                onClick={() => alert('2 unread messages')}
              >
                <Inbox size={18} />
                <span className="ai-inbox-badge">2</span>
              </button>
              <button
                type="button"
                className="ai-sidebar-icon-btn"
                title="New Note / Post"
                aria-label="New Note"
                onClick={() => alert('New note composer')}
              >
                <SquarePen size={18} />
              </button>
            </div>
          </div>

          <div className="ai-sidebar-search-box">
            <input
              type="text"
              placeholder="Search or ask"
              value={sidebarSearchQuery}
              onChange={(e) => setSidebarSearchQuery(e.target.value)}
              className="ai-sidebar-search-input"
              aria-label="Search or ask"
            />
            <div className="ai-sidebar-kbd-badge" aria-hidden="true">
              <span>⌘K</span>
            </div>
          </div>
        </div>



        {/* Nav List */}
        <div className="ai-nav-scroll">
          {/* MAIN */}
          <div className="ai-nav-group">
            <span className="ai-nav-category-title">MAIN</span>
            <nav className="ai-nav-list">
              <button
                type="button"
                className={`ai-nav-item ${activeNav === 'Profile' ? 'is-active' : ''}`}
                onClick={() => setActiveNav('Profile')}
              >
                <span className="ai-nav-icon">{Icons.User}</span>
                <span className="ai-nav-label">Profile</span>
              </button>
              <button
                type="button"
                className={`ai-nav-item ${activeNav === 'Home' ? 'is-active' : ''}`}
                onClick={() => {
                  setActiveNav('Home')
                  if (onBackToDashboard) onBackToDashboard()
                }}
              >
                <span className="ai-nav-icon">{Icons.Home}</span>
                <span className="ai-nav-label">Home</span>
              </button>
              <button
                type="button"
                className={`ai-nav-item ${activeNav === 'Feed' ? 'is-active' : ''}`}
                onClick={() => {
                  setActiveNav('Feed')
                  if (onBackToDashboard) onBackToDashboard()
                }}
              >
                <span className="ai-nav-icon">{Icons.Feed}</span>
                <span className="ai-nav-label">Feed</span>
              </button>
              <button
                type="button"
                className={`ai-nav-item ${activeNav === 'Discover' ? 'is-active' : ''}`}
                onClick={() => setActiveNav('Discover')}
              >
                <span className="ai-nav-icon">{Icons.Discover}</span>
                <span className="ai-nav-label">Discover</span>
              </button>
              <button
                type="button"
                className={`ai-nav-item ${activeNav === 'Following' ? 'is-active' : ''}`}
                onClick={() => setActiveNav('Following')}
              >
                <span className="ai-nav-icon">{Icons.Following}</span>
                <span className="ai-nav-label">Following</span>
              </button>
              <button
                type="button"
                className={`ai-nav-item ${activeNav === 'People' ? 'is-active' : ''}`}
                onClick={() => setActiveNav('People')}
              >
                <span className="ai-nav-icon">{Icons.People}</span>
                <span className="ai-nav-label">People</span>
              </button>
              <button
                type="button"
                className={`ai-nav-item ${activeNav === 'Communities' ? 'is-active' : ''}`}
                onClick={() => setActiveNav('Communities')}
              >
                <span className="ai-nav-icon">{Icons.Communities}</span>
                <span className="ai-nav-label">Communities</span>
              </button>
            </nav>
          </div>

          {/* ACADEMICS */}
          <div className="ai-nav-group">
            <span className="ai-nav-category-title">ACADEMICS</span>
            <nav className="ai-nav-list">
              <button
                type="button"
                className={`ai-nav-item ${activeNav === 'Academic Dashboard' ? 'is-active' : ''}`}
                onClick={() => setActiveNav('Academic Dashboard')}
              >
                <span className="ai-nav-icon">{Icons.AcademicDashboard}</span>
                <span className="ai-nav-label">Academic Dashboard</span>
              </button>
              <button
                type="button"
                className={`ai-nav-item ${activeNav === 'Smart Scheduler' ? 'is-active' : ''}`}
                onClick={() => setActiveNav('Smart Scheduler')}
              >
                <span className="ai-nav-icon">{Icons.Calendar}</span>
                <span className="ai-nav-label">Smart Scheduler</span>
              </button>
              <button
                type="button"
                className={`ai-nav-item ${activeNav === 'AI Summarizer' ? 'is-active' : ''}`}
                onClick={() => setActiveNav('AI Summarizer')}
              >
                <span className="ai-nav-icon">{Icons.Sparkles}</span>
                <span className="ai-nav-label">AI Summarizer</span>
              </button>
              <button
                type="button"
                className={`ai-nav-item ${activeNav === 'Study Groups' ? 'is-active' : ''}`}
                onClick={() => setActiveNav('Study Groups')}
              >
                <span className="ai-nav-icon">{Icons.MessageSquare}</span>
                <span className="ai-nav-label">Study Groups</span>
              </button>
              <button
                type="button"
                className={`ai-nav-item ${activeNav === 'Notes & Resources' ? 'is-active' : ''}`}
                onClick={() => setActiveNav('Notes & Resources')}
              >
                <span className="ai-nav-icon">{Icons.FileText}</span>
                <span className="ai-nav-label">Notes & Resources</span>
              </button>
              <button
                type="button"
                className={`ai-nav-item ${activeNav === 'Assignments & Exams' ? 'is-active' : ''}`}
                onClick={() => setActiveNav('Assignments & Exams')}
              >
                <span className="ai-nav-icon">{Icons.Assignments}</span>
                <span className="ai-nav-label">Assignments & Exams</span>
              </button>
            </nav>
          </div>

          {/* CAMPUS */}
          <div className="ai-nav-group">
            <span className="ai-nav-category-title">CAMPUS</span>
            <nav className="ai-nav-list">
              <button
                type="button"
                className={`ai-nav-item ${activeNav === 'Events' ? 'is-active' : ''}`}
                onClick={() => setActiveNav('Events')}
              >
                <span className="ai-nav-icon">{Icons.Calendar}</span>
                <span className="ai-nav-label">Events</span>
              </button>
              <button
                type="button"
                className={`ai-nav-item ${activeNav === 'Clubs' ? 'is-active' : ''}`}
                onClick={() => setActiveNav('Clubs')}
              >
                <span className="ai-nav-icon">{Icons.Communities}</span>
                <span className="ai-nav-label">Clubs</span>
              </button>
              <button
                type="button"
                className={`ai-nav-item ${activeNav === 'Careers' ? 'is-active' : ''}`}
                onClick={() => setActiveNav('Careers')}
              >
                <span className="ai-nav-icon">{Icons.FileText}</span>
                <span className="ai-nav-label">Careers</span>
              </button>
              <button
                type="button"
                className={`ai-nav-item ${activeNav === 'Mentorship' ? 'is-active' : ''}`}
                onClick={() => setActiveNav('Mentorship')}
              >
                <span className="ai-nav-icon">{Icons.People}</span>
                <span className="ai-nav-label">Mentorship</span>
              </button>
            </nav>
          </div>
        </div>

        {/* Sidebar Footer User Card with Popover Menu */}
        <div className="ai-sidebar-user-footer" ref={settingsMenuRef}>
          {/* Settings Popover Menu matching reference image */}
          {settingsMenuOpen && (
            <div className="ai-settings-popover" role="dialog" aria-label="Account and Workspace Settings">
              {/* Top Header */}
              <div className="ai-popover-header">
                <div className="ai-popover-avatar-sq">
                  {(profile.name.charAt(0) || 'S').toUpperCase()}
                </div>
                <div className="ai-popover-header-meta">
                  <div className="ai-popover-name">
                    {profile.name.endsWith("'s")
                      ? profile.name
                      : `${profile.name}'s`}
                  </div>
                  <div className="ai-popover-plan is-unimplemented">Free Plan · 5 members</div>
                </div>
              </div>

              <div className="ai-popover-divider" />

              {/* Action List 1 */}
              <div className="ai-popover-menu-list">
                <button
                  type="button"
                  className="ai-popover-menu-item is-upgrade is-unimplemented"
                  onClick={() => {
                    setSettingsMenuOpen(false)
                    alert('Upgrade to Lumina Pro')
                  }}
                >
                  <ArrowUpCircle size={16} className="ai-popover-item-icon text-blue" />
                  <span className="text-blue">Upgrade</span>
                </button>
                <button
                  type="button"
                  className="ai-popover-menu-item"
                  onClick={() => {
                    setSettingsMenuOpen(false)
                  }}
                >
                  <Users size={16} className="ai-popover-item-icon" />
                  <span>My Profile</span>
                </button>
                <button
                  type="button"
                  className="ai-popover-menu-item is-unimplemented"
                  onClick={() => {
                    setSettingsMenuOpen(false)
                    alert('Settings & Preferences')
                  }}
                >
                  <Settings size={16} className="ai-popover-item-icon" />
                  <span>Settings</span>
                </button>
                <button
                  type="button"
                  className="ai-popover-menu-item is-unimplemented"
                  onClick={() => {
                    setSettingsMenuOpen(false)
                    alert('Invite members link copied to clipboard!')
                  }}
                >
                  <Users size={16} className="ai-popover-item-icon" />
                  <span>Invite members</span>
                </button>
                <button
                  type="button"
                  className="ai-popover-menu-item is-unimplemented"
                  onClick={() => {
                    setSettingsMenuOpen(false)
                    alert('Add another account')
                  }}
                >
                  <UserPlus size={16} className="ai-popover-item-icon" />
                  <span>Add account</span>
                </button>
              </div>

              <div className="ai-popover-divider" />

              {/* Workspaces Section */}
              <div className="ai-popover-workspaces-section">
                <div className="ai-popover-email-row">
                  <span className="ai-popover-email">{user?.email || 'sunilbe2006@gmail.com'}</span>
                  <button
                    type="button"
                    className="ai-popover-more-btn is-unimplemented"
                    title="Account options"
                    onClick={() => alert('Account options')}
                  >
                    <MoreHorizontal size={14} />
                  </button>
                </div>

                <button
                  type="button"
                  className={`ai-popover-workspace-item is-unimplemented ${currentWorkspace === 'primary' ? 'is-active' : ''}`}
                  onClick={() => setCurrentWorkspace('primary')}
                >
                  <div className="ai-popover-ws-left">
                    <div className="ai-popover-avatar-sm">
                      {(profile.name.charAt(0) || 'S').toUpperCase()}
                    </div>
                    <span className="ai-popover-ws-name">
                      {profile.name.endsWith("'s")
                        ? profile.name
                        : `${profile.name}'s`}
                    </span>
                  </div>
                  {currentWorkspace === 'primary' && (
                    <Check size={14} className="ai-popover-check-icon" strokeWidth={2.5} />
                  )}
                </button>

                <button
                  type="button"
                  className={`ai-popover-workspace-item is-unimplemented ${currentWorkspace === 'secondary' ? 'is-active' : ''}`}
                  onClick={() => setCurrentWorkspace('secondary')}
                >
                  <div className="ai-popover-ws-left">
                    <div className="ai-popover-avatar-sm has-dot">
                      {(profile.name.charAt(0) || 'S').toUpperCase()}
                      <span className="ai-popover-avatar-dot" />
                    </div>
                    <span className="ai-popover-ws-name">
                      {profile.name.endsWith("'s")
                        ? `${profile.name} Workspace`
                        : `${profile.name}'s Workspace`}
                    </span>
                    <span className="ai-popover-guest-badge">Guest</span>
                  </div>
                  {currentWorkspace === 'secondary' && (
                    <Check size={14} className="ai-popover-check-icon" strokeWidth={2.5} />
                  )}
                </button>

                <button
                  type="button"
                  className="ai-popover-workspace-item is-new-ws is-unimplemented"
                  onClick={() => {
                    const wsName = prompt('Enter new workspace name:')
                    if (wsName) alert(`Created workspace: ${wsName}`)
                  }}
                >
                  <div className="ai-popover-ws-left text-blue">
                    <Plus size={15} strokeWidth={2.5} />
                    <span>New workspace</span>
                  </div>
                </button>
              </div>

              <div className="ai-popover-divider" />

              {/* Log out */}
              <div className="ai-popover-footer">
                <button
                  type="button"
                  className="ai-popover-logout-btn"
                  onClick={() => {
                    setSettingsMenuOpen(false)
                    if (onLogout) onLogout()
                    else if (onNavigateHome) onNavigateHome()
                    else alert('Logged out successfully')
                  }}
                >
                  Log out
                </button>
              </div>
            </div>
          )}

          {/* User profile trigger pill */}
          <div
            className={`ai-user-profile-card ${settingsMenuOpen ? 'is-open' : ''}`}
            onClick={() => setSettingsMenuOpen((prev) => !prev)}
            role="button"
            tabIndex={0}
            title="Account & Settings"
          >
            <img
              src={profile.avatar}
              alt={profile.name}
              className="ai-user-avatar-img"
              onError={(e) => {
                e.currentTarget.src = DEFAULT_WHATSAPP_AVATAR
              }}
            />
            <div className="ai-user-meta">
              <span className="ai-user-name">{profile.name}</span>
              <span className="ai-user-role">{profile.role}</span>
            </div>
            <button
              type="button"
              className={`ai-settings-gear-btn ${settingsMenuOpen ? 'is-active' : ''}`}
              onClick={(e) => {
                e.stopPropagation()
                setSettingsMenuOpen((prev) => !prev)
              }}
              title="Settings & Workspace Menu"
            >
              <Settings size={15} />
            </button>
          </div>
        </div>
      </aside>

      {/* 2. MAIN APPLICATION WORKSPACE */}
      <div className="ai-app-main-layout">
        {/* TOP BAR */}
        <header className="ai-top-bar">
          <div className="ai-top-bar-left">
            <button
              type="button"
              className="ai-top-back-btn"
              onClick={onBackToDashboard}
              title="Back to Dashboard"
            >
              <ArrowLeft size={15} />
              <span>Dashboard</span>
            </button>
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
            <button
              type="button"
              className="ai-top-icon-btn ai-bell-btn"
              title="Notifications"
            >
              {Icons.Bell}
              <span className="ai-bell-dot" />
            </button>

            {/* Theme Toggle Button */}
            <button
              type="button"
              className="ai-top-icon-btn"
              onClick={toggleTheme}
              title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
            >
              {theme === 'dark' ? Icons.Sun : Icons.Moon}
            </button>

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
                  <Pencil size={15} color={isDark ? '#B1ADA1' : '#1C1A17'} strokeWidth={2.4} />
                </button>
              </div>

              {/* Avatar Row */}
              <div className="ai-linkedin-avatar-row">
                <div className="ai-linkedin-avatar-wrapper">
                  <div className="ai-linkedin-avatar-circle">
                    {profile.hasCustomAvatar ? (
                      <img
                        src={profile.avatar}
                        alt={profile.name}
                        className="ai-profile-avatar-main"
                      />
                    ) : (
                      <LinkedInSilhouette />
                    )}
                  </div>
                  <button
                    type="button"
                    className="ai-avatar-add-story-btn"
                    title="Add profile photo or frame"
                    onClick={() => alert('Add profile photo or frame')}
                  >
                    <Plus size={20} strokeWidth={2.8} />
                  </button>
                </div>

                {/* Card Top Right Edit Button */}
                <button
                  type="button"
                  className="ai-linkedin-card-edit-btn"
                  title="Edit intro"
                  style={isDark ? { color: '#B1ADA1' } : undefined}
                  onClick={() => alert('Edit intro')}
                >
                  <Pencil size={20} color={isDark ? '#B1ADA1' : 'currentColor'} strokeWidth={2} />
                </button>
              </div>

              {/* Main Info Grid (Two Columns) */}
              <div className="ai-linkedin-info-grid">
                {/* Left Column */}
                <div className="ai-linkedin-left-col">
                  {/* Name + Blue Tick Verified Badge */}
                  <div className="ai-linkedin-name-row">
                    <h1 className="ai-linkedin-name" style={isDark ? { color: '#B1ADA1' } : undefined}>{profile.name}</h1>
                    <span
                      className="ai-linkedin-blue-tick"
                      title="Verified Student Profile"
                      aria-label="Verified Profile"
                    >
                      <BadgeCheck
                        size={21}
                        fill={isDark ? '#388fe6' : '#0a66c2'}
                        color="#ffffff"
                        strokeWidth={2.2}
                      />
                    </span>
                  </div>

                  {/* Headline */}
                  <p className="ai-linkedin-headline" style={isDark ? { color: '#B1ADA1' } : undefined}>
                    {profile.headline}
                  </p>

                  {/* Location & Contact info */}
                  <div className="ai-linkedin-location-row" style={isDark ? { color: '#B1ADA1' } : undefined}>
                    <span className="ai-linkedin-location" style={isDark ? { color: '#B1ADA1' } : undefined}>{profile.location}</span>
                    <span className="ai-linkedin-dot" style={isDark ? { color: '#B1ADA1' } : undefined}>·</span>
                    <a
                      href="#contact-info"
                      className="ai-linkedin-contact-link"
                      style={isDark ? { color: '#B1ADA1' } : undefined}
                      onClick={(e) => {
                        e.preventDefault()
                        alert(`Contact Info:\nName: ${profile.name}\nEmail: ${profile.email}\nUniversity: ${profile.university}\nLocation: ${profile.location}`)
                      }}
                    >
                      Contact info
                    </a>
                  </div>

                  {/* Followers & Following */}
                  <div className="ai-linkedin-connections-row" style={isDark ? { color: '#B1ADA1' } : undefined}>
                    <a
                      href="#followers"
                      className="ai-linkedin-connections-link"
                      style={isDark ? { color: '#B1ADA1' } : undefined}
                      onClick={(e) => {
                        e.preventDefault()
                      }}
                    >
                      <span className="ai-followers-count" style={isDark ? { color: '#B1ADA1' } : undefined}>{profile.stats.followers}</span> followers
                    </a>
                    <span className="ai-linkedin-dot" style={isDark ? { color: '#B1ADA1' } : undefined}>·</span>
                    <a
                      href="#following"
                      className="ai-linkedin-connections-link"
                      style={isDark ? { color: '#B1ADA1' } : undefined}
                      onClick={(e) => {
                        e.preventDefault()
                      }}
                    >
                      <span className="ai-followers-count" style={isDark ? { color: '#B1ADA1' } : undefined}>{profile.stats.following}</span> following
                    </a>
                  </div>
                </div>

                {/* Right Column (Organizations & Education) */}
                <div className="ai-linkedin-right-col">
                  <div className="ai-linkedin-org-item">
                    <div className="ai-linkedin-org-icon ai-org-icon-squares">
                      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                        <rect width="32" height="32" rx="4" fill="#E8EEF3" />
                        <rect x="5" y="5" width="10" height="10" rx="1.5" fill="#78909C" />
                        <rect x="17" y="5" width="10" height="10" rx="1.5" fill="#90A4AE" />
                        <rect x="5" y="17" width="10" height="10" rx="1.5" fill="#B0BEC5" />
                        <rect x="17" y="17" width="10" height="10" rx="1.5" fill="#546E7A" />
                      </svg>
                    </div>
                    <span className="ai-linkedin-org-name" style={isDark ? { color: '#B1ADA1' } : undefined}>{profile.department}</span>
                  </div>

                  <div className="ai-linkedin-org-item">
                    <div className="ai-linkedin-org-icon ai-org-icon-psg">
                      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                        <path d="M16 2 L27 6 V16 C27 23 16 29 16 29 C16 29 5 23 5 16 V6 Z" fill="#ffffff" stroke="#283593" strokeWidth="1.5" />
                        <path d="M16 4.5 L24.5 7.5 V15.5 C24.5 21 16 26 16 26 C16 26 7.5 21 7.5 15.5 V7.5 Z" fill="#E8EAF6" opacity="0.4" />
                        <path d="M16 7 L17.5 9 H14.5 Z M15 9.5 H17 V13 H15 Z M14 13.5 H18 V18 H14 Z M13 18.5 H19 V21 H13 Z" fill="#283593" />
                        <circle cx="16" cy="18" r="4.5" stroke="#283593" strokeWidth="1" strokeDasharray="1.5 1" fill="none" />
                        <path d="M9 22 Q16 25 23 22" stroke="#283593" strokeWidth="1.5" fill="none" />
                      </svg>
                    </div>
                    <span className="ai-linkedin-org-name" style={isDark ? { color: '#B1ADA1' } : undefined}>{profile.university}</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Navigation Tabs Card */}
            <div className="ai-profile-tabs-card">
              <div className="ai-profile-tabs-bar">
                <button
                  type="button"
                  className={`ai-profile-tab ${activeTab === 'posts' ? 'is-active' : ''}`}
                  onClick={() => setActiveTab('posts')}
                >
                  <span>Posts</span>
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
                  className={`ai-profile-tab ai-profile-blurred ${activeTab === 'saved' ? 'is-active' : ''}`}
                  onClick={() => setActiveTab('saved')}
                >
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
                                      fill={isPostLiked ? '#ef4444' : 'none'}
                                      color={isPostLiked ? '#ef4444' : 'currentColor'}
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
                      ({publishedPosts.filter((p) => savedPosts[p.id] ?? !!p.isSaved).length})
                    </span>
                  </div>
                </div>

                {publishedPosts.filter((p) => savedPosts[p.id] ?? !!p.isSaved).length === 0 ? (
                  <div className="ai-empty-tab-state">
                    <Bookmark size={36} className="ai-empty-icon" />
                    <h3 className="ai-empty-title">No saved stories yet</h3>
                    <p className="ai-empty-desc">
                      Click the bookmark icon on any post or academic note to save it here for quick reference.
                    </p>
                  </div>
                ) : (
                  publishedPosts
                    .filter((p) => savedPosts[p.id] ?? !!p.isSaved)
                    .map((post) => {
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
                                    fill={isPostLiked ? '#ef4444' : 'none'}
                                    color={isPostLiked ? '#ef4444' : 'currentColor'}
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
          </main>

          {/* 4. RIGHT SIDEBAR WIDGETS */}
          <aside className="ai-right-sidebar profile-right-col" aria-hidden="false">
            {/* WIDGET 0: Suggested Friends */}
            <div className="ai-widget-card">
              <div className="ai-card-header-row">
                <h4 className="ai-card-title">Suggested Friends</h4>
                <a
                  href="#see-all"
                  className="ai-see-all-link"
                  onClick={(e) => {
                    e.preventDefault()
                  }}
                >
                  See all
                </a>
              </div>
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
