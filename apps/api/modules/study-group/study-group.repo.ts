import { prisma } from '@lumina/db';

export async function createStudyGroup(
  ownerId: string,
  data: {
    name: string
    type: 'SUBJECT' | 'EXAM' | 'PROJECT' | 'ASSIGNMENT'
    visibility: 'PUBLIC' | 'PRIVATE'
    subject: string
    semester: number
    description?: string | null
  }
) {
  return prisma.studyGroup.create({
    data: {
      name: data.name,
      type: data.type,
      visibility: data.visibility,
      subject: data.subject,
      semester: data.semester,
      description: data.description ?? null,
      ownerId,
      members: {
        create: {
          userId: ownerId,
        },
      },
    },
    include: {
      owner: {
        select: {
          id: true,
          username: true,
          name: true,
          image: true,
        },
      },
      members: {
        include: {
          user: {
            select: {
              id: true,
              username: true,
              name: true,
              image: true,
            },
          },
        },
      },
    },
  })
}

export async function getStudyGroups(userId: string) {
  return prisma.studyGroup.findMany({
    where: {
      members: {
        some: {
          userId,
        },
      },
    },
    include: {
      owner: {
        select: {
          id: true,
          username: true,
          name: true,
          image: true,
        },
      },
      _count: {
        select: {
          members: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  })
}

export async function getStudyGroupById(userId: string, studyGroupId: string) {
  return prisma.studyGroup.findFirst({
    where: {
      id: studyGroupId,
      members: {
        some: {
          userId,
        },
      },
    },
    include: {
      owner: {
        select: {
          id: true,
          username: true,
          name: true,
          image: true,
        },
      },
      _count: {
        select: {
          members: true,
        },
      },
    },
  })
}
export async function updateStudyGroup(userId: string, studyGroupId: string, data: {
  name?: string
  type?: 'SUBJECT' | 'EXAM' | 'PROJECT' | 'ASSIGNMENT'
  visibility?: 'PUBLIC' | 'PRIVATE'
  subject?: string
  semester?: number
  description?: string | null
}) {
  return prisma.studyGroup.update({
    where: {
      id: studyGroupId,
      members: {
        some: {
          userId,
        },
      },
    },
    data: {
      name: data.name,
      type: data.type,
      visibility: data.visibility,
      subject: data.subject,
      semester: data.semester,
      description: data.description ?? null,
    },
    include: {
      owner: {
        select: {
          id: true,
          username: true,
          name: true,
          image: true,
        },
      },
    },
  })
}
export async function deleteStudyGroup(userId: string, studyGroupId: string) {
  return prisma.studyGroup.delete({
    where: {
      id: studyGroupId,
      members: {
        some: {
          userId,
        },
      },
    },
  })
}
export async function joinStudyGroup(userId: string, studyGroupId: string) {
  return prisma.studyGroupMember.upsert({
    where: {
      studyGroupId_userId: { studyGroupId, userId },
    },
    create: { studyGroupId, userId },
    update: {},
  })
}
export async function leaveStudyGroup(userId: string, studyGroupId: string) {
  return prisma.studyGroupMember.deleteMany({
    where: { studyGroupId, userId },
  })
}

export async function getStudyGroupMembers(studyGroupId: string) {
  return prisma.studyGroupMember.findMany({
    where: { studyGroupId },
    include: {
      user: {
        select: {
          id: true,
          username: true,
          name: true,
          image: true,
        },
      },
    },
  })
}
