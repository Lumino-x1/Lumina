import React, { useEffect, useState } from 'react'
import {
  type PostCommentItem,
  fetchPostCommentsApi,
  createPostCommentApi,
} from '../api/feedApi'
import { DEFAULT_WHATSAPP_AVATAR } from './WhatsAppDefaultAvatar'
import { useTheme } from '../lib/themeContext'
import './CommentsDrawer.css'

export interface CommentsDrawerProps {
  isOpen: boolean
  onClose: () => void
  postId: string
  postTitle?: string
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
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  ),
  Shield: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  ),
  Link: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  ),
  Clap: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3z" />
      <path d="M7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
    </svg>
  ),
  ClapFilled: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="#ffffff" stroke="#ffffff" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3z" />
      <path d="M7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
    </svg>
  ),
  ChevronDown: (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  ),
}

export const CommentsDrawer: React.FC<CommentsDrawerProps> = ({
  isOpen,
  onClose,
  postId,
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
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [sortBy, setSortBy] = useState<'most_relevant' | 'newest'>('most_relevant')
  const [activeReplyCommentId, setActiveReplyCommentId] = useState<string | null>(null)
  const [replyText, setReplyText] = useState('')
  const [clappedComments, setClappedComments] = useState<Record<string, number>>({})
  const [hiddenReplies, setHiddenReplies] = useState<Record<string, boolean>>({})

  // Update count when prop changes
  useEffect(() => {
    if (initialCount !== undefined) {
      setCommentCount(initialCount)
    }
  }, [initialCount])

  // Fetch comments from backend on mount or postId change
  useEffect(() => {
    let isMounted = true
    if (!postId) return

    async function loadPostComments() {
      try {
        const fetched = await fetchPostCommentsApi(postId)
        if (isMounted) {
          if (Array.isArray(fetched)) {
            setComments(fetched)
            const countWithReplies = fetched.reduce(
              (acc, c) => acc + 1 + (c.replies?.length || 0),
              0
            )
            setCommentCount(countWithReplies)
          } else {
            setComments([])
            setCommentCount(0)
          }
        }
      } catch (err) {
        console.error('Failed to fetch comments:', err)
        if (isMounted) {
          setComments([])
          setCommentCount(0)
        }
      }
    }

    void loadPostComments()
    return () => {
      isMounted = false
    }
  }, [postId])

  // Close drawer on Escape key
  useEffect(() => {
    if (!isOpen) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  if (!isOpen) return null

  // User display metadata
  const currentUserName = currentUser?.name || currentUser?.username || '24Z275 - SUNILKUMAR T'
  const currentUserAvatar = currentUser?.image || null

  const handleClap = (commentId: string) => {
    const prevAdded = clappedComments[commentId] || 0
    const newAdded = prevAdded + 1
    setClappedComments((prev) => ({
      ...prev,
      [commentId]: newAdded,
    }))
  }

  const handleFormat = (type: 'bold' | 'italic') => {
    if (type === 'bold') {
      setCommentText((prev) => (prev ? `**${prev}**` : '**bold text**'))
    } else {
      setCommentText((prev) => (prev ? `*${prev}*` : '*italic text*'))
    }
  }

  const handleCancel = () => {
    setCommentText('')
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
      createdAt: 'Just now',
      content: trimmed,
      claps: 0,
      user: {
        id: currentUser?.id || 'current-user',
        name: currentUserName,
        image: currentUserAvatar,
      },
      replies: [],
    }

    // Immediately update UI
    setComments((prev) => [newCommentItem, ...prev])
    const nextCount = commentCount + 1
    setCommentCount(nextCount)
    setCommentText('')
    if (onCommentAdded) {
      onCommentAdded(nextCount)
    }

    try {
      const serverComment = await createPostCommentApi(postId, trimmed, null)
      if (serverComment) {
        setComments((prev) =>
          prev.map((c) => (c.id === optimisticId ? { ...c, id: serverComment.id } : c))
        )
      }
    } catch (err) {
      console.error('Failed to post comment to server:', err)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSubmitReply = async (parentCommentId: string) => {
    const trimmed = replyText.trim()
    if (!trimmed) return

    const newReplyItem: PostCommentItem = {
      id: `reply-${Date.now()}`,
      postId,
      userId: currentUser?.id || 'current-user',
      createdAt: 'Just now',
      content: trimmed,
      claps: 0,
      user: {
        id: currentUser?.id || 'current-user',
        name: currentUserName,
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
      await createPostCommentApi(postId, trimmed, parentCommentId)
    } catch (err) {
      console.error('Failed to send reply:', err)
    }
  }

  const toggleHideReplies = (commentId: string) => {
    setHiddenReplies((prev) => ({
      ...prev,
      [commentId]: !prev[commentId],
    }))
  }

  return (
    <>
      {/* Dimmed backdrop */}
      <div className="lumina-comments-overlay" onClick={onClose} />

      {/* Right-Side Drawer Window */}
      <aside className={`lumina-comments-drawer ${isLight ? 'light' : 'dark'}`} role="dialog" aria-modal="true">
        {/* Header */}
        <div className="comments-drawer-header">
          <h2 className="comments-drawer-title">
            Responses ({commentCount})
          </h2>
          <div className="comments-drawer-header-actions">
            <button
              type="button"
              className="comments-header-icon-btn"
              title="Community Guidelines"
              onClick={() => alert('Lumina Community Discussion Guidelines')}
            >
              {DrawerIcons.Shield}
            </button>
            <button
              type="button"
              className="comments-header-icon-btn comments-close-btn"
              title="Close responses"
              onClick={onClose}
            >
              {DrawerIcons.Close}
            </button>
          </div>
        </div>

        {/* Scrollable Drawer Body */}
        <div className="comments-drawer-body">
          {/* New Response Input Card */}
          <div className="comments-composer-card">
            {/* Author info */}
            <div className="comments-composer-author">
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

            {/* Textarea */}
            <textarea
              className="comments-composer-textarea"
              placeholder="What are your thoughts?"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              rows={3}
            />

            {/* Bottom tools & action buttons */}
            <div className="comments-composer-footer">
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
                {commentText && (
                  <button
                    type="button"
                    className="comments-cancel-btn"
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
                )}
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

          {/* Sort Header */}
          <div className="comments-sort-header">
            <button
              type="button"
              className="comments-sort-btn"
              onClick={() =>
                setSortBy((prev) =>
                  prev === 'most_relevant' ? 'newest' : 'most_relevant'
                )
              }
            >
              <span>
                {sortBy === 'most_relevant' ? 'MOST RELEVANT' : 'NEWEST'}
              </span>
              {DrawerIcons.ChevronDown}
            </button>
          </div>

          {/* Comments List Stream */}
          <div className="comments-list-stream">
            {comments.length === 0 ? (
              <div className="comments-empty-state">
                <p className="comments-empty-title">
                  There are currently no responses for this story.
                </p>
                <p className="comments-empty-subtitle">Be the first to respond.</p>
              </div>
            ) : (
              [...comments]
                .sort((a, b) => {
                  if (sortBy === 'most_relevant') {
                    if (a.isPinned && !b.isPinned) return -1
                    if (!a.isPinned && b.isPinned) return 1
                    const aScore = (a.claps || 0) + (clappedComments[a.id] || 0)
                    const bScore = (b.claps || 0) + (clappedComments[b.id] || 0)
                    if (aScore !== bScore) return bScore - aScore
                  }
                  const aTime = a.createdAt ? new Date(a.createdAt).getTime() : 0
                  const bTime = b.createdAt ? new Date(b.createdAt).getTime() : 0
                  return bTime - aTime
                })
                .map((comment) => {
                const totalClaps = (comment.claps || 0) + (clappedComments[comment.id] || 0)
                const hasReplies = Array.isArray(comment.replies) && comment.replies.length > 0
                const areRepliesHidden = Boolean(hiddenReplies[comment.id])

                return (
                  <article key={comment.id} className="comment-card-item">
                    {/* Author Header */}
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
                        <div className="comment-meta-text">
                          <div className="comment-meta-name-line">
                            <span className="comment-author-name">
                              {comment.user?.name || 'Student'}
                            </span>
                            {comment.isPinned && (
                              <span className="comment-pinned-badge">Pinned</span>
                            )}
                            {comment.user?.pronouns && (
                              <span className="comment-author-pronouns">
                                {comment.user.pronouns}
                              </span>
                            )}
                            {comment.isAuthor && (
                              <span className="comment-author-badge">Author</span>
                            )}
                          </div>
                          <span className="comment-date">
                            {typeof comment.createdAt === 'string' && comment.createdAt.includes('T')
                              ? new Date(comment.createdAt).toLocaleDateString('en-US', {
                                  month: 'short',
                                  day: 'numeric',
                                })
                              : comment.createdAt}
                          </span>
                        </div>
                      </div>
                      <button
                        type="button"
                        className="comment-more-btn"
                        title="Options"
                        onClick={() => alert('Comment options')}
                      >
                        •••
                      </button>
                    </div>

                    {/* Highlight Quote Box if present */}
                    {comment.quote && (
                      <div className="comment-quote-box">{comment.quote}</div>
                    )}

                    {/* Comment Body */}
                    <div
                      className="comment-body-text"
                      style={{
                        fontStyle: comment.isDeleted ? 'italic' : 'normal',
                        opacity: comment.isDeleted ? 0.6 : 1,
                      }}
                    >
                      {comment.isDeleted ? 'This response was deleted.' : comment.content}
                    </div>

                    {/* Action Bar */}
                    <div className="comment-actions-bar">
                      <button
                        type="button"
                        className={`comment-action-btn ${
                          clappedComments[comment.id] ? 'is-clapped' : ''
                        }`}
                        onClick={() => handleClap(comment.id)}
                        title="Clap"
                      >
                        {clappedComments[comment.id]
                          ? DrawerIcons.ClapFilled
                          : DrawerIcons.Clap}
                        <span>{totalClaps}</span>
                      </button>

                      {hasReplies && (
                        <button
                          type="button"
                          className="comment-reply-btn"
                          onClick={() => toggleHideReplies(comment.id)}
                        >
                          {areRepliesHidden ? 'Show replies' : 'Hide replies'}
                        </button>
                      )}

                      <button
                        type="button"
                        className="comment-reply-btn"
                        onClick={() =>
                          setActiveReplyCommentId((prev) =>
                            prev === comment.id ? null : comment.id
                          )
                        }
                      >
                        Reply
                      </button>
                    </div>

                    {/* Inline reply composer */}
                    {activeReplyCommentId === comment.id && (
                      <div className="comment-inline-reply-box">
                        <textarea
                          className="comment-inline-reply-input"
                          placeholder="Write a reply..."
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                          rows={2}
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
                            className={`comments-respond-btn ${
                              replyText.trim() ? 'is-active' : ''
                            }`}
                            disabled={!replyText.trim()}
                            onClick={() => handleSubmitReply(comment.id)}
                          >
                            Reply
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Threaded Child Replies */}
                    {hasReplies && !areRepliesHidden && (
                      <div className="comment-replies-thread">
                        {comment.replies!.map((reply) => {
                          const replyClaps =
                            (reply.claps || 0) + (clappedComments[reply.id] || 0)

                          return (
                            <div key={reply.id} className="reply-card-item">
                              <div className="comment-author-row">
                                <div className="comment-author-left">
                                <div className="comment-avatar-wrap">
                                  <img
                                    src={reply.user?.image || DEFAULT_WHATSAPP_AVATAR}
                                    alt={reply.user?.name || 'User'}
                                    className="comment-avatar"
                                    onError={(e) => {
                                      ;(e.target as HTMLImageElement).src = DEFAULT_WHATSAPP_AVATAR
                                    }}
                                  />
                                </div>
                                <div className="comment-meta-text">
                                  <div className="comment-meta-name-line">
                                    <span className="comment-author-name">
                                      {reply.user?.name || 'Author'}
                                    </span>
                                    {reply.isAuthor && (
                                      <span className="comment-author-badge">
                                        Author
                                      </span>
                                    )}
                                  </div>
                                  <span className="comment-date">
                                    {typeof reply.createdAt === 'string' &&
                                    reply.createdAt.includes('T')
                                      ? new Date(reply.createdAt).toLocaleDateString(
                                          'en-US',
                                          { month: 'short', day: 'numeric' }
                                        )
                                      : reply.createdAt}
                                  </span>
                                </div>
                              </div>
                              <button
                                type="button"
                                className="comment-more-btn"
                                title="Options"
                              >
                                •••
                              </button>
                            </div>

                            <div className="comment-body-text">{reply.content}</div>

                            <div className="comment-actions-bar">
                              <button
                                type="button"
                                className={`comment-action-btn ${
                                  clappedComments[reply.id] ? 'is-clapped' : ''
                                }`}
                                onClick={() => handleClap(reply.id)}
                                title="Clap"
                              >
                                {clappedComments[reply.id]
                                  ? DrawerIcons.ClapFilled
                                  : DrawerIcons.Clap}
                                <span>{replyClaps}</span>
                              </button>
                              <button
                                type="button"
                                className="comment-reply-btn"
                                onClick={() =>
                                  setActiveReplyCommentId(comment.id)
                                }
                              >
                                Reply
                              </button>
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
        </div>
      </aside>
    </>
  )
}

export default CommentsDrawer
