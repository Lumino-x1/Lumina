import React, { useState, useRef, useEffect } from 'react'
import './DashboardPage.css'
import type { MergedUser } from './api/profileApi'
import {
  fetchFeedApi,
  mapFeedPostToStory,
  type FeedStory,
  DEFAULT_FEED_ITEMS,
  togglePostLikeApi,
  toggleSavePostApi,
} from './api/feedApi'
import BlogReaderView from './BlogReaderView'
import { DEFAULT_WHATSAPP_AVATAR } from './components/WhatsAppDefaultAvatar'

export type DashboardUser = MergedUser

export interface DashboardPageProps {
  user?: DashboardUser | null
  onLogout?: () => void
  onNavigateHome?: () => void
  onOpenWrite?: () => void
  onOpenProfile?: () => void
}

interface NavSubItem {
  label: string
  href: string
  icon: React.ReactNode
  badge?: number | string
}

interface NavItem {
  label: string
  href: string
  icon: React.ReactNode
  badge?: number | string
  items?: NavSubItem[]
}

interface FooterItem {
  label: string
  href: string
  icon: React.ReactNode
  badge?: React.ReactNode
}

// UntitledUI Icons (native crisp SVG implementations)
const Icons = {
  HomeLine: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  ),
  Activity: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>
  ),
  Compass01: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
    </svg>
  ),
  UserCheck01: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="8.5" cy="7" r="4" />
      <polyline points="17 11 19 13 23 9" />
    </svg>
  ),
  UserPlus01: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="8.5" cy="7" r="4" />
      <line x1="20" y1="8" x2="20" y2="14" />
      <line x1="23" y1="11" x2="17" y2="11" />
    </svg>
  ),
  Users01: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  Users01Small: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  Users02: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
      <circle cx="12" cy="7" r="3.5" />
      <path d="M1 19v-1a3 3 0 0 1 3-3" />
      <circle cx="5" cy="9" r="2.5" />
      <path d="M23 19v-1a3 3 0 0 0-3-3" />
      <circle cx="19" cy="9" r="2.5" />
    </svg>
  ),
  Users02Small: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
      <circle cx="12" cy="7" r="3.5" />
      <path d="M1 19v-1a3 3 0 0 1 3-3" />
      <circle cx="5" cy="9" r="2.5" />
      <path d="M23 19v-1a3 3 0 0 0-3-3" />
      <circle cx="19" cy="9" r="2.5" />
    </svg>
  ),
  Award01: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="6" />
      <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
    </svg>
  ),
  Award01Small: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="6" />
      <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
    </svg>
  ),
  Flag01: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
      <line x1="4" y1="22" x2="4" y2="15" />
    </svg>
  ),
  PlusCircle: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="16" />
      <line x1="8" y1="12" x2="16" y2="12" />
    </svg>
  ),
  GraduationHat01: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c3 3 9 3 12 0v-5" />
    </svg>
  ),
  MessageSquare01: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  ),
  Folder01: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
    </svg>
  ),
  Calendar: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  ),
  CalendarSmall: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  ),
  CalendarCheck01: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
      <path d="m9 16 2 2 4-4" />
    </svg>
  ),
  CalendarPlus01: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
      <line x1="12" y1="14" x2="12" y2="18" />
      <line x1="10" y1="16" x2="14" y2="16" />
    </svg>
  ),
  Briefcase01: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  ),
  Building02: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z" />
      <path d="M6 12H4a2 2 0 0 0-2 2v8h20v-8a2 2 0 0 0-2-2h-2" />
      <line x1="10" y1="6" x2="14" y2="6" />
      <line x1="10" y1="10" x2="14" y2="10" />
      <line x1="10" y1="14" x2="14" y2="14" />
      <line x1="10" y1="18" x2="14" y2="18" />
    </svg>
  ),
  TrendingUp01: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
    </svg>
  ),
  FileText01: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
    </svg>
  ),
  MessageChatCircle: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22z" />
    </svg>
  ),
  MessageCircle01: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
  ),
  Microphone01: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
      <line x1="12" y1="19" x2="12" y2="23" />
      <line x1="8" y1="23" x2="16" y2="23" />
    </svg>
  ),
  ShoppingBag01: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  ),
  Grid03: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
    </svg>
  ),
  Tag01: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
      <line x1="7" y1="7" x2="7.01" y2="7" />
    </svg>
  ),
  SearchRefraction: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  ),
  HelpCircle: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  ),
  CheckCircle: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  ),
  AlertCircle: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  ),
  Globe01: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  ),
  Zap: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  ),
  Bookmark: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
    </svg>
  ),
  NotificationBox: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  ),
  Settings01: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  ),
  LikeThumb: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3z" />
      <path d="M7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
    </svg>
  ),
  LikeThumbFilled: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3z" />
      <path d="M7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
    </svg>
  ),
  SparkleStar: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="#FFC017">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  ),
  ChatBubble: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
  ),
  Loop: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="m17 2 4 4-4 4" />
      <path d="M3 11v-1a4 4 0 0 1 4-4h14" />
      <path d="m7 22-4-4 4-4" />
      <path d="M21 13v1a4 4 0 0 1-4 4H3" />
    </svg>
  ),
  MinusCircle: (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="8" y1="12" x2="16" y2="12" />
    </svg>
  ),
  BookmarkLine: (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
    </svg>
  ),
  BookmarkFilled: (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="#FFFFFF" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
    </svg>
  ),
  ChevronDown: (
    <svg className="nav-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  ),
  ChevronsUpDown: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m7 15 5 5 5-5" />
      <path d="m7 9 5-5 5 5" />
    </svg>
  ),
  User01: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  ),
  BookOpen01: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  ),
  LogOut01: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  ),
  GraduationCap: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c3 3 9 3 12 0v-5" />
    </svg>
  ),
  XClose: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  ),
  Plus: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  ),
  InfoCircle: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
    </svg>
  ),
  ChevronDownSmall: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  ),
  ChevronUpSmall: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="18 15 12 9 6 15" />
    </svg>
  ),
  MoreHorizontal: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <circle cx="5" cy="12" r="2" />
      <circle cx="12" cy="12" r="2" />
      <circle cx="19" cy="12" r="2" />
    </svg>
  ),
  Edit01: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
    </svg>
  ),
  Search: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  ),
  Bell: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  ),
  PencilWrite: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
    </svg>
  ),
  ImageIcon: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <polyline points="21 15 16 10 5 21" />
    </svg>
  ),
  VideoIcon: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="23 7 16 12 23 17 23 7" />
      <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
    </svg>
  ),
  LinkIcon: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  ),
  PollIcon: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
    </svg>
  ),
  Globe: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  ),
  Heart: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  ),
  HeartFilled: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="#ffffff" stroke="#ffffff" strokeWidth="1">
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  ),
  Repeat: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="17 1 21 5 17 9" />
      <path d="M3 11V9a4 4 0 0 1 4-4h14" />
      <polyline points="7 23 3 19 7 15" />
      <path d="M21 13v2a4 4 0 0 1-4 4H3" />
    </svg>
  ),
  Flame: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
    </svg>
  ),
  VerifiedCheck: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="#ffffff">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
    </svg>
  ),
}



// MAIN navigation items for Lumina college community
const mainNavItems: NavItem[] = [
  {
    label: 'Home',
    href: '#home',
    icon: Icons.HomeLine,
    items: [
      { label: 'Feed', href: '#feed', icon: Icons.Activity },
      { label: 'Discover', href: '#discover', icon: Icons.Compass01 },
      { label: 'Following', href: '#following', icon: Icons.UserCheck01 },
    ],
  },
  {
    label: 'People',
    href: '#people',
    icon: Icons.Users01,
    items: [
      { label: 'Find People', href: '#find-people', icon: Icons.UserPlus01 },
      { label: 'Friends', href: '#friends', icon: Icons.Users01Small },
      { label: 'Friend Requests', href: '#friend-requests', icon: Icons.UserCheck01, badge: 3 },
      { label: 'Mentors', href: '#mentors', icon: Icons.Award01Small },
    ],
  },
  {
    label: 'Communities',
    href: '#communities',
    icon: Icons.Users02,
    items: [
      { label: 'Discover Communities', href: '#discover-communities', icon: Icons.Compass01 },
      { label: 'My Communities', href: '#my-communities', icon: Icons.Users02Small },
      { label: 'Clubs', href: '#clubs', icon: Icons.Flag01 },
      { label: 'Create Community', href: '#create-community', icon: Icons.PlusCircle },
    ],
  },
  {
    label: 'Academics',
    href: '#academics',
    icon: Icons.GraduationHat01,
    items: [
      { label: 'Study Groups', href: '#study-groups', icon: Icons.Users02Small },
      { label: 'Discussions', href: '#discussions', icon: Icons.MessageSquare01 },
      { label: 'Resources', href: '#resources', icon: Icons.Folder01 },
      { label: 'Timetable', href: '#timetable', icon: Icons.CalendarSmall },
    ],
  },
  {
    label: 'Events',
    href: '#events',
    icon: Icons.Calendar,
    items: [
      { label: 'Discover Events', href: '#discover-events', icon: Icons.Compass01 },
      { label: 'My Events', href: '#my-events', icon: Icons.CalendarCheck01 },
      { label: 'Create Event', href: '#create-event', icon: Icons.CalendarPlus01 },
    ],
  },
  {
    label: 'Careers',
    href: '#careers',
    icon: Icons.Briefcase01,
    items: [
      { label: 'Internships', href: '#internships', icon: Icons.Building02 },
      { label: 'Placements', href: '#placements', icon: Icons.TrendingUp01 },
      { label: 'Mentorship', href: '#mentorship', icon: Icons.Award01Small },
      { label: 'Career Resources', href: '#career-resources', icon: Icons.FileText01 },
    ],
  },
  {
    label: 'Messages',
    href: '#messages',
    icon: Icons.MessageChatCircle,
    badge: 5,
    items: [
      { label: 'Direct Messages', href: '#direct-messages', icon: Icons.MessageCircle01, badge: 5 },
      { label: 'Group Chats', href: '#group-chats', icon: Icons.Users01Small },
      { label: 'Voice Rooms', href: '#voice-rooms', icon: Icons.Microphone01 },
    ],
  },
]

// CAMPUS navigation items for Lumina college community
const campusNavItems: NavItem[] = [
  {
    label: 'Marketplace',
    href: '#marketplace',
    icon: Icons.ShoppingBag01,
    items: [
      { label: 'Browse Marketplace', href: '#browse-marketplace', icon: Icons.Grid03 },
      { label: 'My Listings', href: '#my-listings', icon: Icons.Tag01 },
      { label: 'Create Listing', href: '#create-listing', icon: Icons.PlusCircle },
    ],
  },
  {
    label: 'Lost & Found',
    href: '#lost-found',
    icon: Icons.SearchRefraction,
    items: [
      { label: 'Lost Items', href: '#lost-items', icon: Icons.HelpCircle },
      { label: 'Found Items', href: '#found-items', icon: Icons.CheckCircle },
      { label: 'Report Item', href: '#report-item', icon: Icons.AlertCircle },
    ],
  },
  {
    label: 'Alumni',
    href: '#alumni',
    icon: Icons.Award01,
    items: [
      { label: 'Alumni Network', href: '#alumni-network', icon: Icons.Globe01 },
      { label: 'Discover Alumni', href: '#discover-alumni', icon: Icons.Users01Small },
      { label: 'Opportunities', href: '#alumni-opportunities', icon: Icons.Zap },
    ],
  },
]



const formatCount = (count: number): string => {
  if (count >= 1000) {
    const val = (count / 1000).toFixed(1)
    return val.endsWith('.0') ? `${Math.floor(count / 1000)}K` : `${val}K`
  }
  return count.toString()
}

export const DashboardPage: React.FC<DashboardPageProps> = ({
  user,
  onLogout,
  onNavigateHome,
  onOpenWrite,
  onOpenProfile,
}) => {
  const [activeItem, setActiveItem] = useState<string>('Home')
  const [activeSubItem, setActiveSubItem] = useState<string>('Feed')
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({
    Home: true,
    People: false,
    Communities: false,
    Academics: false,
    Events: false,
    Careers: false,
    Messages: false,
    Marketplace: false,
    'Lost & Found': false,
    Alumni: false,
  })
  const [profileMenuOpen, setProfileMenuOpen] = useState<boolean>(false)
  const profileMenuRef = useRef<HTMLDivElement>(null)

  // Middle Feed State
  const [activeFeedTab, setActiveFeedTab] = useState<'for-you' | 'activity'>('for-you')
  const [feedStories, setFeedStories] = useState<FeedStory[]>([])
  const [isFeedLoading, setIsFeedLoading] = useState<boolean>(true)
  const [savedStoryIds, setSavedStoryIds] = useState<Set<string>>(new Set())
  const [likedStoryIds, setLikedStoryIds] = useState<Record<string, boolean>>({})
  const [selectedStoryForRead, setSelectedStoryForRead] = useState<FeedStory | null>(null)
  const [isCommentsOpenForRead, setIsCommentsOpenForRead] = useState<boolean>(false)
  const [searchQuery, setSearchQuery] = useState<string>('')

  // Fetch feed from GET /api/feed on mount/login
  useEffect(() => {
    let isMounted = true
    async function loadFeed() {
      setIsFeedLoading(true)
      try {
        const posts = await fetchFeedApi()
        const targetPosts = Array.isArray(posts) && posts.length > 0 ? posts : DEFAULT_FEED_ITEMS
        const targetStories = targetPosts.map(mapFeedPostToStory)

        if (isMounted) {
          setFeedStories(targetStories)

          // Populate liked and saved status directly from the items
          const initialLiked: Record<string, boolean> = {}
          const initialSaved = new Set<string>()

          for (const story of targetStories) {
            if (story.isLiked) {
              initialLiked[story.id] = true
            }
            if (story.isSaved) {
              initialSaved.add(story.id)
            }
          }

          setLikedStoryIds(initialLiked)
          setSavedStoryIds(initialSaved)
        }
      } catch (err) {
        console.error('Failed to load feed from /api/feed:', err)
        if (isMounted) {
          const fallbackStories = DEFAULT_FEED_ITEMS.map(mapFeedPostToStory)
          setFeedStories(fallbackStories)
        }
      } finally {
        if (isMounted) setIsFeedLoading(false)
      }
    }

    void loadFeed()
    return () => {
      isMounted = false
    }
  }, [user?.id])

  const handleLike = async (storyId: string) => {
    const isCurrentlyLiked = !!likedStoryIds[storyId]
    const nextLiked = !isCurrentlyLiked

    // Optimistic UI update
    setLikedStoryIds((prev) => ({
      ...prev,
      [storyId]: nextLiked,
    }))
    setFeedStories((prev) =>
      prev.map((s) =>
        s.id === storyId
          ? {
              ...s,
              likes: isCurrentlyLiked ? Math.max(0, s.likes - 1) : s.likes + 1,
              isLiked: nextLiked,
            }
          : s
      )
    )
    setSelectedStoryForRead((prev) =>
      prev && prev.id === storyId
        ? {
            ...prev,
            likes: isCurrentlyLiked ? Math.max(0, prev.likes - 1) : prev.likes + 1,
            isLiked: nextLiked,
          }
        : prev
    )

    // Send HTTP POST request to {{baseUrl}}/api/posts/{{postId}}/like
    try {
      const res = await togglePostLikeApi(storyId)
      if (res && res.success && res.data) {
        const serverLiked = res.data.liked
        if (serverLiked !== nextLiked) {
          setLikedStoryIds((prev) => ({
            ...prev,
            [storyId]: serverLiked,
          }))
          setFeedStories((prev) =>
            prev.map((s) => (s.id === storyId ? { ...s, isLiked: serverLiked } : s))
          )
          setSelectedStoryForRead((prev) =>
            prev && prev.id === storyId ? { ...prev, isLiked: serverLiked } : prev
          )
        }
      }
    } catch (err) {
      console.error('Failed to toggle post like:', err)
    }
  }

  const handleToggleSave = async (storyId: string) => {
    const isCurrentlySaved = savedStoryIds.has(storyId)
    const nextSaved = !isCurrentlySaved

    // Optimistic UI update
    setSavedStoryIds((prev) => {
      const next = new Set(prev)
      if (nextSaved) {
        next.add(storyId)
      } else {
        next.delete(storyId)
      }
      return next
    })
    setFeedStories((prev) =>
      prev.map((s) => (s.id === storyId ? { ...s, isSaved: nextSaved } : s))
    )
    setSelectedStoryForRead((prev) =>
      prev && prev.id === storyId
        ? {
            ...prev,
            saves: isCurrentlySaved ? Math.max(0, (prev.saves ?? 1) - 1) : (prev.saves ?? 0) + 1,
            isSaved: nextSaved,
          }
        : prev
    )

    // Send HTTP POST request to {{baseUrl}}/api/posts/{{postId}}/save
    try {
      const res = await toggleSavePostApi(storyId)
      if (res && res.success) {
        const serverSaved =
          typeof res.isSaved === 'boolean'
            ? res.isSaved
            : typeof res.saved === 'boolean'
            ? res.saved
            : res.data?.isSaved ?? res.data?.saved ?? nextSaved

        if (serverSaved !== nextSaved) {
          setSavedStoryIds((prev) => {
            const next = new Set(prev)
            if (serverSaved) next.add(storyId)
            else next.delete(storyId)
            return next
          })
          setFeedStories((prev) =>
            prev.map((s) => (s.id === storyId ? { ...s, isSaved: serverSaved } : s))
          )
          setSelectedStoryForRead((prev) =>
            prev && prev.id === storyId ? { ...prev, isSaved: serverSaved } : prev
          )
        }
      }
    } catch (err) {
      console.error('Failed to toggle post save:', err)
    }
  }

  const handleDismissStory = (storyId: string) => {
    setFeedStories((prev) => prev.filter((s) => s.id !== storyId))
  }

  // Lumina student profile configuration
  const userCollege = user?.college || 'Stanford University'
  const userDepartment = user?.department || 'Computer Science & Engineering'
  const userYearNum = user?.year ?? 2
  const userYearLabel =
    userYearNum === 1
      ? '1st Year'
      : userYearNum === 2
      ? '2nd Year'
      : userYearNum === 3
      ? '3rd Year'
      : userYearNum === 4
      ? '4th Year'
      : `${userYearNum}th Year`

  const accounts = [
    {
      id: 'acc-1',
      name:
        user?.name ||
        (user?.firstName ? `${user.firstName} ${user.lastName || ''}`.trim() : 'sunilkumar T'),
      college: userCollege,
      department: userDepartment,
      year: userYearLabel,
      batch: user?.batch || `Class of ${2022 + userYearNum}`,
      role: `${userCollege} · ${userYearLabel}`,
      email: user?.email || '24z27445@psgtech.ac.in',
      username: user?.username ? `@${user.username}` : '@sunilkumar56sd',
      avatar:
        user?.profilePicture ||
        user?.image ||
        DEFAULT_WHATSAPP_AVATAR,
    },
  ]
  const [selectedAccountId, setSelectedAccountId] = useState<string>('acc-1')
  const activeAccount = accounts.find((a) => a.id === selectedAccountId) || accounts[0]
  const [showProfileModal, setShowProfileModal] = useState<boolean>(false)

  // Close popover and modal on Escape, click outside, and handle shortcuts
  useEffect(() => {
    let kPressed = false
    let kTimer: any = null

    const handleClickOutside = (e: MouseEvent) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(e.target as Node)) {
        setProfileMenuOpen(false)
      }
    }
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setProfileMenuOpen(false)
        setShowProfileModal(false)
      }

      // Handle ⌘K then P or ⌘P shortcut to open profile
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        kPressed = true
        clearTimeout(kTimer)
        kTimer = setTimeout(() => {
          kPressed = false
        }, 1500)
      } else if (kPressed && e.key.toLowerCase() === 'p') {
        e.preventDefault()
        kPressed = false
        clearTimeout(kTimer)
        setProfileMenuOpen(false)
        if (onOpenProfile) onOpenProfile()
        else window.location.hash = 'profile'
      } else if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'p') {
        e.preventDefault()
        setProfileMenuOpen(false)
        if (onOpenProfile) onOpenProfile()
        else window.location.hash = 'profile'
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    if (profileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('mousedown', handleClickOutside)
      clearTimeout(kTimer)
    }
  }, [profileMenuOpen])

  const toggleExpand = (label: string) => {
    setExpandedItems((prev) => ({
      ...prev,
      [label]: !prev[label],
    }))
  }

  const footerItems: FooterItem[] = [
    {
      label: 'Notifications',
      href: '#notifications',
      icon: Icons.NotificationBox,
      badge: 10,
    },
    {
      label: 'Saved',
      href: '#saved',
      icon: Icons.Bookmark,
    },
    {
      label: 'Settings',
      href: '#settings',
      icon: Icons.Settings01,
    },
  ]

  const renderNavItem = (item: NavItem) => {
    const hasSubItems = item.items && item.items.length > 0
    const isExpanded = !!expandedItems[item.label]
    const isParentActive = activeItem === item.label

    return (
      <li key={item.label} className="untitled-nav-group">
        <button
          type="button"
          className={`untitled-nav-item ${isParentActive && !hasSubItems ? 'is-active' : ''}`}
          onClick={() => {
            if (hasSubItems) {
              toggleExpand(item.label)
            } else {
              setActiveItem(item.label)
            }
          }}
        >
          <span className="untitled-item-icon">{item.icon}</span>
          <span className="untitled-item-label">{item.label}</span>

          {item.badge !== undefined && (
            <span className="untitled-item-badge">{item.badge}</span>
          )}

          {hasSubItems && (
            <span className={`untitled-chevron-wrap ${isExpanded ? 'is-open' : ''}`}>
              {Icons.ChevronDown}
            </span>
          )}
        </button>

        {/* Collapsible Sub-Items */}
        {hasSubItems && isExpanded && (
          <ul className="untitled-subnav-list">
            {item.items!.map((sub) => {
              const isSubActive =
                isParentActive && activeSubItem === sub.label

              return (
                <li key={sub.label}>
                  <button
                    type="button"
                    className={`untitled-subnav-item ${isSubActive ? 'is-active' : ''}`}
                    onClick={() => {
                      setActiveItem(item.label)
                      setActiveSubItem(sub.label)
                    }}
                  >
                    <span className="untitled-sub-icon">{sub.icon}</span>
                    <span className="untitled-sub-label">{sub.label}</span>
                    {sub.badge !== undefined && (
                      <span className="untitled-item-badge">{sub.badge}</span>
                    )}
                  </button>
                </li>
              )
            })}
          </ul>
        )}
      </li>
    )
  }

  if (selectedStoryForRead) {
    return (
      <BlogReaderView
        story={selectedStoryForRead}
        onBack={() => {
          setSelectedStoryForRead(null)
          setIsCommentsOpenForRead(false)
        }}
        onLike={handleLike}
        isLiked={!!likedStoryIds[selectedStoryForRead.id]}
        onToggleSave={handleToggleSave}
        isSaved={savedStoryIds.has(selectedStoryForRead.id)}
        initialOpenComments={isCommentsOpenForRead}
        currentUser={user}
        onCommentAdded={(storyId, newCount) => {
          setFeedStories((prev) =>
            prev.map((s) => {
              if (s.id !== storyId) return s
              const nextVal =
                typeof newCount === 'number'
                  ? newCount
                  : (s.totalComments ?? s.comments ?? 0) + 1
              return { ...s, comments: nextVal, totalComments: nextVal }
            })
          )
          setSelectedStoryForRead((prev) => {
            if (!prev || prev.id !== storyId) return prev
            const nextVal =
              typeof newCount === 'number'
                ? newCount
                : (prev.totalComments ?? prev.comments ?? 0) + 1
            return { ...prev, comments: nextVal, totalComments: nextVal }
          })
        }}
      />
    )
  }

  return (
    <div className="lumina-dashboard-layout">
      {/* Standalone Sidebar Alone (UntitledUI Style with Landing Page Color Theme #191919) */}
      <aside className="untitled-sidebar">
        {/* Brand Header */}
        <div className="untitled-brand-header">
          <button
            type="button"
            className="untitled-brand-btn"
            onClick={onNavigateHome}
            title="Lumina Home"
          >
            <svg
              className="untitled-lumina-logo"
              viewBox="0 0 88 64"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M6.2 38.6L20.8 13.2L27.6 17.1L13 42.5L6.2 38.6Z" />
              <path d="M18.4 47.8L37.2 9.4L44.4 13.6L25.6 52L18.4 47.8Z" />
              <path d="M32.8 54.4L54.6 5.8L62 10.2L40.2 58.8L32.8 54.4Z" />
              <path d="M48.2 59.6L69.8 11.4L77 15.6L55.4 63.8L48.2 59.6Z" />
            </svg>
            <span className="untitled-brand-name">Lumina</span>
          </button>
        </div>

        {/* Navigation List */}
        <nav className="untitled-nav-section">
          {/* MAIN Section */}
          <div className="untitled-nav-group-section">
            <div className="untitled-nav-section-title">Main</div>
            <ul className="untitled-nav-list">
              {mainNavItems.map(renderNavItem)}
            </ul>
          </div>

          {/* CAMPUS Section */}
          <div className="untitled-nav-group-section">
            <div className="untitled-nav-section-title">Campus</div>
            <ul className="untitled-nav-list">
              {campusNavItems.map(renderNavItem)}
            </ul>
          </div>
        </nav>

        {/* Footer Navigation Items */}
        <div className="untitled-footer-nav">
          <ul className="untitled-nav-list">
            {footerItems.map((item) => (
              <li key={item.label}>
                <button
                  type="button"
                  className={`untitled-nav-item ${activeItem === item.label ? 'is-active' : ''}`}
                  onClick={() => setActiveItem(item.label)}
                >
                  <span className="untitled-item-icon">{item.icon}</span>
                  <span className="untitled-item-label">{item.label}</span>
                  {item.badge !== undefined && (
                    <span className="untitled-item-badge">{item.badge}</span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* User Profile Trigger & Popover Dropdown (UntitledUI Spec) */}
        <div className="untitled-profile-container" ref={profileMenuRef}>
          <button
            type="button"
            className={`untitled-profile-card ${profileMenuOpen ? 'is-active' : ''}`}
            onClick={() => setProfileMenuOpen((prev) => !prev)}
            aria-haspopup="true"
            aria-expanded={profileMenuOpen}
          >
            <div className="untitled-avatar-wrap">
              <img
                src={activeAccount.avatar || DEFAULT_WHATSAPP_AVATAR}
                alt={activeAccount.name}
                className="untitled-avatar-img"
                onError={(e) => {
                  e.currentTarget.src = DEFAULT_WHATSAPP_AVATAR
                }}
              />
              <span className="untitled-avatar-status" />
            </div>

            <div className="untitled-profile-meta">
              <span className="untitled-profile-name">{activeAccount.name}</span>
              <span className="untitled-profile-email">{activeAccount.email}</span>
            </div>

            <span className="untitled-profile-chevron">
              {Icons.ChevronsUpDown}
            </span>
          </button>

          {/* UntitledUI Account Dropdown Popover */}
          {profileMenuOpen && (
            <div className="untitled-profile-popover" role="menu">
              {/* Primary Actions */}
              <div className="popover-action-group">
                <button
                  type="button"
                  className="popover-action-item"
                  onClick={() => {
                    setProfileMenuOpen(false)
                    if (onOpenProfile) {
                      onOpenProfile()
                    } else {
                      window.location.hash = 'profile'
                    }
                  }}
                >
                  <div className="popover-item-left">
                    <span className="popover-item-icon">{Icons.User01}</span>
                    <span className="popover-item-label">View profile</span>
                  </div>
                  <kbd className="popover-shortcut">⌘K→P</kbd>
                </button>

                <button
                  type="button"
                  className="popover-action-item"
                  onClick={() => {
                    setProfileMenuOpen(false)
                    alert('Opening account settings...')
                  }}
                >
                  <div className="popover-item-left">
                    <span className="popover-item-icon">{Icons.Settings01}</span>
                    <span className="popover-item-label">Account settings</span>
                  </div>
                  <kbd className="popover-shortcut">⌘S</kbd>
                </button>

                <button
                  type="button"
                  className="popover-action-item"
                  onClick={() => {
                    setProfileMenuOpen(false)
                    alert('Opening documentation...')
                  }}
                >
                  <div className="popover-item-left">
                    <span className="popover-item-icon">{Icons.BookOpen01}</span>
                    <span className="popover-item-label">Documentation</span>
                  </div>
                </button>
              </div>

              <div className="popover-divider" />

              {/* Switch Account Section */}
              <div className="popover-section-header">Switch account</div>
              <div className="popover-accounts-list">
                {accounts.map((acc) => {
                  const isSelected = activeAccount.id === acc.id
                  return (
                    <button
                      key={acc.id}
                      type="button"
                      className={`popover-account-item ${isSelected ? 'is-selected' : ''}`}
                      onClick={() => setSelectedAccountId(acc.id)}
                    >
                      <div className="popover-item-left">
                        <div className="untitled-avatar-wrap is-small">
                          <img
                            src={acc.avatar || DEFAULT_WHATSAPP_AVATAR}
                            alt={acc.name}
                            className="untitled-avatar-img"
                            onError={(e) => {
                              e.currentTarget.src = DEFAULT_WHATSAPP_AVATAR
                            }}
                          />
                          <span className="untitled-avatar-status" />
                        </div>
                        <div className="popover-account-meta">
                          <span className="popover-account-name">{acc.name}</span>
                          <span className="popover-account-email">{acc.email}</span>
                        </div>
                      </div>

                      <div className={`popover-radio ${isSelected ? 'is-checked' : ''}`}>
                        {isSelected && <span className="popover-radio-inner" />}
                      </div>
                    </button>
                  )
                })}

                <button
                  type="button"
                  className="popover-add-account-btn"
                  onClick={() => alert('Add account feature coming soon')}
                >
                  <span className="popover-plus-icon">{Icons.Plus}</span>
                  <span>Add account</span>
                </button>
              </div>

              <div className="popover-divider" />

              {/* Sign Out Action */}
              <button
                type="button"
                className="popover-action-item is-signout"
                onClick={() => {
                  setProfileMenuOpen(false)
                  onLogout?.()
                }}
              >
                <div className="popover-item-left">
                  <span className="popover-item-icon">{Icons.LogOut01}</span>
                  <span className="popover-item-label">Sign out</span>
                </div>
                <kbd className="popover-shortcut">⌥⇧Q</kbd>
              </button>
            </div>
          )}
        </div>
      </aside>

      {/* Main Workspace Area (Top header + Feed and Widgets) */}
      <div className="lumina-workspace-area">
        {/* Top Header Navigation Bar */}
        <header className="lumina-top-header">
          <div className="top-header-tabs">
            <button
              type="button"
              className={`top-tab-btn ${activeFeedTab === 'for-you' ? 'is-active' : ''}`}
              onClick={() => setActiveFeedTab('for-you')}
            >
              For you
            </button>
            <button
              type="button"
              className={`top-tab-btn ${activeFeedTab === 'activity' ? 'is-active' : ''}`}
              onClick={() => setActiveFeedTab('activity')}
            >
              Activity
            </button>
          </div>

          <div className="top-header-right">
            {/* Global Search with ⌘ K */}
            <div className="top-search-wrap">
              <span className="top-search-icon">{Icons.Search}</span>
              <input
                type="text"
                className="top-search-input"
                placeholder="Search posts, people, communities..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <kbd className="top-search-kbd">⌘ K</kbd>
            </div>

            {/* Notification Bell */}
            <button
              type="button"
              className="top-icon-btn"
              title="Notifications"
              onClick={() => alert('Notifications')}
            >
              {Icons.Bell}
            </button>

            {/* Write Button (Solid white rounded pill button) */}
            <button
              type="button"
              className="top-write-btn"
              onClick={() => (onOpenWrite ? onOpenWrite() : (window.location.hash = '#editor'))}
              title="Write a new post"
            >
              {Icons.PencilWrite}
              <span>Write</span>
            </button>

            {/* User Avatar */}
            <button
              type="button"
              className="top-user-avatar-btn"
              onClick={() => (onOpenProfile ? onOpenProfile() : (window.location.hash = '#profile'))}
              title="View profile"
            >
              <img
                src={activeAccount.avatar || DEFAULT_WHATSAPP_AVATAR}
                alt={activeAccount.name}
                className="top-user-avatar-img"
                onError={(e) => {
                  e.currentTarget.src = DEFAULT_WHATSAPP_AVATAR
                }}
              />
            </button>
          </div>
        </header>

        {/* Content Row: Feed Column + Right Sidebar Widgets */}
        <div className="lumina-workspace-body">
          {/* Middle Feed Column */}
          <main className="lumina-feed-column">
            {/* Create Post Box */}
            <div className="create-post-card">
              <div className="create-post-top-row">
                <img
                  src={activeAccount.avatar || DEFAULT_WHATSAPP_AVATAR}
                  alt={activeAccount.name}
                  className="create-post-avatar"
                  onError={(e) => {
                    e.currentTarget.src = DEFAULT_WHATSAPP_AVATAR
                  }}
                />
                <input
                  type="text"
                  className="create-post-input"
                  placeholder="Share your thoughts, ideas or something you learned..."
                  onClick={() => (onOpenWrite ? onOpenWrite() : (window.location.hash = '#editor'))}
                  readOnly
                />
              </div>

              <div className="create-post-actions-row">
                <div className="create-post-media-group">
                  <button
                    type="button"
                    className="create-post-action-btn"
                    onClick={() => (onOpenWrite ? onOpenWrite() : (window.location.hash = '#editor'))}
                  >
                    {Icons.ImageIcon}
                    <span>Image</span>
                  </button>
                  <button
                    type="button"
                    className="create-post-action-btn"
                    onClick={() => (onOpenWrite ? onOpenWrite() : (window.location.hash = '#editor'))}
                  >
                    {Icons.VideoIcon}
                    <span>Video</span>
                  </button>
                  <button
                    type="button"
                    className="create-post-action-btn"
                    onClick={() => (onOpenWrite ? onOpenWrite() : (window.location.hash = '#editor'))}
                  >
                    {Icons.LinkIcon}
                    <span>Link</span>
                  </button>
                  <button
                    type="button"
                    className="create-post-action-btn"
                    onClick={() => (onOpenWrite ? onOpenWrite() : (window.location.hash = '#editor'))}
                  >
                    {Icons.PollIcon}
                    <span>Poll</span>
                  </button>
                </div>

                <div className="create-post-publish-group">
                  <button type="button" className="create-post-audience-pill">
                    {Icons.Globe}
                    <span>Everyone</span>
                    {Icons.ChevronDownSmall}
                  </button>
                  <button
                    type="button"
                    className="create-post-submit-btn"
                    onClick={() => (onOpenWrite ? onOpenWrite() : (window.location.hash = '#editor'))}
                  >
                    Post
                  </button>
                </div>
              </div>
            </div>

            {/* Stories List */}
            {activeFeedTab === 'for-you' ? (
              isFeedLoading ? (
                <div className="feed-loading-wrap">
                  <div className="feed-skeleton-card" />
                  <div className="feed-skeleton-card" />
                </div>
              ) : feedStories.length > 0 ? (
                <div className="feed-stories-list">
                  {feedStories.map((story) => {
                    const isSaved = savedStoryIds.has(story.id)
                    const isLiked = !!likedStoryIds[story.id]

                    return (
                      <article key={story.id} className="feed-story-card">
                        {/* Author Header Row */}
                        <div className="feed-story-header">
                          <div className="feed-author-col-left">
                            <img
                              src={story.authorAvatar || DEFAULT_WHATSAPP_AVATAR}
                              alt={story.authorName}
                              className="feed-author-avatar"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = DEFAULT_WHATSAPP_AVATAR
                              }}
                            />
                            <div className="feed-author-info">
                              <div className="feed-author-line-top">
                                <span className="feed-author-name">{story.authorName}</span>
                                {story.authorVerified && (
                                  <span className="feed-verified-badge" title="Verified">
                                    {Icons.VerifiedCheck}
                                  </span>
                                )}
                                <span className="feed-meta-dot">·</span>
                                <span className="feed-story-date">{story.date}</span>
                              </div>
                              <div className="feed-author-line-sub">
                                {story.authorRole || `${userYearLabel} · ${userCollege}`}
                              </div>
                            </div>
                          </div>

                          <button
                            type="button"
                            className="feed-card-menu-btn"
                            title="Dismiss post"
                            onClick={() => handleDismissStory(story.id)}
                          >
                            {Icons.MoreHorizontal}
                          </button>
                        </div>

                        {/* Middle Row: Content on Left, Thumbnail on Right */}
                        <div className="feed-story-body">
                          <div className="feed-story-text-col">
                            <h2
                              className="feed-story-title"
                              onClick={() => {
                                setSelectedStoryForRead(story)
                                setIsCommentsOpenForRead(false)
                              }}
                            >
                              {story.title}
                            </h2>

                            {story.description && (
                              <p
                                className="feed-story-desc"
                                onClick={() => {
                                  setSelectedStoryForRead(story)
                                  setIsCommentsOpenForRead(false)
                                }}
                              >
                                {story.description}
                              </p>
                            )}

                            {story.topics && story.topics.length > 0 && (
                              <div className="feed-story-topics">
                                {story.topics.map((t) => (
                                  <span key={t} className="feed-topic-pill">
                                    #{t}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>

                          {story.image ? (
                            <div
                              className="feed-story-thumbnail-wrap"
                              onClick={() => {
                                setSelectedStoryForRead(story)
                                setIsCommentsOpenForRead(false)
                              }}
                              role="button"
                              tabIndex={0}
                            >
                              <img
                                src={story.image}
                                alt={story.title}
                                className="feed-story-thumbnail"
                                loading="lazy"
                                onError={(e) => {
                                  (e.target as HTMLImageElement).src =
                                    'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&auto=format&fit=crop&q=80'
                                }}
                              />
                            </div>
                          ) : null}
                        </div>

                        {/* Bottom Row: Actions */}
                        <div className="feed-story-footer">
                          <div className="feed-actions-left">
                            <button
                              type="button"
                              className={`feed-action-btn ${isLiked ? 'is-liked' : ''}`}
                              onClick={() => handleLike(story.id)}
                              title={isLiked ? 'Unlike' : 'Like'}
                            >
                              {isLiked ? Icons.HeartFilled : Icons.Heart}
                              <span>{formatCount(story.likes)}</span>
                            </button>
                            <button
                              type="button"
                              className="feed-action-btn"
                              title="Responses"
                              onClick={(e) => {
                                e.stopPropagation()
                                setSelectedStoryForRead(story)
                                setIsCommentsOpenForRead(true)
                              }}
                            >
                              {Icons.ChatBubble}
                              <span>{formatCount(story.totalComments ?? story.comments ?? 0)}</span>
                            </button>
                            <button
                              type="button"
                              className="feed-action-btn"
                              title="Repost"
                              onClick={() => alert('Reposted to college network')}
                            >
                              {Icons.Repeat}
                              <span>{story.shares}</span>
                            </button>
                          </div>

                          <div className="feed-actions-right">
                            <button
                              type="button"
                              className={`feed-icon-btn ${isSaved ? 'is-saved' : ''}`}
                              title={isSaved ? 'Story saved' : 'Save story'}
                              onClick={() => handleToggleSave(story.id)}
                            >
                              {isSaved ? Icons.BookmarkFilled : Icons.BookmarkLine}
                            </button>
                            <button
                              type="button"
                              className="feed-icon-btn"
                              title="More options"
                              onClick={() => alert('More story options')}
                            >
                              {Icons.MoreHorizontal}
                            </button>
                          </div>
                        </div>
                      </article>
                    )
                  })}
                </div>
              ) : (
                <div className="feed-empty-state">
                  <div className="feed-empty-icon">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                      <line x1="16" y1="13" x2="8" y2="13" />
                      <line x1="16" y1="17" x2="8" y2="17" />
                    </svg>
                  </div>
                  <h3 className="feed-empty-title">No posts available</h3>
                  <p className="feed-empty-subtitle">
                    There are no posts published in your college feed yet.
                  </p>
                  {onOpenWrite && (
                    <button
                      type="button"
                      className="feed-empty-write-btn"
                      onClick={onOpenWrite}
                    >
                      {Icons.Edit01}
                      <span>Write the first post</span>
                    </button>
                  )}
                </div>
              )
            ) : (
              <div className="feed-activity-empty">
                <p>No recent activity yet. Read and interact with stories to see updates here.</p>
              </div>
            )}
          </main>

          {/* Right Sidebar Widgets */}
          <aside className="lumina-right-sidebar">
            {/* Widget 1: Greeting & User Stats Card */}
            <div className="greeting-card">
              <div className="greeting-card-content">
                <span className="greeting-time-lbl">Good evening,</span>
                <h3 className="greeting-user-name">
                  {activeAccount.name.split(' ')[0] || 'sunilkumar'}
                </h3>
                <p className="greeting-motto-txt">
                  Keep learning, building and connecting.
                </p>
              </div>

              {/* Celestial Eclipse Graphic */}
              <div className="greeting-eclipse-art" aria-hidden="true">
                <svg className="greeting-eclipse-svg" viewBox="0 0 160 160">
                  <defs>
                    <radialGradient id="eclipseGlow" cx="72%" cy="28%" r="65%">
                      <stop offset="0%" stopColor="#ffffff" stopOpacity="0.55" />
                      <stop offset="30%" stopColor="#888888" stopOpacity="0.15" />
                      <stop offset="68%" stopColor="#080a0d" stopOpacity="0.95" />
                      <stop offset="100%" stopColor="#080a0d" stopOpacity="1" />
                    </radialGradient>
                  </defs>
                  <circle cx="100" cy="55" r="70" fill="url(#eclipseGlow)" />
                  <circle cx="100" cy="55" r="69.5" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1.2" />
                </svg>
              </div>

              <div className="greeting-stats-divider" />

              <div className="greeting-stats-grid">
                <div className="greeting-stat-col">
                  <span className="greeting-stat-num">42</span>
                  <span className="greeting-stat-label">Posts</span>
                </div>
                <div className="greeting-stat-col">
                  <span className="greeting-stat-num">324</span>
                  <span className="greeting-stat-label">Followers</span>
                </div>
                <div className="greeting-stat-col">
                  <span className="greeting-stat-num">287</span>
                  <span className="greeting-stat-label">Following</span>
                </div>
              </div>
            </div>


            {/* Widget 4: Build your story Card */}
            <div className="sidebar-widget-box build-story-card">
              <h4 className="build-story-title">Build your story</h4>
              <p className="build-story-desc">
                Share ideas, learn together and grow with your college community.
              </p>
              <button
                type="button"
                className="build-story-action-btn"
                onClick={() => (onOpenWrite ? onOpenWrite() : (window.location.hash = '#editor'))}
              >
                {Icons.PencilWrite}
                <span>Write a post</span>
              </button>
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
            {/* Banner */}
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

            {/* Profile Content */}
            <div className="profile-modal-content">
              {/* Avatar & Status Row */}
              <div className="profile-modal-avatar-row">
                <div className="profile-modal-avatar-wrap">
                  <img
                    src={activeAccount.avatar || DEFAULT_WHATSAPP_AVATAR}
                    alt={activeAccount.name}
                    className="profile-modal-avatar-img"
                    onError={(e) => {
                      e.currentTarget.src = DEFAULT_WHATSAPP_AVATAR
                    }}
                  />
                </div>

                <div className="profile-modal-status-badge">
                  <span className="profile-modal-status-dot" />
                  <span>Active Student</span>
                </div>
              </div>

              {/* User Info Header */}
              <div className="profile-modal-user-info">
                <h3 className="profile-modal-name">{activeAccount.name}</h3>
                <p className="profile-modal-handle">{activeAccount.username || `@${user?.username || 'sunilkumar56sd'}`}</p>
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

              {/* Academic Details */}
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

              {/* Contact & Account */}
              <div className="profile-modal-section">
                <h4 className="profile-modal-section-title">Account & Contact</h4>
                <div className="profile-modal-grid">
                  <div className="profile-info-card">
                    <div className="profile-info-label">Institutional Email</div>
                    <div className="profile-info-value">{activeAccount.email}</div>
                  </div>
                  <div className="profile-info-card">
                    <div className="profile-info-label">Username</div>
                    <div className="profile-info-value">{user?.username || 'sunilkumar56sd'}</div>
                  </div>
                </div>
              </div>

              {/* Interests & Focus Areas */}
              <div className="profile-modal-section">
                <h4 className="profile-modal-section-title">Interests & Focus Areas</h4>
                <div className="profile-tags-wrap">
                  {(user?.interests && user.interests.length > 0
                    ? user.interests
                    : ['Business', 'Design', 'AI & Machine Learning']
                  ).map((interest, idx) => (
                    <span key={idx} className="profile-tag">
                      {interest}
                    </span>
                  ))}
                </div>
              </div>

              {/* Skills */}
              {user?.skills && user.skills.length > 0 && (
                <div className="profile-modal-section">
                  <h4 className="profile-modal-section-title">Skills</h4>
                  <div className="profile-tags-wrap">
                    {user.skills.map((skill, idx) => (
                      <span key={idx} className="profile-tag">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default DashboardPage
