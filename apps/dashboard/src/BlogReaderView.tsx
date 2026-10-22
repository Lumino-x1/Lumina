import React, { useEffect, useState } from 'react'
import { type FeedStory, togglePostLikeApi } from './api/feedApi'
import {
  sendFriendRequestApi,
  cancelFriendRequestApi,
  fetchOutgoingRequestsApi,
  fetchMyFriendsApi,
} from './api/friendsApi'
import { CommentsSection } from './components/CommentsDrawer'
import { DEFAULT_WHATSAPP_AVATAR } from './components/WhatsAppDefaultAvatar'
import { useTheme } from './lib/themeContext'
import { parseVideoUrl } from './editor/blocks/VideoBlock'
import { getEmbedProvider, renderFallbackPreviewCard } from './editor/embeds/embedProviders'
import './BlogReaderView.css'

export interface BlogReaderViewProps {
  story: FeedStory
  onBack: () => void
  onLike?: (storyId: string) => void
  isLiked?: boolean
  onToggleSave?: (storyId: string) => void
  isSaved?: boolean
  initialOpenComments?: boolean
  currentUser?: {
    id?: string
    name?: string | null
    username?: string | null
    image?: string | null
    email?: string | null
  } | null
  onCommentAdded?: (storyId: string, newCount?: number) => void
}

import { ArrowLeft, Heart, MessageSquare, Share2, Bookmark, Check, Repeat, MoreHorizontal } from 'lucide-react'

function formatNumber(num: number): string {
  if (!num) return '0'
  if (num >= 1000000) return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M'
  if (num >= 1000) return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K'
  return String(num)
}

export const BlogReaderView: React.FC<BlogReaderViewProps> = ({
  story,
  onBack,
  onLike,
  isLiked = false,
  onToggleSave,
  isSaved = false,
  initialOpenComments = false,
  currentUser,
  onCommentAdded,
}) => {
  const { theme } = useTheme()
  const [copied, setCopied] = useState(false)
  const [likeCount, setLikeCount] = useState(story.likes || 0)
  const [localLiked, setLocalLiked] = useState(isLiked)
  const [commentsCount, setCommentsCount] = useState(
    story.totalComments ?? story.comments ?? 0
  )
  const [repostCount, setRepostCount] = useState(68)
  const [isReposted, setIsReposted] = useState(false)
  const [isFollowing, setIsFollowing] = useState(false)
  const [isPending, setIsPending] = useState(false)
  const [isMutualFriend, setIsMutualFriend] = useState(false)
  const [isCheckingFriendship, setIsCheckingFriendship] = useState(true)

  // Resolve current logged-in user details with localStorage fallback
  const effectiveUser = React.useMemo(() => {
    if (currentUser?.id || currentUser?.username) return currentUser
    try {
      const stored = localStorage.getItem('lumina_user')
      if (stored) return JSON.parse(stored)
    } catch {
      // ignore
    }
    return currentUser
  }, [currentUser])

  // Check if viewing own post
  const isSelf = React.useMemo(() => {
    if (!effectiveUser) return false
    const myId = effectiveUser.id
    const myUser = (effectiveUser.username || '').replace(/^@/, '').toLowerCase().trim()
    const myName = (effectiveUser.name || '').toLowerCase().trim()
    const myEmailUser = (effectiveUser as any).email ? (effectiveUser as any).email.split('@')[0].toLowerCase().trim() : ''

    const authorId = story.authorId
    const authorUser = (story.authorUsername || story.authorName || '').replace(/^@/, '').toLowerCase().trim()
    const authorName = (story.authorName || '').toLowerCase().trim()

    if (myId && authorId && myId === authorId) return true
    if (myUser && authorUser && myUser === authorUser) return true
    if (myName && authorName && myName === authorName) return true
    if (myEmailUser && authorUser && myEmailUser === authorUser) return true
    return false
  }, [effectiveUser, story.authorId, story.authorUsername, story.authorName])

  // Sync friendship & follow state with backend
  useEffect(() => {
    let mounted = true

    if (isSelf) {
      setIsMutualFriend(true)
      setIsCheckingFriendship(false)
      return
    }

    const checkStatus = async () => {
      try {
        setIsCheckingFriendship(true)

        // 1. Fetch user's accepted friends to check if they are already mutual friends
        const friendsRes = await fetchMyFriendsApi()
        if (!mounted) return

        if (friendsRes.success && Array.isArray(friendsRes.data)) {
          const myId = effectiveUser?.id
          const myUser = (effectiveUser?.username || '').replace(/^@/, '').toLowerCase().trim()
          const authorId = story.authorId
          const authorUser = (story.authorUsername || story.authorName || '')
            .replace(/^@/, '')
            .toLowerCase()
            .trim()
          const authorName = (story.authorName || '').toLowerCase().trim()

          const isFriend = friendsRes.data.some((item: any) => {
            if (item.status && item.status !== 'ACCEPTED') return false

            const isSenderMe =
              (myId && (item.sender?.id === myId || item.senderId === myId)) ||
              (myUser && item.sender?.username?.replace(/^@/, '').toLowerCase().trim() === myUser)

            const other = isSenderMe ? item.receiver : item.sender
            const otherId = other?.id || (isSenderMe ? item.receiverId : item.senderId)
            const otherUser = (other?.username || other?.profile?.username || '')
              .replace(/^@/, '')
              .toLowerCase()
              .trim()
            const otherName = (other?.name || other?.profile?.name || '')
              .toLowerCase()
              .trim()

            if (authorId && otherId && authorId === otherId) return true
            if (authorUser && otherUser && authorUser === otherUser) return true
            if (authorName && otherName && authorName === otherName) return true
            if (authorUser && otherName && authorUser === otherName) return true
            if (authorName && otherUser && authorName === otherUser) return true

            // Fallback: direct check on both sender and receiver
            const sId = item.sender?.id || item.senderId
            const rId = item.receiver?.id || item.receiverId
            const sUser = (item.sender?.username || item.sender?.profile?.username || '').replace(/^@/, '').toLowerCase().trim()
            const rUser = (item.receiver?.username || item.receiver?.profile?.username || '').replace(/^@/, '').toLowerCase().trim()
            const sName = (item.sender?.name || item.sender?.profile?.name || '').toLowerCase().trim()
            const rName = (item.receiver?.name || item.receiver?.profile?.name || '').toLowerCase().trim()

            if (myId) {
              if (sId === myId) {
                if (authorId && rId === authorId) return true
                if (authorUser && (rUser === authorUser || rName === authorUser)) return true
                if (authorName && (rUser === authorName || rName === authorName)) return true
              }
              if (rId === myId) {
                if (authorId && sId === authorId) return true
                if (authorUser && (sUser === authorUser || sName === authorUser)) return true
                if (authorName && (sUser === authorName || sName === authorName)) return true
              }
            } else {
              if (authorId && (sId === authorId || rId === authorId)) return true
              if (authorUser && (sUser === authorUser || rUser === authorUser)) return true
              if (authorName && (sUser === authorName || rUser === authorName)) return true
            }

            return false
          })

          if (isFriend) {
            setIsMutualFriend(true)
            setIsPending(false)
            setIsFollowing(false)
            setIsCheckingFriendship(false)
            return
          }
        }

        // 2. Check if there's an outgoing pending request
        const outgoingRes = await fetchOutgoingRequestsApi()
        if (!mounted) return

        if (outgoingRes.success && Array.isArray(outgoingRes.data)) {
          const authorId = story.authorId
          const authorUser = (story.authorUsername || story.authorName || '')
            .replace(/^@/, '')
            .toLowerCase()
            .trim()

          const hasPending = outgoingRes.data.some((r: any) => {
            if (r.status !== 'PENDING') return false
            if (authorId && r.receiverId === authorId) return true
            const recUser = (r.receiver?.username || '').replace(/^@/, '').toLowerCase().trim()
            if (authorUser && recUser && authorUser === recUser) return true
            return false
          })

          if (hasPending) {
            setIsPending(true)
          } else {
            setIsPending(false)
          }
        }
      } catch (err) {
        console.error('Error syncing friendship status in BlogReaderView:', err)
      } finally {
        if (mounted) {
          setIsCheckingFriendship(false)
        }
      }
    }

    void checkStatus()

    return () => {
      mounted = false
    }
  }, [story.authorId, story.authorUsername, story.authorName, effectiveUser?.id, effectiveUser?.username, isSelf])

  const handleToggleFollow = async () => {
    if (isPending || isFollowing) {
      setIsPending(false)
      setIsFollowing(false)
      if (story.authorId) {
        try {
          await cancelFriendRequestApi(story.authorId)
        } catch {
          // ignore
        }
      }
    } else {
      setIsPending(true)
      if (story.authorId) {
        try {
          const res = await sendFriendRequestApi(story.authorId)
          if (!res.success) {
            if (res.error && /already/i.test(res.error)) {
              // They are already friends (mutual friends)! Don't show button
              setIsMutualFriend(true)
              setIsFollowing(false)
              setIsPending(false)
            } else if (res.error && /exists/i.test(res.error)) {
              setIsPending(true)
            }
          }
        } catch {
          // ignore
        }
      }
    }
  }

  const authorDisplayName =
    story.authorName ||
    (story.authorUsername ? `@${story.authorUsername.replace(/^@/, '')}` : 'Matt Lillywhite')
  const authorFirstName = story.authorName
    ? story.authorName.split(' ')[0]
    : story.authorUsername
    ? `@${story.authorUsername.replace(/^@/, '')}`
    : 'Matt'

  const scrollToComments = () => {
    const el = document.getElementById('comments-section')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  // Keep localLiked in sync when parent prop changes
  useEffect(() => {
    setLocalLiked(isLiked)
  }, [isLiked])

  // Keep like count in sync with story prop
  useEffect(() => {
    setLikeCount(story.likes || 0)
  }, [story.likes, story.id])

  // Keep comments count in sync with story prop
  useEffect(() => {
    setCommentsCount(story.totalComments ?? story.comments ?? 0)
  }, [story.totalComments, story.comments, story.id])

  // If instructed to jump to comments initially
  useEffect(() => {
    if (initialOpenComments) {
      setTimeout(() => {
        scrollToComments()
      }, 150)
    }
  }, [initialOpenComments])

  // Scroll to top on open
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [story.id])

  // Key listener for Escape to return to feed
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onBack()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onBack])

  const handleLikeClick = async () => {
    if (localLiked) {
      setLikeCount((prev) => Math.max(0, prev - 1))
      setLocalLiked(false)
    } else {
      setLikeCount((prev) => prev + 1)
      setLocalLiked(true)
    }
    if (onLike) {
      onLike(story.id)
    } else {
      void togglePostLikeApi(story.id)
    }
  }

  const handleShareClick = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: story.title,
          text: story.description || `Read "${story.title}" on Lumina Campus Network`,
          url: window.location.href,
        })
        return
      } catch {
        // Fallback to clipboard
      }
    }
    try {
      await navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 2200)
    } catch {
      alert('Link copied to clipboard!')
    }
  }

  const handleCommentCreated = (newCount: number) => {
    setCommentsCount(newCount)
    if (onCommentAdded) {
      onCommentAdded(story.id, newCount)
    }
  }

  // Safely parse blocks
  const parsedBlocks: any[] = React.useMemo(() => {
    if (!story.blocks) return []
    if (Array.isArray(story.blocks)) return story.blocks
    if (typeof story.blocks === 'string') {
      try {
        const parsed = JSON.parse(story.blocks)
        return Array.isArray(parsed) ? parsed : []
      } catch {
        return []
      }
    }
    return []
  }, [story.blocks])

  const hasBlocks = parsedBlocks.length > 0
  const isSeedPost = typeof story.id === 'string' && story.id.startsWith('post_seed')
  const isThielStory = isSeedPost && story.title.toLowerCase().includes('thiel')

  // Check if any text blocks exist
  const hasTextBlocks = parsedBlocks.some(
    (b) =>
      ['paragraph', 'heading', 'heading-1', 'heading-2', 'heading-3', 'heading-4', 'h1', 'h2', 'h3', 'h4', 'quote', 'blockquote', 'code'].includes(b?.type) &&
      typeof b?.content === 'string' &&
      b.content.trim().length > 0
  )

  return (
    <div className="lumina-blog-reader-page dark">
      {/* 1. Clean Top Navigation Header */}
      <header className="reader-top-bar">
        <div className="reader-top-bar-inner">
          <div className="reader-top-left">
            <button
              type="button"
              className="reader-back-btn"
              onClick={onBack}
              title="Return to feed"
            >
              <ArrowLeft size={16} strokeWidth={2} />
              <span>Back to feed</span>
            </button>
          </div>

          <div className="reader-top-right">
            <button
              type="button"
              className={`reader-icon-btn ${localLiked ? 'is-active is-liked' : ''}`}
              onClick={handleLikeClick}
              title="Like this blog"
            >
              <Heart
                size={16}
                fill={localLiked ? 'currentColor' : 'none'}
                color="currentColor"
                strokeWidth={2}
                className={`ai-heart-icon ${localLiked ? 'is-liked' : ''}`}
              />
              <span>{likeCount}</span>
            </button>

            <button
              type="button"
              className="reader-icon-btn"
              onClick={scrollToComments}
              title="Responses"
            >
              <MessageSquare size={15} strokeWidth={2} />
              <span>{commentsCount}</span>
            </button>

            <button
              type="button"
              className="reader-icon-btn"
              onClick={handleShareClick}
              title="Share article"
            >
              {copied ? <Check size={15} strokeWidth={2.5} /> : <Share2 size={15} strokeWidth={2} />}
              <span>{copied ? 'Copied!' : 'Share'}</span>
            </button>

            <button
              type="button"
              className={`reader-icon-btn reader-save-btn ${isSaved ? 'is-saved' : ''}`}
              onClick={() => onToggleSave && onToggleSave(story.id)}
              title={isSaved ? 'Remove from bookmarks' : 'Save bookmark'}
            >
              <Bookmark size={16} fill={isSaved ? 'currentColor' : 'none'} strokeWidth={2} />
            </button>
          </div>
        </div>
      </header>

      {/* 2. Document Canvas Sheet */}
      <main className="reader-document-canvas">
        <article className="reader-document-sheet">

          {/* Announcement Pill if applicable */}
          {story.isAnnouncement && (
            <div className="reader-announcement-pill">
              Campus Announcement
            </div>
          )}

          {/* Title */}
          <h1 className="reader-title">{story.title}</h1>

          {/* Subtitle / Excerpt */}
          {story.description && (
            <p className="reader-subtitle">{story.description}</p>
          )}

          {/* Author Meta Row */}
          <div className="reader-author-row">
            <div className="reader-author-info">
              <img
                src={story.authorAvatar || DEFAULT_WHATSAPP_AVATAR}
                alt={story.authorName}
                className="reader-author-avatar"
                onError={(e) => {
                  ;(e.target as HTMLImageElement).src = DEFAULT_WHATSAPP_AVATAR
                }}
              />
              <div className="reader-author-text">
                <div className="reader-author-name-line">
                  <span className="reader-author-name">
                    {story.authorUsername
                      ? `@${story.authorUsername.replace(/^@/, '')}`
                      : (story.authorName || 'Student')}
                  </span>
                </div>
                <div className="reader-post-meta-sub">
                  <span>{story.date}</span>
                  <span className="reader-dot">·</span>
                  <span>4 min read</span>
                </div>
              </div>
            </div>

            {/* In-header Actions */}
            <div className="reader-inline-actions">
              <button
                type="button"
                className={`reader-pill-btn ${localLiked ? 'is-liked' : ''}`}
                onClick={handleLikeClick}
              >
                <Heart
                  size={16}
                  fill={localLiked ? 'currentColor' : 'none'}
                  color="currentColor"
                  strokeWidth={2}
                  className={`ai-heart-icon ${localLiked ? 'is-liked' : ''}`}
                />
                <span>{likeCount}</span>
              </button>
              <button
                type="button"
                className="reader-pill-btn"
                onClick={scrollToComments}
                title="Responses"
              >
                <MessageSquare size={15} strokeWidth={2} />
                <span>{commentsCount}</span>
              </button>
            </div>
          </div>

          <div className="reader-divider" />

          {/* Article Body Content Stream */}
          <div className="reader-body-content">
            {hasBlocks ? (
              <>
                {parsedBlocks.map((block: any, idx: number) => {
                  if (!block) return null

                  // Headings
                  if (
                    block.type === 'heading-1' ||
                    block.type === 'h1' ||
                    (block.type === 'heading' && block.styles?.level === 1)
                  ) {
                    return (
                      <h2 key={block.id || idx} className="reader-h1">
                        {block.content}
                      </h2>
                    )
                  }
                  if (
                    block.type === 'heading-2' ||
                    block.type === 'h2' ||
                    (block.type === 'heading' && block.styles?.level === 2)
                  ) {
                    return (
                      <h3 key={block.id || idx} className="reader-h2">
                        {block.content}
                      </h3>
                    )
                  }
                  if (
                    block.type === 'heading-3' ||
                    block.type === 'h3' ||
                    (block.type === 'heading' && block.styles?.level === 3)
                  ) {
                    return (
                      <h4 key={block.id || idx} className="reader-h3">
                        {block.content}
                      </h4>
                    )
                  }
                  if (
                    block.type === 'heading-4' ||
                    block.type === 'h4' ||
                    (block.type === 'heading' && block.styles?.level === 4) ||
                    block.type === 'heading'
                  ) {
                    return (
                      <h5 key={block.id || idx} className="reader-h4">
                        {block.content}
                      </h5>
                    )
                  }

                  // Images & Unsplash Blocks
                  if (block.type === 'image' || block.type === 'unsplash') {
                    let imageUrl =
                      block.metadata?.url ||
                      block.metadata?.publicUrl ||
                      (typeof block.content === 'string' && block.content.startsWith('http')
                        ? block.content
                        : '')

                    // Resolve from story.media if direct URL is not in metadata
                    if (!imageUrl && story.media && story.media.length > 0) {
                      const matched = story.media.find(
                        (m) =>
                          (block.metadata?.mediaId &&
                            (m.id === block.metadata.mediaId || m.key === block.metadata.mediaId)) ||
                          (block.metadata?.key && m.key === block.metadata.key)
                      )
                      if (matched?.url) {
                        imageUrl = matched.url
                      }
                    }

                    if (!imageUrl) return null

                    const caption = block.metadata?.caption || ''
                    const width = block.styles?.width ? String(block.styles.width) : '100%'
                    const alignment = block.styles?.textAlign || 'center'

                    return (
                      <figure
                        key={block.id || idx}
                        className="reader-image-figure"
                        style={{ textAlign: alignment as any }}
                      >
                        <div
                          className="reader-image-wrap"
                          style={{ width: width === '100%' ? '100%' : width, maxWidth: '100%' }}
                        >
                          <img
                            src={imageUrl}
                            alt={caption || story.title || 'Post image'}
                            className="reader-block-img"
                            loading="lazy"
                            onError={(e) => {
                              const parent = (e.currentTarget as HTMLElement).closest('figure')
                              if (parent) parent.style.display = 'none'
                            }}
                          />
                          {caption && (
                            <figcaption className="reader-image-caption">
                              {caption}
                            </figcaption>
                          )}
                        </div>
                      </figure>
                    )
                  }

                  // Video Blocks
                  if (block.type === 'video') {
                    let videoUrl =
                      block.metadata?.url ||
                      (typeof block.content === 'string' && block.content.startsWith('http')
                        ? block.content
                        : '')

                    if (!videoUrl && story.media) {
                      const matched = story.media.find(
                        (m) =>
                          m.type === 'VIDEO' ||
                          m.key === block.metadata?.key ||
                          (block.metadata?.mediaId && m.id === block.metadata.mediaId)
                      )
                      if (matched?.url) videoUrl = matched.url
                    }

                    if (!videoUrl) return null
                    const caption = block.metadata?.caption || ''
                    const parsed = parseVideoUrl(videoUrl)
                    const isIframeVideo = parsed.type !== 'html5' && parsed.type !== 'generic'

                    return (
                      <figure key={block.id || idx} className="reader-video-wrap">
                        <div className="reader-video-container">
                          {isIframeVideo ? (
                            <iframe
                              src={parsed.embedUrl}
                              title={caption || story.title || 'Embedded video'}
                              className="reader-block-iframe"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                              allowFullScreen
                              loading="lazy"
                            />
                          ) : (
                            <video
                              src={parsed.embedUrl || videoUrl}
                              controls
                              playsInline
                              preload="metadata"
                              className="reader-block-video"
                            />
                          )}
                        </div>
                        {caption && (
                          <figcaption className="reader-image-caption">
                            {caption}
                          </figcaption>
                        )}
                      </figure>
                    )
                  }

                  // Embed Blocks
                  if (block.type === 'embed') {
                    const embedUrl =
                      block.metadata?.url ||
                      (typeof block.content === 'string' && block.content.startsWith('http')
                        ? block.content
                        : '')

                    if (!embedUrl) return null
                    const caption = block.metadata?.caption || ''
                    const provider = getEmbedProvider(embedUrl)
                    const parsedData = provider ? provider.parse(embedUrl) : null

                    return (
                      <figure key={block.id || idx} className="reader-embed-wrap">
                        <div className="reader-embed-inner">
                          {provider && parsedData ? (
                            provider.render(parsedData, embedUrl)
                          ) : (
                            renderFallbackPreviewCard(
                              embedUrl,
                              block.metadata?.title,
                              block.metadata?.description
                            )
                          )}
                        </div>
                        {caption && (
                          <figcaption className="reader-image-caption">
                            {caption}
                          </figcaption>
                        )}
                      </figure>
                    )
                  }

                  // Quote / Blockquote
                  if (block.type === 'quote' || block.type === 'blockquote') {
                    return (
                      <blockquote key={block.id || idx} className="reader-quote">
                        {block.content}
                      </blockquote>
                    )
                  }

                  // Code
                  if (block.type === 'code') {
                    return (
                      <pre key={block.id || idx} className="reader-code">
                        <code>{block.content}</code>
                      </pre>
                    )
                  }

                  // Divider
                  if (block.type === 'divider') {
                    return <hr key={block.id || idx} className="reader-block-divider" />
                  }

                  // Callout
                  if (block.type === 'callout') {
                    return (
                      <div key={block.id || idx} className="reader-callout">
                        <span className="reader-callout-icon">💡</span>
                        <div className="reader-callout-text">{block.content}</div>
                      </div>
                    )
                  }

                  // Bullet List
                  if (
                    block.type === 'bullet-list' ||
                    block.type === 'bullet' ||
                    block.type === 'ul'
                  ) {
                    return (
                      <ul key={block.id || idx} className="reader-list">
                        <li>{block.content}</li>
                      </ul>
                    )
                  }

                  // Numbered List
                  if (
                    block.type === 'number-list' ||
                    block.type === 'numbered' ||
                    block.type === 'ol'
                  ) {
                    return (
                      <ol key={block.id || idx} className="reader-list reader-numbered-list">
                        <li>{block.content}</li>
                      </ol>
                    )
                  }

                  // Checklist
                  if (block.type === 'checklist') {
                    return (
                      <div key={block.id || idx} className="reader-checklist-item">
                        <input
                          type="checkbox"
                          checked={Boolean(block.metadata?.checked)}
                          readOnly
                        />
                        <span>{block.content}</span>
                      </div>
                    )
                  }

                  // Paragraph / Default text block
                  if (!block.content || !block.content.trim()) {
                    return null
                  }

                  if (/<[a-z][\s\S]*>/i.test(block.content)) {
                    return (
                      <p
                        key={block.id || idx}
                        className="reader-p"
                        dangerouslySetInnerHTML={{ __html: block.content }}
                      />
                    )
                  }

                  return (
                    <p key={block.id || idx} className="reader-p">
                      {block.content}
                    </p>
                  )
                })}

                {/* If post has separate text content not in blocks, render it */}
                {story.content &&
                  story.content.trim() !== story.description?.trim() &&
                  !hasTextBlocks && (
                    <div className="reader-extra-content">
                      {story.content.split('\n\n').map((paragraph, index) => (
                        <p key={index} className="reader-p">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  )}
              </>
            ) : isThielStory ? (
              <>
                <p className="reader-p">
                  In 2011, Peter Thiel announced a controversial experiment: offer twenty promising students under the age of twenty-two $100,000 each over two years on one strict condition—drop out of college and build a venture.
                </p>
                <p className="reader-p">
                  At the time, traditional academia dismissed the initiative as reckless. Critics argued that leaving university jeopardized foundational credentials and social capital. Over a decade later, the fellowship's alumni have created more than $200 billion in enterprise value.
                </p>

                <h2 className="reader-h1">The High-Impact Fellowship Alumni</h2>
                <ul className="reader-list">
                  <li>
                    <strong>Vitalik Buterin (Fellowship Class of 2014)</strong>: Left university to build Ethereum, pioneering smart contracts and programmable decentralized infrastructure worldwide.
                  </li>
                  <li>
                    <strong>Dylan Field (Class of 2012)</strong>: Dropped out of Brown University to architect Figma, completely redefining web-first design and collaborative software workflows.
                  </li>
                  <li>
                    <strong>Ritesh Agarwal (Class of 2013)</strong>: Scaled OYO Rooms from a modest regional aggregation into one of the largest hospitality networks across India, Southeast Asia, and the globe.
                  </li>
                  <li>
                    <strong>Alexandr Wang</strong>: Co-founded Scale AI, establishing the foundational data infrastructure powering modern frontier artificial intelligence systems.
                  </li>
                </ul>

                <h2 className="reader-h1">Lessons for the Next Generation of Builders</h2>
                <p className="reader-p">
                  The Thiel Fellowship demonstrated that age is not a determinant of execution capability. In modern computing, AI development, and software engineering, tools are democratized, feedback loops are instantaneous, and the cost of experimentation has collapsed.
                </p>
                <p className="reader-p">
                  For students across campus communities today, the lesson is clear: do not wait for permission to build. Ship early, iterate with velocity, and align with collaborators who share your ambition.
                </p>
              </>
            ) : story.content ? (
              story.content.split('\n\n').map((paragraph, index) => (
                <p key={index} className="reader-p">
                  {paragraph}
                </p>
              ))
            ) : (
              <p className="reader-p">
                {story.description || 'Welcome to this campus blog story on Lumina. Connect with fellow students, share your thoughts in the responses, and explore more articles across the college community.'}
              </p>
            )}
          </div>

          {/* Topics / Hashtags */}
          {story.topics && story.topics.length > 0 && (
            <div className="reader-topics-row">
              {story.topics.map((t) => (
                <span key={t} className="reader-topic-tag">
                  #{t}
                </span>
              ))}
            </div>
          )}

          {/* Article Action Bar */}
          <div className="reader-article-action-bar">
            <div className="reader-action-bar-left">
              <button
                type="button"
                className={`reader-toolbar-stat-btn ${localLiked ? 'is-active is-liked' : ''}`}
                onClick={handleLikeClick}
                title={localLiked ? 'Unlike' : 'Like'}
              >
                <Heart
                  size={18}
                  fill={localLiked ? 'currentColor' : 'none'}
                  color="currentColor"
                  strokeWidth={2}
                  className={`ai-heart-icon ${localLiked ? 'is-liked' : ''}`}
                />
                <span>{formatNumber(likeCount)}</span>
              </button>

              <button
                type="button"
                className="reader-toolbar-stat-btn"
                onClick={scrollToComments}
                title="Responses"
              >
                <MessageSquare size={17} strokeWidth={1.8} />
                <span>{commentsCount}</span>
              </button>

              <button
                type="button"
                className={`reader-toolbar-stat-btn ${isReposted ? 'is-active' : ''}`}
                onClick={() => {
                  setIsReposted((prev) => !prev)
                  setRepostCount((prev) => (isReposted ? prev - 1 : prev + 1))
                }}
                title="Repost"
              >
                <Repeat size={16} strokeWidth={2} />
                <span>{repostCount}</span>
              </button>
            </div>

            <div className="reader-action-bar-right">
              <button
                type="button"
                className={`reader-toolbar-icon-btn ${isSaved ? 'is-saved' : ''}`}
                onClick={() => onToggleSave && onToggleSave(story.id)}
                title={isSaved ? 'Remove from bookmarks' : 'Save story'}
              >
                <Bookmark size={18} fill={isSaved ? 'currentColor' : 'none'} strokeWidth={1.8} />
              </button>

              <button
                type="button"
                className="reader-toolbar-icon-btn"
                onClick={handleShareClick}
                title="Share article"
              >
                {copied ? <Check size={18} strokeWidth={2.5} /> : <Share2 size={18} strokeWidth={1.8} />}
              </button>

              <button
                type="button"
                className="reader-toolbar-icon-btn"
                onClick={() => alert('Article options')}
                title="More options"
              >
                <MoreHorizontal size={18} strokeWidth={2} />
              </button>
            </div>
          </div>

          {/* Author Profile Card matching reference */}
          <div className="reader-medium-author-card">
            <div className="reader-author-avatar-wrap">
              <img
                src={story.authorAvatar || DEFAULT_WHATSAPP_AVATAR}
                alt={authorDisplayName}
                className="reader-author-card-avatar"
                onError={(e) => {
                  ;(e.target as HTMLImageElement).src = DEFAULT_WHATSAPP_AVATAR
                }}
              />
              <span className="reader-author-avatar-badge" title="Verified Creator">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </span>
            </div>

            <h3 className="reader-author-card-title">Written by {authorDisplayName}</h3>

            <p className="reader-author-card-bio">
              Hi, I'm {authorFirstName}. Welcome to my corner on Lumina where I share campus perspectives, research notes, and stories. Explore more articles across our college community.
            </p>

            {/* If they are mutual friends or viewing own story, do not show follow/pending button */}
            {!isCheckingFriendship && !isMutualFriend && !isSelf && (
              <button
                type="button"
                className={`reader-author-follow-btn ${isFollowing || isPending ? 'is-following' : ''}`}
                onClick={handleToggleFollow}
              >
                {isFollowing ? 'Following' : isPending ? 'Pending' : 'Follow'}
              </button>
            )}
          </div>

          {/* In-page Comments Section */}
          <CommentsSection
            postId={story.id}
            postTitle={story.title}
            postAuthorId={story.authorId}
            initialCount={commentsCount}
            currentUser={currentUser}
            onCommentAdded={handleCommentCreated}
            theme={theme}
          />
        </article>
      </main>
    </div>
  )
}

export default BlogReaderView
