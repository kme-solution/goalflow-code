import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { getUserFromToken } from "@/lib/auth.server"
import type { NotificationListResponse, Notification } from "@/lib/types/notification.types"

export async function GET(request: NextRequest) {
  try {
    const user = await getUserFromToken(request)
    if (!user) {
      return NextResponse.json<NotificationListResponse>(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      )
    }

    const searchParams = request.nextUrl.searchParams
    const userId = searchParams.get("userId") || user.id // Default to current user if not specified

    // Ensure the requested user belongs to the same organization
    const targetUser = await prisma.user.findFirst({
      where: {
        id: userId,
        organizationId: user.organizationId,
      },
    })

    if (!targetUser) {
      return NextResponse.json<NotificationListResponse>(
        { success: false, error: "User not found" },
        { status: 404 }
      )
    }

    const notifications = await prisma.notification.findMany({
      where: {
        userId: userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    const unreadCount = notifications.filter((n) => !n.isRead).length

    // Transform database notifications to match the expected Notification type
    const transformedNotifications: Notification[] = notifications.map((notification) => ({
      id: notification.id,
      userId: notification.userId,
      type: notification.type,
      priority: notification.priority,
      title: notification.title,
      message: notification.message,
      link: notification.link || undefined,
      isRead: notification.isRead,
      createdAt: notification.createdAt.toISOString(),
    }))

    return NextResponse.json<NotificationListResponse>({
      success: true,
      notifications: transformedNotifications,
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
