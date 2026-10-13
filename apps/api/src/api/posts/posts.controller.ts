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

export const createComment = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const content = req.body.content
    if (!content?.trim()) {
      return res.status(400).json({ message: MSG_COMMENT_CANNOT_BE_EMPTY })
    }
    const comment = await PostsService.createComment({
      postId: req.params.id as string,
      userId: req.user.id,
      content: content.trim(),
      parentId: req.body.parentId ?? null,
    })
    return res.status(201).json({ success: true, data: comment })
  } catch (error) {
    return sendError(res, error)
  }
}

export const listComments = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const limit = parseLimit(req.query.limit)
    const cursor = typeof req.query.cursor === 'string' ? req.query.cursor : undefined
    const comments = await PostsService.listComments(req.params.id as string, limit, cursor)
    return res.status(200).json({ success: true, data: comments })
  } catch (error) {
    return sendError(res, error)
  }
}

export const pinComment = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const result = await PostsService.pinComment(
      req.user.id,
      req.params.commentId as string,
      req.body?.isPinned !== false
    )
    return res.status(200).json({ success: true, data: result })
  } catch (error) {
    return sendError(res, error)
  }
}

export const deleteComment = async (req: AuthenticatedRequest, res: Response) => {
  try {
    await PostsService.deleteComment(req.user.id, req.params.commentId as string)
    return res.status(204).send()
  } catch (error) {
    return sendError(res, error)
  }
}
