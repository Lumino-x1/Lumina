import { RecommendationRepo } from './recommendation.repo'

export type PersonRequestStatusType =
  | 'NONE'
  | 'PENDING'
  | 'RECEIVED'
  | 'ACCEPTED'
  | 'REJECTED'
  | 'CANCELLED'
  | 'SELF'

export interface PersonRequestStatus {
  status: PersonRequestStatusType
  requestStatus: PersonRequestStatusType
  direction: 'OUTGOING' | 'INCOMING' | null
  statusMessage: string
  isFriend: boolean
  hasPendingRequest: boolean
  canSendRequest: boolean
  canCancelRequest: boolean
  canAcceptRequest: boolean
  canRejectRequest: boolean
  requestId: string | null
}

export interface RecommendedStudent {
  id: string
  name: string
  username: string | null
  avatar: string | null
  department: string
  departmentCode: string | null
  college: string
  year: string | null
  friendshipStatus?: PersonRequestStatusType
  requestStatus?: PersonRequestStatusType
  requestDirection?: 'OUTGOING' | 'INCOMING' | null
  statusMessage?: string
  isFriend?: boolean
  hasPendingRequest?: boolean
  canSendRequest?: boolean
  canCancelRequest?: boolean
  requestId?: string | null
}

/**
 * Pure evaluation logic determining the friend request status of a person relative to the current viewer.
 */
export function computePersonRequestStatus(
  currentUserId: string | undefined,
  targetUserId: string,
  request?: { id: string; senderId: string; receiverId: string; status: string } | null
): PersonRequestStatus {
  if (!currentUserId) {
    return {
      status: 'NONE',
      requestStatus: 'NONE',
      direction: null,
      statusMessage: 'Not authenticated or no active user context',
      isFriend: false,
      hasPendingRequest: false,
      canSendRequest: true,
      canCancelRequest: false,
      canAcceptRequest: false,
      canRejectRequest: false,
      requestId: null,
    }
  }

  if (currentUserId === targetUserId) {
    return {
      status: 'SELF',
      requestStatus: 'SELF',
      direction: null,
      statusMessage: 'Cannot send a friend request to yourself',
      isFriend: false,
      hasPendingRequest: false,
      canSendRequest: false,
      canCancelRequest: false,
      canAcceptRequest: false,
      canRejectRequest: false,
      requestId: null,
    }
  }

  if (!request) {
    return {
      status: 'NONE',
      requestStatus: 'NONE',
      direction: null,
      statusMessage: 'No friend request between users',
      isFriend: false,
      hasPendingRequest: false,
      canSendRequest: true,
      canCancelRequest: false,
      canAcceptRequest: false,
      canRejectRequest: false,
      requestId: null,
    }
  }

  const isSender = request.senderId === currentUserId

  if (request.status === 'ACCEPTED') {
    return {
      status: 'ACCEPTED',
      requestStatus: 'ACCEPTED',
      direction: isSender ? 'OUTGOING' : 'INCOMING',
      statusMessage: 'Already friends',
      isFriend: true,
      hasPendingRequest: false,
      canSendRequest: false,
      canCancelRequest: false,
      canAcceptRequest: false,
      canRejectRequest: false,
      requestId: request.id,
    }
  }

  if (request.status === 'PENDING') {
    if (isSender) {
      return {
        status: 'PENDING',
        requestStatus: 'PENDING',
        direction: 'OUTGOING',
        statusMessage: 'Friend request sent (pending approval)',
        isFriend: false,
        hasPendingRequest: true,
        canSendRequest: false,
        canCancelRequest: true,
        canAcceptRequest: false,
        canRejectRequest: false,
        requestId: request.id,
      }
    } else {
      return {
        status: 'RECEIVED',
        requestStatus: 'RECEIVED',
        direction: 'INCOMING',
        statusMessage: 'Received friend request from this person',
        isFriend: false,
        hasPendingRequest: true,
        canSendRequest: false,
        canCancelRequest: false,
        canAcceptRequest: true,
        canRejectRequest: true,
        requestId: request.id,
      }
    }
  }

  if (request.status === 'REJECTED') {
    return {
      status: 'REJECTED',
      requestStatus: 'REJECTED',
      direction: isSender ? 'OUTGOING' : 'INCOMING',
      statusMessage: isSender
        ? 'Your friend request was rejected'
        : "You rejected this person's friend request",
      isFriend: false,
      hasPendingRequest: false,
      canSendRequest: true,
      canCancelRequest: false,
      canAcceptRequest: false,
      canRejectRequest: false,
      requestId: request.id,
    }
  }

  if (request.status === 'CANCELLED') {
    return {
      status: 'CANCELLED',
      requestStatus: 'CANCELLED',
      direction: isSender ? 'OUTGOING' : 'INCOMING',
      statusMessage: isSender
        ? 'You cancelled this friend request'
        : 'This person cancelled their friend request',
      isFriend: false,
      hasPendingRequest: false,
      canSendRequest: true,
      canCancelRequest: false,
      canAcceptRequest: false,
      canRejectRequest: false,
      requestId: request.id,
    }
  }

  return {
    status: 'NONE',
    requestStatus: 'NONE',
    direction: null,
    statusMessage: 'No active friend request',
    isFriend: false,
    hasPendingRequest: false,
    canSendRequest: true,
    canCancelRequest: false,
    canAcceptRequest: false,
    canRejectRequest: false,
    requestId: request.id || null,
  }
}

export namespace RecommendationService {
  /**
   * Evaluates the friend request status between current user and target person.
   */
  export async function getPersonRequestStatus(
    currentUserId: string | undefined,
    targetUserId: string
  ): Promise<PersonRequestStatus> {
    if (!currentUserId || !targetUserId) {
      return computePersonRequestStatus(currentUserId, targetUserId, null)
    }

    const requests = await RecommendationRepo.findFriendRequestsBetween(
      currentUserId,
      [targetUserId]
    )
    const request = requests[0] || null
    return computePersonRequestStatus(currentUserId, targetUserId, request)
  }

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

    // 1. Find all user IDs who are already accepted friends with currentUserId
    const friendUserIds = currentUserId
      ? await RecommendationRepo.findFriendUserIds(currentUserId)
      : []

    // Exclude current user + all existing accepted friends
    const excludeIds = new Set<string>()
    if (currentUserId) excludeIds.add(currentUserId)
    for (const fId of friendUserIds) {
      excludeIds.add(fId)
    }

    const excludeArray = Array.from(excludeIds)

    // 2. Fetch candidates from target college, excluding existing friends and self
    let candidates = await RecommendationRepo.findRecommendedStudents(
      targetCollegeId,
      excludeArray,
      limit
    )

    // Filter out any candidates that are in excludeIds (defensive check)
    candidates = candidates.filter((u) => !excludeIds.has(u.id))

    // 3. If fewer than limit, supplement with fallback students (also excluding existing friends and self)
    if (candidates.length < limit) {
      const existingCandidateIds = new Set(candidates.map((u) => u.id))
      const allExclude = Array.from(new Set([...excludeArray, ...existingCandidateIds]))
      const fallbacks = await RecommendationRepo.findFallbackStudents(allExclude, limit * 2)

      for (const fb of fallbacks) {
        if (!excludeIds.has(fb.id) && !existingCandidateIds.has(fb.id)) {
          existingCandidateIds.add(fb.id)
          candidates.push(fb)
          if (candidates.length >= limit) break
        }
      }
    }

    // 4. Fetch friend requests to check status for remaining candidates
    const studentUserIds = candidates.map((u) => u.id)
    const requestMap = new Map<string, { id: string; senderId: string; receiverId: string; status: string }>()

    if (currentUserId && studentUserIds.length > 0) {
      const requests = await RecommendationRepo.findFriendRequestsBetween(
        currentUserId,
        studentUserIds
      )
      for (const req of requests) {
        if (req.senderId === currentUserId) {
          requestMap.set(req.receiverId, req)
        } else if (req.receiverId === currentUserId) {
          requestMap.set(req.senderId, req)
        }
      }
    }

    // 5. Build students list, explicitly skipping anyone who is already a friend (isFriend === true or ACCEPTED)
    const students: RecommendedStudent[] = []

    for (const u of candidates) {
      const req = requestMap.get(u.id) || null
      const statusInfo = computePersonRequestStatus(currentUserId, u.id, req)

      // NEGLECT IF ALREADY FRIENDS
      if (statusInfo.isFriend || statusInfo.status === 'ACCEPTED') {
        continue
      }

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

      students.push({
        id: u.id,
        name: fullName,
        username: u.username || null,
        avatar,
        department: departmentName,
        departmentCode: u.department?.code || null,
        college: collegeName,
        year: u.profile?.year ? `Year ${u.profile.year}` : (u.profile?.batch ? `Batch ${u.profile.batch}` : null),
        friendshipStatus: statusInfo.status,
        requestStatus: statusInfo.status,
        requestDirection: statusInfo.direction,
        statusMessage: statusInfo.statusMessage,
        isFriend: statusInfo.isFriend,
        hasPendingRequest: statusInfo.hasPendingRequest,
        canSendRequest: statusInfo.canSendRequest,
        canCancelRequest: statusInfo.canCancelRequest,
        requestId: statusInfo.requestId,
      })

      if (students.length >= limit) break
    }

    return {
      success: true,
      collegeId: targetCollegeId,
      college: college ? { id: college.id, name: college.name, shortName: college.shortName } : null,
      students,
    }
  }
}
