import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react'
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
  Loader2,
} from 'lucide-react'
import './LuminaMessagingView.css'
import type { DashboardUser } from '../../DashboardPage'
import { DEFAULT_WHATSAPP_AVATAR } from '../WhatsAppDefaultAvatar'
import {
  fetchMyConversationsApi,
  fetchChannelMessagesApi,
  sendMessageApi,
  createConversationApi,
  markChannelReadApi,
  sendTypingIndicatorApi,
  type ChatConversationItem,
  type ChatMessageItem,
} from '../../api/chatApi'

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

function formatChatTime(dateString?: string | null): string {
  if (!dateString) return ''
  try {
    const d = new Date(dateString)
    if (isNaN(d.getTime())) return ''
    const now = new Date()
    const isToday =
      d.getDate() === now.getDate() &&
      d.getMonth() === now.getMonth() &&
      d.getFullYear() === now.getFullYear()
    if (isToday) {
      return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
    return d.toLocaleDateString([], { month: 'short', day: 'numeric' })
  } catch {
    return ''
  }
}

function mapConversation(
  item: ChatConversationItem,
  _currentUserId?: string,
  existingMessages?: ChatMessage[]
): Conversation {
  const isGroup = Boolean(item.isGroup)
  const other = item.otherUser
  const name =
    item.name ||
    other?.name ||
    other?.username ||
    (isGroup ? 'Study Group' : 'Conversation')
  const avatar = item.image || other?.image || DEFAULT_WHATSAPP_AVATAR
  const isOnline = Boolean(other?.online)
  const status = isOnline ? 'online' : 'offline'
  const statusText = isGroup
    ? `${item.membersCount || 2} members`
    : isOnline
    ? 'Active now'
    : 'Offline'

  return {
    id: item.channelId || item.id,
    name,
    avatar,
    isGroup,
    status,
    statusText,
    lastTime: formatChatTime(item.lastMessage?.createdAt),
    snippet: item.lastMessage?.text || 'No messages yet',
    unreadCount: item.unreadCount || 0,
    messages: existingMessages || [],
  }
}

function mapMessage(msg: ChatMessageItem, currentUserId?: string): ChatMessage {
  const isMe = Boolean(
    (currentUserId &&
      (msg.user_id === currentUserId || msg.user?.id === currentUserId)) ||
      msg.user_id === 'me'
  )
  const time = formatChatTime(msg.created_at)

  let attachment: MessageAttachment | undefined
  if (msg.attachments && msg.attachments.length > 0) {
    const att = msg.attachments[0]
    attachment = {
      type: (att.type === 'pdf' ? 'pdf' : 'link') as any,
      fileName: att.title || 'Attachment',
      fileSize: att.file_size
        ? `${Math.round(att.file_size / 1024)} KB`
        : undefined,
      fileSubtitle: att.title,
      url: att.asset_url || att.image_url,
    }
  }

  return {
    id: msg.id,
    sender: isMe ? 'me' : 'them',
    senderName: isMe ? 'You' : msg.user?.name || 'Friend',
    senderAvatar: msg.user?.image || undefined,
    text: msg.text,
    time,
    attachment,
  }
}

const INITIAL_CONVERSATIONS: Conversation[] = []

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
    initialChatId || ''
  )
  const [searchQuery, setSearchQuery] = useState('')
  const [activeFilter, setActiveFilter] = useState<
    'all' | 'unread' | 'groups'
  >('all')
  const [inputText, setInputText] = useState('')
  const [mobileView, setMobileView] = useState<'list' | 'thread'>('list')
  const [isLoadingMessages, setIsLoadingMessages] = useState(false)
  const [isSending, setIsSending] = useState(false)

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const typingTimeoutRef = useRef<any>(null)

  const currentUserName = currentUser?.name || 'You'

  // Fetch all user conversations from backend
  const loadConversations = useCallback(async (silent = false) => {
    try {
      const res = await fetchMyConversationsApi()
      if (res.success && Array.isArray(res.data)) {
        setConversations((prev) => {
          const prevMap = new Map(prev.map((c) => [c.id, c]))
          const mapped = res.data!.map((item) => {
            const existing = prevMap.get(item.channelId || item.id)
            return mapConversation(
              item,
              currentUser?.id,
              existing?.messages || []
            )
          })

          // Retain any pending or locally created conversation
          prev.forEach((localConv) => {
            if (!mapped.some((m) => m.id === localConv.id)) {
              mapped.unshift(localConv)
            }
          })

          return mapped
        })
      }
    } catch (err) {
      if (!silent) {
        console.warn('[LuminaMessaging] Failed to fetch conversations:', err)
      }
    }
  }, [currentUser?.id])

  // Fetch messages for active channel
  const loadMessagesForChannel = useCallback(
    async (channelId: string, silent = false) => {
      if (!channelId) return
      if (!silent) setIsLoadingMessages(true)
      try {
        const res = await fetchChannelMessagesApi(channelId)
        if (res.success && Array.isArray(res.data)) {
          const mapped = res.data.map((m) => mapMessage(m, currentUser?.id))
          setConversations((prev) =>
            prev.map((c) => {
              if (c.id === channelId) {
                const last = mapped[mapped.length - 1]
                return {
                  ...c,
                  messages: mapped,
                  snippet: last?.text || c.snippet,
                  lastTime: last?.time || c.lastTime,
                  unreadCount: 0,
                }
              }
              return c
            })
          )
        }
        markChannelReadApi(channelId).catch(() => {})
      } catch (err) {
        if (!silent) {
          console.warn(`[LuminaMessaging] Failed to load messages for ${channelId}:`, err)
        }
      } finally {
        if (!silent) setIsLoadingMessages(false)
      }
    },
    [currentUser?.id]
  )

  // Mount: fetch conversations and handle sessionStorage friend
  useEffect(() => {
    let isMounted = true

    loadConversations().then(() => {
      if (!isMounted) return
      try {
        const friendStr = sessionStorage.getItem('lumina_active_chat_friend')
        const channelId = sessionStorage.getItem('lumina_active_channel_id')
        if (friendStr) {
          const friend = JSON.parse(friendStr)
          if (friend && friend.id) {
            const desiredChannelId = channelId || `direct-${friend.id}`

            createConversationApi({
              otherUserId: friend.id,
              otherName: friend.name,
              otherUsername: friend.username,
              otherAvatar: friend.avatar,
            })
              .then((createRes) => {
                if (!isMounted) return
                const finalId =
                  createRes.success && createRes.data?.channelId
                    ? createRes.data.channelId
                    : desiredChannelId

                setConversations((prev) => {
                  if (prev.some((c) => c.id === finalId)) {
                    return prev
                  }
                  const newConv: Conversation = {
                    id: finalId,
                    name: friend.name || friend.username || 'Friend',
                    avatar: friend.avatar || DEFAULT_WHATSAPP_AVATAR,
                    status: 'online',
                    statusText: 'Active now',
                    lastTime: 'Just now',
                    snippet: 'Conversation started',
                    messages: [],
                  }
                  return [newConv, ...prev]
                })
                setActiveChatId(finalId)
                setMobileView('thread')
              })
              .catch(() => {
                if (!isMounted) return
                setActiveChatId(desiredChannelId)
              })
          }
        }
      } catch {
        // ignore
      }
    })

    const interval = setInterval(() => {
      loadConversations(true)
    }, 10000)

    return () => {
      isMounted = false
      clearInterval(interval)
    }
  }, [loadConversations])

  // Active channel messages polling
  useEffect(() => {
    if (!activeChatId) return

    loadMessagesForChannel(activeChatId, false)

    const interval = setInterval(() => {
      loadMessagesForChannel(activeChatId, true)
    }, 3500)

    return () => clearInterval(interval)
  }, [activeChatId, loadMessagesForChannel])

  const activeConversation = useMemo(() => {
    if (conversations.length === 0) return null
    return (
      conversations.find((c) => c.id === activeChatId) || conversations[0] || null
    )
  }, [conversations, activeChatId])

  const unreadCount = useMemo(() => {
    return conversations.filter((c) => (c.unreadCount || 0) > 0).length
  }, [conversations])

  // Filter conversations
  const filteredConversations = useMemo(() => {
    return conversations.filter((c) => {
      if (activeFilter === 'unread') {
        if (!c.unreadCount || c.unreadCount <= 0) return false
      } else if (activeFilter === 'groups') {
        if (!c.isGroup) return false
      }

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

  // Send message with optimistic update and backend sync
  const handleSendMessage = async () => {
    const textToSend = inputText.trim()
    if (!textToSend || !activeConversation || isSending) return

    const channelId = activeConversation.id
    const tempId = `temp-${Date.now()}`
    const timeStr = new Date().toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    })

    const optimisticMsg: ChatMessage = {
      id: tempId,
      sender: 'me',
      senderName: `${currentUserName} (You)`,
      text: textToSend,
      time: timeStr,
    }

    setInputText('')
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.focus()
    }

    setConversations((prev) =>
      prev.map((conv) => {
        if (conv.id === channelId) {
          return {
            ...conv,
            snippet: textToSend,
            lastTime: timeStr,
            unreadCount: 0,
            messages: [...conv.messages, optimisticMsg],
          }
        }
        return conv
      })
    )

    setIsSending(true)
    try {
      const res = await sendMessageApi(channelId, textToSend)
      if (res.success && res.data) {
        const backendMsg = mapMessage(res.data, currentUser?.id)
        setConversations((prev) =>
          prev.map((c) => {
            if (c.id === channelId) {
              return {
                ...c,
                messages: c.messages.map((m) =>
                  m.id === tempId ? backendMsg : m
                ),
              }
            }
            return c
          })
        )
      } else {
        // If channel was created purely on client, create channel on backend first
        const friendStr = sessionStorage.getItem('lumina_active_chat_friend')
        if (friendStr) {
          try {
            const friend = JSON.parse(friendStr)
            if (friend?.id) {
              const createRes = await createConversationApi({
                otherUserId: friend.id,
                otherName: friend.name,
                otherUsername: friend.username,
                otherAvatar: friend.avatar,
              })
              if (createRes.success && createRes.data?.channelId) {
                const newId = createRes.data.channelId
                setActiveChatId(newId)
                await sendMessageApi(newId, textToSend)
              }
            }
          } catch {
            // ignore
          }
        }
      }
    } catch (err) {
      console.error('[LuminaMessaging] Failed to send message:', err)
    } finally {
      setIsSending(false)
    }
  }

  // Handle typing with debounced typing indicator to backend
  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value)
    if (activeConversation?.id) {
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current)
      typingTimeoutRef.current = setTimeout(() => {
        sendTypingIndicatorApi(activeConversation.id).catch(() => {})
      }, 500)
    }
  }

  const handleStartChatFromSearch = async (query: string) => {
    const clean = query.trim()
    if (!clean) return

    const tempId = `chat-${Date.now()}`
    const newConv: Conversation = {
      id: tempId,
      name: clean,
      avatar: DEFAULT_WHATSAPP_AVATAR,
      status: 'online',
      statusText: 'Active now',
      lastTime: 'Just now',
      snippet: 'Conversation started',
      messages: [],
    }
    setConversations((prev) => [newConv, ...prev])
    setActiveChatId(tempId)
    setSearchQuery('')
    setMobileView('thread')
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
                Unread {unreadCount > 0 ? unreadCount : ''}
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
              {searchQuery.trim() && filteredConversations.length === 0 ? (
                <div className="notion-conv-search-empty">
                  <p className="notion-empty-desc">No chats match "{searchQuery}"</p>
                  <button
                    type="button"
                    className="notion-start-chat-btn"
                    onClick={() => handleStartChatFromSearch(searchQuery)}
                  >
                    Start chat with "{searchQuery.trim()}"
                  </button>
                </div>
              ) : filteredConversations.length === 0 ? null : (
                filteredConversations.map((conv) => {
                  const isSelected =
                    activeConversation && conv.id === activeConversation.id

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
                            <span className="notion-group-initials">
                              {(conv.name.slice(0, 2) || 'GP').toUpperCase()}
                            </span>
                          </div>
                        ) : (
                          <img
                            src={conv.avatar}
                            alt={conv.name}
                            className="notion-conv-avatar-img"
                            onError={(e) => {
                              ;(e.target as HTMLImageElement).src =
                                DEFAULT_WHATSAPP_AVATAR
                            }}
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
                })
              )}
            </div>
          </section>

          {/* =====================================================================
              COLUMN 2: MAIN CHAT THREAD (GRID PATTERN CANVAS)
             ===================================================================== */}
          <section className="notion-col-thread">
            {!activeConversation ? (
              <div className="notion-thread-empty-state">
                <button
                  type="button"
                  className="notion-mobile-back-btn notion-empty-mobile-back"
                  onClick={() => setMobileView('list')}
                  title="Back to messages"
                  aria-label="Back to messages"
                >
                  <ArrowLeft size={18} />
                </button>
              </div>
            ) : (
              <>
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
                          <span className="notion-group-initials">
                            {(activeConversation.name.slice(0, 2) || 'GP').toUpperCase()}
                          </span>
                        </div>
                      ) : (
                        <img
                          src={activeConversation.avatar}
                          alt={activeConversation.name}
                          className="notion-thread-header-avatar"
                          onError={(e) => {
                            ;(e.target as HTMLImageElement).src =
                              DEFAULT_WHATSAPP_AVATAR
                          }}
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
                  {/* Messages Flow */}
                  <div className="notion-messages-list">
                    {isLoadingMessages && activeConversation.messages.length === 0 ? (
                      <div className="notion-thread-loading-wrap">
                        <Loader2 size={22} className="notion-spin-icon" />
                      </div>
                    ) : activeConversation.messages.length === 0 ? null : (
                      <>
                        <div className="notion-date-divider">
                          <span className="notion-date-pill">TODAY</span>
                        </div>
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
                      </>
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                </div>

                {/* Message Composer Area */}
                <div className="notion-composer-wrapper">
                  <div className="notion-composer-box">
                    <textarea
                      ref={textareaRef}
                      value={inputText}
                      onChange={handleTextareaChange}
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

                      {/* Right: Send Button */}
                      <div className="notion-composer-tools-right">
                        <button
                          type="button"
                          className="notion-send-btn"
                          onClick={handleSendMessage}
                          disabled={!inputText.trim() || isSending}
                        >
                          {isSending ? (
                            <>
                              <span>Sending</span>
                              <Loader2 size={14} className="notion-spin-icon" />
                            </>
                          ) : (
                            <>
                              <span>Send</span>
                              <Send size={14} className="notion-send-icon" />
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </section>
        </div>
      </div>
    </div>
  )
}

export default LuminaMessagingView
