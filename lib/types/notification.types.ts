export type NotificationType = "goal" | "review" | "recognition" | "system" | "reminder"
export type NotificationPriority = "low" | "normal" | "high"

export interface Notification {
  id: string
  userId: string
  type: NotificationType
  priority: NotificationPriority
  title: string
  message: string
  link?: string
  isRead: boolean
  createdAt: string
}

export interface NotificationListResponse {
  success: boolean
  notifications?: Notification[]
  unreadCount?: number
  error?: string
}
