import { badRequest, forbidden, notFound } from '../../lib/http-error.ts'
import { STREAM_API_KEY, streamVideoClient } from './video.config.ts'
import * as videoRepo from './video.repo.ts'

import type { VideoCallType } from '@lumina/db'

const ONE_ON_ONE_TYPES: VideoCallType[] = ['ONE_ON_ONE', 'MENTORSHIP']

export const generateVideoToken = async (userId: string) => {
  const user = await videoRepo.findUserById(userId)
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
  const caller = await videoRepo.findUserById(userId)
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
    const targetUser = await videoRepo.findUserById(targetUserId)
    if (!targetUser) {
      throw badRequest('TARGET_USER_NOT_FOUND')
    }
  }

  for (const participantId of uniqueParticipantIds) {
    const participant = await videoRepo.findUserById(participantId)
    if (!participant) {
      throw badRequest('TARGET_USER_NOT_FOUND')
    }
  }

  const allParticipantIds = [userId, ...uniqueParticipantIds]
  const streamCallId = `lumina_call_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`

  const call = await videoRepo.createVideoCall({
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
  call: NonNullable<Awaited<ReturnType<typeof videoRepo.findCallById>>>,
  userId: string
) {
  const isParticipant = call.participants.some((p) => p.userId === userId)
  const isHost = call.createdById === userId
  if (!isParticipant && !isHost) {
    throw forbidden('CALL_UNAUTHORIZED')
  }
}

export const getCallDetails = async (callId: string, userId: string) => {
  const call = await videoRepo.findCallById(callId)
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

  await videoRepo.updateParticipantStatus({
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
  const call = await videoRepo.findCallById(callId)
  if (!call) {
    throw notFound('CALL_NOT_FOUND')
  }

  const invite = call.participants.find((p) => p.userId === userId)
  if (!invite) {
    throw forbidden('INVITE_UNAUTHORIZED')
  }

  const status = response === 'ACCEPT' ? 'ACCEPTED' : 'REJECTED'
  await videoRepo.updateParticipantStatus({
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
  const call = await videoRepo.findCallById(callId)
  if (!call) {
    throw notFound('CALL_NOT_FOUND')
  }

  if (call.createdById !== userId) {
    throw forbidden('ONLY_HOST_CAN_END_CALL')
  }

  const endedCall = await videoRepo.updateCallStatus(call.id, 'ENDED', new Date())

  return {
    callId: endedCall.id,
    status: endedCall.status,
    endedAt: endedCall.endedAt,
  }
}

export const getCallHistory = async (userId: string) => {
  const calls = await videoRepo.getUserCallHistory(userId)
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
