import { z } from 'zod'

export const profileVisibilitySchema = z.enum(['PUBLIC', 'COLLEGE', 'FRIENDS', 'PRIVATE'])
export const profileUpdateSchema = z
  .object({
    firstName: z.string().trim().min(1).max(80).optional(),
    lastName: z.string().trim().min(1).max(80).optional(),
    bio: z.string().max(500).nullable().optional(),
    about: z.string().max(4000).nullable().optional(),
    gender: z.enum(['MALE', 'FEMALE', 'OTHER', 'PREFER_NOT_TO_SAY']).nullable().optional(),
    dob: z.string().datetime().or(z.string().date()).nullable().optional(),
    hometown: z.string().max(120).nullable().optional(),
    location: z.string().max(120).nullable().optional(),
    cgpa: z.number().min(0).max(10).nullable().optional(),
    semester: z.number().int().min(1).max(16).nullable().optional(),
    year: z.number().int().min(1).max(10).nullable().optional(),
    batch: z.string().max(32).nullable().optional(),
    rollNumber: z.string().max(64).nullable().optional(),
    skills: z.array(z.string().max(64)).max(50).optional(),
    interests: z.array(z.string().max(64)).max(50).optional(),
    languages: z.array(z.string().max(64)).max(20).optional(),
    github: z.string().url().max(300).nullable().optional(),
    linkedin: z.string().url().max(300).nullable().optional(),
    portfolio: z.string().url().max(300).nullable().optional(),
    leetcodeUrl: z.string().url().max(300).nullable().optional(),
    codeforces: z.string().max(300).nullable().optional(),
    hackerrank: z.string().max(300).nullable().optional(),
    profileVisibility: profileVisibilitySchema.optional(),
    hideEmail: z.boolean().optional(),
    hidePhone: z.boolean().optional(),
    hideCgpa: z.boolean().optional(),
  })
  .strict()
export const protectedProfileFields = [
  'userId',
  'id',
  'role',
  'status',
  'createdAt',
  'updatedAt',
  'leetcodeUsername',
  'leetcodeRating',
  'leetcodeSolved',
  'leetcodeEasy',
  'leetcodeMedium',
  'leetcodeHard',
  'leetcodeGlobalRank',
  'leetcodeUpdatedAt',
  'leetcodeSyncStatus',
  'leetcodeSyncError',
  'profilePicture',
  'profilePictureKey',
  'coverImage',
  'coverImageKey',
] as const
export const createCallSchema = z
  .object({
    type: z
      .enum(['ONE_ON_ONE', 'GROUP', 'MENTORSHIP', 'CLUB_MEETING', 'FACULTY_SESSION'])
      .optional(),
    title: z.string().trim().min(1).max(120).optional(),
    participantIds: z.array(z.string().min(1).max(64)).max(50).optional(),
  })
  .strict()

export const respondInviteSchema = z
  .object({
    response: z.enum(['ACCEPT', 'REJECT']),
  })
  .strict()
export const createCommentSchema = z
  .object({
    content: z.string().trim().min(1).max(2000),
    parentId: z.string().min(1).max(64).nullable().optional(),
  })
  .strict()
export const paginationQuerySchema = z.object({
  limit: z.union([z.string(), z.number()]).optional(),
  cursor: z.string().optional(),
})
export const createStudyGroupSchema = z
  .object({
    name: z.string().trim().min(1).max(120),
    type: z.enum(['SUBJECT', 'EXAM', 'PROJECT', 'ASSIGNMENT']),
    visibility: z.enum(['PUBLIC', 'PRIVATE']),
    subject: z.string().trim().min(1).max(120),
    semester: z.number().int().min(1).max(16),
    description: z.string().trim().max(2000).nullable().optional(),
  })
  .strict()

export const updateStudyGroupSchema = z
  .object({
    name: z.string().trim().min(1).max(120).optional(),
    type: z.enum(['SUBJECT', 'EXAM', 'PROJECT', 'ASSIGNMENT']).optional(),
    visibility: z.enum(['PUBLIC', 'PRIVATE']).optional(),
    subject: z.string().trim().min(1).max(120).optional(),
    semester: z.number().int().min(1).max(16).optional(),
    description: z.string().trim().max(2000).nullable().optional(),
  })
  .strict()

export interface StudyGroupInput {
  name: string
  type: 'SUBJECT' | 'EXAM' | 'PROJECT' | 'ASSIGNMENT'
  visibility: 'PUBLIC' | 'PRIVATE'
  subject: string
  semester: number
  description?: string | null
}

export const studyGroupInvitationSchema = z
  .object({
    userId: z.string().min(1).max(64),
    message: z.string().trim().max(2000).optional(),
  })
  .strict()

export const updateStudyGroupMemberSchema = z
  .object({
    role: z.enum(['ADMIN', 'MEMBER']),
  })
  .strict()

export const studyGroupDiscussionSchema = z
  .object({
    title: z.string().trim().min(1).max(200),
    body: z.string().trim().min(1).max(10000),
  })
  .strict()

export const updateStudyGroupDiscussionSchema = z
  .object({
    title: z.string().trim().min(1).max(200).optional(),
    body: z.string().trim().min(1).max(10000).optional(),
  })
  .strict()

export const studyGroupReplySchema = z
  .object({
    body: z.string().trim().min(1).max(5000),
  })
  .strict()

export const studyGroupNoteSchema = z
  .object({
    title: z.string().trim().min(1).max(200),
    body: z.string().trim().min(1).max(50000),
  })
  .strict()

export const updateStudyGroupNoteSchema = z
  .object({
    title: z.string().trim().min(1).max(200).optional(),
    body: z.string().trim().min(1).max(50000).optional(),
  })
  .strict()

export const studyGroupFileUploadUrlSchema = z
  .object({
    fileName: z.string().trim().min(1).max(255),
    mimeType: z.string().trim().min(1).max(120),
    sizeBytes: z
      .number()
      .int()
      .positive()
      .max(25 * 1024 * 1024),
  })
  .strict()

export const studyGroupFileRegisterSchema = z
  .object({
    key: z.string().trim().min(1).max(500),
    fileName: z.string().trim().min(1).max(255),
    mimeType: z.string().trim().min(1).max(120),
    sizeBytes: z
      .number()
      .int()
      .positive()
      .max(25 * 1024 * 1024),
  })
  .strict()

export const studyGroupTimetableEntrySchema = z
  .object({
    day: z.enum(['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN']),
    start: z.string().regex(/^\d{2}:\d{2}$/),
    end: z.string().regex(/^\d{2}:\d{2}$/),
    title: z.string().trim().min(1).max(200),
    location: z.string().trim().max(200).optional(),
  })
  .strict()

export const studyGroupTimetableSchema = z
  .object({
    entries: z.array(studyGroupTimetableEntrySchema).max(200),
  })
  .strict()

export const studyGroupSearchQuerySchema = z.object({
  q: z.string().trim().min(1).max(200),
})
