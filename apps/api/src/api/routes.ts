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
} from '../../middleware'
import * as controller from './controller'
import { MSG_PROFILE_ROUTER_WORKS } from '@lumina/constants'
import { Router } from 'express'
import rateLimit from 'express-rate-limit'

import type { AuthenticatedRequest } from '@lumina/contracts'
import type { NextFunction, Request, Response } from 'express'

const apiRouter = Router()

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

export default apiRouter
