import { request } from "@/lib/auth"
import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"
import type { RecognitionListResponse, Recognition } from "@/lib/types/recognition.types"

const prisma = new PrismaClient()

export async function GET(req: Request): Promise<NextResponse> {
  try {
    // Verify user is authenticated
    const user = await request.json().catch(() => null)
    if (!user) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
    }

    const searchParams = new URL(req.url).searchParams
    const type = searchParams.get("type") as "given" | "received" | "all" | null
    const badge = searchParams.get("badge")
    const limit = parseInt(searchParams.get("limit") || "50", 10)
    const offset = parseInt(searchParams.get("offset") || "0", 10)

    // Build where clause
    const where: any = {
      isArchived: false,
    }

    if (type === "given") {
      where.fromUserId = user.id
    } else if (type === "received") {
      where.toUserId = user.id
    }

    if (badge) {
      where.badge = badge
    }

    // Fetch recognitions
    const recognitions = await prisma.recognition.findMany({
      where,
      include: {
        fromUser: {
          select: {
            id: true,
            name: true,
            email: true,
            avatar: true,
          },
        },
        toUser: {
          select: {
            id: true,
            name: true,
            email: true,
            avatar: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      take: limit,
      skip: offset,
    })

    // Transform to response format
    const transformedRecognitions: Recognition[] = recognitions.map((r) => ({
      id: r.id,
      fromUserId: r.fromUserId,
      fromUserName: r.fromUser.name,
      fromUserAvatar: r.fromUser.avatar || undefined,
      toUserId: r.toUserId,
      toUserName: r.toUser.name,
      toUserAvatar: r.toUser.avatar || undefined,
      type: r.type as any,
      badge: r.badge as any,
      message: r.message,
      isPublic: r.isPublic,
      createdAt: r.createdAt.toISOString(),
      likes: r.likes,
    }))

    const response: RecognitionListResponse = {
      success: true,
      recognitions: transformedRecognitions,
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error("Error fetching recognitions:", error)
    return NextResponse.json(
      { success: false, error: "Failed to fetch recognitions" },
      { status: 500 }
    )
  }
}

export async function POST(req: Request): Promise<NextResponse> {
  try {
    // Verify user is authenticated
    const user = await request.json().catch(() => null)
    if (!user) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
    }

    const body = await req.json()
    const { toUserId, badge, message, isPublic } = body

    if (!toUserId || !badge || !message) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      )
    }

    // Create recognition
    const recognition = await prisma.recognition.create({
      data: {
        fromUserId: user.id,
        toUserId,
        badge,
        message,
        type: "peer", // Default to peer recognition
        isPublic: isPublic !== false,
      },
      include: {
        fromUser: {
          select: {
            id: true,
            name: true,
            email: true,
            avatar: true,
          },
        },
        toUser: {
          select: {
            id: true,
            name: true,
            email: true,
            avatar: true,
          },
        },
      },
    })

    // Transform to response format
    const transformedRecognition: Recognition = {
      id: recognition.id,
      fromUserId: recognition.fromUserId,
      fromUserName: recognition.fromUser.name,
      fromUserAvatar: recognition.fromUser.avatar || undefined,
      toUserId: recognition.toUserId,
      toUserName: recognition.toUser.name,
      toUserAvatar: recognition.toUser.avatar || undefined,
      type: recognition.type as any,
      badge: recognition.badge as any,
      message: recognition.message,
      isPublic: recognition.isPublic,
      createdAt: recognition.createdAt.toISOString(),
      likes: recognition.likes,
    }

    return NextResponse.json({ success: true, recognition: transformedRecognition }, { status: 201 })
  } catch (error) {
    console.error("Error creating recognition:", error)
    return NextResponse.json(
      { success: false, error: "Failed to create recognition" },
      { status: 500 }
    )
  }
}
