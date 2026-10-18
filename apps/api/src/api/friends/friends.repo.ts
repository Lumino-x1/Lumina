import { prisma } from '@lumina/db'
import { FriendsUtils } from './friends.utils'

export namespace FriendsRepo {
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
      myFriends.map((friend) => FriendsUtils.getOtherUserId(userId, friend))
    )

    const mutualFriendIds = otherFriends
      .map((friend) => FriendsUtils.getOtherUserId(otherUserId, friend))
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

  export async function areFriends(userA: string, userB: string): Promise<boolean> {
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

export const findUserById = FriendsRepo.findUserById
export const findFriendRequest = FriendsRepo.findFriendRequest
export const createFriendRequest = FriendsRepo.createFriendRequest
export const findFriendRequestById = FriendsRepo.findFriendRequestById
export const updateFriendRequestStatus = FriendsRepo.updateFriendRequestStatus
export const findAcceptedFriendship = FriendsRepo.findAcceptedFriendship
export const deleteFriendship = FriendsRepo.deleteFriendship
export const getMyFriends = FriendsRepo.getMyFriends
export const getIncomingRequests = FriendsRepo.getIncomingRequests
export const getOutgoingRequests = FriendsRepo.getOutgoingRequests
export const getMutualFriends = FriendsRepo.getMutualFriends
export const areFriends = FriendsRepo.areFriends
