import { type NextRequest, NextResponse } from "next/server"
import type { NotificationListResponse, Notification } from "@/lib/types/notification.types"

const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: "notif-001",
    userId: "emp-001",
    type: "review",
    priority: "high",
    title: "Performance Review Scheduled",
    message: "Your annual review is scheduled for March 25, 2025 at 2:00 PM",
    link: "/employee/reviews",
    isRead: false,
    createdAt: "2025-03-15T10:00:00Z",
  },
  {
    id: "notif-002",
    userId: "emp-001",
    type: "recognition",
    priority: "normal",
    title: "New Recognition Received",
    message: "Michael Chen recognized you for being an Innovator",
    link: "/employee/recognition",
    isRead: false,
    createdAt: "2025-03-15T09:30:00Z",
  },
  {
    id: "notif-003",
    userId: "emp-001",
    type: "goal",
    priority: "normal",
    title: "Goal Progress Update",
    message: "Your goal 'Implement Authentication System' is now 75% complete",
    link: "/employee/goals",
    isRead: true,
    createdAt: "2025-03-14T16:00:00Z",
  },
]

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const userId = searchParams.get("userId")

    let filteredNotifications = [...MOCK_NOTIFICATIONS]

    if (userId) {
      filteredNotifications = filteredNotifications.filter((notif) => notif.userId === userId)
    }

    const unreadCount = filteredNotifications.filter((n) => !n.isRead).length

    return NextResponse.json<NotificationListResponse>({
      success: true,
      notifications: filteredNotifications,
      unreadCount,
    })
  } catch (error) {
    console.error("Notifications API error:", error)
    return NextResponse.json<NotificationListResponse>(
      {
        success: false,
        error: "Failed to fetch notifications",
      },
      { status: 500 },
    )
  }
}
