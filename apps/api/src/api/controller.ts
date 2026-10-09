/**
 * HTTP controllers for every API feature.
 * Each handler keeps the previous status codes and response bodies.
 */
import { enqueueProfileSync } from '../../config/leetcode.queue'
import { sendError } from '../../lib/send-error'
import * as api from './service'
import {
  MSG_FAILED_TO_CREATE_COMMENT,
  MSG_FAILED_TO_DELETE_COVER_IMAGE,
  MSG_FAILED_TO_DELETE_COVER_IMAGE,
  MSG_FAILED_TO_DELETE_PROFILE_PICTURE,
  MSG_FAILED_TO_DELETE_PROFILE_PICTURE,
  MSG_FAILED_TO_FETCH_LEADERBOARD,
  MSG_FAILED_TO_FETCH_LEADERBOARD,
  MSG_FAILED_TO_FETCH_PROFILE,
  MSG_FAILED_TO_SYNC_LEETCODE,
  MSG_FAILED_TO_UPDATE_PROFILE,
  MSG_FAILED_TO_UPLOAD_COVER_IMAGE,
  MSG_FAILED_TO_UPLOAD_PROFILE_PICTURE,
  MSG_LEADERBOARD_USER_NOT_FOUND,
  MSG_LEETCODE_SYNC_QUEUED,
  MSG_LEETCODE_SYNC_RATE_LIMITED,
  MSG_PROFILE_NOT_FOUND,
} from '@lumina/constants'
import { logger } from '@lumina/observability'
import { createCallSchema, respondInviteSchema } from '@lumina/validators'

import type { AuthRequest } from '../../middleware'
import type { AuthenticatedRequest, UsernameParams } from '@lumina/contracts'
import type { Request, Response } from 'express'

// Friends HTTP handlers
export async function sendFriendRequest(req: Request, res: Response) {
  try {
    const { user } = req as AuthenticatedRequest
    const result = await api.sendFriendRequest(user.id, req.params.userId as string)
    return res.status(201).json(result)
  } catch (err) {
    return sendError(res, err)
  }
}

export async function acceptFriendRequest(req: Request, res: Response) {
  try {
    const { user } = req as AuthenticatedRequest
    const result = await api.acceptFriendRequest(user.id, req.params.requestId as string)
    return res.status(200).json(result)
  } catch (err) {
    return sendError(res, err)
  }
}

export async function rejectFriendRequest(req: Request, res: Response) {
  try {
    const { user } = req as AuthenticatedRequest
    const result = await api.rejectFriendRequest(user.id, req.params.requestId as string)
    return res.status(200).json(result)
  } catch (err) {
    return sendError(res, err)
  }
}

export async function cancelFriendRequest(req: Request, res: Response) {
  try {
    const { user } = req as AuthenticatedRequest
    const result = await api.cancelFriendRequest(user.id, req.params.requestId as string)
    return res.status(200).json(result)
  } catch (err) {
    return sendError(res, err)
  }
}

export async function unfriend(req: Request, res: Response) {
  try {
    const { user } = req as AuthenticatedRequest
    const result = await api.unfriend(user.id, req.params.friendId as string)
    return res.status(200).json(result)
  } catch (err) {
    return sendError(res, err)
  }
}

export async function getMyFriends(req: Request, res: Response) {
  try {
    const { user } = req as AuthenticatedRequest
    const friends = await api.getMyFriends(user.id)
    return res.status(200).json(friends)
  } catch (err) {
    return sendError(res, err)
  }
}

export async function getIncomingRequests(req: Request, res: Response) {
  try {
    const { user } = req as AuthenticatedRequest
    const requests = await api.getIncomingRequests(user.id)
    return res.status(200).json(requests)
  } catch (err) {
    return sendError(res, err)
  }
}

export async function getOutgoingRequests(req: Request, res: Response) {
  try {
    const { user } = req as AuthenticatedRequest
    const requests = await api.getOutgoingRequests(user.id)
    return res.status(200).json(requests)
  } catch (err) {
    return sendError(res, err)
  }
}

export async function getMutualFriends(req: Request, res: Response) {
  try {
    const { user } = req as AuthenticatedRequest
    const friends = await api.getMutualFriends(user.id, req.params.userId as string)
    return res.status(200).json(friends)
  } catch (err) {
    return sendError(res, err)
  }
}

// Chat HTTP handlers
export async function getChatToken(req: Request & AuthenticatedRequest, res: Response) {
  try {
    const userId = req.user.id
    const token = await api.generateChatToken(userId)

    return res.status(200).json({
      success: true,
      token,
    })
  } catch (error: any) {
    console.error('GET CHAT TOKEN ERROR:', error)

    if (error.message === 'USER_NOT_FOUND') {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      })
    }

    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    })
  }
}

export const createOneToOneConversation = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user.id

    const { otherUserId } = req.body

    if (!otherUserId) {
      return res.status(400).json({
        success: false,
        message: 'otherUserId is required',
      })
    }

    const conversation = await api.createOneToOneConversation({
      userId,
      otherUserId,
    })

    return res.status(201).json({
      success: true,
      conversation,
    })
  } catch (error: any) {
    console.error('CREATE CONVERSATION ERROR:', error)

    if (error.message === 'USER_NOT_FOUND') {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      })
    }

    if (error.message === 'CANNOT_CHAT_WITH_SELF') {
      return res.status(400).json({
        success: false,
        message: 'You cannot chat with yourself',
      })
    }

    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    })
  }
}

export const getMyConversations = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user.id
    const conversations = await api.getMyConversations(userId)

    return res.status(200).json({
      success: true,
      conversations,
    })
  } catch (error) {
    console.error('GET CONVERSATIONS ERROR:', error)

    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    })
  }
}

// Video HTTP handlers
function userIdOf(req: Request) {
  return (req as AuthRequest).user?.id
}

export const getVideoToken = async (req: Request, res: Response) => {
  try {
    const userId = userIdOf(req)
    if (!userId) {
      return res.status(401).json({ message: 'UNAUTHORIZED' })
    }
    const tokenData = await api.generateVideoToken(userId)
    return res.status(200).json(tokenData)
  } catch (error) {
    logger.error('Failed to generate video token', { metadata: { error: String(error) } })
    return sendError(res, error)
  }
}

export const createCall = async (req: Request, res: Response) => {
  try {
    const userId = userIdOf(req)
    if (!userId) {
      return res.status(401).json({ message: 'UNAUTHORIZED' })
    }
    const parsed = createCallSchema.safeParse(req.body)
    if (!parsed.success) {
      return res.status(400).json({ message: 'INVALID_CALL_PAYLOAD' })
    }
    const callData = await api.createCall({
      userId,
      type: parsed.data.type,
      title: parsed.data.title,
      participantIds: parsed.data.participantIds,
    })
    return res.status(201).json(callData)
  } catch (error) {
    return sendError(res, error)
  }
}

export const getCallDetails = async (req: Request, res: Response) => {
  try {
    const userId = userIdOf(req)
    if (!userId) {
      return res.status(401).json({ message: 'UNAUTHORIZED' })
    }
    const { callId } = req.params
    const call = await api.getCallDetails(callId as string, userId)
    return res.status(200).json(call)
  } catch (error) {
    return sendError(res, error)
  }
}

export const joinCall = async (req: Request, res: Response) => {
  try {
    const userId = userIdOf(req)
    if (!userId) {
      return res.status(401).json({ message: 'UNAUTHORIZED' })
    }
    const { callId } = req.params
    const joinData = await api.joinCall(callId as string, userId)
    return res.status(200).json(joinData)
  } catch (error) {
    return sendError(res, error)
  }
}

export const respondToInvite = async (req: Request, res: Response) => {
  try {
    const userId = userIdOf(req)
    if (!userId) {
      return res.status(401).json({ message: 'UNAUTHORIZED' })
    }
    const { callId } = req.params
    const parsed = respondInviteSchema.safeParse(req.body)
    if (!parsed.success) {
      return res.status(400).json({ message: 'INVALID_RESPONSE' })
    }
    const result = await api.respondToCallInvite(
      callId as string,
      userId,
      parsed.data.response as 'ACCEPT' | 'REJECT'
    )
    return res.status(200).json(result)
  } catch (error) {
    return sendError(res, error)
  }
}

export const endCall = async (req: Request, res: Response) => {
  try {
    const userId = userIdOf(req)
    if (!userId) {
      return res.status(401).json({ message: 'UNAUTHORIZED' })
    }
    const { callId } = req.params
    const result = await api.endCall(callId as string, userId)
    return res.status(200).json(result)
  } catch (error) {
    return sendError(res, error)
  }
}

export const getCallHistory = async (req: Request, res: Response) => {
  try {
    const userId = userIdOf(req)
    if (!userId) {
      return res.status(401).json({ message: 'UNAUTHORIZED' })
    }
    const history = await api.getCallHistory(userId)
    return res.status(200).json(history)
  } catch (error) {
    logger.error('Failed to fetch call history', { metadata: { error: String(error) } })
    return res.status(500).json({ message: 'SERVER_ERROR' })
  }
}

// Leaderboard HTTP handlers
export async function getLeaderboard(req: Request, res: Response) {
  try {
    const { page, limit } = api.parsePagination(req.query)
    const leaderboard = await api.getLeaderboard(page, limit)

    return res.json(leaderboard)
  } catch (err) {
    console.error('[leaderboard] Failed to fetch leaderboard:', err)

    return res.status(500).json({
      message: MSG_FAILED_TO_FETCH_LEADERBOARD,
    })
  }
}

export async function getMyLeaderboardStats(req: Request, res: Response) {
  try {
    const { user } = req as AuthenticatedRequest
    const stats = await api.getMyLeaderboardStats(user.id)

    return res.json({
      rank: stats.rank,
      solvedCount: stats.solvedCount,
      totalUsers: stats.totalUsers,
    })
  } catch (err) {
    console.error('[leaderboard] Failed to fetch my stats:', err)

    return res.status(500).json({
      message: MSG_FAILED_TO_FETCH_LEADERBOARD,
    })
  }
}

export async function getLeaderboardAroundMe(req: Request, res: Response) {
  try {
    const { user } = req as AuthenticatedRequest
    const result = await api.getLeaderboardAroundUser(user.id)

    return res.json(result)
  } catch (err) {
    console.error('[leaderboard] Failed to fetch around-me leaderboard:', err)

    return res.status(500).json({
      message: MSG_FAILED_TO_FETCH_LEADERBOARD,
    })
  }
}

export async function getUserLeaderboardStats(req: Request, res: Response) {
  try {
    const stats = await api.getUserLeaderboardStats(req.params.userId as string)

    if (!stats) {
      return res.status(404).json({
        message: MSG_LEADERBOARD_USER_NOT_FOUND,
      })
    }

    return res.json(stats)
  } catch (err) {
    console.error('[leaderboard] Failed to fetch user stats:', err)

    return res.status(500).json({
      message: MSG_FAILED_TO_FETCH_LEADERBOARD,
    })
  }
}

// LeetCode HTTP handlers
export async function manualSyncLeetCode(req: Request, res: Response) {
  try {
    const { user } = req as AuthenticatedRequest
    const profile = await api.findProfileByUserId(user.id)

    if (!profile) {
      return res.status(404).json({ message: MSG_PROFILE_NOT_FOUND })
    }

    if (!profile.leetcodeUsername) {
      return res.status(400).json({
        message: 'LeetCode username is not linked to your profile',
      })
    }

    const allowed = await api.canManualSync(user.id)
    if (!allowed) {
      const retryAfterSeconds = await api.getManualSyncCooldownSeconds(user.id)
      return res.status(429).json({
        message: MSG_LEETCODE_SYNC_RATE_LIMITED,
        retryAfterSeconds,
      })
    }

    await api.recordManualSync(user.id)

    const job = await enqueueProfileSync(profile.id, { priority: 1 })

    return res.status(202).json({
      message: MSG_LEETCODE_SYNC_QUEUED,
      jobId: job.id,
    })
  } catch (err) {
    console.error('[leetcode] Manual sync failed:', err)

    return res.status(500).json({
      message: MSG_FAILED_TO_SYNC_LEETCODE,
      error: err instanceof Error ? err.message : String(err),
    })
  }
}

// Comments HTTP handlers
export async function createCommentHandler(req: AuthenticatedRequest, res: Response) {
  try {
    const userId = req.user.id
    const { postId } = req.params
    const { content, parentId } = req.body

    const comment = await api.createCommentService({
      postId: postId as string,
      userId,
      content,
      parentId,
    })

    res.status(201).json(comment)
  } catch (err: any) {
    const status = err.status || 500
    res.status(status).json({ message: err.message || 'Failed to create comment' })
  }
}

export async function getCommentsForPostHandler(req: AuthenticatedRequest, res: Response) {
  try {
    const { postId } = req.params
    const { cursor, limit } = req.query

    const result = await api.getCommentsForPostService(
      postId as string,
      cursor as string | undefined,
      limit ? parseInt(limit as string, 10) : 20
    )

    res.status(200).json({
      success: true,
      data: result.comments,
      comments: result.comments,
      nextCursor: result.nextCursor,
    })
  } catch (err: any) {
    const status = err.status || 500
    res.status(status).json({ message: err.message || 'Failed to fetch comments' })
  }
}

export async function editCommentHandler(req: AuthenticatedRequest, res: Response) {
  try {
    const userId = req.user.id
    const { commentId } = req.params
    const { content } = req.body

    const comment = await api.editCommentService({
      commentId: commentId as string,
      userId,
      content,
    })

    res.status(200).json(comment)
  } catch (err: any) {
    const status = err.status || 500
    res.status(status).json({ message: err.message || 'Failed to edit comment' })
  }
}

export async function getCommentEditHistoryHandler(req: AuthenticatedRequest, res: Response) {
  try {
    const { commentId } = req.params

    const history = await api.getCommentEditHistoryService(commentId as string)

    res.status(200).json(history)
  } catch (err: any) {
    const status = err.status || 500
    res.status(status).json({ message: err.message || 'Failed to fetch comment edit history' })
  }
}

export async function deleteCommentHandler(req: AuthenticatedRequest, res: Response) {
  try {
    const userId = req.user.id
    const userRole = (req.user as any).role
    const { commentId } = req.params

    const comment = await api.deleteCommentService({
      commentId: commentId as string,
      userId,
      userRole,
    })

    res.status(200).json({ message: 'Comment deleted successfully', comment })
  } catch (err: any) {
    const status = err.status || 500
    res.status(status).json({ message: err.message || 'Failed to delete comment' })
  }
}

export async function toggleReactionHandler(req: AuthenticatedRequest, res: Response) {
  try {
    const userId = req.user.id
    const { commentId } = req.params
    const { emoji } = req.body

    const result = await api.toggleReactionService({
      commentId: commentId as string,
      userId,
      emoji,
    })

    res.status(200).json(result)
  } catch (err: any) {
    const status = err.status || 500
    res.status(status).json({ message: err.message || 'Failed to update reaction' })
  }
}

export async function removeReactionHandler(req: AuthenticatedRequest, res: Response) {
  try {
    const userId = req.user.id
    const { commentId } = req.params
    const { emoji } = req.body

    const result = await api.removeReactionService({
      commentId: commentId as string,
      userId,
      emoji,
    })

    res.status(200).json(result)
  } catch (err: any) {
    const status = err.status || 500
    res.status(status).json({ message: err.message || 'Failed to remove reaction' })
  }
}

export async function togglePinHandler(req: AuthenticatedRequest, res: Response) {
  try {
    const userId = req.user.id
    const userRole = (req.user as any).role
    const { commentId } = req.params

    const comment = await api.togglePinCommentService({
      commentId: commentId as string,
      userId,
      userRole,
    })

    res.status(200).json(comment)
  } catch (err: any) {
    const status = err.status || 500
    res.status(status).json({ message: err.message || 'Failed to pin/unpin comment' })
  }
}

export async function reportCommentHandler(req: AuthenticatedRequest, res: Response) {
  try {
    const reporterUserId = req.user.id
    const { commentId } = req.params
    const { reason, details } = req.body

    const report = await api.reportCommentService({
      commentId: commentId as string,
      reporterUserId,
      reason,
      details,
    })

    res.status(201).json(report)
  } catch (err: any) {
    const status = err.status || 500
    res.status(status).json({ message: err.message || 'Failed to report comment' })
  }
}

// Study group HTTP handlers
function userId(req: Request) {
  return (req as AuthenticatedRequest).user.id
}

function groupId(req: Request) {
  return String(req.params.groupId ?? req.params.id)
}

function ifMatch(req: Request) {
  const header = req.header('If-Match')
  return header ?? undefined
}

async function respond(req: Request, res: Response, status: number, run: () => Promise<unknown>) {
  try {
    const key = req.header('Idempotency-Key') ?? undefined
    if (key && req.method !== 'GET') {
      const cached = await api.readIdempotentResponse(userId(req), key)
      if (cached) return res.status(cached.status).json(cached.body)
    }
    const body = await run()
    if (key && req.method !== 'GET') {
      await api.writeIdempotentResponse(userId(req), key, { status, body })
    }
    return res.status(status).json(body)
  } catch (error) {
    return sendError(res, error)
  }
}

export const createStudyGroup = (req: Request, res: Response) =>
  respond(req, res, 201, () => api.createStudyGroup(userId(req), req.body))

export const getStudyGroup = (req: Request, res: Response) =>
  respond(req, res, 200, () => api.listStudyGroups(userId(req)))

export const getStudyGroupById = (req: Request, res: Response) =>
  respond(req, res, 200, () => api.getStudyGroupById(userId(req), groupId(req)))

export const updateStudyGroup = (req: Request, res: Response) =>
  respond(req, res, 200, () =>
    api.updateStudyGroup(userId(req), groupId(req), req.body, ifMatch(req))
  )

export const deleteStudyGroup = (req: Request, res: Response) =>
  respond(req, res, 200, () => api.deleteStudyGroup(userId(req), groupId(req)))

export const joinStudyGroup = (req: Request, res: Response) =>
  respond(req, res, 200, () => api.joinStudyGroup(userId(req), groupId(req)))

export const leaveStudyGroup = (req: Request, res: Response) =>
  respond(req, res, 200, () => api.leaveStudyGroup(userId(req), groupId(req)))

export const getStudyGroupMembers = (req: Request, res: Response) =>
  respond(req, res, 200, () => api.getStudyGroupMembers(userId(req), groupId(req)))

export const inviteMember = (req: Request, res: Response) =>
  respond(req, res, 201, () => api.inviteMember(userId(req), groupId(req), req.body))

export const updateMemberRole = (req: Request, res: Response) =>
  respond(req, res, 200, () =>
    api.updateMemberRole(userId(req), groupId(req), String(req.params.userId), req.body)
  )

export const removeMember = (req: Request, res: Response) =>
  respond(req, res, 200, () =>
    api.removeMember(userId(req), groupId(req), String(req.params.userId))
  )

export const createDiscussion = (req: Request, res: Response) =>
  respond(req, res, 201, () => api.createDiscussion(userId(req), groupId(req), req.body))

export const listDiscussions = (req: Request, res: Response) =>
  respond(req, res, 200, () => api.listDiscussions(userId(req), groupId(req)))

export const getDiscussion = (req: Request, res: Response) =>
  respond(req, res, 200, () =>
    api.getDiscussion(userId(req), groupId(req), String(req.params.discussionId))
  )

export const updateDiscussion = (req: Request, res: Response) =>
  respond(req, res, 200, () =>
    api.updateDiscussion(userId(req), groupId(req), String(req.params.discussionId), req.body)
  )

export const deleteDiscussion = (req: Request, res: Response) =>
  respond(req, res, 200, () =>
    api.deleteDiscussion(userId(req), groupId(req), String(req.params.discussionId))
  )

export const createReply = (req: Request, res: Response) =>
  respond(req, res, 201, () =>
    api.createReply(userId(req), groupId(req), String(req.params.discussionId), req.body)
  )

export const listReplies = (req: Request, res: Response) =>
  respond(req, res, 200, () =>
    api.listReplies(userId(req), groupId(req), String(req.params.discussionId))
  )

export const updateReply = (req: Request, res: Response) =>
  respond(req, res, 200, () =>
    api.updateReply(
      userId(req),
      groupId(req),
      String(req.params.discussionId),
      String(req.params.replyId),
      req.body
    )
  )

export const deleteReply = (req: Request, res: Response) =>
  respond(req, res, 200, () =>
    api.deleteReply(
      userId(req),
      groupId(req),
      String(req.params.discussionId),
      String(req.params.replyId)
    )
  )

export const createNote = (req: Request, res: Response) =>
  respond(req, res, 201, () => api.createNote(userId(req), groupId(req), req.body))

export const listNotes = (req: Request, res: Response) =>
  respond(req, res, 200, () => api.listNotes(userId(req), groupId(req)))

export const getNote = (req: Request, res: Response) =>
  respond(req, res, 200, () => api.getNote(userId(req), groupId(req), String(req.params.noteId)))

export const updateNote = (req: Request, res: Response) =>
  respond(req, res, 200, () =>
    api.updateNote(userId(req), groupId(req), String(req.params.noteId), req.body, ifMatch(req))
  )

export const deleteNote = (req: Request, res: Response) =>
  respond(req, res, 200, () => api.deleteNote(userId(req), groupId(req), String(req.params.noteId)))

export const listNoteVersions = (req: Request, res: Response) =>
  respond(req, res, 200, () =>
    api.listNoteVersions(userId(req), groupId(req), String(req.params.noteId))
  )

export const getNoteVersion = (req: Request, res: Response) =>
  respond(req, res, 200, () =>
    api.getNoteVersion(
      userId(req),
      groupId(req),
      String(req.params.noteId),
      String(req.params.version)
    )
  )

export const createFileUploadUrl = (req: Request, res: Response) =>
  respond(req, res, 200, () => api.createFileUploadUrl(userId(req), groupId(req), req.body))

export const registerFile = (req: Request, res: Response) =>
  respond(req, res, 201, () => api.registerFile(userId(req), groupId(req), req.body))

export const listFiles = (req: Request, res: Response) =>
  respond(req, res, 200, () => api.listFiles(userId(req), groupId(req)))

export const getFile = (req: Request, res: Response) =>
  respond(req, res, 200, () => api.getFile(userId(req), groupId(req), String(req.params.fileId)))

export const getFileDownloadUrl = (req: Request, res: Response) =>
  respond(req, res, 200, () =>
    api.getFileDownloadUrl(userId(req), groupId(req), String(req.params.fileId))
  )

export const deleteFile = (req: Request, res: Response) =>
  respond(req, res, 200, () =>
    api.deleteStudyGroupFile(userId(req), groupId(req), String(req.params.fileId))
  )

export const upsertTimetable = (req: Request, res: Response) =>
  respond(req, res, 200, () =>
    api.upsertTimetable(userId(req), groupId(req), req.body, ifMatch(req))
  )

export const getTimetable = (req: Request, res: Response) =>
  respond(req, res, 200, () => api.getTimetable(userId(req), groupId(req)))

export const deleteTimetable = (req: Request, res: Response) =>
  respond(req, res, 200, () => api.deleteTimetable(userId(req), groupId(req)))

export const listTimetableVersions = (req: Request, res: Response) =>
  respond(req, res, 200, () => api.listTimetableVersions(userId(req), groupId(req)))

export const searchAll = (req: Request, res: Response) =>
  respond(req, res, 200, () => api.searchAll(userId(req), { q: String(req.query.q ?? '') }))

export const searchInGroup = (req: Request, res: Response) =>
  respond(req, res, 200, () =>
    api.searchInGroup(userId(req), groupId(req), { q: String(req.query.q ?? '') })
  )

export const openGroupChat = (req: Request, res: Response) =>
  respond(req, res, 200, () => api.openGroupChat(userId(req), groupId(req)))

export const getGroupChat = (req: Request, res: Response) =>
  respond(req, res, 200, () => api.getGroupChat(userId(req), groupId(req)))

export const listAuditEvents = (req: Request, res: Response) =>
  respond(req, res, 200, () => api.listAuditEvents(userId(req), groupId(req)))

// --- Club HTTP handlers ---
export const createClub = (req: Request, res: Response) =>
  respond(req, res, 201, () => api.createClub(userId(req), req.body))

export const listClubs = (req: Request, res: Response) =>
  respond(req, res, 200, () => api.listClubs(userId(req), req.query))

export const getClubById = (req: Request, res: Response) =>
  respond(req, res, 200, () => api.getClubById(userId(req), String(req.params.clubId)))

export const updateClub = (req: Request, res: Response) =>
  respond(req, res, 200, () => api.updateClub(userId(req), String(req.params.clubId), req.body))

export const archiveClub = (req: Request, res: Response) =>
  respond(req, res, 200, () => api.archiveClub(userId(req), String(req.params.clubId)))

export const joinClub = (req: Request, res: Response) =>
  respond(req, res, 200, () => api.joinClub(userId(req), String(req.params.clubId)))

export const leaveClub = (req: Request, res: Response) =>
  respond(req, res, 200, () => api.leaveClub(userId(req), String(req.params.clubId)))

export const listClubMembers = (req: Request, res: Response) =>
  respond(req, res, 200, () => api.listClubMembers(userId(req), String(req.params.clubId)))

export const inviteClubMember = (req: Request, res: Response) =>
  respond(req, res, 201, () =>
    api.inviteClubMember(userId(req), String(req.params.clubId), req.body)
  )

export const respondClubInvitation = (req: Request, res: Response) =>
  respond(req, res, 200, () =>
    api.respondClubInvitation(userId(req), String(req.params.invitationId), req.body)
  )

export const updateClubMemberRole = (req: Request, res: Response) =>
  respond(req, res, 200, () =>
    api.updateClubMemberRole(
      userId(req),
      String(req.params.clubId),
      String(req.params.userId),
      req.body
    )
  )

export const removeClubMember = (req: Request, res: Response) =>
  respond(req, res, 200, () =>
    api.removeClubMember(userId(req), String(req.params.clubId), String(req.params.userId))
  )

export const uploadClubLogo = async (req: Request, res: Response) => {
  try {
    const result = await api.uploadClubLogo(userId(req), String(req.params.clubId), req.file!)
    return res.status(200).json(result)
  } catch (err) {
    return sendError(res, err)
  }
}

export const uploadClubBanner = async (req: Request, res: Response) => {
  try {
    const result = await api.uploadClubBanner(userId(req), String(req.params.clubId), req.file!)
    return res.status(200).json(result)
  } catch (err) {
    return sendError(res, err)
  }
}

export const createClubEvent = (req: Request, res: Response) =>
  respond(req, res, 201, () =>
    api.createClubEvent(userId(req), String(req.params.clubId), req.body)
  )

export const listClubEvents = (req: Request, res: Response) =>
  respond(req, res, 200, () => api.listClubEvents(userId(req), String(req.params.clubId)))

export const deleteClubEvent = (req: Request, res: Response) =>
  respond(req, res, 200, () =>
    api.deleteClubEvent(userId(req), String(req.params.clubId), String(req.params.eventId))
  )

export const createClubPost = (req: Request, res: Response) =>
  respond(req, res, 201, () => api.createClubPost(userId(req), String(req.params.clubId), req.body))

export const listClubPosts = (req: Request, res: Response) =>
  respond(req, res, 200, () => api.listClubPosts(userId(req), String(req.params.clubId)))

export const getClubAnalytics = (req: Request, res: Response) =>
  respond(req, res, 200, () => api.getClubAnalytics(userId(req), String(req.params.clubId)))

// --- Section 14: Internship Portal HTTP Controllers ---

export const createCompany = (req: Request, res: Response) =>
  respond(req, res, 201, () => api.createCompany(userId(req), req.body))

export const updateCompany = (req: Request, res: Response) =>
  respond(req, res, 200, () =>
    api.updateCompany(userId(req), String(req.params.companyId), req.body)
  )

export const listCompanies = (_req: Request, res: Response) =>
  respond(_req, res, 200, () => api.listCompanies())

export const getCompanyById = (req: Request, res: Response) =>
  respond(req, res, 200, () => api.getCompanyById(String(req.params.companyId)))

export const createInternship = (req: Request, res: Response) =>
  respond(req, res, 201, () => api.createInternship(userId(req), req.body))

export const updateInternship = (req: Request, res: Response) =>
  respond(req, res, 200, () =>
    api.updateInternship(userId(req), String(req.params.internshipId), req.body)
  )

export const deleteInternship = (req: Request, res: Response) =>
  respond(req, res, 200, () => api.deleteInternship(userId(req), String(req.params.internshipId)))

export const listInternships = (req: Request, res: Response) =>
  respond(req, res, 200, () => api.listInternships(req.query))

export const getInternshipById = (req: Request, res: Response) =>
  respond(req, res, 200, () =>
    api.getInternshipById(String(req.params.internshipId), (req as AuthenticatedRequest).user?.id)
  )

export const applyForInternship = (req: Request, res: Response) =>
  respond(req, res, 201, () =>
    api.applyForInternship(userId(req), String(req.params.internshipId), req.body)
  )

export const withdrawApplication = (req: Request, res: Response) =>
  respond(req, res, 200, () =>
    api.withdrawApplication(userId(req), String(req.params.internshipId))
  )

export const getMyApplications = (req: Request, res: Response) =>
  respond(req, res, 200, () => api.getMyApplications(userId(req)))

export const listInternshipApplications = (req: Request, res: Response) =>
  respond(req, res, 200, () =>
    api.listInternshipApplications(userId(req), String(req.params.internshipId))
  )

export const updateApplicationStatus = (req: Request, res: Response) =>
  respond(req, res, 200, () =>
    api.updateApplicationStatus(userId(req), String(req.params.applicationId), req.body)
  )

export const uploadResume = async (req: Request, res: Response) => {
  try {
    const { user } = req as AuthenticatedRequest
    if (!req.file) {
      return res.status(400).json({ message: 'Resume file is required.' })
    }
    const result = await api.uploadResume(user.id, req.file)
    return res.status(200).json(result)
  } catch (err) {
    if (err && typeof err === 'object' && 'status' in err) {
      return sendError(res, err)
    }
    return res.status(500).json({
      message: 'Failed to upload resume.',
    })
  }
}

export const upsertAlumniProfile = (req: Request, res: Response) =>
  respond(req, res, 200, () => api.upsertAlumniProfile(userId(req), req.body))

export const getAlumniProfile = (req: Request, res: Response) =>
  respond(req, res, 200, () => {
    const target = req.params.userId === 'me' ? userId(req) : String(req.params.userId)
    return api.getAlumniProfile(target)
  })

export const searchAlumniDirectory = (req: Request, res: Response) =>
  respond(req, res, 200, () => api.searchAlumniDirectory(req.query))

export const approveAlumniVerification = (req: Request, res: Response) =>
  respond(req, res, 200, () => api.approveAlumniVerification(userId(req), req.body))

export const sendAlumniConnectionRequest = (req: Request, res: Response) =>
  respond(req, res, 201, () => api.sendAlumniConnectionRequest(userId(req), req.body))

export const updateAlumniConnectionStatus = (req: Request, res: Response) =>
  respond(req, res, 200, () =>
    api.updateAlumniConnectionStatus(userId(req), String(req.params.connectionId), req.body)
  )

export const listUserAlumniConnections = (req: Request, res: Response) =>
  respond(req, res, 200, () => api.listUserAlumniConnections(userId(req)))

export const requestMentorshipSession = (req: Request, res: Response) =>
  respond(req, res, 201, () => api.requestMentorshipSession(userId(req), req.body))

export const updateMentorshipSession = (req: Request, res: Response) =>
  respond(req, res, 200, () =>
    api.updateMentorshipSession(userId(req), String(req.params.sessionId), req.body)
  )

export const listMentorshipSessions = (req: Request, res: Response) =>
  respond(req, res, 200, () => api.listMentorshipSessions(userId(req)))

export const createAlumniReferral = (req: Request, res: Response) =>
  respond(req, res, 201, () => api.createAlumniReferral(userId(req), req.body))

export const listAlumniReferrals = (_req: Request, res: Response) =>
  respond(_req, res, 200, () => api.listAlumniReferrals())

export const createAlumniEvent = (req: Request, res: Response) =>
  respond(req, res, 201, () => api.createAlumniEvent(userId(req), req.body))

export const listAlumniEvents = (_req: Request, res: Response) =>
  respond(_req, res, 200, () => api.listAlumniEvents())

export const listNotifications = (req: Request, res: Response) =>
  respond(req, res, 200, () => api.listNotifications(userId(req), req.query))

export const getNotificationById = (req: Request, res: Response) =>
  respond(req, res, 200, () =>
    api.getNotificationById(userId(req), String(req.params.notificationId))
  )

export const getNotificationUnreadCount = (req: Request, res: Response) =>
  respond(req, res, 200, () => api.getNotificationUnreadCount(userId(req)))

export const markNotificationsAsRead = (req: Request, res: Response) =>
  respond(req, res, 200, () => api.markNotificationsAsRead(userId(req), req.body))

export const markAllNotificationsAsRead = (req: Request, res: Response) =>
  respond(req, res, 200, () => api.markAllNotificationsAsRead(userId(req)))

export const archiveNotification = (req: Request, res: Response) =>
  respond(req, res, 200, () =>
    api.archiveNotification(userId(req), String(req.params.notificationId))
  )

export const deleteNotification = (req: Request, res: Response) =>
  respond(req, res, 200, () =>
    api.deleteNotification(userId(req), String(req.params.notificationId))
  )

export const getNotificationPreferences = (req: Request, res: Response) =>
  respond(req, res, 200, () => api.getNotificationPreferences(userId(req)))

export const updateNotificationPreferences = (req: Request, res: Response) =>
  respond(req, res, 200, () => api.updateNotificationPreferences(userId(req), req.body))

export const registerDeviceToken = (req: Request, res: Response) =>
  respond(req, res, 201, () => api.registerDeviceToken(userId(req), req.body))

export const listDeviceTokens = (req: Request, res: Response) =>
  respond(req, res, 200, () => api.listDeviceTokens(userId(req)))

export const revokeDeviceToken = (req: Request, res: Response) =>
  respond(req, res, 200, () => api.revokeDeviceToken(userId(req), String(req.params.token)))

export const getAdminDashboardMetrics = (req: Request, res: Response) =>
  respond(req, res, 200, () => api.getAdminDashboardMetrics(userId(req)))

export const listAdminUsers = (req: Request, res: Response) =>
  respond(req, res, 200, () => api.listAdminUsers(userId(req), req.query))

export const updateAdminUserRoleStatus = (req: Request, res: Response) =>
  respond(req, res, 200, () =>
    api.updateAdminUserRoleStatus(userId(req), String(req.params.targetUserId), req.body)
  )

export const listAdminVerificationQueue = (req: Request, res: Response) =>
  respond(req, res, 200, () => api.listAdminVerificationQueue(userId(req)))

export const approveAdminVerificationById = (req: Request, res: Response) =>
  respond(req, res, 200, () =>
    api.approveAdminVerificationById(
      userId(req),
      String(req.params.verificationId),
      true,
      req.body?.notes
    )
  )

export const rejectAdminVerificationById = (req: Request, res: Response) =>
  respond(req, res, 200, () =>
    api.approveAdminVerificationById(
      userId(req),
      String(req.params.verificationId),
      false,
      req.body?.notes
    )
  )

export const listAdminReportsQueue = (req: Request, res: Response) =>
  respond(req, res, 200, () => api.listAdminReportsQueue(userId(req)))

export const applyAdminModerationAction = (req: Request, res: Response) =>
  respond(req, res, 200, () => api.applyAdminModerationAction(userId(req), req.body))

export const listAdminAuditLogs = (req: Request, res: Response) =>
  respond(req, res, 200, () => api.listAdminAuditLogs(userId(req), req.query))

export const exportAdminAuditLogs = (req: Request, res: Response) =>
  respond(req, res, 200, () => api.exportAdminAuditLogs(userId(req), req.query))

export const getAdminSystemSettings = (req: Request, res: Response) =>
  respond(req, res, 200, () => api.getAdminSystemSettings(userId(req)))

export const updateAdminSystemSetting = (req: Request, res: Response) =>
  respond(req, res, 200, () => api.updateAdminSystemSetting(userId(req), req.body))

export const createAdminAnnouncement = (req: Request, res: Response) =>
  respond(req, res, 201, () => api.createAdminAnnouncement(userId(req), req.body))

export const listAdminAnnouncements = (req: Request, res: Response) =>
  respond(req, res, 200, () => api.listAdminAnnouncements(userId(req)))

export const listCommunities = (_req: Request, res: Response) =>
  respond(_req, res, 200, () => api.listCommunities())

export const listEvents = (_req: Request, res: Response) =>
  respond(_req, res, 200, () => api.listEvents())
