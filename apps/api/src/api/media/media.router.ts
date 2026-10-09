import { Router } from 'express'
import { getPresignedUploadUrl} from './media.controller'


const MediaRouter = Router()

MediaRouter.post('/upload-url', getPresignedUploadUrl)


export default MediaRouter