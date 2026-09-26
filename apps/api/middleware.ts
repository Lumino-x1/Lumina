import { auth } from '@lumina/auth'
import {
  MSG_ONLY_IMAGE_AND_VIDEO_MIME_TYPES_ALLOWED,
  MSG_ONLY_IMAGE_MIME_TYPES_ALLOWED,
  MSG_UNAUTHORIZED,
} from '@lumina/constants'
import multer from 'multer'

import type { AuthenticatedRequest } from '@lumina/contracts'
import type { NextFunction, Request, Response } from 'express'

export type AuthRequest = AuthenticatedRequest

export async function requireAuth(req: Request, res: Response, next: NextFunction) {
  try {
    if (process.env.NODE_ENV === 'test' && req.headers['x-test-user-id']) {
      const { prisma } = await import('@lumina/db')
      const mockUser = await prisma.user.findUnique({
        where: { id: req.headers['x-test-user-id'] as string },
      })
      if (mockUser) {
        ;(req as AuthenticatedRequest).user = {
          id: mockUser.id,
          email: mockUser.email,
          role: String(mockUser.role) as never,
        }
        return next()
      }
    }

    const session = await auth.api.getSession({
      headers: req.headers,
    })

    if (!session) {
      return res.status(401).json({
        message: MSG_UNAUTHORIZED,
      })
    }

    ;(req as AuthenticatedRequest).user = {
      id: session.user.id,
      email: session.user.email,
      role: 'role' in session.user ? String(session.user.role) : 'STUDENT',
    }

    next()
  } catch {
    return res.status(401).json({
      message: MSG_UNAUTHORIZED,
    })
  }
}

export async function optionalAuth(req: Request, _res: Response, next: NextFunction) {
  try {
    const session = await auth.api.getSession({
      headers: req.headers,
    })
    if (session) {
      ;(req as AuthenticatedRequest).user = {
        id: session.user.id,
        email: session.user.email,
        role: 'role' in session.user ? String(session.user.role) : 'STUDENT',
      }
    }
  } catch {
    // anonymous viewers are allowed
  }
  next()
}

const MAX_IMAGE_SIZE = 5 * 1024 * 1024
const MAX_VIDEO_SIZE = 25 * 1024 * 1024
const MAX_CONCURRENT_UPLOADS = 10

let inflightUploads = 0

export function boundConcurrentUploads(req: Request, res: Response, next: NextFunction) {
  if (inflightUploads >= MAX_CONCURRENT_UPLOADS) {
    return res.status(429).json({ message: 'Too many concurrent uploads' })
  }
  inflightUploads += 1
  const release = () => {
    inflightUploads = Math.max(0, inflightUploads - 1)
  }
  res.once('finish', release)
  res.once('close', release)
  next()
}

const imageMimeTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
const videoMimeTypes = ['video/mp4', 'video/webm', 'video/quicktime']

const fileFilter: multer.Options['fileFilter'] = (_req, file, cb) => {
  if (imageMimeTypes.includes(file.mimetype)) {
    cb(null, true)
  } else {
    cb(new Error(MSG_ONLY_IMAGE_MIME_TYPES_ALLOWED))
  }
}

const postMediaFileFilter: multer.Options['fileFilter'] = (_req, file, cb) => {
  if ([...imageMimeTypes, ...videoMimeTypes].includes(file.mimetype)) {
    cb(null, true)
    return
  }

  cb(new Error(MSG_ONLY_IMAGE_AND_VIDEO_MIME_TYPES_ALLOWED))
}

export const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: MAX_IMAGE_SIZE,
    files: 1,
    fields: 10,
  },
  fileFilter,
})

export const uploadPostMedia = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: MAX_VIDEO_SIZE,
    files: 10,
    fields: 20,
  },
  fileFilter: postMediaFileFilter,
})

const resumeMimeTypes = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
]

const resumeFileFilter: multer.Options['fileFilter'] = (_req, file, cb) => {
  if (resumeMimeTypes.includes(file.mimetype)) {
    cb(null, true)
    return
  }
  cb(new Error('Only PDF, DOC, and DOCX files are allowed for resumes.'))
}

const MAX_RESUME_SIZE = 10 * 1024 * 1024

export const uploadResume = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: MAX_RESUME_SIZE,
    files: 1,
    fields: 10,
  },
  fileFilter: resumeFileFilter,
})
