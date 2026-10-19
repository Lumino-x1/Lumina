import React, { useState, useEffect, useRef } from 'react'
import {
  fetchIncomingRequestsApi,
  acceptFriendRequestApi,
  rejectFriendRequestApi,
} from '../api/friendsApi'
import './NotificationDropdown.css'

export interface FollowRequestNotification {
  id: string
  senderId: string
  name: string
  username: string
  avatar: string
  department: string
  college: string
  timeAgo: string
  mutualCount?: number
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED'
  isSample?: boolean
}

export interface ActivityNotification {
  id: string
  type: 'LIKE' | 'COMMENT' | 'SYSTEM'
  actorName: string
  actorAvatar: string
  message: string
  timeAgo: string
  read: boolean
}

interface NotificationDropdownProps {
  isOpen: boolean
  onClose: () => void
  onUnreadCountChange?: (count: number) => void
}

const SAMPLE_FOLLOW_REQUESTS: FollowRequestNotification[] = [
  {
    id: 'sample-req-aarav',
    senderId: 'cmv9pbztq0000ts8a2am9f74t',
    name: 'Aarav Patel',
    username: 'aarav_p',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=120&q=80',
    department: 'Computer Science & Engineering',
    college: 'PSG Tech',
    timeAgo: '10m ago',
    mutualCount: 3,
    status: 'PENDING',
    isSample: true,
  },
  {
    id: 'sample-req-kavitha',
    senderId: 'cZM92pL0HMKQBHh5mEuFY6jJwExWX6aR',
    name: 'Kavitha Sundaram',
    username: 'kavitha_s',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80',
    department: 'Information Technology',
    college: 'PSG Tech',
    timeAgo: '1h ago',
    mutualCount: 5,
    status: 'PENDING',
    isSample: true,
  },
]

const SAMPLE_ACTIVITIES: ActivityNotification[] = [
  {
    id: 'sample-act-1',
    type: 'LIKE',
    actorName: 'Jane Doe',
    actorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
    message: 'liked your post "System Architecture in 2026"',
    timeAgo: '2h ago',
    read: false,
  },
  {
    id: 'sample-act-2',
    type: 'COMMENT',
    actorName: 'Pooja Sharma',
    actorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80',
    message: 'commented: "Great breakdown of distributed consensus!"',
    timeAgo: '5h ago',
    read: true,
  },
]

export const NotificationDropdown: React.FC<NotificationDropdownProps> = ({
  isOpen,
  onClose,
  onUnreadCountChange,
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'requests'>('all')
  const [followRequests, setFollowRequests] = useState<FollowRequestNotification[]>(SAMPLE_FOLLOW_REQUESTS)
  const [activities, setActivities] = useState<ActivityNotification[]>(SAMPLE_ACTIVITIES)
  const [actionLoading, setActionLoading] = useState<Record<string, boolean>>({})
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Fetch real incoming requests from backend if available
  useEffect(() => {
    let isMounted = true
    fetchIncomingRequestsApi().then((res) => {
      if (isMounted && res.success && Array.isArray(res.data) && res.data.length > 0) {
        const realRequests: FollowRequestNotification[] = res.data.map((item: any) => ({
          id: item.id,
          senderId: item.senderId || item.sender?.id,
          name: item.sender?.name || 'Fellow Student',
          username: item.sender?.username || 'student',
          avatar:
            item.sender?.profile?.profilePicture ||
            item.sender?.image ||
            'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
          department: item.sender?.profile?.department || 'Engineering',
          college: item.sender?.profile?.collegeName || 'PSG Tech',
          timeAgo: 'Recently',
          mutualCount: 2,
          status: 'PENDING',
          isSample: false,
        }))

        // Merge real requests with sample requests without duplicate IDs
        setFollowRequests((prev) => {
          const sampleOnly = prev.filter((p) => p.isSample)
          return [...realRequests, ...sampleOnly]
        })
      }
    })

    return () => {
      isMounted = false
    }
  }, [])

  // Calculate unread count
  useEffect(() => {
    const pendingRequestsCount = followRequests.filter((r) => r.status === 'PENDING').length
    const unreadActivitiesCount = activities.filter((a) => !a.read).length
    const total = pendingRequestsCount + unreadActivitiesCount
    if (onUnreadCountChange) {
      onUnreadCountChange(total)
    }
  }, [followRequests, activities, onUnreadCountChange])

  // Handle click outside to close dropdown
  useEffect(() => {
    if (!isOpen) return

    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        onClose()
      }
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  const handleAcceptRequest = async (req: FollowRequestNotification) => {
    setActionLoading((prev) => ({ ...prev, [req.id]: true }))
    try {
      if (!req.isSample) {
        await acceptFriendRequestApi(req.id)
      }
      setFollowRequests((prev) =>
        prev.map((r) => (r.id === req.id ? { ...r, status: 'ACCEPTED' } : r))
      )
    } catch (err) {
      console.error('Accept request failed:', err)
    } finally {
      setActionLoading((prev) => ({ ...prev, [req.id]: false }))
    }
  }

  const handleRejectRequest = async (req: FollowRequestNotification) => {
    setActionLoading((prev) => ({ ...prev, [req.id]: true }))
    try {
      if (!req.isSample) {
        await rejectFriendRequestApi(req.id)
      }
      setFollowRequests((prev) =>
        prev.map((r) => (r.id === req.id ? { ...r, status: 'REJECTED' } : r))
      )
    } catch (err) {
      console.error('Reject request failed:', err)
    } finally {
      setActionLoading((prev) => ({ ...prev, [req.id]: false }))
    }
  }

const formatDepartment = (dept?: string): string => {
  if (!dept) return ''
  const trimmed = dept.trim()
  const lower = trimmed.toLowerCase()
  if (lower.includes('computer science')) return 'CSE'
  if (lower.includes('information technology')) return 'IT'
  if (lower.includes('electronics') && (lower.includes('communication') || lower.includes('telecommunication'))) return 'ECE'
  if (lower.includes('electrical')) return 'EEE'
  if (lower.includes('mechanical')) return 'Mech'
  if (lower.includes('civil')) return 'Civil'
  if (lower.includes('artificial intelligence') || lower.includes('ai & ds') || lower.includes('data science')) return 'AI & DS'
  return trimmed
}

  const handleMarkAllAsRead = () => {
    setActivities((prev) => prev.map((a) => ({ ...a, read: true })))
  }

  if (!isOpen) return null

  const pendingRequests = followRequests.filter((r) => r.status === 'PENDING')
  const totalPending = pendingRequests.length

  return (
    <div className="ai-notifications-dropdown" ref={dropdownRef} role="region" aria-label="Notifications Panel">
      {/* Header */}
      <div className="ai-notif-header">
        <div className="ai-notif-title-group">
          <h3 className="ai-notif-title">Notifications</h3>
          {totalPending > 0 && (
            <span className="ai-notif-count-badge">{totalPending} New</span>
          )}
        </div>
        <button
          type="button"
          className="ai-notif-mark-read-btn"
          onClick={handleMarkAllAsRead}
          title="Mark all as read"
        >
          Mark all read
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="ai-notif-tabs">
        <button
          type="button"
          className={`ai-notif-tab ${activeTab === 'all' ? 'is-active' : ''}`}
          onClick={() => setActiveTab('all')}
        >
          All
        </button>
        <button
          type="button"
          className={`ai-notif-tab ${activeTab === 'requests' ? 'is-active' : ''}`}
          onClick={() => setActiveTab('requests')}
        >
          Requests
          {totalPending > 0 && <span className="ai-notif-tab-badge">{totalPending}</span>}
        </button>
      </div>

      {/* Content Body */}
      <div className="ai-notif-body">
        {/* Follow Requests Section */}
        {followRequests.length > 0 && (
          <div className="ai-notif-section">
            <div className="ai-notif-section-header">
              <span className="ai-notif-section-label">Follow Requests</span>
              <span className="ai-notif-section-count">{totalPending} pending</span>
            </div>

            <div className="ai-notif-list">
              {followRequests.map((req) => {
                const isLoading = !!actionLoading[req.id]
                return (
                  <div className={`ai-notif-item ai-follow-req-item ${req.status !== 'PENDING' ? 'is-resolved' : ''}`} key={req.id}>
                    <div className="ai-notif-avatar-wrap">
                      <img
                        src={req.avatar}
                        alt={req.name}
                        className="ai-notif-avatar"
                        onError={(e) => {
                          e.currentTarget.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80'
                        }}
                      />
                      <span className="ai-notif-req-icon" title="Friend Request">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                          <circle cx="8.5" cy="7" r="4" />
                          <line x1="20" y1="8" x2="20" y2="14" stroke="currentColor" strokeWidth="2.5" />
                          <line x1="23" y1="11" x2="17" y2="11" stroke="currentColor" strokeWidth="2.5" />
                        </svg>
                      </span>
                    </div>

                    <div className="ai-notif-content">
                      <div className="ai-notif-top-row">
                        <div className="ai-notif-main-text">
                          <strong className="ai-notif-user-name">{req.name}</strong>{' '}
                          <span className="ai-notif-action-text">requested to follow you</span>
                        </div>
                        <span className="ai-notif-time">{req.timeAgo}</span>
                      </div>

                      {(req.department || req.mutualCount) && (
                        <div className="ai-notif-meta-line">
                          {req.department && (
                            <span className="ai-notif-dept" title={req.department}>
                              {formatDepartment(req.department)}
                            </span>
                          )}
                          {req.department && !!req.mutualCount && (
                            <span className="ai-notif-dot">·</span>
                          )}
                          {!!req.mutualCount && (
                            <span className="ai-notif-mutual">
                              {req.mutualCount} mutual{req.mutualCount === 1 ? '' : 's'}
                            </span>
                          )}
                        </div>
                      )}

                      {/* Action buttons or resolved state */}
                      {req.status === 'PENDING' ? (
                        <div className="ai-notif-actions">
                          <button
                            type="button"
                            className="ai-notif-btn-confirm"
                            disabled={isLoading}
                            onClick={() => handleAcceptRequest(req)}
                          >
                            {isLoading ? 'Confirming...' : 'Confirm'}
                          </button>
                          <button
                            type="button"
                            className="ai-notif-btn-delete"
                            disabled={isLoading}
                            onClick={() => handleRejectRequest(req)}
                          >
                            Delete
                          </button>
                        </div>
                      ) : req.status === 'ACCEPTED' ? (
                        <div className="ai-notif-resolved-status is-accepted">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                          <span>Request accepted · Following</span>
                        </div>
                      ) : (
                        <div className="ai-notif-resolved-status is-rejected">
                          <span>Request removed</span>
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Empty state for Requests tab */}
        {activeTab === 'requests' && followRequests.length === 0 && (
          <div className="ai-notif-empty">
            <p className="ai-notif-empty-text">No pending follow requests</p>
          </div>
        )}

        {/* General Activity Notifications (shown when activeTab === 'all') */}
        {activeTab === 'all' && activities.length > 0 && (
          <div className="ai-notif-section">
            <div className="ai-notif-section-header">
              <span className="ai-notif-section-label">Earlier Activity</span>
            </div>
            <div className="ai-notif-list">
              {activities.map((act) => (
                <div className={`ai-notif-item ${!act.read ? 'is-unread' : ''}`} key={act.id}>
                  <div className="ai-notif-avatar-wrap">
                    <img src={act.actorAvatar} alt={act.actorName} className="ai-notif-avatar" />
                    <span className="ai-notif-activity-icon">
                      {act.type === 'LIKE' ? '❤️' : '💬'}
                    </span>
                  </div>
                  <div className="ai-notif-content">
                    <div className="ai-notif-top-row">
                      <div className="ai-notif-main-text">
                        <strong className="ai-notif-user-name">{act.actorName}</strong>{' '}
                        <span className="ai-notif-desc">{act.message}</span>
                      </div>
                      <span className="ai-notif-time">{act.timeAgo}</span>
                    </div>
                  </div>
                  {!act.read && <span className="ai-notif-unread-dot" />}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty state for All tab */}
        {activeTab === 'all' && followRequests.length === 0 && activities.length === 0 && (
          <div className="ai-notif-empty">
            <p className="ai-notif-empty-text">No notifications right now</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="ai-notif-footer">
        <a
          href="#notifications"
          className="ai-notif-footer-link"
          onClick={(e) => {
            e.preventDefault()
            onClose()
          }}
        >
          View all notifications
        </a>
      </div>
    </div>
  )
}
