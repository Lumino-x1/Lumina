import { parseLimit } from '../../../lib/pagination'
import { sendError } from '../../../lib/send-error'
import { PostsService } from './posts.service'
import {
  MSG_COMMENT_CANNOT_BE_EMPTY,
  MSG_FAILED_TO_TOGGLE_LIKE,
  MSG_INTERNAL_SERVER_ERROR,
  MSG_LIKE_UPDATED,
  MSG_POST_CREATED_SUCCESSFULLY,
  MSG_POST_NOT_FOUND,
  MSG_POST_SCHEDULED,
  MSG_POST_PUBLISHED,
} from '@lumina/constants'

import type { AuthenticatedRequest } from '@lumina/contracts'
import type { NextFunction, Response } from 'express'


export const createPost = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    await PostsService.createPost({
      userId: req.user.id,
      body: req.body,
    })

    res.status(201).json({
      success: true,
      message: MSG_POST_CREATED_SUCCESSFULLY,
    })
  } catch (error) {
    next(error)
  }
}
export const toggleLike = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const result = await PostsService.toggleLike(req.user.id, req.params.id as string)
    return res.status(200).json({
      success: true,
      message: MSG_LIKE_UPDATED,
      data: result,
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      success: false,
      message: MSG_FAILED_TO_TOGGLE_LIKE,
    })
  }
}

export const toggleSavePost = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const postId = req.params.id as string
    const userId = req.user.id
    const result = await PostsService.toggleSavePost({
      postId,
      userId,
    })
    return res.status(200).json({
      success: true,
      ...result,
      data: {
        saved: result.saved,
      },
    })
  } catch (error: any) {
    if (error.message === 'POST_NOT_FOUND') {
      return res.status(404).json({ success: false, message: MSG_POST_NOT_FOUND })
    }
    console.error(error)
    return res.status(500).json({ success: false, message: MSG_INTERNAL_SERVER_ERROR })
  }
}

export const getMySavedPosts = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const savedPosts = await PostsService.getMySavedPosts(req.user.id)
    return res.status(200).json({ success: true, savedPosts })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ success: false, message: MSG_INTERNAL_SERVER_ERROR })
  }
}

export const schedulePost = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const postId = (req.params.postId || req.params.id) as string
    const scheduleTime = req.body?.scheduleTime || req.body?.scheduledAt
    const post = await PostsService.schedulePost(req.user.id, postId, scheduleTime)
    return res.status(201).json({ success: true, message: MSG_POST_SCHEDULED, data: post })
  } catch (error) {
    return sendError(res, error)
  }
}

export const reschedulePost = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const postId = (req.params.postId || req.params.id) as string
    const scheduleTime = req.body?.scheduleTime || req.body?.scheduledAt
    const post = await PostsService.reschedulePost(req.user.id, postId, scheduleTime)
    return res.status(200).json({ success: true, message: MSG_POST_SCHEDULED, data: post })
  } catch (error) {
    return sendError(res, error)
  }
}

export const deleteScheduledPost = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const postId = (req.params.postId || req.params.id) as string
    const post = await PostsService.deleteScheduledPost(req.user.id, postId)
    return res.status(200).json({ success: true, data: post })
  } catch (error) {
    return sendError(res, error)
  }
}

export const publishPostImmediately = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const postId = (req.params.postId || req.params.id) as string
    const post = await PostsService.publishPostImmediately(req.user.id, postId)
    return res.status(200).json({ success: true, message: MSG_POST_PUBLISHED, data: post })
  } catch (error) {
    return sendError(res, error)
  }
}

export const getScheduledPosts = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const limit = parseLimit(req.query.limit)
    const cursor = typeof req.query.cursor === 'string' ? req.query.cursor : undefined
    const scheduledPosts = await PostsService.getScheduledPosts(req.user.id, limit, cursor)
    return res.status(200).json({ success: true, data: scheduledPosts })
  } catch (error) {
    return sendError(res, error)
  }
}

export {
  createPostComment as createComment,
  listPostComments as listComments,
  pinPostComment as pinComment,
  deletePostComment as deleteComment,
} from '../comments/comments.controller'
