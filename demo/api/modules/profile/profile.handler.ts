import { enqueueProfileSync } from '../../config/leetcode.queue'
import { sendError } from '../../lib/send-error'
import * as profileService from './profile.service'
import {
  MSG_FAILED_TO_DELETE_COVER_IMAGE,
  MSG_FAILED_TO_DELETE_PROFILE_PICTURE,
  MSG_FAILED_TO_FETCH_PROFILE,
  MSG_FAILED_TO_UPDATE_PROFILE,
  MSG_FAILED_TO_UPLOAD_COVER_IMAGE,
  MSG_FAILED_TO_UPLOAD_PROFILE_PICTURE,
  MSG_PROFILE_NOT_FOUND,
} from '@lumina/core/constants'

import type { AuthenticatedRequest, UsernameParams } from '@lumina/core/contracts'
import type { Request, Response } from 'express'

export async function getMyProfile(req: Request, res: Response) {
  try {
    const { user } = req as AuthenticatedRequest
    const profile = await profileService.getMyProfile(user.id)

    if (!profile) {
      return res.status(404).json({
        message: MSG_PROFILE_NOT_FOUND,
      })
    }

    return res.json(profile)
  } catch (err) {
    return sendError(res, err)
  }
}

export async function updateMyProfile(req: Request, res: Response) {
  try {
    const { user } = req as AuthenticatedRequest
    const profile = await profileService.updateMyProfile(user.id, req.body)
    if (profile.leetcodeUsername) {
      await enqueueProfileSync(profile.id)
    }
    return res.json(profile)
  } catch (err) {
    if (err && typeof err === 'object' && 'status' in err) {
      return sendError(res, err)
    }
    return res.status(500).json({
      message: MSG_FAILED_TO_UPDATE_PROFILE,
    })
  }
}

export async function getProfileByUsername(req: Request<UsernameParams>, res: Response) {
  try {
    const viewer = (req as unknown as AuthenticatedRequest).user
    const profile = await profileService.getProfileByUsername(req.params.username, viewer)
    return res.json(profile)
  } catch (err) {
    return sendError(res, err)
  }
}

export const uploadProfilePicture = async (req: Request, res: Response) => {
  try {
    const { user } = req as AuthenticatedRequest
    const result = await profileService.uploadProfilePicture(user.id, req.file!)
    return res.status(200).json(result)
  } catch (err) {
    if (err && typeof err === 'object' && 'status' in err) {
      return sendError(res, err)
    }
    return res.status(500).json({
      message: MSG_FAILED_TO_UPLOAD_PROFILE_PICTURE,
    })
  }
}

export const deleteProfilePicture = async (req: Request, res: Response) => {
  try {
    const { user } = req as AuthenticatedRequest
    const result = await profileService.deleteProfilePicture(user.id)
    return res.status(200).json(result)
  } catch (err) {
    if (err && typeof err === 'object' && 'status' in err) {
      return sendError(res, err)
    }
    return res.status(500).json({
      message: MSG_FAILED_TO_DELETE_PROFILE_PICTURE,
    })
  }
}

export const uploadCoverImage = async (req: Request, res: Response) => {
  try {
    const { user } = req as AuthenticatedRequest
    const result = await profileService.uploadCoverImage(user.id, req.file!)
    return res.status(200).json(result)
  } catch (err) {
    if (err && typeof err === 'object' && 'status' in err) {
      return sendError(res, err)
    }
    return res.status(500).json({
      message: MSG_FAILED_TO_UPLOAD_COVER_IMAGE,
    })
  }
}

export const deleteCoverImage = async (req: Request, res: Response) => {
  try {
    const { user } = req as AuthenticatedRequest
    const result = await profileService.deleteCoverImage(user.id)
    return res.status(200).json(result)
  } catch (err) {
    if (err && typeof err === 'object' && 'status' in err) {
      return sendError(res, err)
    }
    return res.status(500).json({
      message: MSG_FAILED_TO_DELETE_COVER_IMAGE,
    })
  }
}
