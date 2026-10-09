import { requireAuth } from '../../../middleware'
import { getFeed } from './feed.controller'
import { Router } from 'express'

const feedRouter = Router()

feedRouter.get('/', requireAuth, getFeed)

export default feedRouter
