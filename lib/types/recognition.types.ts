export type RecognitionType = "peer" | "manager" | "company"
export type RecognitionBadge = "team_player" | "innovator" | "mentor" | "leader" | "achiever" | "helper"

export interface Recognition {
  id: string
  fromUserId: string
  fromUserName: string
  fromUserAvatar?: string
  toUserId: string
  toUserName: string
  toUserAvatar?: string
  type: RecognitionType
  badge: RecognitionBadge
  message: string
  isPublic: boolean
  createdAt: string
  likes: number
  likedBy?: string[]
  comments?: RecognitionComment[]
}

export interface RecognitionComment {
  id: string
  userId: string
  userName: string
  userAvatar?: string
  message: string
  createdAt: string
}

export interface RecognitionListResponse {
  success: boolean
  recognitions?: Recognition[]
  error?: string
}

export interface CreateRecognitionRequest {
  toUserId: string
  badge: RecognitionBadge
  message: string
  isPublic: boolean
}
