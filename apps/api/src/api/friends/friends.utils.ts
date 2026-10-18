export namespace FriendsUtils {
  export function isSelfRequest(senderId: string, receiverId: string): boolean {
    return senderId === receiverId
  }

  export function getOtherUserId(
    userId: string,
    friendRequest: { senderId: string; receiverId: string }
  ): string {
    return friendRequest.senderId === userId ? friendRequest.receiverId : friendRequest.senderId
  }
}

export const isSelfRequest = FriendsUtils.isSelfRequest
export const getOtherUserId = FriendsUtils.getOtherUserId
