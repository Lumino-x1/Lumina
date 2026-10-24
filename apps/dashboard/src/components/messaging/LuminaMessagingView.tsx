import React, { useState, useRef, useEffect, useMemo } from 'react'
import {
  ArrowLeft,
  Search,
  Phone,
  Video,
  Users,
  Paperclip,
  Code,
  Smile,
  Mic,
  Send,
  Download,
  CheckCheck,
  BadgeCheck,
  FileText,
  Sigma,
} from 'lucide-react'
import './LuminaMessagingView.css'
import type { DashboardUser } from '../../DashboardPage'

export interface MessageAttachment {
  type: 'pdf' | 'slide' | 'image' | 'link'
  fileName: string
  fileSize?: string
  fileSubtitle?: string
  url?: string
}

export interface ChatMessage {
  id: string
  sender: 'me' | 'them'
  senderName: string
  senderAvatar?: string
  text: string
  time: string
  attachment?: MessageAttachment
}

export interface SharedClass {
  code: string
  name: string
  schedule: string
  color: string
}

export interface SharedMediaItem {
  id: string
  type: 'slide' | 'photo' | 'group'
  title: string
  badgeLabel: string
  imageUrl: string
}

export interface PinnedLink {
  id: string
  type: 'notion' | 'github' | 'generic'
  url: string
  pinnedBy: string
}

export interface MutualFriend {
  id: string
  name: string
  avatar: string
}

export interface Conversation {
  id: string
  name: string
  avatar: string
  isGroup?: boolean
  verified?: boolean
  handle?: string
  majorBadge?: string
  status: 'online' | 'idle' | 'offline'
  statusText?: string
  lastTime: string
  snippet: string
  secondarySnippet?: string
  tags?: string[]
  unreadCount?: number
  deliveryStatus?: 'sent' | 'delivered' | 'read'
  messages: ChatMessage[]
  sharedClasses?: SharedClass[]
  sharedMedia?: SharedMediaItem[]
  pinnedLinks?: PinnedLink[]
  mutualFriends?: MutualFriend[]
  extraMutualCount?: number
}

interface LuminaMessagingViewProps {
  currentUser?: DashboardUser | null
  onBackToDashboard?: () => void
  onOpenProfile?: () => void
  onLogout?: () => void
  initialChatId?: string | null
}

const INITIAL_CONVERSATIONS: Conversation[] = [
  {
    id: 'maya-chen',
    name: 'Maya Chen',
    avatar:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
    verified: true,
    handle: '@mayachen • Class of \'25',
    majorBadge: 'Stanford CS & Symbolic Systems',
    status: 'online',
    statusText: 'Active now',
    lastTime: '10:42 AM',
    snippet: 'Are we meeting at the library for AI Ethics?',
    tags: ["CS & CogSci '25", '📍 Green Library'],
    messages: [
      {
        id: 'maya-1',
        sender: 'them',
        senderName: 'Maya Chen',
        senderAvatar:
          'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        text: 'Hey Alex! Did you manage to review the revised rubric and syllabus for the AI Ethics project? Prof. Roberts updated the dataset requirements yesterday.',
        time: '10:30 AM',
        attachment: {
          type: 'pdf',
          fileName: 'AI_Ethics_Brie...',
          fileSize: '1.4 MB',
          fileSubtitle: 'Updated Syllabus PDF',
        },
      },
      {
        id: 'maya-2',
        sender: 'me',
        senderName: 'Alex (You)',
        text: 'Hey Maya! Yes, just finished reading it. Section 3 on algorithmic bias in generative vision models is super compelling. We can totally build our benchmark on that.',
        time: '10:36 AM',
      },
    ],
    sharedClasses: [
      {
        code: 'CS 480',
        name: 'CS 480 Capstone',
        schedule: 'Mon / Wed',
        color: '#3B82F6',
      },
      {
        code: 'PHIL 150',
        name: 'PHIL 150 AI Ethics',
        schedule: 'Tue / Thu',
        color: '#A855F7',
      },
      {
        code: 'STATS 214',
        name: 'STATS 214 Machine Learning',
        schedule: 'Fri',
        color: '#F59E0B',
      },
    ],
    sharedMedia: [
      {
        id: 'sm-1',
        type: 'slide',
        title: 'Project Architecture Slide',
        badgeLabel: 'Slide',
        imageUrl:
          'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&auto=format&fit=crop&q=80',
      },
      {
        id: 'sm-2',
        type: 'photo',
        title: 'Neural Lens Schematics',
        badgeLabel: 'Photo',
        imageUrl:
          'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&auto=format&fit=crop&q=80',
      },
      {
        id: 'sm-3',
        type: 'group',
        title: 'Study Session Photo',
        badgeLabel: 'Group',
        imageUrl:
          'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&auto=format&fit=crop&q=80',
      },
    ],
    pinnedLinks: [
      {
        id: 'pl-1',
        type: 'notion',
        url: 'notion.so/stanford-cs480-rubric',
        pinnedBy: 'Pinned by Alex • Oct 22',
      },
      {
        id: 'pl-2',
        type: 'github',
        url: 'github.com/maya-chen/ai-bias-lens',
        pinnedBy: 'Pinned by Maya • Oct 20',
      },
    ],
    mutualFriends: [
      {
        id: 'mf-1',
        name: 'David Kalu',
        avatar:
          'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
      },
      {
        id: 'mf-2',
        name: 'Sarah Jenkins',
        avatar:
          'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
      },
      {
        id: 'mf-3',
        name: 'Marcus Vance',
        avatar:
          'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
      },
      {
        id: 'mf-4',
        name: 'Priya Sharma',
        avatar:
          'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80',
      },
    ],
    extraMutualCount: 4,
  },
  {
    id: 'david-kalu',
    name: 'David Kalu',
    avatar:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80',
    verified: false,
    handle: '@dkalu • Class of \'24',
    majorBadge: 'Stanford EE & Distributed Systems',
    status: 'online',
    statusText: 'Active now',
    lastTime: '9:15 AM',
    snippet: 'Sent you the project repo link 🚀',
    secondarySnippet: 'Shared github.com/lumin-a...',
    unreadCount: 2,
    messages: [
      {
        id: 'david-1',
        sender: 'them',
        senderName: 'David Kalu',
        senderAvatar:
          'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
        text: 'Hey Alex! Just pushed the initial distributed consensus node implementation to the repo.',
        time: '9:12 AM',
      },
      {
        id: 'david-2',
        sender: 'them',
        senderName: 'David Kalu',
        senderAvatar:
          'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
        text: 'Sent you the project repo link 🚀: github.com/lumina-distributed/mesh-core',
        time: '9:15 AM',
      },
    ],
    sharedClasses: [
      {
        code: 'CS 244B',
        name: 'CS 244B Distributed Systems',
        schedule: 'Tue / Thu',
        color: '#3B82F6',
      },
    ],
    mutualFriends: [
      {
        id: 'mf-1',
        name: 'Maya Chen',
        avatar:
          'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
      },
    ],
  },
  {
    id: 'cs480-capstone',
    name: 'CS480 Capstone',
    avatar: '',
    isGroup: true,
    handle: '5 members active • Stanford Capstone',
    majorBadge: 'CS 480 Senior Project Team',
    status: 'online',
    statusText: '5 active members',
    lastTime: 'Yesterday',
    snippet: 'Elena: Slides are ready for review',
    tags: ['5 members active'],
    unreadCount: 5,
    messages: [
      {
        id: 'cs-1',
        sender: 'them',
        senderName: 'Elena Rostova',
        text: 'Team, the midterm review deck is finalized in Figma and Google Slides.',
        time: 'Yesterday 4:15 PM',
      },
      {
        id: 'cs-2',
        sender: 'them',
        senderName: 'Elena Rostova',
        text: 'Slides are ready for review! Please drop your comments before 6 PM.',
        time: 'Yesterday 4:18 PM',
      },
    ],
    sharedClasses: [
      {
        code: 'CS 480',
        name: 'CS 480 Senior Capstone',
        schedule: 'Mon / Wed / Fri',
        color: '#3B82F6',
      },
    ],
    mutualFriends: [],
  },
  {
    id: 'sarah-jenkins',
    name: 'Sarah Jenkins',
    avatar:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&auto=format&fit=crop&q=80',
    verified: false,
    handle: '@sarahj • Class of \'25',
    majorBadge: 'Product Design & HCI',
    status: 'idle',
    statusText: 'Away (15m)',
    lastTime: 'Yesterday',
    snippet: 'Sounds good, let me check the schedule!',
    deliveryStatus: 'delivered',
    messages: [
      {
        id: 'sj-1',
        sender: 'me',
        senderName: 'Alex (You)',
        text: 'Hey Sarah, are you free for a quick sync on the Lumina UI components tomorrow afternoon?',
        time: 'Yesterday 2:10 PM',
      },
      {
        id: 'sj-2',
        sender: 'them',
        senderName: 'Sarah Jenkins',
        senderAvatar:
          'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
        text: 'Sounds good, let me check the schedule! I should be free around 3 PM.',
        time: 'Yesterday 2:34 PM',
      },
    ],
    sharedClasses: [
      {
        code: 'CS 147',
        name: 'CS 147 Intro to HCI',
        schedule: 'Mon / Wed',
        color: '#10B981',
      },
    ],
  },
  {
    id: 'marcus-vance',
    name: 'Marcus Vance',
    avatar:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80',
    verified: false,
    handle: '@mvance • Class of \'24',
    majorBadge: 'Applied Math & Statistics',
    status: 'offline',
    statusText: 'Last seen Tuesday',
    lastTime: 'Tuesday',
    snippet: 'Can you send the lecture recording?',
    secondarySnippet: 'MATH 310 TA Session',
    messages: [
      {
        id: 'mv-1',
        sender: 'them',
        senderName: 'Marcus Vance',
        senderAvatar:
          'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
        text: 'Hey Alex, missed the beginning of yesterday\'s linear algebra discussion. Can you send the lecture recording?',
        time: 'Tuesday 11:20 AM',
      },
      {
        id: 'mv-2',
        sender: 'me',
        senderName: 'Alex (You)',
        text: 'Uploaded it to Canvas under the TA shared folder!',
        time: 'Tuesday 11:45 AM',
      },
    ],
    sharedClasses: [
      {
        code: 'MATH 310',
        name: 'MATH 310 TA Session',
        schedule: 'Tuesday 10 AM',
        color: '#EC4899',
      },
    ],
  },
  {
    id: 'priya-sharma',
    name: 'Priya Sharma',
    avatar:
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&auto=format&fit=crop&q=80',
    verified: true,
    handle: '@psharma • Class of \'25',
    majorBadge: 'Computer Systems & AI Ethics',
    status: 'online',
    statusText: 'Active now',
    lastTime: 'Monday',
    snippet: 'See you at the hackathon workshop!',
    secondarySnippet: 'TreeHacks Lead Organizer',
    messages: [
      {
        id: 'ps-1',
        sender: 'them',
        senderName: 'Priya Sharma',
        senderAvatar:
          'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80',
        text: 'Hey Alex, all workshop mentor stations are assigned! See you at the hackathon workshop!',
        time: 'Monday 3:40 PM',
      },
      {
        id: 'ps-2',
        sender: 'me',
        senderName: 'Alex (You)',
        text: 'Can\'t wait Priya! Stanford AI lab is ready.',
        time: 'Monday 4:02 PM',
      },
    ],
    sharedClasses: [
      {
        code: 'CS 182',
        name: 'Ethics, Public Policy, and Tech',
        schedule: 'Tue / Thu',
        color: '#6366F1',
      },
    ],
  },
]

export const LuminaMessagingView: React.FC<LuminaMessagingViewProps> = ({
  currentUser,
  onBackToDashboard: _onBackToDashboard,
  onOpenProfile: _onOpenProfile,
  onLogout: _onLogout,
  initialChatId,
}) => {
  const [conversations, setConversations] =
    useState<Conversation[]>(INITIAL_CONVERSATIONS)
  const [activeChatId, setActiveChatId] = useState<string>(
    initialChatId || 'maya-chen'
  )
  const [searchQuery, setSearchQuery] = useState('')
  const [activeFilter, setActiveFilter] = useState<
    'all' | 'unread' | 'groups'
  >('all')
  const [inputText, setInputText] = useState('')
  const [mobileView, setMobileView] = useState<'list' | 'thread'>('list')

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const currentUserName = currentUser?.name || 'Alex Rivera'

  const activeConversation = useMemo(() => {
    return (
      conversations.find((c) => c.id === activeChatId) || conversations[0]
    )
  }, [conversations, activeChatId])

  // Filter conversations
  const filteredConversations = useMemo(() => {
    return conversations.filter((c) => {
      // Tab filter
      if (activeFilter === 'unread') {
        if (!c.unreadCount || c.unreadCount <= 0) return false
      } else if (activeFilter === 'groups') {
        if (!c.isGroup) return false
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim()
        const matchesName = c.name.toLowerCase().includes(q)
        const matchesSnippet = c.snippet.toLowerCase().includes(q)
        const matchesTags = c.tags?.some((t) => t.toLowerCase().includes(q))
        return matchesName || matchesSnippet || matchesTags
      }
      return true
    })
  }, [conversations, activeFilter, searchQuery])

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [activeConversation?.messages])

  const handleSendMessage = () => {
    if (!inputText.trim()) return

    const now = new Date()
    const timeStr = now.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    })

    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'me',
      senderName: `${currentUserName} (You)`,
      text: inputText.trim(),
      time: timeStr,
    }

    setConversations((prev) =>
      prev.map((conv) => {
        if (conv.id === activeConversation.id) {
          return {
            ...conv,
            snippet: inputText.trim(),
            lastTime: timeStr,
            unreadCount: 0,
            messages: [...conv.messages, newMsg],
          }
        }
        return conv
      })
    )

    setInputText('')
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault()
      handleSendMessage()
    } else if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="notion-chat-layout">
      {/* =========================================================================
          MAIN CHAT WORKSPACE (RESPONSIVE 2-PANEL NOTION-BLACK CHAT)
         ========================================================================= */}
      <div className="notion-chat-main-container">
        {/* Responsive Chat Layout */}
        <div
          className={`notion-chat-columns ${
            mobileView === 'thread' ? 'mobile-show-thread' : 'mobile-show-list'
          }`}
        >
          {/* =====================================================================
              COLUMN 1: CONVERSATIONS LIST
             ===================================================================== */}
          <section className="notion-col-conversations">
            {/* Header: Title */}
            <div className="notion-conv-header">
              <div className="notion-conv-title-wrap">
                <h2 className="notion-conv-title">Messages</h2>
              </div>
            </div>

            {/* Quick Search with ⌘K */}
            <div className="notion-conv-search-wrap">
              <Search size={15} className="notion-conv-search-icon" />
              <input
                type="text"
                placeholder="Search friends or messages..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="notion-conv-search-input"
              />
              <span className="notion-conv-kbd">⌘K</span>
            </div>

            {/* Filter Tabs */}
            <div className="notion-conv-tabs">
              <button
                type="button"
                className={`notion-conv-tab-btn ${activeFilter === 'all' ? 'active' : ''}`}
                onClick={() => setActiveFilter('all')}
              >
                All
              </button>
              <button
                type="button"
                className={`notion-conv-tab-btn ${activeFilter === 'unread' ? 'active' : ''}`}
                onClick={() => setActiveFilter('unread')}
              >
                Unread 3
              </button>
              <button
                type="button"
                className={`notion-conv-tab-btn ${activeFilter === 'groups' ? 'active' : ''}`}
                onClick={() => setActiveFilter('groups')}
              >
                Study Groups
              </button>
            </div>

            {/* Scrollable Conversation List */}
            <div className="notion-conv-scroll-list">
              {filteredConversations.map((conv) => {
                const isSelected = conv.id === activeConversation.id

                return (
                  <div
                    key={conv.id}
                    className={`notion-conv-card ${isSelected ? 'is-selected' : ''}`}
                    onClick={() => {
                      setActiveChatId(conv.id)
                      setMobileView('thread')
                    }}
                    role="button"
                    tabIndex={0}
                  >
                    {/* Avatar with Status Dot */}
                    <div className="notion-conv-avatar-box">
                      {conv.isGroup ? (
                        <div className="notion-conv-group-avatar">
                          <span className="notion-group-initials">CS 480</span>
                        </div>
                      ) : (
                        <img
                          src={conv.avatar}
                          alt={conv.name}
                          className="notion-conv-avatar-img"
                        />
                      )}
                      <span
                        className={`notion-conv-status-dot ${conv.status}`}
                      />
                    </div>

                    {/* Middle Card Content */}
                    <div className="notion-conv-info">
                      <div className="notion-conv-top-row">
                        <div className="notion-conv-name-row">
                          <span className="notion-conv-name">{conv.name}</span>
                          {conv.isGroup && (
                            <Users size={13} className="notion-group-icon" />
                          )}
                        </div>
                        <span className="notion-conv-time">
                          {conv.lastTime}
                        </span>
                      </div>

                      <div className="notion-conv-snippet-row">
                        <span className="notion-conv-snippet">
                          {conv.snippet}
                        </span>
                        {conv.unreadCount && conv.unreadCount > 0 ? (
                          <span className="notion-conv-unread-bubble">
                            {conv.unreadCount}
                          </span>
                        ) : conv.deliveryStatus === 'delivered' ? (
                          <span className="notion-conv-delivered-mark">
                            <CheckCheck size={14} /> Delivered
                          </span>
                        ) : null}
                      </div>

                      {conv.secondarySnippet && (
                        <div className="notion-conv-secondary-snippet">
                          {conv.secondarySnippet}
                        </div>
                      )}

                      {/* Badges / Location Tag Row */}
                      {conv.tags && conv.tags.length > 0 && (
                        <div className="notion-conv-badges-row">
                          {conv.tags.map((tag, idx) => (
                            <span key={idx} className="notion-conv-tag-pill">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </section>

          {/* =====================================================================
              COLUMN 2: MAIN CHAT THREAD (GRID PATTERN CANVAS)
             ===================================================================== */}
          <section className="notion-col-thread">
            {/* Thread Header */}
            <div className="notion-thread-header">
              <div className="notion-thread-header-left">
                <button
                  type="button"
                  className="notion-mobile-back-btn"
                  onClick={() => setMobileView('list')}
                  title="Back to messages"
                  aria-label="Back to messages"
                >
                  <ArrowLeft size={18} />
                </button>
                <div className="notion-thread-avatar-wrap">
                  {activeConversation.isGroup ? (
                    <div className="notion-conv-group-avatar mini">
                      <span className="notion-group-initials">CS 480</span>
                    </div>
                  ) : (
                    <img
                      src={activeConversation.avatar}
                      alt={activeConversation.name}
                      className="notion-thread-header-avatar"
                    />
                  )}
                  <span
                    className={`notion-conv-status-dot ${activeConversation.status}`}
                  />
                </div>
                <div className="notion-thread-header-info">
                  <div className="notion-thread-name-row">
                    <span className="notion-thread-header-name">
                      {activeConversation.name}
                    </span>
                    {activeConversation.verified && (
                      <BadgeCheck
                        size={15}
                        className="notion-verified-icon"
                      />
                    )}
                  </div>
                  <span className="notion-thread-header-sub">
                    {activeConversation.statusText || 'Active now'}
                  </span>
                </div>
              </div>

              <div className="notion-thread-header-actions">
                <button
                  type="button"
                  className="notion-thread-btn"
                  title="Phone Call"
                  onClick={() => alert(`Calling ${activeConversation.name}...`)}
                >
                  <Phone size={17} />
                </button>
                <button
                  type="button"
                  className="notion-thread-btn"
                  title="Video Call"
                  onClick={() =>
                    alert(`Starting Video Call with ${activeConversation.name}...`)
                  }
                >
                  <Video size={17} />
                </button>
                <button
                  type="button"
                  className="notion-thread-btn"
                  title="Search in conversation"
                  onClick={() => alert('Search in thread')}
                >
                  <Search size={17} />
                </button>
              </div>
            </div>

            {/* Chat Messages Body with Blueprint Grid */}
            <div className="notion-thread-body">
              {/* Date Separator Pill */}
              <div className="notion-date-divider">
                <span className="notion-date-pill">
                  TODAY, OCTOBER 24 • AI ETHICS PROJECT
                </span>
              </div>

              {/* Messages Flow */}
              <div className="notion-messages-list">
                {activeConversation.messages.map((msg) => {
                  const isThem = msg.sender === 'them'

                  return (
                    <div
                      key={msg.id}
                      className={`notion-message-row ${isThem ? 'from-them' : 'from-me'}`}
                    >
                      {isThem && (
                        <div className="notion-msg-avatar-col">
                          <img
                            src={msg.senderAvatar || activeConversation.avatar}
                            alt={msg.senderName}
                            className="notion-msg-avatar"
                          />
                        </div>
                      )}

                      <div className="notion-msg-content-col">
                        {/* Header: Sender Name + Timestamp */}
                        <div className="notion-msg-meta-row">
                          <span className="notion-msg-sender-name">
                            {msg.senderName}
                          </span>
                          <span className="notion-msg-time">{msg.time}</span>
                        </div>

                        {/* Bubble */}
                        <div
                          className={`notion-msg-bubble ${isThem ? 'bubble-them' : 'bubble-me'}`}
                        >
                          <p className="notion-msg-text">{msg.text}</p>

                          {/* Attachment Card if present */}
                          {msg.attachment && (
                            <div className="notion-attachment-card">
                              <div className="notion-attach-left">
                                <div className="notion-attach-pdf-badge">
                                  <FileText size={18} />
                                  <span className="notion-pdf-badge-label">
                                    PDF
                                  </span>
                                </div>
                                <div className="notion-attach-details">
                                  <span className="notion-attach-title">
                                    {msg.attachment.fileName}
                                  </span>
                                  <span className="notion-attach-subtitle">
                                    {msg.attachment.fileSize} •{' '}
                                    {msg.attachment.fileSubtitle}
                                  </span>
                                </div>
                              </div>
                              <button
                                type="button"
                                className="notion-attach-dl-btn"
                                title="Download PDF"
                                onClick={() =>
                                  alert(`Downloading ${msg.attachment?.fileName}`)
                                }
                              >
                                <Download size={16} />
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                })}
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Message Composer Area */}
            <div className="notion-composer-wrapper">
              <div className="notion-composer-box">
                <textarea
                  ref={textareaRef}
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Message..."
                  rows={2}
                  className="notion-composer-textarea"
                />

                <div className="notion-composer-toolbar">
                  {/* Left Formatting / Input Tools */}
                  <div className="notion-composer-tools-left">
                    <button
                      type="button"
                      className="notion-tool-btn"
                      title="Attach file or media"
                      onClick={() => alert('Attach file')}
                    >
                      <Paperclip size={16} />
                    </button>
                    <button
                      type="button"
                      className="notion-tool-btn"
                      title="Insert code block"
                      onClick={() =>
                        setInputText((prev) => prev + '\n```typescript\n\n```\n')
                      }
                    >
                      <Code size={16} />
                    </button>
                    <button
                      type="button"
                      className="notion-tool-btn"
                      title="Insert math formula (LaTeX)"
                      onClick={() => setInputText((prev) => prev + ' $\\sum_{i=1}^n$ ')}
                    >
                      <Sigma size={16} />
                    </button>
                    <button
                      type="button"
                      className="notion-tool-btn"
                      title="Add emoji"
                      onClick={() => setInputText((prev) => prev + ' 🚀')}
                    >
                      <Smile size={16} />
                    </button>
                    <button
                      type="button"
                      className="notion-tool-btn"
                      title="Voice message"
                      onClick={() => alert('Voice recording started')}
                    >
                      <Mic size={16} />
                    </button>
                  </div>

                  {/* Right: Shortcut Hint + Send Button */}
                  <div className="notion-composer-tools-right">
                    <span className="notion-composer-hint">
                      Ctrl + Enter to send
                    </span>
                    <button
                      type="button"
                      className="notion-send-btn"
                      onClick={handleSendMessage}
                      disabled={!inputText.trim()}
                    >
                      <span>Send</span>
                      <Send size={14} className="notion-send-icon" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default LuminaMessagingView
