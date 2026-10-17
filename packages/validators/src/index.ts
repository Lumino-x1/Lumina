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

export const createClubSchema = z
  .object({
    name: z.string().trim().min(1).max(120),
    description: z.string().trim().max(2000).nullable().optional(),
    category: z.string().trim().max(80).nullable().optional(),
  })
  .strict()

export const updateClubSchema = z
  .object({
    name: z.string().trim().min(1).max(120).optional(),
    description: z.string().trim().max(2000).nullable().optional(),
    category: z.string().trim().max(80).nullable().optional(),
    status: z.enum(['ACTIVE', 'ARCHIVED']).optional(),
  })
  .strict()

export const clubInvitationSchema = z
  .object({
    userId: z.string().min(1).max(64),
    role: z.enum(['MEMBER', 'CORE_MEMBER', 'SECRETARY', 'PRESIDENT', 'FACULTY']).optional(),
    message: z.string().trim().max(2000).optional(),
  })
  .strict()

export const respondClubInvitationSchema = z
  .object({
    response: z.enum(['ACCEPT', 'REJECT']),
  })
  .strict()

export const updateClubMemberRoleSchema = z
  .object({
    role: z.enum(['MEMBER', 'CORE_MEMBER', 'SECRETARY', 'PRESIDENT', 'FACULTY']),
  })
  .strict()

export const clubQuerySchema = z.object({
  q: z.string().trim().max(200).optional(),
  category: z.string().trim().max(80).optional(),
  status: z.enum(['ACTIVE', 'ARCHIVED']).optional(),
  limit: z.union([z.string(), z.number()]).optional(),
  cursor: z.string().optional(),
})

export const createClubEventSchema = z
  .object({
    title: z.string().trim().min(1).max(150),
    description: z.string().trim().max(3000).nullable().optional(),
    startTime: z.string(),
    endTime: z.string(),
    venue: z.string().trim().max(200).nullable().optional(),
  })
  .strict()

export const createClubPostSchema = z
  .object({
    content: z.string().trim().min(1).max(4000),
    isAnnouncement: z.boolean().optional(),
  })
  .strict()

// --- Section 14: Internship Portal Validation Schemas ---
export const createCompanySchema = z
  .object({
    name: z.string().trim().min(1).max(150),
    logo: z.string().url().max(500).nullable().optional(),
    website: z.string().url().max(300).nullable().optional(),
    description: z.string().trim().max(3000).nullable().optional(),
    industry: z.string().trim().max(100).nullable().optional(),
    location: z.string().trim().max(150).nullable().optional(),
  })
  .strict()

export const updateCompanySchema = z
  .object({
    name: z.string().trim().min(1).max(150).optional(),
    logo: z.string().url().max(500).nullable().optional(),
    website: z.string().url().max(300).nullable().optional(),
    description: z.string().trim().max(3000).nullable().optional(),
    industry: z.string().trim().max(100).nullable().optional(),
    location: z.string().trim().max(150).nullable().optional(),
  })
  .strict()

export const createInternshipSchema = z
  .object({
    companyId: z.string().min(1).max(64),
    title: z.string().trim().min(1).max(150),
    description: z.string().trim().max(5000).nullable().optional(),
    location: z.string().trim().max(150).nullable().optional(),
    stipend: z.number().min(0).nullable().optional(),
    type: z.enum(['FULL_TIME', 'PART_TIME', 'REMOTE']).optional(),
    mode: z.enum(['REMOTE', 'ONSITE', 'HYBRID']).optional(),
    status: z.enum(['DRAFT', 'PUBLISHED', 'CLOSED', 'ARCHIVED']).optional(),
    requirements: z.array(z.string().max(200)).max(50).optional(),
    skills: z.array(z.string().max(100)).max(50).optional(),
    deadline: z.string().datetime().or(z.string().date()).nullable().optional(),
    contactEmail: z.string().email().nullable().optional(),
  })
  .strict()

export const updateInternshipSchema = z
  .object({
    title: z.string().trim().min(1).max(150).optional(),
    description: z.string().trim().max(5000).nullable().optional(),
    location: z.string().trim().max(150).nullable().optional(),
    stipend: z.number().min(0).nullable().optional(),
    type: z.enum(['FULL_TIME', 'PART_TIME', 'REMOTE']).optional(),
    mode: z.enum(['REMOTE', 'ONSITE', 'HYBRID']).optional(),
    status: z.enum(['DRAFT', 'PUBLISHED', 'CLOSED', 'ARCHIVED']).optional(),
    requirements: z.array(z.string().max(200)).max(50).optional(),
    skills: z.array(z.string().max(100)).max(50).optional(),
    deadline: z.string().datetime().or(z.string().date()).nullable().optional(),
    contactEmail: z.string().email().nullable().optional(),
  })
  .strict()

export const internshipQuerySchema = z.object({
  q: z.string().trim().max(200).optional(),
  location: z.string().trim().max(150).optional(),
  mode: z.enum(['REMOTE', 'ONSITE', 'HYBRID']).optional(),
  type: z.enum(['FULL_TIME', 'PART_TIME', 'REMOTE']).optional(),
  status: z.enum(['DRAFT', 'PUBLISHED', 'CLOSED', 'ARCHIVED']).optional(),
  companyId: z.string().max(64).optional(),
  limit: z.union([z.string(), z.number()]).optional(),
  cursor: z.string().optional(),
})

export const createInternshipApplicationSchema = z
  .object({
    resumeUrl: z.string().url().max(500).optional(),
    coverLetter: z.string().trim().max(3000).nullable().optional(),
    notes: z.string().trim().max(1000).nullable().optional(),
  })
  .strict()

export const updateApplicationStatusSchema = z
  .object({
    status: z.enum([
      'APPLIED',
      'REVIEWING',
      'SHORTLISTED',
      'INTERVIEW',
      'OFFERED',
      'SELECTED',
      'REJECTED',
      'WITHDRAWN',
    ]),
    notes: z.string().trim().max(1000).nullable().optional(),
  })
  .strict()

export const alumniProfileSchema = z
  .object({
    graduationYear: z.number().int().min(1950).max(2100),
    departmentName: z.string().trim().max(150).nullable().optional(),
    company: z.string().trim().max(150).nullable().optional(),
    jobTitle: z.string().trim().max(150).nullable().optional(),
    industry: z.string().trim().max(100).nullable().optional(),
    location: z.string().trim().max(150).nullable().optional(),
    bio: z.string().trim().max(2000).nullable().optional(),
    isAvailableForMentorship: z.boolean().optional(),
    directoryVisible: z.boolean().optional(),
    linkedIn: z.string().url().max(300).nullable().optional(),
    github: z.string().url().max(300).nullable().optional(),
    skills: z.array(z.string().max(80)).max(50).optional(),
  })
  .strict()

export const updateAlumniProfileSchema = alumniProfileSchema.partial().strict()

export const alumniSearchQuerySchema = z.object({
  q: z.string().trim().max(200).optional(),
  company: z.string().trim().max(150).optional(),
  industry: z.string().trim().max(100).optional(),
  graduationYear: z.union([z.string(), z.number()]).optional(),
  mentorshipOnly: z.union([z.string(), z.boolean()]).optional(),
  limit: z.union([z.string(), z.number()]).optional(),
  cursor: z.string().optional(),
})

export const alumniConnectionRequestSchema = z
  .object({
    alumniId: z.string().min(1).max(64),
    message: z.string().trim().max(1000).nullable().optional(),
  })
  .strict()

export const updateConnectionStatusSchema = z
  .object({
    status: z.enum(['ACCEPTED', 'REJECTED', 'WITHDRAWN']),
  })
  .strict()

export const mentorshipRequestSchema = z
  .object({
    alumniId: z.string().min(1).max(64),
    topic: z.string().trim().min(1).max(200),
    notes: z.string().trim().max(2000).nullable().optional(),
    scheduledAt: z.string().datetime().or(z.string().date()).nullable().optional(),
    durationMinutes: z.number().int().min(15).max(180).optional(),
  })
  .strict()

export const updateMentorshipStatusSchema = z
  .object({
    status: z.enum(['SCHEDULED', 'COMPLETED', 'CANCELLED']),
    meetingUrl: z.string().url().max(500).nullable().optional(),
    scheduledAt: z.string().datetime().or(z.string().date()).nullable().optional(),
    notes: z.string().trim().max(2000).nullable().optional(),
  })
  .strict()

export const createAlumniReferralSchema = z
  .object({
    title: z.string().trim().min(1).max(150),
    company: z.string().trim().min(1).max(150),
    location: z.string().trim().max(150).nullable().optional(),
    description: z.string().trim().max(4000).nullable().optional(),
    link: z.string().url().max(500).nullable().optional(),
  })
  .strict()

export const createAlumniEventSchema = z
  .object({
    title: z.string().trim().min(1).max(150),
    description: z.string().trim().max(4000).nullable().optional(),
    eventDate: z.string().datetime().or(z.string().date()),
    location: z.string().trim().max(150).nullable().optional(),
    virtualLink: z.string().url().max(500).nullable().optional(),
  })
  .strict()

export const alumniVerificationApproveSchema = z
  .object({
    userId: z.string().min(1).max(64),
    approve: z.boolean(),
  })
  .strict()

export const notificationQuerySchema = z.object({
  unreadOnly: z.union([z.string(), z.boolean()]).optional(),
  archived: z.union([z.string(), z.boolean()]).optional(),
  type: z.string().optional(),
  limit: z.union([z.string(), z.number()]).optional(),
  cursor: z.string().optional(),
})

export const markNotificationsReadSchema = z
  .object({
    notificationIds: z.array(z.string().min(1).max(64)).min(1).max(100),
  })
  .strict()

export const notificationPreferenceSchema = z
  .object({
    emailEnabled: z.boolean().optional(),
    pushEnabled: z.boolean().optional(),
    inAppEnabled: z.boolean().optional(),
    comments: z.boolean().optional(),
    likes: z.boolean().optional(),
    mentions: z.boolean().optional(),
    events: z.boolean().optional(),
    clubs: z.boolean().optional(),
    internships: z.boolean().optional(),
    alumni: z.boolean().optional(),
    system: z.boolean().optional(),
  })
  .strict()

export const registerDeviceTokenSchema = z
  .object({
    token: z.string().trim().min(1).max(500),
    platform: z.enum(['WEB', 'IOS', 'ANDROID']).optional(),
  })
  .strict()

export const adminUserQuerySchema = z.object({
  q: z.string().trim().max(200).optional(),
  role: z.string().optional(),
  status: z.string().optional(),
  collegeId: z.string().max(64).optional(),
  limit: z.union([z.string(), z.number()]).optional(),
  cursor: z.string().optional(),
})

export const updateUserRoleStatusSchema = z
  .object({
    role: z
      .enum([
        'STUDENT',
        'FACULTY',
        'ALUMNI',
        'CLUB_ADMIN',
        'COMMUNITY_MODERATOR',
        'COLLEGE_ADMIN',
        'SUPER_ADMIN',
      ])
      .optional(),
    status: z.enum(['PENDING', 'ACTIVE', 'SUSPENDED', 'BANNED', 'DELETED']).optional(),
    reason: z.string().trim().max(1000).optional(),
  })
  .strict()

export const adminModerationActionSchema = z
  .object({
    targetId: z.string().min(1).max(64),
    targetType: z.enum(['COMMENT', 'POST', 'USER', 'CLUB', 'COMMUNITY', 'INTERNSHIP']),
    action: z.enum(['WARN', 'HIDE', 'SUSPEND', 'BAN', 'RESTORE', 'RESOLVE', 'DISMISS', 'REMOVE']),
    reason: z.string().trim().max(1000).optional(),
  })
  .strict()

export const systemSettingSchema = z
  .object({
    key: z.string().trim().min(1).max(100),
    value: z.union([z.string(), z.record(z.unknown()), z.boolean(), z.number()]),
    description: z.string().trim().max(1000).optional(),
  })
  .strict()

export const createAnnouncementSchema = z
  .object({
    title: z.string().trim().min(1).max(200),
    content: z.string().trim().min(1).max(5000),
    type: z.enum(['INFO', 'WARNING', 'CRITICAL', 'MAINTENANCE']).optional(),
    priority: z.enum(['LOW', 'MEDIUM', 'HIGH', 'URGENT']).optional(),
    targetRole: z.enum(['ALL', 'STUDENT', 'ALUMNI', 'FACULTY']).optional(),
  })
  .strict()

export const adminAuditQuerySchema = z.object({
  adminId: z.string().optional(),
  action: z.string().optional(),
  targetType: z.string().optional(),
  limit: z.union([z.string(), z.number()]).optional(),
  cursor: z.string().optional(),
})

export const verifyOtpSchema = z.object({
  email: z.string().trim().email(),
  otp: z.string().trim().regex(/^\d{6}$/, 'OTP must be exactly 6 digits'),
})

export const resendOtpSchema = z.object({
  email: z.string().trim().email(),
})

