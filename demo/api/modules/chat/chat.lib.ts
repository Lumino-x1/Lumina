import crypto from 'crypto'

export const getChannelId = (userId: string, otherUserId: string) => {
  const channelId = [userId, otherUserId].sort()
  return crypto.createHash('sha256').update(channelId.join(':')).digest('hex').slice(0, 32)
}
