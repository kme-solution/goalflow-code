import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { getUserFromToken } from "@/lib/auth"

interface RouteParams {
  params: { userId: string }
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const user = await getUserFromToken(request)
    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const targetUserId = params.userId

    // Verify the target user exists and belongs to the same organization
    const targetUser = await prisma.user.findFirst({
      where: {
        id: targetUserId,
        organizationId: user.organizationId,
      },
    })

    if (!targetUser) {
      return new NextResponse("User not found", { status: 404 })
    }

    // Set up Server-Sent Events
    const responseStream = new ReadableStream({
      start(controller) {
        // Send initial connection message
        const initialData = `data: ${JSON.stringify({
          type: "connected",
          message: "Real-time notifications connected",
          timestamp: new Date().toISOString(),
        })}\n\n`

        controller.enqueue(new TextEncoder().encode(initialData))

        // Set up a simple polling mechanism for real-time updates
        // In a production app, you'd use WebSockets or a proper pub/sub system
        let lastNotificationCheck = new Date()

        const checkForNewNotifications = async () => {
          try {
            const newNotifications = await prisma.notification.findMany({
              where: {
                userId: targetUserId,
                createdAt: {
                  gt: lastNotificationCheck,
                },
              },
              orderBy: {
                createdAt: "asc",
              },
            })

            if (newNotifications.length > 0) {
              lastNotificationCheck = new Date()

              const notificationData = `data: ${JSON.stringify({
                type: "notifications",
                notifications: newNotifications.map(notification => ({
                  id: notification.id,
                  type: notification.type,
                  title: notification.title,
                  message: notification.message,
                  priority: notification.priority,
                  link: notification.link,
                  isRead: notification.isRead,
                  createdAt: notification.createdAt.toISOString(),
                })),
                timestamp: new Date().toISOString(),
              })}\n\n`

              controller.enqueue(new TextEncoder().encode(notificationData))
            }

            // Check for goal updates
            const recentGoalUpdates = await prisma.goal.findMany({
              where: {
                organizationId: user.organizationId,
                updatedAt: {
                  gt: lastNotificationCheck,
                },
              },
              include: {
                owner: {
                  select: {
                    id: true,
                    name: true,
                  },
                },
              },
              orderBy: {
                updatedAt: "asc",
              },
            })

            if (recentGoalUpdates.length > 0) {
              lastNotificationCheck = new Date()

              const goalData = `data: ${JSON.stringify({
                type: "goal_updates",
                goals: recentGoalUpdates.map(goal => ({
                  id: goal.id,
                  title: goal.title,
                  status: goal.status,
                  ownerName: goal.owner.name,
                  updatedAt: goal.updatedAt.toISOString(),
                })),
                timestamp: new Date().toISOString(),
              })}\n\n`

              controller.enqueue(new TextEncoder().encode(goalData))
            }

            // Check for new recognitions
            const newRecognitions = await prisma.recognition.findMany({
              where: {
                OR: [
                  { toUserId: targetUserId },
                  { fromUserId: targetUserId },
                ],
                createdAt: {
                  gt: lastNotificationCheck,
                },
                fromUser: {
                  organizationId: user.organizationId,
                },
                toUser: {
                  organizationId: user.organizationId,
                },
              },
              include: {
                fromUser: {
                  select: {
                    id: true,
                    name: true,
                  },
                },
                toUser: {
                  select: {
                    id: true,
                    name: true,
                  },
                },
              },
              orderBy: {
                createdAt: "asc",
              },
            })

            if (newRecognitions.length > 0) {
              lastNotificationCheck = new Date()

              const recognitionData = `data: ${JSON.stringify({
                type: "recognitions",
                recognitions: newRecognitions.map(rec => ({
                  id: rec.id,
                  fromUserName: rec.fromUser.name,
                  toUserName: rec.toUser.name,
                  badge: rec.badge,
                  message: rec.message,
                  createdAt: rec.createdAt.toISOString(),
                })),
                timestamp: new Date().toISOString(),
              })}\n\n`

              controller.enqueue(new TextEncoder().encode(recognitionData))
            }

          } catch (error) {
            console.error("Error checking for updates:", error)
          }
        }

        // Check for updates every 30 seconds
        const interval = setInterval(checkForNewNotifications, 30000)

        // Send a heartbeat every 60 seconds to keep connection alive
        const heartbeat = setInterval(() => {
          const heartbeatData = `data: ${JSON.stringify({
            type: "heartbeat",
            timestamp: new Date().toISOString(),
          })}\n\n`
          controller.enqueue(new TextEncoder().encode(heartbeatData))
        }, 60000)

        // Clean up on connection close
        request.signal.addEventListener("abort", () => {
          clearInterval(interval)
          clearInterval(heartbeat)
          controller.close()
        })
      },
    })

    return new NextResponse(responseStream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Cache-Control",
      },
    })
  } catch (error) {
    console.error("Real-time notifications API error:", error)
    return NextResponse.json(
      { error: "Failed to establish real-time connection" },
      { status: 500 }
    )
  }
}