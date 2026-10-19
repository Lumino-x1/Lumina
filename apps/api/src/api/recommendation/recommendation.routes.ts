import { optionalAuth } from '../../../middleware'
import * as recommendationController from './recommendation.controller'
import { Router } from 'express'

const recommendationRouter = Router()

recommendationRouter.get('/:collegeId', optionalAuth, recommendationController.getRecommendations)
recommendationRouter.get('/', optionalAuth, recommendationController.getRecommendations)

export default recommendationRouter
