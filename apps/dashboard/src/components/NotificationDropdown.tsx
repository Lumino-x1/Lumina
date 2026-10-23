import React, { useState, useEffect, useRef } from 'react'
import {
  fetchIncomingRequestsApi,
  acceptFriendRequestApi,
  rejectFriendRequestApi,
  fetchNotificationsApi,
  invalidateFriendsCache,
} from '../api/friendsApi'
import './NotificationDropdown.css'

export interface FollowRequestNotification {
  id: string
  senderId: string
  name: string
  username: string
  avatar: string
  timeAgo: string
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED'
}

export interface ActivityNotification {
  id: string
  type: 'LIKE' | 'COMMENT' | 'SYSTEM'
  title?: string
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

function formatTimeAgo(date: Date): string {
  const diffMs = Date.now() - date.getTime()
  const diffSec = Math.floor(diffMs / 1000)
  if (diffSec < 60) return 'Just now'
  const diffMin = Math.floor(diffSec / 60)
  if (diffMin < 60) return `${diffMin}m ago`
  const diffHours = Math.floor(diffMin / 60)
  if (diffHours < 24) return `${diffHours}h ago`
  const diffDays = Math.floor(diffHours / 24)
  if (diffDays < 7) return `${diffDays}d ago`
  return `${Math.floor(diffDays / 7)}w ago`
}

export const NotificationDropdown: React.FC<NotificationDropdownProps> = ({
  isOpen,
  onClose,
  onUnreadCountChange,
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'requests'>('all')
  const [followRequests, setFollowRequests] = useState<FollowRequestNotification[]>([])
  const [activities, setActivities] = useState<ActivityNotification[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Fetch real incoming requests and activity notifications from backend
  useEffect(() => {
    let isMounted = true
    setIsLoading(true)

    Promise.all([
      fetchIncomingRequestsApi().catch(() => ({ success: false, data: [] })),
      fetchNotificationsApi().catch(() => ({ success: false, data: [] })),
    ])
      .then(([reqRes, notifRes]) => {
        if (!isMounted) return

        if (reqRes.success && Array.isArray(reqRes.data)) {
          const realRequests: FollowRequestNotification[] = reqRes.data.map((item: any) => ({
            id: item.id,
            senderId: item.senderId || item.sender?.id || '',
            name: item.sender?.name || 'Fellow Student',
            username: item.sender?.username || 'student',
            avatar:
              item.sender?.profile?.profilePicture ||
              item.sender?.image ||
              'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
            timeAgo: item.createdAt ? formatTimeAgo(new Date(item.createdAt)) : 'Recently',
            status: 'PENDING',
          }))
          setFollowRequests(realRequests)
        } else {
          setFollowRequests([])
        }

        if (notifRes.success && Array.isArray(notifRes.data)) {
          const mappedActivities: ActivityNotification[] = notifRes.data.map((item: any) => ({
            id: item.id,
            type: item.type === 'COMMENT' ? 'COMMENT' : item.type === 'LIKE' ? 'LIKE' : 'SYSTEM',
            title: item.title,
            actorName: item.data?.actorName || item.title || 'Lumina',
            actorAvatar:
              item.data?.actorAvatar ||
              'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
            message: item.message || item.body || 'sent an update',
            timeAgo: item.createdAt ? formatTimeAgo(new Date(item.createdAt)) : 'Recently',
            read: !!item.read,
          }))
          setActivities(mappedActivities)
        } else {
          setActivities([])
        }
      })
      .finally(() => {
        if (isMounted) {
          setIsLoading(false)
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

  // Handle click / touch outside to close dropdown
  useEffect(() => {
    if (!isOpen) return

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null
      if (target?.closest?.('.ai-bell-btn')) return
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        onClose()
      }
    }

    const handleTouchOutside = (e: TouchEvent) => {
      const target = e.target as HTMLElement | null
      if (target?.closest?.('.ai-bell-btn')) return
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
    document.addEventListener('touchstart', handleTouchOutside, { passive: true })
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('touchstart', handleTouchOutside)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  // Prevent background scrolling on mobile when full page notifications is open
  useEffect(() => {
    if (!isOpen) return

    const updateScrollLock = () => {
      if (window.innerWidth <= 768) {
        document.body.style.overflow = 'hidden'
      } else {
        document.body.style.overflow = ''
      }
    }

    updateScrollLock()
    window.addEventListener('resize', updateScrollLock)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('resize', updateScrollLock)
    }
  }, [isOpen])

  const handleAcceptRequest = async (req: FollowRequestNotification) => {
    // Immediately remove notification without showing accepted text
    setFollowRequests((prev) => prev.filter((r) => r.id !== req.id))
    try {
      await acceptFriendRequestApi(req.id)
      invalidateFriendsCache()
    } catch (err) {
      console.error('Accept request failed:', err)
    }
  }

  const handleRejectRequest = async (req: FollowRequestNotification) => {
    // Immediately remove notification without showing rejected text
    setFollowRequests((prev) => prev.filter((r) => r.id !== req.id))
    try {
      await rejectFriendRequestApi(req.id)
      invalidateFriendsCache()
    } catch (err) {
      console.error('Reject request failed:', err)
    }
  }

  const handleMarkAllAsRead = () => {
    setActivities((prev) => prev.map((a) => ({ ...a, read: true })))
  }

  if (!isOpen) return null

  const pendingRequests = followRequests.filter((r) => r.status === 'PENDING')
  const totalPending = pendingRequests.length
  const hasAnyNotifications = followRequests.length > 0 || activities.length > 0

  return (
    <>
      {/* Mobile backdrop */}
      <div className="ai-notif-backdrop" onClick={onClose} aria-hidden="true" />

      <div
        className="ai-notifications-dropdown"
        ref={dropdownRef}
        role="region"
        aria-label="Notifications Panel"
      >
        {/* Header */}
        <div className="ai-notif-header">
          <div className="ai-notif-title-group">
            <button
              type="button"
              className="ai-notif-back-btn"
              onClick={onClose}
              title="Back"
              aria-label="Back"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
              </svg>
            </button>
            <h3 className="ai-notif-title">Notifications</h3>
            {totalPending > 0 && (
              <span className="ai-notif-count-badge">{totalPending} New</span>
            )}
          </div>
          {hasAnyNotifications && (
            <div className="ai-notif-header-actions">
              <button
                type="button"
                className="ai-notif-mark-read-btn"
                onClick={handleMarkAllAsRead}
                title="Mark all read"
              >
                Mark all read
              </button>
            </div>
          )}
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
            {totalPending > 0 && (
              <span className="ai-notif-tab-badge">{totalPending}</span>
            )}
          </button>
        </div>

        {/* Content Body */}
        <div className="ai-notif-body">
          {isLoading ? (
            <div className="ai-notif-loading">
              <div className="ai-notif-spinner" />
              <span>Loading notifications...</span>
            </div>
          ) : (
            <>
              {/* Follow Requests Section */}
              {followRequests.length > 0 && (
                <div className="ai-notif-section">
                  <div className="ai-notif-section-header">
                    <span className="ai-notif-section-label">Follow Requests</span>
                    <span className="ai-notif-section-count">{totalPending} pending</span>
                  </div>

                  <div className="ai-notif-list">
                    {followRequests.map((req) => (
                      <div
                        className="ai-notif-item ai-follow-req-item"
                        key={req.id}
                      >
                          <div className="ai-notif-avatar-wrap">
                            <img
                              src={req.avatar}
                              alt={req.name}
                              className="ai-notif-avatar"
                              onError={(e) => {
                                e.currentTarget.src =
                                  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80'
                              }}
                            />
                          </div>

                          <div className="ai-notif-content">
                            <div className="ai-notif-main-text">
                              <strong className="ai-notif-user-name">{req.name}</strong>{' '}
                              <span className="ai-notif-action-text">requested to follow you</span>
                            </div>
                            <span className="ai-notif-time">{req.timeAgo}</span>
                          </div>

                          {/* Action buttons (Confirm & Delete text buttons) placed on the right side */}
                          <div className="ai-notif-actions">
                            <button
                              type="button"
                              className="ai-notif-btn-confirm"
                              onClick={() => handleAcceptRequest(req)}
                            >
                              Confirm
                            </button>
                            <button
                              type="button"
                              className="ai-notif-btn-delete"
                              onClick={() => handleRejectRequest(req)}
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              )}

              {/* Empty state for Requests tab */}
              {activeTab === 'requests' && followRequests.length === 0 && (
                <div className="ai-notif-empty">
                  <div className="ai-notif-empty-icon">
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                      <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                      <circle cx="8.5" cy="7" r="4" />
                      <line x1="17" y1="11" x2="23" y2="11" strokeWidth="2" />
                    </svg>
                  </div>
                  <p className="ai-notif-empty-title">No follow requests</p>
                  <p className="ai-notif-empty-desc">You don't have any pending requests</p>
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
                              <strong className="ai-notif-user-name">
                                {act.title || act.actorName}
                              </strong>{' '}
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
                  <div className="ai-notif-empty-icon">
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                    </svg>
                  </div>
                  <p className="ai-notif-empty-title">No notifications</p>
                  <p className="ai-notif-empty-desc">You have no new notifications right now</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  )
}
