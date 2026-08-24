export function isJwtLike(token: string) {
  return token.split('.').length === 3
}

export function decodeJwtPayload(token: string) {
  if (!isJwtLike(token)) {
    return null
  }

  const [, payload] = token.split('.')

  try {
    return JSON.parse(Buffer.from(payload, 'base64url').toString('utf8')) as Record<string, unknown>
  } catch {
    return null
  }
}
