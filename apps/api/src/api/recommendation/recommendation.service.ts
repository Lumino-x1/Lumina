import { RecommendationRepo } from './recommendation.repo'

export interface RecommendedStudent {
  id: string
  name: string
  username: string | null
  avatar: string | null
  department: string
  departmentCode: string | null
  college: string
  year: string | null
  friendshipStatus?: 'NONE' | 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'CANCELLED'
  requestId?: string | null
}

export namespace RecommendationService {
  export async function getRecommendations(
    collegeId: string,
    currentUserId?: string,
    limit: number = 5
  ): Promise<{
    success: boolean
    collegeId: string
    college: { id: string; name: string; shortName: string | null } | null
    students: RecommendedStudent[]
  }> {
    const college = await RecommendationRepo.findCollege(collegeId)
    const targetCollegeId = college?.id || collegeId

    let users = await RecommendationRepo.findRecommendedStudents(
      targetCollegeId,
      currentUserId,
      limit
    )

    // If we have fewer than limit users in this college, supplement with fallback students
    if (users.length < limit) {
      const existingIds = new Set(users.map((u) => u.id))
      if (currentUserId) existingIds.add(currentUserId)

      const fallbacks = await RecommendationRepo.findFallbackStudents(currentUserId, limit * 2)
      for (const fb of fallbacks) {
        if (!existingIds.has(fb.id)) {
          existingIds.add(fb.id)
          users.push(fb)
          if (users.length >= limit) break
        }
      }
    }

    const studentUserIds = users.slice(0, limit).map((u) => u.id)
    const statusMap = new Map<string, { status: string; id: string }>()

    if (currentUserId && studentUserIds.length > 0) {
      const requests = await RecommendationRepo.findFriendRequestsBetween(
        currentUserId,
        studentUserIds
      )
      for (const req of requests) {
        if (req.senderId === currentUserId) {
          statusMap.set(req.receiverId, { status: req.status, id: req.id })
        } else if (req.receiverId === currentUserId && req.status === 'ACCEPTED') {
          statusMap.set(req.senderId, { status: req.status, id: req.id })
        }
      }
    }

    const students: RecommendedStudent[] = users.slice(0, limit).map((u) => {
      const firstName = u.profile?.firstName?.trim()
      const lastName = u.profile?.lastName?.trim()
      const profileFullName = [firstName, lastName].filter(Boolean).join(' ')
      const fullName = (u.name && u.name.trim()) || profileFullName || 'Student'
      const departmentName =
        u.department?.name || (u.department?.code ? u.department.code : 'Computer Science & Engineering')
      const avatar = u.profile?.profilePicture || u.image || null
      const collegeName =
        u.college?.shortName ||
        u.college?.name ||
        college?.shortName ||
        college?.name ||
        'PSG College of Technology'

      const reqInfo = statusMap.get(u.id)
      const friendshipStatus = (reqInfo?.status as any) || 'NONE'
      const requestId = reqInfo?.id || null

      return {
        id: u.id,
        name: fullName,
        username: u.username || null,
        avatar,
        department: departmentName,
        departmentCode: u.department?.code || null,
        college: collegeName,
        year: u.profile?.year ? `Year ${u.profile.year}` : (u.profile?.batch ? `Batch ${u.profile.batch}` : null),
        friendshipStatus,
        requestId,
      }
    })

    return {
      success: true,
      collegeId: targetCollegeId,
      college: college ? { id: college.id, name: college.name, shortName: college.shortName } : null,
      students,
    }
  }
}
