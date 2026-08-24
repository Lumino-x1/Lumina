import { badRequest } from '../../lib/http-error'
import * as repository from './study-group.repo'
import { createStudyGroupSchema, updateStudyGroupSchema } from '@lumina/validators'
import type { StudyGroupInput } from '@lumina/validators'

export const createStudyGroup = async (userId: string, body: unknown) => {
  try {
    const parsed = createStudyGroupSchema.safeParse(body)
    if (!parsed.success) {
      throw badRequest('INVALID_STUDY_GROUP_PAYLOAD', parsed.error.issues[0]?.message)
    }

    return repository.createStudyGroup(userId, parsed.data as StudyGroupInput)
  } catch (error) {
    throw error
  }
}
export const getStudyGroup = async (userId: string) => {
  try {
    return repository.getStudyGroups(userId)
  } catch (error) {
    throw error
  }
}
export const getStudyGroupById = async (userId: string, studyGroupId: string) => {
  try {
    return repository.getStudyGroupById(userId, studyGroupId)
  } catch (error) {
    throw error
  }
}
export const updateStudyGroup = async (userId: string, studyGroupId: string, body: unknown) => {
  try {
    const parsed = updateStudyGroupSchema.safeParse(body)
    if (!parsed.success) {
      throw badRequest('INVALID_STUDY_GROUP_PAYLOAD', parsed.error.issues[0]?.message)
    }
    return repository.updateStudyGroup(userId, studyGroupId, parsed.data as StudyGroupInput)
  } catch (error) {
    throw error
  }
}
export const deleteStudyGroup = async (userId: string, studyGroupId: string) => {
  try {
    return repository.deleteStudyGroup(userId, studyGroupId)
  } catch (error) {
    throw error
  }
}

export const joinStudyGroup = async (userId: string, studyGroupId: string) => {
  try {
    return repository.joinStudyGroup(userId, studyGroupId)
  } catch (error) {
    throw error
  }
}
export const leaveStudyGroup = async (userId: string, studyGroupId: string) => {
  try {
    return repository.leaveStudyGroup(userId, studyGroupId)
  } catch (error) {
    throw error
  }
}
export const getStudyGroupMembers = async (studyGroupId: string) => {
  try {
    return repository.getStudyGroupMembers(studyGroupId)
  } catch (error) {
    throw error
  }
}