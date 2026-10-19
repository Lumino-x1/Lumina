import { optionalAuth } from '../../../middleware'
import * as recommendationController from './recommendation.controller'
import { Router } from 'express'

const recommendationRouter = Router()

// Status of a person's friend request
recommendationRouter.get('/status/:targetUserId', optionalAuth, recommendationController.getPersonRequestStatus)
recommendationRouter.get('/person/:targetUserId/status', optionalAuth, recommendationController.getPersonRequestStatus)

// College recommendations list
recommendationRouter.get('/:collegeId', optionalAuth, recommendationController.getRecommendations)
recommendationRouter.get('/', optionalAuth, recommendationController.getRecommendations)

export default recommendationRouter
