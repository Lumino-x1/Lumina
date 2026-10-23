import crypto from 'node:crypto';
import { StreamChat } from "stream-chat";





const apiKey = process.env.STREAM_API_KEY
const apiSecret = process.env.STREAM_API_SECRET


export namespace ChatLib {
  export const getChannelId = (userId: string, otherUserId: string) => {
    const channelId = [userId, otherUserId].sort()
    return crypto.createHash('sha256').update(channelId.join(':')).digest('hex').slice(0, 32)
  }
}

export const getChannelId = ChatLib.getChannelId

if (!apiKey || !apiSecret) {
  throw new Error('Stream credentials are missing')
}

export const streamServer = StreamChat.getInstance(apiKey, apiSecret)