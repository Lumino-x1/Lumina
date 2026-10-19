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
  Bookmark,
  MessageSquare,
  Repeat,
  Heart,
  Menu,
  X,
} from 'lucide-react'
import './DashboardPage.css'
import './Navbar.css'
import type { MergedUser } from './api/profileApi'
import {
  fetchFeedApi,
  togglePostLikeApi,
  toggleSavePostApi,
  mapFeedPostToStory,
  DEFAULT_FEED_ITEMS,
  type FeedStory,
  type FeedPostItem,
} from './api/feedApi'
import BlogReaderView from './BlogReaderView'
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

export type DashboardUser = MergedUser

export interface DashboardPageProps {
  user?: DashboardUser | null
  onLogout?: () => void
  onNavigateHome?: () => void
  onOpenWrite?: () => void
  onOpenProfile?: () => void
}

// Crisp native SVG Icons matching UntitledUI & Lucide design system
const Icons = {
  LuminaLogo: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <rect width="24" height="24" rx="6" fill="currentColor" />
      <path
        d="M6.5 17.5V6.5L12 12L6.5 17.5Z"
        fill="white"
        opacity="0.95"
      />
      <circle cx="16.5" cy="12" r="2.5" fill="white" />
    </svg>
  ),
  NeuralNode: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M3 12h6M15 12h6M12 3v6M12 15v6" />
      <circle cx="19" cy="5" r="2" />
      <circle cx="5" cy="19" r="2" />
      <circle cx="19" cy="19" r="2" />
      <circle cx="5" cy="5" r="2" />
    </svg>
  ),
  ChevronsUpDown: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="7 15 12 20 17 15" />
      <polyline points="7 9 12 4 17 9" />
    </svg>
  ),
  LayoutGrid: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
    </svg>
  ),
  Sparkles: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3L12 3z" />
    </svg>
  ),
  Compass: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
    </svg>
  ),
  UserCheck: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="8.5" cy="7" r="4" />
      <polyline points="17 11 19 13 23 9" />
    </svg>
  ),
  MessageSquare: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  ),
  BookOpen: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  ),
  Atom: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="2" />
      <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(30 12 12)" />
      <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(90 12 12)" />
      <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(150 12 12)" />
    </svg>
  ),
  FileText: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
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
  Users: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  Building2: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z" />
      <path d="M6 12H4a2 2 0 0 0-2 2v8h4" />
      <path d="M18 9h2a2 2 0 0 1 2 2v11h-4" />
      <path d="M10 6h4" />
      <path d="M10 10h4" />
      <path d="M10 14h4" />
      <path d="M10 18h4" />
    </svg>
  ),
  FileEdit: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
    </svg>
  ),
  Bookmark: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
    </svg>
  ),
  BookmarkFilled: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
    </svg>
  ),
  Settings: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  ),
  Search: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  ),
  Activity: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
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
  Cpu: (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <rect x="9" y="9" width="6" height="6" />
      <path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3" />
    </svg>
  ),
  Clock: (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  ),
  SlidersHorizontal: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="21" y1="4" x2="14" y2="4" />
      <line x1="10" y1="4" x2="3" y2="4" />
      <line x1="21" y1="12" x2="12" y2="12" />
      <line x1="8" y1="12" x2="3" y2="12" />
      <line x1="21" y1="20" x2="16" y2="20" />
      <line x1="12" y1="20" x2="3" y2="20" />
      <line x1="14" y1="2" x2="14" y2="6" />
      <line x1="8" y1="10" x2="8" y2="14" />
      <line x1="16" y1="18" x2="16" y2="22" />
    </svg>
  ),
  ArrowUpDown: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m21 16-4 4-4-4" />
      <path d="M17 20V4" />
      <path d="m3 8 4-4 4 4" />
      <path d="M7 4v16" />
    </svg>
  ),
  Image: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <polyline points="21 15 16 10 5 21" />
    </svg>
  ),
  Poll: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
    </svg>
  ),
  Code: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  ),
  Link: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  ),
  ShieldCheck: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  ),
  Share2: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
    </svg>
  ),
  MoreHorizontal: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="1" />
      <circle cx="19" cy="12" r="1" />
      <circle cx="5" cy="12" r="1" />
    </svg>
  ),
  Send: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  ),
  MapPin: (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  ),
  ThumbsUp: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
    </svg>
  ),
  Download: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  ),
  ChevronRight: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  ),
  ArrowRight: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  ),
  Bot: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="10" rx="2" />
      <circle cx="12" cy="5" r="2" />
      <path d="M12 7v4" />
      <line x1="8" y1="16" x2="8" y2="16" />
      <line x1="16" y1="16" x2="16" y2="16" />
    </svg>
  ),
  Terminal: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="4 17 10 11 4 5" />
      <line x1="12" y1="19" x2="20" y2="19" />
    </svg>
  ),
  GraduationCap: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c3 3 9 3 12 0v-5" />
    </svg>
  ),
  Check: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
  XClose: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  ),
}



const formatPostDate = (dateStr?: string): string => {
  if (!dateStr) return 'Sep 7'
  try {
    const d = new Date(dateStr)
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  } catch {
    return 'Sep 7'
  }
}

export const DashboardPage: React.FC<DashboardPageProps> = ({
  user,
  onLogout,
  onNavigateHome: _onNavigateHome,
  onOpenWrite,
  onOpenProfile,
}) => {
  const { theme, toggleTheme } = useTheme()
  const [activeNav, setActiveNav] = useState<string>('Overview')
  const [activeTab, setActiveTab] = useState<'for-you' | 'following' | 'communities' | 'academic-ai'>('for-you')
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [searchFocused, setSearchFocused] = useState<boolean>(false)
  const [sidebarSearchQuery, setSidebarSearchQuery] = useState<string>('')
  const [showProfileModal, setShowProfileModal] = useState<boolean>(false)
  const [settingsMenuOpen, setSettingsMenuOpen] = useState<boolean>(false)
  const [currentWorkspace, setCurrentWorkspace] = useState<'primary' | 'secondary'>('primary')
  const [selectedStoryForRead, setSelectedStoryForRead] = useState<FeedStory | null>(null)
  const [initialOpenCommentsForRead, setInitialOpenCommentsForRead] = useState<boolean>(false)
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false)
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState<boolean>(false)

  // Interactive state for posts and friend requests
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
    const collegeId = user?.collegeId || 'cmv9h829300024y8akviwpsmm'
    fetchRecommendedStudentsApi(collegeId, 5).then((data) => {
      if (isMounted && data && data.length > 0) {
        setRecommendedStudents(data)
      }
    })
    return () => {
      isMounted = false
    }
  }, [user?.collegeId])

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
  const [feedPosts, setFeedPosts] = useState<FeedPostItem[]>([])
  const [loadingFeed, setLoadingFeed] = useState<boolean>(true)

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
      window.location.hash = 'feed'
    }
  }

  // URL hash sync for direct post link (#post/123) and browser back/forward
  useEffect(() => {
    const handleHashSync = () => {
      const hash = window.location.hash
      if (hash.startsWith('#post/')) {
        const postId = hash.replace('#post/', '')
        const pool = feedPosts.length > 0 ? feedPosts : DEFAULT_FEED_ITEMS
        const found = pool.find((p) => p.id === postId)
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
  }, [feedPosts, selectedStoryForRead])

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

  useEffect(() => {
    let isMounted = true
    setLoadingFeed(true)
    fetchFeedApi()
      .then((items) => {
        if (isMounted) {
          const list = items && items.length > 0 ? items : DEFAULT_FEED_ITEMS
          setFeedPosts(list)
          const hash = window.location.hash
          if (hash.startsWith('#post/')) {
            const pid = hash.replace('#post/', '')
            const found = list.find((p) => p.id === pid)
            if (found) {
              setSelectedStoryForRead(mapFeedPostToStory(found))
            }
          }
        }
      })
      .catch(() => {
        if (isMounted) setFeedPosts(DEFAULT_FEED_ITEMS)
      })
      .finally(() => {
        if (isMounted) setLoadingFeed(false)
      })

    return () => {
      isMounted = false
    }
  }, [activeTab])

  const activeAccount = {
    name: user?.name || 'Sunilkumar',
    title: user?.department || 'PhD Candidate',
    avatar:
      user?.image ||
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    college: user?.college || 'Stanford University',
    department: user?.department || 'Computer Science & AI',
    year: user?.year || 'PhD Candidate (Year 3)',
    batch: user?.batch || '2026',
    email: user?.email || 'sunilkumar@cs.stanford.edu',
  }

  const handleToggleLike = async (id: string) => {
    let nextLiked = false
    setLikedPosts((prev) => {
      const currentLiked =
        prev[id] !== undefined
          ? prev[id]
          : Boolean(feedPosts.find((p) => p.id === id)?.isLiked)
      nextLiked = !currentLiked
      return { ...prev, [id]: nextLiked }
    })

    setFeedPosts((prevList) =>
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
        setFeedPosts((prevList) =>
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
      await toggleSavePostApi(id)
    } catch {
      // ignore
    }
  }

  const handleOpenComposer = () => {
    if (onOpenWrite) {
      onOpenWrite()
    } else {
      window.location.hash = '#write'
    }
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
            setFeedPosts((prev) =>
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
    <div className={`lumina-ai-dashboard-root ${theme === 'dark' ? 'dark' : 'light'}`}>
      {/* 1. LEFT SIDEBAR */}
      <aside className={`ai-sidebar ${isSidebarCollapsed ? 'is-collapsed' : ''} ${isMobileSidebarOpen ? 'is-mobile-open' : ''}`}>
        {/* Sidebar Header matching reference image */}
        <div className="ai-sidebar-top-section">
          <div className="ai-sidebar-action-row">
            <button
              type="button"
              className="ai-sidebar-icon-btn ai-desktop-collapse-btn"
              title={isSidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
              aria-label={isSidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
              onClick={() => setIsSidebarCollapsed((prev) => !prev)}
            >
              <PanelLeft size={18} />
            </button>
            <button
              type="button"
              className="ai-sidebar-icon-btn ai-mobile-close-btn"
              title="Close menu"
              aria-label="Close menu"
              onClick={() => setIsMobileSidebarOpen(false)}
            >
              <X size={18} />
            </button>
            <div className="ai-sidebar-action-group">
              <button
                type="button"
                className="ai-sidebar-icon-btn ai-inbox-btn is-unimplemented"
                title="Inbox (Coming soon)"
                aria-label="Inbox"
                tabIndex={-1}
              >
                <Inbox size={18} />
                <span className="ai-inbox-badge">2</span>
              </button>
              <button
                type="button"
                className="ai-sidebar-icon-btn"
                title="New Note / Post"
                aria-label="New Note"
                onClick={() => (onOpenWrite ? onOpenWrite() : alert('New note composer'))}
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



        {/* Nav Categories */}
        <div className="ai-nav-scroll">
          {/* MAIN */}
          <div className="ai-nav-group">
            <span className="ai-nav-category-title">MAIN</span>
            <nav className="ai-nav-list">
              <button
                type="button"
                className={`ai-nav-item ${activeNav === 'Overview' ? 'is-active' : ''}`}
                title="Overview"
                onClick={() => {
                  setActiveNav('Overview')
                  setIsMobileSidebarOpen(false)
                }}
              >
                <span className="ai-nav-icon">{Icons.LayoutGrid}</span>
                <span className="ai-nav-label">Overview</span>
              </button>
              <button
                type="button"
                className={`ai-nav-item ${activeNav === 'AI Summarizer' ? 'is-active' : ''}`}
                title="AI Summarizer"
                onClick={() => {
                  setActiveNav('AI Summarizer')
                  setIsMobileSidebarOpen(false)
                }}
              >
                <span className="ai-nav-icon">{Icons.Sparkles}</span>
                <span className="ai-nav-label">AI Summarizer</span>
              </button>
              <button
                type="button"
                className="ai-nav-item is-unimplemented"
                title="Intelligence Hub (Coming soon)"
                tabIndex={-1}
              >
                <span className="ai-nav-icon">{Icons.Sparkles}</span>
                <span className="ai-nav-label">Intelligence Hub</span>
                <span className="ai-soon-badge">Soon</span>
              </button>
            </nav>
          </div>

          {/* ACADEMICS */}
          <div className="ai-nav-group">
            <span className="ai-nav-category-title">ACADEMICS</span>
            <nav className="ai-nav-list">
              <button
                type="button"
                className="ai-nav-item is-unimplemented"
                title="Courses & Modules (Coming soon)"
                tabIndex={-1}
              >
                <span className="ai-nav-icon">{Icons.BookOpen}</span>
                <span className="ai-nav-label">Courses & Modules</span>
                <span className="ai-soon-badge">Soon</span>
              </button>
              <button
                type="button"
                className="ai-nav-item is-unimplemented"
                title="Research Synthesizer (Coming soon)"
                tabIndex={-1}
              >
                <span className="ai-nav-icon">{Icons.Atom}</span>
                <span className="ai-nav-label">Research Synthesizer</span>
                <span className="ai-soon-badge">Soon</span>
              </button>
              <button
                type="button"
                className="ai-nav-item is-unimplemented"
                title="Paper Repository (Coming soon)"
                tabIndex={-1}
              >
                <span className="ai-nav-icon">{Icons.FileText}</span>
                <span className="ai-nav-label">Paper Repository</span>
                <span className="ai-soon-badge">Soon</span>
              </button>
            </nav>
          </div>

          {/* CAMPUS */}
          <div className="ai-nav-group">
            <span className="ai-nav-category-title">CAMPUS</span>
            <nav className="ai-nav-list">
              <button
                type="button"
                className="ai-nav-item is-unimplemented"
                title="Events & Calendar (Coming soon)"
                tabIndex={-1}
              >
                <span className="ai-nav-icon">{Icons.Calendar}</span>
                <span className="ai-nav-label">Events & Calendar</span>
                <span className="ai-soon-badge">Soon</span>
              </button>
              <button
                type="button"
                className="ai-nav-item is-unimplemented"
                title="Faculty & Directory (Coming soon)"
                tabIndex={-1}
              >
                <span className="ai-nav-icon">{Icons.Users}</span>
                <span className="ai-nav-label">Faculty & Directory</span>
                <span className="ai-soon-badge">Soon</span>
              </button>
              <button
                type="button"
                className="ai-nav-item is-unimplemented"
                title="Labs & Facilities (Coming soon)"
                tabIndex={-1}
              >
                <span className="ai-nav-icon">{Icons.Building2}</span>
                <span className="ai-nav-label">Labs & Facilities</span>
                <span className="ai-soon-badge">Soon</span>
              </button>
            </nav>
          </div>

          {/* PERSONAL */}
          <div className="ai-nav-group">
            <span className="ai-nav-category-title">PERSONAL</span>
            <nav className="ai-nav-list">
              <button
                type="button"
                className="ai-nav-item is-unimplemented"
                title="My Notes (Coming soon)"
                tabIndex={-1}
              >
                <span className="ai-nav-icon">{Icons.FileEdit}</span>
                <span className="ai-nav-label">My Notes</span>
                <span className="ai-soon-badge">Soon</span>
              </button>
              <button
                type="button"
                className="ai-nav-item is-unimplemented"
                title="Citations Library (Coming soon)"
                tabIndex={-1}
              >
                <span className="ai-nav-icon">{Icons.Bookmark}</span>
                <span className="ai-nav-label">Citations Library</span>
                <span className="ai-soon-badge">Soon</span>
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
                  {(activeAccount.name.charAt(0) || 'S').toUpperCase()}
                </div>
                <div className="ai-popover-header-meta">
                  <div className="ai-popover-name">
                    {activeAccount.name.endsWith("'s")
                      ? activeAccount.name
                      : `${activeAccount.name}'s`}
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
                    if (onOpenProfile) onOpenProfile()
                    else window.location.hash = 'profile'
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
                    setShowProfileModal(true)
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
                  <span className="ai-popover-email">{user?.email || '24z275@psgtech.ac.in'}</span>
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
                      {(activeAccount.name.charAt(0) || 'S').toUpperCase()}
                    </div>
                    <span className="ai-popover-ws-name">
                      {activeAccount.name.endsWith("'s")
                        ? activeAccount.name
                        : `${activeAccount.name}'s`}
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
                      {(activeAccount.name.charAt(0) || 'S').toUpperCase()}
                      <span className="ai-popover-avatar-dot" />
                    </div>
                    <span className="ai-popover-ws-name">
                      {activeAccount.name.endsWith("'s")
                        ? `${activeAccount.name} Workspace`
                        : `${activeAccount.name}'s Workspace`}
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
              src={activeAccount.avatar}
              alt={activeAccount.name}
              className="ai-user-avatar-img"
              onError={(e) => {
                e.currentTarget.src = DEFAULT_WHATSAPP_AVATAR
              }}
            />
            <div className="ai-user-meta">
              <span className="ai-user-name">{activeAccount.name}</span>
              <span className="ai-user-role">{activeAccount.title}</span>
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

      {/* Mobile Sidebar Backdrop */}
      {isMobileSidebarOpen && (
        <div
          className="ai-mobile-sidebar-backdrop"
          onClick={() => setIsMobileSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* 2. MAIN APP CONTENT CONTAINER */}
      <div className="ai-app-main-layout">
        {/* TOP BAR */}
        <header className="ai-top-bar">
          <div className="ai-top-bar-left">
            <button
              type="button"
              className="ai-mobile-menu-btn"
              onClick={() => setIsMobileSidebarOpen(true)}
              aria-label="Open sidebar menu"
              title="Menu"
            >
              <Menu size={18} />
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

            {/* Sparkline / Activity */}
            <button
              type="button"
              className="ai-top-icon-btn is-unimplemented"
              title="Telemetry Analytics (Coming Soon)"
              tabIndex={-1}
            >
              {Icons.Activity}
            </button>

            {/* Bell Notifications */}
            <button
              type="button"
              className="ai-top-icon-btn ai-bell-btn is-unimplemented"
              title="Notifications (Coming Soon)"
              tabIndex={-1}
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
              onClick={() => (onOpenWrite ? onOpenWrite() : (window.location.hash = '#editor'))}
            >
              {Icons.Plus}
              <span>Create</span>
            </button>

            {/* Top Right Mini Avatar */}
            <div
              className="ai-top-avatar-wrap"
              onClick={() => (onOpenProfile ? onOpenProfile() : setShowProfileModal(true))}
              role="button"
              tabIndex={0}
              title="Profile"
            >
              <img
                src={activeAccount.avatar}
                alt={activeAccount.name}
                className="ai-top-avatar-img"
                onError={(e) => {
                  e.currentTarget.src = DEFAULT_WHATSAPP_AVATAR
                }}
              />
            </div>
          </div>
        </header>

        {/* 3. DUAL COLUMN WORKSPACE (FEED + RIGHT WIDGETS) */}
        <div className="ai-content-columns">
          {/* CENTER MAIN FEED STREAM */}
          <main className="ai-center-stream">
            {/* Feed Filter Navigation Bar */}
            <div className="ai-feed-filter-bar">
              <div className="ai-filter-pills">
                <button
                  type="button"
                  className={`ai-filter-pill ${activeTab === 'for-you' ? 'is-active' : ''}`}
                  onClick={() => setActiveTab('for-you')}
                >
                  <span className="ai-tab-icon">{Icons.Compass}</span>
                  <span>For You</span>
                </button>
                <button
                  type="button"
                  className="ai-filter-pill is-unimplemented"
                  title="Following feed (Coming soon)"
                  tabIndex={-1}
                >
                  <span className="ai-tab-icon">{Icons.UserCheck}</span>
                  <span>Following</span>
                  <span className="ai-soon-badge">Soon</span>
                </button>
                <button
                  type="button"
                  className="ai-filter-pill is-unimplemented"
                  title="Communities (Coming soon)"
                  tabIndex={-1}
                >
                  <span className="ai-tab-icon" style={{ filter: 'blur(2px)' }}>{Icons.Users}</span>
                  <span>Communities</span>
                  <span className="ai-soon-badge">Soon</span>
                </button>
              </div>
            </div>

            {/* Academic Intelligence Suite - Activated when Academic Intelligence tab is selected */}
            {activeTab === 'academic-ai' && (
              <section className="ai-intel-suite-card">
                <div className="ai-suite-header">
                  <div className="ai-suite-header-left">
                    <div className="ai-suite-badge-icon">
                      {Icons.NeuralNode}
                    </div>
                    <div>
                      <div className="ai-suite-title-row">
                        <h3 className="ai-suite-title">Academic Intelligence Suite</h3>
                        <span className="ai-active-pill">AI Active</span>
                      </div>
                      <p className="ai-suite-sub">
                        Real-time heuristics derived from Stanford Canvas & syllabus parsing
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="ai-suite-explore-link"
                    onClick={() => setActiveNav('Research Synthesizer')}
                  >
                    <span>Explore Intelligence Tools</span>
                    {Icons.ArrowRight}
                  </button>
                </div>

                <div className="ai-suite-cards-grid">
                  {/* Card 1: Smart Scheduler */}
                  <div className="ai-feature-card">
                    <div className="ai-feature-top">
                      <div className="ai-feature-title-wrap">
                        <span className="ai-feat-icon text-blue">{Icons.Calendar}</span>
                        <span className="ai-feat-name">Smart Scheduler</span>
                      </div>
                      <span className="ai-pill-conflict">Conflict</span>
                    </div>
                    <p className="ai-feature-desc">
                      Analyzed 4 syllabi. Detected conflict: <strong>CS241 Midterm</strong> vs{' '}
                      <strong>Robotics Lab</strong> on Thu. Auto-suggested 45m review block.
                    </p>
                    <button
                      type="button"
                      className="ai-feature-action"
                      onClick={() => alert('Review block rescheduled for Wednesday 4:00 PM.')}
                    >
                      <span>Action: Reschedule</span>
                      {Icons.ChevronRight}
                    </button>
                  </div>

                  {/* Card 2: AI Summarizer */}
                  <div className="ai-feature-card">
                    <div className="ai-feature-top">
                      <div className="ai-feature-title-wrap">
                        <span className="ai-feat-icon text-blue">{Icons.FileText}</span>
                        <span className="ai-feat-name">AI Summarizer</span>
                      </div>
                      <span className="ai-pill-transcribed">Transcribed</span>
                    </div>
                    <p className="ai-feature-desc">
                      2 lectures transcribed today. <strong>&ldquo;Distributed Consensus&rdquo;</strong> key
                      takeaways & 14 flashcards generated.
                    </p>
                    <button
                      type="button"
                      className="ai-feature-action"
                      onClick={() => alert('Opening 14 auto-generated Distributed Consensus flashcards.')}
                    >
                      <span>Review 14 Cards</span>
                      {Icons.ChevronRight}
                    </button>
                  </div>

                  {/* Card 3: Personalized Path */}
                  <div className="ai-feature-card">
                    <div className="ai-feature-top">
                      <div className="ai-feature-title-wrap">
                        <span className="ai-feat-icon text-blue">{Icons.Activity}</span>
                        <span className="ai-feat-name">Personalized Path</span>
                      </div>
                      <span className="ai-pill-exam">Exam in 6d</span>
                    </div>
                    <p className="ai-feature-desc">
                      Priority: Revise Graph Algorithms. Estimated prep confidence score sits at 78%.
                    </p>
                    <div className="ai-progress-row">
                      <div className="ai-progress-track">
                        <div className="ai-progress-bar" style={{ width: '78%' }} />
                      </div>
                      <span className="ai-progress-text">78% ready</span>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* Minimal Post Composer Entry */}
            <div
              className="ai-minimal-composer-card"
              onClick={handleOpenComposer}
              role="button"
              tabIndex={0}
              title="Share something with your campus... (Opens visual editor)"
            >
              <img
                src={activeAccount.avatar}
                alt={activeAccount.name}
                className="ai-minimal-composer-avatar"
                onError={(e) => {
                  e.currentTarget.src = DEFAULT_WHATSAPP_AVATAR
                }}
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

            {/* FEED ITEMS */}
            <div className="ai-feed-stream-list">
              {loadingFeed ? (
                <div className="ai-feed-loader-container" role="status" aria-label="Loading feed">
                  <div className="ai-feed-spinner" />
                </div>
              ) : feedPosts.length > 0 ? (
                feedPosts.map((post) => {
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
                  const postAuthor = rawUsername ? `@${rawUsername}` : (post.author?.name || 'Student')
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
                            src={post.author?.image || DEFAULT_WHATSAPP_AVATAR}
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
                              <span>{post.commentCount ?? 1}</span>
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
                              <span>{post.shareCount ?? 1}</span>
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
              ) : null}
            </div>
          </main>

          {/* 4. RIGHT SIDEBAR WIDGETS */}
          <aside className="ai-right-sidebar">
            {/* DAILY BRIEF (Blurred, Coming Soon overlay removed) */}
            <div className="ai-blurred-card-wrap ai-daily-brief-wrap">
              <div className="ai-blurred-content">
                <div className="ai-daily-brief-card">
                  <div className="ai-brief-header">
                    <span className="ai-brief-label">DAILY BRIEF</span>
                    <span className="ai-brief-date">Monday, Oct 12, 2026</span>
                  </div>
                  <h3 className="ai-brief-greeting">Good morning, {activeAccount.name.split(' ')[0] || 'Student'}.</h3>
                  <p className="ai-brief-desc">
                    You have <strong>2 lectures</strong> and <strong>1 project milestone</strong> scheduled
                    today.
                  </p>
                </div>
              </div>
            </div>

            {/* Suggested Friends */}
            <div className="ai-widget-card" style={{ marginBottom: '16px' }}>
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

              <div className="ai-community-list">
                {recommendedStudents.slice(0, 5).map((student) => {
                  const isPending = !!friendRequestsSent[student.id]
                  return (
                    <div className="ai-community-row" key={student.id}>
                      <div className="ai-community-left">
                        <div
                          className="ai-community-icon-box"
                          style={{ width: 32, height: 32, borderRadius: '50%', overflow: 'hidden' }}
                        >
                          <img
                            src={student.avatar || DEFAULT_WHATSAPP_AVATAR}
                            alt={student.name}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            onError={(e) => {
                              e.currentTarget.src = DEFAULT_WHATSAPP_AVATAR
                            }}
                          />
                        </div>
                        <div className="ai-community-info">
                          <strong className="ai-community-name">{student.name}</strong>
                          <span className="ai-community-meta">{student.department}</span>
                        </div>
                      </div>
                      <button
                        type="button"
                        className={`ai-community-join-btn ${isPending ? 'is-pending is-joined' : ''}`}
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
          </aside>
        </div>
      </div>


      {/* Lumina Student Profile Details Modal */}
      {showProfileModal && (
        <div
          className="lumina-profile-modal-overlay"
          onClick={() => setShowProfileModal(false)}
        >
          <div
            className="lumina-profile-modal-card"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Student Profile"
          >
            <div className="profile-modal-banner">
              <button
                type="button"
                className="profile-modal-close-btn"
                onClick={() => setShowProfileModal(false)}
                aria-label="Close Profile"
              >
                {Icons.XClose}
              </button>
            </div>

            <div className="profile-modal-content">
              <div className="profile-modal-avatar-row">
                <div className="profile-modal-avatar-wrap">
                  <img
                    src={activeAccount.avatar}
                    alt={activeAccount.name}
                    className="profile-modal-avatar-img"
                    onError={(e) => {
                      e.currentTarget.src = DEFAULT_WHATSAPP_AVATAR
                    }}
                  />
                </div>
                <div className="profile-modal-status-badge">
                  <span className="profile-modal-status-dot" />
                  <span>Stanford PhD Researcher</span>
                </div>
              </div>

              <div className="profile-modal-user-info">
                <h3 className="profile-modal-name">{activeAccount.name}</h3>
                <p className="profile-modal-handle">{user?.username ? `@${user.username.replace(/^@/, '')}` : '@sunilkumar56sd'}</p>
                <div className="profile-modal-badges">
                  <span className="profile-badge-pill is-college">
                    {Icons.GraduationCap}
                    <span>{activeAccount.college}</span>
                  </span>
                  <span className="profile-badge-pill is-role">
                    {activeAccount.year}
                  </span>
                </div>
              </div>

              <div className="profile-modal-section">
                <h4 className="profile-modal-section-title">Academic Details</h4>
                <div className="profile-modal-grid">
                  <div className="profile-info-card">
                    <div className="profile-info-label">College</div>
                    <div className="profile-info-value">{activeAccount.college}</div>
                  </div>
                  <div className="profile-info-card">
                    <div className="profile-info-label">Department</div>
                    <div className="profile-info-value">{activeAccount.department}</div>
                  </div>
                  <div className="profile-info-card">
                    <div className="profile-info-label">Academic Year</div>
                    <div className="profile-info-value">{activeAccount.year}</div>
                  </div>
                  <div className="profile-info-card">
                    <div className="profile-info-label">Graduation Batch</div>
                    <div className="profile-info-value">{activeAccount.batch}</div>
                  </div>
                </div>
              </div>

              <div className="profile-modal-section">
                <h4 className="profile-modal-section-title">Account &amp; Actions</h4>
                <div className="profile-modal-grid">
                  <div className="profile-info-card">
                    <div className="profile-info-label">Institutional Email</div>
                    <div className="profile-info-value">{activeAccount.email}</div>
                  </div>
                  <div className="profile-info-card">
                    <div className="profile-info-label">Profile Page</div>
                    <div className="profile-info-value">
                      <button
                        type="button"
                        className="profile-logout-btn"
                        style={{ borderColor: 'rgba(255,255,255,0.3)', color: '#ffffff' }}
                        onClick={() => {
                          setShowProfileModal(false)
                          if (onOpenProfile) onOpenProfile()
                          else window.location.hash = 'profile'
                        }}
                      >
                        Open Full Profile
                      </button>
                    </div>
                  </div>
                  <div className="profile-info-card">
                    <div className="profile-info-label">Session Control</div>
                    <div className="profile-info-value">
                      {onLogout ? (
                        <button
                          type="button"
                          className="profile-logout-btn"
                          onClick={() => {
                            setShowProfileModal(false)
                            onLogout()
                          }}
                        >
                          Sign out
                        </button>
                      ) : (
                        'Active Session'
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default DashboardPage
