import { badRequest, conflict, forbidden, notFound } from '../../../lib/http-error'
import { FriendsRepo } from './friends.repo'
import { FriendsUtils } from './friends.utils'

export namespace FriendsService {
  export async function sendFriendRequest(senderId: string, receiverId: string) {
    if (FriendsUtils.isSelfRequest(senderId, receiverId)) {
      throw badRequest('CANNOT_FRIEND_SELF', 'You cannot send a friend request to yourself.')
    }

    const receiver = await FriendsRepo.findUserById(receiverId)

    if (!receiver) {
      throw notFound('USER_NOT_FOUND')
    }

    // Check existing request sent by sender to receiver
    const exactSent = await FriendsRepo.findFriendRequestExact(senderId, receiverId)

    if (exactSent) {
      if (exactSent.status === 'ACCEPTED') {
        throw conflict('ALREADY_FRIENDS', 'You are already friends.')
      }
      if (exactSent.status === 'PENDING') {
        throw conflict('FRIEND_REQUEST_EXISTS', 'Friend request already exists.')
      }
      // Re-activate previously CANCELLED or REJECTED request
      return FriendsRepo.reopenFriendRequest(exactSent.id)
    }

    // Check if receiver already sent a request to sender
    const exactReceived = await FriendsRepo.findFriendRequestExact(receiverId, senderId)

    if (exactReceived) {
      if (exactReceived.status === 'ACCEPTED') {
        throw conflict('ALREADY_FRIENDS', 'You are already friends.')
      }
      if (exactReceived.status === 'PENDING') {
        throw conflict('FRIEND_REQUEST_EXISTS', 'Friend request already exists.')
      }
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

  export async function cancelFriendRequest(userId: string, requestIdOrReceiverId: string) {
    let request = await FriendsRepo.findFriendRequestById(requestIdOrReceiverId)

    if (!request) {
      // Allow passing receiverId as the param to cancel the pending request
      request = await FriendsRepo.findPendingFriendRequest(userId, requestIdOrReceiverId)
    }

    if (!request) {
      throw notFound('FRIEND_REQUEST_NOT_FOUND')
    }

    if (request.senderId !== userId) {
      throw forbidden('UNAUTHORIZED')
    }

    if (request.status !== 'PENDING') {
      throw conflict('FRIEND_REQUEST_NOT_PENDING', 'Only pending requests can be cancelled.')
    }

    return FriendsRepo.updateFriendRequestStatus(request.id, 'CANCELLED')
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

export const sendFriendRequest = FriendsService.sendFriendRequest
export const acceptFriendRequest = FriendsService.acceptFriendRequest
export const rejectFriendRequest = FriendsService.rejectFriendRequest
export const cancelFriendRequest = FriendsService.cancelFriendRequest
export const unfriend = FriendsService.unfriend
export const getMyFriends = FriendsService.getMyFriends
export const getIncomingRequests = FriendsService.getIncomingRequests
export const getOutgoingRequests = FriendsService.getOutgoingRequests
export const getMutualFriends = FriendsService.getMutualFriends
