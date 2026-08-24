import { prisma } from '@lumina/db'

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
