import { prisma } from '@lumina/db'
import { Prisma } from '@prisma/client'

export const createPost = async (
  tx: Prisma.TransactionClient,
  authorId: string,
  content: string | undefined,
  visibility: any,
  anonymous = false,
  location?: string
) => {
  return tx.post.create({
    data: {
      authorId,
      content,
      visibility,
      anonymous,
      location,
    },
  })
}

export const createMedia = async (tx: Prisma.TransactionClient, postId: string, media: any[]) => {
  return tx.postMedia.createMany({
    data: media.map((item, index) => ({
      postId,
      type: item.type,
      url: item.url,
      key: item.key,
      mimeType: item.mimeType,
      size: item.size,
      width: item.width ?? null,
      height: item.height ?? null,
      duration: item.duration ?? null,
      order: index,
    })),
  })
}

export const findPostById = async (tx: Prisma.TransactionClient, postId: string) => {
  return tx.post.findUnique({
    where: {
      id: postId,
    },
    include: {
      author: {
        select: {
          id: true,
          username: true,
          name: true,
          image: true,
        },
      },
      media: {
        orderBy: {
          order: 'asc',
        },
      },
    },
  })
}

export const findLike = (tx: Prisma.TransactionClient, userId: string, postId: string) => {
  return tx.like.findUnique({
    where: {
      userId_postId: {
        userId,
        postId,
      },
    },
  })
}

export const getLikeCount = async (tx: Prisma.TransactionClient, postId: string) => {
  return tx.like.count({
    where: {
      postId,
    },
  })
}

export const findPostWithAuthor = async (tx: Prisma.TransactionClient, postId: string) => {
  return tx.post.findUnique({
    where: {
      id: postId,
    },
    select: {
      id: true,
      authorId: true,
    },
  })
}

export const createComment = async ({
  tx,
  postId,
  userId,
  content,
  parentId,
}: {
  tx: Prisma.TransactionClient
  postId: string
  userId: string
  content: string
  parentId?: string | null
}) => {
  return tx.comment.create({
    data: {
      postId,
      userId,
      content,
      parentId,
    },
  })
}

export const createCommentNotification = async ({
  tx,
  postAuthorId,
}: {
  tx: Prisma.TransactionClient
  postAuthorId: string
}) => {
  return tx.notification.create({
    data: {
      userId: postAuthorId,
      title: 'New Comment',
      body: 'You have a new comment on your post',
      type: 'COMMENT',
    },
  })
}

export const findCommentById = async (tx: Prisma.TransactionClient, commentId: string) => {
  return prisma.comment.findUnique({
    where: {
      id: commentId,
    },
  })
}
export const findSavedPost = async (
  tx: Prisma.TransactionClient,
  userId: string,

  postId: string
) => {
  return tx.savedPost.findUnique({
    where: {
      userId_postId: {
        userId,

        postId,
      },
    },
  })
}

export const createSavedPost = async (
  tx: Prisma.TransactionClient,

  userId: string,

  postId: string
) => {
  return tx.savedPost.create({
    data: {
      userId,

      postId,
    },
  })
}

export const deleteSavedPost = async (
  tx: Prisma.TransactionClient,
  userId: string,
  postId: string
) => {
  return tx.savedPost.delete({
    where: {
      userId_postId: {
        userId,

        postId,
      },
    },
  })
}

export const listComments = async (postId: string, limit: number, cursor?: string) => {
  return prisma.comment.findMany({
    where: {
      postId,
      parentId: null,
    },
    take: limit,
    ...(cursor ? { skip: 1, cursor: { id: cursor } } : {}),
    orderBy: [{ isPinned: 'desc' }, { createdAt: 'desc' }],
    include: {
      user: { select: { id: true, username: true, name: true, image: true } },
      replies: {
        take: 20,
        orderBy: { createdAt: 'asc' },
        include: {
          user: { select: { id: true, username: true, name: true, image: true } },
        },
      },
    },
  })
}

export const countPinnedComments = async (tx: Prisma.TransactionClient, postId: string) => {
  return tx.comment.count({
    where: { postId, isPinned: true },
  })
}

export const setCommentPinned = async (
  tx: Prisma.TransactionClient,
  commentId: string,
  isPinned: boolean
) => {
  return tx.comment.update({
    where: { id: commentId },
    data: { isPinned },
  })
}

export const deleteComment = async (commentId: string) => {
  return prisma.comment.delete({
    where: { id: commentId },
  })
}

export const findSavedPostsByUser = async (tx: Prisma.TransactionClient, userId: string) => {
  return tx.savedPost.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      post: {
        include: {
          author: {
            select: { id: true, username: true, name: true, image: true },
          },
        },
      },
    },
  })
}
