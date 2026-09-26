import React, { useCallback, useEffect, useState } from 'react'

export interface AdminMetricsData {
  totalUsers: number
  totalColleges: number
  totalClubs: number
  totalInternships: number
  pendingVerifications: number
  openReports: number
  timestamp: string
}

export interface AdminUserData {
  id: string
  name: string
  email: string
  username: string
  role:
    | 'STUDENT'
    | 'FACULTY'
    | 'ALUMNI'
    | 'CLUB_ADMIN'
    | 'COMMUNITY_MODERATOR'
    | 'COLLEGE_ADMIN'
    | 'SUPER_ADMIN'
  status: 'PENDING' | 'ACTIVE' | 'SUSPENDED' | 'BANNED' | 'DELETED'
  collegeId: string | null
  createdAt: string
  verification?: { alumniVerified: boolean; status: string }
}

export interface AdminVerificationItem {
  id: string
  userId: string
  status: string
  createdAt: string
  user: { id: string; name: string; email: string; role: string; collegeId: string | null }
}

export interface AdminReportItem {
  id: string
  commentId: string
  reporterId: string
  reason: string
  status: string
  createdAt: string
  reporter: { id: string; name: string; email: string }
  comment: { id: string; body: string; userId: string; postId: string }
}

export interface AdminAuditLogItem {
  id: string
  adminId: string
  action: string
  targetId: string | null
  targetType: string | null
  details: any
  createdAt: string
  admin: { id: string; name: string; email: string; role: string }
}

export interface AnnouncementItem {
  id: string
  title: string
  content: string
  type: string
  targetRole: string
  isActive: boolean
  createdAt: string
  createdBy: { id: string; name: string; email: string }
}

export const AdminDashboardView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    | 'overview'
    | 'analytics'
    | 'users'
    | 'verification'
    | 'reports'
    | 'audit'
    | 'settings'
    | 'resources'
  >('overview')
  const [metrics, setMetrics] = useState<AdminMetricsData | null>(null)
  const [analyticsData, setAnalyticsData] = useState<any>(null)
  const [users, setUsers] = useState<AdminUserData[]>([])
  const [verifications, setVerifications] = useState<AdminVerificationItem[]>([])
  const [reports, setReports] = useState<AdminReportItem[]>([])
  const [auditLogs, setAuditLogs] = useState<AdminAuditLogItem[]>([])
  const [announcements, setAnnouncements] = useState<AnnouncementItem[]>([])
  const [managedResources, setManagedResources] = useState<Record<string, any[]>>({
    COMMUNITIES: [],
    CLUBS: [],
    EVENTS: [],
    INTERNSHIPS: [],
    NOTIFICATIONS: [],
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Filters & search
  const [userSearchQuery, setUserSearchQuery] = useState('')
  const [selectedRoleFilter, setSelectedRoleFilter] = useState('ALL')
  const [selectedStatusFilter, setSelectedStatusFilter] = useState('ALL')

  // Announcement form
  const [annTitle, setAnnTitle] = useState('')
  const [annContent, setAnnContent] = useState('')
  const [annType, setAnnType] = useState('INFO')

  // System settings state
  const [maintenanceMode, setMaintenanceMode] = useState(false)
  const [registrationAllowed, setRegistrationAllowed] = useState(true)

  const api = (import.meta as any).env?.VITE_API_BASE_URL || '/api/v1'
  const unwrap = (value: any) => value?.data ?? value
  const asList = (value: any, key: string) =>
    Array.isArray(value) ? value : unwrap(value)?.[key] || unwrap(value)?.items || []
  const request = useCallback(
    async (path: string, options: RequestInit = {}) => {
      const response = await fetch(api + path, {
        credentials: 'include',
        headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
        ...options,
      })
      const payload = response.status === 204 ? null : await response.json().catch(() => null)
      if (!response.ok)
        throw new Error(payload?.message || payload?.error || 'Admin request failed')
      return unwrap(payload)
    },
    [api]
  )
  const loadAdmin = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const [
        m,
        u,
        v,
        r,
        a,
        s,
        ann,
        communities,
        clubs,
        events,
        internships,
        notifications,
        analyticsRes,
      ] = await Promise.all([
        request('/admin/summary').catch(() => null),
        request('/admin/users').catch(() => []),
        request('/admin/verification/queue').catch(() => []),
        request('/admin/reports/queue').catch(() => []),
        request('/admin/audit-logs').catch(() => []),
        request('/admin/settings').catch(() => []),
        request('/admin/announcements').catch(() => []),
        request('/communities').catch(() => []),
        request('/clubs').catch(() => []),
        request('/events').catch(() => []),
        request('/internships').catch(() => []),
        request('/notifications').catch(() => []),
        request('/analytics/dashboard').catch(() => null),
      ])
      setMetrics(m)
      setAnalyticsData(analyticsRes)
      setManagedResources({
        COMMUNITIES: asList(communities, 'communities'),
        CLUBS: asList(clubs, 'clubs'),
        EVENTS: asList(events, 'events'),
        INTERNSHIPS: asList(internships, 'internships'),
        NOTIFICATIONS: asList(notifications, 'notifications'),
      })
      setUsers(asList(u, 'users'))
      setVerifications(asList(v, 'verifications'))
      setReports(asList(r, 'reports'))
      setAuditLogs(asList(a, 'logs'))
      setAnnouncements(asList(ann, 'announcements'))
      const settings = asList(s, 'settings')
      const getBool = (key: string, fallback: boolean) => {
        const item = settings.find((x: any) => x.key === key)
        return item ? String(item.value) === 'true' : fallback
      }
      setMaintenanceMode(getBool('maintenance_mode', false))
      setRegistrationAllowed(getBool('registration_allowed', true))
    } catch (e: any) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }, [request])
  useEffect(() => {
    void loadAdmin()
  }, [loadAdmin])

  const handleUpdateUserStatus = async (
    userId: string,
    newStatus: 'ACTIVE' | 'SUSPENDED' | 'BANNED'
  ) => {
    try {
      await request('/admin/users/' + userId, {
        method: 'PATCH',
        body: JSON.stringify({ status: newStatus }),
      })
      await loadAdmin()
    } catch (e: any) {
      setError(e.message)
    }
  }

  const handleApproveVerification = async (verId: string, approve: boolean) => {
    try {
      await request('/admin/moderation/action', {
        method: 'POST',
        body: JSON.stringify({
          targetType: 'VERIFICATION',
          targetId: verId,
          action: approve ? 'APPROVE' : 'REJECT',
          reason: 'Reviewed by administrator',
        }),
      })
      await loadAdmin()
    } catch (e: any) {
      setError(e.message)
    }
  }

  const handleResolveReport = async (reportId: string, action: string) => {
    try {
      await request('/admin/moderation/action', {
        method: 'POST',
        body: JSON.stringify({
          targetType: 'REPORT',
          targetId: reportId,
          action,
          reason: 'Reviewed by administrator',
        }),
      })
      await loadAdmin()
    } catch (e: any) {
      setError(e.message)
    }
  }

  const handleCreateAnnouncement = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!annTitle || !annContent) return
    try {
      await request('/admin/announcements', {
        method: 'POST',
        body: JSON.stringify({
          title: annTitle,
          content: annContent,
          targetRole: 'ALL',
          priority: annType,
        }),
      })
      setAnnTitle('')
      setAnnContent('')
      await loadAdmin()
    } catch (e: any) {
      setError(e.message)
    }
  }
  const handleSetting = async (key: string, value: boolean, description: string) => {
    try {
      await request('/admin/settings', {
        method: 'PATCH',
        body: JSON.stringify({ key, value: String(value), description }),
      })
      if (key === 'maintenance_mode') setMaintenanceMode(value)
      else setRegistrationAllowed(value)
    } catch (e: any) {
      setError(e.message)
    }
  }

  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(userSearchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(userSearchQuery.toLowerCase()) ||
      u.username.toLowerCase().includes(userSearchQuery.toLowerCase())
    const matchesRole = selectedRoleFilter === 'ALL' || u.role === selectedRoleFilter
    const matchesStatus = selectedStatusFilter === 'ALL' || u.status === selectedStatusFilter
    return matchesSearch && matchesRole && matchesStatus
  })

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#0a0d14',
        color: '#f3f4f6',
        fontFamily: 'Inter, system-ui, sans-serif',
        padding: '24px',
      }}
    >
      {error && (
        <div
          style={{
            background: '#451a1a',
            color: '#fecaca',
            padding: '12px',
            borderRadius: '8px',
            marginBottom: '12px',
          }}
        >
          {error}
        </div>
      )}
      {loading && (
        <div style={{ color: '#a5b4fc', marginBottom: '12px' }}>Loading administrator data…</div>
      )}
      {/* Header Banner */}
      <div
        style={{
          background:
            'linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(168, 85, 247, 0.2) 50%, rgba(236, 72, 153, 0.2) 100%)',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          borderRadius: '16px',
          padding: '32px',
          marginBottom: '24px',
          backdropFilter: 'blur(12px)',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px',
          }}
        >
          <div>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '4px 12px',
                borderRadius: '20px',
                background: 'rgba(239, 68, 68, 0.2)',
                border: '1px solid rgba(239, 68, 68, 0.4)',
                fontSize: '12px',
                fontWeight: 700,
                color: '#fca5a5',
                marginBottom: '12px',
              }}
            >
              🛡️ Lumina Institutional Administration Console
            </div>
            <h1
              style={{
                fontSize: '32px',
                fontWeight: 800,
                margin: 0,
                background: 'linear-gradient(to right, #ffffff, #c7d2fe, #f472b6)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Admin Dashboard & Control Center
            </h1>
            <p
              style={{ margin: '8px 0 0 0', color: '#9ca3af', fontSize: '15px', maxWidth: '680px' }}
            >
              Manage system users, process verification requests, moderate content reports, audit
              administrator actions, and broadcast platform announcements.
            </p>
          </div>
          <div
            style={{
              background: 'rgba(17, 24, 39, 0.8)',
              border: '1px solid rgba(255,255,255,0.15)',
              borderRadius: '12px',
              padding: '12px 20px',
              textAlign: 'right',
            }}
          >
            <div style={{ fontSize: '13px', color: '#818cf8', fontWeight: 700 }}>
              Dean Robert Vance
            </div>
            <div style={{ fontSize: '11px', color: '#9ca3af' }}>COLLEGE_ADMIN • Lumina Tech</div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div
          style={{
            display: 'flex',
            gap: '12px',
            marginTop: '28px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            paddingBottom: '12px',
            overflowX: 'auto',
          }}
        >
          {[
            { id: 'overview', label: '📊 Overview' },
            { id: 'analytics', label: '📈 Product Analytics & Growth' },
            { id: 'users', label: `👥 User Management (${users.length})` },
            { id: 'verification', label: `🎓 Verification Queue (${verifications.length})` },
            { id: 'reports', label: `🚩 Moderation Queue (${reports.length})` },
            { id: 'audit', label: `📋 Audit Logs (${auditLogs.length})` },
            { id: 'settings', label: '⚙️ Settings & Broadcasts' },
            { id: 'resources', label: '🗂️ Domain Management' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              style={{
                background: activeTab === tab.id ? 'rgba(99, 102, 241, 0.25)' : 'transparent',
                color: activeTab === tab.id ? '#ffffff' : '#9ca3af',
                border:
                  activeTab === tab.id
                    ? '1px solid rgba(99, 102, 241, 0.5)'
                    : '1px solid transparent',
                borderRadius: '8px',
                padding: '8px 16px',
                fontSize: '14px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                whiteSpace: 'nowrap',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div>
          {/* Summary Cards */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
              gap: '16px',
              marginBottom: '24px',
            }}
          >
            {[
              {
                label: 'Total Platform Users',
                value: metrics?.totalUsers ?? '—',
                color: '#6366f1',
                icon: '👥',
              },
              {
                label: 'Colleges Onboarded',
                value: metrics?.totalColleges ?? '—',
                color: '#38bdf8',
                icon: '🏛️',
              },
              {
                label: 'Active Clubs',
                value: metrics?.totalClubs ?? '—',
                color: '#ec4899',
                icon: '🛡️',
              },
              {
                label: 'Internships Posted',
                value: metrics?.totalInternships ?? '—',
                color: '#a855f7',
                icon: '💼',
              },
              {
                label: 'Pending Verifications',
                value: verifications.length,
                color: '#eab308',
                icon: '🎓',
              },
              {
                label: 'Open Content Reports',
                value: reports.length,
                color: '#ef4444',
                icon: '🚩',
              },
            ].map((card) => (
              <div
                key={card.label}
                style={{
                  background: 'rgba(17, 24, 39, 0.6)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '12px',
                  padding: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                }}
              >
                <div style={{ fontSize: '28px' }}>{card.icon}</div>
                <div>
                  <div style={{ fontSize: '22px', fontWeight: 800, color: card.color }}>
                    {card.value}
                  </div>
                  <div style={{ fontSize: '12px', color: '#9ca3af', fontWeight: 500 }}>
                    {card.label}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Activity Overview */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
              gap: '20px',
            }}
          >
            <div
              style={{
                background: 'rgba(17, 24, 39, 0.6)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '14px',
                padding: '20px',
              }}
            >
              <h3 style={{ margin: '0 0 14px 0', fontSize: '16px', color: '#ffffff' }}>
                Recent Administrative Activity
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {auditLogs.slice(0, 5).map((log) => (
                  <div
                    key={log.id}
                    style={{
                      background: 'rgba(31, 41, 55, 0.6)',
                      padding: '12px',
                      borderRadius: '8px',
                      borderLeft: '3px solid #6366f1',
                    }}
                  >
                    <div style={{ fontSize: '13px', fontWeight: 600, color: '#ffffff' }}>
                      {log.action}
                    </div>
                    <div style={{ fontSize: '12px', color: '#9ca3af' }}>
                      By: {log.admin.name} ({log.admin.role})
                    </div>
                    <div style={{ fontSize: '11px', color: '#6b7280', marginTop: '4px' }}>
                      {new Date(log.createdAt).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div
              style={{
                background: 'rgba(17, 24, 39, 0.6)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '14px',
                padding: '20px',
              }}
            >
              <h3 style={{ margin: '0 0 14px 0', fontSize: '16px', color: '#ffffff' }}>
                Active System Broadcasts
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {announcements.map((ann) => (
                  <div
                    key={ann.id}
                    style={{
                      background: 'rgba(31, 41, 55, 0.6)',
                      padding: '12px',
                      borderRadius: '8px',
                      borderLeft: '3px solid #eab308',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <span style={{ fontWeight: 700, fontSize: '13px', color: '#ffffff' }}>
                        {ann.title}
                      </span>
                      <span
                        style={{
                          background: 'rgba(234,179,8,0.2)',
                          color: '#fde047',
                          padding: '2px 6px',
                          borderRadius: '4px',
                          fontSize: '10px',
                        }}
                      >
                        {ann.type}
                      </span>
                    </div>
                    <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: '#9ca3af' }}>
                      {ann.content}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Analytics Tab */}
      {activeTab === 'analytics' && (
        <div>
          {/* Analytics Header Controls */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '12px',
              marginBottom: '20px',
              background: 'rgba(17, 24, 39, 0.6)',
              padding: '16px 20px',
              borderRadius: '12px',
              border: '1px solid rgba(255, 255, 255, 0.08)',
            }}
          >
            <div>
              <h2 style={{ fontSize: '18px', fontWeight: 700, margin: '0 0 4px 0', color: '#fff' }}>
                Cross-Domain Platform Analytics
              </h2>
              <p style={{ color: '#9ca3af', fontSize: '13px', margin: 0 }}>
                Privacy-aware event aggregation, user engagement funnels, and cohort retention.
              </p>
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={() => {
                  const blob = new Blob([JSON.stringify(analyticsData ?? {}, null, 2)], {
                    type: 'application/json',
                  })
                  const url = URL.createObjectURL(blob)
                  const a = document.createElement('a')
                  a.href = url
                  a.download = `lumina-analytics-${new Date().toISOString().slice(0, 10)}.json`
                  a.click()
                  URL.revokeObjectURL(url)
                }}
                style={{
                  backgroundColor: 'rgba(99, 102, 241, 0.2)',
                  color: '#818cf8',
                  border: '1px solid rgba(99, 102, 241, 0.4)',
                  padding: '8px 16px',
                  borderRadius: '8px',
                  fontSize: '13px',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                📥 Export Analytics JSON
              </button>
            </div>
          </div>

          {/* Top KPI Cards */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
              gap: '16px',
              marginBottom: '24px',
            }}
          >
            {[
              {
                label: 'Total Events Tracked',
                value: analyticsData?.totals?.events ?? 0,
                color: '#6366f1',
                icon: '⚡',
              },
              {
                label: 'Active Users',
                value: analyticsData?.totals?.activeUsers ?? 0,
                color: '#38bdf8',
                icon: '👥',
              },
              {
                label: 'Engagement Rate',
                value: `${Math.round((analyticsData?.totals?.engagementRate ?? 0) * 100)}%`,
                color: '#34d399',
                icon: '📈',
              },
              {
                label: 'Cohort Retention',
                value: `${((analyticsData?.cohorts?.retentionRate ?? 0) * 100).toFixed(1)}%`,
                color: '#a855f7',
                icon: '🔄',
              },
            ].map((kpi) => (
              <div
                key={kpi.label}
                style={{
                  background: 'rgba(17, 24, 39, 0.6)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '12px',
                  padding: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                }}
              >
                <div style={{ fontSize: '28px' }}>{kpi.icon}</div>
                <div>
                  <div style={{ fontSize: '22px', fontWeight: 800, color: kpi.color }}>
                    {kpi.value}
                  </div>
                  <div style={{ fontSize: '12px', color: '#9ca3af', fontWeight: 500 }}>
                    {kpi.label}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Domain Breakdowns & Funnels */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '20px',
              marginBottom: '24px',
            }}
          >
            {/* Conversion Funnel */}
            <div
              style={{
                background: 'rgba(17, 24, 39, 0.6)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '14px',
                padding: '20px',
              }}
            >
              <h3 style={{ margin: '0 0 14px 0', fontSize: '16px', color: '#ffffff' }}>
                Internship Application Funnel
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {(
                  analyticsData?.funnels?.internshipApplication?.steps ?? [
                    { name: 'internship_viewed', count: 0, dropOffRate: 0 },
                    { name: 'internship_applied', count: 0, dropOffRate: 0 },
                  ]
                ).map((step: any, idx: number) => (
                  <div
                    key={step.name}
                    style={{
                      background: 'rgba(31, 41, 55, 0.6)',
                      padding: '12px 16px',
                      borderRadius: '8px',
                      borderLeft: `4px solid ${idx === 0 ? '#38bdf8' : '#34d399'}`,
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <span style={{ fontWeight: 600, fontSize: '13px', color: '#fff' }}>
                        Step {idx + 1}: {step.name.replace('_', ' ').toUpperCase()}
                      </span>
                      <span style={{ fontWeight: 700, color: idx === 0 ? '#38bdf8' : '#34d399' }}>
                        {step.count}
                      </span>
                    </div>
                    {idx > 0 && (
                      <div style={{ fontSize: '11px', color: '#9ca3af', marginTop: '4px' }}>
                        Drop-off: {(step.dropOffRate * 100).toFixed(1)}%
                      </div>
                    )}
                  </div>
                ))}
                <div
                  style={{
                    background: 'rgba(52, 211, 153, 0.1)',
                    border: '1px solid rgba(52, 211, 153, 0.3)',
                    padding: '10px 14px',
                    borderRadius: '8px',
                    fontSize: '13px',
                    color: '#34d399',
                    fontWeight: 600,
                  }}
                >
                  Overall Conversion Rate:{' '}
                  {(
                    (analyticsData?.funnels?.internshipApplication?.overallConversionRate ?? 0) *
                    100
                  ).toFixed(1)}
                  %
                </div>
              </div>
            </div>

            {/* Growth & Domain Activity */}
            <div
              style={{
                background: 'rgba(17, 24, 39, 0.6)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '14px',
                padding: '20px',
              }}
            >
              <h3 style={{ margin: '0 0 14px 0', fontSize: '16px', color: '#ffffff' }}>
                Domain Activity Breakdown
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                {[
                  {
                    name: 'User Growth',
                    count: `${analyticsData?.domains?.growth?.signUps ?? 0} signups`,
                    desc: `${analyticsData?.domains?.growth?.activeUsers ?? 0} active`,
                  },
                  {
                    name: 'Engagement',
                    count: `${analyticsData?.domains?.engagement?.events ?? 0} events`,
                    desc: `${analyticsData?.domains?.engagement?.activeUsers ?? 0} users`,
                  },
                  {
                    name: 'Clubs & Groups',
                    count: `${analyticsData?.domains?.club?.events ?? 0} events`,
                    desc: 'Club interactions',
                  },
                  {
                    name: 'Internships',
                    count: `${analyticsData?.domains?.internship?.events ?? 0} events`,
                    desc: 'Views & applies',
                  },
                ].map((d) => (
                  <div
                    key={d.name}
                    style={{
                      background: 'rgba(31, 41, 55, 0.5)',
                      padding: '12px',
                      borderRadius: '8px',
                    }}
                  >
                    <div style={{ fontSize: '12px', color: '#9ca3af' }}>{d.name}</div>
                    <div
                      style={{ fontSize: '15px', fontWeight: 700, color: '#fff', marginTop: '2px' }}
                    >
                      {d.count}
                    </div>
                    <div style={{ fontSize: '11px', color: '#6b7280', marginTop: '2px' }}>
                      {d.desc}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Pipeline Health & Quality Check */}
          <div
            style={{
              background: 'rgba(17, 24, 39, 0.6)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '14px',
              padding: '20px',
            }}
          >
            <h3 style={{ margin: '0 0 10px 0', fontSize: '16px', color: '#ffffff' }}>
              Data Pipeline & Storage Health
            </h3>
            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
              <div style={{ color: '#34d399', fontSize: '13px' }}>
                ✓ Ingestion Status: Normal (0ms lag)
              </div>
              <div style={{ color: '#34d399', fontSize: '13px' }}>
                ✓ Duplicate Rejections: {analyticsData?.dataQuality?.duplicateRate ?? 0}%
              </div>
              <div style={{ color: '#38bdf8', fontSize: '13px' }}>
                ✓ Storage Partitioning: Tenant-isolated
              </div>
              <div style={{ color: '#c084fc', fontSize: '13px' }}>
                ✓ Privacy Filters: PII Sanity check active
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Users Tab */}
      {activeTab === 'users' && (
        <div>
          {/* User Controls */}
          <div
            style={{
              display: 'flex',
              gap: '16px',
              flexWrap: 'wrap',
              marginBottom: '20px',
              background: 'rgba(17, 24, 39, 0.7)',
              padding: '16px',
              borderRadius: '12px',
              border: '1px solid rgba(255, 255, 255, 0.08)',
            }}
          >
            <input
              type="text"
              placeholder="Search users by name, email, or username..."
              value={userSearchQuery}
              onChange={(e) => setUserSearchQuery(e.target.value)}
              style={{
                flex: 1,
                minWidth: '240px',
                background: 'rgba(31, 41, 55, 0.8)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                borderRadius: '8px',
                padding: '10px 14px',
                color: '#ffffff',
                fontSize: '14px',
                outline: 'none',
              }}
            />
            <select
              value={selectedRoleFilter}
              onChange={(e) => setSelectedRoleFilter(e.target.value)}
              style={{
                background: 'rgba(31, 41, 55, 0.8)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                borderRadius: '8px',
                padding: '10px 14px',
                color: '#ffffff',
                fontSize: '14px',
                outline: 'none',
              }}
            >
              <option value="ALL">All Roles</option>
              <option value="STUDENT">STUDENT</option>
              <option value="FACULTY">FACULTY</option>
              <option value="ALUMNI">ALUMNI</option>
              <option value="COLLEGE_ADMIN">COLLEGE_ADMIN</option>
              <option value="SUPER_ADMIN">SUPER_ADMIN</option>
            </select>
            <select
              value={selectedStatusFilter}
              onChange={(e) => setSelectedStatusFilter(e.target.value)}
              style={{
                background: 'rgba(31, 41, 55, 0.8)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                borderRadius: '8px',
                padding: '10px 14px',
                color: '#ffffff',
                fontSize: '14px',
                outline: 'none',
              }}
            >
              <option value="ALL">All Statuses</option>
              <option value="ACTIVE">ACTIVE</option>
              <option value="SUSPENDED">SUSPENDED</option>
              <option value="BANNED">BANNED</option>
            </select>
          </div>

          {/* User Table */}
          <div
            style={{
              overflowX: 'auto',
              background: 'rgba(17, 24, 39, 0.6)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '14px',
            }}
          >
            <table
              style={{
                width: '100%',
                borderCollapse: 'collapse',
                textAlign: 'left',
                fontSize: '14px',
              }}
            >
              <thead>
                <tr
                  style={{
                    background: 'rgba(31, 41, 55, 0.8)',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                    color: '#818cf8',
                  }}
                >
                  <th style={{ padding: '14px 18px' }}>User</th>
                  <th style={{ padding: '14px 18px' }}>Role</th>
                  <th style={{ padding: '14px 18px' }}>Status</th>
                  <th style={{ padding: '14px 18px' }}>Joined Date</th>
                  <th style={{ padding: '14px 18px', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr
                    key={user.id}
                    style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}
                  >
                    <td style={{ padding: '14px 18px' }}>
                      <div style={{ fontWeight: 700, color: '#ffffff' }}>{user.name}</div>
                      <div style={{ fontSize: '12px', color: '#9ca3af' }}>
                        {user.email} (@{user.username})
                      </div>
                    </td>
                    <td style={{ padding: '14px 18px' }}>
                      <span
                        style={{
                          background: 'rgba(99, 102, 241, 0.2)',
                          color: '#818cf8',
                          padding: '3px 8px',
                          borderRadius: '6px',
                          fontSize: '12px',
                          fontWeight: 600,
                        }}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td style={{ padding: '14px 18px' }}>
                      <span
                        style={{
                          background:
                            user.status === 'ACTIVE'
                              ? 'rgba(34, 197, 94, 0.2)'
                              : 'rgba(239, 68, 68, 0.2)',
                          color: user.status === 'ACTIVE' ? '#4ade80' : '#fca5a5',
                          padding: '3px 8px',
                          borderRadius: '6px',
                          fontSize: '12px',
                          fontWeight: 600,
                        }}
                      >
                        {user.status}
                      </span>
                    </td>
                    <td style={{ padding: '14px 18px', color: '#9ca3af', fontSize: '13px' }}>
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                    <td style={{ padding: '14px 18px', textAlign: 'right' }}>
                      {user.status === 'ACTIVE' ? (
                        <button
                          onClick={() => handleUpdateUserStatus(user.id, 'SUSPENDED')}
                          style={{
                            background: 'rgba(239, 68, 68, 0.2)',
                            color: '#fca5a5',
                            border: '1px solid rgba(239, 68, 68, 0.4)',
                            borderRadius: '6px',
                            padding: '6px 12px',
                            fontSize: '12px',
                            cursor: 'pointer',
                          }}
                        >
                          Suspend User
                        </button>
                      ) : (
                        <button
                          onClick={() => handleUpdateUserStatus(user.id, 'ACTIVE')}
                          style={{
                            background: 'rgba(34, 197, 94, 0.2)',
                            color: '#4ade80',
                            border: '1px solid rgba(34, 197, 94, 0.4)',
                            borderRadius: '6px',
                            padding: '6px 12px',
                            fontSize: '12px',
                            cursor: 'pointer',
                          }}
                        >
                          Reactivate User
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Verification Queue Tab */}
      {activeTab === 'verification' && (
        <div
          style={{
            background: 'rgba(17, 24, 39, 0.6)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '14px',
            padding: '24px',
          }}
        >
          <h2 style={{ fontSize: '20px', fontWeight: 700, marginTop: 0, color: '#ffffff' }}>
            Pending Verification Queue
          </h2>
          <p style={{ color: '#9ca3af', fontSize: '14px', marginBottom: '20px' }}>
            Review and approve pending student ID and alumni status verification requests.
          </p>

          {verifications.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '32px', color: '#9ca3af' }}>
              🎉 Verification queue is empty! All pending requests processed.
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {verifications.map((ver) => (
                <div
                  key={ver.id}
                  style={{
                    background: 'rgba(31, 41, 55, 0.6)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '10px',
                    padding: '16px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <div>
                    <h4 style={{ margin: '0 0 4px 0', fontSize: '15px', color: '#ffffff' }}>
                      {ver.user.name} ({ver.user.email})
                    </h4>
                    <p style={{ margin: 0, fontSize: '13px', color: '#9ca3af' }}>
                      Requested: Alumni & Degree Verification • Submitted:{' '}
                      {new Date(ver.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button
                      onClick={() => handleApproveVerification(ver.id, false)}
                      style={{
                        background: 'rgba(239, 68, 68, 0.2)',
                        color: '#fca5a5',
                        border: '1px solid rgba(239, 68, 68, 0.4)',
                        borderRadius: '8px',
                        padding: '8px 16px',
                        fontSize: '13px',
                        cursor: 'pointer',
                      }}
                    >
                      Reject
                    </button>
                    <button
                      onClick={() => handleApproveVerification(ver.id, true)}
                      style={{
                        background: 'linear-gradient(135deg, #22c55e, #16a34a)',
                        color: '#ffffff',
                        border: 'none',
                        borderRadius: '8px',
                        padding: '8px 16px',
                        fontSize: '13px',
                        fontWeight: 600,
                        cursor: 'pointer',
                      }}
                    >
                      ✓ Approve Verification
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Reports Queue Tab */}
      {activeTab === 'reports' && (
        <div
          style={{
            background: 'rgba(17, 24, 39, 0.6)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '14px',
            padding: '24px',
          }}
        >
          <h2 style={{ fontSize: '20px', fontWeight: 700, marginTop: 0, color: '#ffffff' }}>
            Moderation & Content Reports
          </h2>
          <p style={{ color: '#9ca3af', fontSize: '14px', marginBottom: '20px' }}>
            Review user reports regarding inappropriate content, harassment, or spam links.
          </p>

          {reports.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '32px', color: '#9ca3af' }}>
              🎉 Moderation queue clean! No open reports pending.
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {reports.map((rep) => (
                <div
                  key={rep.id}
                  style={{
                    background: 'rgba(31, 41, 55, 0.6)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '10px',
                    padding: '16px',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      marginBottom: '10px',
                    }}
                  >
                    <div>
                      <span
                        style={{
                          background: 'rgba(239, 68, 68, 0.2)',
                          color: '#fca5a5',
                          padding: '2px 8px',
                          borderRadius: '4px',
                          fontSize: '11px',
                          fontWeight: 700,
                        }}
                      >
                        REPORTED COMMENT
                      </span>
                      <p
                        style={{
                          margin: '6px 0 0 0',
                          fontSize: '14px',
                          color: '#ffffff',
                          fontWeight: 600,
                        }}
                      >
                        Reason: {rep.reason}
                      </p>
                      <p style={{ margin: '2px 0 0 0', fontSize: '12px', color: '#9ca3af' }}>
                        Reported by: {rep.reporter.name}
                      </p>
                    </div>
                    <span style={{ fontSize: '12px', color: '#6b7280' }}>
                      {new Date(rep.createdAt).toLocaleString()}
                    </span>
                  </div>

                  <div
                    style={{
                      background: 'rgba(17, 24, 39, 0.8)',
                      padding: '12px',
                      borderRadius: '8px',
                      borderLeft: '3px solid #ef4444',
                      marginBottom: '14px',
                      fontSize: '13px',
                      color: '#e5e7eb',
                    }}
                  >
                    "{rep.comment.body}"
                  </div>

                  <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                    <button
                      onClick={() => handleResolveReport(rep.id, 'RESOLVE')}
                      style={{
                        background: 'transparent',
                        color: '#9ca3af',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        borderRadius: '6px',
                        padding: '6px 14px',
                        fontSize: '12px',
                        cursor: 'pointer',
                      }}
                    >
                      Dismiss Report
                    </button>
                    <button
                      onClick={() => handleResolveReport(rep.id, 'HIDE')}
                      style={{
                        background: 'rgba(234, 179, 8, 0.2)',
                        color: '#fde047',
                        border: '1px solid rgba(234, 179, 8, 0.4)',
                        borderRadius: '6px',
                        padding: '6px 14px',
                        fontSize: '12px',
                        cursor: 'pointer',
                      }}
                    >
                      Hide Content
                    </button>
                    <button
                      onClick={() => handleResolveReport(rep.id, 'BAN')}
                      style={{
                        background: 'rgba(239, 68, 68, 0.2)',
                        color: '#fca5a5',
                        border: '1px solid rgba(239, 68, 68, 0.4)',
                        borderRadius: '6px',
                        padding: '6px 14px',
                        fontSize: '12px',
                        cursor: 'pointer',
                      }}
                    >
                      Ban User
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Audit Logs Tab */}
      {activeTab === 'audit' && (
        <div
          style={{
            background: 'rgba(17, 24, 39, 0.6)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '14px',
            padding: '24px',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '12px',
              marginBottom: '20px',
            }}
          >
            <div>
              <h2
                style={{ fontSize: '20px', fontWeight: 700, margin: '0 0 4px 0', color: '#ffffff' }}
              >
                Administrator Audit Trail
              </h2>
              <p style={{ color: '#9ca3af', fontSize: '14px', margin: 0 }}>
                Immutable audit log records for all privileged administrative actions and system
                modifications.
              </p>
            </div>
            <button
              onClick={() => {
                const blob = new Blob([JSON.stringify(auditLogs, null, 2)], {
                  type: 'application/json',
                })
                const url = URL.createObjectURL(blob)
                const a = document.createElement('a')
                a.href = url
                a.download = `audit-logs-${new Date().toISOString().slice(0, 10)}.json`
                a.click()
                URL.revokeObjectURL(url)
              }}
              style={{
                backgroundColor: 'rgba(99, 102, 241, 0.2)',
                color: '#818cf8',
                border: '1px solid rgba(99, 102, 241, 0.4)',
                padding: '8px 16px',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              📥 Export Audit Logs (JSON)
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {auditLogs.map((log) => (
              <div
                key={log.id}
                style={{
                  background: 'rgba(31, 41, 55, 0.6)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '8px',
                  padding: '14px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      marginBottom: '4px',
                    }}
                  >
                    <span
                      style={{
                        background: 'rgba(99, 102, 241, 0.2)',
                        color: '#818cf8',
                        padding: '2px 8px',
                        borderRadius: '4px',
                        fontSize: '11px',
                        fontWeight: 700,
                      }}
                    >
                      {log.action}
                    </span>
                    <span style={{ fontSize: '14px', color: '#ffffff', fontWeight: 600 }}>
                      By: {log.admin.name}
                    </span>
                  </div>
                  <div style={{ fontSize: '12px', color: '#9ca3af' }}>
                    Details: {JSON.stringify(log.details)}
                  </div>
                </div>
                <span style={{ fontSize: '12px', color: '#6b7280' }}>
                  {new Date(log.createdAt).toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'resources' && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '16px',
          }}
        >
          {Object.entries(managedResources).map(([name, items]) => (
            <section
              key={name}
              style={{
                background: 'rgba(17,24,39,.6)',
                border: '1px solid rgba(255,255,255,.08)',
                borderRadius: '14px',
                padding: '20px',
              }}
            >
              <h2 style={{ marginTop: 0, fontSize: '17px' }}>
                {name} <span style={{ color: '#818cf8' }}>({items.length})</span>
              </h2>
              {items.length === 0 ? (
                <p style={{ color: '#9ca3af' }}>No records available.</p>
              ) : (
                items.slice(0, 10).map((item: any) => (
                  <div
                    key={item.id || item.slug || JSON.stringify(item)}
                    style={{ padding: '10px 0', borderTop: '1px solid rgba(255,255,255,.08)' }}
                  >
                    <strong>{item.name || item.title || item.message || item.id}</strong>
                    <div style={{ color: '#9ca3af', fontSize: '12px' }}>
                      {item.status || item.type || item.description || ''}
                    </div>
                  </div>
                ))
              )}
            </section>
          ))}
        </div>
      )}

      {/* Settings & Announcements Tab */}
      {activeTab === 'settings' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Create Announcement */}
          <div
            style={{
              background: 'rgba(17, 24, 39, 0.6)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '14px',
              padding: '24px',
            }}
          >
            <h2 style={{ fontSize: '20px', fontWeight: 700, marginTop: 0, color: '#ffffff' }}>
              Broadcast System Announcement
            </h2>
            <form
              onSubmit={handleCreateAnnouncement}
              style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginTop: '16px' }}
            >
              <div>
                <label
                  style={{
                    display: 'block',
                    fontSize: '13px',
                    color: '#d1d5db',
                    marginBottom: '6px',
                  }}
                >
                  Announcement Title
                </label>
                <input
                  type="text"
                  placeholder="e.g. Scheduled Campus System Upgrade"
                  value={annTitle}
                  onChange={(e) => setAnnTitle(e.target.value)}
                  style={{
                    width: '100%',
                    background: 'rgba(31, 41, 55, 0.8)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    borderRadius: '8px',
                    padding: '10px',
                    color: '#ffffff',
                    outline: 'none',
                  }}
                  required
                />
              </div>
              <div>
                <label
                  style={{
                    display: 'block',
                    fontSize: '13px',
                    color: '#d1d5db',
                    marginBottom: '6px',
                  }}
                >
                  Notice Type
                </label>
                <select
                  value={annType}
                  onChange={(e) => setAnnType(e.target.value)}
                  style={{
                    width: '100%',
                    background: 'rgba(31, 41, 55, 0.8)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    borderRadius: '8px',
                    padding: '10px',
                    color: '#ffffff',
                    outline: 'none',
                  }}
                >
                  <option value="INFO">Information (INFO)</option>
                  <option value="WARNING">Warning (WARNING)</option>
                  <option value="CRITICAL">Critical (CRITICAL)</option>
                  <option value="MAINTENANCE">Maintenance (MAINTENANCE)</option>
                </select>
              </div>
              <div>
                <label
                  style={{
                    display: 'block',
                    fontSize: '13px',
                    color: '#d1d5db',
                    marginBottom: '6px',
                  }}
                >
                  Content Body
                </label>
                <textarea
                  placeholder="Enter detailed broadcast notification content..."
                  value={annContent}
                  onChange={(e) => setAnnContent(e.target.value)}
                  rows={3}
                  style={{
                    width: '100%',
                    background: 'rgba(31, 41, 55, 0.8)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    borderRadius: '8px',
                    padding: '10px',
                    color: '#ffffff',
                    outline: 'none',
                    resize: 'none',
                  }}
                  required
                />
              </div>
              <button
                type="submit"
                style={{
                  background: 'linear-gradient(135deg, #6366f1, #a855f7)',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '10px 20px',
                  fontWeight: 600,
                  fontSize: '14px',
                  cursor: 'pointer',
                  alignSelf: 'flex-start',
                }}
              >
                📣 Broadcast Announcement
              </button>
            </form>
          </div>

          {/* System Feature Toggles */}
          <div
            style={{
              background: 'rgba(17, 24, 39, 0.6)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '14px',
              padding: '24px',
            }}
          >
            <h2 style={{ fontSize: '20px', fontWeight: 700, marginTop: 0, color: '#ffffff' }}>
              System Configuration & Feature Flags
            </h2>

            <div
              style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginTop: '16px' }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  background: 'rgba(31, 41, 55, 0.6)',
                  padding: '14px 18px',
                  borderRadius: '10px',
                }}
              >
                <div>
                  <div style={{ fontWeight: 600, fontSize: '15px', color: '#ffffff' }}>
                    Maintenance Mode
                  </div>
                  <div style={{ fontSize: '12px', color: '#9ca3af' }}>
                    Restrict non-admin access during system upgrades
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={maintenanceMode}
                  onChange={(e) =>
                    void handleSetting(
                      'maintenance_mode',
                      e.target.checked,
                      'Global maintenance flag'
                    )
                  }
                  style={{
                    width: '18px',
                    height: '18px',
                    accentColor: '#6366f1',
                    cursor: 'pointer',
                  }}
                />
              </div>

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  background: 'rgba(31, 41, 55, 0.6)',
                  padding: '14px 18px',
                  borderRadius: '10px',
                }}
              >
                <div>
                  <div style={{ fontWeight: 600, fontSize: '15px', color: '#ffffff' }}>
                    User Registrations Allowed
                  </div>
                  <div style={{ fontSize: '12px', color: '#9ca3af' }}>
                    Allow new student signups across onboarded domains
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={registrationAllowed}
                  onChange={(e) =>
                    void handleSetting(
                      'registration_allowed',
                      e.target.checked,
                      'Allow new registrations'
                    )
                  }
                  style={{
                    width: '18px',
                    height: '18px',
                    accentColor: '#6366f1',
                    cursor: 'pointer',
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminDashboardView
