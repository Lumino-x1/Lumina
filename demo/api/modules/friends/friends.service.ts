import { badRequest, conflict, forbidden, notFound } from '../../lib/http-error'
import * as repository from './friends.repo'

export async function sendFriendRequest(senderId: string, receiverId: string) {
  if (senderId === receiverId) {
    throw badRequest('CANNOT_FRIEND_SELF', 'You cannot send a friend request to yourself.')
  }

  const receiver = await repository.findUserById(receiverId)

  if (!receiver) {
    throw notFound('USER_NOT_FOUND')
  }

  const existingRequest = await repository.findFriendRequest(senderId, receiverId)

  if (existingRequest) {
    throw conflict('FRIEND_REQUEST_EXISTS', 'Friend request already exists.')
  }

  try {
    return await repository.createFriendRequest(senderId, receiverId)
  } catch (error) {
    if (typeof error === 'object' && error && 'code' in error && error.code === 'P2002') {
      throw conflict('FRIEND_REQUEST_EXISTS', 'Friend request already exists.')
    }
    throw error
  }
}

export async function acceptFriendRequest(userId: string, requestId: string) {
  const request = await repository.findFriendRequestById(requestId)

  if (!request) {
    throw notFound('FRIEND_REQUEST_NOT_FOUND')
  }

  if (request.receiverId !== userId) {
    throw forbidden('UNAUTHORIZED')
  }

  if (request.status !== 'PENDING') {
    throw conflict('FRIEND_REQUEST_NOT_PENDING', 'Friend request is no longer pending.')
  }

  return repository.updateFriendRequestStatus(requestId, 'ACCEPTED')
}

export async function rejectFriendRequest(userId: string, requestId: string) {
  const request = await repository.findFriendRequestById(requestId)

  if (!request) {
    throw notFound('FRIEND_REQUEST_NOT_FOUND')
  }

  if (request.receiverId !== userId) {
    throw forbidden('UNAUTHORIZED')
  }

  if (request.status !== 'PENDING') {
    throw conflict('FRIEND_REQUEST_NOT_PENDING', 'Friend request is no longer pending.')
  }

  return repository.updateFriendRequestStatus(requestId, 'REJECTED')
}

export async function cancelFriendRequest(userId: string, requestId: string) {
  const request = await repository.findFriendRequestById(requestId)

  if (!request) {
    throw notFound('FRIEND_REQUEST_NOT_FOUND')
  }

  if (request.senderId !== userId) {
    throw forbidden('UNAUTHORIZED')
  }

  if (request.status !== 'PENDING') {
    throw conflict('FRIEND_REQUEST_NOT_PENDING', 'Only pending requests can be cancelled.')
  }

  return repository.updateFriendRequestStatus(requestId, 'CANCELLED')
}

export async function unfriend(userId: string, friendId: string) {
  const friendship = await repository.findAcceptedFriendship(userId, friendId)

  if (!friendship) {
    throw notFound('FRIENDSHIP_NOT_FOUND')
  }

  return repository.deleteFriendship(friendship.id)
}

export async function getMyFriends(userId: string) {
  return repository.getMyFriends(userId)
}

export async function getIncomingRequests(userId: string) {
  return repository.getIncomingRequests(userId)
}

export async function getOutgoingRequests(userId: string) {
  return repository.getOutgoingRequests(userId)
}

export async function getMutualFriends(userId: string, otherUserId: string) {
  return repository.getMutualFriends(userId, otherUserId)
}
