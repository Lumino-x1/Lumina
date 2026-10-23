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

const INITIAL_CHATS: ChatConversation[] = []

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
              <span className="lumina-msg-empty-text">No chats yet</span>
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
          <div className="lumina-msg-empty-hero-container">
            <div className="lumina-msg-empty-center-card">
              <div className="lumina-msg-brand-mark">
                <svg
                  width="68"
                  height="68"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lumina-msg-hero-svg"
                >
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
              </div>
              <h2 className="lumina-msg-empty-title">Lumina Messaging</h2>
              <p className="lumina-msg-empty-version">
                Send and receive messages with campus peers and study groups.
              </p>
            </div>
            <div className="lumina-msg-empty-bottom-lock">
              <Lock size={13} className="lumina-msg-lock-icon" />
              <span>
                Your personal messages are{' '}
                <span className="lumina-msg-encrypted-link">end-to-end encrypted</span>
              </span>
            </div>
          </div>
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
                {newChatSearch.trim() ? (
                  <button
                    type="button"
                    className="lumina-msg-suggestion-item"
                    onClick={() => handleCreateNewChat(newChatSearch.trim())}
                  >
                    <div className="lumina-msg-suggestion-left">
                      <div className="lumina-msg-suggest-avatar">
                        {newChatSearch.trim().charAt(0).toUpperCase()}
                      </div>
                      <div className="lumina-msg-suggest-meta">
                        <span className="lumina-msg-suggest-name">Chat with "{newChatSearch.trim()}"</span>
                        <span className="lumina-msg-suggest-role">Start direct conversation</span>
                      </div>
                    </div>
                    <Plus size={16} className="lumina-msg-suggest-plus" />
                  </button>
                ) : (
                  <p style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.45)', margin: '12px 4px' }}>
                    Type a peer or group name above and press Enter to start a new chat.
                  </p>
                )}
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
