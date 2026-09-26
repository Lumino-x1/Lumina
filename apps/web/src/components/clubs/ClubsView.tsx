import React, { useCallback, useEffect, useState } from 'react'

type Member = {
  id: string
  userId: string
  role: string
  user?: { name?: string; username?: string | null }
}
type Club = {
  id: string
  name: string
  description?: string | null
  category?: string | null
  logo?: string | null
  banner?: string | null
  status?: string
  members?: Member[]
  _count?: { members?: number; events?: number }
}
type Post = {
  id: string
  content: string
  isAnnouncement?: boolean
  createdAt?: string
  author?: { name?: string }
}
type Event = {
  id: string
  title: string
  description?: string | null
  startTime?: string
  endTime?: string
  venue?: string | null
}
const BASE = (import.meta as any).env?.VITE_API_BASE_URL || '/api/v1'
async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const r = await fetch(BASE + path, {
    credentials: 'include',
    headers: {
      ...(options.body instanceof FormData ? {} : { 'Content-Type': 'application/json' }),
      ...(options.headers || {}),
    },
    ...options,
  })
  if (!r.ok) throw new Error((await r.text()) || 'Request failed')
  return r.status === 204 ? (undefined as T) : r.json()
}
function data(x: any) {
  return x?.data ?? x
}
export default function ClubsView({ onBackToHome }: { onBackToHome: () => void }) {
  const [clubs, setClubs] = useState<Club[]>([]),
    [active, setActive] = useState<Club | null>(null),
    [members, setMembers] = useState<Member[]>([]),
    [posts, setPosts] = useState<Post[]>([]),
    [events, setEvents] = useState<Event[]>([]),
    [analytics, setAnalytics] = useState<any>(null),
    [loading, setLoading] = useState(true),
    [error, setError] = useState(''),
    [tab, setTab] = useState<'feed' | 'events' | 'members' | 'analytics'>('feed'),
    [name, setName] = useState(''),
    [description, setDescription] = useState(''),
    [category, setCategory] = useState(''),
    [searchQuery, setSearchQuery] = useState(''),
    [post, setPost] = useState(''),
    [announcement, setAnnouncement] = useState(false),
    [eventTitle, setEventTitle] = useState(''),
    [eventVenue, setEventVenue] = useState(''),
    [eventStart, setEventStart] = useState(''),
    [busy, setBusy] = useState(false)
  const loadClubs = useCallback(async () => {
    setLoading(true)
    try {
      const r = data(await request<any>('/clubs'))
      const list = Array.isArray(r) ? r : (r.clubs ?? r.items ?? [])
      setClubs(list)
      if (!active && list[0]) setActive(list[0])
    } catch (e: any) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }, [active])
  useEffect(() => {
    void loadClubs()
  }, [])
  const loadDetail = useCallback(async (id: string) => {
    try {
      const [c, m, p, e, a] = await Promise.all([
        request<any>('/clubs/' + id),
        request<any>('/clubs/' + id + '/members'),
        request<any>('/clubs/' + id + '/posts'),
        request<any>('/clubs/' + id + '/events'),
        request<any>('/clubs/' + id + '/analytics'),
      ])
      setActive(data(c))
      const mm = data(m)
      setMembers(Array.isArray(mm) ? mm : (mm.members ?? []))
      const pp = data(p)
      setPosts(Array.isArray(pp) ? pp : (pp.posts ?? []))
      const ee = data(e)
      setEvents(Array.isArray(ee) ? ee : (ee.events ?? []))
      setAnalytics(data(a))
    } catch (e: any) {
      setError(e.message)
    }
  }, [])
  useEffect(() => {
    if (active?.id) void loadDetail(active.id)
  }, [active?.id])
  const createClub = async (e: React.FormEvent) => {
    e.preventDefault()
    setBusy(true)
    try {
      const r = data(
        await request<any>('/clubs', {
          method: 'POST',
          body: JSON.stringify({ name, description, category }),
        })
      )
      setName('')
      setDescription('')
      setCategory('')
      await loadClubs()
      setActive(r)
    } catch (e: any) {
      setError(e.message)
    } finally {
      setBusy(false)
    }
  }
  const editClub = async () => {
    if (!active) return
    const newName = window.prompt('Club name', active.name)
    if (!newName?.trim()) return
    const newDesc = window.prompt('Description', active.description || '')
    try {
      await request('/clubs/' + active.id, {
        method: 'PATCH',
        body: JSON.stringify({ name: newName.trim(), description: newDesc ?? undefined }),
      })
      await loadClubs()
      await loadDetail(active.id)
    } catch (e: any) {
      setError(e.message)
    }
  }
  const archiveClub = async () => {
    if (!active || !confirm('Archive this club?')) return
    try {
      await request('/clubs/' + active.id + '/archive', { method: 'POST' })
      await loadClubs()
      await loadDetail(active.id)
    } catch (e: any) {
      setError(e.message)
    }
  }
  const join = async () => {
    if (!active) return
    setBusy(true)
    try {
      await request('/clubs/' + active.id + '/join', { method: 'POST' })
      await loadDetail(active.id)
    } catch (e: any) {
      setError(e.message)
    } finally {
      setBusy(false)
    }
  }
  const leave = async () => {
    if (!active) return
    setBusy(true)
    try {
      await request('/clubs/' + active.id + '/leave', { method: 'POST' })
      await loadDetail(active.id)
    } catch (e: any) {
      setError(e.message)
    } finally {
      setBusy(false)
    }
  }
  const updateMemberRole = async (userId: string, newRole: string) => {
    if (!active) return
    try {
      await request('/clubs/' + active.id + '/members/' + userId, {
        method: 'PATCH',
        body: JSON.stringify({ role: newRole }),
      })
      await loadDetail(active.id)
    } catch (e: any) {
      setError(e.message)
    }
  }
  const removeMember = async (userId: string) => {
    if (!active || !confirm('Remove this member?')) return
    try {
      await request('/clubs/' + active.id + '/members/' + userId, { method: 'DELETE' })
      await loadDetail(active.id)
    } catch (e: any) {
      setError(e.message)
    }
  }
  const publish = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!active || !post.trim()) return
    setBusy(true)
    try {
      await request('/clubs/' + active.id + '/posts', {
        method: 'POST',
        body: JSON.stringify({ content: post.trim(), isAnnouncement: announcement }),
      })
      setPost('')
      setAnnouncement(false)
      await loadDetail(active.id)
    } catch (e: any) {
      setError(e.message)
    } finally {
      setBusy(false)
    }
  }
  const createEvent = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!active || !eventTitle.trim()) return
    setBusy(true)
    try {
      await request('/clubs/' + active.id + '/events', {
        method: 'POST',
        body: JSON.stringify({
          title: eventTitle,
          venue: eventVenue || undefined,
          startTime: eventStart || undefined,
        }),
      })
      setEventTitle('')
      setEventVenue('')
      setEventStart('')
      await loadDetail(active.id)
    } catch (e: any) {
      setError(e.message)
    } finally {
      setBusy(false)
    }
  }
  const removeEvent = async (id: string) => {
    if (!active || !confirm('Delete this event?')) return
    try {
      await request('/clubs/' + active.id + '/events/' + id, { method: 'DELETE' })
      await loadDetail(active.id)
    } catch (e: any) {
      setError(e.message)
    }
  }
  const upload = async (kind: 'logo' | 'banner', file: File) => {
    if (!active) return
    const fd = new FormData()
    fd.append('image', file)
    try {
      await request('/clubs/' + active.id + '/' + kind, { method: 'POST', body: fd })
      await loadDetail(active.id)
    } catch (e: any) {
      setError(e.message)
    }
  }
  const filteredClubs = clubs.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (c.category && c.category.toLowerCase().includes(searchQuery.toLowerCase()))
  )
  return (
    <div style={s.page}>
      <header style={s.header}>
        <button onClick={onBackToHome}>← Home</button>
        <h1>Campus Clubs</h1>
        <button
          onClick={() => void loadClubs()}
          disabled={loading}
        >
          Refresh
        </button>
      </header>
      <main style={s.main}>
        {error && <div style={s.error}>{error}</div>}
        <section style={s.card}>
          <h2>Create Club</h2>
          <form
            onSubmit={createClub}
            style={s.row}
          >
            <input
              required
              placeholder="Club name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              placeholder="Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
            <input
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <button disabled={busy}>Create</button>
          </form>
        </section>
        <div style={{ marginBottom: 14 }}>
          <input
            type="text"
            placeholder="🔍 Search clubs by name or category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '10px 14px',
              borderRadius: 8,
              background: '#1e293b',
              border: '1px solid #334155',
              color: '#fff',
              fontSize: 14,
            }}
          />
        </div>
        <section style={s.grid}>
          {loading ? (
            <p>Loading clubs…</p>
          ) : filteredClubs.length === 0 ? (
            <p>No clubs matching search.</p>
          ) : (
            filteredClubs.map((c) => (
              <button
                key={c.id}
                onClick={() => setActive(c)}
                style={active?.id === c.id ? s.selected : s.club}
              >
                <strong>{c.name}</strong>
                <small>
                  {c.category || 'Campus club'} · {c._count?.members ?? 0} members
                </small>
              </button>
            ))
          )}
        </section>
        {active && (
          <>
            <section style={s.hero}>
              {active.banner && (
                <img
                  src={active.banner}
                  alt=""
                />
              )}
              <div>
                <h2>{active.name}</h2>
                <p>{active.description}</p>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 10 }}>
                  <button
                    onClick={join}
                    disabled={busy}
                  >
                    Join
                  </button>{' '}
                  <button
                    onClick={leave}
                    disabled={busy}
                  >
                    Leave
                  </button>{' '}
                  <button
                    onClick={editClub}
                    style={{
                      background: '#334155',
                      color: '#fff',
                      border: 'none',
                      borderRadius: 6,
                      padding: '6px 12px',
                      cursor: 'pointer',
                    }}
                  >
                    Edit Club
                  </button>{' '}
                  <button
                    onClick={archiveClub}
                    style={{
                      background: '#451a1a',
                      color: '#fca5a5',
                      border: 'none',
                      borderRadius: 6,
                      padding: '6px 12px',
                      cursor: 'pointer',
                    }}
                  >
                    Archive
                  </button>
                </div>
                <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                  <label>
                    Logo{' '}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        e.target.files?.[0] && void upload('logo', e.target.files[0])
                      }
                    />
                  </label>
                  <label>
                    Banner{' '}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        e.target.files?.[0] && void upload('banner', e.target.files[0])
                      }
                    />
                  </label>
                </div>
              </div>
            </section>
            <nav style={s.tabs}>
              {(['feed', 'events', 'members', 'analytics'] as const).map((x) => (
                <button
                  key={x}
                  onClick={() => setTab(x)}
                  style={tab === x ? s.selectedTab : {}}
                >
                  {x}
                </button>
              ))}
            </nav>
            {tab === 'feed' && (
              <section style={s.card}>
                <form onSubmit={publish}>
                  <textarea
                    value={post}
                    onChange={(e) => setPost(e.target.value)}
                    placeholder="Write a club post…"
                    required
                  />
                  <label>
                    <input
                      type="checkbox"
                      checked={announcement}
                      onChange={(e) => setAnnouncement(e.target.checked)}
                    />{' '}
                    Announcement
                  </label>
                  <button disabled={busy}>Publish</button>
                </form>
                {posts.length === 0 ? (
                  <p>No posts yet.</p>
                ) : (
                  posts.map((p) => (
                    <article
                      key={p.id}
                      style={s.item}
                    >
                      <strong>
                        {p.isAnnouncement ? '📢 ' : ''}
                        {p.author?.name || 'Club member'}
                      </strong>
                      <p>{p.content}</p>
                    </article>
                  ))
                )}
              </section>
            )}
            {tab === 'events' && (
              <section style={s.card}>
                <form
                  onSubmit={createEvent}
                  style={s.row}
                >
                  <input
                    required
                    placeholder="Event title"
                    value={eventTitle}
                    onChange={(e) => setEventTitle(e.target.value)}
                  />
                  <input
                    placeholder="Venue"
                    value={eventVenue}
                    onChange={(e) => setEventVenue(e.target.value)}
                  />
                  <input
                    type="datetime-local"
                    value={eventStart}
                    onChange={(e) => setEventStart(e.target.value)}
                  />
                  <button disabled={busy}>Schedule</button>
                </form>
                {events.map((e) => (
                  <article
                    key={e.id}
                    style={s.item}
                  >
                    <strong>{e.title}</strong>
                    <p>
                      {e.venue} {e.startTime && ' · ' + new Date(e.startTime).toLocaleString()}
                    </p>
                    <button onClick={() => void removeEvent(e.id)}>Delete</button>
                  </article>
                ))}
              </section>
            )}
            {tab === 'members' && (
              <section style={s.card}>
                {members.map((m) => (
                  <div
                    key={m.id}
                    style={{
                      ...s.item,
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      flexWrap: 'wrap',
                      gap: 8,
                    }}
                  >
                    <div>
                      <strong>{m.user?.name || m.user?.username || m.userId}</strong>{' '}
                      <span style={{ fontSize: 12, color: '#818cf8' }}>({m.role})</span>
                    </div>
                    <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                      <select
                        value={m.role}
                        onChange={(e) => void updateMemberRole(m.userId, e.target.value)}
                        style={{
                          background: '#1e293b',
                          color: '#fff',
                          border: '1px solid #334155',
                          borderRadius: 6,
                          padding: '4px 8px',
                          fontSize: 12,
                        }}
                      >
                        <option value="MEMBER">MEMBER</option>
                        <option value="MODERATOR">MODERATOR</option>
                        <option value="LEAD">LEAD</option>
                        <option value="OFFICER">OFFICER</option>
                        <option value="VICE_PRESIDENT">VICE_PRESIDENT</option>
                        <option value="PRESIDENT">PRESIDENT</option>
                      </select>
                      <button
                        onClick={() => void removeMember(m.userId)}
                        style={{
                          background: '#451a1a',
                          color: '#fca5a5',
                          border: 'none',
                          borderRadius: 6,
                          padding: '4px 8px',
                          fontSize: 12,
                          cursor: 'pointer',
                        }}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </section>
            )}
            {tab === 'analytics' && (
              <section style={s.card}>
                <pre style={{ whiteSpace: 'pre-wrap' }}>
                  {JSON.stringify(
                    analytics ?? {
                      members: members.length,
                      posts: posts.length,
                      events: events.length,
                    },
                    null,
                    2
                  )}
                </pre>
              </section>
            )}
          </>
        )}
      </main>
    </div>
  )
}
const s: Record<string, React.CSSProperties> = {
  page: {
    minHeight: '100vh',
    background: '#090d16',
    color: '#f8fafc',
    fontFamily: 'Inter,system-ui',
  },
  header: {
    padding: 20,
    display: 'flex',
    gap: 16,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    borderBottom: '1px solid #334155',
  },
  main: { maxWidth: 1100, margin: 'auto', padding: 20 },
  card: {
    background: '#111827',
    padding: 18,
    borderRadius: 14,
    marginBottom: 16,
    border: '1px solid #334155',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))',
    gap: 12,
    marginBottom: 16,
  },
  club: {
    textAlign: 'left',
    padding: 16,
    borderRadius: 12,
    border: '1px solid #334155',
    background: '#111827',
    color: 'white',
    display: 'grid',
    gap: 8,
  },
  selected: {
    textAlign: 'left',
    padding: 16,
    borderRadius: 12,
    border: '1px solid #818cf8',
    background: '#172033',
    color: 'white',
    display: 'grid',
    gap: 8,
  },
  hero: {
    background: '#111827',
    borderRadius: 14,
    overflow: 'hidden',
    marginBottom: 16,
    padding: 18,
  },
  tabs: { display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16 },
  selectedTab: { background: '#6366f1', color: 'white' },
  row: { display: 'flex', gap: 8, flexWrap: 'wrap' },
  item: { padding: 14, borderBottom: '1px solid #334155' },
  error: {
    background: '#451a1a',
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
    color: '#fecaca',
  },
}
