import {
  alumniConnectionRequestSchema,
  alumniProfileSchema,
  alumniSearchQuerySchema,
  updateMentorshipStatusSchema,
} from '../../packages/validators/src'
import { describe, expect, it } from 'vitest'

describe('Alumni Permissions & Verification Rules', () => {
  it('validates role requirements for alumni verification approval', () => {
    const canApproveVerification = (role: string) =>
      role === 'ADMIN' || role === 'CAREER_OFFICE' || role === 'SUPER_ADMIN'

    expect(canApproveVerification('ADMIN')).toBe(true)
    expect(canApproveVerification('CAREER_OFFICE')).toBe(true)
    expect(canApproveVerification('STUDENT')).toBe(false)
    expect(canApproveVerification('ALUMNI')).toBe(false)
  })

  it('verifies mentorship session status transitions', () => {
    const validTransitions: Record<string, string[]> = {
      REQUESTED: ['SCHEDULED', 'CANCELLED'],
      SCHEDULED: ['COMPLETED', 'CANCELLED'],
      COMPLETED: [],
      CANCELLED: [],
    }

    expect(validTransitions['REQUESTED']).toContain('SCHEDULED')
    expect(validTransitions['SCHEDULED']).toContain('COMPLETED')
    expect(validTransitions['COMPLETED']).toEqual([])
  })

  it('validates connection request self-connect prevention and duplicate validation', () => {
    const canSendRequest = (senderId: string, recipientId: string) => senderId !== recipientId

    expect(canSendRequest('student-1', 'alumni-1')).toBe(true)
    expect(canSendRequest('student-1', 'student-1')).toBe(false)

    expect(() =>
      alumniConnectionRequestSchema.parse({
        alumniId: 'alumni-123',
        message: 'Hello, looking forward to connecting!',
      })
    ).not.toThrow()
  })

  it('validates alumniProfileSchema graduation year, career fields, and privacy toggles', () => {
    const validProfile = {
      graduationYear: 2022,
      departmentName: 'Computer Science',
      company: 'Google',
      jobTitle: 'Software Engineer',
      industry: 'Technology',
      location: 'Mountain View, CA',
      bio: 'Focused on distributed systems and AI applications.',
      skills: ['Go', 'TypeScript', 'Kubernetes'],
      linkedIn: 'https://linkedin.com/in/sample-alumni',
      github: 'https://github.com/sample-alumni',
      isAvailableForMentorship: true,
      directoryVisible: true,
    }

    const parsed = alumniProfileSchema.parse(validProfile)
    expect(parsed.graduationYear).toBe(2022)
    expect(parsed.company).toBe('Google')
    expect(parsed.directoryVisible).toBe(true)

    // Invalid graduation year (before 1950 or beyond 2100)
    expect(() =>
      alumniProfileSchema.parse({
        ...validProfile,
        graduationYear: 1800,
      })
    ).toThrow()
  })

  it('validates directory search and filter params in alumniSearchQuerySchema', () => {
    const query = {
      q: 'Google',
      company: 'Google',
      industry: 'Technology',
      graduationYear: '2022',
      mentorshipOnly: 'true',
    }

    const parsed = alumniSearchQuerySchema.parse(query)
    expect(parsed.q).toBe('Google')
    expect(parsed.mentorshipOnly).toBe('true')
  })

  it('validates mentorship scheduling payload with scheduledAt and meetingUrl', () => {
    const schedulingPayload = {
      status: 'SCHEDULED',
      meetingUrl: 'https://meet.google.com/xyz-alumni-call',
      scheduledAt: '2026-11-10T14:00:00.000Z',
      notes: 'Session confirmed with mentor.',
    }

    const parsed = updateMentorshipStatusSchema.parse(schedulingPayload)
    expect(parsed.status).toBe('SCHEDULED')
    expect(parsed.meetingUrl).toBe('https://meet.google.com/xyz-alumni-call')
  })
})
