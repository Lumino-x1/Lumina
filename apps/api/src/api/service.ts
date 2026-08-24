/**
 * Central API business logic (Prisma + Redis + Stream).
 * Stream clients stay in config/ so chat and video tokens keep working.
 */
import crypto from 'crypto'
import fs from 'fs/promises'
import { randomUUID } from 'node:crypto'
import os from 'os'
import path from 'path'
import { redis } from '../../config/config.redis'
import { streamClient } from '../../config/stream-chat'
import { STREAM_API_KEY, streamVideoClient } from '../../config/stream-video'
import { assertDeclaredMimeMatchesContent } from '../../lib/file-signature'
import {
  badRequest,
  conflict,
  forbidden,
  notFound,
  preconditionFailed,
  unprocessable,
} from '../../lib/http-error'
import ffprobeInstaller from '@ffprobe-installer/ffprobe'
import { prisma } from '@lumina/db'
import { logger } from '@lumina/observability'
import {
  buildStudyGroupObjectKey,
  createPresignedDownloadUrl,
  createPresignedUploadUrl,
  deleteFile,
  deleteFile as deleteStoredFile,
  uploadFile,
} from '@lumina/storage'
import {
  createStudyGroupSchema,
  profileUpdateSchema,
  protectedProfileFields,
  studyGroupDiscussionSchema,
  studyGroupFileRegisterSchema,
  studyGroupFileUploadUrlSchema,
  studyGroupInvitationSchema,
  studyGroupNoteSchema,
  studyGroupReplySchema,
  studyGroupSearchQuerySchema,
  studyGroupTimetableSchema,
  updateStudyGroupDiscussionSchema,
  updateStudyGroupMemberSchema,
  updateStudyGroupNoteSchema,
  updateStudyGroupSchema,
} from '@lumina/validators'
import { Prisma } from '@prisma/client'
import ffmpeg from 'fluent-ffmpeg'
import { imageSize } from 'image-size'

import type { AuthenticatedRequest, CreatePostInput, LeaderboardEntry } from '@lumina/contracts'
import type { Profile, User, Visibility } from '@lumina/db'
import type {
  ParticipantCallStatus,
  VideoCallRole,
  VideoCallStatus,
  VideoCallType,
} from '@prisma/client'
import type { ZodType } from 'zod'

export interface LeetCodeStats {
  username: string
  solvedCount: number
  easySolved: number
  mediumSolved: number
  hardSolved: number
  rating: number | null
  globalRank: number | null
}

export interface ProfileLeetCodeSnapshot {
  id: string
  userId: string
  leetcodeUsername: string | null
  leetcodeSolved: number | null
  leetcodeEasy: number | null
  leetcodeMedium: number | null
  leetcodeHard: number | null
  leetcodeRating: number | null
  leetcodeGlobalRank: number | null
}

export type SyncResult =
  | { status: 'success'; changed: boolean; stats: LeetCodeStats }
  | { status: 'skipped'; reason: string }
  | { status: 'failed'; error: string }

// --- profile/profile.dto.ts ---
namespace ProfileDto {
  const PUBLIC_PROFILE_FIELDS = [
    'id',
    'userId',
    'firstName',
    'lastName',
    'bio',
    'about',
    'profilePicture',
    'coverImage',
    'gender',
    'hometown',
    'location',
    'semester',
    'year',
    'batch',
    'skills',
    'interests',
    'languages',
    'github',
    'linkedin',
    'portfolio',
    'leetcodeUrl',
    'leetcodeUsername',
    'leetcodeRating',
    'leetcodeSolved',
    'leetcodeEasy',
    'leetcodeMedium',
    'leetcodeHard',
    'leetcodeGlobalRank',
    'profileVisibility',
    'hideEmail',
    'hidePhone',
    'hideCgpa',
  ] as const

  type PublicUser = {
    id: string
    username: string | null
    name: string
    image: string | null
    email?: string
    phone?: string
  }

  export type PublicProfileDto = Pick<Profile, (typeof PUBLIC_PROFILE_FIELDS)[number]> & {
    cgpa?: number | null
    user: PublicUser
  }

  type ProfileWithUser = Profile & {
    user: Pick<User, 'id' | 'username' | 'name' | 'image' | 'email' | 'phone' | 'collegeId'>
  }

  export function toOwnerProfileDto(profile: Profile): Profile {
    return profile
  }

  export function canViewProfile(args: {
    visibility: Visibility
    ownerUserId: string
    ownerCollegeId: string | null
    viewerId?: string
    viewerCollegeId?: string | null
    isFriend?: boolean
  }) {
    if (args.viewerId && args.viewerId === args.ownerUserId) {
      return true
    }

    switch (args.visibility) {
      case 'PUBLIC':
        return true
      case 'COLLEGE':
        return Boolean(
          args.viewerCollegeId &&
          args.ownerCollegeId &&
          args.viewerCollegeId === args.ownerCollegeId
        )
      case 'FRIENDS':
        return Boolean(args.isFriend)
      case 'PRIVATE':
        return false
      default:
        return false
    }
  }

  export function toPublicProfileDto(
    profile: ProfileWithUser,
    options: { isOwner: boolean }
  ): PublicProfileDto {
    const base = Object.fromEntries(
      PUBLIC_PROFILE_FIELDS.map((field) => [field, profile[field]])
    ) as Pick<Profile, (typeof PUBLIC_PROFILE_FIELDS)[number]>

    const user: PublicUser = {
      id: profile.user.id,
      username: profile.user.username,
      name: profile.user.name,
      image: profile.user.image,
    }

    if (options.isOwner || !profile.hideEmail) {
      user.email = profile.user.email
    }
    if (options.isOwner || !profile.hidePhone) {
      user.phone = profile.user.phone ?? undefined
    }

    return {
      ...base,
      cgpa: options.isOwner || !profile.hideCgpa ? profile.cgpa : undefined,
      user,
    }
  }

  export const publicUserSelect = {
    id: true,
    username: true,
    name: true,
    image: true,
    email: true,
    phone: true,
    collegeId: true,
  } as const
}

// --- profile/profile.repo.ts ---
namespace ProfileRepo {
  export async function findByUserId(userId: string) {
    return prisma.profile.findUnique({
      where: {
        userId,
      },
    })
  }

  export async function findByUsername(username: string) {
    return prisma.profile.findFirst({
      where: {
        user: {
          username,
        },
      },
      include: {
        user: true,
      },
    })
  }

  export async function updateProfile(userId: string, data: Prisma.ProfileUncheckedUpdateInput) {
    const firstName = typeof data.firstName === 'string' ? data.firstName : 'Student'
    const lastName = typeof data.lastName === 'string' ? data.lastName : 'User'

    return prisma.profile.upsert({
      where: { userId },
      update: data,
      create: {
        ...(data as Prisma.ProfileUncheckedCreateInput),
        userId,
        firstName,
        lastName,
      },
    })
  }

  export const updateProfilePicture = async (
    userId: string,
    profileImageUrl: string,
    profileImageKey: string
  ) => {
    return prisma.profile.update({
      where: {
        userId,
      },
      data: {
        profilePicture: profileImageUrl,
        profilePictureKey: profileImageKey,
      },
    })
  }

  export const removeProfilePicture = async (userId: string) => {
    return prisma.profile.update({
      where: {
        userId,
      },
      data: {
        profilePicture: null,
        profilePictureKey: null,
      },
    })
  }

  export const updateCoverImage = async (
    userId: string,
    coverImageUrl: string,
    coverImageKey: string
  ) => {
    return prisma.profile.update({
      where: {
        userId,
      },
      data: {
        coverImage: coverImageUrl,
        coverImageKey: coverImageKey,
      },
    })
  }

  export const removeCoverImage = async (userId: string) => {
    return prisma.profile.update({
      where: {
        userId,
      },
      data: {
        coverImage: null,
        coverImageKey: null,
      },
    })
  }
}

// --- friends/friends.repo.ts ---
namespace FriendsRepo {
  export async function findUserById(userId: string) {
    return prisma.user.findUnique({
      where: {
        id: userId,
      },
    })
  }

  export async function findFriendRequest(senderId: string, receiverId: string) {
    return prisma.friendRequest.findFirst({
      where: {
        OR: [
          {
            senderId,
            receiverId,
          },
          {
            senderId: receiverId,
            receiverId: senderId,
          },
        ],
      },
    })
  }

  export async function createFriendRequest(senderId: string, receiverId: string) {
    return prisma.friendRequest.create({
      data: {
        senderId,
        receiverId,
      },
    })
  }

  export async function findFriendRequestById(requestId: string) {
    return prisma.friendRequest.findUnique({
      where: {
        id: requestId,
      },
    })
  }

  export async function updateFriendRequestStatus(
    requestId: string,
    status: 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'CANCELLED'
  ) {
    return prisma.friendRequest.update({
      where: {
        id: requestId,
      },
      data: {
        status,
      },
    })
  }

  export async function findAcceptedFriendship(userId: string, friendId: string) {
    return prisma.friendRequest.findFirst({
      where: {
        status: 'ACCEPTED',
        OR: [
          {
            senderId: userId,
            receiverId: friendId,
          },
          {
            senderId: friendId,
            receiverId: userId,
          },
        ],
      },
    })
  }

  export async function deleteFriendship(requestId: string) {
    return prisma.friendRequest.delete({
      where: {
        id: requestId,
      },
    })
  }

  export async function getMyFriends(userId: string) {
    return prisma.friendRequest.findMany({
      where: {
        status: 'ACCEPTED',
        OR: [
          {
            senderId: userId,
          },
          {
            receiverId: userId,
          },
        ],
      },
      include: {
        sender: {
          include: {
            profile: true,
          },
        },
        receiver: {
          include: {
            profile: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })
  }

  export async function getIncomingRequests(userId: string) {
    return prisma.friendRequest.findMany({
      where: {
        receiverId: userId,
        status: 'PENDING',
      },
      include: {
        sender: {
          include: {
            profile: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })
  }

  export async function getOutgoingRequests(userId: string) {
    return prisma.friendRequest.findMany({
      where: {
        senderId: userId,
        status: 'PENDING',
      },
      include: {
        receiver: {
          include: {
            profile: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })
  }

  export async function getMutualFriends(userId: string, otherUserId: string) {
    const myFriends = await prisma.friendRequest.findMany({
      where: {
        status: 'ACCEPTED',
        OR: [
          {
            senderId: userId,
          },
          {
            receiverId: userId,
          },
        ],
      },
    })

    const otherFriends = await prisma.friendRequest.findMany({
      where: {
        status: 'ACCEPTED',
        OR: [
          {
            senderId: otherUserId,
          },
          {
            receiverId: otherUserId,
          },
        ],
      },
    })

    const myFriendIds = new Set(
      myFriends.map((friend) => (friend.senderId === userId ? friend.receiverId : friend.senderId))
    )

    const mutualFriendIds = otherFriends
      .map((friend) => (friend.senderId === otherUserId ? friend.receiverId : friend.senderId))
      .filter((id) => myFriendIds.has(id))

    return prisma.user.findMany({
      where: {
        id: {
          in: mutualFriendIds,
        },
      },
      include: {
        profile: true,
      },
    })
  }
}

// --- chat/chat.repo.ts ---
namespace ChatRepo {
  export const findUserById = async (userId: string) => {
    return prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        username: true,
        image: true,
      },
    })
  }
  export const findUsersByIds = async (userIds: string[]) => {
    return prisma.user.findMany({
      where: {
        id: {
          in: userIds,
        },
      },
      select: {
        id: true,
        username: true,
        image: true,
      },
    })
  }
}

// --- video/video.repo.ts ---
namespace VideoRepo {
  export const findUserById = async (userId: string) => {
    return prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        username: true,
        name: true,
        image: true,
        role: true,
        email: true,
        phone: true,
      },
    })
  }
  export const findUserByUsername = async (username: string) => {
    return prisma.user.findFirst({
      where: { username },
      select: {
        id: true,
        username: true,
        name: true,
        image: true,
        role: true,
        email: true,
        phone: true,
      },
    })
  }

  export const createVideoCall = async ({
    streamCallId,
    type,
    title,
    createdById,
    participantIds,
  }: {
    streamCallId: string
    type: VideoCallType
    title?: string
    createdById: string
    participantIds: string[]
  }) => {
    return prisma.videoCall.create({
      data: {
        streamCallId,
        type,
        title: title || `${type} Call`,
        createdById,
        status: 'ACTIVE',
        startedAt: new Date(),
        participants: {
          create: [
            {
              userId: createdById,
              role: 'HOST',
              status: 'JOINED',
              joinedAt: new Date(),
            },
            ...participantIds
              .filter((id) => id !== createdById)
              .map((id) => ({
                userId: id,
                role: 'PARTICIPANT' as VideoCallRole,
                status: 'INVITED' as ParticipantCallStatus,
              })),
          ],
        },
      },
      include: {
        createdBy: { select: { id: true, name: true, username: true, image: true } },
        participants: {
          include: {
            user: { select: { id: true, name: true, username: true, image: true } },
          },
        },
      },
    })
  }

  export const findCallById = async (callId: string) => {
    return prisma.videoCall.findFirst({
      where: {
        OR: [{ id: callId }, { streamCallId: callId }],
      },
      include: {
        createdBy: { select: { id: true, name: true, username: true, image: true } },
        participants: {
          include: {
            user: { select: { id: true, name: true, username: true, image: true } },
          },
        },
      },
    })
  }

  export const findParticipant = async (callId: string, userId: string) => {
    return prisma.videoCallParticipant.findFirst({
      where: {
        callId,
        userId,
      },
    })
  }

  export const updateParticipantStatus = async ({
    callId,
    userId,
    status,
    joinedAt,
    leftAt,
  }: {
    callId: string
    userId: string
    status: ParticipantCallStatus
    joinedAt?: Date
    leftAt?: Date
  }) => {
    return prisma.videoCallParticipant.update({
      where: {
        callId_userId: { callId, userId },
      },
      data: {
        status,
        ...(joinedAt ? { joinedAt } : {}),
        ...(leftAt ? { leftAt } : {}),
      },
    })
  }

  export const updateCallStatus = async (
    callId: string,
    status: VideoCallStatus,
    endedAt?: Date
  ) => {
    return prisma.videoCall.update({
      where: { id: callId },
      data: {
        status,
        ...(endedAt ? { endedAt } : {}),
      },
    })
  }

  export const getUserCallHistory = async (userId: string) => {
    return prisma.videoCall.findMany({
      where: {
        participants: {
          some: { userId },
        },
      },
      orderBy: { createdAt: 'desc' },
      take: 30,
      include: {
        createdBy: { select: { id: true, name: true, username: true, image: true } },
        participants: {
          include: {
            user: { select: { id: true, name: true, username: true, image: true } },
          },
        },
      },
    })
  }

  export const areFriends = async (userA: string, userB: string) => {
    const friend = await prisma.friendRequest.findFirst({
      where: {
        OR: [
          { senderId: userA, receiverId: userB, status: 'ACCEPTED' },
          { senderId: userB, receiverId: userA, status: 'ACCEPTED' },
        ],
      },
    })
    return Boolean(friend)
  }
}

// --- leaderboard/leaderboard.repo.ts ---
namespace LeaderboardRepo {
  export const LEADERBOARD_KEY = 'leaderboard:problems_solved'

  export async function upsertEntry(userId: string, solvedCount: number) {
    if (solvedCount <= 0) {
      await redis.zrem(LEADERBOARD_KEY, userId)
      return
    }

    await redis.zadd(LEADERBOARD_KEY, solvedCount, userId)
  }

  export async function removeEntry(userId: string) {
    await redis.zrem(LEADERBOARD_KEY, userId)
  }

  export async function bulkUpsertEntries(entries: { userId: string; solvedCount: number }[]) {
    if (entries.length === 0) return

    const pipeline = redis.pipeline()
    for (const { userId, solvedCount } of entries) {
      if (solvedCount > 0) {
        pipeline.zadd(LEADERBOARD_KEY, solvedCount, userId)
      }
    }
    await pipeline.exec()
  }

  export async function clearLeaderboard() {
    await redis.del(LEADERBOARD_KEY)
  }

  export async function getTotalCount() {
    return redis.zcard(LEADERBOARD_KEY)
  }

  export async function getUserRank(userId: string) {
    const rank = await redis.zrevrank(LEADERBOARD_KEY, userId)
    return rank === null ? null : rank + 1
  }

  export async function getUserScore(userId: string) {
    const score = await redis.zscore(LEADERBOARD_KEY, userId)
    return score === null ? null : Number(score)
  }

  export async function getEntriesByOffset(limit: number, offset: number) {
    const results = await redis.zrevrange(LEADERBOARD_KEY, offset, offset + limit - 1, 'WITHSCORES')

    const entries: { userId: string; solvedCount: number }[] = []
    for (let i = 0; i < results.length; i += 2) {
      entries.push({
        userId: results[i] ?? '',
        solvedCount: Number(results[i + 1]),
      })
    }

    return entries
  }

  export async function getEntriesByRankRange(startRank: number, endRank: number) {
    const offset = Math.max(startRank - 1, 0)
    const limit = Math.max(endRank - startRank + 1, 0)
    return getEntriesByOffset(limit, offset)
  }
}

// --- leetcode/leetcode.sync.repo.ts ---
namespace LeetcodeSyncRepo {
  const profileSelect = {
    id: true,
    userId: true,
    leetcodeUsername: true,
    leetcodeSolved: true,
    leetcodeEasy: true,
    leetcodeMedium: true,
    leetcodeHard: true,
    leetcodeRating: true,
    leetcodeGlobalRank: true,
  } as const

  export async function findProfileById(profileId: string) {
    return prisma.profile.findUnique({
      where: { id: profileId },
      select: profileSelect,
    })
  }

  export async function findProfileByUserId(userId: string) {
    return prisma.profile.findUnique({
      where: { userId },
      select: profileSelect,
    })
  }

  export async function findStaleProfiles(syncedBefore: Date) {
    return prisma.profile.findMany({
      where: {
        leetcodeUsername: { not: null },
        OR: [{ leetcodeUpdatedAt: null }, { leetcodeUpdatedAt: { lt: syncedBefore } }],
      },
      select: { id: true },
      orderBy: { leetcodeUpdatedAt: 'asc' },
    })
  }

  export async function findSuccessfulProfilesForRebuild() {
    return prisma.profile.findMany({
      where: {
        leetcodeUsername: { not: null },
        leetcodeSyncStatus: 'SUCCESS',
        leetcodeSolved: { gt: 0 },
      },
      select: {
        userId: true,
        leetcodeSolved: true,
      },
    })
  }

  export function hasStatsChanged(
    profile: {
      leetcodeSolved: number | null
      leetcodeEasy: number | null
      leetcodeMedium: number | null
      leetcodeHard: number | null
      leetcodeRating: number | null
      leetcodeGlobalRank: number | null
    },
    stats: LeetCodeStats
  ) {
    return (
      profile.leetcodeSolved !== stats.solvedCount ||
      profile.leetcodeEasy !== stats.easySolved ||
      profile.leetcodeMedium !== stats.mediumSolved ||
      profile.leetcodeHard !== stats.hardSolved ||
      profile.leetcodeRating !== stats.rating ||
      profile.leetcodeGlobalRank !== stats.globalRank
    )
  }

  export async function updateStats(profileId: string, stats: LeetCodeStats) {
    return prisma.profile.update({
      where: { id: profileId },
      data: {
        leetcodeUsername: stats.username,
        leetcodeSolved: stats.solvedCount,
        leetcodeEasy: stats.easySolved,
        leetcodeMedium: stats.mediumSolved,
        leetcodeHard: stats.hardSolved,
        leetcodeRating: stats.rating,
        leetcodeGlobalRank: stats.globalRank,
        leetcodeUpdatedAt: new Date(),
        leetcodeSyncStatus: 'SUCCESS',
        leetcodeSyncError: null,
      },
    })
  }

  export async function touchSyncSuccess(profileId: string) {
    return prisma.profile.update({
      where: { id: profileId },
      data: {
        leetcodeUpdatedAt: new Date(),
        leetcodeSyncStatus: 'SUCCESS',
        leetcodeSyncError: null,
      },
    })
  }

  export async function markSyncFailed(profileId: string, error: string) {
    return prisma.profile.update({
      where: { id: profileId },
      data: {
        leetcodeSyncStatus: 'FAILED',
        leetcodeSyncError: error.slice(0, 500),
      },
    })
  }
}

// --- posts/posts.repo.ts ---
namespace PostsRepo {
  export const createPost = async (
    tx: Prisma.TransactionClient,
    authorId: string,
    content: string | undefined,
    visibility: any,
    anonymous = false,
    location?: string
  ) => {
    return tx.post.create({
      data: {
        authorId,
        content,
        visibility,
        anonymous,
        location,
      },
    })
  }

  export const createMedia = async (tx: Prisma.TransactionClient, postId: string, media: any[]) => {
    return tx.postMedia.createMany({
      data: media.map((item, index) => ({
        postId,
        type: item.type,
        url: item.url,
        key: item.key,
        mimeType: item.mimeType,
        size: item.size,
        width: item.width ?? null,
        height: item.height ?? null,
        duration: item.duration ?? null,
        order: index,
      })),
    })
  }

  export const findPostById = async (tx: Prisma.TransactionClient, postId: string) => {
    return tx.post.findUnique({
      where: {
        id: postId,
      },
      include: {
        author: {
          select: {
            id: true,
            username: true,
            name: true,
            image: true,
          },
        },
        media: {
          orderBy: {
            order: 'asc',
          },
        },
      },
    })
  }

  export const findLike = (tx: Prisma.TransactionClient, userId: string, postId: string) => {
    return tx.like.findUnique({
      where: {
        userId_postId: {
          userId,
          postId,
        },
      },
    })
  }

  export const getLikeCount = async (tx: Prisma.TransactionClient, postId: string) => {
    return tx.like.count({
      where: {
        postId,
      },
    })
  }

  export const findPostWithAuthor = async (tx: Prisma.TransactionClient, postId: string) => {
    return tx.post.findUnique({
      where: {
        id: postId,
      },
      select: {
        id: true,
        authorId: true,
      },
    })
  }

  export const createComment = async ({
    tx,
    postId,
    userId,
    content,
    parentId,
  }: {
    tx: Prisma.TransactionClient
    postId: string
    userId: string
    content: string
    parentId?: string | null
  }) => {
    return tx.comment.create({
      data: {
        postId,
        userId,
        content,
        parentId,
      },
    })
  }

  export const createCommentNotification = async ({
    tx,
    postAuthorId,
  }: {
    tx: Prisma.TransactionClient
    postAuthorId: string
  }) => {
    return tx.notification.create({
      data: {
        userId: postAuthorId,
        title: 'New Comment',
        body: 'You have a new comment on your post',
        type: 'COMMENT',
      },
    })
  }

  export const findCommentById = async (tx: Prisma.TransactionClient, commentId: string) => {
    return prisma.comment.findUnique({
      where: {
        id: commentId,
      },
    })
  }
  export const findSavedPost = async (
    tx: Prisma.TransactionClient,
    userId: string,

    postId: string
  ) => {
    return tx.savedPost.findUnique({
      where: {
        userId_postId: {
          userId,

          postId,
        },
      },
    })
  }

  export const createSavedPost = async (
    tx: Prisma.TransactionClient,

    userId: string,

    postId: string
  ) => {
    return tx.savedPost.create({
      data: {
        userId,

        postId,
      },
    })
  }

  export const deleteSavedPost = async (
    tx: Prisma.TransactionClient,
    userId: string,
    postId: string
  ) => {
    return tx.savedPost.delete({
      where: {
        userId_postId: {
          userId,

          postId,
        },
      },
    })
  }

  export const listComments = async (postId: string, limit: number, cursor?: string) => {
    return prisma.comment.findMany({
      where: {
        postId,
        parentId: null,
      },
      take: limit,
      ...(cursor ? { skip: 1, cursor: { id: cursor } } : {}),
      orderBy: [{ isPinned: 'desc' }, { createdAt: 'desc' }],
      include: {
        user: { select: { id: true, username: true, name: true, image: true } },
        replies: {
          take: 20,
          orderBy: { createdAt: 'asc' },
          include: {
            user: { select: { id: true, username: true, name: true, image: true } },
          },
        },
      },
    })
  }

  export const countPinnedComments = async (tx: Prisma.TransactionClient, postId: string) => {
    return tx.comment.count({
      where: { postId, isPinned: true },
    })
  }

  export const setCommentPinned = async (
    tx: Prisma.TransactionClient,
    commentId: string,
    isPinned: boolean
  ) => {
    return tx.comment.update({
      where: { id: commentId },
      data: { isPinned },
    })
  }

  export const deleteComment = async (commentId: string) => {
    return prisma.comment.delete({
      where: { id: commentId },
    })
  }

  export const findSavedPostsByUser = async (tx: Prisma.TransactionClient, userId: string) => {
    return tx.savedPost.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        post: {
          include: {
            author: {
              select: { id: true, username: true, name: true, image: true },
            },
          },
        },
      },
    })
  }
}

// --- comments/comments.repo.ts ---
namespace CommentsRepo {
  export async function findPostById(postId: string) {
    return prisma.post.findUnique({
      where: { id: postId },
      select: { id: true, authorId: true, visibility: true },
    })
  }

  export async function findCommentById(commentId: string) {
    return prisma.comment.findUnique({
      where: { id: commentId },
      include: {
        user: { select: { id: true, name: true, username: true, image: true } },
        post: { select: { id: true, authorId: true } },
        reactions: true,
        mentions: {
          include: { mentionedUser: { select: { id: true, name: true, username: true } } },
        },
      },
    })
  }

  export async function createCommentRecord(data: {
    content: string
    postId: string
    userId: string
    parentId?: string
    depth: number
  }) {
    return prisma.$transaction(async (tx) => {
      const comment = await tx.comment.create({
        data: {
          content: data.content,
          postId: data.postId,
          userId: data.userId,
          parentId: data.parentId ?? null,
          depth: data.depth,
        },
        include: {
          user: { select: { id: true, name: true, username: true, image: true } },
        },
      })

      await tx.post.update({
        where: { id: data.postId },
        data: { commentCount: { increment: 1 } },
      })

      return comment
    })
  }

  function formatCommentWithReactions(comment: any) {
    const reactionCounts: Record<string, number> = {}
    if (comment.reactions) {
      for (const r of comment.reactions) {
        reactionCounts[r.emoji] = (reactionCounts[r.emoji] || 0) + 1
      }
    }

    const formattedReplies = comment.replies
      ? comment.replies.map((reply: any) => formatCommentWithReactions(reply))
      : []

    return {
      ...comment,
      reactionCounts,
      replies: formattedReplies,
    }
  }

  export async function getCommentsForPostRepo(postId: string, cursor?: string, limit = 20) {
    const rawComments = await prisma.comment.findMany({
      where: { postId, parentId: null },
      take: limit + 1,
      ...(cursor ? { skip: 1, cursor: { id: cursor } } : {}),
      orderBy: [{ isPinned: 'desc' }, { createdAt: 'desc' }],
      select: {
        id: true,
        content: true,
        postId: true,
        userId: true,
        parentId: true,
        depth: true,
        isDeleted: true,
        isPinned: true,
        version: true,
        createdAt: true,
        updatedAt: true,
        user: { select: { id: true, name: true, username: true, image: true } },
        reactions: { select: { id: true, emoji: true, userId: true } },
        mentions: {
          select: { id: true, mentionedUser: { select: { id: true, name: true, username: true } } },
        },
        replies: {
          take: 10,
          orderBy: { createdAt: 'asc' },
          select: {
            id: true,
            content: true,
            postId: true,
            userId: true,
            parentId: true,
            depth: true,
            isDeleted: true,
            isPinned: true,
            version: true,
            createdAt: true,
            updatedAt: true,
            user: { select: { id: true, name: true, username: true, image: true } },
            reactions: { select: { id: true, emoji: true, userId: true } },
            mentions: {
              select: {
                id: true,
                mentionedUser: { select: { id: true, name: true, username: true } },
              },
            },
            replies: {
              take: 10,
              orderBy: { createdAt: 'asc' },
              select: {
                id: true,
                content: true,
                postId: true,
                userId: true,
                parentId: true,
                depth: true,
                isDeleted: true,
                isPinned: true,
                version: true,
                createdAt: true,
                updatedAt: true,
                user: { select: { id: true, name: true, username: true, image: true } },
                reactions: { select: { id: true, emoji: true, userId: true } },
              },
            },
          },
        },
      },
    })

    let nextCursor: string | undefined = undefined
    if (rawComments.length > limit) {
      const nextItem = rawComments.pop()
      nextCursor = nextItem?.id
    }

    const comments = rawComments.map((c) => formatCommentWithReactions(c))

    return { comments, nextCursor }
  }

  export async function updateCommentContentRepo(
    commentId: string,
    newContent: string,
    previousContent: string,
    editedByUserId: string,
    currentVersion: number
  ) {
    try {
      return await prisma.$transaction(async (tx) => {
        await tx.commentEditHistory.create({
          data: {
            commentId,
            previousContent,
            editedByUserId,
            version: currentVersion,
          },
        })

        const updated = await tx.comment.update({
          where: { id: commentId, version: currentVersion },
          data: {
            content: newContent,
            version: { increment: 1 },
          },
          include: {
            user: { select: { id: true, name: true, username: true, image: true } },
          },
        })

        return updated
      })
    } catch (err: any) {
      if (err.code === 'P2025') {
        throw { status: 409, message: 'STALE_COMMENT_VERSION' }
      }
      throw err
    }
  }

  export async function getCommentEditHistoryRepo(commentId: string) {
    return prisma.commentEditHistory.findMany({
      where: { commentId },
      orderBy: { createdAt: 'desc' },
      include: {
        editedBy: { select: { id: true, name: true, username: true } },
      },
    })
  }

  export async function softDeleteCommentRepo(commentId: string) {
    return prisma.comment.update({
      where: { id: commentId },
      data: {
        isDeleted: true,
        content: '[Comment deleted]',
      },
    })
  }

  export async function toggleReactionRepo(commentId: string, userId: string, emoji: string) {
    const existing = await prisma.commentReaction.findUnique({
      where: {
        commentId_userId_emoji: { commentId, userId, emoji },
      },
    })

    if (existing) {
      await prisma.commentReaction.delete({
        where: { id: existing.id },
      })
      return { action: 'removed', emoji }
    } else {
      const reaction = await prisma.commentReaction.create({
        data: { commentId, userId, emoji },
      })
      return { action: 'added', reaction }
    }
  }

  export async function removeReactionRepo(commentId: string, userId: string, emoji: string) {
    const existing = await prisma.commentReaction.findUnique({
      where: {
        commentId_userId_emoji: { commentId, userId, emoji },
      },
    })

    if (existing) {
      await prisma.commentReaction.delete({
        where: { id: existing.id },
      })
    }

    return { action: 'removed', emoji }
  }

  export async function togglePinCommentRepo(commentId: string, postId: string, maxPins = 3) {
    return prisma.$transaction(async (tx) => {
      const comment = await tx.comment.findUnique({
        where: { id: commentId },
        select: { id: true, isPinned: true, isDeleted: true },
      })

      if (!comment) {
        throw { status: 404, message: 'COMMENT_NOT_FOUND' }
      }

      if (comment.isDeleted) {
        throw { status: 400, message: 'CANNOT_PIN_DELETED_COMMENT' }
      }

      const nextPinnedState = !comment.isPinned

      if (nextPinnedState) {
        const pinnedCount = await tx.comment.count({
          where: { postId, isPinned: true },
        })
        if (pinnedCount >= maxPins) {
          throw { status: 400, message: 'MAX_PINNED_COMMENTS_EXCEEDED' }
        }
      }

      return tx.comment.update({
        where: { id: commentId },
        data: { isPinned: nextPinnedState },
      })
    })
  }

  export async function createReportRepo(
    commentId: string,
    reporterUserId: string,
    reason: string,
    details?: string
  ) {
    return prisma.commentReport.create({
      data: {
        commentId,
        reporterUserId,
        reason,
        details,
      },
    })
  }

  export async function createMentionsRepo(commentId: string, usernames: string[]) {
    const users = await prisma.user.findMany({
      where: {
        username: { in: usernames },
        status: { notIn: ['DEACTIVATED', 'SUSPENDED'] as never },
      },
      select: { id: true },
    })

    const mentionData = users.map((u) => ({
      commentId,
      mentionedUserId: u.id,
    }))

    if (mentionData.length > 0) {
      await prisma.commentMention.createMany({
        data: mentionData,
        skipDuplicates: true,
      })
    }

    return users.map((u) => u.id)
  }
}

// --- study-group/study-group.repo.ts ---
namespace StudyGroupRepo {
  const userSelect = {
    id: true,
    username: true,
    name: true,
    image: true,
  } as const

  export async function createStudyGroup(
    ownerId: string,
    data: {
      name: string
      type: StudyGroupType
      visibility: StudyGroupVisibility
      subject: string
      semester: number
      description?: string | null
    }
  ) {
    return prisma.studyGroup.create({
      data: {
        name: data.name,
        type: data.type,
        visibility: data.visibility,
        subject: data.subject,
        semester: data.semester,
        description: data.description ?? null,
        ownerId,
        members: {
          create: {
            userId: ownerId,
            role: 'OWNER',
          },
        },
      },
      include: groupDetailInclude,
    })
  }

  const groupDetailInclude = {
    owner: { select: userSelect },
    members: {
      include: { user: { select: userSelect } },
    },
    _count: {
      select: { members: true, discussions: true, notes: true, files: true },
    },
  } as const

  export async function listStudyGroups(userId: string) {
    return prisma.studyGroup.findMany({
      where: {
        members: { some: { userId } },
      },
      include: {
        owner: { select: userSelect },
        _count: { select: { members: true } },
      },
      orderBy: { createdAt: 'desc' },
    })
  }

  export async function findStudyGroupById(studyGroupId: string) {
    return prisma.studyGroup.findUnique({
      where: { id: studyGroupId },
      include: groupDetailInclude,
    })
  }

  export async function updateStudyGroup(
    studyGroupId: string,
    expectedVersion: number | null,
    data: {
      name?: string
      type?: StudyGroupType
      visibility?: StudyGroupVisibility
      subject?: string
      semester?: number
      description?: string | null
    }
  ) {
    const result = await prisma.studyGroup.updateMany({
      where: {
        id: studyGroupId,
        ...(expectedVersion !== null ? { version: expectedVersion } : {}),
      },
      data: {
        ...data,
        version: { increment: 1 },
      },
    })
    if (result.count === 0) return null
    return findStudyGroupById(studyGroupId)
  }

  export async function deleteStudyGroup(studyGroupId: string) {
    return prisma.studyGroup.delete({ where: { id: studyGroupId } })
  }

  export async function findMembership(studyGroupId: string, userId: string) {
    return prisma.studyGroupMember.findUnique({
      where: { studyGroupId_userId: { studyGroupId, userId } },
    })
  }

  export async function listMembers(studyGroupId: string) {
    return prisma.studyGroupMember.findMany({
      where: { studyGroupId },
      include: { user: { select: userSelect } },
      orderBy: { joinedAt: 'asc' },
    })
  }

  export async function addMember(
    studyGroupId: string,
    userId: string,
    role: StudyGroupMemberRole = 'MEMBER'
  ) {
    return prisma.studyGroupMember.upsert({
      where: { studyGroupId_userId: { studyGroupId, userId } },
      create: { studyGroupId, userId, role },
      update: {},
      include: { user: { select: userSelect } },
    })
  }

  export async function updateMemberRole(
    studyGroupId: string,
    userId: string,
    role: StudyGroupMemberRole
  ) {
    return prisma.studyGroupMember.update({
      where: { studyGroupId_userId: { studyGroupId, userId } },
      data: { role },
      include: { user: { select: userSelect } },
    })
  }

  export async function removeMember(studyGroupId: string, userId: string) {
    return prisma.studyGroupMember.delete({
      where: { studyGroupId_userId: { studyGroupId, userId } },
    })
  }

  export async function findUserById(userId: string) {
    return prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        status: true,
        emailVerified: true,
        username: true,
        name: true,
        image: true,
      },
    })
  }

  export async function upsertInvitation(data: {
    studyGroupId: string
    inviterId: string
    inviteeId: string
    message?: string
  }) {
    return prisma.studyGroupInvitation.upsert({
      where: {
        studyGroupId_inviteeId: { studyGroupId: data.studyGroupId, inviteeId: data.inviteeId },
      },
      create: {
        studyGroupId: data.studyGroupId,
        inviterId: data.inviterId,
        inviteeId: data.inviteeId,
        message: data.message ?? null,
        status: 'PENDING',
      },
      update: {
        inviterId: data.inviterId,
        message: data.message ?? null,
        status: 'PENDING',
      },
    })
  }

  export async function findPendingInvitation(studyGroupId: string, inviteeId: string) {
    return prisma.studyGroupInvitation.findFirst({
      where: { studyGroupId, inviteeId, status: 'PENDING' },
    })
  }

  export async function acceptInvitation(id: string) {
    return prisma.studyGroupInvitation.update({
      where: { id },
      data: { status: 'ACCEPTED' },
    })
  }

  export async function createAuditEvent(data: {
    studyGroupId: string
    actorId: string
    action: string
    metadata?: Prisma.InputJsonValue
  }) {
    return prisma.studyGroupAuditEvent.create({
      data: {
        studyGroupId: data.studyGroupId,
        actorId: data.actorId,
        action: data.action,
        metadata: data.metadata,
      },
    })
  }

  export async function listAuditEvents(studyGroupId: string) {
    return prisma.studyGroupAuditEvent.findMany({
      where: { studyGroupId },
      include: { actor: { select: userSelect } },
      orderBy: { createdAt: 'desc' },
      take: 100,
    })
  }

  export async function createDiscussion(
    studyGroupId: string,
    authorId: string,
    data: { title: string; body: string }
  ) {
    return prisma.studyGroupDiscussion.create({
      data: { studyGroupId, authorId, title: data.title, body: data.body },
      include: { author: { select: userSelect }, _count: { select: { replies: true } } },
    })
  }

  export async function listDiscussions(studyGroupId: string) {
    return prisma.studyGroupDiscussion.findMany({
      where: { studyGroupId },
      include: { author: { select: userSelect }, _count: { select: { replies: true } } },
      orderBy: { createdAt: 'desc' },
    })
  }

  export async function findDiscussion(studyGroupId: string, discussionId: string) {
    return prisma.studyGroupDiscussion.findFirst({
      where: { id: discussionId, studyGroupId },
      include: { author: { select: userSelect }, _count: { select: { replies: true } } },
    })
  }

  export async function updateDiscussion(
    discussionId: string,
    data: { title?: string; body?: string }
  ) {
    return prisma.studyGroupDiscussion.update({
      where: { id: discussionId },
      data,
      include: { author: { select: userSelect }, _count: { select: { replies: true } } },
    })
  }

  export async function deleteDiscussion(discussionId: string) {
    return prisma.studyGroupDiscussion.delete({ where: { id: discussionId } })
  }

  export async function createReply(discussionId: string, authorId: string, body: string) {
    return prisma.studyGroupDiscussionReply.create({
      data: { discussionId, authorId, body },
      include: { author: { select: userSelect } },
    })
  }

  export async function listReplies(discussionId: string) {
    return prisma.studyGroupDiscussionReply.findMany({
      where: { discussionId },
      include: { author: { select: userSelect } },
      orderBy: { createdAt: 'asc' },
    })
  }

  export async function findReply(discussionId: string, replyId: string) {
    return prisma.studyGroupDiscussionReply.findFirst({
      where: { id: replyId, discussionId },
      include: { author: { select: userSelect } },
    })
  }

  export async function updateReply(replyId: string, body: string) {
    return prisma.studyGroupDiscussionReply.update({
      where: { id: replyId },
      data: { body },
      include: { author: { select: userSelect } },
    })
  }

  export async function deleteReply(replyId: string) {
    return prisma.studyGroupDiscussionReply.delete({ where: { id: replyId } })
  }

  export async function createNote(
    studyGroupId: string,
    authorId: string,
    data: { title: string; body: string }
  ) {
    return prisma.$transaction(async (tx) => {
      const note = await tx.studyGroupNote.create({
        data: { studyGroupId, authorId, title: data.title, body: data.body, version: 1 },
      })
      await tx.studyGroupNoteVersion.create({
        data: {
          noteId: note.id,
          editorId: authorId,
          version: 1,
          title: data.title,
          body: data.body,
        },
      })
      return tx.studyGroupNote.findUniqueOrThrow({
        where: { id: note.id },
        include: { author: { select: userSelect } },
      })
    })
  }

  export async function listNotes(studyGroupId: string) {
    return prisma.studyGroupNote.findMany({
      where: { studyGroupId },
      include: { author: { select: userSelect } },
      orderBy: { updatedAt: 'desc' },
    })
  }

  export async function findNote(studyGroupId: string, noteId: string) {
    return prisma.studyGroupNote.findFirst({
      where: { id: noteId, studyGroupId },
      include: { author: { select: userSelect } },
    })
  }

  export async function updateNote(
    noteId: string,
    editorId: string,
    expectedVersion: number | null,
    data: { title?: string; body?: string }
  ) {
    return prisma.$transaction(async (tx) => {
      const current = await tx.studyGroupNote.findUnique({ where: { id: noteId } })
      if (!current) return null
      if (expectedVersion !== null && current.version !== expectedVersion)
        return 'conflict' as const
      const title = data.title ?? current.title
      const body = data.body ?? current.body
      const nextVersion = current.version + 1
      const note = await tx.studyGroupNote.update({
        where: { id: noteId },
        data: { title, body, version: nextVersion },
        include: { author: { select: userSelect } },
      })
      await tx.studyGroupNoteVersion.create({
        data: { noteId, editorId, version: nextVersion, title, body },
      })
      return note
    })
  }

  export async function deleteNote(noteId: string) {
    return prisma.studyGroupNote.delete({ where: { id: noteId } })
  }

  export async function listNoteVersions(noteId: string) {
    return prisma.studyGroupNoteVersion.findMany({
      where: { noteId },
      include: { editor: { select: userSelect } },
      orderBy: { version: 'desc' },
    })
  }

  export async function findNoteVersion(noteId: string, version: number) {
    return prisma.studyGroupNoteVersion.findUnique({
      where: { noteId_version: { noteId, version } },
      include: { editor: { select: userSelect } },
    })
  }

  export async function createFile(data: {
    studyGroupId: string
    uploaderId: string
    key: string
    url?: string
    fileName: string
    mimeType: string
    sizeBytes: number
  }) {
    return prisma.studyGroupFile.create({
      data,
      include: { uploader: { select: userSelect } },
    })
  }

  export async function listFiles(studyGroupId: string) {
    return prisma.studyGroupFile.findMany({
      where: { studyGroupId },
      include: { uploader: { select: userSelect } },
      orderBy: { createdAt: 'desc' },
    })
  }

  export async function findFile(studyGroupId: string, fileId: string) {
    return prisma.studyGroupFile.findFirst({
      where: { id: fileId, studyGroupId },
      include: { uploader: { select: userSelect } },
    })
  }

  export async function deleteFile(fileId: string) {
    return prisma.studyGroupFile.delete({ where: { id: fileId } })
  }

  export async function findTimetable(studyGroupId: string) {
    return prisma.studyGroupTimetable.findUnique({
      where: { studyGroupId },
    })
  }

  export async function upsertTimetable(
    studyGroupId: string,
    editorId: string,
    content: Prisma.InputJsonValue,
    expectedVersion: number | null
  ) {
    return prisma.$transaction(async (tx) => {
      const current = await tx.studyGroupTimetable.findUnique({ where: { studyGroupId } })
      if (!current) {
        const created = await tx.studyGroupTimetable.create({
          data: { studyGroupId, content, version: 1 },
        })
        await tx.studyGroupTimetableVersion.create({
          data: { timetableId: created.id, editorId, version: 1, content },
        })
        return created
      }
      if (expectedVersion !== null && current.version !== expectedVersion)
        return 'conflict' as const
      const nextVersion = current.version + 1
      const updated = await tx.studyGroupTimetable.update({
        where: { id: current.id },
        data: { content, version: nextVersion },
      })
      await tx.studyGroupTimetableVersion.create({
        data: { timetableId: current.id, editorId, version: nextVersion, content },
      })
      return updated
    })
  }

  export async function deleteTimetable(studyGroupId: string) {
    return prisma.studyGroupTimetable.deleteMany({ where: { studyGroupId } })
  }

  export async function listTimetableVersions(studyGroupId: string) {
    const timetable = await prisma.studyGroupTimetable.findUnique({ where: { studyGroupId } })
    if (!timetable) return []
    return prisma.studyGroupTimetableVersion.findMany({
      where: { timetableId: timetable.id },
      include: { editor: { select: userSelect } },
      orderBy: { version: 'desc' },
    })
  }

  export async function setChatChannelId(studyGroupId: string, chatChannelId: string) {
    return prisma.studyGroup.update({
      where: { id: studyGroupId },
      data: { chatChannelId },
    })
  }

  export async function searchGroupContent(studyGroupId: string, query: string) {
    const [discussions, notes, files] = await Promise.all([
      prisma.studyGroupDiscussion.findMany({
        where: {
          studyGroupId,
          OR: [
            { title: { contains: query, mode: 'insensitive' } },
            { body: { contains: query, mode: 'insensitive' } },
          ],
        },
        take: 20,
        orderBy: { updatedAt: 'desc' },
      }),
      prisma.studyGroupNote.findMany({
        where: {
          studyGroupId,
          OR: [
            { title: { contains: query, mode: 'insensitive' } },
            { body: { contains: query, mode: 'insensitive' } },
          ],
        },
        take: 20,
        orderBy: { updatedAt: 'desc' },
      }),
      prisma.studyGroupFile.findMany({
        where: {
          studyGroupId,
          fileName: { contains: query, mode: 'insensitive' },
        },
        take: 20,
        orderBy: { createdAt: 'desc' },
      }),
    ])
    return { discussions, notes, files }
  }

  export async function searchAcrossGroups(userId: string, query: string) {
    const groups = await prisma.studyGroup.findMany({
      where: {
        members: { some: { userId } },
        OR: [
          { name: { contains: query, mode: 'insensitive' } },
          { subject: { contains: query, mode: 'insensitive' } },
          { description: { contains: query, mode: 'insensitive' } },
        ],
      },
      take: 20,
      orderBy: { updatedAt: 'desc' },
    })
    const memberships = await prisma.studyGroupMember.findMany({
      where: { userId },
      select: { studyGroupId: true },
    })
    const groupIds = memberships.map((m) => m.studyGroupId)
    const [discussions, notes, files] = await Promise.all([
      prisma.studyGroupDiscussion.findMany({
        where: {
          studyGroupId: { in: groupIds },
          OR: [
            { title: { contains: query, mode: 'insensitive' } },
            { body: { contains: query, mode: 'insensitive' } },
          ],
        },
        take: 20,
        orderBy: { updatedAt: 'desc' },
      }),
      prisma.studyGroupNote.findMany({
        where: {
          studyGroupId: { in: groupIds },
          OR: [
            { title: { contains: query, mode: 'insensitive' } },
            { body: { contains: query, mode: 'insensitive' } },
          ],
        },
        take: 20,
        orderBy: { updatedAt: 'desc' },
      }),
      prisma.studyGroupFile.findMany({
        where: {
          studyGroupId: { in: groupIds },
          fileName: { contains: query, mode: 'insensitive' },
        },
        take: 20,
        orderBy: { createdAt: 'desc' },
      }),
    ])
    return { groups, discussions, notes, files }
  }
}

// --- study-group/study-group.permissions.ts ---
namespace StudyGroupPermissions {
  export type StudyGroupMemberRole = 'OWNER' | 'ADMIN' | 'MEMBER'

  export const ROLE_RANK: Record<StudyGroupMemberRole, number> = {
    MEMBER: 1,
    ADMIN: 2,
    OWNER: 3,
  }

  export function hasMinRole(role: StudyGroupMemberRole, minimum: StudyGroupMemberRole): boolean {
    return ROLE_RANK[role] >= ROLE_RANK[minimum]
  }

  export function canManageGroup(role: StudyGroupMemberRole): boolean {
    return hasMinRole(role, 'ADMIN')
  }

  export function canManageMembers(role: StudyGroupMemberRole): boolean {
    return hasMinRole(role, 'ADMIN')
  }

  export function canDeleteGroup(role: StudyGroupMemberRole): boolean {
    return role === 'OWNER'
  }

  export function canModerateContent(role: StudyGroupMemberRole): boolean {
    return hasMinRole(role, 'ADMIN')
  }

  export function canEditOwnOrModerate(role: StudyGroupMemberRole, isAuthor: boolean): boolean {
    return isAuthor || canModerateContent(role)
  }

  export function canChangeMemberRole(
    actorRole: StudyGroupMemberRole,
    targetRole: StudyGroupMemberRole
  ): boolean {
    if (targetRole === 'OWNER') return false
    if (actorRole === 'OWNER') return true
    return actorRole === 'ADMIN' && targetRole === 'MEMBER'
  }

  export function canRemoveMember(
    actorRole: StudyGroupMemberRole,
    targetRole: StudyGroupMemberRole,
    isSelf: boolean
  ): boolean {
    if (targetRole === 'OWNER') return false
    if (isSelf) return true
    return canChangeMemberRole(actorRole, targetRole)
  }

  export const ALLOWED_STUDY_GROUP_MIME_TYPES = new Set([
    'application/pdf',
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/webp',
    'text/plain',
    'text/markdown',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/vnd.ms-powerpoint',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  ])

  export const MAX_STUDY_GROUP_FILE_BYTES = 25 * 1024 * 1024
}

// --- study-group/study-group.idempotency.ts ---
namespace StudyGroupIdempotency {
  const TTL_SECONDS = 60 * 60 * 24

  type CachedResponse = {
    status: number
    body: unknown
  }

  export async function readIdempotentResponse(
    userId: string,
    key: string | undefined
  ): Promise<CachedResponse | null> {
    if (!key) return null
    try {
      const raw = await redis.get(idempotencyRedisKey(userId, key))
      if (!raw) return null
      return JSON.parse(raw) as CachedResponse
    } catch {
      return null
    }
  }

  export async function writeIdempotentResponse(
    userId: string,
    key: string | undefined,
    response: CachedResponse
  ): Promise<void> {
    if (!key) return
    try {
      await redis.set(idempotencyRedisKey(userId, key), JSON.stringify(response), 'EX', TTL_SECONDS)
    } catch {
      // best-effort cache
    }
  }

  function idempotencyRedisKey(userId: string, key: string) {
    return `idempotency:study-groups:${userId}:${key}`
  }
}

// --- posts/post.lib.ts ---
namespace PostMedia {
  ffmpeg.setFfprobePath(ffprobeInstaller.path)

  export const MAX_VIDEO_DURATION_SECONDS = 60
  export const MAX_IMAGE_SIZE_BYTES = 5 * 1024 * 1024
  export const MAX_VIDEO_SIZE_BYTES = 25 * 1024 * 1024

  export const getImageDimensions = async (file: Express.Multer.File) => {
    const dimensions = imageSize(file.buffer)
    return {
      width: dimensions.width,
      height: dimensions.height,
    }
  }

  export async function getVideoMetadata(buffer: Buffer) {
    const tempFile = path.join(os.tmpdir(), `video-${randomUUID()}.mp4`)
    await fs.writeFile(tempFile, buffer)
    return new Promise<{
      width: number | null
      height: number | null
      duration: number | null
    }>((resolve, reject) => {
      ffmpeg.ffprobe(tempFile, async (err: any, metadata: any) => {
        await fs.unlink(tempFile).catch(() => {})
        if (err) return reject(err)
        const stream = metadata.streams.find((s: any) => s.codec_type === 'video')
        resolve({
          width: stream?.width ?? null,
          height: stream?.height ?? null,
          duration: metadata.format.duration ?? null,
        })
      })
    })
  }

  export function assertValidVideoDuration(duration: number | null): number {
    if (duration === null || Number.isNaN(duration)) {
      throw new Error('Could not determine video duration.')
    }

    if (duration > MAX_VIDEO_DURATION_SECONDS) {
      throw new Error(`Video must be ${MAX_VIDEO_DURATION_SECONDS} seconds or less.`)
    }

    return Math.round(duration)
  }
}

// --- chat/chat.lib.ts ---
namespace ChatLib {
  export const getChannelId = (userId: string, otherUserId: string) => {
    const channelId = [userId, otherUserId].sort()
    return crypto.createHash('sha256').update(channelId.join(':')).digest('hex').slice(0, 32)
  }
}

// --- profile/profile.service.ts ---
namespace ProfileService {
  function extractLeetcodeUsername(leetcodeUrl: string | null | undefined) {
    if (!leetcodeUrl) {
      return null
    }
    return leetcodeUrl.split('/').filter(Boolean).pop() ?? null
  }

  export async function getMyProfile(userId: string) {
    return ProfileRepo.findByUserId(userId)
  }

  export async function updateMyProfile(userId: string, body: unknown) {
    const parsed = profileUpdateSchema.safeParse(body)
    if (!parsed.success) {
      throw badRequest('INVALID_PROFILE_PAYLOAD', parsed.error.issues[0]?.message)
    }

    for (const field of protectedProfileFields) {
      if (field in (body as object)) {
        throw badRequest('PROTECTED_FIELD', `Cannot update ${field}`)
      }
    }

    const data: Prisma.ProfileUncheckedUpdateInput = { ...parsed.data }
    if (parsed.data.dob) {
      data.dob = new Date(parsed.data.dob)
    }
    if (parsed.data.leetcodeUrl !== undefined) {
      data.leetcodeUsername = extractLeetcodeUsername(parsed.data.leetcodeUrl)
    }

    return ProfileRepo.updateProfile(userId, data)
  }

  export async function getProfileByUsername(
    username: string,
    viewer?: AuthenticatedRequest['user']
  ) {
    const profile = await ProfileRepo.findByUsername(username)
    if (!profile) {
      throw notFound('PROFILE_NOT_FOUND')
    }

    const isOwner = viewer?.id === profile.userId
    const isFriend = viewer
      ? Boolean(await FriendsRepo.findAcceptedFriendship(viewer.id, profile.userId))
      : false
    const viewerRecord = viewer
      ? await prisma.user.findUnique({ where: { id: viewer.id }, select: { collegeId: true } })
      : null

    const allowed = ProfileDto.canViewProfile({
      visibility: profile.profileVisibility,
      ownerUserId: profile.userId,
      ownerCollegeId: profile.user.collegeId,
      viewerId: viewer?.id,
      viewerCollegeId: viewerRecord?.collegeId,
      isFriend,
    })

    if (!allowed) {
      throw notFound('PROFILE_NOT_FOUND')
    }

    return ProfileDto.toPublicProfileDto(profile, { isOwner })
  }

  async function replaceImage(args: {
    userId: string
    file: Express.Multer.File
    folder: string
    currentKey: string | null
    persist: (url: string, key: string) => Promise<unknown>
  }) {
    if (!args.file) {
      throw badRequest('FILE_REQUIRED', 'Image file is required.')
    }

    const buffer = args.file.buffer
    if (!buffer) {
      throw badRequest('FILE_REQUIRED', 'Image file is required.')
    }

    try {
      assertDeclaredMimeMatchesContent(args.file.mimetype, buffer)
    } catch {
      throw badRequest('INVALID_FILE', 'File content does not match the declared type.')
    }

    const uploaded = await uploadFile({
      buffer,
      mimeType: args.file.mimetype,
      folder: args.folder,
    })
    if (!uploaded?.url || !uploaded?.key) {
      throw new Error('Failed to upload file to S3.')
    }

    const saved = await args.persist(uploaded.url, uploaded.key)

    if (args.currentKey && args.currentKey !== uploaded.key) {
      try {
        await deleteFile(args.currentKey)
      } catch {
        // Orphan cleanup is best-effort after the new object is referenced.
      }
    }

    return saved
  }

  export const uploadProfilePicture = async (userId: string, file: Express.Multer.File) => {
    const profile = await ProfileRepo.findByUserId(userId)
    if (!profile) {
      throw notFound('PROFILE_NOT_FOUND')
    }

    return replaceImage({
      userId,
      file,
      folder: `users/${userId}/profile`,
      currentKey: profile.profilePictureKey,
      persist: (url, key) => ProfileRepo.updateProfilePicture(userId, url, key),
    })
  }

  export const deleteProfilePicture = async (userId: string) => {
    const profile = await ProfileRepo.findByUserId(userId)
    if (!profile) {
      throw notFound('PROFILE_NOT_FOUND')
    }

    const removed = await ProfileRepo.removeProfilePicture(userId)
    if (profile.profilePictureKey) {
      try {
        await deleteFile(profile.profilePictureKey)
      } catch {
        // best-effort
      }
    }
    return removed
  }

  export const uploadCoverImage = async (userId: string, file: Express.Multer.File) => {
    const profile = await ProfileRepo.findByUserId(userId)
    if (!profile) {
      throw notFound('PROFILE_NOT_FOUND')
    }

    return replaceImage({
      userId,
      file,
      folder: `users/${userId}/cover`,
      currentKey: profile.coverImageKey,
      persist: (url, key) => ProfileRepo.updateCoverImage(userId, url, key),
    })
  }

  export const deleteCoverImage = async (userId: string) => {
    const profile = await ProfileRepo.findByUserId(userId)
    if (!profile) {
      throw notFound('PROFILE_NOT_FOUND')
    }

    const removed = await ProfileRepo.removeCoverImage(userId)
    if (profile.coverImageKey) {
      try {
        await deleteFile(profile.coverImageKey)
      } catch {
        // best-effort
      }
    }
    return removed
  }
}

// --- friends/friends.service.ts ---
namespace FriendsService {
  export async function sendFriendRequest(senderId: string, receiverId: string) {
    if (senderId === receiverId) {
      throw badRequest('CANNOT_FRIEND_SELF', 'You cannot send a friend request to yourself.')
    }

    const receiver = await FriendsRepo.findUserById(receiverId)

    if (!receiver) {
      throw notFound('USER_NOT_FOUND')
    }

    const existingRequest = await FriendsRepo.findFriendRequest(senderId, receiverId)

    if (existingRequest) {
      throw conflict('FRIEND_REQUEST_EXISTS', 'Friend request already exists.')
    }

    try {
      return await FriendsRepo.createFriendRequest(senderId, receiverId)
    } catch (error) {
      if (typeof error === 'object' && error && 'code' in error && error.code === 'P2002') {
        throw conflict('FRIEND_REQUEST_EXISTS', 'Friend request already exists.')
      }
      throw error
    }
  }

  export async function acceptFriendRequest(userId: string, requestId: string) {
    const request = await FriendsRepo.findFriendRequestById(requestId)

    if (!request) {
      throw notFound('FRIEND_REQUEST_NOT_FOUND')
    }

    if (request.receiverId !== userId) {
      throw forbidden('UNAUTHORIZED')
    }

    if (request.status !== 'PENDING') {
      throw conflict('FRIEND_REQUEST_NOT_PENDING', 'Friend request is no longer pending.')
    }

    return FriendsRepo.updateFriendRequestStatus(requestId, 'ACCEPTED')
  }

  export async function rejectFriendRequest(userId: string, requestId: string) {
    const request = await FriendsRepo.findFriendRequestById(requestId)

    if (!request) {
      throw notFound('FRIEND_REQUEST_NOT_FOUND')
    }

    if (request.receiverId !== userId) {
      throw forbidden('UNAUTHORIZED')
    }

    if (request.status !== 'PENDING') {
      throw conflict('FRIEND_REQUEST_NOT_PENDING', 'Friend request is no longer pending.')
    }

    return FriendsRepo.updateFriendRequestStatus(requestId, 'REJECTED')
  }

  export async function cancelFriendRequest(userId: string, requestId: string) {
    const request = await FriendsRepo.findFriendRequestById(requestId)

    if (!request) {
      throw notFound('FRIEND_REQUEST_NOT_FOUND')
    }

    if (request.senderId !== userId) {
      throw forbidden('UNAUTHORIZED')
    }

    if (request.status !== 'PENDING') {
      throw conflict('FRIEND_REQUEST_NOT_PENDING', 'Only pending requests can be cancelled.')
    }

    return FriendsRepo.updateFriendRequestStatus(requestId, 'CANCELLED')
  }

  export async function unfriend(userId: string, friendId: string) {
    const friendship = await FriendsRepo.findAcceptedFriendship(userId, friendId)

    if (!friendship) {
      throw notFound('FRIENDSHIP_NOT_FOUND')
    }

    return FriendsRepo.deleteFriendship(friendship.id)
  }

  export async function getMyFriends(userId: string) {
    return FriendsRepo.getMyFriends(userId)
  }

  export async function getIncomingRequests(userId: string) {
    return FriendsRepo.getIncomingRequests(userId)
  }

  export async function getOutgoingRequests(userId: string) {
    return FriendsRepo.getOutgoingRequests(userId)
  }

  export async function getMutualFriends(userId: string, otherUserId: string) {
    return FriendsRepo.getMutualFriends(userId, otherUserId)
  }
}

// --- chat/chat.service.ts ---
namespace ChatService {
  export const generateChatToken = async (userId: string) => {
    const user = await ChatRepo.findUserById(userId)

    if (!user) {
      throw new Error('USER_NOT_FOUND')
    }

    await streamClient.upsertUser({
      id: user.id,
      name: user.username ?? '',
      image: user.image ?? undefined,
    })

    return streamClient.createToken(user.id)
  }
  export const createOneToOneConversation = async ({
    userId,
    otherUserId,
  }: {
    userId: string
    otherUserId: string
  }) => {
    if (userId === otherUserId) {
      throw new Error('CANNOT_CHAT_WITH_SELF')
    }

    const users = await ChatRepo.findUsersByIds([userId, otherUserId])

    if (users.length !== 2) {
      throw new Error('USER_NOT_FOUND')
    }

    const currentUser = users.find((user) => user.id === userId)

    const otherUser = users.find((user) => user.id === otherUserId)

    if (!currentUser || !otherUser) {
      throw new Error('USER_NOT_FOUND')
    }

    await streamClient.upsertUsers([
      {
        id: currentUser.id,
        name: currentUser.username ?? '',
        image: currentUser.image ?? undefined,
      },
      {
        id: otherUser.id,
        name: otherUser.username ?? '',
        image: otherUser.image ?? undefined,
      },
    ])

    const channelId = ChatLib.getChannelId(userId, otherUserId)

    const channel = streamClient.channel('messaging', channelId, {
      created_by_id: userId,
      members: [userId, otherUserId],
    })

    await channel.create()

    return {
      channelId,
      type: 'messaging',
      created_by_id: userId,
      members: [userId, otherUserId],
    }
  }

  export const getMyConversations = async (userId: string) => {
    const filter = {
      type: 'messaging',
      members: {
        $in: [userId],
      },
    }

    const sort = [
      {
        last_message_at: -1 as const,
      },
    ]

    const channels = await streamClient.queryChannels(filter, sort, {
      watch: false,
      state: true,
      limit: 30,
    })

    return channels.map((channel) => ({
      id: channel.id,
      cid: channel.cid,
      members: channel.state.members,
      lastMessage: channel.state.messages[channel.state.messages.length - 1] ?? null,
    }))
  }
}

// --- video/video.service.ts ---
namespace VideoService {
  const ONE_ON_ONE_TYPES: VideoCallType[] = ['ONE_ON_ONE', 'MENTORSHIP']

  export const generateVideoToken = async (userId: string) => {
    const user = await VideoRepo.findUserById(userId)
    if (!user) {
      throw notFound('USER_NOT_FOUND')
    }

    if (process.env.NODE_ENV !== 'test') {
      await streamVideoClient.upsertUsers([
        {
          id: user.id,
          name: user.name || user.username || 'Lumina User',
          image: user.image || undefined,
        },
      ])
    }

    const token = streamVideoClient.generateUserToken({ user_id: user.id })
    return {
      token,
      apiKey: STREAM_API_KEY,
      userId: user.id,
    }
  }

  export const createCall = async ({
    userId,
    type = 'ONE_ON_ONE',
    title,
    participantIds = [],
  }: {
    userId: string
    type?: VideoCallType
    title?: string
    participantIds?: string[]
  }) => {
    const caller = await VideoRepo.findUserById(userId)
    if (!caller) {
      throw notFound('USER_NOT_FOUND')
    }

    const uniqueParticipantIds = Array.from(new Set(participantIds.filter(Boolean)))
    if (uniqueParticipantIds.length !== participantIds.length) {
      throw badRequest('DUPLICATE_PARTICIPANTS')
    }
    if (uniqueParticipantIds.includes(userId)) {
      throw badRequest('CANNOT_CALL_SELF')
    }

    if (ONE_ON_ONE_TYPES.includes(type)) {
      if (uniqueParticipantIds.length !== 1) {
        throw badRequest('ONE_ON_ONE_REQUIRES_SINGLE_PARTICIPANT')
      }
      const targetUserId = uniqueParticipantIds[0]
      const targetUser = await VideoRepo.findUserById(targetUserId as string)
      if (!targetUser) {
        throw badRequest('TARGET_USER_NOT_FOUND')
      }
    }

    for (const participantId of uniqueParticipantIds) {
      const participant = await VideoRepo.findUserById(participantId)
      if (!participant) {
        throw badRequest('TARGET_USER_NOT_FOUND')
      }
    }

    const allParticipantIds = [userId, ...uniqueParticipantIds]
    const streamCallId = `lumina_call_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`

    const call = await VideoRepo.createVideoCall({
      streamCallId,
      type,
      title,
      createdById: userId,
      participantIds: allParticipantIds,
    })

    return {
      callId: call.id,
      streamCallId: call.streamCallId,
      type: call.type,
      title: call.title,
      status: call.status,
      createdBy: call.createdBy,
      participants: call.participants,
      createdAt: call.createdAt,
    }
  }

  function assertCallAccess(
    call: NonNullable<Awaited<ReturnType<typeof VideoRepo.findCallById>>>,
    userId: string
  ) {
    const isParticipant = call.participants.some((p) => p.userId === userId)
    const isHost = call.createdById === userId
    if (!isParticipant && !isHost) {
      throw forbidden('CALL_UNAUTHORIZED')
    }
  }

  export const getCallDetails = async (callId: string, userId: string) => {
    const call = await VideoRepo.findCallById(callId)
    if (!call) {
      throw notFound('CALL_NOT_FOUND')
    }
    assertCallAccess(call, userId)
    return call
  }

  export const joinCall = async (callId: string, userId: string) => {
    const call = await getCallDetails(callId, userId)
    if (call.status === 'ENDED' || call.status === 'CANCELLED') {
      throw new Error('CALL_EXPIRED')
    }

    await VideoRepo.updateParticipantStatus({
      callId: call.id,
      userId,
      status: 'JOINED',
      joinedAt: new Date(),
    })

    const { token, apiKey } = await generateVideoToken(userId)

    return {
      callId: call.id,
      streamCallId: call.streamCallId,
      type: call.type,
      title: call.title,
      apiKey,
      token,
      joinedAt: new Date(),
    }
  }

  export const respondToCallInvite = async (
    callId: string,
    userId: string,
    response: 'ACCEPT' | 'REJECT'
  ) => {
    const call = await VideoRepo.findCallById(callId)
    if (!call) {
      throw notFound('CALL_NOT_FOUND')
    }

    const invite = call.participants.find((p) => p.userId === userId)
    if (!invite) {
      throw forbidden('INVITE_UNAUTHORIZED')
    }

    const status = response === 'ACCEPT' ? 'ACCEPTED' : 'REJECTED'
    await VideoRepo.updateParticipantStatus({
      callId: call.id,
      userId,
      status,
    })

    return {
      callId: call.id,
      userId,
      status,
    }
  }

  export const endCall = async (callId: string, userId: string) => {
    const call = await VideoRepo.findCallById(callId)
    if (!call) {
      throw notFound('CALL_NOT_FOUND')
    }

    if (call.createdById !== userId) {
      throw forbidden('ONLY_HOST_CAN_END_CALL')
    }

    const endedCall = await VideoRepo.updateCallStatus(call.id, 'ENDED', new Date())

    return {
      callId: endedCall.id,
      status: endedCall.status,
      endedAt: endedCall.endedAt,
    }
  }

  export const getCallHistory = async (userId: string) => {
    const calls = await VideoRepo.getUserCallHistory(userId)
    return calls.map((call) => {
      let durationMinutes = 0
      if (call.startedAt && call.endedAt) {
        durationMinutes = Math.max(
          1,
          Math.round((call.endedAt.getTime() - call.startedAt.getTime()) / 60000)
        )
      }
      return {
        id: call.id,
        streamCallId: call.streamCallId,
        type: call.type,
        title: call.title,
        status: call.status,
        durationMinutes,
        startedAt: call.startedAt,
        endedAt: call.endedAt,
        createdBy: call.createdBy,
        participants: call.participants,
      }
    })
  }
}

// --- leetcode/leetcode.service.ts ---
namespace LeetcodeGraphql {
  const LEETCODE_URL = process.env.LEETCODE_URL || 'https://leetcode.com/graphql'

  interface LeetCodeGraphQLResponse {
    data?: {
      matchedUser?: {
        username: string
        submitStats?: {
          acSubmissionNum?: {
            difficulty: string
            count: number
          }[]
        }
      }
      userContestRanking?: {
        rating?: number
        globalRanking?: number
      }
    }
    errors?: unknown[]
  }

  export async function fetchLeetCodeStats(username: string) {
    const query = `
    query userProfile($username: String!) {
      matchedUser(username: $username) {
        username
        submitStats {
          acSubmissionNum {
            difficulty
            count
          }
        }
      }
      userContestRanking(username: $username) {
        rating
        globalRanking
      }
    }
  `

    const response = await fetch(LEETCODE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Referer: 'https://leetcode.com/',
        'User-Agent': 'Mozilla/5.0',
      },
      body: JSON.stringify({
        query,
        variables: { username },
      }),
    })

    if (!response.ok) {
      throw new Error(`LEETCODE_HTTP_${response.status}`)
    }

    const result = (await response.json()) as LeetCodeGraphQLResponse

    if (result.errors?.length) {
      throw new Error('LEETCODE_GRAPHQL_ERROR')
    }

    if (!result.data) {
      throw new Error('LEETCODE_EMPTY_RESPONSE')
    }

    return result.data
  }

  export function transformLeetCodeStats(
    data: NonNullable<LeetCodeGraphQLResponse['data']>
  ): LeetCodeStats {
    const user = data.matchedUser

    if (!user) {
      throw new Error('LEETCODE_USER_NOT_FOUND')
    }

    const submissions = user.submitStats?.acSubmissionNum ?? []
    const easySolved = submissions.find((entry) => entry.difficulty === 'Easy')?.count ?? 0
    const mediumSolved = submissions.find((entry) => entry.difficulty === 'Medium')?.count ?? 0
    const hardSolved = submissions.find((entry) => entry.difficulty === 'Hard')?.count ?? 0

    return {
      username: user.username,
      solvedCount: easySolved + mediumSolved + hardSolved,
      easySolved,
      mediumSolved,
      hardSolved,
      rating: data.userContestRanking?.rating ? Math.round(data.userContestRanking.rating) : null,
      globalRank: data.userContestRanking?.globalRanking ?? null,
    }
  }
}

// --- leetcode/leetcode.sync.service.ts ---
namespace LeetcodeSync {
  const MANUAL_SYNC_RATE_LIMIT_KEY = (userId: string) => `leetcode:sync:ratelimit:${userId}`
  const MANUAL_SYNC_RATE_LIMIT_SECONDS = 300

  function isValidStats(stats: LeetCodeStats, profile: ProfileLeetCodeSnapshot) {
    if (
      stats.easySolved < 0 ||
      stats.mediumSolved < 0 ||
      stats.hardSolved < 0 ||
      stats.solvedCount < 0
    ) {
      return false
    }

    if (stats.solvedCount !== stats.easySolved + stats.mediumSolved + stats.hardSolved) {
      return false
    }

    const previousSolved = profile.leetcodeSolved ?? 0

    if (previousSolved > 0 && stats.solvedCount === 0) {
      return false
    }

    return true
  }

  export async function syncProfileById(profileId: string): Promise<SyncResult> {
    const profile = await LeetcodeSyncRepo.findProfileById(profileId)

    if (!profile) {
      throw new Error('PROFILE_NOT_FOUND')
    }

    return syncProfile(profile)
  }

  export async function syncProfileByUserId(userId: string): Promise<SyncResult> {
    const profile = await LeetcodeSyncRepo.findProfileByUserId(userId)

    if (!profile) {
      throw new Error('PROFILE_NOT_FOUND')
    }

    return syncProfile(profile)
  }

  async function syncProfile(profile: ProfileLeetCodeSnapshot): Promise<SyncResult> {
    if (!profile.leetcodeUsername) {
      return { status: 'skipped', reason: 'NO_LEETCODE_USERNAME' }
    }

    try {
      const raw = await LeetcodeGraphql.fetchLeetCodeStats(profile.leetcodeUsername)
      const stats = LeetcodeGraphql.transformLeetCodeStats(raw)

      if (!isValidStats(stats, profile)) {
        const error = 'INVALID_STATS_RESPONSE'
        await LeetcodeSyncRepo.markSyncFailed(profile.id, error)
        console.warn(
          `[leetcode-sync] Invalid stats for ${profile.leetcodeUsername}: refusing to overwrite stored data`
        )
        return { status: 'failed', error }
      }

      const changed = LeetcodeSyncRepo.hasStatsChanged(profile, stats)

      if (changed) {
        await LeetcodeSyncRepo.updateStats(profile.id, stats)
        console.log(
          `[leetcode-sync] Updated ${profile.leetcodeUsername}: ${profile.leetcodeSolved ?? 0} -> ${stats.solvedCount}`
        )
      } else {
        await LeetcodeSyncRepo.touchSyncSuccess(profile.id)
        console.log(`[leetcode-sync] No changes for ${profile.leetcodeUsername}`)
      }

      await LeaderboardRepo.upsertEntry(profile.userId, stats.solvedCount)

      return { status: 'success', changed, stats }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'LEETCODE_SYNC_FAILED'
      await LeetcodeSyncRepo.markSyncFailed(profile.id, message)
      console.error(`[leetcode-sync] Failed for ${profile.leetcodeUsername}:`, message)
      throw error
    }
  }

  export async function canManualSync(userId: string) {
    const exists = await redis.exists(MANUAL_SYNC_RATE_LIMIT_KEY(userId))
    return exists === 0
  }

  export async function recordManualSync(userId: string) {
    await redis.set(MANUAL_SYNC_RATE_LIMIT_KEY(userId), '1', 'EX', MANUAL_SYNC_RATE_LIMIT_SECONDS)
  }

  export async function getManualSyncCooldownSeconds(userId: string) {
    const ttl = await redis.ttl(MANUAL_SYNC_RATE_LIMIT_KEY(userId))
    return ttl > 0 ? ttl : 0
  }
}

// --- leaderboard/leaderboard.service.ts ---
namespace LeaderboardService {
  const DEFAULT_LIMIT = 50
  const MAX_LIMIT = 100
  const AROUND_RANGE = 5

  const profileSelect = {
    userId: true,
    firstName: true,
    lastName: true,
    profilePicture: true,
    leetcodeUsername: true,
    leetcodeSolved: true,
    leetcodeEasy: true,
    leetcodeMedium: true,
    leetcodeHard: true,
    leetcodeRating: true,
    leetcodeUpdatedAt: true,
    user: {
      select: {
        username: true,
        name: true,
      },
    },
  } as const

  async function enrichEntries(
    entries: { userId: string; solvedCount: number }[],
    startRank: number
  ): Promise<LeaderboardEntry[]> {
    if (entries.length === 0) return []

    const userIds = entries.map((entry) => entry.userId)
    const profiles = await prisma.profile.findMany({
      where: { userId: { in: userIds } },
      select: profileSelect,
    })

    const profileMap = new Map(profiles.map((profile) => [profile.userId, profile]))

    return entries.map((entry, index) => {
      const profile = profileMap.get(entry.userId)

      return {
        rank: startRank + index,
        userId: entry.userId,
        solvedCount: entry.solvedCount,
        username: profile?.user?.username ?? null,
        name:
          profile?.user?.name ||
          `${profile?.firstName ?? ''} ${profile?.lastName ?? ''}`.trim() ||
          null,
        profilePicture: profile?.profilePicture ?? null,
        leetcodeUsername: profile?.leetcodeUsername ?? null,
        easySolved: profile?.leetcodeEasy ?? null,
        mediumSolved: profile?.leetcodeMedium ?? null,
        hardSolved: profile?.leetcodeHard ?? null,
        leetcodeRating: profile?.leetcodeRating ?? null,
        lastSyncedAt: profile?.leetcodeUpdatedAt ?? null,
      }
    })
  }

  export async function rebuildLeaderboardFromDatabase() {
    const profiles = await LeetcodeSyncRepo.findSuccessfulProfilesForRebuild()

    await LeaderboardRepo.clearLeaderboard()
    await LeaderboardRepo.bulkUpsertEntries(
      profiles
        .filter((profile) => profile.leetcodeSolved != null)
        .map((profile) => ({
          userId: profile.userId,
          solvedCount: profile.leetcodeSolved!,
        }))
    )

    return profiles.length
  }

  async function ensureLeaderboardReady() {
    const total = await LeaderboardRepo.getTotalCount()
    if (total === 0) {
      await rebuildLeaderboardFromDatabase()
    }
  }

  export function parsePagination(query: { page?: unknown; limit?: unknown }) {
    const page = Math.max(Number(query.page) || 1, 1)
    const limit = Math.min(Math.max(Number(query.limit) || DEFAULT_LIMIT, 1), MAX_LIMIT)
    const offset = (page - 1) * limit

    return { page, limit, offset }
  }

  export async function getLeaderboard(page = 1, limit = DEFAULT_LIMIT) {
    await ensureLeaderboardReady()

    const offset = (page - 1) * limit
    const [totalUsers, entries] = await Promise.all([
      LeaderboardRepo.getTotalCount(),
      LeaderboardRepo.getEntriesByOffset(limit, offset),
    ])

    return {
      page,
      limit,
      totalUsers,
      entries: await enrichEntries(entries, offset + 1),
    }
  }

  export async function getMyLeaderboardStats(userId: string) {
    await ensureLeaderboardReady()

    const [rank, solvedCount, totalUsers] = await Promise.all([
      LeaderboardRepo.getUserRank(userId),
      LeaderboardRepo.getUserScore(userId),
      LeaderboardRepo.getTotalCount(),
    ])

    return {
      rank,
      solvedCount,
      totalUsers,
    }
  }

  export async function getUserLeaderboardStats(userId: string) {
    const stats = await getMyLeaderboardStats(userId)

    if (stats.rank === null) {
      return null
    }

    const profile = await prisma.profile.findUnique({
      where: { userId },
      select: profileSelect,
    })

    return {
      ...stats,
      user: profile
        ? {
            userId: profile.userId,
            username: profile.user?.username ?? null,
            name:
              profile.user?.name ||
              `${profile.firstName ?? ''} ${profile.lastName ?? ''}`.trim() ||
              null,
            profilePicture: profile.profilePicture,
            leetcodeUsername: profile.leetcodeUsername,
            easySolved: profile.leetcodeEasy,
            mediumSolved: profile.leetcodeMedium,
            hardSolved: profile.leetcodeHard,
            leetcodeRating: profile.leetcodeRating,
            lastSyncedAt: profile.leetcodeUpdatedAt,
          }
        : null,
    }
  }

  export async function getLeaderboardAroundUser(userId: string, range = AROUND_RANGE) {
    await ensureLeaderboardReady()

    const [myRank, totalUsers] = await Promise.all([
      LeaderboardRepo.getUserRank(userId),
      LeaderboardRepo.getTotalCount(),
    ])

    if (myRank === null) {
      return {
        myRank: null,
        totalUsers,
        entries: [] as LeaderboardEntry[],
      }
    }

    const startRank = Math.max(myRank - range, 1)
    const endRank = Math.min(myRank + range, totalUsers)
    const entries = await LeaderboardRepo.getEntriesByRankRange(startRank, endRank)

    return {
      myRank,
      totalUsers,
      entries: await enrichEntries(entries, startRank),
    }
  }
}

// --- posts/posts.service.ts ---
namespace PostsService {
  export const createPost = async ({ userId, body, files }: CreatePostInput) => {
    const { content, visibility, anonymous = false, location } = body
    const trimmedLocation = location?.trim() ?? null

    const mediaFiles = files ?? []

    if ((!content || content.trim() === '') && mediaFiles.length === 0) {
      throw new Error('Post must contain either text or media.')
    }

    if (mediaFiles.length > 10) {
      throw new Error('Maximum 10 media files are allowed.')
    }

    const uploadedMedia: Array<{
      type: string
      url: string
      key: string
      mimeType: string
      size: number
      width: number | null
      height: number | null
      duration: number | null
    }> = []

    try {
      for (const file of mediaFiles) {
        if (file.mimetype.startsWith('image/')) {
          if (file.size > PostMedia.MAX_IMAGE_SIZE_BYTES) {
            throw badRequest('IMAGE_TOO_LARGE', 'Each image must be 5 MB or less.')
          }
          assertDeclaredMimeMatchesContent(file.mimetype, file.buffer)
          const { width, height } = await PostMedia.getImageDimensions(file as any)
          const uploaded = await uploadFile({
            buffer: file.buffer,
            mimeType: file.mimetype,
            folder: `posts/${userId}/media`,
          })
          uploadedMedia.push({
            type: 'IMAGE',
            url: uploaded.url,
            key: uploaded.key,
            mimeType: file.mimetype,
            size: file.size,
            width,
            height,
            duration: null,
          })
          continue
        }

        if (file.mimetype.startsWith('video/')) {
          if (file.size > PostMedia.MAX_VIDEO_SIZE_BYTES) {
            throw badRequest('VIDEO_TOO_LARGE', 'Each video must be 25 MB or less.')
          }
          assertDeclaredMimeMatchesContent(file.mimetype, file.buffer)
          const { width, height, duration } = await PostMedia.getVideoMetadata(file.buffer)
          const validatedDuration = PostMedia.assertValidVideoDuration(duration)
          const uploaded = await uploadFile({
            buffer: file.buffer,
            mimeType: file.mimetype,
            folder: `posts/${userId}/media`,
          })
          uploadedMedia.push({
            type: 'VIDEO',
            url: uploaded.url,
            key: uploaded.key,
            mimeType: file.mimetype,
            size: file.size,
            width,
            height,
            duration: validatedDuration,
          })
          continue
        }

        throw badRequest('UNSUPPORTED_MEDIA', 'Unsupported media type')
      }

      return await prisma.$transaction(async (tx) => {
        const post = await PostsRepo.createPost(
          tx,
          userId,
          content,
          visibility,
          anonymous,
          trimmedLocation ? trimmedLocation : undefined
        )

        if (uploadedMedia.length > 0) {
          await PostsRepo.createMedia(tx, post.id, uploadedMedia)
        }

        return await PostsRepo.findPostById(tx, post.id)
      })
    } catch (error) {
      await Promise.all(
        uploadedMedia.map(async (media) => {
          try {
            await deleteFile(media.key)
          } catch {
            // best-effort orphan cleanup
          }
        })
      )
      throw error
    }
  }

  export const toggleLike = async (userId: string, postId: string) => {
    return prisma.$transaction(async (tx) => {
      const existing = await PostsRepo.findLike(tx, userId, postId)
      if (existing) {
        await tx.like.delete({
          where: { id: existing.id },
        })

        await tx.post.update({
          where: { id: postId },
          data: {
            likeCount: {
              decrement: 1,
            },
          },
        })

        return {
          liked: false,
        }
      }

      await tx.like.create({
        data: {
          userId,
          postId,
        },
      })

      await tx.post.update({
        where: { id: postId },
        data: {
          likeCount: {
            increment: 1,
          },
        },
      })

      return {
        liked: true,
      }
    })
  }
  export const getLikeCount = async (postId: string) => {
    return prisma.$transaction(async (tx) => {
      const count = await PostsRepo.getLikeCount(tx, postId)
      return count
    })
  }

  export const createComment = async ({
    postId,
    userId,
    content,
    parentId,
  }: {
    postId: string
    userId: string
    content: string
    parentId?: string | null
  }) => {
    const post = await PostsRepo.findPostWithAuthor(prisma, postId)

    if (!post) {
      throw notFound('POST_NOT_FOUND')
    }

    if (parentId) {
      const parentComment = await PostsRepo.findCommentById(prisma, parentId)

      if (!parentComment) {
        throw notFound('PARENT_COMMENT_NOT_FOUND')
      }

      if (parentComment.postId !== postId) {
        throw badRequest('INVALID_PARENT_COMMENT')
      }
    }

    const comment = await PostsRepo.createComment({
      tx: prisma,
      postId,
      userId,
      content,
      parentId,
    })

    if (post.authorId !== userId) {
      await PostsRepo.createCommentNotification({
        tx: prisma,
        postAuthorId: post.authorId,
      })
    }

    return comment
  }

  const MAX_PINNED_COMMENTS = 3

  export const listComments = async (postId: string, limit: number, cursor?: string) => {
    const post = await PostsRepo.findPostById(prisma, postId)
    if (!post) {
      throw notFound('POST_NOT_FOUND')
    }
    return PostsRepo.listComments(postId, limit, cursor)
  }

  export const pinComment = async (userId: string, commentId: string, isPinned: boolean) => {
    const comment = await PostsRepo.findCommentById(prisma, commentId)
    if (!comment) {
      throw notFound('COMMENT_NOT_FOUND')
    }
    const post = await PostsRepo.findPostById(prisma, comment.postId)
    if (!post) {
      throw notFound('POST_NOT_FOUND')
    }
    if (post.authorId !== userId) {
      throw forbidden('ONLY_AUTHOR_CAN_PIN')
    }

    return prisma.$transaction(
      async (tx) => {
        if (isPinned) {
          const pinned = await PostsRepo.countPinnedComments(tx, comment.postId)
          if (pinned >= MAX_PINNED_COMMENTS) {
            throw conflict('PIN_LIMIT_REACHED', 'Maximum pinned comments exceeded')
          }
        }
        return PostsRepo.setCommentPinned(tx, commentId, isPinned)
      },
      { isolationLevel: 'Serializable' }
    )
  }

  export const deleteComment = async (userId: string, commentId: string) => {
    const comment = await PostsRepo.findCommentById(prisma, commentId)
    if (!comment) {
      throw notFound('COMMENT_NOT_FOUND')
    }
    const post = await PostsRepo.findPostById(prisma, comment.postId)
    if (!post) {
      throw notFound('POST_NOT_FOUND')
    }
    if (comment.userId !== userId && post.authorId !== userId) {
      throw forbidden('COMMENT_DELETE_FORBIDDEN')
    }
    return PostsRepo.deleteComment(commentId)
  }

  export const toggleSavePost = async ({ postId, userId }: { postId: string; userId: string }) => {
    const post = await PostsRepo.findPostById(prisma as any, postId)

    if (!post) {
      throw new Error('POST_NOT_FOUND')
    }

    const existing = await PostsRepo.findSavedPost(prisma, userId, postId)

    if (existing) {
      await PostsRepo.deleteSavedPost(prisma as any, userId, postId)

      return {
        saved: false,
      }
    }

    await PostsRepo.createSavedPost(prisma, userId, postId)

    return {
      saved: true,
    }
  }

  export const getMySavedPosts = async (userId: string) => {
    return PostsRepo.findSavedPostsByUser(prisma as any, userId)
  }
}

// --- comments/comments.service.ts ---
namespace CommentsService {
  export const MAX_COMMENT_DEPTH = 10 // Depths 0 through 9 (max depth limit 10)
  export const MAX_PINNED_COMMENTS_PER_POST = 3
  export const DEFAULT_PAGE_LIMIT = 20
  export const MAX_PAGE_LIMIT = 50

  const EMOJI_REGEX = /^(\p{Extended_Pictographic}|\p{Emoji_Presentation}|\u200d|\ufe0f){1,16}$/u

  export function validateEmoji(emoji: string): string {
    const trimmed = emoji?.trim()
    if (!trimmed || trimmed.length === 0) {
      throw { status: 400, message: 'Emoji character is required' }
    }
    if (trimmed.length > 16 || !EMOJI_REGEX.test(trimmed)) {
      throw { status: 400, message: 'INVALID_EMOJI_FORMAT' }
    }
    return trimmed
  }

  export async function createCommentService(params: {
    postId: string
    userId: string
    content: string
    parentId?: string
  }) {
    const { postId, userId, content, parentId } = params

    const trimmedContent = content?.trim()
    if (!trimmedContent || trimmedContent.length === 0) {
      throw { status: 400, message: 'Comment content cannot be empty' }
    }

    if (trimmedContent.length > 2000) {
      throw { status: 400, message: 'Comment content exceeds maximum limit of 2000 characters' }
    }

    const post = await CommentsRepo.findPostById(postId)
    if (!post) {
      throw { status: 404, message: 'POST_NOT_FOUND' }
    }

    let calculatedDepth = 0
    if (parentId) {
      const parentComment = await CommentsRepo.findCommentById(parentId)
      if (!parentComment) {
        throw { status: 404, message: 'PARENT_COMMENT_NOT_FOUND' }
      }

      if (parentComment.postId !== postId) {
        throw { status: 400, message: 'PARENT_COMMENT_POST_MISMATCH' }
      }

      if (parentComment.isDeleted) {
        throw { status: 400, message: 'CANNOT_REPLY_TO_DELETED_COMMENT' }
      }

      if (parentComment.depth >= MAX_COMMENT_DEPTH - 1) {
        throw { status: 422, message: 'COMMENT_MAX_DEPTH_EXCEEDED' }
      }

      calculatedDepth = parentComment.depth + 1
    }

    const comment = await CommentsRepo.createCommentRecord({
      content: trimmedContent,
      postId,
      userId,
      parentId,
      depth: calculatedDepth,
    })

    // Parse @username mentions
    const mentionMatches = trimmedContent.match(/@([a-zA-Z0-9_]+)/g)
    if (mentionMatches && mentionMatches.length > 0) {
      const usernames = Array.from(new Set(mentionMatches.map((m) => m.substring(1))))
      const mentionedUserIds = await CommentsRepo.createMentionsRepo(comment.id, usernames)

      for (const mentionedUserId of mentionedUserIds) {
        if (mentionedUserId !== userId) {
          await prisma.notification.create({
            data: {
              userId: mentionedUserId,
              title: 'You were mentioned in a comment',
              body: `${comment.user.name || 'Someone'} mentioned you in a comment`,
              type: 'COMMENT_MENTION',
            },
          })
        }
      }
    }

    // Create notification for post author / parent author
    if (post.authorId !== userId) {
      await prisma.notification.create({
        data: {
          userId: post.authorId,
          title: parentId ? 'New reply to comment' : 'New comment on your post',
          body: `${comment.user.name || 'Someone'} ${parentId ? 'replied to a comment' : 'commented on your post'}`,
          type: parentId ? 'COMMENT_REPLY' : 'COMMENT',
        },
      })
    }

    return comment
  }

  export async function getCommentsForPostService(postId: string, cursor?: string, limit = 20) {
    const post = await CommentsRepo.findPostById(postId)
    if (!post) {
      throw { status: 404, message: 'POST_NOT_FOUND' }
    }

    const numLimit =
      typeof limit === 'number' ? limit : parseInt(String(limit), 10) || DEFAULT_PAGE_LIMIT
    const safeLimit = Math.min(Math.max(1, numLimit), MAX_PAGE_LIMIT)

    return CommentsRepo.getCommentsForPostRepo(postId, cursor, safeLimit)
  }

  export async function editCommentService(params: {
    commentId: string
    userId: string
    content: string
  }) {
    const { commentId, userId, content } = params

    const trimmedContent = content?.trim()
    if (!trimmedContent || trimmedContent.length === 0) {
      throw { status: 400, message: 'Comment content cannot be empty' }
    }

    const comment = await CommentsRepo.findCommentById(commentId)
    if (!comment) {
      throw { status: 404, message: 'COMMENT_NOT_FOUND' }
    }

    if (comment.userId !== userId) {
      throw { status: 403, message: 'NOT_AUTHORIZED_TO_EDIT_COMMENT' }
    }

    if (comment.isDeleted) {
      throw { status: 400, message: 'CANNOT_EDIT_DELETED_COMMENT' }
    }

    return CommentsRepo.updateCommentContentRepo(
      commentId,
      trimmedContent,
      comment.content,
      userId,
      comment.version
    )
  }

  export async function getCommentEditHistoryService(commentId: string) {
    const comment = await CommentsRepo.findCommentById(commentId)
    if (!comment) {
      throw { status: 404, message: 'COMMENT_NOT_FOUND' }
    }

    return CommentsRepo.getCommentEditHistoryRepo(commentId)
  }

  export async function deleteCommentService(params: {
    commentId: string
    userId: string
    userRole?: string
  }) {
    const { commentId, userId, userRole } = params

    const comment = await CommentsRepo.findCommentById(commentId)
    if (!comment) {
      throw { status: 404, message: 'COMMENT_NOT_FOUND' }
    }

    if (comment.isDeleted) {
      throw { status: 400, message: 'COMMENT_ALREADY_DELETED' }
    }

    const isOwner = comment.userId === userId
    const isPostOwner = comment.post.authorId === userId
    const isAdmin = userRole === 'ADMIN' || userRole === 'MODERATOR'

    if (!isOwner && !isPostOwner && !isAdmin) {
      throw { status: 403, message: 'NOT_AUTHORIZED_TO_DELETE_COMMENT' }
    }

    return CommentsRepo.softDeleteCommentRepo(commentId)
  }

  export async function toggleReactionService(params: {
    commentId: string
    userId: string
    emoji: string
  }) {
    const { commentId, userId, emoji } = params
    const validEmoji = validateEmoji(emoji)

    const comment = await CommentsRepo.findCommentById(commentId)
    if (!comment) {
      throw { status: 404, message: 'COMMENT_NOT_FOUND' }
    }

    if (comment.isDeleted) {
      throw { status: 400, message: 'CANNOT_REACT_TO_DELETED_COMMENT' }
    }

    const result = await CommentsRepo.toggleReactionRepo(commentId, userId, validEmoji)

    if (result.action === 'added' && comment.userId !== userId) {
      await prisma.notification.create({
        data: {
          userId: comment.userId,
          title: 'New reaction on your comment',
          body: `Someone reacted with ${validEmoji} to your comment`,
          type: 'COMMENT_REACTION',
        },
      })
    }

    return result
  }

  export async function removeReactionService(params: {
    commentId: string
    userId: string
    emoji: string
  }) {
    const { commentId, userId, emoji } = params
    const validEmoji = validateEmoji(emoji)

    const comment = await CommentsRepo.findCommentById(commentId)
    if (!comment) {
      throw { status: 404, message: 'COMMENT_NOT_FOUND' }
    }

    return CommentsRepo.removeReactionRepo(commentId, userId, validEmoji)
  }

  export async function togglePinCommentService(params: {
    commentId: string
    userId: string
    userRole?: string
  }) {
    const { commentId, userId, userRole } = params

    const comment = await CommentsRepo.findCommentById(commentId)
    if (!comment) {
      throw { status: 404, message: 'COMMENT_NOT_FOUND' }
    }

    if (comment.isDeleted) {
      throw { status: 400, message: 'CANNOT_PIN_DELETED_COMMENT' }
    }

    const isPostOwner = comment.post.authorId === userId
    const isAdminOrModerator = userRole === 'ADMIN' || userRole === 'MODERATOR'

    if (!isPostOwner && !isAdminOrModerator) {
      throw { status: 403, message: 'NOT_AUTHORIZED_TO_PIN_COMMENT' }
    }

    return CommentsRepo.togglePinCommentRepo(
      commentId,
      comment.postId,
      MAX_PINNED_COMMENTS_PER_POST
    )
  }

  export async function reportCommentService(params: {
    commentId: string
    reporterUserId: string
    reason: string
    details?: string
  }) {
    const { commentId, reporterUserId, reason, details } = params

    if (!reason || reason.trim().length === 0) {
      throw { status: 400, message: 'Reason for report is required' }
    }

    const comment = await CommentsRepo.findCommentById(commentId)
    if (!comment) {
      throw { status: 404, message: 'COMMENT_NOT_FOUND' }
    }

    if (comment.isDeleted) {
      throw { status: 400, message: 'CANNOT_REPORT_DELETED_COMMENT' }
    }

    try {
      const report = await CommentsRepo.createReportRepo(
        commentId,
        reporterUserId,
        reason.trim(),
        details?.trim()
      )

      logger.info('[moderation] Comment report filed', {
        metadata: {
          reportId: report.id,
          commentId,
          reason: reason.trim(),
          status: report.status,
        },
      })

      return report
    } catch (err: any) {
      if (err.code === 'P2002') {
        throw { status: 409, message: 'ALREADY_REPORTED_COMMENT' }
      }
      throw err
    }
  }
}

// --- study-group/study-group.service.ts ---
namespace StudyGroupService {
  function parseBody<T>(schema: ZodType<T>, body: unknown, code: string): T {
    const parsed = schema.safeParse(body)
    if (!parsed.success) {
      throw badRequest(code, parsed.error.issues[0]?.message)
    }
    return parsed.data
  }

  function parseIfMatch(header: string | undefined): number | null {
    if (!header) return null
    const version = Number(header)
    if (!Number.isInteger(version) || version < 1) {
      throw badRequest('INVALID_IF_MATCH', 'If-Match must be a positive integer version')
    }
    return version
  }

  async function assertEligibleUser(userId: string) {
    const user = await StudyGroupRepo.findUserById(userId)
    if (!user) throw notFound('USER_NOT_FOUND')
    if (user.status === 'SUSPENDED' || user.status === 'BANNED' || user.status === 'DELETED') {
      throw forbidden('USER_NOT_ELIGIBLE')
    }
    return user
  }

  async function requireGroup(groupId: string) {
    const group = await StudyGroupRepo.findStudyGroupById(groupId)
    if (!group) throw notFound('STUDY_GROUP_NOT_FOUND')
    return group
  }

  async function requireMembership(groupId: string, userId: string) {
    const membership = await StudyGroupRepo.findMembership(groupId, userId)
    if (!membership) throw forbidden('NOT_A_GROUP_MEMBER')
    return membership
  }

  async function requireVisibleGroup(groupId: string, userId: string) {
    const group = await requireGroup(groupId)
    const membership = await StudyGroupRepo.findMembership(groupId, userId)
    if (!membership && group.visibility !== 'PUBLIC') {
      throw notFound('STUDY_GROUP_NOT_FOUND')
    }
    return { group, membership }
  }

  export async function createStudyGroup(userId: string, body: unknown) {
    await assertEligibleUser(userId)
    const data = parseBody(createStudyGroupSchema, body, 'INVALID_STUDY_GROUP_PAYLOAD')
    const group = await StudyGroupRepo.createStudyGroup(userId, data)
    await StudyGroupRepo.createAuditEvent({
      studyGroupId: group.id,
      actorId: userId,
      action: 'GROUP_CREATED',
      metadata: { type: data.type, visibility: data.visibility },
    })
    return group
  }

  export async function listStudyGroups(userId: string) {
    await assertEligibleUser(userId)
    return StudyGroupRepo.listStudyGroups(userId)
  }

  export async function getStudyGroupById(userId: string, groupId: string) {
    await assertEligibleUser(userId)
    const { group } = await requireVisibleGroup(groupId, userId)
    return group
  }

  export async function updateStudyGroup(
    userId: string,
    groupId: string,
    body: unknown,
    ifMatch?: string
  ) {
    await assertEligibleUser(userId)
    const membership = await requireMembership(groupId, userId)
    if (!StudyGroupPermissions.canManageGroup(membership.role))
      throw forbidden('INSUFFICIENT_PERMISSIONS')
    const data = parseBody(updateStudyGroupSchema, body, 'INVALID_STUDY_GROUP_PAYLOAD')
    const expectedVersion = parseIfMatch(ifMatch)
    const updated = await StudyGroupRepo.updateStudyGroup(groupId, expectedVersion, data)
    if (!updated) {
      throw expectedVersion !== null
        ? preconditionFailed('VERSION_CONFLICT')
        : notFound('STUDY_GROUP_NOT_FOUND')
    }
    await StudyGroupRepo.createAuditEvent({
      studyGroupId: groupId,
      actorId: userId,
      action: 'GROUP_UPDATED',
      metadata: data,
    })
    return updated
  }

  export async function deleteStudyGroup(userId: string, groupId: string) {
    await assertEligibleUser(userId)
    const membership = await requireMembership(groupId, userId)
    if (!StudyGroupPermissions.canDeleteGroup(membership.role))
      throw forbidden('INSUFFICIENT_PERMISSIONS')
    await StudyGroupRepo.createAuditEvent({
      studyGroupId: groupId,
      actorId: userId,
      action: 'GROUP_DELETED',
    })
    return StudyGroupRepo.deleteStudyGroup(groupId)
  }

  export async function joinStudyGroup(userId: string, groupId: string) {
    await assertEligibleUser(userId)
    const group = await requireGroup(groupId)
    const existing = await StudyGroupRepo.findMembership(groupId, userId)
    if (existing) return existing

    if (group.visibility === 'PRIVATE') {
      const invitation = await StudyGroupRepo.findPendingInvitation(groupId, userId)
      if (!invitation) throw forbidden('INVITATION_REQUIRED')
      await StudyGroupRepo.acceptInvitation(invitation.id)
    }

    const member = await StudyGroupRepo.addMember(groupId, userId, 'MEMBER')
    await StudyGroupRepo.createAuditEvent({
      studyGroupId: groupId,
      actorId: userId,
      action: 'MEMBER_JOINED',
    })
    return member
  }

  export async function leaveStudyGroup(userId: string, groupId: string) {
    await assertEligibleUser(userId)
    const membership = await requireMembership(groupId, userId)
    if (membership.role === 'OWNER') {
      throw forbidden('OWNER_CANNOT_LEAVE')
    }
    await StudyGroupRepo.removeMember(groupId, userId)
    await StudyGroupRepo.createAuditEvent({
      studyGroupId: groupId,
      actorId: userId,
      action: 'MEMBER_LEFT',
    })
    return { left: true }
  }

  export async function getStudyGroupMembers(userId: string, groupId: string) {
    await assertEligibleUser(userId)
    await requireMembership(groupId, userId)
    return StudyGroupRepo.listMembers(groupId)
  }

  export async function inviteMember(userId: string, groupId: string, body: unknown) {
    await assertEligibleUser(userId)
    const membership = await requireMembership(groupId, userId)
    if (!StudyGroupPermissions.canManageMembers(membership.role))
      throw forbidden('INSUFFICIENT_PERMISSIONS')
    const data = parseBody(studyGroupInvitationSchema, body, 'INVALID_INVITATION_PAYLOAD')
    if (data.userId === userId) throw badRequest('CANNOT_INVITE_SELF')
    const invitee = await StudyGroupRepo.findUserById(data.userId)
    if (!invitee) throw notFound('USER_NOT_FOUND')
    const already = await StudyGroupRepo.findMembership(groupId, data.userId)
    if (already) throw conflict('ALREADY_A_MEMBER')
    const invitation = await StudyGroupRepo.upsertInvitation({
      studyGroupId: groupId,
      inviterId: userId,
      inviteeId: data.userId,
      message: data.message,
    })
    await StudyGroupRepo.createAuditEvent({
      studyGroupId: groupId,
      actorId: userId,
      action: 'MEMBER_INVITED',
      metadata: { inviteeId: data.userId },
    })
    return invitation
  }

  export async function updateMemberRole(
    userId: string,
    groupId: string,
    targetUserId: string,
    body: unknown
  ) {
    await assertEligibleUser(userId)
    const membership = await requireMembership(groupId, userId)
    const target = await StudyGroupRepo.findMembership(groupId, targetUserId)
    if (!target) throw notFound('MEMBER_NOT_FOUND')
    const data = parseBody(updateStudyGroupMemberSchema, body, 'INVALID_MEMBER_PAYLOAD')
    if (!StudyGroupPermissions.canChangeMemberRole(membership.role, target.role)) {
      throw forbidden('INSUFFICIENT_PERMISSIONS')
    }
    const updated = await StudyGroupRepo.updateMemberRole(groupId, targetUserId, data.role)
    await StudyGroupRepo.createAuditEvent({
      studyGroupId: groupId,
      actorId: userId,
      action: 'MEMBER_ROLE_CHANGED',
      metadata: { targetUserId, role: data.role },
    })
    return updated
  }

  export async function removeMember(userId: string, groupId: string, targetUserId: string) {
    await assertEligibleUser(userId)
    const membership = await requireMembership(groupId, userId)
    const target = await StudyGroupRepo.findMembership(groupId, targetUserId)
    if (!target) throw notFound('MEMBER_NOT_FOUND')
    if (
      !StudyGroupPermissions.canRemoveMember(membership.role, target.role, userId === targetUserId)
    ) {
      throw forbidden('INSUFFICIENT_PERMISSIONS')
    }
    await StudyGroupRepo.removeMember(groupId, targetUserId)
    await StudyGroupRepo.createAuditEvent({
      studyGroupId: groupId,
      actorId: userId,
      action: 'MEMBER_REMOVED',
      metadata: { targetUserId },
    })
    return { removed: true }
  }

  export async function createDiscussion(userId: string, groupId: string, body: unknown) {
    await assertEligibleUser(userId)
    await requireMembership(groupId, userId)
    const data = parseBody(studyGroupDiscussionSchema, body, 'INVALID_DISCUSSION_PAYLOAD')
    const discussion = await StudyGroupRepo.createDiscussion(groupId, userId, data)
    await StudyGroupRepo.createAuditEvent({
      studyGroupId: groupId,
      actorId: userId,
      action: 'DISCUSSION_CREATED',
      metadata: { discussionId: discussion.id },
    })
    return discussion
  }

  export async function listDiscussions(userId: string, groupId: string) {
    await assertEligibleUser(userId)
    await requireMembership(groupId, userId)
    return StudyGroupRepo.listDiscussions(groupId)
  }

  export async function getDiscussion(userId: string, groupId: string, discussionId: string) {
    await assertEligibleUser(userId)
    await requireMembership(groupId, userId)
    const discussion = await StudyGroupRepo.findDiscussion(groupId, discussionId)
    if (!discussion) throw notFound('DISCUSSION_NOT_FOUND')
    return discussion
  }

  export async function updateDiscussion(
    userId: string,
    groupId: string,
    discussionId: string,
    body: unknown
  ) {
    await assertEligibleUser(userId)
    const membership = await requireMembership(groupId, userId)
    const discussion = await StudyGroupRepo.findDiscussion(groupId, discussionId)
    if (!discussion) throw notFound('DISCUSSION_NOT_FOUND')
    if (
      !StudyGroupPermissions.canEditOwnOrModerate(membership.role, discussion.authorId === userId)
    ) {
      throw forbidden('INSUFFICIENT_PERMISSIONS')
    }
    const data = parseBody(updateStudyGroupDiscussionSchema, body, 'INVALID_DISCUSSION_PAYLOAD')
    return StudyGroupRepo.updateDiscussion(discussionId, data)
  }

  export async function deleteDiscussion(userId: string, groupId: string, discussionId: string) {
    await assertEligibleUser(userId)
    const membership = await requireMembership(groupId, userId)
    const discussion = await StudyGroupRepo.findDiscussion(groupId, discussionId)
    if (!discussion) throw notFound('DISCUSSION_NOT_FOUND')
    if (
      !StudyGroupPermissions.canEditOwnOrModerate(membership.role, discussion.authorId === userId)
    ) {
      throw forbidden('INSUFFICIENT_PERMISSIONS')
    }
    await StudyGroupRepo.deleteDiscussion(discussionId)
    await StudyGroupRepo.createAuditEvent({
      studyGroupId: groupId,
      actorId: userId,
      action: 'DISCUSSION_DELETED',
      metadata: { discussionId },
    })
    return { deleted: true }
  }

  export async function createReply(
    userId: string,
    groupId: string,
    discussionId: string,
    body: unknown
  ) {
    await assertEligibleUser(userId)
    await requireMembership(groupId, userId)
    const discussion = await StudyGroupRepo.findDiscussion(groupId, discussionId)
    if (!discussion) throw notFound('DISCUSSION_NOT_FOUND')
    const data = parseBody(studyGroupReplySchema, body, 'INVALID_REPLY_PAYLOAD')
    return StudyGroupRepo.createReply(discussionId, userId, data.body)
  }

  export async function listReplies(userId: string, groupId: string, discussionId: string) {
    await assertEligibleUser(userId)
    await requireMembership(groupId, userId)
    const discussion = await StudyGroupRepo.findDiscussion(groupId, discussionId)
    if (!discussion) throw notFound('DISCUSSION_NOT_FOUND')
    return StudyGroupRepo.listReplies(discussionId)
  }

  export async function updateReply(
    userId: string,
    groupId: string,
    discussionId: string,
    replyId: string,
    body: unknown
  ) {
    await assertEligibleUser(userId)
    const membership = await requireMembership(groupId, userId)
    const reply = await StudyGroupRepo.findReply(discussionId, replyId)
    if (!reply) throw notFound('REPLY_NOT_FOUND')
    if (!StudyGroupPermissions.canEditOwnOrModerate(membership.role, reply.authorId === userId)) {
      throw forbidden('INSUFFICIENT_PERMISSIONS')
    }
    const data = parseBody(studyGroupReplySchema, body, 'INVALID_REPLY_PAYLOAD')
    return StudyGroupRepo.updateReply(replyId, data.body)
  }

  export async function deleteReply(
    userId: string,
    groupId: string,
    discussionId: string,
    replyId: string
  ) {
    await assertEligibleUser(userId)
    const membership = await requireMembership(groupId, userId)
    const reply = await StudyGroupRepo.findReply(discussionId, replyId)
    if (!reply) throw notFound('REPLY_NOT_FOUND')
    if (!StudyGroupPermissions.canEditOwnOrModerate(membership.role, reply.authorId === userId)) {
      throw forbidden('INSUFFICIENT_PERMISSIONS')
    }
    await StudyGroupRepo.deleteReply(replyId)
    return { deleted: true }
  }

  export async function createNote(userId: string, groupId: string, body: unknown) {
    await assertEligibleUser(userId)
    await requireMembership(groupId, userId)
    const data = parseBody(studyGroupNoteSchema, body, 'INVALID_NOTE_PAYLOAD')
    const note = await StudyGroupRepo.createNote(groupId, userId, data)
    await StudyGroupRepo.createAuditEvent({
      studyGroupId: groupId,
      actorId: userId,
      action: 'NOTE_CREATED',
      metadata: { noteId: note.id },
    })
    return note
  }

  export async function listNotes(userId: string, groupId: string) {
    await assertEligibleUser(userId)
    await requireMembership(groupId, userId)
    return StudyGroupRepo.listNotes(groupId)
  }

  export async function getNote(userId: string, groupId: string, noteId: string) {
    await assertEligibleUser(userId)
    await requireMembership(groupId, userId)
    const note = await StudyGroupRepo.findNote(groupId, noteId)
    if (!note) throw notFound('NOTE_NOT_FOUND')
    return note
  }

  export async function updateNote(
    userId: string,
    groupId: string,
    noteId: string,
    body: unknown,
    ifMatch?: string
  ) {
    await assertEligibleUser(userId)
    const membership = await requireMembership(groupId, userId)
    const note = await StudyGroupRepo.findNote(groupId, noteId)
    if (!note) throw notFound('NOTE_NOT_FOUND')
    if (!StudyGroupPermissions.canEditOwnOrModerate(membership.role, note.authorId === userId)) {
      throw forbidden('INSUFFICIENT_PERMISSIONS')
    }
    const data = parseBody(updateStudyGroupNoteSchema, body, 'INVALID_NOTE_PAYLOAD')
    const updated = await StudyGroupRepo.updateNote(noteId, userId, parseIfMatch(ifMatch), data)
    if (updated === 'conflict') throw preconditionFailed('VERSION_CONFLICT')
    if (!updated) throw notFound('NOTE_NOT_FOUND')
    await StudyGroupRepo.createAuditEvent({
      studyGroupId: groupId,
      actorId: userId,
      action: 'NOTE_UPDATED',
      metadata: { noteId, version: updated.version },
    })
    return updated
  }

  export async function deleteNote(userId: string, groupId: string, noteId: string) {
    await assertEligibleUser(userId)
    const membership = await requireMembership(groupId, userId)
    const note = await StudyGroupRepo.findNote(groupId, noteId)
    if (!note) throw notFound('NOTE_NOT_FOUND')
    if (!StudyGroupPermissions.canEditOwnOrModerate(membership.role, note.authorId === userId)) {
      throw forbidden('INSUFFICIENT_PERMISSIONS')
    }
    await StudyGroupRepo.deleteNote(noteId)
    await StudyGroupRepo.createAuditEvent({
      studyGroupId: groupId,
      actorId: userId,
      action: 'NOTE_DELETED',
      metadata: { noteId },
    })
    return { deleted: true }
  }

  export async function listNoteVersions(userId: string, groupId: string, noteId: string) {
    await assertEligibleUser(userId)
    await requireMembership(groupId, userId)
    const note = await StudyGroupRepo.findNote(groupId, noteId)
    if (!note) throw notFound('NOTE_NOT_FOUND')
    return StudyGroupRepo.listNoteVersions(noteId)
  }

  export async function getNoteVersion(
    userId: string,
    groupId: string,
    noteId: string,
    versionParam: string
  ) {
    await assertEligibleUser(userId)
    await requireMembership(groupId, userId)
    const note = await StudyGroupRepo.findNote(groupId, noteId)
    if (!note) throw notFound('NOTE_NOT_FOUND')
    const version = Number(versionParam)
    if (!Number.isInteger(version) || version < 1) throw badRequest('INVALID_VERSION')
    const snapshot = await StudyGroupRepo.findNoteVersion(noteId, version)
    if (!snapshot) throw notFound('NOTE_VERSION_NOT_FOUND')
    return snapshot
  }

  function assertValidFile(mimeType: string, sizeBytes: number) {
    if (!StudyGroupPermissions.ALLOWED_STUDY_GROUP_MIME_TYPES.has(mimeType)) {
      throw badRequest('UNSUPPORTED_FILE_TYPE')
    }
    if (sizeBytes > StudyGroupPermissions.MAX_STUDY_GROUP_FILE_BYTES) {
      throw badRequest('FILE_TOO_LARGE')
    }
  }

  export async function createFileUploadUrl(userId: string, groupId: string, body: unknown) {
    await assertEligibleUser(userId)
    await requireMembership(groupId, userId)
    const data = parseBody(studyGroupFileUploadUrlSchema, body, 'INVALID_FILE_PAYLOAD')
    assertValidFile(data.mimeType, data.sizeBytes)
    const key = buildStudyGroupObjectKey(groupId, data.fileName)
    try {
      const { url } = await createPresignedUploadUrl({ key, mimeType: data.mimeType })
      return { uploadUrl: url, key, expiresInSeconds: 900 }
    } catch {
      throw unprocessable('STORAGE_NOT_CONFIGURED')
    }
  }

  export async function registerFile(userId: string, groupId: string, body: unknown) {
    await assertEligibleUser(userId)
    await requireMembership(groupId, userId)
    const data = parseBody(studyGroupFileRegisterSchema, body, 'INVALID_FILE_PAYLOAD')
    assertValidFile(data.mimeType, data.sizeBytes)
    if (!data.key.startsWith(`study-groups/${groupId}/`)) {
      throw badRequest('INVALID_FILE_KEY')
    }
    const file = await StudyGroupRepo.createFile({
      studyGroupId: groupId,
      uploaderId: userId,
      key: data.key,
      fileName: data.fileName,
      mimeType: data.mimeType,
      sizeBytes: data.sizeBytes,
    })
    await StudyGroupRepo.createAuditEvent({
      studyGroupId: groupId,
      actorId: userId,
      action: 'FILE_UPLOADED',
      metadata: { fileId: file.id, fileName: data.fileName },
    })
    return file
  }

  export async function listFiles(userId: string, groupId: string) {
    await assertEligibleUser(userId)
    await requireMembership(groupId, userId)
    return StudyGroupRepo.listFiles(groupId)
  }

  export async function getFile(userId: string, groupId: string, fileId: string) {
    await assertEligibleUser(userId)
    await requireMembership(groupId, userId)
    const file = await StudyGroupRepo.findFile(groupId, fileId)
    if (!file) throw notFound('FILE_NOT_FOUND')
    return file
  }

  export async function getFileDownloadUrl(userId: string, groupId: string, fileId: string) {
    await assertEligibleUser(userId)
    await requireMembership(groupId, userId)
    const file = await StudyGroupRepo.findFile(groupId, fileId)
    if (!file) throw notFound('FILE_NOT_FOUND')
    try {
      const downloadUrl = await createPresignedDownloadUrl({
        key: file.key,
        fileName: file.fileName,
      })
      return { downloadUrl, expiresInSeconds: 900, fileName: file.fileName }
    } catch {
      throw unprocessable('STORAGE_NOT_CONFIGURED')
    }
  }

  export async function deleteFile(userId: string, groupId: string, fileId: string) {
    await assertEligibleUser(userId)
    const membership = await requireMembership(groupId, userId)
    const file = await StudyGroupRepo.findFile(groupId, fileId)
    if (!file) throw notFound('FILE_NOT_FOUND')
    if (!StudyGroupPermissions.canEditOwnOrModerate(membership.role, file.uploaderId === userId)) {
      throw forbidden('INSUFFICIENT_PERMISSIONS')
    }
    try {
      await deleteStoredFile(file.key)
    } catch {
      // metadata still removed even if object storage delete fails
    }
    await StudyGroupRepo.deleteFile(fileId)
    await StudyGroupRepo.createAuditEvent({
      studyGroupId: groupId,
      actorId: userId,
      action: 'FILE_DELETED',
      metadata: { fileId },
    })
    return { deleted: true }
  }

  export async function upsertTimetable(
    userId: string,
    groupId: string,
    body: unknown,
    ifMatch?: string
  ) {
    await assertEligibleUser(userId)
    const membership = await requireMembership(groupId, userId)
    if (!StudyGroupPermissions.canManageGroup(membership.role))
      throw forbidden('INSUFFICIENT_PERMISSIONS')
    const data = parseBody(studyGroupTimetableSchema, body, 'INVALID_TIMETABLE_PAYLOAD')
    const result = await StudyGroupRepo.upsertTimetable(
      groupId,
      userId,
      data,
      parseIfMatch(ifMatch)
    )
    if (result === 'conflict') throw preconditionFailed('VERSION_CONFLICT')
    await StudyGroupRepo.createAuditEvent({
      studyGroupId: groupId,
      actorId: userId,
      action: 'TIMETABLE_UPDATED',
      metadata: { version: result.version },
    })
    return result
  }

  export async function getTimetable(userId: string, groupId: string) {
    await assertEligibleUser(userId)
    await requireMembership(groupId, userId)
    const timetable = await StudyGroupRepo.findTimetable(groupId)
    if (!timetable) throw notFound('TIMETABLE_NOT_FOUND')
    return timetable
  }

  export async function deleteTimetable(userId: string, groupId: string) {
    await assertEligibleUser(userId)
    const membership = await requireMembership(groupId, userId)
    if (!StudyGroupPermissions.canManageGroup(membership.role))
      throw forbidden('INSUFFICIENT_PERMISSIONS')
    await StudyGroupRepo.deleteTimetable(groupId)
    await StudyGroupRepo.createAuditEvent({
      studyGroupId: groupId,
      actorId: userId,
      action: 'TIMETABLE_DELETED',
    })
    return { deleted: true }
  }

  export async function listTimetableVersions(userId: string, groupId: string) {
    await assertEligibleUser(userId)
    await requireMembership(groupId, userId)
    return StudyGroupRepo.listTimetableVersions(groupId)
  }

  export async function searchAll(userId: string, query: unknown) {
    await assertEligibleUser(userId)
    const { q } = parseBody(studyGroupSearchQuerySchema, query, 'INVALID_SEARCH_QUERY')
    return StudyGroupRepo.searchAcrossGroups(userId, q)
  }

  export async function searchInGroup(userId: string, groupId: string, query: unknown) {
    await assertEligibleUser(userId)
    await requireMembership(groupId, userId)
    const { q } = parseBody(studyGroupSearchQuerySchema, query, 'INVALID_SEARCH_QUERY')
    return StudyGroupRepo.searchGroupContent(groupId, q)
  }

  export async function openGroupChat(userId: string, groupId: string) {
    await assertEligibleUser(userId)
    await requireMembership(groupId, userId)
    const group = await requireGroup(groupId)
    const members = await StudyGroupRepo.listMembers(groupId)
    const channelId = group.chatChannelId ?? `study-group-${group.id}`
    const streamUsers = members.map((member) => ({
      id: member.user.id,
      name: member.user.username ?? member.user.name ?? '',
      image: member.user.image ?? undefined,
    }))
    try {
      await streamClient.upsertUsers(streamUsers)
      const channel = streamClient.channel('messaging', channelId, {
        created_by_id: userId,
        members: members.map((member) => member.userId),
        name: group.name,
      } as never)
      await channel.create()
    } catch {
      // Stream may be unavailable in some environments; still persist the channel id
    }
    if (!group.chatChannelId) {
      await StudyGroupRepo.setChatChannelId(groupId, channelId)
    }
    await StudyGroupRepo.createAuditEvent({
      studyGroupId: groupId,
      actorId: userId,
      action: 'CHAT_OPENED',
      metadata: { channelId },
    })
    return { channelId, type: 'messaging', members: members.map((member) => member.userId) }
  }

  export async function getGroupChat(userId: string, groupId: string) {
    await assertEligibleUser(userId)
    await requireMembership(groupId, userId)
    const group = await requireGroup(groupId)
    if (!group.chatChannelId) throw notFound('GROUP_CHAT_NOT_FOUND')
    return { channelId: group.chatChannelId, type: 'messaging' }
  }

  export async function listAuditEvents(userId: string, groupId: string) {
    await assertEligibleUser(userId)
    const membership = await requireMembership(groupId, userId)
    if (
      !StudyGroupPermissions.canManageGroup(
        membership.role as StudyGroupPermissions.StudyGroupMemberRole
      )
    ) {
      throw forbidden('INSUFFICIENT_PERMISSIONS')
    }
    return StudyGroupRepo.listAuditEvents(groupId)
  }
}

export const getMyProfile = ProfileService.getMyProfile
export const updateMyProfile = ProfileService.updateMyProfile
export const getProfileByUsername = ProfileService.getProfileByUsername
export const uploadProfilePicture = ProfileService.uploadProfilePicture
export const deleteProfilePicture = ProfileService.deleteProfilePicture
export const uploadCoverImage = ProfileService.uploadCoverImage
export const deleteCoverImage = ProfileService.deleteCoverImage

export const sendFriendRequest = FriendsService.sendFriendRequest
export const acceptFriendRequest = FriendsService.acceptFriendRequest
export const rejectFriendRequest = FriendsService.rejectFriendRequest
export const cancelFriendRequest = FriendsService.cancelFriendRequest
export const unfriend = FriendsService.unfriend
export const getMyFriends = FriendsService.getMyFriends
export const getIncomingRequests = FriendsService.getIncomingRequests
export const getOutgoingRequests = FriendsService.getOutgoingRequests
export const getMutualFriends = FriendsService.getMutualFriends

export const generateChatToken = ChatService.generateChatToken
export const createOneToOneConversation = ChatService.createOneToOneConversation
export const getMyConversations = ChatService.getMyConversations

export const generateVideoToken = VideoService.generateVideoToken
export const createCall = VideoService.createCall
export const getCallDetails = VideoService.getCallDetails
export const joinCall = VideoService.joinCall
export const respondToCallInvite = VideoService.respondToCallInvite
export const endCall = VideoService.endCall
export const getCallHistory = VideoService.getCallHistory

export const parsePagination = LeaderboardService.parsePagination
export const getLeaderboard = LeaderboardService.getLeaderboard
export const getMyLeaderboardStats = LeaderboardService.getMyLeaderboardStats
export const getUserLeaderboardStats = LeaderboardService.getUserLeaderboardStats
export const getLeaderboardAroundUser = LeaderboardService.getLeaderboardAroundUser

export const findProfileByUserId = LeetcodeSyncRepo.findProfileByUserId
export const findStaleProfiles = LeetcodeSyncRepo.findStaleProfiles
export const canManualSync = LeetcodeSync.canManualSync
export const recordManualSync = LeetcodeSync.recordManualSync
export const getManualSyncCooldownSeconds = LeetcodeSync.getManualSyncCooldownSeconds
export const syncProfileById = LeetcodeSync.syncProfileById

export const createPost = PostsService.createPost
export const toggleLike = PostsService.toggleLike
export const getLikeCount = PostsService.getLikeCount
export const createPostComment = PostsService.createComment
export const listPostComments = PostsService.listComments
export const pinPostComment = PostsService.pinComment
export const deletePostComment = PostsService.deleteComment
export const toggleSavePost = PostsService.toggleSavePost
export const getMySavedPosts = PostsService.getMySavedPosts

export const createCommentService = CommentsService.createCommentService
export const getCommentsForPostService = CommentsService.getCommentsForPostService
export const editCommentService = CommentsService.editCommentService
export const getCommentEditHistoryService = CommentsService.getCommentEditHistoryService
export const deleteCommentService = CommentsService.deleteCommentService
export const toggleReactionService = CommentsService.toggleReactionService
export const removeReactionService = CommentsService.removeReactionService
export const togglePinCommentService = CommentsService.togglePinCommentService
export const reportCommentService = CommentsService.reportCommentService

export const createStudyGroup = StudyGroupService.createStudyGroup
export const listStudyGroups = StudyGroupService.listStudyGroups
export const getStudyGroupById = StudyGroupService.getStudyGroupById
export const updateStudyGroup = StudyGroupService.updateStudyGroup
export const deleteStudyGroup = StudyGroupService.deleteStudyGroup
export const joinStudyGroup = StudyGroupService.joinStudyGroup
export const leaveStudyGroup = StudyGroupService.leaveStudyGroup
export const getStudyGroupMembers = StudyGroupService.getStudyGroupMembers
export const inviteMember = StudyGroupService.inviteMember
export const updateMemberRole = StudyGroupService.updateMemberRole
export const removeMember = StudyGroupService.removeMember
export const createDiscussion = StudyGroupService.createDiscussion
export const listDiscussions = StudyGroupService.listDiscussions
export const getDiscussion = StudyGroupService.getDiscussion
export const updateDiscussion = StudyGroupService.updateDiscussion
export const deleteDiscussion = StudyGroupService.deleteDiscussion
export const createReply = StudyGroupService.createReply
export const listReplies = StudyGroupService.listReplies
export const updateReply = StudyGroupService.updateReply
export const deleteReply = StudyGroupService.deleteReply
export const createNote = StudyGroupService.createNote
export const listNotes = StudyGroupService.listNotes
export const getNote = StudyGroupService.getNote
export const updateNote = StudyGroupService.updateNote
export const deleteNote = StudyGroupService.deleteNote
export const listNoteVersions = StudyGroupService.listNoteVersions
export const getNoteVersion = StudyGroupService.getNoteVersion
export const createFileUploadUrl = StudyGroupService.createFileUploadUrl
export const registerFile = StudyGroupService.registerFile
export const listFiles = StudyGroupService.listFiles
export const getFile = StudyGroupService.getFile
export const getFileDownloadUrl = StudyGroupService.getFileDownloadUrl
export const deleteStudyGroupFile = StudyGroupService.deleteFile
export const upsertTimetable = StudyGroupService.upsertTimetable
export const getTimetable = StudyGroupService.getTimetable
export const deleteTimetable = StudyGroupService.deleteTimetable
export const listTimetableVersions = StudyGroupService.listTimetableVersions
export const searchAll = StudyGroupService.searchAll
export const searchInGroup = StudyGroupService.searchInGroup
export const openGroupChat = StudyGroupService.openGroupChat
export const getGroupChat = StudyGroupService.getGroupChat
export const listAuditEvents = StudyGroupService.listAuditEvents

export const canManageGroup = StudyGroupPermissions.canManageGroup
export const canDeleteGroup = StudyGroupPermissions.canDeleteGroup
export const canEditOwnOrModerate = StudyGroupPermissions.canEditOwnOrModerate
export const canChangeMemberRole = StudyGroupPermissions.canChangeMemberRole
export const canRemoveMember = StudyGroupPermissions.canRemoveMember
export const readIdempotentResponse = StudyGroupIdempotency.readIdempotentResponse
export const writeIdempotentResponse = StudyGroupIdempotency.writeIdempotentResponse
