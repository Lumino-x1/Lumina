/**
 * Single API router mounted at `/api`.
 * Path prefixes match the previous per-module mounts so clients do not change.
 */
import {
  boundConcurrentUploads,
  optionalAuth,
  requireAuth,
  upload,
  uploadPostMedia,
  uploadResume,
} from '../../middleware'
import analyticsRouter from '../analytics/router'
import * as controller from './controller'
import { MSG_PROFILE_ROUTER_WORKS } from '@lumina/constants'
import { subscribe } from '@lumina/realtime'
import { Router } from 'express'
import rateLimit from 'express-rate-limit'

import type { AuthenticatedRequest } from '@lumina/contracts'
import type { NextFunction, Request, Response } from 'express'

const apiRouter = Router()

// Section 28: Product analytics ingestion, dashboards, exports and privacy operations.
apiRouter.use('/v1/analytics', analyticsRouter)
apiRouter.use('/analytics', analyticsRouter)

// Feature-specific rate limits (same windows/limits as before).
const videoTokenLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 30,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  skip: () => process.env.NODE_ENV === 'test',
  message: { status: 'error', message: 'Too many video token requests, please try again later.' },
})

const videoCallLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 20,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  skip: () => process.env.NODE_ENV === 'test',
  message: { status: 'error', message: 'Too many call creation attempts, please try again later.' },
})

const commentRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 60,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: { status: 'error', message: 'Too many comment requests, please try again later.' },
})

// --- Profile: /api/profile ---
apiRouter.get('/profile/test', (_req, res) => {
  res.json({ message: MSG_PROFILE_ROUTER_WORKS })
})
apiRouter.get('/profile/me', requireAuth, controller.getMyProfile)
apiRouter.patch('/profile/me', requireAuth, controller.updateMyProfile)
apiRouter.get('/profile/:username', optionalAuth, controller.getProfileByUsername as never)
apiRouter.patch(
  '/profile/avatar',
  requireAuth,
  boundConcurrentUploads,
  upload.single('image'),
  controller.uploadProfilePicture
)
apiRouter.delete('/profile/avatar', requireAuth, controller.deleteProfilePicture)
apiRouter.patch(
  '/profile/cover',
  requireAuth,
  boundConcurrentUploads,
  upload.single('image'),
  controller.uploadCoverImage
)
apiRouter.delete('/profile/cover', requireAuth, controller.deleteCoverImage)

// --- Friends: /api/friends ---
apiRouter.post('/friends/request/:userId', requireAuth, controller.sendFriendRequest)
apiRouter.patch('/friends/request/:requestId/accept', requireAuth, controller.acceptFriendRequest)
apiRouter.patch('/friends/request/:requestId/reject', requireAuth, controller.rejectFriendRequest)
apiRouter.delete('/friends/request/:requestId', requireAuth, controller.cancelFriendRequest)
apiRouter.delete('/friends/:friendId', requireAuth, controller.unfriend)
apiRouter.get('/friends', requireAuth, controller.getMyFriends)
apiRouter.get('/friends/mutual/:userId', requireAuth, controller.getMutualFriends)
apiRouter.get('/friends/requests/incoming', requireAuth, controller.getIncomingRequests)
apiRouter.get('/friends/requests/outgoing', requireAuth, controller.getOutgoingRequests)

// --- Posts: /api/posts ---
apiRouter.get('/posts/saved', requireAuth, async (req: Request, res: Response) => {
  await controller.getMySavedPosts(req as AuthenticatedRequest, res)
})
apiRouter.post(
  '/posts',
  requireAuth,
  boundConcurrentUploads,
  uploadPostMedia.array('media', 10),
  async (req: Request, res: Response, next: NextFunction) => {
    await controller.createPost(req as AuthenticatedRequest, res, next)
  }
)
apiRouter.post('/posts/:id/like', requireAuth, async (req: Request, res: Response) => {
  await controller.toggleLike(req as AuthenticatedRequest, res)
})
apiRouter.get('/posts/:id/likes/count', requireAuth, async (req: Request, res: Response) => {
  await controller.getLikeCount(req as AuthenticatedRequest, res)
})
apiRouter.get('/posts/:id/comments', requireAuth, async (req: Request, res: Response) => {
  await controller.listComments(req as AuthenticatedRequest, res)
})
apiRouter.post('/posts/:id/comments', requireAuth, async (req: Request, res: Response) => {
  await controller.createComment(req as AuthenticatedRequest, res)
})
apiRouter.patch(
  '/posts/:id/comments/:commentId/pin',
  requireAuth,
  async (req: Request, res: Response) => {
    await controller.pinComment(req as AuthenticatedRequest, res)
  }
)
apiRouter.delete(
  '/posts/:id/comments/:commentId',
  requireAuth,
  async (req: Request, res: Response) => {
    await controller.deleteComment(req as AuthenticatedRequest, res)
  }
)
apiRouter.post('/posts/:id/save', requireAuth, async (req: Request, res: Response) => {
  await controller.toggleSavePost(req as AuthenticatedRequest, res)
})

// --- Chat (Stream): /api/chat ---
apiRouter.get('/chat/token', requireAuth, controller.getChatToken as never)
apiRouter.post('/chat/conversations', requireAuth, controller.createOneToOneConversation as never)
apiRouter.get('/chat/conversations', requireAuth, controller.getMyConversations as never)

// --- Leaderboard: /api/leaderboard ---
apiRouter.get('/leaderboard', requireAuth, controller.getLeaderboard)
apiRouter.get('/leaderboard/me/around', requireAuth, controller.getLeaderboardAroundMe)
apiRouter.get('/leaderboard/me', requireAuth, controller.getMyLeaderboardStats)
apiRouter.get('/leaderboard/:userId', requireAuth, controller.getUserLeaderboardStats)

// --- LeetCode: /api/leetcode ---
apiRouter.post('/leetcode/sync', requireAuth, controller.manualSyncLeetCode)

// --- Video (Stream Video): /api/video ---
apiRouter.post('/video/token', requireAuth, videoTokenLimiter, controller.getVideoToken)
apiRouter.post('/video/calls', requireAuth, videoCallLimiter, controller.createCall)
apiRouter.get('/video/calls/history', requireAuth, controller.getCallHistory)
apiRouter.get('/video/calls/:callId', requireAuth, controller.getCallDetails)
apiRouter.post('/video/calls/:callId/join', requireAuth, controller.joinCall)
apiRouter.post('/video/calls/:callId/respond', requireAuth, controller.respondToInvite)
apiRouter.post('/video/calls/:callId/end', requireAuth, controller.endCall)

// --- Comments module: /api/comments (OpenAPI contract) ---
apiRouter.post(
  '/comments/posts/:postId/comments',
  requireAuth,
  commentRateLimiter,
  async (req: Request, res: Response) => {
    await controller.createCommentHandler(req as AuthenticatedRequest, res)
  }
)
apiRouter.get(
  '/comments/posts/:postId/comments',
  requireAuth,
  async (req: Request, res: Response) => {
    await controller.getCommentsForPostHandler(req as AuthenticatedRequest, res)
  }
)
apiRouter.patch(
  '/comments/:commentId',
  requireAuth,
  commentRateLimiter,
  async (req: Request, res: Response) => {
    await controller.editCommentHandler(req as AuthenticatedRequest, res)
  }
)
apiRouter.get('/comments/:commentId/history', requireAuth, async (req: Request, res: Response) => {
  await controller.getCommentEditHistoryHandler(req as AuthenticatedRequest, res)
})
apiRouter.delete('/comments/:commentId', requireAuth, async (req: Request, res: Response) => {
  await controller.deleteCommentHandler(req as AuthenticatedRequest, res)
})
apiRouter.post(
  '/comments/:commentId/reactions',
  requireAuth,
  async (req: Request, res: Response) => {
    await controller.toggleReactionHandler(req as AuthenticatedRequest, res)
  }
)
apiRouter.delete(
  '/comments/:commentId/reactions',
  requireAuth,
  async (req: Request, res: Response) => {
    await controller.removeReactionHandler(req as AuthenticatedRequest, res)
  }
)
apiRouter.post('/comments/:commentId/pin', requireAuth, async (req: Request, res: Response) => {
  await controller.togglePinHandler(req as AuthenticatedRequest, res)
})
apiRouter.post('/comments/:commentId/report', requireAuth, async (req: Request, res: Response) => {
  await controller.reportCommentHandler(req as AuthenticatedRequest, res)
})

// Study groups: same router on /api/v1/study-groups and legacy /api/study-group
const studyGroupRouter = Router()
studyGroupRouter.get('/search', requireAuth, controller.searchAll)
studyGroupRouter.post('/', requireAuth, controller.createStudyGroup)
studyGroupRouter.get('/', requireAuth, controller.getStudyGroup)
studyGroupRouter.get('/:groupId/search', requireAuth, controller.searchInGroup)
studyGroupRouter.get('/:groupId/members', requireAuth, controller.getStudyGroupMembers)
studyGroupRouter.post('/:groupId/invitations', requireAuth, controller.inviteMember)
studyGroupRouter.patch('/:groupId/members/:userId', requireAuth, controller.updateMemberRole)
studyGroupRouter.delete('/:groupId/members/:userId', requireAuth, controller.removeMember)
studyGroupRouter.post('/:groupId/join', requireAuth, controller.joinStudyGroup)
studyGroupRouter.post('/:groupId/leave', requireAuth, controller.leaveStudyGroup)
studyGroupRouter.post('/:groupId/discussions', requireAuth, controller.createDiscussion)
studyGroupRouter.get('/:groupId/discussions', requireAuth, controller.listDiscussions)
studyGroupRouter.get('/:groupId/discussions/:discussionId', requireAuth, controller.getDiscussion)
studyGroupRouter.patch(
  '/:groupId/discussions/:discussionId',
  requireAuth,
  controller.updateDiscussion
)
studyGroupRouter.delete(
  '/:groupId/discussions/:discussionId',
  requireAuth,
  controller.deleteDiscussion
)
studyGroupRouter.post(
  '/:groupId/discussions/:discussionId/replies',
  requireAuth,
  controller.createReply
)
studyGroupRouter.get(
  '/:groupId/discussions/:discussionId/replies',
  requireAuth,
  controller.listReplies
)
studyGroupRouter.patch(
  '/:groupId/discussions/:discussionId/replies/:replyId',
  requireAuth,
  controller.updateReply
)
studyGroupRouter.delete(
  '/:groupId/discussions/:discussionId/replies/:replyId',
  requireAuth,
  controller.deleteReply
)
studyGroupRouter.post('/:groupId/notes', requireAuth, controller.createNote)
studyGroupRouter.get('/:groupId/notes', requireAuth, controller.listNotes)
studyGroupRouter.get('/:groupId/notes/:noteId', requireAuth, controller.getNote)
studyGroupRouter.patch('/:groupId/notes/:noteId', requireAuth, controller.updateNote)
studyGroupRouter.delete('/:groupId/notes/:noteId', requireAuth, controller.deleteNote)
studyGroupRouter.get('/:groupId/notes/:noteId/versions', requireAuth, controller.listNoteVersions)
studyGroupRouter.get(
  '/:groupId/notes/:noteId/versions/:version',
  requireAuth,
  controller.getNoteVersion
)
studyGroupRouter.post('/:groupId/files/upload-url', requireAuth, controller.createFileUploadUrl)
studyGroupRouter.post('/:groupId/files', requireAuth, controller.registerFile)
studyGroupRouter.get('/:groupId/files', requireAuth, controller.listFiles)
studyGroupRouter.get('/:groupId/files/:fileId', requireAuth, controller.getFile)
studyGroupRouter.get(
  '/:groupId/files/:fileId/download-url',
  requireAuth,
  controller.getFileDownloadUrl
)
studyGroupRouter.delete('/:groupId/files/:fileId', requireAuth, controller.deleteFile)
studyGroupRouter.post('/:groupId/timetable', requireAuth, controller.upsertTimetable)
studyGroupRouter.get('/:groupId/timetable', requireAuth, controller.getTimetable)
studyGroupRouter.patch('/:groupId/timetable', requireAuth, controller.upsertTimetable)
studyGroupRouter.delete('/:groupId/timetable', requireAuth, controller.deleteTimetable)
studyGroupRouter.get('/:groupId/timetable/versions', requireAuth, controller.listTimetableVersions)
studyGroupRouter.post('/:groupId/chat', requireAuth, controller.openGroupChat)
studyGroupRouter.get('/:groupId/chat', requireAuth, controller.getGroupChat)
studyGroupRouter.get('/:groupId/audit', requireAuth, controller.listAuditEvents)
studyGroupRouter.get('/:groupId', requireAuth, controller.getStudyGroupById)
studyGroupRouter.patch('/:groupId', requireAuth, controller.updateStudyGroup)
studyGroupRouter.put('/:groupId', requireAuth, controller.updateStudyGroup)
studyGroupRouter.delete('/:groupId', requireAuth, controller.deleteStudyGroup)

apiRouter.use('/v1/study-groups', studyGroupRouter)
apiRouter.use('/study-group', studyGroupRouter)

// Clubs: mounted on /api/v1/clubs and /api/clubs
const clubRouter = Router()
clubRouter.post('/', requireAuth, controller.createClub)
clubRouter.get('/', requireAuth, controller.listClubs)
clubRouter.get('/:clubId', requireAuth, controller.getClubById)
clubRouter.patch('/:clubId', requireAuth, controller.updateClub)
clubRouter.post('/:clubId/archive', requireAuth, controller.archiveClub)
clubRouter.post('/:clubId/join', requireAuth, controller.joinClub)
clubRouter.post('/:clubId/leave', requireAuth, controller.leaveClub)
clubRouter.get('/:clubId/members', requireAuth, controller.listClubMembers)
clubRouter.post('/:clubId/invitations', requireAuth, controller.inviteClubMember)
clubRouter.post('/invitations/:invitationId/respond', requireAuth, controller.respondClubInvitation)
clubRouter.patch('/:clubId/members/:userId', requireAuth, controller.updateClubMemberRole)
clubRouter.delete('/:clubId/members/:userId', requireAuth, controller.removeClubMember)
clubRouter.post(
  '/:clubId/logo',
  requireAuth,
  boundConcurrentUploads,
  upload.single('image'),
  controller.uploadClubLogo
)
clubRouter.post(
  '/:clubId/banner',
  requireAuth,
  boundConcurrentUploads,
  upload.single('image'),
  controller.uploadClubBanner
)
clubRouter.post('/:clubId/events', requireAuth, controller.createClubEvent)
clubRouter.get('/:clubId/events', requireAuth, controller.listClubEvents)
clubRouter.delete('/:clubId/events/:eventId', requireAuth, controller.deleteClubEvent)
clubRouter.post('/:clubId/posts', requireAuth, controller.createClubPost)
clubRouter.get('/:clubId/posts', requireAuth, controller.listClubPosts)
clubRouter.get('/:clubId/analytics', requireAuth, controller.getClubAnalytics)

apiRouter.use('/v1/clubs', clubRouter)
apiRouter.use('/clubs', clubRouter)

// Section 14: Internships mounted on /api/v1/internships and /api/internships
const internshipRouter = Router()
internshipRouter.post('/companies', requireAuth, controller.createCompany)
internshipRouter.get('/companies', requireAuth, controller.listCompanies)
internshipRouter.get('/companies/:companyId', requireAuth, controller.getCompanyById)
internshipRouter.patch('/companies/:companyId', requireAuth, controller.updateCompany)

internshipRouter.post('/', requireAuth, controller.createInternship)
internshipRouter.get('/', optionalAuth, controller.listInternships)
internshipRouter.get('/my-applications', requireAuth, controller.getMyApplications)
internshipRouter.get('/applications/me', requireAuth, controller.getMyApplications)
internshipRouter.get('/:internshipId', optionalAuth, controller.getInternshipById)
internshipRouter.patch('/:internshipId', requireAuth, controller.updateInternship)
internshipRouter.delete('/:internshipId', requireAuth, controller.deleteInternship)

internshipRouter.post('/:internshipId/apply', requireAuth, controller.applyForInternship)
internshipRouter.post('/:internshipId/withdraw', requireAuth, controller.withdrawApplication)
internshipRouter.get(
  '/:internshipId/applications',
  requireAuth,
  controller.listInternshipApplications
)
internshipRouter.patch(
  '/applications/:applicationId/status',
  requireAuth,
  controller.updateApplicationStatus
)
internshipRouter.post(
  '/resume',
  requireAuth,
  boundConcurrentUploads,
  uploadResume.single('resume'),
  controller.uploadResume
)
internshipRouter.post(
  '/upload-resume',
  requireAuth,
  boundConcurrentUploads,
  uploadResume.single('resume'),
  controller.uploadResume
)

apiRouter.use('/v1/internships', internshipRouter)
apiRouter.use('/internships', internshipRouter)

// Section 20: Alumni Network mounted on /api/v1/alumni and /api/alumni
const alumniRouter = Router()
alumniRouter.post('/profile', requireAuth, controller.upsertAlumniProfile)
alumniRouter.get('/profile/:userId', optionalAuth, controller.getAlumniProfile)
alumniRouter.get('/directory', optionalAuth, controller.searchAlumniDirectory)
alumniRouter.post('/verification/approve', requireAuth, controller.approveAlumniVerification)
alumniRouter.post('/connections', requireAuth, controller.sendAlumniConnectionRequest)
alumniRouter.patch(
  '/connections/:connectionId',
  requireAuth,
  controller.updateAlumniConnectionStatus
)
alumniRouter.get('/connections', requireAuth, controller.listUserAlumniConnections)
alumniRouter.post('/mentorship/sessions', requireAuth, controller.requestMentorshipSession)
alumniRouter.patch(
  '/mentorship/sessions/:sessionId',
  requireAuth,
  controller.updateMentorshipSession
)
alumniRouter.get('/mentorship/sessions', requireAuth, controller.listMentorshipSessions)
alumniRouter.post('/referrals', requireAuth, controller.createAlumniReferral)
alumniRouter.get('/referrals', optionalAuth, controller.listAlumniReferrals)
alumniRouter.post('/events', requireAuth, controller.createAlumniEvent)
alumniRouter.get('/events', optionalAuth, controller.listAlumniEvents)

apiRouter.use('/v1/alumni', alumniRouter)
apiRouter.use('/alumni', alumniRouter)

// Section 21: Notifications mounted on /api/v1/notifications and /api/notifications
const notificationRouter = Router()
notificationRouter.get('/stream', requireAuth, (req, res) => {
  const userId = (req as AuthenticatedRequest).user.id
  res.status(200).set({
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache, no-transform',
    Connection: 'keep-alive',
    'X-Accel-Buffering': 'no',
  })
  res.flushHeaders?.()
  const unsubscribe = subscribe(userId, res)
  req.on('close', unsubscribe)
})
notificationRouter.get('/', requireAuth, controller.listNotifications)
notificationRouter.get('/unread-count', requireAuth, controller.getNotificationUnreadCount)
notificationRouter.get('/:notificationId', requireAuth, controller.getNotificationById)
notificationRouter.post('/read', requireAuth, controller.markNotificationsAsRead)
notificationRouter.post('/read-all', requireAuth, controller.markAllNotificationsAsRead)
notificationRouter.patch('/:notificationId/archive', requireAuth, controller.archiveNotification)
notificationRouter.delete('/:notificationId', requireAuth, controller.deleteNotification)
notificationRouter.get('/preferences', requireAuth, controller.getNotificationPreferences)
notificationRouter.patch('/preferences', requireAuth, controller.updateNotificationPreferences)
notificationRouter.post('/devices', requireAuth, controller.registerDeviceToken)
notificationRouter.get('/devices', requireAuth, controller.listDeviceTokens)
notificationRouter.delete('/devices/:token', requireAuth, controller.revokeDeviceToken)

apiRouter.use('/v1/notifications', notificationRouter)
apiRouter.use('/notifications', notificationRouter)

// Section 25: Admin Dashboard mounted on /api/v1/admin and /api/admin
const adminRouter = Router()
adminRouter.get('/summary', requireAuth, controller.getAdminDashboardMetrics)
adminRouter.get('/metrics', requireAuth, controller.getAdminDashboardMetrics)
adminRouter.get('/users', requireAuth, controller.listAdminUsers)
adminRouter.patch('/users/:targetUserId', requireAuth, controller.updateAdminUserRoleStatus)
adminRouter.patch(
  '/users/:targetUserId/role-status',
  requireAuth,
  controller.updateAdminUserRoleStatus
)
adminRouter.get('/verification/queue', requireAuth, controller.listAdminVerificationQueue)
adminRouter.get('/verification-queue', requireAuth, controller.listAdminVerificationQueue)
adminRouter.post('/verification/approve', requireAuth, controller.approveAlumniVerification)
adminRouter.post(
  '/verification/:verificationId/approve',
  requireAuth,
  controller.approveAdminVerificationById
)
adminRouter.post(
  '/verification/:verificationId/reject',
  requireAuth,
  controller.rejectAdminVerificationById
)
adminRouter.get('/reports/queue', requireAuth, controller.listAdminReportsQueue)
adminRouter.get('/reports', requireAuth, controller.listAdminReportsQueue)
adminRouter.post('/moderation/action', requireAuth, controller.applyAdminModerationAction)
adminRouter.post('/moderation', requireAuth, controller.applyAdminModerationAction)
adminRouter.get('/audit-logs', requireAuth, controller.listAdminAuditLogs)
adminRouter.get('/audit-logs/export', requireAuth, controller.exportAdminAuditLogs)
adminRouter.get('/settings', requireAuth, controller.getAdminSystemSettings)
adminRouter.patch('/settings', requireAuth, controller.updateAdminSystemSetting)
adminRouter.put('/settings', requireAuth, controller.updateAdminSystemSetting)
adminRouter.post('/announcements', requireAuth, controller.createAdminAnnouncement)
adminRouter.get('/announcements', requireAuth, controller.listAdminAnnouncements)

apiRouter.use('/v1/admin', adminRouter)
apiRouter.use('/admin', adminRouter)

// General resource listing (communities and campus events)
apiRouter.get('/communities', optionalAuth, controller.listCommunities)
apiRouter.get('/v1/communities', optionalAuth, controller.listCommunities)
apiRouter.get('/events', optionalAuth, controller.listEvents)
apiRouter.get('/v1/events', optionalAuth, controller.listEvents)

export default apiRouter
