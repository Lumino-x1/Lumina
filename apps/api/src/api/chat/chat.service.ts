import { streamClient } from '../../../config/stream-chat'
import { ChatRepo } from './chat.repo'
import { ChatLib } from './chat.lib'

export namespace ChatService {
  export const generateChatToken = async (userId: string) => {
    const user = await ChatRepo.findUserById(userId).catch(() => null)

    const userPayload = {
      id: userId,
      name: user?.name || user?.username || 'User',
      image: user?.image ?? undefined,
    }

    await streamClient.upsertUser(userPayload).catch(() => {})

    return streamClient.createToken(userId)
  }

  export const createOneToOneConversation = async ({
    userId,
    otherUserId,
    otherName,
    otherUsername,
    otherAvatar,
  }: {
    userId: string
    otherUserId: string
    otherName?: string
    otherUsername?: string
    otherAvatar?: string
  }) => {
    if (userId === otherUserId) {
      throw new Error('CANNOT_CHAT_WITH_SELF')
    }

    const users = await ChatRepo.findUsersByIds([userId, otherUserId]).catch(() => [])

    let currentUser = users.find((user) => user.id === userId)
    let otherUser = users.find((user) => user.id === otherUserId)

    if (!currentUser) {
      currentUser = {
        id: userId,
        username: 'user',
        name: 'User',
        image: null,
      }
    }

    if (!otherUser) {
      otherUser = {
        id: otherUserId,
        username: otherUsername || otherUserId,
        name: otherName || otherUsername || 'Friend',
        image: otherAvatar || null,
      }
    }

    await streamClient.upsertUsers([
      {
        id: currentUser.id,
        name: currentUser.name || currentUser.username || 'User',
        image: currentUser.image ?? undefined,
      },
      {
        id: otherUser.id,
        name: otherUser.name || otherUser.username || 'User',
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
      otherUser: {
        id: otherUser.id,
        name: otherUser.name || otherUser.username || 'User',
        username: otherUser.username || '',
        image: otherUser.image || null,
      },
    }
  }

  export const createGroupConversation = async ({
    userId,
    name,
    memberIds = [],
    members = [],
    image,
  }: {
    userId: string
    name: string
    memberIds?: string[]
    members?: string[]
    image?: string
  }) => {
    const rawMembers = Array.isArray(memberIds) && memberIds.length > 0 ? memberIds : (Array.isArray(members) ? members : [])
    const allMembers = Array.from(new Set([userId, ...rawMembers]))
    const channelId = `group_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`

    const users = await ChatRepo.findUsersByIds(allMembers).catch(() => [])
    const userPayloads = allMembers.map((mId) => {
      const u = users.find((user) => user.id === mId)
      return {
        id: mId,
        name: u?.name || u?.username || 'Member',
        image: u?.image ?? undefined,
      }
    })

    await streamClient.upsertUsers(userPayloads)

    const channel = streamClient.channel('messaging', channelId, {
      name,
      created_by_id: userId,
      members: allMembers,
      image: image || undefined,
    })

    await channel.create()

    return {
      channelId,
      type: 'messaging',
      name,
      isGroup: true,
      created_by_id: userId,
      members: allMembers,
      membersCount: allMembers.length,
      image,
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
      limit: 50,
    })

    return channels.map((channel) => {
      const memberKeys = Object.keys(channel.state.members || {})
      const isGroup = memberKeys.length > 2 || Boolean((channel.data as any)?.name)
      const otherMemberKey = memberKeys.find((id) => id !== userId) || memberKeys[0]
      const otherMember = otherMemberKey ? channel.state.members[otherMemberKey] : null
      const lastMsg = channel.state.messages[channel.state.messages.length - 1] ?? null

      return {
        id: channel.id,
        channelId: channel.id,
        cid: channel.cid,
        type: channel.type,
        name: (channel.data as any)?.name || (otherMember?.user ? (otherMember.user.name || (otherMember.user as any).username) : 'Chat'),
        image: (channel.data as any)?.image || otherMember?.user?.image || null,
        isGroup,
        membersCount: memberKeys.length,
        members: channel.state.members,
        otherUser: !isGroup && otherMember?.user
          ? {
              id: otherMember.user.id,
              name: otherMember.user.name || (otherMember.user as any).username || otherMember.user.id,
              username: (otherMember.user as any).username || otherMember.user.name || '',
              image: otherMember.user.image || null,
              online: otherMember.user.online || false,
            }
          : null,
        lastMessage: lastMsg
          ? {
              id: lastMsg.id,
              text: lastMsg.text,
              senderId: lastMsg.user?.id,
              createdAt: lastMsg.created_at,
            }
          : null,
        unreadCount: channel.countUnread ? channel.countUnread(userId) : 0,
      }
    })
  }

  export const sendMessage = async ({
    userId,
    channelId,
    text,
    parentId,
    attachments,
  }: {
    userId: string
    channelId: string
    text: string
    parentId?: string
    attachments?: Array<Record<string, any>>
  }) => {
    const channel = streamClient.channel('messaging', channelId)
    const payload: Record<string, any> = {
      text,
      user_id: userId,
    }

    if (parentId) {
      payload.parent_id = parentId
    }

    if (attachments && attachments.length > 0) {
      payload.attachments = attachments
    }

    let response
    try {
      response = await channel.sendMessage(payload)
    } catch (err: any) {
      if (
        err?.message?.includes('does not exist') ||
        err?.status === 404 ||
        err?.code === 4 ||
        err?.message?.includes('not found')
      ) {
        await channel.create({ created_by_id: userId, members: [userId] }).catch(() => {})
        response = await channel.sendMessage(payload)
      } else {
        throw err
      }
    }
    return {
      message: response.message,
    }
  }

  export const getChannelMessages = async ({
    userId: _userId,
    channelId,
    limit = 50,
  }: {
    userId: string
    channelId: string
    limit?: number
  }) => {
    const channel = streamClient.channel('messaging', channelId)
    try {
      const state = await channel.query({
        messages: { limit },
      })

      return {
        messages: state.messages,
        members: state.members,
        channel: {
          id: channel.id,
          cid: channel.cid,
          name: (channel.data as any)?.name,
          image: (channel.data as any)?.image,
          memberCount: Object.keys(state.members || {}).length,
        },
      }
    } catch (err: any) {
      if (
        err?.message?.includes('does not exist') ||
        err?.status === 404 ||
        err?.code === 4 ||
        err?.message?.includes('not found')
      ) {
        return {
          messages: [],
          members: {},
          channel: {
            id: channel.id,
            cid: channel.cid,
            name: undefined,
            image: undefined,
            memberCount: 0,
          },
        }
      }
      throw err
    }
  }

  export const editMessage = async ({
    userId,
    messageId,
    text,
  }: {
    userId: string
    messageId: string
    text: string
  }) => {
    const response = await streamClient.updateMessage(
      {
        id: messageId,
        text,
      },
      userId
    )
    return {
      message: response.message,
    }
  }

  export const deleteMessage = async ({
    userId: _userId,
    messageId,
    hard = false,
  }: {
    userId: string
    messageId: string
    hard?: boolean
  }) => {
    const response = await streamClient.deleteMessage(messageId, hard)
    return {
      message: response.message,
    }
  }

  export const sendReaction = async ({
    userId,
    channelId,
    messageId,
    type,
  }: {
    userId: string
    channelId: string
    messageId: string
    type: string
  }) => {
    const channel = streamClient.channel('messaging', channelId)
    const response = await channel.sendReaction(messageId, {
      type,
      user_id: userId,
    })
    return {
      reaction: response.reaction,
      message: response.message,
    }
  }

  export const deleteReaction = async ({
    userId,
    channelId,
    messageId,
    type,
  }: {
    userId: string
    channelId: string
    messageId: string
    type: string
  }) => {
    const channel = streamClient.channel('messaging', channelId)
    const response = await channel.deleteReaction(messageId, type, userId)
    return {
      message: response.message,
    }
  }

  export const getMessageReplies = async ({
    channelId,
    messageId,
    limit = 50,
  }: {
    channelId: string
    messageId: string
    limit?: number
  }) => {
    const channel = streamClient.channel('messaging', channelId)
    const response = await channel.getReplies(messageId, { limit })
    return {
      messages: response.messages,
    }
  }

  export const pinMessage = async ({
    userId,
    messageId,
  }: {
    userId: string
    messageId: string
  }) => {
    const response = await streamClient.pinMessage(messageId, undefined, userId)
    return {
      message: response.message,
    }
  }

  export const unpinMessage = async ({
    userId,
    messageId,
  }: {
    userId: string
    messageId: string
  }) => {
    const response = await streamClient.unpinMessage(messageId, userId)
    return {
      message: response.message,
    }
  }

  export const markRead = async ({
    userId,
    channelId,
  }: {
    userId: string
    channelId: string
  }) => {
    const channel = streamClient.channel('messaging', channelId)
    await channel.markRead({ user_id: userId })
    return {
      success: true,
    }
  }

  export const sendTypingIndicator = async ({
    userId,
    channelId,
  }: {
    userId: string
    channelId: string
  }) => {
    const channel = streamClient.channel('messaging', channelId)
    await channel.keystroke(undefined, { user_id: userId })
    return {
      success: true,
    }
  }

  export const addChannelMembers = async ({
    userId: _userId,
    channelId,
    memberIds,
  }: {
    userId: string
    channelId: string
    memberIds: string[]
  }) => {
    const channel = streamClient.channel('messaging', channelId)
    const response = await channel.addMembers(memberIds)
    return {
      channel: response.channel,
      members: response.members,
    }
  }

  export const removeChannelMember = async ({
    userId: _userId,
    channelId,
    memberId,
  }: {
    userId: string
    channelId: string
    memberId: string
  }) => {
    const channel = streamClient.channel('messaging', channelId)
    const response = await channel.removeMembers([memberId])
    return {
      channel: response.channel,
      members: response.members,
    }
  }

  export const muteChannel = async ({
    userId,
    channelId,
  }: {
    userId: string
    channelId: string
  }) => {
    const channel = streamClient.channel('messaging', channelId)
    await channel.mute({ user_id: userId })
    return {
      success: true,
    }
  }

  export const unmuteChannel = async ({
    userId,
    channelId,
  }: {
    userId: string
    channelId: string
  }) => {
    const channel = streamClient.channel('messaging', channelId)
    await channel.unmute({ user_id: userId })
    return {
      success: true,
    }
  }

  export const searchMessages = async ({
    userId,
    query,
  }: {
    userId: string
    query: string
  }) => {
    const response = await streamClient.search(
      {
        members: { $in: [userId] },
      },
      query,
      { limit: 30 }
    )
    return {
      results: response.results,
    }
  }
}

export const generateChatToken = ChatService.generateChatToken
export const createOneToOneConversation = ChatService.createOneToOneConversation
export const createGroupConversation = ChatService.createGroupConversation
export const getMyConversations = ChatService.getMyConversations
export const sendMessage = ChatService.sendMessage
export const getChannelMessages = ChatService.getChannelMessages
export const editMessage = ChatService.editMessage
export const deleteMessage = ChatService.deleteMessage
export const sendReaction = ChatService.sendReaction
export const deleteReaction = ChatService.deleteReaction
export const getMessageReplies = ChatService.getMessageReplies
export const pinMessage = ChatService.pinMessage
export const unpinMessage = ChatService.unpinMessage
export const markRead = ChatService.markRead
export const sendTypingIndicator = ChatService.sendTypingIndicator
export const addChannelMembers = ChatService.addChannelMembers
export const removeChannelMember = ChatService.removeChannelMember
export const muteChannel = ChatService.muteChannel
export const unmuteChannel = ChatService.unmuteChannel
export const searchMessages = ChatService.searchMessages
