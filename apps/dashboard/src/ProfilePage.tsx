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
  Share2,
} from 'lucide-react'
import './ProfilePage.css'
import './Navbar.css'
import type { DashboardUser } from './DashboardPage'
import { DEFAULT_WHATSAPP_AVATAR } from './components/WhatsAppDefaultAvatar'
import { useTheme } from './lib/themeContext'

export interface ProfilePageProps {
  user?: DashboardUser | null
  onBackToDashboard?: () => void
  onNavigateHome?: () => void
  onLogout?: () => void
}

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
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="var(--ai-card-bg)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" fill="currentColor" />
      <polyline points="9 12 12 15 16 10" stroke="var(--ai-card-bg)" />
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

export const ProfilePage: React.FC<ProfilePageProps> = ({
  user,
  onBackToDashboard,
  onNavigateHome,
  onLogout,
}) => {
  const { theme, toggleTheme } = useTheme()
  const [activeTab, setActiveTab] = useState<'posts' | 'about' | 'projects' | 'achievements' | 'communities' | 'saved'>('posts')
  const [activeNav, setActiveNav] = useState('Home')
  const [searchQuery, setSearchQuery] = useState('')
  const [searchFocused, setSearchFocused] = useState(false)
  const [sidebarSearchQuery, setSidebarSearchQuery] = useState('')
  const [settingsMenuOpen, setSettingsMenuOpen] = useState(false)
  const [currentWorkspace, setCurrentWorkspace] = useState<'primary' | 'secondary'>('primary')
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)

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

  const toggleLike = (key: string) => {
    setLikedPosts((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const [savedPosts, setSavedPosts] = useState<Record<string, boolean>>({ post1: true })

  const toggleSave = (key: string) => {
    setSavedPosts((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const handleOpenComposer = () => {
    window.location.hash = '#write'
  }

  const profile = {
    name: user?.name || 'Sunilkumar T',
    role: 'PhD Candidate',
    avatar:
      user?.image ||
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    university: 'Stanford University',
    department: 'B.S. & M.S. in Computer Science (Systems & AI, \'26)',
    bio: 'Building distributed consensus algorithms & neural infrastructure. Previously research intern @ Stanford AI Lab. Passionate about systems engineering, peer mentorship, and open-source tooling.',
    location: 'Stanford University, CA',
    openTo: 'Open to Research Collaborations & Summer \'26 Eng Roles',
    joined: 'Joined Sep 2023',
    stats: {
      followers: '1,480',
      following: '342',
      academicNotes: '86',
      repos: '14',
    },
  }

  return (
    <div className={`lumina-ai-profile-root ${theme === 'dark' ? 'dark' : 'light'}`}>
      {/* 1. LEFT SIDEBAR */}
      <aside className={`ai-sidebar ${isSidebarCollapsed ? 'is-collapsed' : ''}`}>
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
                  <div className="ai-popover-plan">Free Plan · 5 members</div>
                </div>
              </div>

              <div className="ai-popover-divider" />

              {/* Action List 1 */}
              <div className="ai-popover-menu-list">
                <button
                  type="button"
                  className="ai-popover-menu-item is-upgrade"
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
                    alert('Settings & Preferences')
                  }}
                >
                  <Settings size={16} className="ai-popover-item-icon" />
                  <span>Settings</span>
                </button>
                <button
                  type="button"
                  className="ai-popover-menu-item"
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
                  className="ai-popover-menu-item"
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
                    className="ai-popover-more-btn"
                    title="Account options"
                    onClick={() => alert('Account options')}
                  >
                    <MoreHorizontal size={14} />
                  </button>
                </div>

                <button
                  type="button"
                  className={`ai-popover-workspace-item ${currentWorkspace === 'primary' ? 'is-active' : ''}`}
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
                  className={`ai-popover-workspace-item ${currentWorkspace === 'secondary' ? 'is-active' : ''}`}
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
                  className="ai-popover-workspace-item is-new-ws"
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
            >
              {Icons.Plus}
              <span>Create</span>
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
            {/* PROFILE HEADER HERO CARD */}
            <div className="ai-profile-hero-card">
              {/* Cover Graphic Banner */}
              <div className="ai-profile-cover-wrap">
                <svg className="ai-profile-constellation-svg" viewBox="0 0 800 160">
                  <defs>
                    <pattern id="dotPattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                      <circle cx="2" cy="2" r="1" fill="currentColor" opacity="0.15" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#dotPattern)" />
                  {/* Constellation line drawing */}
                  <polyline
                    points="60,90 140,50 240,110 360,40 480,95 600,60 720,100"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeDasharray="4 4"
                    opacity="0.3"
                  />
                  <circle cx="140" cy="50" r="3" fill="currentColor" opacity="0.4" />
                  <circle cx="360" cy="40" r="3.5" fill="currentColor" opacity="0.4" />
                  <circle cx="480" cy="95" r="3" fill="currentColor" opacity="0.4" />
                  <circle cx="600" cy="60" r="3.5" fill="currentColor" opacity="0.4" />
                </svg>

                <button
                  type="button"
                  className="ai-edit-cover-btn"
                  onClick={() => alert('Update campus profile cover graphic.')}
                >
                  {Icons.Camera}
                  <span>Edit Cover</span>
                </button>
              </div>

              {/* Avatar + Main Details */}
              <div className="ai-profile-details-section">
                <div className="ai-profile-avatar-row">
                  <div className="ai-profile-avatar-box">
                    <img
                      src={profile.avatar}
                      alt={profile.name}
                      className="ai-profile-avatar-main"
                    />
                    <button
                      type="button"
                      className="ai-avatar-cam-badge"
                      title="Update Profile Photo"
                      onClick={() => alert('Change profile photo')}
                    >
                      {Icons.Camera}
                    </button>
                  </div>

                  <div className="ai-profile-actions-right">
                    <button
                      type="button"
                      className="ai-profile-action-btn"
                      onClick={() => alert('Edit Profile Settings')}
                    >
                      {Icons.Edit}
                      <span>Edit Profile</span>
                    </button>
                    <button
                      type="button"
                      className="ai-profile-action-btn"
                      onClick={() => alert('Profile URL copied to clipboard!')}
                    >
                      {Icons.Share}
                      <span>Share</span>
                    </button>
                    <button
                      type="button"
                      className="ai-profile-more-icon-btn"
                      title="More options"
                    >
                      {Icons.MoreHorizontal}
                    </button>
                  </div>
                </div>

                {/* Name, Badges & Headline */}
                <div className="ai-profile-name-block">
                  <div className="ai-profile-name-row">
                    <h1 className="ai-profile-title">{profile.name}</h1>
                    <span className="ai-verified-check-icon">{Icons.CheckCircle}</span>
                    <div className="ai-profile-role-pills">
                      <span className="ai-role-pill">FOUNDER</span>
                      <span className="ai-role-pill">STUDENT</span>
                      <span className="ai-role-pill">FELLOW</span>
                    </div>
                  </div>
                  <p className="ai-profile-subhead">
                    {profile.university} • {profile.department}
                  </p>
                </div>

                {/* Bio paragraph */}
                <p className="ai-profile-bio-text">{profile.bio}</p>

                {/* Location, Availability & Joined row */}
                <div className="ai-profile-meta-row">
                  <span className="ai-meta-item">
                    {Icons.MapPin}
                    <span>{profile.location}</span>
                  </span>
                  <span className="ai-meta-item is-open-role">
                    {Icons.Zap}
                    <span>{profile.openTo}</span>
                  </span>
                  <span className="ai-meta-item">
                    {Icons.Calendar}
                    <span>{profile.joined}</span>
                  </span>
                </div>

                {/* Counters row */}
                <div className="ai-profile-counters-row">
                  <span className="ai-counter-item">
                    <strong>{profile.stats.followers}</strong> Followers
                  </span>
                  <span className="ai-counter-item">
                    <strong>{profile.stats.following}</strong> Following
                  </span>
                  <span className="ai-counter-item">
                    <strong>{profile.stats.academicNotes}</strong> Academic Notes &amp; Posts
                  </span>
                  <span className="ai-counter-item">
                    <strong>{profile.stats.repos}</strong> Open Source Repos
                  </span>
                </div>

                {/* Navigation Tabs */}
                <div className="ai-profile-tabs-bar">
                  <button
                    type="button"
                    className={`ai-profile-tab ${activeTab === 'posts' ? 'is-active' : ''}`}
                    onClick={() => setActiveTab('posts')}
                  >
                    <span>Posts</span>
                    <span className="ai-tab-dot-indicator" />
                  </button>
                  <button
                    type="button"
                    className={`ai-profile-tab ${activeTab === 'about' ? 'is-active' : ''}`}
                    onClick={() => setActiveTab('about')}
                  >
                    <span>About</span>
                  </button>
                  <button
                    type="button"
                    className={`ai-profile-tab ${activeTab === 'projects' ? 'is-active' : ''}`}
                    onClick={() => setActiveTab('projects')}
                  >
                    <span>Projects</span>
                    <span className="ai-tab-badge-num">6</span>
                  </button>
                  <button
                    type="button"
                    className={`ai-profile-tab ${activeTab === 'achievements' ? 'is-active' : ''}`}
                    onClick={() => setActiveTab('achievements')}
                  >
                    <span>Achievements &amp; Grants</span>
                  </button>
                  <button
                    type="button"
                    className={`ai-profile-tab ${activeTab === 'communities' ? 'is-active' : ''}`}
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
                    <span>Saved</span>
                  </button>
                </div>
              </div>
            </div>

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

            {/* FEED ITEMS */}
            <div className="ai-feed-stream-list">
              {/* ITEM 1: PINNED WORK (ConsensusCore) */}
              <article className="ai-feed-post-card ai-pinned-card">
                <div className="ai-pinned-header">
                  <div className="ai-pinned-badge-row">
                    <span className="ai-pinned-tag">
                      {Icons.Pin}
                      <span>PINNED WORK</span>
                    </span>
                    <span className="ai-pinned-sep">•</span>
                    <span className="ai-pinned-sub">Systems Architecture</span>
                  </div>
                  <button type="button" className="ai-post-more-btn" title="Options">
                    {Icons.MoreHorizontal}
                  </button>
                </div>

                <div className="ai-post-body">
                  <h3 className="ai-post-title ai-pinned-title">
                    ConsensusCore: Zero-Dependency Raft Consensus Engine
                  </h3>
                  <div className="ai-repo-badges-row">
                    <span className="ai-repo-pill">
                      {Icons.Star}
                      <span>420</span>
                    </span>
                    <span className="ai-repo-pill">MIT License</span>
                  </div>
                  <p className="ai-post-paragraph">
                    A production-grade, zero-alloc state machine replication engine written in Rust
                    with deterministic state simulation and actor-model log compaction. Built to explore
                    sub-millisecond tail latency in geographically distributed clusters.
                  </p>

                  {/* Architecture Diagram Box */}
                  <div className="ai-diagram-card">
                    <div className="ai-diagram-header">
                      <span className="ai-diagram-title">
                        Cluster RPC Topology &amp; Quorum Log Flow
                      </span>
                      <span className="ai-diagram-version">v0.9.4-rc2</span>
                    </div>

                    <div className="ai-diagram-flow-body">
                      {/* Node 1 Leader */}
                      <div className="ai-diag-node is-leader">
                        <strong className="ai-diag-node-name">Node 01 [Leader]</strong>
                        <span className="ai-diag-node-sub">Term 14 • Idx 1092</span>
                      </div>

                      {/* Animated Connector Arrows */}
                      <div className="ai-diag-arrows">
                        <svg className="ai-diag-svg-arrows" viewBox="0 0 120 70">
                          <line x1="5" y1="35" x2="60" y2="18" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
                          <line x1="5" y1="35" x2="60" y2="52" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
                          <polygon points="60,18 52,14 54,20" fill="currentColor" />
                          <polygon points="60,52 54,49 52,56" fill="currentColor" />
                        </svg>
                      </div>

                      {/* Followers Stack */}
                      <div className="ai-diag-followers-stack">
                        <div className="ai-diag-node is-follower">
                          <strong className="ai-diag-node-name">Node 02 [Follower]</strong>
                          <span className="ai-diag-node-sub">In Sync • 0.4ms</span>
                        </div>
                        <div className="ai-diag-node is-follower">
                          <strong className="ai-diag-node-name">Node 03 [Follower]</strong>
                          <span className="ai-diag-node-sub">In Sync • 0.6ms</span>
                        </div>
                      </div>

                      {/* Quorum Verified Box */}
                      <div className="ai-diag-node is-quorum">
                        <strong className="ai-diag-quorum-txt">Quorum Verified</strong>
                        <span className="ai-diag-quorum-sub">2/3 ACKs committed</span>
                      </div>
                    </div>

                    <div className="ai-diagram-footer">
                      <div className="ai-diag-meta-left">
                        <span className="ai-lang-dot-item">
                          <span className="ai-dot-rust" />
                          <span>Rust 98.4%</span>
                        </span>
                        <span className="ai-lang-dot-item">
                          <span className="ai-dot-asm" />
                          <span>Assembly 1.6%</span>
                        </span>
                      </div>
                      <div className="ai-diag-meta-right">
                        <button type="button" className="ai-diag-link-btn">
                          &lt;&gt; Source Repo
                        </button>
                        <button type="button" className="ai-diag-link-btn">
                          {Icons.ExternalLink}
                          <span>Interactive Benchmarks</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </article>

              {/* ITEM 2: B-Trees vs LSM Trees */}
              <article className="ai-feed-post-card">
                <div className="ai-post-header">
                  <div className="ai-post-author-wrap">
                    <img
                      src={profile.avatar}
                      alt={profile.name}
                      className="ai-post-author-avatar"
                    />
                    <div className="ai-post-author-info">
                      <div className="ai-author-name-row">
                        <span className="ai-author-name">{profile.name}</span>
                        <span className="ai-author-sep">•</span>
                        <span className="ai-author-time">yesterday</span>
                      </div>
                      <div className="ai-author-sub">
                        <span>In Stanford Systems Reading Group</span>
                      </div>
                    </div>
                  </div>
                  <button type="button" className="ai-post-more-btn" title="Bookmark post">
                    {Icons.Bookmark}
                  </button>
                </div>

                <div className="ai-post-body">
                  <h4 className="ai-post-title">
                    Deep dive on Cache-Oblivious B-Trees vs LSM Trees for modern SSD NVMe storage
                  </h4>
                  <p className="ai-post-paragraph">
                    Benchmarked random 4KB writes across 50M ops on PCIe Gen5 drives. While LSM writes
                    avoid random seek overhead, write amplification reaches 18x during multi-tier
                    compaction runs. Here is the van Emde Boas recursive memory layout snippet we
                    profiled:
                  </p>

                  {/* Dark Code Box */}
                  <div className="ai-code-snippet-box">
                    <div className="ai-code-header">
                      <span className="ai-code-filename">veb_layout.rs</span>
                      <span className="ai-code-lang">Rust 1.78</span>
                    </div>
                    <pre className="ai-code-pre">
                      <code>
                        <span className="code-comment">// Van Emde Boas cache-oblivious recursive partitioning</span>{'\n'}
                        <span className="code-kw">pub fn</span> <span className="code-fn">partition_hypercube</span>&lt;<span className="code-type">T: Copy</span>&gt;(slice: &amp;<span className="code-kw">mut</span> [<span className="code-type">T</span>], height: <span className="code-type">usize</span>) &#123;{'\n'}
                        {'    '}<span className="code-kw">if</span> height &lt;= <span className="code-type">BASE_CUTOFF</span> &#123; <span className="code-kw">return</span>; &#125;{'\n'}
                        {'    '}<span className="code-kw">let</span> top_h = height / 2;{'\n'}
                        {'    '}<span className="code-kw">let</span> bottom_h = height - top_h;{'\n'}
                        {'    '}<span className="code-comment">// Recursively localize L1/L2 cache lines with zero CPU branch penalties</span>{'\n'}
                        {'    '}<span className="code-fn">locate_subtrees</span>(slice, top_h, bottom_h);{'\n'}
                        &#125;
                      </code>
                    </pre>
                  </div>
                </div>

                <div className="ai-post-footer">
                  <div className="ai-post-footer-actions">
                    <button
                      type="button"
                      className={`ai-post-action-btn ${savedPosts.post1 ? 'is-saved' : ''}`}
                      onClick={() => toggleSave('post1')}
                      title="Save"
                      aria-label="Save"
                    >
                      <Bookmark size={17} fill={savedPosts.post1 ? 'currentColor' : 'none'} />
                    </button>
                    <button
                      type="button"
                      className={`ai-post-action-btn ${likedPosts.post1 ? 'is-liked' : ''}`}
                      onClick={() => toggleLike('post1')}
                      title="Like"
                      aria-label="Like"
                    >
                      <Heart size={17} fill={likedPosts.post1 ? '#ef4444' : 'none'} color={likedPosts.post1 ? '#ef4444' : 'currentColor'} />
                    </button>
                    <button
                      type="button"
                      className="ai-post-action-btn"
                      onClick={() => alert('Comments')}
                      title="Comment"
                      aria-label="Comment"
                    >
                      <MessageSquare size={17} />
                    </button>
                    <button
                      type="button"
                      className="ai-post-action-btn"
                      onClick={() => alert('Post link copied to clipboard!')}
                      title="Share"
                      aria-label="Share"
                    >
                      <Share2 size={17} />
                    </button>
                  </div>
                </div>
              </article>

              {/* ITEM 3: Lecture Notes CS 244B */}
              <article className="ai-feed-post-card">
                <div className="ai-post-header">
                  <div className="ai-post-author-wrap">
                    <img
                      src={profile.avatar}
                      alt={profile.name}
                      className="ai-post-author-avatar"
                    />
                    <div className="ai-post-author-info">
                      <div className="ai-author-name-row">
                        <span className="ai-author-name">{profile.name}</span>
                        <span className="ai-author-sep">•</span>
                        <span className="ai-author-time">3 days ago</span>
                      </div>
                      <div className="ai-author-sub">
                        <span>Shared in Stanford CS Course Notes</span>
                      </div>
                    </div>
                  </div>
                  <span className="ai-pill-resource">Resource</span>
                </div>

                <div className="ai-post-body">
                  <h4 className="ai-post-title">
                    Lecture Notes: CS 244B Advanced Topics in Distributed Systems – Lecture 8 (Spanner
                    &amp; TrueTime)
                  </h4>
                  <p className="ai-post-paragraph">
                    Consolidated summary covering atomic clocks, GPS receiver skew bounds (±ε), external
                    consistency, and how 2-Phase Commit interacts with Paxos consensus groups. Includes
                    full derivation of wait-out-uncertainty intervals.
                  </p>

                  {/* PDF Download Card */}
                  <div
                    className="ai-pdf-download-card"
                    onClick={() => alert('Downloading CS244B_Spanner_TrueTime_Lecture8.pdf')}
                    role="button"
                    tabIndex={0}
                  >
                    <div className="ai-pdf-left">
                      <div className="ai-pdf-icon-badge">
                        <span className="ai-pdf-badge-txt">CS</span>
                      </div>
                      <div className="ai-pdf-meta">
                        <strong className="ai-pdf-name">
                          CS244B_Spanner_TrueTime_Lecture8.pdf
                        </strong>
                        <span className="ai-pdf-details">
                          14 Pages • 3.4 MB • LaTeX Source Included
                        </span>
                      </div>
                    </div>
                    <button type="button" className="ai-pdf-download-btn">
                      {Icons.Download}
                      <span>Download</span>
                    </button>
                  </div>
                </div>

                <div className="ai-post-footer">
                  <div className="ai-post-footer-actions">
                    <button
                      type="button"
                      className={`ai-post-action-btn ${savedPosts.post2 ? 'is-saved' : ''}`}
                      onClick={() => toggleSave('post2')}
                      title="Save"
                      aria-label="Save"
                    >
                      <Bookmark size={17} fill={savedPosts.post2 ? 'currentColor' : 'none'} />
                    </button>
                    <button
                      type="button"
                      className={`ai-post-action-btn ${likedPosts.post2 ? 'is-liked' : ''}`}
                      onClick={() => toggleLike('post2')}
                      title="Like"
                      aria-label="Like"
                    >
                      <Heart size={17} fill={likedPosts.post2 ? '#ef4444' : 'none'} color={likedPosts.post2 ? '#ef4444' : 'currentColor'} />
                    </button>
                    <button
                      type="button"
                      className="ai-post-action-btn"
                      onClick={() => alert('Comments')}
                      title="Comment"
                      aria-label="Comment"
                    >
                      <MessageSquare size={17} />
                    </button>
                    <button
                      type="button"
                      className="ai-post-action-btn"
                      onClick={() => alert('Post link copied to clipboard!')}
                      title="Share"
                      aria-label="Share"
                    >
                      <Share2 size={17} />
                    </button>
                  </div>
                </div>
              </article>

              {/* ITEM 4: Milestone Award */}
              <article className="ai-feed-post-card">
                <div className="ai-post-header">
                  <div className="ai-post-author-wrap">
                    <img
                      src={profile.avatar}
                      alt={profile.name}
                      className="ai-post-author-avatar"
                    />
                    <div className="ai-post-author-info">
                      <div className="ai-author-name-row">
                        <span className="ai-author-name">{profile.name}</span>
                        <span className="ai-author-sep">•</span>
                        <span className="ai-author-time">1 week ago</span>
                      </div>
                      <div className="ai-author-sub">
                        <span>Academic Grant Award</span>
                      </div>
                    </div>
                  </div>
                  <span className="ai-award-medal-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="8" r="6" /><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" /></svg>
                  </span>
                </div>

                <div className="ai-post-body">
                  <h4 className="ai-post-title">
                    Milestone: Awarded Stanford Undergraduate Research Grant for Autonomous Multi-Agent
                    Reasoning
                  </h4>
                  <p className="ai-post-paragraph">
                    Thrilled to announce that our research proposal on verifiable peer-to-peer agreement
                    protocols for federated LLM ensembles received full funding for the 2024-2025 cycle.
                    Huge thanks to faculty mentors and the Stanford AI Lab team!
                  </p>

                  {/* Award Card */}
                  <div className="ai-grant-award-card">
                    <div className="ai-grant-left">
                      <div className="ai-grant-icon-box">
                        {Icons.GraduationCap}
                      </div>
                      <div>
                        <strong className="ai-grant-title">Stanford VPUE Major Grant</strong>
                        <p className="ai-grant-sub">
                          Office of the Vice Provost for Undergraduate Education
                        </p>
                      </div>
                    </div>
                    <span className="ai-grant-amount-badge">$12,000 Award</span>
                  </div>
                </div>

                <div className="ai-post-footer">
                  <div className="ai-post-footer-actions">
                    <button
                      type="button"
                      className={`ai-post-action-btn ${savedPosts.post3 ? 'is-saved' : ''}`}
                      onClick={() => toggleSave('post3')}
                      title="Save"
                      aria-label="Save"
                    >
                      <Bookmark size={17} fill={savedPosts.post3 ? 'currentColor' : 'none'} />
                    </button>
                    <button
                      type="button"
                      className={`ai-post-action-btn ${likedPosts.post3 ? 'is-liked' : ''}`}
                      onClick={() => toggleLike('post3')}
                      title="Like"
                      aria-label="Like"
                    >
                      <Heart size={17} fill={likedPosts.post3 ? '#ef4444' : 'none'} color={likedPosts.post3 ? '#ef4444' : 'currentColor'} />
                    </button>
                    <button
                      type="button"
                      className="ai-post-action-btn"
                      onClick={() => alert('Comments')}
                      title="Comment"
                      aria-label="Comment"
                    >
                      <MessageSquare size={17} />
                    </button>
                    <button
                      type="button"
                      className="ai-post-action-btn"
                      onClick={() => alert('Post link copied to clipboard!')}
                      title="Share"
                      aria-label="Share"
                    >
                      <Share2 size={17} />
                    </button>
                  </div>
                </div>
              </article>
            </div>
          </main>

          {/* 4. RIGHT SIDEBAR WIDGETS */}
          <aside className="ai-right-sidebar profile-right-col">
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
                <strong className="ai-edu-school">Stanford University</strong>
                <span className="ai-edu-gpa">GPA 3.96</span>
              </div>
              <div className="ai-edu-degree">B.S. &amp; M.S. in Computer Science</div>
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
          </aside>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
