import { badRequest } from '../../../lib/http-error';
import { PostsService } from '../posts/posts.service';
import { UsersRepo } from '../users/users.repo';
import { findCollegeFeed } from './feed.repo';





const DEFAULT_FEED_LIMIT = 20
const MAX_FEED_LIMIT = 50

export async function getMyFeed(userId: string, options: { limit?: number; cursor?: string } = {}) {
  const user = await UsersRepo.findUserCollegeId(userId)
  if (!user?.collegeId) {
    throw badRequest('COLLEGE_REQUIRED', 'User must belong to a college to view the feed')
  }

  const limit = options.limit ?? DEFAULT_FEED_LIMIT
  if (!Number.isInteger(limit) || limit < 1 || limit > MAX_FEED_LIMIT) {
    throw badRequest('INVALID_FEED_LIMIT', `Limit must be between 1 and ${MAX_FEED_LIMIT}`)
  }

  const posts = await findCollegeFeed(user.collegeId, limit, options.cursor)
  const hasMore = posts.length > limit
  
  const page = hasMore ? posts.slice(0, limit) : posts
  const items = await Promise.all(
    page.map(async (post) => ({
      ...post,
      isLiked: await PostsService.isLiked(userId, post.id),
      isSaved: await PostsService.isSaved(userId, post.id),
      totalComments : post.commentCount
    }))
  )

  return {
    items,
    nextCursor: hasMore ? (items[items.length - 1]?.id ?? null) : null,
  }
}