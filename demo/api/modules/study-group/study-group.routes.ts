import { Router } from 'express'
import * as studyGroupHandler from './study-group.handler'
import { requireAuth } from '../../middleware'


const router = Router()

router.post('/', requireAuth, studyGroupHandler.createStudyGroup);
router.get('/', requireAuth, studyGroupHandler.getStudyGroup);
router.get('/:id', requireAuth, studyGroupHandler.getStudyGroupById);
router.put('/:id', requireAuth, studyGroupHandler.updateStudyGroup);
router.delete('/:id', requireAuth, studyGroupHandler.deleteStudyGroup);
router.post('/:id/join', requireAuth, studyGroupHandler.joinStudyGroup);
router.post('/:id/leave', requireAuth, studyGroupHandler.leaveStudyGroup);
router.get('/:id/members', requireAuth, studyGroupHandler.getStudyGroupMembers);





export default router