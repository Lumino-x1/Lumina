import { enqueueProfileSync } from '../../../config/leetcode.queue'
import { sendError } from '../../../lib/send-error'
import { UsersService } from './users.service'
import {
  MSG_FAILED_TO_DELETE_COVER_IMAGE,
  MSG_FAILED_TO_DELETE_PROFILE_PICTURE,
  MSG_FAILED_TO_UPDATE_PROFILE,
  MSG_FAILED_TO_UPLOAD_COVER_IMAGE,
  MSG_FAILED_TO_UPLOAD_PROFILE_PICTURE,
  MSG_PROFILE_NOT_FOUND,
} from '@lumina/constants'
import type { AuthenticatedRequest, UsernameParams } from '@lumina/contracts'
import type { Request, Response } from 'express'

export async function getMyProfile(req: Request, res: Response) {
  try {
    const profile = await UsersService.getMyProfile((req as AuthenticatedRequest).user.id)
    if (!profile) return res.status(404).json({ message: MSG_PROFILE_NOT_FOUND })
    return res.json(profile)
  } catch (error) {
    return sendError(res, error)
  }
}

export async function updateMyProfile(req: Request, res: Response) {
  try {
    const profile = await UsersService.updateMyProfile(
      (req as AuthenticatedRequest).user.id,
      req.body
    )
    if (profile.leetcodeUsername) await enqueueProfileSync(profile.id)
    return res.json(profile)
  } catch (error) {
    if (error && typeof error === 'object' && 'status' in error) return sendError(res, error)
    return res.status(500).json({ message: MSG_FAILED_TO_UPDATE_PROFILE })
  }
}

export async function saveOnboardingProfile(req: Request, res: Response) {
  try {
    const viewerId = (req as AuthenticatedRequest).user?.id
    const result = await UsersService.saveOnboardingProfile(viewerId, req.body)
    if (result.profile?.id && result.profile?.leetcodeUsername) {
      try {
        await enqueueProfileSync(result.profile.id)
      } catch {
        // non-blocking
      }
    }
    return res.status(200).json(result)
  } catch (error) {
    if (error && typeof error === 'object' && 'status' in error) return sendError(res, error)
    return res.status(500).json({ message: 'Failed to save onboarding profile' })
  }
}

export async function getProfileByUsername(req: any, res: Response) {
  try {
    const viewer = (req as unknown as AuthenticatedRequest).user
    return res.json(await UsersService.getProfileByUsername(req.params.username, viewer))
  } catch (error) {
    return sendError(res, error)
  }
}

export async function uploadProfilePicture(req: Request, res: Response) {
  try {
    return res
      .status(200)
      .json(
        await UsersService.uploadProfilePicture((req as AuthenticatedRequest).user.id, req.file!)
      )
  } catch (error) {
    if (error && typeof error === 'object' && 'status' in error) return sendError(res, error)
    return res.status(500).json({ message: MSG_FAILED_TO_UPLOAD_PROFILE_PICTURE })
  }
}

export async function deleteProfilePicture(req: Request, res: Response) {
  try {
    return res
      .status(200)
      .json(await UsersService.deleteProfilePicture((req as AuthenticatedRequest).user.id))
  } catch (error) {
    if (error && typeof error === 'object' && 'status' in error) return sendError(res, error)
    return res.status(500).json({ message: MSG_FAILED_TO_DELETE_PROFILE_PICTURE })
  }
}

export async function uploadCoverImage(req: Request, res: Response) {
  try {
    return res
      .status(200)
      .json(await UsersService.uploadCoverImage((req as AuthenticatedRequest).user.id, req.file!))
  } catch (error) {
    if (error && typeof error === 'object' && 'status' in error) return sendError(res, error)
    return res.status(500).json({ message: MSG_FAILED_TO_UPLOAD_COVER_IMAGE })
  }
}

export async function deleteCoverImage(req: Request, res: Response) {
  try {
    return res
      .status(200)
      .json(await UsersService.deleteCoverImage((req as AuthenticatedRequest).user.id))
  } catch (error) {
    if (error && typeof error === 'object' && 'status' in error) return sendError(res, error)
    return res.status(500).json({ message: MSG_FAILED_TO_DELETE_COVER_IMAGE })
  }
}
