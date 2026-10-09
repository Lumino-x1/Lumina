import { prisma, Prisma } from '@lumina/db'

import type { PostCreateData, PostMediaCreateData } from './posts.types'

export namespace PostsRepo {
  export const createPost = async (tx: Prisma.TransactionClient, data: PostCreateData) => {
    return tx.post.create({
      data: {
        ...data,
      },
    })
  }

  export const createMedia = async (
    tx: Prisma.TransactionClient,
    postId: string,
    media: PostMediaCreateData[]
  ) => {
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

  export const createPostWithMedia = async (data: PostCreateData, media: PostMediaCreateData[]) => {
    return prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      const post = await createPost(tx, data)

      if (media.length > 0) {
        await createMedia(tx, post.id, media)
      }

      return findPostById(tx, post.id)
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

  export const findPostWithAuthor = async (postId: string) =>
    prisma.post.findUnique({
      where: { id: postId },
      select: { id: true, authorId: true },
    })

  export const findCommentById = async (commentId: string) =>
    prisma.comment.findUnique({ where: { id: commentId } })

  export const createComment = async ({
    postId,
    userId,
    content,
    parentId,
  }: {
    postId: string
    userId: string
    content: string
    parentId?: string | null
  }) =>
    prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      const comment = await tx.comment.create({
        data: { postId, userId, content, parentId },
        include: {
          user: { select: { id: true, username: true, name: true, image: true } },
          replies: {
            include: {
              user: { select: { id: true, username: true, name: true, image: true } },
            },
          },
        },
      })
      await tx.post.update({
        where: { id: postId },
        data: {
          commentCount: {
            increment: 1,
          },
        },
      })

      return comment
    })

  export const createCommentNotification = async (postAuthorId: string) =>
    prisma.notification.create({
      data: {
        userId: postAuthorId,
        title: 'New Comment',
        body: 'You have a new comment on your post',
        type: 'COMMENT',
      },
    })

  export const listComments = async (postId: string, limit: number, cursor?: string) =>
    prisma.comment.findMany({
      where: { postId, parentId: null },
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

  export const countComments = async (postId: string) =>
    prisma.comment.count({
      where: { postId },
    })

  export const countPinnedComments = async (tx: Prisma.TransactionClient, postId: string) =>
    tx.comment.count({ where: { postId, isPinned: true } })

  export const setCommentPinned = async (
    tx: Prisma.TransactionClient,
    commentId: string,
    isPinned: boolean
  ) => tx.comment.update({ where: { id: commentId }, data: { isPinned } })

  export const deleteComment = async (commentId: string) =>
    prisma.comment.delete({ where: { id: commentId } })

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

  export const isLiked = async (
    tx: Prisma.TransactionClient,
    userId: string,
    postId: string
  ): Promise<boolean> => {
    const like = await tx.like.findUnique({
      where: {
        userId_postId: {
          userId,
          postId,
        },
      },
      select: { id: true },
    })

    return like !== null
  }

  export const isSaved = async (
    tx: Prisma.TransactionClient,
    userId: string,
    postId: string
  ): Promise<boolean> => {
    const save = await tx.savedPost.findUnique({
      where: {
        userId_postId: {
          userId,
          postId,
        },
      },
      select: { id: true },
    })

    return save !== null
  }
}
