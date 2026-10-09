import React, { useState, useRef } from 'react'
import {
  Search,
  Bell,
  Camera,
  CheckCircle2,
  MapPin,
  Link as LinkIcon,
  Calendar,
  Edit3,
  Share2,
  MoreHorizontal,
  FileText,
  Info,
  FolderGit2,
  Award,
  Bookmark,
  Heart,
  MessageCircle,
  RotateCw,
  Image as ImageIcon,
  Video,
  BarChart2,
  Users2,
} from 'lucide-react'
import './ProfilePage.css'
import type { DashboardUser } from './DashboardPage'
import { DEFAULT_WHATSAPP_AVATAR } from './components/WhatsAppDefaultAvatar'

export interface ProfilePageProps {
  user?: DashboardUser | null
  onBackToDashboard?: () => void
  onNavigateHome?: () => void
}

export const ProfilePage: React.FC<ProfilePageProps> = ({
  user,
  onBackToDashboard,
  onNavigateHome,
}) => {
  const [activeTab, setActiveTab] = useState<'posts' | 'about' | 'projects' | 'achievements' | 'communities' | 'saved'>('posts')
  const [copiedToast, setCopiedToast] = useState(false)
  const [likedPosts, setLikedPosts] = useState<Record<string, boolean>>({})
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [customAvatar, setCustomAvatar] = useState<string | null>(null)

  const handleAvatarFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const url = URL.createObjectURL(file)
      setCustomAvatar(url)
    }
  }

  // User Profile Data matching the screenshot
  const profile = {
    name: user?.name || (user?.firstName ? `${user.firstName} ${user.lastName || ''}`.trim() : 'Arjun Krishnan'),
    headline: user?.college ? `Computer Science & Engineering · ${user.college}` : 'Computer Science & Engineering · PSG College of Technology',
    tags: 'Student · Builder · Community member',
    bio: user?.bio ||
      'Passionate about building products, learning with peers, and creating impactful things for the college community. Interested in full-stack development, AI, and open source. Always excited to collaborate!',
    location: 'Coimbatore, India',
    status: 'open to collaborate',
    joinedDate: 'Joined Jan 2024',
    followersCount: 324,
    followingCount: 287,
    postsCount: 42,
    avatar:
      customAvatar ||
      user?.profilePicture ||
      user?.image ||
      DEFAULT_WHATSAPP_AVATAR,
    college: user?.college || 'PSG College of Technology',
    collegeLocation: 'Coimbatore, Tamil Nadu',
    degree: 'Computer Science & Engineering',
    year: user?.year ? `${user.year} Year (2024 - 2028)` : 'B.E. · 3rd Year (2024 - 2028)',
    skills: [
      'TypeScript',
      'React',
      'Node.js',
      'Python',
      'PostgreSQL',
      'MongoDB',
      'AWS',
      'Docker',
      'Next.js',
      'Prisma',
      'System Design',
      'DSA',
    ],
    interests: [
      'Product Design',
      'Open Source',
      'Startups',
      'AI',
      'Photography',
      'Music',
      'Tech Communities',
    ],
  }

  const handleShare = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href)
      setCopiedToast(true)
      setTimeout(() => setCopiedToast(false), 2400)
    }
  }

  const toggleLike = (postId: string) => {
    setLikedPosts((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }))
  }

  return (
    <div className="profile-page-wrapper">
      {/* Toast Notification */}
      {copiedToast && (
        <div style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          backgroundColor: '#18181b',
          color: '#ffffff',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          borderRadius: '0px',
          padding: '10px 18px',
          fontSize: '13px',
          boxShadow: '0 8px 30px rgba(0,0,0,0.8)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}>
          <CheckCircle2 size={16} color="#34d399" />
          <span>Profile link copied to clipboard!</span>
        </div>
      )}

      {/* ====================================================================
          1. TOP NAVIGATION BAR
          ==================================================================== */}
      <header className="profile-navbar">
        <div className="profile-navbar-container">
          {/* Left: Brand & Navigation Links */}
          <div className="profile-nav-left">
            <span
              className="profile-nav-logo"
              onClick={() => {
                if (onNavigateHome) onNavigateHome()
                else window.location.hash = ''
              }}
            >
              Lumina
            </span>

            <nav className="profile-nav-links">
              <a
                href="#about"
                className="profile-nav-link"
                onClick={(e) => {
                  e.preventDefault()
                  if (onNavigateHome) onNavigateHome()
                  else window.location.hash = 'about'
                }}
              >
                About
              </a>
              <a
                href="#features"
                className="profile-nav-link"
                onClick={(e) => {
                  e.preventDefault()
                  if (onNavigateHome) onNavigateHome()
                  else window.location.hash = 'features'
                }}
              >
                Features
              </a>
              <a
                href="#communities"
                className="profile-nav-link"
                onClick={(e) => {
                  e.preventDefault()
                  if (onBackToDashboard) onBackToDashboard()
                  else window.location.hash = 'feed'
                }}
              >
                Communities
              </a>
              <a href="#careers" className="profile-nav-link">Careers</a>
              <a href="#blog" className="profile-nav-link">Blog</a>
            </nav>
          </div>

          {/* Right: Search, Notification, Dashboard & Avatar */}
          <div className="profile-nav-right">
            <div className="profile-nav-search">
              <Search size={14} color="rgba(255, 255, 255, 0.4)" />
              <input
                type="text"
                placeholder="Search"
                className="profile-nav-search-input"
              />
              <span className="profile-nav-search-kbd">⌘ K</span>
            </div>

            <button type="button" className="profile-nav-icon-btn" aria-label="Notifications">
              <Bell size={16} />
            </button>

            <button
              type="button"
              className="profile-nav-dash-btn"
              onClick={() => {
                if (onBackToDashboard) onBackToDashboard()
                else window.location.hash = 'feed'
              }}
            >
              Dashboard
            </button>

            <img
              src={profile.avatar}
              alt={profile.name}
              className="profile-nav-avatar"
              onError={(e) => {
                e.currentTarget.src = DEFAULT_WHATSAPP_AVATAR
              }}
            />
          </div>
        </div>
      </header>

      {/* ====================================================================
          2. COVER BANNER
          ==================================================================== */}
      <div className="profile-cover-wrap">
        <div className="profile-cover-overlay" />
        <div className="profile-cover-action-bar">
          <button type="button" className="profile-change-cover-btn">
            <Camera size={13} />
            <span>Change cover</span>
          </button>
        </div>
      </div>

      {/* ====================================================================
          3. PROFILE HEADER BLOCK
          ==================================================================== */}
      <div className="profile-header-container">
        <div className="profile-header-layout">
          {/* Left: Avatar & Details */}
          <div className="profile-header-left">
            <div className="profile-avatar-container">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={handleAvatarFile}
              />
              <img
                src={profile.avatar}
                alt={profile.name}
                className="profile-avatar-img"
                style={{ cursor: 'pointer' }}
                onClick={() => fileInputRef.current?.click()}
                title="Click to change profile picture"
                onError={(e) => {
                  e.currentTarget.src = DEFAULT_WHATSAPP_AVATAR
                }}
              />
            </div>

            <div className="profile-info-wrap">
              <div className="profile-name-row">
                <h1 className="profile-name-title">{profile.name}</h1>
                <span className="profile-verified-badge" title="Verified College Student">
                  <CheckCircle2 size={14} fill="#0ea5e9" color="#ffffff" />
                </span>
              </div>

              <p className="profile-subline-1">{profile.headline}</p>
              <p className="profile-subline-2">{profile.tags}</p>

              <p className="profile-bio-text">{profile.bio}</p>

              <div className="profile-meta-tags-row">
                <span className="profile-meta-tag-item">
                  <MapPin size={13} />
                  <span>{profile.location}</span>
                </span>
                <span className="profile-meta-tag-item">
                  <LinkIcon size={13} />
                  <span>{profile.status}</span>
                </span>
                <span className="profile-meta-tag-item">
                  <Calendar size={13} />
                  <span>{profile.joinedDate}</span>
                </span>
              </div>
            </div>
          </div>

          {/* Right: Stats & Action Buttons */}
          <div className="profile-header-right">
            <div className="profile-stats-row">
              <div className="profile-stat-box">
                <span className="profile-stat-number">{profile.followersCount}</span>
                <span className="profile-stat-label">Followers</span>
              </div>
              <div className="profile-stat-box">
                <span className="profile-stat-number">{profile.followingCount}</span>
                <span className="profile-stat-label">Following</span>
              </div>
              <div className="profile-stat-box">
                <span className="profile-stat-number">{profile.postsCount}</span>
                <span className="profile-stat-label">Posts</span>
              </div>
            </div>

            <div className="profile-actions-row">
              <button type="button" className="profile-btn-edit">
                <Edit3 size={14} />
                <span>Edit profile</span>
              </button>
              <button
                type="button"
                className="profile-btn-secondary"
                onClick={handleShare}
              >
                <Share2 size={14} />
                <span>Share</span>
              </button>
              <button
                type="button"
                className="profile-btn-icon"
                aria-label="More Options"
              >
                <MoreHorizontal size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ====================================================================
          4. MAIN CONTENT TWO-COLUMN GRID
          ==================================================================== */}
      <main className="profile-content-container">
        {/* Left Column: Feed Content under Posts */}
        <div className="profile-content-left">
          {/* Navigation Tabs Bar */}
          <div className="profile-tabs-bar">
            <button
              type="button"
              className={`profile-tab-item ${activeTab === 'posts' ? 'is-active' : ''}`}
              onClick={() => setActiveTab('posts')}
            >
              <FileText size={15} />
              <span>Posts</span>
            </button>
            <button
              type="button"
              className={`profile-tab-item ${activeTab === 'about' ? 'is-active' : ''}`}
              onClick={() => setActiveTab('about')}
            >
              <Info size={15} />
              <span>About</span>
            </button>
            <button
              type="button"
              className={`profile-tab-item ${activeTab === 'projects' ? 'is-active' : ''}`}
              onClick={() => setActiveTab('projects')}
            >
              <FolderGit2 size={15} />
              <span>Projects</span>
            </button>
            <button
              type="button"
              className={`profile-tab-item ${activeTab === 'achievements' ? 'is-active' : ''}`}
              onClick={() => setActiveTab('achievements')}
            >
              <Award size={15} />
              <span>Achievements</span>
            </button>
            <button
              type="button"
              className={`profile-tab-item ${activeTab === 'communities' ? 'is-active' : ''}`}
              onClick={() => setActiveTab('communities')}
            >
              <Users2 size={15} />
              <span>Communities</span>
            </button>
            <button
              type="button"
              className={`profile-tab-item ${activeTab === 'saved' ? 'is-active' : ''}`}
              onClick={() => setActiveTab('saved')}
            >
              <Bookmark size={15} />
              <span>Saved</span>
            </button>
          </div>

          {/* 1. Create a Post Box */}
          <div className="profile-create-post-card">
            <div className="profile-create-post-top">
              <img
                src={profile.avatar}
                alt={profile.name}
                className="profile-create-post-avatar"
                onError={(e) => {
                  e.currentTarget.src = DEFAULT_WHATSAPP_AVATAR
                }}
              />
              <input
                type="text"
                placeholder="Share your thoughts, updates, or links..."
                className="profile-create-post-input"
              />
            </div>
            <div className="profile-create-post-actions">
              <button type="button" className="profile-create-action-btn">
                <FileText size={13} color="#93c5fd" />
                <span>Text</span>
              </button>
              <button type="button" className="profile-create-action-btn">
                <ImageIcon size={13} color="#34d399" />
                <span>Image</span>
              </button>
              <button type="button" className="profile-create-action-btn">
                <Video size={13} color="#fbbf24" />
                <span>Video</span>
              </button>
              <button type="button" className="profile-create-action-btn">
                <LinkIcon size={13} color="#c084fc" />
                <span>Link</span>
              </button>
              <button type="button" className="profile-create-action-btn">
                <BarChart2 size={13} color="#f472b6" />
                <span>Poll</span>
              </button>
            </div>
          </div>

          {/* 2. Feed Post 1 */}
          <article className="profile-feed-post-card">
            <div className="profile-feed-author-row">
              <div className="profile-feed-author-left">
                <img
                  src={profile.avatar}
                  alt={profile.name}
                  className="profile-feed-author-avatar"
                  onError={(e) => {
                    e.currentTarget.src = DEFAULT_WHATSAPP_AVATAR
                  }}
                />
                <div>
                  <h3 className="profile-feed-author-name">{profile.name}</h3>
                  <p className="profile-feed-author-sub">2 days ago · PSG Tech</p>
                </div>
              </div>
              <button type="button" className="profile-feed-more-btn" aria-label="Post Options">
                <MoreHorizontal size={16} />
              </button>
            </div>

            <h2 className="profile-feed-post-title">
              Building a College Community Product: Lessons from the First 6 Months
            </h2>
            <p className="profile-feed-post-desc">
              Key learnings, challenges, and what&apos;s next for Lumina. From idea to real users, here&apos;s what I learned while building a verified college community platform.
            </p>

            <div className="profile-feed-media-wrap">
              <img
                src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1000&auto=format&fit=crop&q=80"
                alt="Building a College Community Product"
                className="profile-feed-media-img"
              />
            </div>

            <div className="profile-feed-footer">
              <div className="profile-feed-footer-left">
                <button
                  type="button"
                  className="profile-feed-action-btn"
                  onClick={() => toggleLike('p1')}
                  style={{ color: likedPosts['p1'] ? '#f43f5e' : undefined }}
                >
                  <Heart size={14} fill={likedPosts['p1'] ? '#f43f5e' : 'none'} />
                  <span>{likedPosts['p1'] ? 129 : 128}</span>
                </button>
                <button type="button" className="profile-feed-action-btn">
                  <MessageCircle size={14} />
                  <span>24</span>
                </button>
              </div>

              <div className="profile-feed-footer-right">
                <button type="button" className="profile-feed-action-btn" aria-label="Bookmark">
                  <Bookmark size={14} />
                </button>
                <button type="button" className="profile-feed-share-btn" onClick={handleShare}>
                  <Share2 size={13} />
                  <span>Share</span>
                </button>
              </div>
            </div>
          </article>

          {/* 3. Feed Post 2 */}
          <article className="profile-feed-post-card">
            <div className="profile-feed-author-row">
              <div className="profile-feed-author-left">
                <img
                  src={profile.avatar}
                  alt={profile.name}
                  className="profile-feed-author-avatar"
                  onError={(e) => {
                    e.currentTarget.src = DEFAULT_WHATSAPP_AVATAR
                  }}
                />
                <div>
                  <h3 className="profile-feed-author-name">{profile.name}</h3>
                  <p className="profile-feed-author-sub">1 week ago · PSG Tech</p>
                </div>
              </div>
              <button type="button" className="profile-feed-more-btn" aria-label="Post Options">
                <MoreHorizontal size={16} />
              </button>
            </div>

            <h2 className="profile-feed-post-title">
              Why College Communities Matter More Than Ever
            </h2>
            <p className="profile-feed-post-desc">
              Thoughts on building verified college networks and the future of student communities. Excited to see more students collaborate and build together!
            </p>

            <div className="profile-feed-media-wrap">
              <img
                src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1000&auto=format&fit=crop&q=80"
                alt="Why College Communities Matter More Than Ever"
                className="profile-feed-media-img"
              />
            </div>

            <div className="profile-feed-footer">
              <div className="profile-feed-footer-left">
                <button
                  type="button"
                  className="profile-feed-action-btn"
                  onClick={() => toggleLike('p2')}
                  style={{ color: likedPosts['p2'] ? '#f43f5e' : undefined }}
                >
                  <Heart size={14} fill={likedPosts['p2'] ? '#f43f5e' : 'none'} />
                  <span>{likedPosts['p2'] ? 97 : 96}</span>
                </button>
                <button type="button" className="profile-feed-action-btn">
                  <MessageCircle size={14} />
                  <span>12</span>
                </button>
              </div>

              <div className="profile-feed-footer-right">
                <button type="button" className="profile-feed-action-btn" aria-label="Bookmark">
                  <Bookmark size={14} />
                </button>
                <button type="button" className="profile-feed-share-btn" onClick={handleShare}>
                  <Share2 size={13} />
                  <span>Share</span>
                </button>
              </div>
            </div>
          </article>

          {/* 4. Feed Post 3: Split IDE Terminal Block */}
          <article className="profile-feed-post-card">
            <div className="profile-feed-author-row">
              <div className="profile-feed-author-left">
                <img
                  src={profile.avatar}
                  alt={profile.name}
                  className="profile-feed-author-avatar"
                  onError={(e) => {
                    e.currentTarget.src = DEFAULT_WHATSAPP_AVATAR
                  }}
                />
                <div>
                  <h3 className="profile-feed-author-name">{profile.name}</h3>
                  <p className="profile-feed-author-sub">2 weeks ago · Tech</p>
                </div>
              </div>
              <button type="button" className="profile-feed-more-btn" aria-label="Post Options">
                <MoreHorizontal size={16} />
              </button>
            </div>

            <h2 className="profile-feed-post-title">
              My Development Setup in 2026
            </h2>
            <p className="profile-feed-post-desc">
              Sharing my current tech stack, tools and setup for full-stack development. This has been working really well for me lately.
            </p>

            {/* Split IDE Box */}
            <div className="profile-feed-ide-box">
              <div className="profile-ide-code-side">
                <div className="profile-code-line">
                  <span className="code-lineno">1</span>
                  <span><span className="code-keyword">import</span> &#123; <span className="code-fn">serve</span> &#125; <span className="code-keyword">from</span> <span className="code-string">&apos;bun&apos;</span></span>
                </div>
                <div className="profile-code-line">
                  <span className="code-lineno">2</span>
                  <span><span className="code-keyword">import</span> &#123; <span className="code-fn">prisma</span> &#125; <span className="code-keyword">from</span> <span className="code-string">&apos;@prisma/client&apos;</span></span>
                </div>
                <div className="profile-code-line">
                  <span className="code-lineno">3</span>
                  <span><span className="code-keyword">import</span> &#123; <span className="code-fn">app</span> &#125; <span className="code-keyword">from</span> <span className="code-string">&apos;./app&apos;</span></span>
                </div>
                <div className="profile-code-line">
                  <span className="code-lineno">4</span>
                  <span>&nbsp;</span>
                </div>
                <div className="profile-code-line">
                  <span className="code-lineno">5</span>
                  <span><span className="code-fn">serve</span>(&#123;</span>
                </div>
                <div className="profile-code-line">
                  <span className="code-lineno">6</span>
                  <span>&nbsp;&nbsp;<span className="code-prop">fetch</span>: app.fetch,</span>
                </div>
                <div className="profile-code-line">
                  <span className="code-lineno">7</span>
                  <span>&nbsp;&nbsp;<span className="code-prop">port</span>: <span className="code-string">3000</span>,</span>
                </div>
                <div className="profile-code-line">
                  <span className="code-lineno">8</span>
                  <span>&#125;)</span>
                </div>
              </div>

              <div className="profile-ide-tree-side">
                <div>📁 <span className="tree-folder">lumina/</span></div>
                <div>&nbsp;&nbsp;📁 <span className="tree-folder">apps/</span></div>
                <div>&nbsp;&nbsp;&nbsp;&nbsp;📄 web</div>
                <div>&nbsp;&nbsp;&nbsp;&nbsp;📄 api</div>
                <div>&nbsp;&nbsp;📁 <span className="tree-folder">packages/</span></div>
                <div>&nbsp;&nbsp;&nbsp;&nbsp;📄 ui</div>
                <div>&nbsp;&nbsp;&nbsp;&nbsp;📄 config</div>
                <div>&nbsp;&nbsp;📄 docker</div>
                <div>&nbsp;&nbsp;📄 README.md</div>
              </div>
            </div>

            <div className="profile-feed-footer">
              <div className="profile-feed-footer-left">
                <button
                  type="button"
                  className="profile-feed-action-btn"
                  onClick={() => toggleLike('p3')}
                  style={{ color: likedPosts['p3'] ? '#f43f5e' : undefined }}
                >
                  <Heart size={14} fill={likedPosts['p3'] ? '#f43f5e' : 'none'} />
                  <span>{likedPosts['p3'] ? 65 : 64}</span>
                </button>
                <button type="button" className="profile-feed-action-btn">
                  <MessageCircle size={14} />
                  <span>18</span>
                </button>
              </div>

              <div className="profile-feed-footer-right">
                <button type="button" className="profile-feed-action-btn" aria-label="Bookmark">
                  <Bookmark size={14} />
                </button>
                <button type="button" className="profile-feed-share-btn" onClick={handleShare}>
                  <Share2 size={13} />
                  <span>Share</span>
                </button>
              </div>
            </div>
          </article>

          {/* 5. Load More Button */}
          <button type="button" className="profile-load-more-btn">
            <RotateCw size={13} />
            <span>Load more posts</span>
          </button>
        </div>
      </main>
    </div>
  )
}

export default ProfilePage
