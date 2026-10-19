import { createTestApp } from '../helpers/app'
import {
  clearCapturedEmails,
} from '../helpers/auth'
import {
  clearDatabase,
  connectTestDatabase,
  disconnectTestDatabase,
  prepareTestDatabase,
  setTestDatabaseUrl,
} from '../helpers/database'
import {
  createCollege,
  createProfile,
  createTestUser,
} from '../helpers/factories'
import { prisma } from '@db/client'
import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest'

describe('Recommendation | GET /recommendation/:collegeId & /api/recommendation/:collegeId', () => {
  const app = createTestApp()

  beforeAll(() => {
    setTestDatabaseUrl()
    return prepareTestDatabase().then(() => connectTestDatabase())
  })

  afterAll(async () => {
    await disconnectTestDatabase()
  })

  afterEach(async () => {
    await clearDatabase()
    clearCapturedEmails()
  })

  it('returns up to 5 recommended students for the given collegeId', async () => {
    const college = await createCollege({
      name: 'PSG College of Technology',
      slug: 'psg-tech-rec',
      domain: 'psgtech.edu',
    })

    const dept = await prisma.department.create({
      data: {
        name: 'Computer Science & Engineering',
        code: 'CSE',
        collegeId: college.id,
      },
    })

    // Create 6 students in this college
    for (let i = 1; i <= 6; i++) {
      const studentUser = await createTestUser({
        name: `Student ${i}`,
        email: `student${i}@psgtech.edu`,
        collegeId: college.id,
        departmentId: dept.id,
        role: 'STUDENT',
      })
      await createProfile(studentUser.id, {
        firstName: `Student`,
        lastName: `${i}`,
        year: 3,
      })
    }

    const request = (await import('supertest')).default

    // Test /api/recommendation/:collegeId
    const res1 = await request(app)
      .get(`/api/recommendation/${college.id}`)
      .set('Origin', 'http://localhost:3000')

    expect(res1.status).toBe(200)
    expect(res1.body.success).toBe(true)
    expect(res1.body.students).toHaveLength(5)
    expect(res1.body.students[0]).toHaveProperty('name')
    expect(res1.body.students[0]).toHaveProperty('department', 'Computer Science & Engineering')

    // Test /recommendation/:collegeId
    const res2 = await request(app)
      .get(`/recommendation/${college.slug}`)
      .set('Origin', 'http://localhost:3000')

    expect(res2.status).toBe(200)
    expect(res2.body.success).toBe(true)
    expect(res2.body.students).toHaveLength(5)
  })

  it('includes friendshipStatus and requestId when requester has a pending request', async () => {
    const college = await createCollege({
      name: 'PSG College of Technology',
      slug: 'psg-tech-status',
      domain: 'psgtech2.edu',
    })

    const sender = await createTestUser({
      name: 'Active Viewer',
      email: 'viewer@psgtech2.edu',
      collegeId: college.id,
      role: 'STUDENT',
    })

    const targetStudent = await createTestUser({
      name: 'Recommended Friend',
      email: 'target@psgtech2.edu',
      collegeId: college.id,
      role: 'STUDENT',
    })
    await createProfile(targetStudent.id, {
      firstName: 'Recommended',
      lastName: 'Friend',
    })

    // Create a pending friend request from sender to targetStudent
    const friendReq = await prisma.friendRequest.create({
      data: {
        senderId: sender.id,
        receiverId: targetStudent.id,
        status: 'PENDING',
      },
    })

    const request = (await import('supertest')).default
    const res = await request(app)
      .get(`/api/recommendation/${college.id}`)
      .set('Origin', 'http://localhost:3000')
      .set('x-test-user-id', sender.id)

    expect(res.status).toBe(200)
    expect(res.body.success).toBe(true)
    const matching = res.body.students.find((s: any) => s.id === targetStudent.id)
    expect(matching).toBeDefined()
    expect(matching.friendshipStatus).toBe('PENDING')
    expect(matching.requestStatus).toBe('PENDING')
    expect(matching.requestDirection).toBe('OUTGOING')
    expect(matching.hasPendingRequest).toBe(true)
    expect(matching.isFriend).toBe(false)
    expect(matching.requestId).toBe(friendReq.id)
  })

  it('GET /api/recommendation/status/:targetUserId returns detailed request status between users', async () => {
    const college = await createCollege({
      name: 'PSG College of Technology',
      slug: 'psg-tech-status-test',
      domain: 'psgtech3.edu',
    })

    const userA = await createTestUser({
      name: 'User A',
      email: 'usera@psgtech3.edu',
      collegeId: college.id,
      role: 'STUDENT',
    })

    const userB = await createTestUser({
      name: 'User B',
      email: 'userb@psgtech3.edu',
      collegeId: college.id,
      role: 'STUDENT',
    })

    const request = (await import('supertest')).default

    // Case 1: No request between userA and userB -> NONE
    const resNone = await request(app)
      .get(`/api/recommendation/status/${userB.id}`)
      .set('x-test-user-id', userA.id)

    expect(resNone.status).toBe(200)
    expect(resNone.body.success).toBe(true)
    expect(resNone.body.status).toBe('NONE')
    expect(resNone.body.isFriend).toBe(false)
    expect(resNone.body.hasPendingRequest).toBe(false)
    expect(resNone.body.canSendRequest).toBe(true)

    // Case 2: Self request check -> SELF
    const resSelf = await request(app)
      .get(`/api/recommendation/status/${userA.id}`)
      .set('x-test-user-id', userA.id)

    expect(resSelf.status).toBe(200)
    expect(resSelf.body.status).toBe('SELF')
    expect(resSelf.body.canSendRequest).toBe(false)

    // Case 3: userA sends PENDING friend request to userB -> OUTGOING PENDING
    const reqOut = await prisma.friendRequest.create({
      data: {
        senderId: userA.id,
        receiverId: userB.id,
        status: 'PENDING',
      },
    })

    const resOut = await request(app)
      .get(`/api/recommendation/status/${userB.id}`)
      .set('x-test-user-id', userA.id)

    expect(resOut.status).toBe(200)
    expect(resOut.body.status).toBe('PENDING')
    expect(resOut.body.direction).toBe('OUTGOING')
    expect(resOut.body.hasPendingRequest).toBe(true)
    expect(resOut.body.canCancelRequest).toBe(true)
    expect(resOut.body.requestId).toBe(reqOut.id)

    // Check from userB's perspective -> INCOMING RECEIVED
    const resIn = await request(app)
      .get(`/api/recommendation/status/${userA.id}`)
      .set('x-test-user-id', userB.id)

    expect(resIn.status).toBe(200)
    expect(resIn.body.status).toBe('RECEIVED')
    expect(resIn.body.direction).toBe('INCOMING')
    expect(resIn.body.hasPendingRequest).toBe(true)
    expect(resIn.body.canAcceptRequest).toBe(true)
    expect(resIn.body.canRejectRequest).toBe(true)

    // Case 4: Accepted request -> ACCEPTED / isFriend: true
    await prisma.friendRequest.update({
      where: { id: reqOut.id },
      data: { status: 'ACCEPTED' },
    })

    const resAccepted = await request(app)
      .get(`/api/recommendation/status/${userB.id}`)
      .set('x-test-user-id', userA.id)

    expect(resAccepted.status).toBe(200)
    expect(resAccepted.body.status).toBe('ACCEPTED')
    expect(resAccepted.body.isFriend).toBe(true)
    expect(resAccepted.body.hasPendingRequest).toBe(false)
  })
})

