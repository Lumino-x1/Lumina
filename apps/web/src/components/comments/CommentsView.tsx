import React, { useCallback, useEffect, useMemo, useState } from 'react'

type User = { id?: string; name?: string; username?: string | null; image?: string | null }
type Reaction = { emoji: string; count?: number; userIds?: string[] }
type Comment = {
  id: string
  content: string
  parentId?: string | null
  depth?: number
  isDeleted?: boolean
  isPinned?: boolean
  createdAt?: string
  updatedAt?: string
  user?: User
  author?: User
  reactions?: Reaction[] | Record<string, number>
  replies?: Comment[]
}

const API_BASE = (import.meta as any).env?.VITE_API_BASE_URL || '/api/v1'
const EMOJIS = ['👍', '❤️', '😂', '🎉', '😮']

async function api<T>(path: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(`${API_BASE}${path}`, {
    credentials: 'include',
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    ...options,
  })
  if (!response.ok) throw new Error((await response.text()) || `Request failed: ${response.status}`)
  return response.status === 204 ? (undefined as T) : response.json()
}

function normalize(result: any): { items: Comment[]; nextCursor?: string } {
  const source = result?.data ?? result
  if (Array.isArray(source)) return { items: source }
  return {
    items: source?.comments ?? source?.items ?? [],
    nextCursor: source?.nextCursor ?? result?.nextCursor,
  }
}

function formatDate(value?: string) {
  if (!value) return 'Just now'
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value
  return date.toLocaleString()
}

function reactionEntries(reactions: Comment['reactions']) {
  if (!reactions) return []
  if (Array.isArray(reactions)) return reactions.map((r) => [r.emoji, r.count ?? 0] as const)
  return Object.entries(reactions)
}

export default function CommentsView({ onBackToHome }: { onBackToHome: () => void }) {
  const [postId, setPostId] = useState('')
  const [loadedPostId, setLoadedPostId] = useState('')
  const [comments, setComments] = useState<Comment[]>([])
  const [nextCursor, setNextCursor] = useState<string | undefined>()
  const [content, setContent] = useState('')
  const [replyTo, setReplyTo] = useState<string | null>(null)
  const [editing, setEditing] = useState<string | null>(null)
  const [editContent, setEditContent] = useState('')
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [reporting, setReporting] = useState<string | null>(null)
  const [reportReason, setReportReason] = useState('INAPPROPRIATE')
  const [reportDetails, setReportDetails] = useState('')

  const total = useMemo(() => {
    const count = (items: Comment[]): number =>
      items.reduce((n, c) => n + 1 + count(c.replies || []), 0)
    return count(comments)
  }, [comments])

  const load = useCallback(
    async (cursor?: string) => {
      if (!postId.trim()) return
      setLoading(true)
      setError(null)
      try {
        const query = new URLSearchParams({ limit: '20' })
        if (cursor) query.set('cursor', cursor)
        const result = await api<any>(
          `/comments/posts/${encodeURIComponent(postId.trim())}/comments?${query}`
        )
        const normalized = normalize(result)
        setComments((current) => (cursor ? [...current, ...normalized.items] : normalized.items))
        setNextCursor(normalized.nextCursor)
        setLoadedPostId(postId.trim())
      } catch (e: any) {
        setError(e?.message || 'Unable to load comments')
      } finally {
        setLoading(false)
      }
    },
    [postId]
  )

  useEffect(() => {
    if (!loadedPostId) return
    const timer = window.setInterval(() => {
      void load()
    }, 30000)
    return () => window.clearInterval(timer)
  }, [loadedPostId, load])

  const submit = async (event: React.FormEvent) => {
    event.preventDefault()
    if (!postId.trim() || !content.trim()) return
    setSaving(true)
    setError(null)
    try {
      await api(`/comments/posts/${encodeURIComponent(postId.trim())}/comments`, {
        method: 'POST',
        body: JSON.stringify({
          content: content.trim(),
          ...(replyTo ? { parentId: replyTo } : {}),
        }),
      })
      setContent('')
      setReplyTo(null)
      await load()
    } catch (e: any) {
      setError(e?.message || 'Unable to publish comment')
    } finally {
      setSaving(false)
    }
  }

  const edit = async (id: string) => {
    if (!editContent.trim()) return
    setSaving(true)
    try {
      await api(`/comments/${encodeURIComponent(id)}`, {
        method: 'PATCH',
        body: JSON.stringify({ content: editContent.trim() }),
      })
      setEditing(null)
      setEditContent('')
      await load()
    } catch (e: any) {
      setError(e?.message || 'Unable to edit comment')
    } finally {
      setSaving(false)
    }
  }

  const remove = async (id: string) => {
    if (!window.confirm('Delete this comment? Replies will remain threaded.')) return
    try {
      await api(`/comments/${encodeURIComponent(id)}`, { method: 'DELETE' })
      await load()
    } catch (e: any) {
      setError(e?.message || 'Unable to delete comment')
    }
  }

  const react = async (id: string, emoji: string) => {
    try {
      await api(`/comments/${encodeURIComponent(id)}/reactions`, {
        method: 'POST',
        body: JSON.stringify({ emoji }),
      })
      await load()
    } catch (e: any) {
      setError(e?.message || 'Unable to update reaction')
    }
  }

  const pin = async (id: string) => {
    try {
      await api(`/comments/${encodeURIComponent(id)}/pin`, { method: 'POST' })
      await load()
    } catch (e: any) {
      setError(e?.message || 'Unable to update pin')
    }
  }

  const report = async (id: string) => {
    try {
      await api(`/comments/${encodeURIComponent(id)}/report`, {
        method: 'POST',
        body: JSON.stringify({ reason: reportReason, details: reportDetails || undefined }),
      })
      setReporting(null)
      setReportDetails('')
    } catch (e: any) {
      setError(e?.message || 'Unable to report comment')
    }
  }

  const history = async (id: string) => {
    try {
      const result = await api<any>(`/comments/${encodeURIComponent(id)}/history`)
      const items = result?.data ?? result
      window.alert(
        Array.isArray(items) && items.length
          ? items.map((h: any) => `${formatDate(h.createdAt)}\n${h.content}`).join('\n\n')
          : 'No edit history yet.'
      )
    } catch (e: any) {
      setError(e?.message || 'Unable to load edit history')
    }
  }

  const renderComment = (comment: Comment, nested = false): React.ReactNode => {
    const author: User = comment.user || comment.author || {}
    return (
      <div
        key={comment.id}
        style={{
          marginLeft: nested ? 24 : 0,
          borderLeft: nested ? '2px solid rgba(129,140,248,.25)' : undefined,
          paddingLeft: nested ? 14 : 0,
          marginTop: 14,
        }}
      >
        <article
          style={{
            background: '#111827',
            border: comment.isPinned ? '1px solid #818cf8' : '1px solid rgba(255,255,255,.09)',
            borderRadius: 14,
            padding: 16,
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
            <div>
              <strong>{author.name || author.username || 'Campus member'}</strong>
              <div style={{ color: '#94a3b8', fontSize: 12 }}>
                {author.username ? '@' + author.username + ' · ' : ''}
                {formatDate(comment.createdAt)}
              </div>
            </div>
            {comment.isPinned && <span style={{ color: '#a5b4fc', fontSize: 12 }}>📌 PINNED</span>}
          </div>
          {editing === comment.id ? (
            <>
              <textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                style={styles.textarea}
                rows={3}
              />
              <div style={styles.actions}>
                <button
                  onClick={() => edit(comment.id)}
                  disabled={saving}
                >
                  Save
                </button>
                <button onClick={() => setEditing(null)}>Cancel</button>
              </div>
            </>
          ) : (
            <p
              style={{
                whiteSpace: 'pre-wrap',
                color: comment.isDeleted ? '#94a3b8' : '#e5e7eb',
                fontStyle: comment.isDeleted ? 'italic' : 'normal',
              }}
            >
              {comment.isDeleted ? '[Comment deleted]' : comment.content}
            </p>
          )}
          {!comment.isDeleted && (
            <div style={styles.reactions}>
              {EMOJIS.map((emoji) => (
                <button
                  key={emoji}
                  onClick={() => react(comment.id, emoji)}
                >
                  {emoji} {reactionEntries(comment.reactions).find(([e]) => e === emoji)?.[1] || ''}
                </button>
              ))}
            </div>
          )}
          <div style={styles.actions}>
            {!comment.isDeleted && (
              <button
                onClick={() => {
                  setReplyTo(comment.id)
                  setContent('')
                }}
              >
                Reply
              </button>
            )}
            {!comment.isDeleted && (
              <button
                onClick={() => {
                  setEditing(comment.id)
                  setEditContent(comment.content)
                }}
              >
                Edit
              </button>
            )}
            <button onClick={() => remove(comment.id)}>Delete</button>
            <button onClick={() => pin(comment.id)}>{comment.isPinned ? 'Unpin' : 'Pin'}</button>
            <button onClick={() => history(comment.id)}>History</button>
            <button onClick={() => setReporting(comment.id)}>Report</button>
          </div>
          {reporting === comment.id && (
            <div style={styles.report}>
              <select
                value={reportReason}
                onChange={(e) => setReportReason(e.target.value)}
              >
                <option>INAPPROPRIATE</option>
                <option>HARASSMENT</option>
                <option>SPAM</option>
                <option>HATE</option>
                <option>OTHER</option>
              </select>
              <input
                placeholder="Optional details"
                value={reportDetails}
                onChange={(e) => setReportDetails(e.target.value)}
              />
              <button onClick={() => report(comment.id)}>Submit report</button>
              <button onClick={() => setReporting(null)}>Cancel</button>
            </div>
          )}
        </article>
        {(comment.replies || []).map((reply) => renderComment(reply, true))}
      </div>
    )
  }

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <button onClick={onBackToHome}>← Home</button>
        <div>
          <h1 style={{ margin: 0 }}>Comments</h1>
          <p style={{ margin: '4px 0', color: '#94a3b8' }}>
            Threaded discussions, reactions, mentions, history, moderation and reporting.
          </p>
        </div>
        <span>{total} loaded</span>
      </header>
      <main style={styles.main}>
        <section style={styles.card}>
          <label>Post ID</label>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <input
              value={postId}
              onChange={(e) => setPostId(e.target.value)}
              placeholder="Paste the post ID"
              style={styles.input}
            />
            <button
              onClick={() => {
                setComments([])
                void load()
              }}
              disabled={loading || !postId.trim()}
            >
              {loading ? 'Loading…' : 'Load comments'}
            </button>
          </div>
        </section>
        {error && <div style={styles.error}>{error}</div>}
        <section style={styles.card}>
          <h2>{replyTo ? 'Reply to comment' : 'Join the discussion'}</h2>
          <form onSubmit={submit}>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder={
                replyTo
                  ? 'Write a reply… @username is supported'
                  : 'Write a comment… @username is supported'
              }
              maxLength={2000}
              style={styles.textarea}
              rows={4}
            />
            <div style={styles.actions}>
              {replyTo && (
                <button
                  type="button"
                  onClick={() => setReplyTo(null)}
                >
                  Cancel reply
                </button>
              )}
              <span style={{ color: '#94a3b8', marginRight: 'auto' }}>{content.length}/2000</span>
              <button
                type="submit"
                disabled={saving || !content.trim() || !postId.trim()}
              >
                {saving ? 'Publishing…' : 'Publish'}
              </button>
            </div>
          </form>
        </section>
        <section>
          {comments.length === 0 && loadedPostId && !loading ? (
            <div style={styles.empty}>No comments yet. Start the conversation.</div>
          ) : (
            comments.map((comment) => renderComment(comment))
          )}
          {nextCursor && (
            <button
              onClick={() => void load(nextCursor)}
              disabled={loading}
              style={{ marginTop: 18 }}
            >
              {loading ? 'Loading…' : 'Load more comments'}
            </button>
          )}
        </section>
      </main>
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: '100vh',
    background: '#090d16',
    color: '#f8fafc',
    fontFamily: 'Inter, system-ui, sans-serif',
  },
  header: {
    padding: 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 16,
    borderBottom: '1px solid rgba(255,255,255,.1)',
    flexWrap: 'wrap',
  },
  main: { maxWidth: 900, margin: '0 auto', padding: 20 },
  card: {
    background: '#111827',
    border: '1px solid rgba(255,255,255,.1)',
    borderRadius: 16,
    padding: 18,
    marginBottom: 16,
  },
  input: {
    flex: 1,
    minWidth: 220,
    padding: 12,
    borderRadius: 9,
    border: '1px solid #334155',
    background: '#0b1220',
    color: 'white',
  },
  textarea: {
    width: '100%',
    boxSizing: 'border-box',
    padding: 12,
    borderRadius: 9,
    border: '1px solid #334155',
    background: '#0b1220',
    color: 'white',
    resize: 'vertical',
  },
  actions: { display: 'flex', gap: 8, alignItems: 'center', marginTop: 10, flexWrap: 'wrap' },
  reactions: { display: 'flex', gap: 6, marginTop: 10, flexWrap: 'wrap' },
  report: { display: 'flex', gap: 8, marginTop: 12, flexWrap: 'wrap' },
  error: {
    background: 'rgba(239,68,68,.12)',
    color: '#fecaca',
    border: '1px solid rgba(239,68,68,.35)',
    borderRadius: 10,
    padding: 12,
    marginBottom: 16,
  },
  empty: {
    textAlign: 'center',
    color: '#94a3b8',
    padding: 32,
    border: '1px dashed #334155',
    borderRadius: 14,
  },
}
