import {
  createPostCommentApi,
  deleteCommentApi,
  fetchPostCommentsApi,
  reportCommentApi,
  toggleCommentLikeApi,
  togglePinCommentApi,
} from '../api/feedApi'
import { useTheme } from '../lib/themeContext'
import { DEFAULT_WHATSAPP_AVATAR } from './WhatsAppDefaultAvatar'
import React, { useEffect, useState, useRef } from 'react'

import type { PostCommentItem } from '../api/feedApi'

import './CommentsDrawer.css'

export interface CommentsDrawerProps {
  isOpen?: boolean
  onClose?: () => void
  postId: string
  postTitle?: string
  postAuthorId?: string
  initialCount?: number
  currentUser?: {
    id?: string
    name?: string | null
    username?: string | null
    image?: string | null
  } | null
  onCommentAdded?: (newCount: number) => void
  theme?: string
}

const DrawerIcons = {
  Close: (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  ),
  Shield: (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  ),
  Link: (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  ),
  Heart: (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  ),
  HeartFilled: (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  ),
  Clap: (
    <svg
      width="19"
      height="19"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="comment-clap-svg"
    >
      <path d="M11 4.5l3.5-3.5a2.12 2.12 0 1 1 3 3L14 7.5" />
      <path d="M8 7.5l3.5-3.5a2.12 2.12 0 1 1 3 3L11 10.5" />
      <path d="M5 10.5l3.5-3.5a2.12 2.12 0 1 1 3 3L8 13.5" />
      <path d="M17 11a2.5 2.5 0 0 1 3.5 3.5l-7 7a5.5 5.5 0 0 1-7.8 0L2.5 18a2.5 2.5 0 0 1 0-3.5L6 11" />
      <path d="M18 2.5a3 3 0 0 1 2 2" />
      <path d="M20.5 4.5a3.5 3.5 0 0 1 2 2" />
    </svg>
  ),
  ClapFilled: (
    <svg
      width="19"
      height="19"
      viewBox="0 0 24 24"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="comment-clap-svg is-filled"
    >
      <path d="M11 4.5l3.5-3.5a2.12 2.12 0 1 1 3 3L14 7.5" />
      <path d="M8 7.5l3.5-3.5a2.12 2.12 0 1 1 3 3L11 10.5" />
      <path d="M5 10.5l3.5-3.5a2.12 2.12 0 1 1 3 3L8 13.5" />
      <path d="M17 11a2.5 2.5 0 0 1 3.5 3.5l-7 7a5.5 5.5 0 0 1-7.8 0L2.5 18a2.5 2.5 0 0 1 0-3.5L6 11" />
      <path d="M18 2.5a3 3 0 0 1 2 2" />
      <path d="M20.5 4.5a3.5 3.5 0 0 1 2 2" />
    </svg>
  ),
  ChatBubble: (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  ),
  Pin: (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" y1="17" x2="12" y2="22" />
      <path d="M5 17h14v-1.76a2 2 0 0 0-1.11-1.79l-1.78-.89A2 2 0 0 1 15 10.77V6a3 3 0 0 0-3-3v0a3 3 0 0 0-3 3v4.77a2 2 0 0 1-1.11 1.79l-1.78.89A2 2 0 0 0 5 15.24Z" />
    </svg>
  ),
  PinFilled: (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" y1="17" x2="12" y2="22" strokeWidth="2" stroke="currentColor" />
      <path d="M5 17h14v-1.76a2 2 0 0 0-1.11-1.79l-1.78-.89A2 2 0 0 1 15 10.77V6a3 3 0 0 0-3-3v0a3 3 0 0 0-3 3v4.77a2 2 0 0 1-1.11 1.79l-1.78.89A2 2 0 0 0 5 15.24Z" />
    </svg>
  ),
  Trash: (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      <line x1="10" y1="11" x2="10" y2="17" />
      <line x1="14" y1="11" x2="14" y2="17" />
    </svg>
  ),
  MoreHorizontal: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <circle cx="5" cy="12" r="2" />
      <circle cx="12" cy="12" r="2" />
      <circle cx="19" cy="12" r="2" />
    </svg>
  ),
  Sparkle: (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="#fbbf24" stroke="none">
      <path d="M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8z" />
    </svg>
  ),
  Flag: (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
      <line x1="4" y1="22" x2="4" y2="15" />
    </svg>
  ),
}

function formatCount(num?: number | null): string {
  if (!num) return '0'
  if (num >= 1000000) return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M'
  if (num >= 1000) return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K'
  return String(num)
}

function formatCommentDate(dateStr?: string | Date, isEdited?: boolean): string {
  if (!dateStr) return 'Just now'
  const d = new Date(dateStr)
  if (isNaN(d.getTime())) return String(dateStr)
  const formatted = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  return isEdited ? `${formatted} (edited)` : formatted
}

function parseCommentQuote(content: string, explicitQuote?: string | null): { quote: string | null; body: string } {
  if (explicitQuote) {
    return { quote: explicitQuote, body: content }
  }
  if (content && content.startsWith('> ')) {
    const lines = content.split('\n')
    const quoteLines: string[] = []
    let i = 0
    while (i < lines.length && lines[i].startsWith('> ')) {
      quoteLines.push(lines[i].replace(/^>\s*/, ''))
      i++
    }
    while (i < lines.length && lines[i].trim() === '') {
      i++
    }
    const body = lines.slice(i).join('\n')
    return { quote: quoteLines.join('\n'), body: body || content }
  }
  return { quote: null, body: content }
}

const DEMO_SEED_COMMENTS: PostCommentItem[] = [
  {
    id: 'seed-comm-1',
    postId: '',
    userId: 'user-dot-read',
    createdAt: '2026-09-15T10:00:00.000Z',
    content:
      "I absolutely agree. We've got to stop using AI surveillance on our fellow writers and support each other instead.\n\nI refuse to stop using semicolons; I've always used them. But I learned how to use them correctly on a recent proofreading course.",
    claps: 1000,
    likesCount: 1000,
    isLiked: false,
    isPinned: false,
    isDeleted: false,
    user: {
      id: 'user-dot-read',
      name: 'Dot Read',
      username: 'dotread',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80',
    },
    replies: Array.from({ length: 13 }).map((_, i) => ({
      id: `seed-reply-1-${i}`,
      postId: '',
      userId: `user-reply-${i}`,
      createdAt: '2026-09-15T11:00:00.000Z',
      content: 'Well said! Semicolons add nuance that AI detectors often misinterpret.',
      claps: 12,
      likesCount: 12,
      isLiked: false,
      user: {
        id: `user-reply-${i}`,
        name: `Reader ${i + 1}`,
        username: `reader${i + 1}`,
        image: null,
      },
    })),
  },
  {
    id: 'seed-comm-2',
    postId: '',
    userId: 'user-sylvaigle',
    createdAt: '2026-09-15T12:30:00.000Z',
    updatedAt: '2026-09-15T13:00:00.000Z',
    quote: 'Apparently, Abraham Lincoln was a time traveling cyborg capable of writing AI text',
    content: "Everyone knows that. (Confirmed fact by my AI and I trust him - it's a he, I am single you know...)",
    claps: 800,
    likesCount: 800,
    isLiked: false,
    isPinned: false,
    isDeleted: false,
    user: {
      id: 'user-sylvaigle',
      name: 'Sylvaigle',
      username: 'sylvaigle',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
    },
    replies: Array.from({ length: 6 }).map((_, i) => ({
      id: `seed-reply-2-${i}`,
      postId: '',
      userId: `user-reply-s2-${i}`,
      createdAt: '2026-09-15T13:30:00.000Z',
      content: 'Haha, the AI detectors are getting completely out of hand!',
      claps: 8,
      likesCount: 8,
      isLiked: false,
      user: {
        id: `user-reply-s2-${i}`,
        name: `Campus Voice ${i + 1}`,
        username: `campus${i + 1}`,
        image: null,
      },
    })),
  },
  {
    id: 'seed-comm-3',
    postId: '',
    userId: 'user-john-hansen',
    createdAt: '2026-09-15T14:00:00.000Z',
    quote: 'Just last week, I saw a reader in the comments accuse a writer of using AI because the article contained one metaphor.',
    content: 'This is crazy. I use lots of metaphors.',
    claps: 551,
    likesCount: 551,
    isLiked: false,
    isPinned: false,
    isDeleted: false,
    user: {
      id: 'user-john-hansen',
      name: 'John Hansen PAL',
      username: 'johnhansen',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
    },
    replies: Array.from({ length: 7 }).map((_, i) => ({
      id: `seed-reply-3-${i}`,
      postId: '',
      userId: `user-reply-s3-${i}`,
      createdAt: '2026-09-15T14:45:00.000Z',
      content: 'Accusing human literary devices of being synthetic is the peak of irony.',
      claps: 15,
      likesCount: 15,
      isLiked: false,
      user: {
        id: `user-reply-s3-${i}`,
        name: `Writer Club ${i + 1}`,
        username: `writerclub${i + 1}`,
        image: null,
      },
    })),
  },
]

export const CommentsDrawer: React.FC<CommentsDrawerProps> = ({
  isOpen,
  onClose,
  postId,
  postAuthorId,
  initialCount = 0,
  currentUser,
  onCommentAdded,
  theme: propTheme,
}) => {
  const { theme: contextTheme } = useTheme()
  const activeTheme = propTheme ?? contextTheme ?? 'dark'
  const isLight = activeTheme === 'bright' || activeTheme === 'light'

  const [comments, setComments] = useState<PostCommentItem[]>([])
  const [commentCount, setCommentCount] = useState<number>(initialCount || 0)
  const [commentText, setCommentText] = useState('')

  // Close handler if used as modal/drawer with escape
  useEffect(() => {
    if (!onClose) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  if (isOpen === false) {
    return null
  }
  const [isComposerExpanded, setIsComposerExpanded] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [activeReplyCommentId, setActiveReplyCommentId] = useState<string | null>(null)
  const [activeOptionsCommentId, setActiveOptionsCommentId] = useState<string | null>(null)
  const [replyText, setReplyText] = useState('')
  const [hiddenReplies, setHiddenReplies] = useState<Record<string, boolean>>({})
  const [expandedComments, setExpandedComments] = useState<Record<string, boolean>>({})
  const [visibleCount, setVisibleCount] = useState<number>(3)

  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // Update count when prop changes
  useEffect(() => {
    if (initialCount !== undefined) {
      setCommentCount(initialCount)
    }
  }, [initialCount])

  // Close options menu on click outside
  useEffect(() => {
    if (!activeOptionsCommentId) return
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null
      if (target && !target.closest('.comment-options-wrapper')) {
        setActiveOptionsCommentId(null)
      }
    }
    window.addEventListener('click', handleClickOutside)
    return () => window.removeEventListener('click', handleClickOutside)
  }, [activeOptionsCommentId])

  // Fetch comments from backend on mount or postId change
  useEffect(() => {
    let isMounted = true
    if (!postId) return

    async function loadPostComments() {
      try {
        const fetched = await fetchPostCommentsApi(postId)
        if (isMounted) {
          if (Array.isArray(fetched) && fetched.length > 0) {
            setComments(fetched)
            const countWithReplies = fetched.reduce(
              (acc, c) =>
                acc + (c.isDeleted ? 0 : 1) + (c.replies?.filter((r) => !r.isDeleted).length || 0),
              0
            )
            setCommentCount(countWithReplies)
          } else if (typeof postId === 'string' && postId.startsWith('post_seed')) {
            // Seed post demo fallback
            setComments(DEMO_SEED_COMMENTS)
            setCommentCount(420)
          } else {
            setComments([])
            setCommentCount(0)
          }
        }
      } catch (err) {
        console.error('Failed to fetch comments:', err)
        if (isMounted) {
          if (typeof postId === 'string' && postId.startsWith('post_seed')) {
            setComments(DEMO_SEED_COMMENTS)
            setCommentCount(420)
          } else {
            setComments([])
            setCommentCount(0)
          }
        }
      }
    }

    void loadPostComments()
    return () => {
      isMounted = false
    }
  }, [postId])

  // User display metadata
  const currentUserName = currentUser?.name || (currentUser?.username ? `@${currentUser.username.replace(/^@/, '')}` : 'Sunilkumar T')
  const currentUserAvatar = currentUser?.image || null

  const handleFormat = (type: 'bold' | 'italic') => {
    if (type === 'bold') {
      setCommentText((prev) => (prev ? `**${prev}**` : '**bold text**'))
    } else {
      setCommentText((prev) => (prev ? `*${prev}*` : '*italic text*'))
    }
    textareaRef.current?.focus()
  }

  const handleCancel = () => {
    setCommentText('')
    setIsComposerExpanded(false)
  }

  const handleSubmitResponse = async () => {
    const trimmed = commentText.trim()
    if (!trimmed || isSubmitting) return

    setIsSubmitting(true)
    const optimisticId = `user-comm-${Date.now()}`
    const newCommentItem: PostCommentItem = {
      id: optimisticId,
      postId,
      userId: currentUser?.id || 'current-user',
      createdAt: new Date().toISOString(),
      content: trimmed,
      claps: 0,
      likesCount: 0,
      isLiked: false,
      isPinned: false,
      isDeleted: false,
      canDelete: true,
      canPin: Boolean(currentUser?.id && currentUser.id === postAuthorId),
      user: {
        id: currentUser?.id || 'current-user',
        name: currentUserName,
        username: currentUser?.username || null,
        image: currentUserAvatar,
      },
      replies: [],
    }

    // Immediately update UI
    setComments((prev) => [newCommentItem, ...prev])
    const nextCount = commentCount + 1
    setCommentCount(nextCount)
    setCommentText('')
    setIsComposerExpanded(false)
    if (onCommentAdded) {
      onCommentAdded(nextCount)
    }

    try {
      const serverComment = await createPostCommentApi(postId, trimmed, null)
      if (serverComment) {
        setComments((prev) =>
          prev.map((c) =>
            c.id === optimisticId
              ? {
                  ...c,
                  id: serverComment.id,
                  createdAt: serverComment.createdAt || c.createdAt,
                  userId: serverComment.userId || c.userId,
                  canDelete: true,
                }
              : c
          )
        )
      }
    } catch (err) {
      console.error('Failed to post comment to server:', err)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSendReply = async (parentCommentId: string) => {
    const trimmed = replyText.trim()
    if (!trimmed) return

    const optimisticReplyId = `reply-${Date.now()}`
    const newReplyItem: PostCommentItem = {
      id: optimisticReplyId,
      postId,
      userId: currentUser?.id || 'current-user',
      parentId: parentCommentId,
      createdAt: new Date().toISOString(),
      content: trimmed,
      claps: 0,
      likesCount: 0,
      isLiked: false,
      isDeleted: false,
      canDelete: true,
      user: {
        id: currentUser?.id || 'current-user',
        name: currentUserName,
        username: currentUser?.username || null,
        image: currentUserAvatar,
      },
    }

    setComments((prev) =>
      prev.map((c) =>
        c.id === parentCommentId
          ? {
              ...c,
              replies: [...(c.replies || []), newReplyItem],
            }
          : c
      )
    )

    const nextCount = commentCount + 1
    setCommentCount(nextCount)
    setReplyText('')
    setActiveReplyCommentId(null)
    if (onCommentAdded) {
      onCommentAdded(nextCount)
    }

    try {
      const serverReply = await createPostCommentApi(postId, trimmed, parentCommentId)
      if (serverReply) {
        setComments((prev) =>
          prev.map((c) =>
            c.id === parentCommentId
              ? {
                  ...c,
                  replies: (c.replies || []).map((r) =>
                    r.id === optimisticReplyId
                      ? {
                          ...r,
                          id: serverReply.id,
                          createdAt: serverReply.createdAt || r.createdAt,
                          userId: serverReply.userId || r.userId,
                          canDelete: true,
                        }
                      : r
                  ),
                }
              : c
          )
        )
      }
    } catch (err) {
      console.error('Failed to send reply:', err)
    }
  }

  // Toggle Like/Clap on comment or reply
  const handleToggleLike = async (commentId: string) => {
    let targetLiked = false
    let prevLikes = 0

    const updateOptimistically = (list: PostCommentItem[]): PostCommentItem[] => {
      return list.map((item) => {
        if (item.id === commentId) {
          targetLiked = !item.isLiked
          prevLikes = item.likesCount ?? item.claps ?? 0
          const updatedLikes = targetLiked ? prevLikes + 1 : Math.max(0, prevLikes - 1)
          return {
            ...item,
            isLiked: targetLiked,
            likesCount: updatedLikes,
            claps: updatedLikes,
          }
        }
        if (item.replies && item.replies.length > 0) {
          return {
            ...item,
            replies: updateOptimistically(item.replies),
          }
        }
        return item
      })
    }

    setComments((prev) => updateOptimistically(prev))

    try {
      const serverRes = await toggleCommentLikeApi(commentId)
      if (serverRes) {
        const syncServerLikes = (list: PostCommentItem[]): PostCommentItem[] => {
          return list.map((item) => {
            if (item.id === commentId) {
              return {
                ...item,
                isLiked: serverRes.isLiked,
                likesCount: serverRes.likesCount,
                claps: serverRes.likesCount,
              }
            }
            if (item.replies && item.replies.length > 0) {
              return {
                ...item,
                replies: syncServerLikes(item.replies),
              }
            }
            return item
          })
        }
        setComments((prev) => syncServerLikes(prev))
      }
    } catch (err) {
      console.error('Failed to toggle comment like:', err)
      const rollback = (list: PostCommentItem[]): PostCommentItem[] => {
        return list.map((item) => {
          if (item.id === commentId) {
            return {
              ...item,
              isLiked: !targetLiked,
              likesCount: prevLikes,
              claps: prevLikes,
            }
          }
          if (item.replies && item.replies.length > 0) {
            return {
              ...item,
              replies: rollback(item.replies),
            }
          }
          return item
        })
      }
      setComments((prev) => rollback(prev))
    }
  }

  // Toggle Pin on a comment
  const handleTogglePin = async (commentId: string) => {
    let nextPinnedState = false
    setComments((prev) =>
      prev.map((c) => {
        if (c.id === commentId) {
          nextPinnedState = !c.isPinned
          return { ...c, isPinned: nextPinnedState }
        }
        return c
      })
    )
    setActiveOptionsCommentId(null)

    try {
      const res = await togglePinCommentApi(commentId)
      if (res) {
        setComments((prev) =>
          prev.map((c) => (c.id === commentId ? { ...c, isPinned: res.isPinned } : c))
        )
      }
    } catch (err) {
      console.error('Failed to toggle pin on comment:', err)
      setComments((prev) =>
        prev.map((c) => (c.id === commentId ? { ...c, isPinned: !nextPinnedState } : c))
      )
    }
  }

  // Delete comment
  const handleDeleteComment = async (commentId: string) => {
    if (!window.confirm('Are you sure you want to delete this response?')) {
      return
    }

    setActiveOptionsCommentId(null)

    const markDeleted = (list: PostCommentItem[]): PostCommentItem[] => {
      return list.map((item) => {
        if (item.id === commentId) {
          return {
            ...item,
            isDeleted: true,
            content: '[Comment deleted]',
          }
        }
        if (item.replies && item.replies.length > 0) {
          return {
            ...item,
            replies: markDeleted(item.replies),
          }
        }
        return item
      })
    }

    setComments((prev) => markDeleted(prev))
    const nextCount = Math.max(0, commentCount - 1)
    setCommentCount(nextCount)
    if (onCommentAdded) {
      onCommentAdded(nextCount)
    }

    try {
      const success = await deleteCommentApi(commentId)
      if (!success) {
        console.error('Failed to delete comment on server')
      }
    } catch (err) {
      console.error('Error deleting comment:', err)
    }
  }

  // Report comment
  const handleReportComment = async (commentId: string) => {
    setActiveOptionsCommentId(null)
    const reason = window.prompt(
      'Reason for reporting this response (e.g. Spam, Harassment, Inappropriate content):',
      'Inappropriate content'
    )
    if (reason === null) return

    try {
      await reportCommentApi(commentId, reason.trim() || 'Inappropriate content')
      alert('Thank you. The response has been reported for moderation.')
    } catch (err) {
      console.error('Failed to report comment:', err)
      alert('Response reported. Thank you for keeping our community safe.')
    }
  }

  const toggleHideReplies = (commentId: string) => {
    setHiddenReplies((prev) => ({
      ...prev,
      [commentId]: !prev[commentId],
    }))
  }

  const sortedComments = [...comments].sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1
    if (!a.isPinned && b.isPinned) return 1
    const aScore = a.likesCount ?? a.claps ?? 0
    const bScore = b.likesCount ?? b.claps ?? 0
    if (aScore !== bScore) return bScore - aScore
    const aTime = a.createdAt ? new Date(a.createdAt).getTime() : 0
    const bTime = b.createdAt ? new Date(b.createdAt).getTime() : 0
    return bTime - aTime
  })

  const visibleComments = sortedComments.slice(0, visibleCount)

  return (
    <section
      id="comments-section"
      className={`lumina-comments-section ${isLight ? 'light' : 'dark'}`}
      aria-label="Responses"
    >
      {/* 1. Header with title & shield icon */}
      <div className="comments-section-header">
        <h3 className="comments-section-title">Responses ({commentCount})</h3>
        <button
          type="button"
          className="comments-header-shield-btn"
          title="Community Guidelines"
          onClick={() => alert('Lumina Community Discussion Guidelines')}
        >
          {DrawerIcons.Shield}
        </button>
      </div>

      {/* 2. Composer Section */}
      <div className="comments-composer-section">
        <div className="comments-composer-user-row">
          <img
            src={currentUserAvatar || DEFAULT_WHATSAPP_AVATAR}
            alt={currentUserName}
            className="comments-composer-avatar"
            onError={(e) => {
              ;(e.target as HTMLImageElement).src = DEFAULT_WHATSAPP_AVATAR
            }}
          />
          <span className="comments-composer-name">{currentUserName}</span>
        </div>

        {!isComposerExpanded && !commentText ? (
          <div
            className="comments-composer-placeholder-box"
            tabIndex={0}
            role="button"
            onClick={() => {
              setIsComposerExpanded(true)
              setTimeout(() => textareaRef.current?.focus(), 50)
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                setIsComposerExpanded(true)
                setTimeout(() => textareaRef.current?.focus(), 50)
              }
            }}
          >
            What are your thoughts?
          </div>
        ) : (
          <div className="comments-composer-expanded-box">
            <textarea
              ref={textareaRef}
              className="comments-composer-textarea"
              placeholder="What are your thoughts?"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              rows={3}
              autoFocus
            />

            <div className="comments-composer-toolbar">
              <div className="comments-composer-tools">
                <button
                  type="button"
                  className="comments-tool-btn is-bold"
                  title="Bold"
                  onClick={() => handleFormat('bold')}
                >
                  B
                </button>
                <button
                  type="button"
                  className="comments-tool-btn is-italic"
                  title="Italic"
                  onClick={() => handleFormat('italic')}
                >
                  I
                </button>
                <button
                  type="button"
                  className="comments-tool-btn"
                  title="Add Link"
                  onClick={() => {
                    const url = prompt('Enter link URL:')
                    if (url) setCommentText((prev) => `${prev} [Link](${url})`)
                  }}
                >
                  {DrawerIcons.Link}
                </button>
              </div>

              <div className="comments-composer-actions">
                <button
                  type="button"
                  className="comments-cancel-btn"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className={`comments-respond-btn ${commentText.trim() ? 'is-active' : ''}`}
                  disabled={!commentText.trim() || isSubmitting}
                  onClick={handleSubmitResponse}
                >
                  {isSubmitting ? 'Posting...' : 'Respond'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Subtle Divider separating composer from comments */}
      <div className="comments-divider" />

      {/* 3. Comments List Stream */}
      <div className="comments-list-stream">
        {comments.length === 0 ? (
          <div className="comments-empty-state">
            <p className="comments-empty-title">
              There are currently no responses for this story.
            </p>
            <p className="comments-empty-subtitle">Be the first to respond.</p>
          </div>
        ) : (
          visibleComments.map((comment) => {
            const totalLikes = comment.likesCount ?? comment.claps ?? 0
            const isCommentLiked = Boolean(comment.isLiked)
            const repliesList = comment.replies || []
            const hasReplies = repliesList.length > 0
            const areRepliesHidden = Boolean(hiddenReplies[comment.id])

            const isCommentCreator = Boolean(
              currentUser?.id &&
                (currentUser.id === comment.userId ||
                  currentUser.id === comment.user?.id ||
                  comment.canDelete)
            )
            const isPostAuthor = Boolean(
              currentUser?.id && (currentUser.id === postAuthorId || comment.canPin)
            )

            const { quote: parsedQuote, body: parsedBody } = parseCommentQuote(
              comment.content,
              comment.quote
            )

            const isLong = parsedBody.length > 250
            const isExpanded = Boolean(expandedComments[comment.id])
            const displayBody = isLong && !isExpanded ? `${parsedBody.slice(0, 220)}...` : parsedBody

            return (
              <article key={comment.id} className="comment-card-item">
                {/* Author row */}
                <div className="comment-author-row">
                  <div className="comment-author-left">
                    <div className="comment-avatar-wrap">
                      <img
                        src={comment.user?.image || DEFAULT_WHATSAPP_AVATAR}
                        alt={comment.user?.name || 'User'}
                        className="comment-avatar"
                        onError={(e) => {
                          ;(e.target as HTMLImageElement).src = DEFAULT_WHATSAPP_AVATAR
                        }}
                      />
                    </div>

                    <div className="comment-meta-col">
                      <div className="comment-meta-name-line">
                        <span className="comment-author-name">
                          {comment.user?.username
                            ? `@${comment.user.username.replace(/^@/, '')}`
                            : comment.user?.name || 'Student'}
                        </span>
                        {comment.isPinned && (
                          <span
                            className="comment-pinned-icon"
                            title="Pinned"
                            aria-label="Pinned"
                          >
                            {DrawerIcons.PinFilled}
                          </span>
                        )}
                        {comment.isAuthor && (
                          <span className="comment-author-badge">Author</span>
                        )}
                      </div>

                      <span className="comment-date">
                        {formatCommentDate(
                          comment.createdAt,
                          Boolean(comment.updatedAt && comment.updatedAt !== comment.createdAt)
                        )}
                      </span>
                    </div>
                  </div>

                  {/* Options Menu Button (•••) */}
                  <div className="comment-options-wrapper">
                    <button
                      type="button"
                      className="comment-more-btn"
                      title="More options"
                      onClick={() =>
                        setActiveOptionsCommentId((prev) =>
                          prev === comment.id ? null : comment.id
                        )
                      }
                    >
                      {DrawerIcons.MoreHorizontal}
                    </button>

                    {activeOptionsCommentId === comment.id && (
                      <div className="comment-options-menu">
                        {isPostAuthor && !comment.isDeleted && (
                          <button
                            type="button"
                            className="comment-options-item"
                            onClick={() => handleTogglePin(comment.id)}
                          >
                            {comment.isPinned ? DrawerIcons.Pin : DrawerIcons.PinFilled}
                            <span>{comment.isPinned ? 'Unpin response' : 'Pin response'}</span>
                          </button>
                        )}
                        {isCommentCreator && !comment.isDeleted && (
                          <button
                            type="button"
                            className="comment-options-item is-danger"
                            onClick={() => handleDeleteComment(comment.id)}
                          >
                            {DrawerIcons.Trash}
                            <span>Delete response</span>
                          </button>
                        )}
                        <button
                          type="button"
                          className="comment-options-item is-danger"
                          onClick={() => handleReportComment(comment.id)}
                        >
                          {DrawerIcons.Flag}
                          <span>Report</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Green Highlighted Quote Card if present */}
                {parsedQuote && (
                  <div className="comment-quote-card">
                    <span className="comment-quote-highlight">{parsedQuote}</span>
                  </div>
                )}

                {/* Comment Body */}
                <div
                  className="comment-body-text"
                  style={{
                    fontStyle: comment.isDeleted ? 'italic' : 'normal',
                    opacity: comment.isDeleted ? 0.6 : 1,
                  }}
                >
                  {comment.isDeleted ? (
                    'This response was deleted.'
                  ) : (
                    <>
                      {displayBody}
                      {isLong && !isExpanded && (
                        <button
                          type="button"
                          className="comment-more-link"
                          onClick={() =>
                            setExpandedComments((prev) => ({
                              ...prev,
                              [comment.id]: true,
                            }))
                          }
                        >
                          more
                        </button>
                      )}
                    </>
                  )}
                </div>

                {/* Action Bar: Like, Replies count, Reply, Pin, Delete */}
                <div className="comment-actions-bar">
                  <button
                    type="button"
                    className={`comment-like-btn ${isCommentLiked ? 'is-liked' : ''}`}
                    onClick={() => handleToggleLike(comment.id)}
                    title={isCommentLiked ? 'Unlike' : 'Like'}
                    disabled={comment.isDeleted}
                  >
                    {isCommentLiked ? DrawerIcons.HeartFilled : DrawerIcons.Heart}
                    <span>{formatCount(totalLikes)}</span>
                  </button>

                  {hasReplies && (
                    <button
                      type="button"
                      className="comment-replies-count-btn"
                      onClick={() => toggleHideReplies(comment.id)}
                      title={areRepliesHidden ? 'Show replies' : 'Hide replies'}
                    >
                      {DrawerIcons.ChatBubble}
                      <span>
                        {repliesList.length} {repliesList.length === 1 ? 'reply' : 'replies'}
                      </span>
                    </button>
                  )}

                  {!comment.isDeleted && (
                    <button
                      type="button"
                      className="comment-reply-label-btn"
                      onClick={() =>
                        setActiveReplyCommentId((prev) =>
                          prev === comment.id ? null : comment.id
                        )
                      }
                    >
                      Reply
                    </button>
                  )}

                  {isPostAuthor && !comment.isDeleted && (
                    <button
                      type="button"
                      className={`comment-action-icon-btn ${comment.isPinned ? 'is-pinned' : ''}`}
                      onClick={() => handleTogglePin(comment.id)}
                      title={comment.isPinned ? 'Unpin response' : 'Pin response'}
                    >
                      {comment.isPinned ? DrawerIcons.PinFilled : DrawerIcons.Pin}
                      <span className="comment-action-text">{comment.isPinned ? 'Pinned' : 'Pin'}</span>
                    </button>
                  )}

                  {isCommentCreator && !comment.isDeleted && (
                    <button
                      type="button"
                      className="comment-action-icon-btn is-danger"
                      onClick={() => handleDeleteComment(comment.id)}
                      title="Delete response"
                    >
                      {DrawerIcons.Trash}
                      <span className="comment-action-text">Delete</span>
                    </button>
                  )}
                </div>

                {/* Inline reply composer */}
                {activeReplyCommentId === comment.id && !comment.isDeleted && (
                  <div className="comment-inline-reply-box">
                    <textarea
                      className="comment-inline-reply-input"
                      placeholder="Write a reply..."
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      rows={2}
                      autoFocus
                    />
                    <div className="comment-inline-reply-actions">
                      <button
                        type="button"
                        className="comments-cancel-btn"
                        onClick={() => {
                          setActiveReplyCommentId(null)
                          setReplyText('')
                        }}
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        className={`comments-respond-btn ${replyText.trim() ? 'is-active' : ''}`}
                        disabled={!replyText.trim()}
                        onClick={() => handleSendReply(comment.id)}
                      >
                        Respond
                      </button>
                    </div>
                  </div>
                )}

                {/* Nested Replies Stream */}
                {hasReplies && !areRepliesHidden && (
                  <div className="comment-replies-stream">
                    {repliesList.map((reply) => {
                      const isReplyCreator = Boolean(
                        currentUser?.id &&
                          (currentUser.id === reply.userId ||
                            currentUser.id === reply.user?.id ||
                            reply.canDelete)
                      )
                      const isReplyAuthor = Boolean(
                        reply.isAuthor ||
                          (postAuthorId &&
                            (reply.userId === postAuthorId || reply.user?.id === postAuthorId))
                      )
                      const isReplyLiked = Boolean(reply.isLiked)
                      const replyLikes = reply.likesCount ?? reply.claps ?? 0

                      return (
                        <div key={reply.id} className="comment-reply-item">
                          <div className="comment-author-row">
                            <div className="comment-author-left">
                              <img
                                src={reply.user?.image || DEFAULT_WHATSAPP_AVATAR}
                                alt={reply.user?.name || 'User'}
                                className="comment-reply-avatar"
                                onError={(e) => {
                                  ;(e.target as HTMLImageElement).src = DEFAULT_WHATSAPP_AVATAR
                                }}
                              />
                              <div className="comment-meta-col">
                                <div className="comment-meta-name-line">
                                  <span className="comment-author-name">
                                    {reply.user?.username
                                      ? `@${reply.user.username.replace(/^@/, '')}`
                                      : reply.user?.name || 'Student'}
                                  </span>
                                  {isReplyAuthor && (
                                    <span className="comment-author-badge">Author</span>
                                  )}
                                </div>
                                <span className="comment-date">
                                  {formatCommentDate(reply.createdAt)}
                                </span>
                              </div>
                            </div>

                            <div className="comment-options-wrapper">
                              <button
                                type="button"
                                className="comment-more-btn"
                                title="More options"
                                onClick={() =>
                                  setActiveOptionsCommentId((prev) =>
                                    prev === reply.id ? null : reply.id
                                  )
                                }
                              >
                                {DrawerIcons.MoreHorizontal}
                              </button>

                              {activeOptionsCommentId === reply.id && (
                                <div className="comment-options-menu">
                                  {isReplyCreator && !reply.isDeleted && (
                                    <button
                                      type="button"
                                      className="comment-options-item is-danger"
                                      onClick={() => handleDeleteComment(reply.id)}
                                    >
                                      {DrawerIcons.Trash}
                                      <span>Delete response</span>
                                    </button>
                                  )}
                                  <button
                                    type="button"
                                    className="comment-options-item is-danger"
                                    onClick={() => handleReportComment(reply.id)}
                                  >
                                    {DrawerIcons.Flag}
                                    <span>Report</span>
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>

                          <div
                            className="comment-reply-body"
                            style={{
                              fontStyle: reply.isDeleted ? 'italic' : 'normal',
                              opacity: reply.isDeleted ? 0.6 : 1,
                            }}
                          >
                            {reply.isDeleted ? 'This response was deleted.' : reply.content}
                          </div>

                          <div className="comment-actions-bar">
                            <button
                              type="button"
                              className={`comment-like-btn ${isReplyLiked ? 'is-liked' : ''}`}
                              onClick={() => handleToggleLike(reply.id)}
                              title={isReplyLiked ? 'Unlike' : 'Like'}
                              disabled={reply.isDeleted}
                            >
                              {isReplyLiked ? DrawerIcons.HeartFilled : DrawerIcons.Heart}
                              <span>{formatCount(replyLikes)}</span>
                            </button>

                            {isReplyCreator && !reply.isDeleted && (
                              <button
                                type="button"
                                className="comment-action-icon-btn is-danger"
                                onClick={() => handleDeleteComment(reply.id)}
                                title="Delete response"
                              >
                                {DrawerIcons.Trash}
                                <span className="comment-action-text">Delete</span>
                              </button>
                            )}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}
              </article>
            )
          })
        )}
      </div>

      {/* 4. "See all responses" pill button */}
      {visibleCount < sortedComments.length && (
        <div className="comments-see-all-wrapper">
          <button
            type="button"
            className="comments-see-all-btn"
            onClick={() => setVisibleCount((prev) => prev + 5)}
          >
            See all responses
          </button>
        </div>
      )}
    </section>
  )
}

export const CommentsSection = CommentsDrawer
export default CommentsDrawer
