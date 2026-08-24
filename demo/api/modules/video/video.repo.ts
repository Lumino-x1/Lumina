import { prisma } from '@lumina/db'
import type {
  ParticipantCallStatus,
  VideoCallRole,
  VideoCallStatus,
  VideoCallType,
} from '@prisma/client'

export const findUserById = async (userId: string) => {
  return prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, username: true, name: true, image: true, role: true, email: true, phone: true },
  })
}
export const findUserByUsername = async (username: string) => {
  return prisma.user.findFirst({
    where: { username },
    select: { id: true, username: true, name: true, image: true, role: true, email: true, phone: true },
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

export const updateCallStatus = async (callId: string, status: VideoCallStatus, endedAt?: Date) => {
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
