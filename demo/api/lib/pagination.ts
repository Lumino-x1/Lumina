import { badRequest } from './http-error'

const DEFAULT_LIMIT = 20
const MAX_LIMIT = 50

export function parseLimit(raw: unknown, fallback = DEFAULT_LIMIT, max = MAX_LIMIT) {
  if (raw === undefined || raw === null || raw === '') {
    return fallback
  }

  const value = typeof raw === 'number' ? raw : Number(String(raw))
  if (!Number.isFinite(value) || !Number.isInteger(value) || value < 1) {
    throw badRequest('INVALID_LIMIT', 'limit must be a positive integer')
  }
  if (value > max) {
    throw badRequest('LIMIT_TOO_LARGE', `limit cannot exceed ${max}`)
  }
  return value
}
