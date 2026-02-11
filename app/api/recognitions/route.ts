import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { getUserFromToken } from "@/lib/auth.server"
import type { RecognitionListResponse, Recognition, CreateRecognitionRequest } from "@/lib/types/recognition.types"
import { broadcastToUser } from "@/app/api/people/[userId]/websocket/route"

export async function GET(request: NextRequest) {
  try {
    const user = await getUserFromToken(request)
    if (!user) {
      return NextResponse.json<RecognitionListResponse>(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      )
    }

    const searchParams = request.nextUrl.searchParams
    const userId = searchParams.get("userId")
    const type = searchParams.get("type") as "peer" | "manager" | "company" | null

    // Build where clause
    const where: any = {
      isArchived: false,
    }

    if (userId) {
      where.OR = [
        { toUserId: userId },
        { fromUserId: userId },
      ]
      // Ensure users belong to the same organization
      where.AND = {
        fromUser: {
          organizationId: user.organizationId,
        },
        toUser: {
          organizationId: user.organizationId,
        },
      }
    } else {
      // If no userId specified, show recognitions from the user's organization
      where.AND = {
        fromUser: {
          organizationId: user.organizationId,
        },
        toUser: {
          organizationId: user.organizationId,
        },
      }
    }

    if (type) {
      where.type = type
    }

    const recognitions = await prisma.recognition.findMany({
      where,
      include: {
        fromUser: {
          select: {
            id: true,
            name: true,
            avatar: true,
          },
        },
        toUser: {
          select: {
            id: true,
            name: true,
            avatar: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    // Transform database recognitions to match the expected Recognition type
    const transformedRecognitions: Recognition[] = recognitions.map((recognition) => ({
      id: recognition.id,
      fromUserId: recognition.fromUserId,
      fromUserName: recognition.fromUser.name,
      fromUserAvatar: recognition.fromUser.avatar || undefined,
      toUserId: recognition.toUserId,
      toUserName: recognition.toUser.name,
      toUserAvatar: recognition.toUser.avatar || undefined,
      type: recognition.type,
      badge: recognition.badge as "team_player" | "innovator" | "mentor" | "leader" | "achiever" | "helper",
      message: recognition.message,
      isPublic: recognition.isPublic,
      createdAt: recognition.createdAt.toISOString(),
      likes: recognition.likes,
      likedBy: [], // Not implemented in schema yet
      comments: [], // Not implemented in schema yet
    }))

    return NextResponse.json<RecognitionListResponse>({
      success: true,
      recognitions: transformedRecognitions,
    })
  } catch (error) {
    console.error("Recognitions API error:", error)
    return NextResponse.json<RecognitionListResponse>(
      {
        success: false,
        error: "Failed to fetch recognitions",
      },
      { status: 500 },
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getUserFromToken(request)
    if (!user) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      )
    }

    const body: CreateRecognitionRequest = await request.json()

    // Validate that the recipient exists and belongs to the same organization
    const toUser = await prisma.user.findFirst({
      where: {
        id: body.toUserId,
        organizationId: user.organizationId,
      },
    })

    if (!toUser) {
      return NextResponse.json(
        { success: false, error: "Recipient not found" },
        { status: 404 }
      )
    }

    // Create the recognition
    const newRecognition = await prisma.recognition.create({
      data: {
        fromUserId: user.id,
        toUserId: body.toUserId,
        badge: body.badge,
        message: body.message,
        type: "peer" as const, // Default to peer, could be determined by relationship
        isPublic: body.isPublic,
      },
      include: {
        fromUser: {
          select: {
            id: true,
            name: true,
            avatar: true,
          },
        },
        toUser: {
          select: {
            id: true,
            name: true,
            avatar: true,
          },
        },
      },
    })

    // Transform to match the expected Recognition type
    const transformedRecognition: Recognition = {
      id: newRecognition.id,
      fromUserId: newRecognition.fromUserId,
      fromUserName: newRecognition.fromUser.name,
      fromUserAvatar: newRecognition.fromUser.avatar || undefined,
      toUserId: newRecognition.toUserId,
      toUserName: newRecognition.toUser.name,
      toUserAvatar: newRecognition.toUser.avatar || undefined,
      type: newRecognition.type,
      badge: newRecognition.badge as "team_player" | "innovator" | "mentor" | "leader" | "achiever" | "helper",
      message: newRecognition.message,
      isPublic: newRecognition.isPublic,
      createdAt: newRecognition.createdAt.toISOString(),
      likes: newRecognition.likes,
      likedBy: [],
      comments: [],
    }

    // Create notification for the recipient
    const notification = await prisma.notification.create({
      data: {
        userId: body.toUserId,
        type: "recognition",
        title: "New Recognition",
        message: `${user.name} recognized you with a ${body.badge.replace("_", " ")} badge`,
        data: {
          recognitionId: newRecognition.id,
          fromUserId: user.id,
          fromUserName: user.name,
          badge: body.badge,
          message: body.message,
        },
        organizationId: user.organizationId,
      },
    })

    // Broadcast notification to the recipient
    await broadcastToUser(body.toUserId, {
      type: "notification",
      data: {
        id: notification.id,
        type: notification.type,
        title: notification.title,
        message: notification.message,
        data: notification.data,
        createdAt: notification.createdAt.toISOString(),
        read: false,
      },
    })

    // Also broadcast the new recognition to the recipient for real-time feed updates
    await broadcastToUser(body.toUserId, {
      type: "recognition",
      data: transformedRecognition,
    })

    return NextResponse.json({
      success: true,
      recognition: transformedRecognition,
    })
  } catch (error) {
    console.error("Create recognition error:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to create recognition",
      },
      { status: 500 },
    )
  }
}
