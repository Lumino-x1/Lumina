import { sendError } from '../../lib/send-error'
import * as studyGroupService from './study-group.service'
import type { AuthenticatedRequest } from '@lumina/contracts'
import type { Request, Response } from 'express'
import { badRequest } from '../../lib/http-error'
import { updateStudyGroupSchema } from '@lumina/validators'
import type { StudyGroupInput } from '@lumina/validators'
import { createStudyGroupSchema } from '@lumina/validators'

export const createStudyGroup = async (req: Request, res: Response) => {
  try {
    const { user } = req as AuthenticatedRequest
    const parsed = createStudyGroupSchema.safeParse(req.body)
    if (!parsed.success) {
      return sendError(res, badRequest('INVALID_STUDY_GROUP_PAYLOAD', parsed.error.issues[0]?.message))
    }
    const studyGroup = await studyGroupService.createStudyGroup(user.id, parsed.data as StudyGroupInput)
    return res.status(201).json(studyGroup)
  } catch (error) {
    return sendError(res, error)
  }
}
export const getStudyGroup = async (req: Request, res: Response) => {
  try {
    const { user } = req as AuthenticatedRequest
    const studyGroups = await studyGroupService.getStudyGroup(user.id)
    return res.status(200).json(studyGroups)
  } 
  catch(error) {
    return sendError(res, error)
  }
};
export const getStudyGroupById = async (req: Request, res: Response) => {
  try {
    const { user } = req as AuthenticatedRequest
    const studyGroup = await studyGroupService.getStudyGroupById(user.id, req.params.id as string);
    return res.status(200).json(studyGroup)
  } catch(error) {
    return sendError(res, error)
  }
};

export const updateStudyGroup = async (req: Request, res: Response) => {
  try {
  const { user } = req as AuthenticatedRequest
  const parsed = updateStudyGroupSchema.safeParse(req.body)
  if (!parsed.success) {
    return sendError(res, badRequest('INVALID_STUDY_GROUP_PAYLOAD', parsed.error.issues[0]?.message))
  }
  const studyGroup = await studyGroupService.updateStudyGroup(user.id, req.params.id as string, parsed.data as StudyGroupInput)
  return res.status(200).json(studyGroup)
  } catch(error) {
    return sendError(res, error)
  }
};
export const deleteStudyGroup = async (req: Request, res: Response) => {
  try {
    const { user } = req as AuthenticatedRequest
    const studyGroup = await studyGroupService.deleteStudyGroup(user.id, req.params.id as string)
    return res.status(200).json(studyGroup)
  } catch(error) {
    return sendError(res, error)
  }
};

export const joinStudyGroup = async (req: Request, res: Response) => {
  try {
    const { user } = req as AuthenticatedRequest
    const studyGroup = await studyGroupService.joinStudyGroup(user.id, req.params.id as string)
    return res.status(200).json(studyGroup)
  } catch(error) {
    return sendError(res, error)
  }
};

export const leaveStudyGroup = async (req: Request, res: Response) => {
  try {
    const { user } = req as AuthenticatedRequest
    const studyGroup = await studyGroupService.leaveStudyGroup(user.id, req.params.id as string)
    return res.status(200).json(studyGroup)
  } catch(error) {
    return sendError(res, error)
  }
}
export const getStudyGroupMembers = async (req: Request, res: Response) => {
  try {
    const { user } = req as AuthenticatedRequest
    const studyGroupMembers = await studyGroupService.getStudyGroupMembers(req.params.id as string)
    return res.status(200).json(studyGroupMembers)
  } catch(error) {
    return sendError(res, error)
  }
}
