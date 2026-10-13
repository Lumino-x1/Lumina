import React, { useEffect, useState } from 'react'
import { type FeedStory, togglePostLikeApi } from './api/feedApi'
import { CommentsDrawer } from './components/CommentsDrawer'
import { DEFAULT_WHATSAPP_AVATAR } from './components/WhatsAppDefaultAvatar'
import { useTheme } from './lib/themeContext'
import { ThemeToggleButton3 } from './components/ThemeToggle'
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
  } | null
  onCommentAdded?: (storyId: string, newCount?: number) => void
}

// Icons for the Reader view
const ReaderIcons = {
  ArrowLeft: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="19" y1="12" x2="5" y2="12" />
      <polyline points="12 19 5 12 12 5" />
    </svg>
  ),
  ThumbsUp: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3z" />
      <path d="M7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
    </svg>
  ),
  ThumbsUpFilled: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3z" />
      <path d="M7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
    </svg>
  ),
  ChatBubble: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
  ),
  Bookmark: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
    </svg>
  ),
  BookmarkFilled: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="#ffffff" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
    </svg>
  ),
  Share: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
    </svg>
  ),
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
  const { theme, toggleTheme } = useTheme()
  const [copied, setCopied] = useState(false)
  const [likeCount, setLikeCount] = useState(story.likes || 0)
  const [localLiked, setLocalLiked] = useState(isLiked)
  const [commentsCount, setCommentsCount] = useState(
    story.totalComments ?? story.comments ?? 0
  )
  const [isCommentsOpen, setIsCommentsOpen] = useState(Boolean(initialOpenComments))

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

  // If instructed to open comments initially (e.g. user clicked comment button on feed card)
  useEffect(() => {
    if (initialOpenComments) {
      setIsCommentsOpen(true)
    }
  }, [initialOpenComments])

  // Scroll to top on open
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [story.id])

  // Key listener for Escape to return to feed
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !isCommentsOpen) {
        onBack()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onBack, isCommentsOpen])

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

  // Derive topic tags
  const tags =
    story.topics && story.topics.length > 0
      ? story.topics
      : story.category
      ? [story.category, 'Life', 'Campus', 'Insights']
      : ['Productivity', 'Campus', 'Inspiration', 'Technology']

  return (
    <div className={`lumina-blog-reader-page ${theme === 'dark' ? 'dark' : 'light'} ${isCommentsOpen ? 'has-drawer-open' : ''}`}>
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
              {ReaderIcons.ArrowLeft}
              <span>Back to feed</span>
            </button>
          </div>

          <div className="reader-top-right">
            <button
              type="button"
              className={`reader-icon-btn ${localLiked ? 'is-active' : ''}`}
              onClick={handleLikeClick}
              title="Like this blog"
            >
              {localLiked ? ReaderIcons.ThumbsUpFilled : ReaderIcons.ThumbsUp}
              <span>{likeCount}</span>
            </button>

            <button
              type="button"
              className={`reader-icon-btn ${isCommentsOpen ? 'is-active' : ''}`}
              onClick={() => setIsCommentsOpen((prev) => !prev)}
              title="Responses"
            >
              {ReaderIcons.ChatBubble}
              <span>{commentsCount}</span>
            </button>

            <button
              type="button"
              className="reader-icon-btn"
              onClick={handleShareClick}
              title="Share article"
            >
              {ReaderIcons.Share}
              <span>{copied ? 'Copied!' : 'Share'}</span>
            </button>

            <button
              type="button"
              className={`reader-icon-btn ${isSaved ? 'is-active' : ''}`}
              onClick={() => onToggleSave && onToggleSave(story.id)}
              title={isSaved ? 'Remove from bookmarks' : 'Save bookmark'}
            >
              {isSaved ? ReaderIcons.BookmarkFilled : ReaderIcons.Bookmark}
            </button>

            <ThemeToggleButton3 theme={theme} onToggle={toggleTheme} />
          </div>
        </div>
      </header>

      {/* 2. Document Canvas Sheet */}
      <main className="reader-document-canvas">
        <article className="reader-document-sheet">
          {/* Topic tags row (as in Medium / screenshot) */}
          <div className="reader-tags-pill-row">
            {tags.map((tag) => (
              <span key={tag} className="reader-topic-pill">
                {tag} <span className="reader-topic-plus">+</span>
              </span>
            ))}
          </div>

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
                  <span className="reader-author-name">{story.authorName}</span>
                  {story.authorUsername && (
                    <span className="reader-author-username">@{story.authorUsername}</span>
                  )}
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
                {localLiked ? ReaderIcons.ThumbsUpFilled : ReaderIcons.ThumbsUp}
                <span>{likeCount}</span>
              </button>
              <button
                type="button"
                className={`reader-pill-btn ${isCommentsOpen ? 'is-active' : ''}`}
                onClick={() => setIsCommentsOpen((prev) => !prev)}
                title="Responses"
              >
                {ReaderIcons.ChatBubble}
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
                        (m) => m.type === 'VIDEO' || m.key === block.metadata?.key
                      )
                      if (matched?.url) videoUrl = matched.url
                    }

                    if (!videoUrl) return null
                    const caption = block.metadata?.caption || ''

                    return (
                      <figure key={block.id || idx} className="reader-video-wrap">
                        <video src={videoUrl} controls className="reader-block-video" />
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

          {/* Article Footer Card */}
          <div className="reader-article-footer">
            <div className="reader-author-bio-card">
              <img
                src={story.authorAvatar || DEFAULT_WHATSAPP_AVATAR}
                alt={story.authorName}
                className="reader-bio-avatar"
                onError={(e) => {
                  ;(e.target as HTMLImageElement).src = DEFAULT_WHATSAPP_AVATAR
                }}
              />
              <div className="reader-bio-content">
                <h4 className="reader-bio-name">{story.authorName}</h4>
                <p className="reader-bio-desc">
                  Student Creator on Lumina. Sharing insights, technical notes, and campus stories with students and innovators.
                </p>
              </div>
            </div>

            <div className="reader-footer-actions">
              <button
                type="button"
                className={`reader-footer-btn ${localLiked ? 'is-liked' : ''}`}
                onClick={handleLikeClick}
              >
                {localLiked ? ReaderIcons.ThumbsUpFilled : ReaderIcons.ThumbsUp}
                <span>{likeCount} Likes</span>
              </button>

              <button
                type="button"
                className={`reader-footer-btn ${isCommentsOpen ? 'is-active' : ''}`}
                onClick={() => setIsCommentsOpen(true)}
              >
                {ReaderIcons.ChatBubble}
                <span>{commentsCount} Responses</span>
              </button>

              <button
                type="button"
                className="reader-footer-btn"
                onClick={handleShareClick}
              >
                {ReaderIcons.Share}
                <span>Share</span>
              </button>

              <button
                type="button"
                className="reader-footer-btn primary-back-btn"
                onClick={onBack}
              >
                {ReaderIcons.ArrowLeft}
                <span>Return to feed</span>
              </button>
            </div>
          </div>
        </article>
      </main>

      {/* Right Side Window (Responses Drawer) */}
      <CommentsDrawer
        isOpen={isCommentsOpen}
        onClose={() => setIsCommentsOpen(false)}
        postId={story.id}
        postTitle={story.title}
        initialCount={commentsCount}
        currentUser={currentUser}
        onCommentAdded={handleCommentCreated}
      />
    </div>
  )
}

export default BlogReaderView
