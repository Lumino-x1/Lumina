import { prisma, Prisma } from '@lumina/db'

export namespace CommentsRepo {
  export async function findPostById(postId: string) {
    return prisma.post.findUnique({
      where: { id: postId },
      select: { id: true, authorId: true, visibility: true },
    })
  }

  export async function findCommentById(commentId: string) {
    return prisma.comment.findUnique({
      where: { id: commentId },
      include: {
        user: { select: { id: true, name: true, username: true, image: true } },
        post: { select: { id: true, authorId: true } },
        reactions: true,
        mentions: {
          include: { mentionedUser: { select: { id: true, name: true, username: true } } },
        },
      },
    })
  }

  export async function createCommentRecord(data: {
    content: string
    postId: string
    userId: string
    parentId?: string
    depth: number
  }) {
    return prisma.$transaction(async (tx) => {
      const comment = await tx.comment.create({
        data: {
          content: data.content,
          postId: data.postId,
          userId: data.userId,
          parentId: data.parentId ?? null,
          depth: data.depth,
        },
        include: {
          user: { select: { id: true, name: true, username: true, image: true } },
        },
      })

      await tx.post.update({
        where: { id: data.postId },
        data: { commentCount: { increment: 1 } },
      })

      return comment
    })
  }

  export function formatCommentWithReactions(comment: any, currentUserId?: string) {
    const reactionCounts: Record<string, number> = {}
    let totalLikes = 0
    let userLiked = false
    if (comment.reactions) {
      for (const r of comment.reactions) {
        reactionCounts[r.emoji] = (reactionCounts[r.emoji] || 0) + 1
        totalLikes++
        if (currentUserId && r.userId === currentUserId) {
          userLiked = true
        }
      }
    }

    const formattedReplies = comment.replies
      ? comment.replies.map((reply: any) => formatCommentWithReactions(reply, currentUserId))
      : []

    const isPostAuthor = Boolean(comment.post && comment.post.authorId === comment.userId)
    const canPin = Boolean(currentUserId && comment.post && comment.post.authorId === currentUserId)
    const canDelete = Boolean(
      currentUserId &&
      (comment.userId === currentUserId ||
        (comment.post && comment.post.authorId === currentUserId))
    )

    return {
      ...comment,
      reactionCounts,
      likesCount: totalLikes,
      claps: totalLikes,
      isLiked: userLiked,
      isAuthor: isPostAuthor,
      canPin,
      canDelete,
      replies: formattedReplies,
    }
  }

  export async function getCommentsForPostRepo(
    postId: string,
    cursor?: string,
    limit = 20,
    currentUserId?: string
  ) {
    const rawComments = await prisma.comment.findMany({
      where: { postId, parentId: null },
      take: limit + 1,
      ...(cursor ? { skip: 1, cursor: { id: cursor } } : {}),
      orderBy: [{ isPinned: 'desc' }, { createdAt: 'desc' }],
      select: {
        id: true,
        content: true,
        postId: true,
        userId: true,
        parentId: true,
        depth: true,
        isDeleted: true,
        isPinned: true,
        version: true,
        createdAt: true,
        updatedAt: true,
        post: { select: { id: true, authorId: true } },
        user: { select: { id: true, name: true, username: true, image: true } },
        reactions: { select: { id: true, emoji: true, userId: true } },
        mentions: {
          select: { id: true, mentionedUser: { select: { id: true, name: true, username: true } } },
        },
        replies: {
          take: 10,
          orderBy: { createdAt: 'asc' },
          select: {
            id: true,
            content: true,
            postId: true,
            userId: true,
            parentId: true,
            depth: true,
            isDeleted: true,
            isPinned: true,
            version: true,
            createdAt: true,
            updatedAt: true,
            post: { select: { id: true, authorId: true } },
            user: { select: { id: true, name: true, username: true, image: true } },
            reactions: { select: { id: true, emoji: true, userId: true } },
            mentions: {
              select: {
                id: true,
                mentionedUser: { select: { id: true, name: true, username: true } },
              },
            },
            replies: {
              take: 10,
              orderBy: { createdAt: 'asc' },
              select: {
                id: true,
                content: true,
                postId: true,
                userId: true,
                parentId: true,
                depth: true,
                isDeleted: true,
                isPinned: true,
                version: true,
                createdAt: true,
                updatedAt: true,
                post: { select: { id: true, authorId: true } },
                user: { select: { id: true, name: true, username: true, image: true } },
                reactions: { select: { id: true, emoji: true, userId: true } },
              },
            },
          },
        },
      },
    })

    let nextCursor: string | undefined = undefined
    if (rawComments.length > limit) {
      const nextItem = rawComments.pop()
      nextCursor = nextItem?.id
    }

    const comments = rawComments.map((c) => formatCommentWithReactions(c, currentUserId))

    return { comments, nextCursor }
  }

  export async function updateCommentContentRepo(
    commentId: string,
    newContent: string,
    previousContent: string,
    editedByUserId: string,
    currentVersion: number
  ) {
    try {
      return await prisma.$transaction(async (tx) => {
        await tx.commentEditHistory.create({
          data: {
            commentId,
            previousContent,
            editedByUserId,
            version: currentVersion,
          },
        })

        const updated = await tx.comment.update({
          where: { id: commentId, version: currentVersion },
          data: {
            content: newContent,
            version: { increment: 1 },
          },
          include: {
            user: { select: { id: true, name: true, username: true, image: true } },
          },
        })

        return updated
      })
    } catch (err: any) {
      if (err.code === 'P2025') {
        throw { status: 409, message: 'STALE_COMMENT_VERSION' }
      }
      throw err
    }
  }

  export async function getCommentEditHistoryRepo(commentId: string) {
    return prisma.commentEditHistory.findMany({
      where: { commentId },
      orderBy: { createdAt: 'desc' },
      include: {
        editedBy: { select: { id: true, name: true, username: true } },
      },
    })
  }

  export async function softDeleteCommentRepo(commentId: string) {
    return prisma.$transaction(async (tx) => {
      const comment = await tx.comment.update({
        where: { id: commentId },
        data: {
          isDeleted: true,
          content: '[Comment deleted]',
        },
      })
      await tx.post
        .update({
          where: { id: comment.postId },
          data: { commentCount: { decrement: 1 } },
        })
        .catch(() => null)
      return comment
    })
  }

  export async function toggleReactionRepo(commentId: string, userId: string, emoji: string) {
    const existing = await prisma.commentReaction.findUnique({
      where: {
        commentId_userId_emoji: { commentId, userId, emoji },
      },
    })

    if (existing) {
      await prisma.commentReaction.delete({
        where: { id: existing.id },
      })
      const likesCount = await prisma.commentReaction.count({ where: { commentId } })
      return { action: 'removed' as const, emoji, isLiked: false, likesCount }
    } else {
      const reaction = await prisma.commentReaction.create({
        data: { commentId, userId, emoji },
      })
      const likesCount = await prisma.commentReaction.count({ where: { commentId } })
      return { action: 'added' as const, reaction, emoji, isLiked: true, likesCount }
    }
  }

  export async function removeReactionRepo(commentId: string, userId: string, emoji: string) {
    const existing = await prisma.commentReaction.findUnique({
      where: {
        commentId_userId_emoji: { commentId, userId, emoji },
      },
    })

    if (existing) {
      await prisma.commentReaction.delete({
        where: { id: existing.id },
      })
    }

    return { action: 'removed' as const, emoji }
  }

  export async function togglePinCommentRepo(commentId: string, postId: string, maxPins = 3) {
    return prisma.$transaction(async (tx) => {
      const comment = await tx.comment.findUnique({
        where: { id: commentId },
        select: { id: true, isPinned: true, isDeleted: true },
      })

      if (!comment) {
        throw { status: 404, message: 'COMMENT_NOT_FOUND' }
      }

      if (comment.isDeleted) {
        throw { status: 400, message: 'CANNOT_PIN_DELETED_COMMENT' }
      }

      const nextPinnedState = !comment.isPinned

      if (nextPinnedState) {
        const pinnedCount = await tx.comment.count({
          where: { postId, isPinned: true },
        })
        if (pinnedCount >= maxPins) {
          throw { status: 400, message: 'MAX_PINNED_COMMENTS_EXCEEDED' }
        }
      }

      return tx.comment.update({
        where: { id: commentId },
        data: { isPinned: nextPinnedState },
      })
    })
  }

  export async function createReportRepo(
    commentId: string,
    reporterUserId: string,
    reason: string,
    details?: string
  ) {
    return prisma.commentReport.create({
      data: {
        commentId,
        reporterUserId,
        reason,
        details,
      },
    })
  }

  export async function createMentionsRepo(commentId: string, usernames: string[]) {
    const users = await prisma.user.findMany({
      where: {
        username: { in: usernames },
        status: { notIn: ['SUSPENDED', 'BANNED', 'DELETED'] },
      },
      select: { id: true },
    })

    const mentionData = users.map((u) => ({
      commentId,
      mentionedUserId: u.id,
    }))

    if (mentionData.length > 0) {
      await prisma.commentMention.createMany({
        data: mentionData,
        skipDuplicates: true,
      })
    }

    return users.map((u) => u.id)
  }

  // Post-scoped comment repository operations
  export const createComment = async ({
    postId,
    userId,
    content,
    parentId,
  }: {
    postId: string
    userId: string
    content: string
    parentId?: string
  }) => {
    return prisma.$transaction(async (tx) => {
      const comment = await tx.comment.create({
        data: {
          postId,
          userId,
          content,
          parentId,
        },
        include: {
          user: {
            select: { id: true, name: true, username: true, image: true },
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
  }

  export const createCommentNotification = async (postAuthorId: string) => {
    return prisma.notification.create({
      data: {
        userId: postAuthorId,
        title: 'New Comment',
        body: 'You have a new comment on your post',
        type: 'COMMENT',
      },
    })
  }

  export const listComments = async (postId: string, limit: number, cursor?: string) =>
    prisma.comment.findMany({
      where: { postId },
      take: limit,
      ...(cursor ? { skip: 1, cursor: { id: cursor } } : {}),
      orderBy: { createdAt: 'desc' },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            username: true,
            image: true,
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
}
