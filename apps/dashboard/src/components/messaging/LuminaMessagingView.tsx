import React, { useState, useRef, useEffect } from 'react'
import {
  Search,
  Plus,
  MoreVertical,
  MoreHorizontal,
  ArrowLeft,
  Check,
  CheckCheck,
  Pin,
  Paperclip,
  Smile,
  Send,
  Mic,
  Phone,
  Video,
  FileText,
  Image as ImageIcon,
  Archive,
  Lock,
  X,
  Users,
  Sparkles,
  Download,
  ThumbsUp,
  Share2,
} from 'lucide-react'
import './LuminaMessagingView.css'
import type { DashboardUser } from '../../DashboardPage'
import { DEFAULT_WHATSAPP_AVATAR } from '../WhatsAppDefaultAvatar'

export interface ChatMessage {
  id: string
  sender: 'me' | 'them'
  senderName?: string
  text?: string
  time: string
  status?: 'sent' | 'delivered' | 'read'
  attachment?: {
    type: 'document' | 'image' | 'voice'
    fileName?: string
    fileSize?: string
    pageCount?: number
    imageUrl?: string
    caption?: string
  }
  isDeleted?: boolean
}

export interface ChatConversation {
  id: string
  name: string
  avatar?: string
  initials?: string
  isGroup?: boolean
  membersCount?: number
  membersPreview?: string
  pinned?: boolean
  unreadCount?: number
  isFavourite?: boolean
  isArchived?: boolean
  statusText?: string
  isOnline?: boolean
  lastMessageSnippet: string
  lastMessageType?: 'text' | 'document' | 'image' | 'deleted' | 'like'
  lastMessageTime: string
  lastMessageStatus?: 'sent' | 'delivered' | 'read'
  messages: ChatMessage[]
}

const INITIAL_CHATS: ChatConversation[] = [
  {
    id: 'sih-hackathon',
    name: 'SIH HACKATHON 🥇',
    isGroup: true,
    membersCount: 6,
    membersPreview: 'Muhamed Gowtham, Kiran, Sahaana, You, Rahul, Priya',
    pinned: true,
    unreadCount: 0,
    isFavourite: true,
    statusText: 'Muhamed, Kiran, Sahaana, Rahul, Priya, You',
    lastMessageSnippet: 'Muhamed Gowtham: 🚫 This message was deleted',
    lastMessageType: 'deleted',
    lastMessageTime: '20/09/25',
    lastMessageStatus: 'read',
    messages: [
      {
        id: 'sih-1',
        sender: 'them',
        senderName: 'Muhamed Gowtham',
        text: 'Team, our SIH Grand Finale presentation PPT is ready in the shared drive. Please check slide 8 for architecture.',
        time: '7:45 PM',
        status: 'read',
      },
      {
        id: 'sih-2',
        sender: 'them',
        senderName: 'Sahaana',
        text: 'Checked! I added the high-throughput Redis queue benchmarks and database schema diagram.',
        time: '7:52 PM',
        status: 'read',
      },
      {
        id: 'sih-3',
        sender: 'them',
        senderName: 'Kiran',
        text: 'All integration endpoints are tested on staging. Zero downtime.',
        time: '8:05 PM',
        status: 'read',
      },
      {
        id: 'sih-4',
        sender: 'them',
        senderName: 'Muhamed Gowtham',
        isDeleted: true,
        text: 'This message was deleted',
        time: '8:14 PM',
        status: 'read',
      },
      {
        id: 'sih-5',
        sender: 'me',
        text: 'Super! Deploying the latest build to Lumina production now. Good luck everyone! 🚀',
        time: '8:20 PM',
        status: 'read',
      },
    ],
  },
  {
    id: 'cn-project-presentation',
    name: 'cn project presentation unoff...',
    isGroup: true,
    membersCount: 4,
    membersPreview: 'Kiran, Krishna, kkagnesh, You',
    pinned: false,
    unreadCount: 0,
    statusText: 'Kiran, Krishna, kkagnesh, You',
    lastMessageSnippet: 'Kiran: exp9 final record',
    lastMessageType: 'text',
    lastMessageTime: '12:40 AM',
    lastMessageStatus: 'delivered',
    messages: [
      {
        id: 'cn-1',
        sender: 'them',
        senderName: 'Krishna Kumar',
        text: 'Guys, make sure your packet tracer topologies are saved in the lab folder before 8:30 AM tomorrow.',
        time: '12:30 AM',
      },
      {
        id: 'cn-2',
        sender: 'them',
        senderName: 'Kiran',
        text: 'exp9 final record is updated. Check the routing tables on slide 4.',
        time: '12:40 AM',
      },
    ],
  },
  {
    id: 'kiran-friend',
    name: 'Kiran Class Friend',
    isOnline: true,
    statusText: 'Online',
    pinned: false,
    unreadCount: 0,
    lastMessageSnippet: '📄 exp9 cn.pdf • 8 pages',
    lastMessageType: 'document',
    lastMessageTime: '12:39 AM',
    messages: [
      {
        id: 'kiran-1',
        sender: 'me',
        text: 'Kiran, did you calculate the subnet mask calculations for lab question 3?',
        time: '12:35 AM',
        status: 'read',
      },
      {
        id: 'kiran-2',
        sender: 'them',
        text: 'Yes! Here is the compiled PDF report with all network graphs.',
        time: '12:38 AM',
      },
      {
        id: 'kiran-3',
        sender: 'them',
        time: '12:39 AM',
        attachment: {
          type: 'document',
          fileName: 'exp9 cn.pdf',
          fileSize: '2.4 MB',
          pageCount: 8,
        },
      },
    ],
  },
  {
    id: 'krishna-kumar',
    name: 'Krishna Kumar',
    isOnline: false,
    statusText: 'last seen yesterday at 11:45 PM',
    pinned: false,
    unreadCount: 0,
    lastMessageSnippet: '📄 CN_MiniProject_Report_Designed (1)...',
    lastMessageType: 'document',
    lastMessageTime: 'Yesterday',
    messages: [
      {
        id: 'kk-1',
        sender: 'them',
        text: 'Here is the final mini project report with all cover pages and signatures formatted.',
        time: '9:15 PM',
      },
      {
        id: 'kk-2',
        sender: 'them',
        time: '9:16 PM',
        attachment: {
          type: 'document',
          fileName: 'CN_MiniProject_Report_Designed (1).pdf',
          fileSize: '4.8 MB',
          pageCount: 14,
        },
      },
    ],
  },
  {
    id: 'kkagnesh',
    name: 'kkagnesh Class Friend',
    isOnline: false,
    statusText: 'last seen yesterday at 10:12 PM',
    pinned: false,
    unreadCount: 0,
    lastMessageSnippet: '👍',
    lastMessageType: 'like',
    lastMessageTime: 'Yesterday',
    messages: [
      {
        id: 'ka-1',
        sender: 'me',
        text: 'Are you coming to the college library at 9 AM tomorrow for the review?',
        time: '6:15 PM',
        status: 'read',
      },
      {
        id: 'ka-2',
        sender: 'them',
        text: '👍',
        time: '6:22 PM',
      },
    ],
  },
  {
    id: 'sahaana',
    name: 'Sahaana',
    isOnline: true,
    statusText: 'Online',
    pinned: false,
    unreadCount: 0,
    isFavourite: true,
    lastMessageSnippet: '📷 46 photos',
    lastMessageType: 'image',
    lastMessageTime: 'Yesterday',
    lastMessageStatus: 'delivered',
    messages: [
      {
        id: 'sah-1',
        sender: 'them',
        text: 'Uploaded the hackathon presentation ceremony and awards photos!',
        time: '5:40 PM',
      },
      {
        id: 'sah-2',
        sender: 'them',
        time: '5:41 PM',
        attachment: {
          type: 'image',
          imageUrl: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=600&q=80',
          caption: '📷 46 photos',
        },
      },
    ],
  },
  {
    id: 'bot-4vs8',
    name: '4 Vs 8 Bot',
    isOnline: true,
    statusText: 'Lumina Study Assistant',
    pinned: false,
    unreadCount: 0,
    lastMessageSnippet: 'Call eh pesala nee',
    lastMessageType: 'text',
    lastMessageTime: 'Yesterday',
    lastMessageStatus: 'read',
    messages: [
      {
        id: 'bot-1',
        sender: 'them',
        text: 'Your campus study sprint starts in 15 minutes. Distributed systems chapter 4 review pending.',
        time: '4:15 PM',
      },
      {
        id: 'bot-2',
        sender: 'them',
        text: 'Call eh pesala nee',
        time: '4:16 PM',
      },
    ],
  },
  {
    id: 'mummy',
    name: 'Mummy ❤️',
    isOnline: false,
    statusText: 'last seen yesterday at 9:30 PM',
    pinned: false,
    unreadCount: 0,
    isFavourite: true,
    lastMessageSnippet: 'ahhh',
    lastMessageType: 'text',
    lastMessageTime: 'Yesterday',
    lastMessageStatus: 'read',
    messages: [
      {
        id: 'mum-1',
        sender: 'them',
        text: 'Did you have dinner beta? Take care of your health.',
        time: '8:45 PM',
      },
      {
        id: 'mum-2',
        sender: 'me',
        text: 'Yes Mummy, just studying with friends in the hostel. Don’t worry!',
        time: '8:48 PM',
        status: 'read',
      },
      {
        id: 'mum-3',
        sender: 'them',
        text: 'ahhh',
        time: '8:50 PM',
      },
    ],
  },
  {
    id: 'prof-ramesh',
    name: '+91 83008 24024',
    statusText: 'Prof. Ramesh (CS HOD)',
    pinned: false,
    unreadCount: 0,
    lastMessageSnippet: 'Hi! 👋 I came across Studio D and n...',
    lastMessageType: 'text',
    lastMessageTime: 'Yesterday',
    lastMessageStatus: 'read',
    messages: [
      {
        id: 'prof-1',
        sender: 'them',
        text: 'Hi! 👋 I came across Studio D and noticed your research paper submission on decentralized consensus. Well drafted.',
        time: '3:10 PM',
      },
    ],
  },
  {
    id: 'alumni-mentor',
    name: '+91 95668 82888',
    statusText: 'Alumni Tech Lead (Google)',
    pinned: false,
    unreadCount: 0,
    lastMessageSnippet: 'Hi! 👋 I came across Landmark Port...',
    lastMessageType: 'text',
    lastMessageTime: 'Yesterday',
    lastMessageStatus: 'read',
    messages: [
      {
        id: 'alum-1',
        sender: 'them',
        text: 'Hi! 👋 I came across Landmark Portfolio and your open-source projects on Lumina. Let us connect regarding summer internships.',
        time: '2:15 PM',
      },
    ],
  },
  {
    id: 'photo-club',
    name: '+91 98941 00475',
    statusText: 'Photography Club Coordinator',
    pinned: false,
    unreadCount: 0,
    lastMessageSnippet: 'Hi! 👋 I came across 7 and 11 Photo...',
    lastMessageType: 'text',
    lastMessageTime: 'Yesterday',
    lastMessageStatus: 'read',
    messages: [
      {
        id: 'photo-1',
        sender: 'them',
        text: 'Hi! 👋 I came across 7 and 11 Photo showcase entries. Lumina team won 1st prize in the portrait competition.',
        time: '1:45 PM',
      },
    ],
  },
  {
    id: 'su-union',
    name: 'SU 26-27',
    isGroup: true,
    membersCount: 450,
    membersPreview: 'Students’ Union Official Campus Announcements',
    pinned: false,
    unreadCount: 4,
    statusText: 'Students’ Union Official Announcements',
    lastMessageSnippet: 'Students’ Union 2026-27, Announcements',
    lastMessageType: 'text',
    lastMessageTime: 'Yesterday',
    messages: [
      {
        id: 'su-1',
        sender: 'them',
        senderName: 'General Secretary',
        text: 'Important update: The academic calendar for odd semester examinations has been updated.',
        time: '11:00 AM',
      },
      {
        id: 'su-2',
        sender: 'them',
        senderName: 'SU Admin',
        text: 'Students’ Union 2026-27, Announcements',
        time: '11:15 AM',
      },
    ],
  },
  {
    id: 'app-dev-team',
    name: 'APP',
    isGroup: true,
    membersCount: 8,
    membersPreview: 'App Architecture & Core Team',
    pinned: false,
    unreadCount: 0,
    lastMessageSnippet: 'You voted: "👍 If ok na choose your UI s..."',
    lastMessageType: 'text',
    lastMessageTime: 'Yesterday',
    messages: [
      {
        id: 'app-1',
        sender: 'them',
        senderName: 'Design Lead',
        text: 'Poll: Should we adopt the high-density Notion dark palette for all messaging surfaces?',
        time: '10:00 AM',
      },
      {
        id: 'app-2',
        sender: 'me',
        text: 'You voted: "👍 If ok na choose your UI screen"',
        time: '10:05 AM',
        status: 'read',
      },
    ],
  },
]

/**
 * GradientBackground — Notion Black & White live CSS canvas
 * Applied exclusively to the active chat conversation background canvas.
 */
export function GradientBackground({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={className}
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        width: '100%',
        height: '100%',
        containerType: 'size',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: '-0.8cqmin',
          filter: 'blur(0.4cqmin)',
          backgroundColor: '#161616',
          backgroundImage:
            'radial-gradient(circle at 65.53% 45.75%, rgba(255, 255, 255, 0.05) 0%, rgba(22, 22, 22, 0) 43.9%), radial-gradient(circle at 28.32% 73.33%, rgba(247, 243, 235, 0.04) 0%, rgba(22, 22, 22, 0) 55.45%), radial-gradient(circle at 52.58% 18.64%, rgba(255, 255, 255, 0.065) 0%, rgba(22, 22, 22, 0) 67.35%), radial-gradient(circle at 79.44% 84.4%, rgba(38, 38, 38, 0.95) 0%, rgba(22, 22, 22, 0) 78.9%)',
        }}
      />
    </div>
  )
}

interface LuminaMessagingViewProps {
  currentUser?: DashboardUser | null
  onBackToDashboard: () => void
  initialChatId?: string | null
}

export const LuminaMessagingView: React.FC<LuminaMessagingViewProps> = ({
  currentUser,
  onBackToDashboard,
  initialChatId,
}) => {
  const [chats, setChats] = useState<ChatConversation[]>(INITIAL_CHATS)
  const [activeChatId, setActiveChatId] = useState<string | null>(
    initialChatId || INITIAL_CHATS[0]?.id || null
  )
  const [activeFilter, setActiveFilter] = useState<'all' | 'unread' | 'favourites' | 'groups'>('all')
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [inputText, setInputText] = useState<string>('')
  const [showArchived, setShowArchived] = useState<boolean>(false)
  const [showNewChatModal, setShowNewChatModal] = useState<boolean>(false)
  const [newChatSearch, setNewChatSearch] = useState<string>('')
  const [showQuickEmoji, setShowQuickEmoji] = useState<boolean>(false)
  const [showAttachmentMenu, setShowAttachmentMenu] = useState<boolean>(false)
  const [showChatOptions, setShowChatOptions] = useState<boolean>(false)
  const [showSidebarMenu, setShowSidebarMenu] = useState<boolean>(false)

  const messagesEndRef = useRef<HTMLDivElement | null>(null)
  const inputRef = useRef<HTMLInputElement | null>(null)

  // Find active chat object
  const activeChat = chats.find((c) => c.id === activeChatId) || null

  // Auto-scroll on active chat switch or new message
  useEffect(() => {
    if (activeChatId && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [activeChatId, activeChat?.messages.length])

  // Filter chats by search query and category
  const filteredChats = chats.filter((chat) => {
    if (showArchived) {
      return !!chat.isArchived
    }
    if (chat.isArchived) return false

    // Category pill filter
    if (activeFilter === 'unread' && (!chat.unreadCount || chat.unreadCount <= 0)) {
      return false
    }
    if (activeFilter === 'favourites' && !chat.isFavourite && !chat.pinned) {
      return false
    }
    if (activeFilter === 'groups' && !chat.isGroup) {
      return false
    }

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim()
      const matchName = chat.name.toLowerCase().includes(q)
      const matchSnippet = chat.lastMessageSnippet.toLowerCase().includes(q)
      const matchMember = chat.membersPreview?.toLowerCase().includes(q)
      return matchName || matchSnippet || matchMember
    }

    return true
  })

  // Total unread count for badge
  const totalUnread = chats.reduce((acc, c) => acc + (c.unreadCount || 0), 0)
  const groupsCount = chats.filter((c) => c.isGroup).length

  // Select a chat
  const handleSelectChat = (chatId: string) => {
    setActiveChatId(chatId)
    // Mark as read
    setChats((prev) =>
      prev.map((c) =>
        c.id === chatId ? { ...c, unreadCount: 0 } : c
      )
    )
    setShowQuickEmoji(false)
    setShowAttachmentMenu(false)
  }

  // Send a message in active chat
  const handleSendMessage = (customText?: string) => {
    const textToSend = (customText !== undefined ? customText : inputText).trim()
    if (!textToSend || !activeChatId) return

    const now = new Date()
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      sender: 'me',
      text: textToSend,
      time: timeStr,
      status: 'delivered',
    }

    setChats((prev) =>
      prev.map((c) => {
        if (c.id === activeChatId) {
          return {
            ...c,
            lastMessageSnippet: textToSend,
            lastMessageType: 'text',
            lastMessageTime: timeStr,
            lastMessageStatus: 'delivered',
            messages: [...c.messages, newMsg],
          }
        }
        return c
      })
    )

    setInputText('')
    setShowQuickEmoji(false)
    setShowAttachmentMenu(false)

    // Optional simulated reply after 1.4s
    const targetChat = activeChat
    if (targetChat && !targetChat.isGroup && targetChat.id !== 'mummy') {
      setTimeout(() => {
        const replyTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        const replyMsg: ChatMessage = {
          id: `reply-${Date.now()}`,
          sender: 'them',
          senderName: targetChat.name,
          text: `Got it! Sounds good. Let's sync up on Lumina soon. 👍`,
          time: replyTime,
        }

        setChats((current) =>
          current.map((c) => {
            if (c.id === targetChat.id) {
              return {
                ...c,
                lastMessageSnippet: replyMsg.text || '',
                lastMessageType: 'text',
                lastMessageTime: replyTime,
                messages: [...c.messages, replyMsg],
              }
            }
            return c
          })
        )
      }, 1400)
    }
  }

  // Quick Emoji reactions
  const quickEmojis = ['👍', '❤️', '🔥', '🚀', '😂', '🎉', '👏', '💯', '🙏', '💡']

  // Create new chat
  const handleCreateNewChat = (contactName: string) => {
    if (!contactName.trim()) return
    const newId = `chat-${Date.now()}`
    const newConversation: ChatConversation = {
      id: newId,
      name: contactName.trim(),
      isOnline: true,
      statusText: 'Active now',
      unreadCount: 0,
      lastMessageSnippet: 'Conversation started',
      lastMessageType: 'text',
      lastMessageTime: 'Just now',
      messages: [
        {
          id: `init-${Date.now()}`,
          sender: 'them',
          senderName: contactName.trim(),
          text: `Hi! Connected with you on Lumina.`,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ],
    }

    setChats((prev) => [newConversation, ...prev])
    setActiveChatId(newId)
    setShowNewChatModal(false)
    setNewChatSearch('')
  }

  return (
    <div className="lumina-messaging-screen dark">
      {/* ========================================================
          1. LEFT COLUMN: CHAT LIST SIDEBAR
          ======================================================== */}
      <aside
        className={`lumina-msg-sidebar ${activeChatId ? 'msg-hidden-on-mobile' : ''}`}
        aria-label="Chats List"
      >
        {/* TOP BAR / HEADER */}
        <header className="lumina-msg-sidebar-header">
          <div className="lumina-msg-header-left">
            {currentUser && (
              <img
                src={currentUser.image || DEFAULT_WHATSAPP_AVATAR}
                alt={currentUser.name || 'User'}
                className="lumina-msg-user-avatar-mini"
                title={`${currentUser.name || ''} (${currentUser.email || ''})`}
                onError={(e) => {
                  e.currentTarget.src = DEFAULT_WHATSAPP_AVATAR
                }}
              />
            )}
            <h1 className="lumina-msg-sidebar-title">Chats</h1>
          </div>

          <div className="lumina-msg-header-actions">
            <div style={{ position: 'relative' }}>
              <button
                type="button"
                className="lumina-msg-icon-btn"
                title="Options"
                aria-label="Options"
                onClick={() => setShowSidebarMenu((prev) => !prev)}
              >
                <MoreHorizontal size={20} />
              </button>

              {showSidebarMenu && (
                <div className="lumina-msg-dropdown-menu">
                  <button
                    type="button"
                    className="lumina-msg-dropdown-item"
                    onClick={() => {
                      setShowSidebarMenu(false)
                      onBackToDashboard()
                    }}
                  >
                    Back to Dashboard
                  </button>
                  <button
                    type="button"
                    className="lumina-msg-dropdown-item"
                    onClick={() => {
                      setShowSidebarMenu(false)
                      setChats((prev) => prev.map((c) => ({ ...c, unreadCount: 0 })))
                    }}
                  >
                    Mark all as read
                  </button>
                  <button
                    type="button"
                    className="lumina-msg-dropdown-item"
                    onClick={() => {
                      setShowSidebarMenu(false)
                      setShowArchived(true)
                    }}
                  >
                    Archived chats
                  </button>
                  <button
                    type="button"
                    className="lumina-msg-dropdown-item"
                    onClick={() => {
                      setShowSidebarMenu(false)
                      setShowNewChatModal(true)
                    }}
                  >
                    New chat
                  </button>
                </div>
              )}
            </div>

            <button
              type="button"
              className="lumina-msg-new-chat-btn"
              title="New Chat"
              aria-label="New Chat"
              onClick={() => setShowNewChatModal(true)}
            >
              <Plus size={20} strokeWidth={2.5} />
            </button>
          </div>
        </header>

        {/* SEARCH BAR */}
        <div className="lumina-msg-search-section">
          <div className="lumina-msg-search-input-wrap">
            <Search size={16} className="lumina-msg-search-icon" aria-hidden="true" />
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="lumina-msg-search-input"
              aria-label="Search chats"
            />
            {searchQuery && (
              <button
                type="button"
                className="lumina-msg-search-clear-btn"
                onClick={() => setSearchQuery('')}
                aria-label="Clear search"
              >
                <X size={14} />
              </button>
            )}
          </div>
        </div>

        {/* FILTER PILLS */}
        <div className="lumina-msg-filter-pills-bar" role="tablist" aria-label="Chat filters">
          <button
            type="button"
            role="tab"
            aria-selected={activeFilter === 'all' && !showArchived}
            className={`lumina-msg-filter-pill ${activeFilter === 'all' && !showArchived ? 'is-active' : ''}`}
            onClick={() => {
              setShowArchived(false)
              setActiveFilter('all')
            }}
          >
            All
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeFilter === 'unread' && !showArchived}
            className={`lumina-msg-filter-pill ${activeFilter === 'unread' && !showArchived ? 'is-active' : ''}`}
            onClick={() => {
              setShowArchived(false)
              setActiveFilter('unread')
            }}
          >
            <span>Unread</span>
            {totalUnread > 0 && <span className="lumina-msg-pill-badge">{totalUnread}</span>}
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeFilter === 'favourites' && !showArchived}
            className={`lumina-msg-filter-pill ${activeFilter === 'favourites' && !showArchived ? 'is-active' : ''}`}
            onClick={() => {
              setShowArchived(false)
              setActiveFilter('favourites')
            }}
          >
            Favourites
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeFilter === 'groups' && !showArchived}
            className={`lumina-msg-filter-pill ${activeFilter === 'groups' && !showArchived ? 'is-active' : ''}`}
            onClick={() => {
              setShowArchived(false)
              setActiveFilter('groups')
            }}
          >
            <span>Groups</span>
            <span className="lumina-msg-pill-badge">{groupsCount}</span>
          </button>
        </div>

        {/* ARCHIVED BAR */}
        <button
          type="button"
          className={`lumina-msg-archived-row ${showArchived ? 'is-archived-active' : ''}`}
          onClick={() => setShowArchived((prev) => !prev)}
        >
          <div className="lumina-msg-archived-left">
            <Archive size={18} className="lumina-msg-archived-icon" />
            <span className="lumina-msg-archived-label">Archived</span>
          </div>
          {showArchived && <span className="lumina-msg-archived-badge">Active</span>}
        </button>

        {/* CHAT CONVERSATION ITEMS LIST */}
        <div className="lumina-msg-chat-items-scroll" role="list">
          {filteredChats.length === 0 ? (
            <div className="lumina-msg-empty-filter">
              <span className="lumina-msg-empty-text">No chats found</span>
            </div>
          ) : (
            filteredChats.map((chat) => {
              const isSelected = chat.id === activeChatId
              return (
                <div
                  key={chat.id}
                  role="listitem"
                  tabIndex={0}
                  className={`lumina-msg-chat-row ${isSelected ? 'is-selected' : ''}`}
                  onClick={() => handleSelectChat(chat.id)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      handleSelectChat(chat.id)
                    }
                  }}
                >
                  {/* Avatar */}
                  <div className="lumina-msg-avatar-wrap">
                    {chat.isGroup ? (
                      <div className="lumina-msg-group-avatar">
                        <Users size={20} />
                      </div>
                    ) : (
                      <img
                        src={chat.avatar || DEFAULT_WHATSAPP_AVATAR}
                        alt={chat.name}
                        className="lumina-msg-avatar-img"
                        onError={(e) => {
                          e.currentTarget.src = DEFAULT_WHATSAPP_AVATAR
                        }}
                      />
                    )}
                    {chat.isOnline && <span className="lumina-msg-online-dot" />}
                  </div>

                  {/* Chat Metadata & Snippet */}
                  <div className="lumina-msg-chat-meta">
                    <div className="lumina-msg-chat-top-row">
                      <span className="lumina-msg-chat-name" title={chat.name}>
                        {chat.name}
                      </span>
                      <span className="lumina-msg-chat-time">{chat.lastMessageTime}</span>
                    </div>

                    <div className="lumina-msg-chat-bottom-row">
                      <div className="lumina-msg-snippet-wrap">
                        {/* Status checks */}
                        {chat.lastMessageStatus === 'read' && (
                          <CheckCheck size={16} className="lumina-msg-tick lumina-msg-tick-read" />
                        )}
                        {chat.lastMessageStatus === 'delivered' && (
                          <CheckCheck size={16} className="lumina-msg-tick lumina-msg-tick-delivered" />
                        )}
                        {chat.lastMessageStatus === 'sent' && (
                          <Check size={16} className="lumina-msg-tick lumina-msg-tick-sent" />
                        )}

                        {/* Special Icon */}
                        {chat.lastMessageType === 'document' && (
                          <FileText size={14} className="lumina-msg-type-icon" />
                        )}
                        {chat.lastMessageType === 'image' && (
                          <ImageIcon size={14} className="lumina-msg-type-icon" />
                        )}
                        {chat.lastMessageType === 'like' && (
                          <ThumbsUp size={14} className="lumina-msg-type-icon" />
                        )}

                        <span className="lumina-msg-snippet-text" title={chat.lastMessageSnippet}>
                          {chat.lastMessageSnippet}
                        </span>
                      </div>

                      <div className="lumina-msg-meta-icons">
                        {chat.pinned && <Pin size={14} className="lumina-msg-pin-icon" />}
                        {chat.unreadCount && chat.unreadCount > 0 ? (
                          <span className="lumina-msg-unread-badge">{chat.unreadCount}</span>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })
          )}
        </div>
      </aside>

      {/* ========================================================
          2. RIGHT COLUMN: ACTIVE CHAT CONVERSATION OR LUMINA EMPTY STATE
          ======================================================== */}
      <main
        className={`lumina-msg-main ${!activeChatId ? 'msg-hidden-on-mobile' : ''}`}
        aria-label="Messaging Conversation Area"
      >
        {activeChat ? (
          /* ACTIVE CHAT WORKSPACE */
          <div className="lumina-msg-active-chat-view">
            {/* ACTIVE CHAT TOP BAR */}
            <header className="lumina-msg-chat-header">
              <div className="lumina-msg-chat-header-left">
                {/* Mobile Back Button to Chat List */}
                <button
                  type="button"
                  className="lumina-msg-mobile-back-btn"
                  onClick={() => setActiveChatId(null)}
                  title="Back to chats"
                  aria-label="Back to chats"
                >
                  <ArrowLeft size={20} />
                </button>

                <div className="lumina-msg-header-avatar">
                  {activeChat.isGroup ? (
                    <div className="lumina-msg-group-avatar is-header">
                      <Users size={20} />
                    </div>
                  ) : (
                    <img
                      src={activeChat.avatar || DEFAULT_WHATSAPP_AVATAR}
                      alt={activeChat.name}
                      className="lumina-msg-avatar-img is-header"
                      onError={(e) => {
                        e.currentTarget.src = DEFAULT_WHATSAPP_AVATAR
                      }}
                    />
                  )}
                  {activeChat.isOnline && <span className="lumina-msg-online-dot" />}
                </div>

                <div className="lumina-msg-header-info">
                  <h2 className="lumina-msg-header-name" title={activeChat.name}>
                    {activeChat.name}
                  </h2>
                  <span className="lumina-msg-header-status">
                    {activeChat.statusText || (activeChat.isOnline ? 'Online' : 'Offline')}
                  </span>
                </div>
              </div>

              <div className="lumina-msg-chat-header-actions">
                <button
                  type="button"
                  className="lumina-msg-icon-btn"
                  title="Video call"
                  aria-label="Video call"
                  onClick={() => alert(`Initiating secure video call with ${activeChat.name}...`)}
                >
                  <Video size={19} />
                </button>
                <button
                  type="button"
                  className="lumina-msg-icon-btn"
                  title="Voice call"
                  aria-label="Voice call"
                  onClick={() => alert(`Initiating secure voice call with ${activeChat.name}...`)}
                >
                  <Phone size={18} />
                </button>
                <div style={{ position: 'relative' }}>
                  <button
                    type="button"
                    className="lumina-msg-icon-btn"
                    title="Menu"
                    aria-label="Menu"
                    onClick={() => setShowChatOptions((prev) => !prev)}
                  >
                    <MoreVertical size={19} />
                  </button>

                  {showChatOptions && (
                    <div className="lumina-msg-dropdown-menu">
                      <button
                        type="button"
                        className="lumina-msg-dropdown-item"
                        onClick={() => {
                          setShowChatOptions(false)
                          alert(`Contact Info:\n${activeChat.name}\n${activeChat.statusText || ''}`)
                        }}
                      >
                        Contact info
                      </button>
                      <button
                        type="button"
                        className="lumina-msg-dropdown-item"
                        onClick={() => {
                          setShowChatOptions(false)
                          setChats((prev) =>
                            prev.map((c) =>
                              c.id === activeChat.id ? { ...c, isArchived: !c.isArchived } : c
                            )
                          )
                          setActiveChatId(null)
                        }}
                      >
                        {activeChat.isArchived ? 'Unarchive chat' : 'Archive chat'}
                      </button>
                      <button
                        type="button"
                        className="lumina-msg-dropdown-item"
                        onClick={() => {
                          setShowChatOptions(false)
                          setChats((prev) =>
                            prev.map((c) =>
                              c.id === activeChat.id ? { ...c, messages: [] } : c
                            )
                          )
                        }}
                      >
                        Clear messages
                      </button>
                      <button
                        type="button"
                        className="lumina-msg-dropdown-item text-danger"
                        onClick={() => {
                          setShowChatOptions(false)
                          setChats((prev) => prev.filter((c) => c.id !== activeChat.id))
                          setActiveChatId(null)
                        }}
                      >
                        Delete chat
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </header>

            {/* CHAT MESSAGE STREAM WRAPPER (Ambient Notion Black & White Live Canvas) */}
            <div className="lumina-msg-stream-wrapper">
              <GradientBackground className="lumina-msg-convo-bg" />
              <div className="lumina-msg-stream-container">
                {/* Encryption Banner */}
                <div className="lumina-msg-encryption-banner">
                  <Lock size={12} className="lumina-msg-lock-mini" />
                  <span>
                    Messages and calls are end-to-end encrypted. No one outside of this chat, not even Lumina, can read or listen to them.
                  </span>
                </div>

                {/* Date divider */}
                <div className="lumina-msg-date-divider">
                  <span>Today</span>
                </div>

                {/* Messages list */}
                {activeChat.messages.map((msg) => {
                  const isMe = msg.sender === 'me'
                  return (
                    <div
                      key={msg.id}
                      className={`lumina-msg-bubble-wrap ${isMe ? 'is-me' : 'is-them'}`}
                    >
                      <div className="lumina-msg-bubble">
                        {/* Sender Name in Group Chat */}
                        {activeChat.isGroup && !isMe && msg.senderName && (
                          <div className="lumina-msg-bubble-sender">{msg.senderName}</div>
                        )}

                        {/* Deleted message indicator */}
                        {msg.isDeleted ? (
                          <div className="lumina-msg-deleted-content">
                            <span className="lumina-msg-deleted-icon">🚫</span>
                            <span className="lumina-msg-deleted-text">{msg.text}</span>
                          </div>
                        ) : msg.attachment ? (
                          /* Attachment Preview */
                          <div className="lumina-msg-attachment-box">
                            {msg.attachment.type === 'document' && (
                              <div className="lumina-msg-doc-card">
                                <div className="lumina-msg-doc-icon-wrap">
                                  <FileText size={24} />
                                </div>
                                <div className="lumina-msg-doc-meta">
                                  <span className="lumina-msg-doc-title">
                                    {msg.attachment.fileName}
                                  </span>
                                  <span className="lumina-msg-doc-sub">
                                    {msg.attachment.pageCount ? `${msg.attachment.pageCount} pages • ` : ''}
                                    {msg.attachment.fileSize || 'PDF Document'}
                                  </span>
                                </div>
                                <button
                                  type="button"
                                  className="lumina-msg-doc-dl-btn"
                                  title="Download Document"
                                  onClick={() => alert(`Downloading ${msg.attachment?.fileName}...`)}
                                >
                                  <Download size={16} />
                                </button>
                              </div>
                            )}

                            {msg.attachment.type === 'image' && (
                              <div className="lumina-msg-img-preview">
                                <img
                                  src={msg.attachment.imageUrl}
                                  alt="Attachment"
                                  className="lumina-msg-img"
                                />
                                {msg.attachment.caption && (
                                  <div className="lumina-msg-img-caption">
                                    {msg.attachment.caption}
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        ) : (
                          /* Text Content */
                          <div className="lumina-msg-bubble-text">{msg.text}</div>
                        )}

                        {/* Bubble Footer: Time & Status Tick */}
                        <div className="lumina-msg-bubble-footer">
                          <span className="lumina-msg-bubble-time">{msg.time}</span>
                          {isMe && (
                            <span className="lumina-msg-bubble-tick">
                              {msg.status === 'read' ? (
                                <CheckCheck size={14} className="lumina-msg-tick-read" />
                              ) : msg.status === 'delivered' ? (
                                <CheckCheck size={14} className="lumina-msg-tick-delivered" />
                              ) : (
                                <Check size={14} className="lumina-msg-tick-sent" />
                              )}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                })}
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* QUICK EMOJI BAR (POPUP) */}
            {showQuickEmoji && (
              <div className="lumina-msg-emoji-bar">
                {quickEmojis.map((emoji) => (
                  <button
                    key={emoji}
                    type="button"
                    className="lumina-msg-emoji-btn"
                    onClick={() => {
                      handleSendMessage(emoji)
                      setShowQuickEmoji(false)
                    }}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            )}

            {/* ATTACHMENT MENU POPUP */}
            {showAttachmentMenu && (
              <div className="lumina-msg-attachment-popover">
                <button
                  type="button"
                  className="lumina-msg-attachment-opt"
                  onClick={() => {
                    setShowAttachmentMenu(false)
                    const fileName = prompt('Enter document file name (e.g. Distributed_Systems_Notes.pdf):')
                    if (fileName) {
                      const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                      const docMsg: ChatMessage = {
                        id: `doc-${Date.now()}`,
                        sender: 'me',
                        time: now,
                        status: 'delivered',
                        attachment: {
                          type: 'document',
                          fileName: fileName.trim(),
                          fileSize: '3.1 MB',
                          pageCount: 12,
                        },
                      }
                      setChats((prev) =>
                        prev.map((c) =>
                          c.id === activeChat.id
                            ? {
                                ...c,
                                lastMessageSnippet: `📄 ${fileName.trim()}`,
                                lastMessageType: 'document',
                                lastMessageTime: now,
                                messages: [...c.messages, docMsg],
                              }
                            : c
                        )
                      )
                    }
                  }}
                >
                  <FileText size={18} className="lumina-msg-attachment-icon" />
                  <span>Document</span>
                </button>
                <button
                  type="button"
                  className="lumina-msg-attachment-opt"
                  onClick={() => {
                    setShowAttachmentMenu(false)
                    alert('Select photo / video from your device.')
                  }}
                >
                  <ImageIcon size={18} className="lumina-msg-attachment-icon" />
                  <span>Photos & Videos</span>
                </button>
                <button
                  type="button"
                  className="lumina-msg-attachment-opt"
                  onClick={() => {
                    setShowAttachmentMenu(false)
                    alert('Create a quick group poll for project decisions.')
                  }}
                >
                  <Share2 size={18} className="lumina-msg-attachment-icon" />
                  <span>Poll</span>
                </button>
              </div>
            )}

            {/* CHAT INPUT BAR */}
            <footer className="lumina-msg-chat-input-bar">
              <button
                type="button"
                className={`lumina-msg-input-tool-btn ${showQuickEmoji ? 'is-active' : ''}`}
                title="Emojis"
                aria-label="Emojis"
                onClick={() => {
                  setShowQuickEmoji((prev) => !prev)
                  setShowAttachmentMenu(false)
                }}
              >
                <Smile size={21} />
              </button>

              <button
                type="button"
                className={`lumina-msg-input-tool-btn ${showAttachmentMenu ? 'is-active' : ''}`}
                title="Attach"
                aria-label="Attach"
                onClick={() => {
                  setShowAttachmentMenu((prev) => !prev)
                  setShowQuickEmoji(false)
                }}
              >
                <Paperclip size={20} />
              </button>

              <div className="lumina-msg-input-box-wrapper">
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Type a message"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault()
                      handleSendMessage()
                    }
                  }}
                  className="lumina-msg-text-input"
                  aria-label="Type a message"
                />
              </div>

              {inputText.trim() ? (
                <button
                  type="button"
                  className="lumina-msg-send-action-btn"
                  onClick={() => handleSendMessage()}
                  title="Send message"
                  aria-label="Send message"
                >
                  <Send size={18} />
                </button>
              ) : (
                <button
                  type="button"
                  className="lumina-msg-input-tool-btn"
                  title="Voice message"
                  aria-label="Voice message"
                  onClick={() => alert('Hold to record voice message (Lumina Audio)')}
                >
                  <Mic size={21} />
                </button>
              )}
            </footer>
          </div>
        ) : (
          /* ========================================================
             EMPTY STATE: CLEAN BLANK CHAT PANE
             ======================================================== */
          <div className="lumina-msg-empty-hero-container" />
        )}
      </main>

      {/* ========================================================
          3. NEW CHAT MODAL
          ======================================================== */}
      {showNewChatModal && (
        <div
          className="lumina-msg-modal-backdrop"
          onClick={() => setShowNewChatModal(false)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="lumina-msg-modal-dialog"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="lumina-msg-modal-header">
              <div className="lumina-msg-modal-title-row">
                <Sparkles size={18} className="lumina-msg-modal-title-icon" />
                <h3 className="lumina-msg-modal-title">New Conversation</h3>
              </div>
              <button
                type="button"
                className="lumina-msg-modal-close"
                onClick={() => setShowNewChatModal(false)}
                aria-label="Close modal"
              >
                <X size={18} />
              </button>
            </div>

            <div className="lumina-msg-modal-body">
              <div className="lumina-msg-modal-search-wrap">
                <Search size={16} className="lumina-msg-search-icon" />
                <input
                  type="text"
                  placeholder="Search student or group name..."
                  value={newChatSearch}
                  onChange={(e) => setNewChatSearch(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && newChatSearch.trim()) {
                      handleCreateNewChat(newChatSearch.trim())
                    }
                  }}
                  autoFocus
                  className="lumina-msg-modal-input"
                />
              </div>

              <div className="lumina-msg-modal-suggestions">
                <span className="lumina-msg-suggestions-heading">Campus Peers & Teams</span>
                <div className="lumina-msg-suggestions-list">
                  {[
                    { name: 'Dr. Kavitha (Dean Academics)', role: 'Faculty', isOnline: true },
                    { name: 'Muhamed Gowtham', role: 'Fullstack Dev & Hackathon Partner', isOnline: true },
                    { name: 'Sahaana', role: 'UI/UX Lead & Class Representative', isOnline: true },
                    { name: 'Kiran', role: 'Networks & Cloud Engineer', isOnline: false },
                    { name: 'ACM Student Chapter', role: 'Technical Society (120 members)', isOnline: true },
                    { name: 'Robotics & AI Club', role: 'Project Guild (45 members)', isOnline: false },
                  ].map((item) => (
                    <button
                      key={item.name}
                      type="button"
                      className="lumina-msg-suggestion-item"
                      onClick={() => handleCreateNewChat(item.name)}
                    >
                      <div className="lumina-msg-suggestion-left">
                        <div className="lumina-msg-suggest-avatar">
                          {item.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="lumina-msg-suggest-meta">
                          <span className="lumina-msg-suggest-name">{item.name}</span>
                          <span className="lumina-msg-suggest-role">{item.role}</span>
                        </div>
                      </div>
                      <Plus size={16} className="lumina-msg-suggest-plus" />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="lumina-msg-modal-footer">
              <button
                type="button"
                className="lumina-msg-btn-secondary"
                onClick={() => setShowNewChatModal(false)}
              >
                Cancel
              </button>
              {newChatSearch.trim() && (
                <button
                  type="button"
                  className="lumina-msg-btn-primary"
                  onClick={() => handleCreateNewChat(newChatSearch.trim())}
                >
                  Start Chat with "{newChatSearch.trim()}"
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default LuminaMessagingView
