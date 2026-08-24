import { StreamChat } from 'stream-chat'

import 'dotenv/config'

function requiredSecret(name: string) {
  const value = process.env[name]
  if (value && value.trim().length > 0) {
    return value
  }
  if (process.env.NODE_ENV === 'test') {
    return `test_${name.toLowerCase()}_value_not_for_production`
  }
  throw new Error(`${name} is missing`)
}

export const streamClient = StreamChat.getInstance(
  requiredSecret('STREAM_API_KEY'),
  requiredSecret('STREAM_API_SECRET')
)
