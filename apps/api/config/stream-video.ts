import { StreamClient } from '@stream-io/node-sdk'

function requiredSecret(name: string) {
  const value = process.env[name]
  if (value && value.trim().length > 0) {
    return value
  }
  if (process.env.NODE_ENV === 'production') {
    throw new Error(`Missing required secret: ${name}`)
  }
  if (process.env.NODE_ENV === 'test') {
    return `test_${name.toLowerCase()}_value_not_for_production`
  }
  throw new Error(`Missing required environment variable: ${name}`)
}

export const STREAM_API_KEY = requiredSecret('STREAM_API_KEY')
const STREAM_API_SECRET = requiredSecret('STREAM_API_SECRET')

export const streamVideoClient = new StreamClient(STREAM_API_KEY, STREAM_API_SECRET)
