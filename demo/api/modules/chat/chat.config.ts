import { StreamChat } from 'stream-chat'

import 'dotenv/config'

if (!process.env.STREAM_API_KEY) {
  throw new Error('STREAM_API_KEY is missing')
}

if (!process.env.STREAM_API_SECRET) {
  throw new Error('STREAM_API_SECRET is missing')
}

export const streamClient = StreamChat.getInstance(
  process.env.STREAM_API_KEY,
  process.env.STREAM_API_SECRET
)
