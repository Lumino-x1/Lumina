import { HttpError } from './http-error'
import { logger } from '@lumina/observability'

import type { NextFunction, Request, Response } from 'express'

export function sendError(res: Response, err: unknown) {
  if (err instanceof HttpError) {
    return res.status(err.status).json({
      message: err.expose ? err.message : 'An unexpected error occurred.',
      code: err.code,
    })
  }

  const message = err instanceof Error ? err.message : String(err)
  const mapped = mapKnownError(message)
  if (mapped) {
    return res.status(mapped.status).json({ message: mapped.message, code: mapped.code })
  }

  logger.error('Unhandled API error', { metadata: { error: message } })
  return res.status(500).json({
    message: 'An unexpected error occurred.',
    code: 'INTERNAL_ERROR',
  })
}

export function asyncRoute(
  handler: (req: Request, res: Response, next: NextFunction) => Promise<unknown>
) {
  return (req: Request, res: Response, next: NextFunction) => {
    handler(req, res, next).catch((err) => {
      if (res.headersSent) {
        next(err)
        return
      }
      sendError(res, err)
    })
  }
}

function mapKnownError(message: string): { status: number; message: string; code: string } | null {
  const table: Record<string, { status: number; message: string; code: string }> = {
    USER_NOT_FOUND: { status: 404, message: 'User not found', code: 'USER_NOT_FOUND' },
    CALL_NOT_FOUND: { status: 404, message: 'CALL_NOT_FOUND', code: 'CALL_NOT_FOUND' },
    CALL_UNAUTHORIZED: { status: 403, message: 'CALL_UNAUTHORIZED', code: 'CALL_UNAUTHORIZED' },
    CALL_EXPIRED: { status: 410, message: 'CALL_EXPIRED', code: 'CALL_EXPIRED' },
    CANNOT_CALL_SELF: { status: 400, message: 'CANNOT_CALL_SELF', code: 'CANNOT_CALL_SELF' },
    TARGET_USER_NOT_FOUND: {
      status: 400,
      message: 'TARGET_USER_NOT_FOUND',
      code: 'TARGET_USER_NOT_FOUND',
    },
    ONLY_HOST_CAN_END_CALL: {
      status: 403,
      message: 'ONLY_HOST_CAN_END_CALL',
      code: 'ONLY_HOST_CAN_END_CALL',
    },
    INVITE_UNAUTHORIZED: {
      status: 403,
      message: 'INVITE_UNAUTHORIZED',
      code: 'INVITE_UNAUTHORIZED',
    },
    POST_NOT_FOUND: { status: 404, message: 'POST_NOT_FOUND', code: 'POST_NOT_FOUND' },
    PARENT_COMMENT_NOT_FOUND: {
      status: 404,
      message: 'PARENT_COMMENT_NOT_FOUND',
      code: 'PARENT_COMMENT_NOT_FOUND',
    },
    INVALID_PARENT_COMMENT: {
      status: 400,
      message: 'INVALID_PARENT_COMMENT',
      code: 'INVALID_PARENT_COMMENT',
    },
  }
  return table[message] ?? null
}
