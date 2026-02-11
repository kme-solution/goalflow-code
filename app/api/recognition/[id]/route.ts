import { request } from "@/lib/auth"
import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"
import type { Recognition } from "@/lib/types/recognition.types"

const prisma = new PrismaClient()

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  try {
    const { id } = await params

    const recognition = await prisma.recognition.findUnique({
      where: { id },
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

    if (!recognition) {
      return NextResponse.json(
        { success: false, error: "Recognition not found" },
        { status: 404 }
      )
    }

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

    return NextResponse.json({ success: true, recognition: transformedRecognition })
  } catch (error) {
    console.error("Error fetching recognition:", error)
    return NextResponse.json(
      { success: false, error: "Failed to fetch recognition" },
      { status: 500 }
    )
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  try {
    const user = await request.json().catch(() => null)
    if (!user) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
    }

    const { id } = await params
    const body = await req.json()
    const { message, isPublic } = body

    // Check if user owns this recognition
    const recognition = await prisma.recognition.findUnique({
      where: { id },
    })

    if (!recognition) {
      return NextResponse.json(
        { success: false, error: "Recognition not found" },
        { status: 404 }
      )
    }

    if (recognition.fromUserId !== user.id) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 403 }
      )
    }

    const updated = await prisma.recognition.update({
      where: { id },
      data: {
        ...(message && { message }),
        ...(isPublic !== undefined && { isPublic }),
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
      id: updated.id,
      fromUserId: updated.fromUserId,
      fromUserName: updated.fromUser.name,
      fromUserAvatar: updated.fromUser.avatar || undefined,
      toUserId: updated.toUserId,
      toUserName: updated.toUser.name,
      toUserAvatar: updated.toUser.avatar || undefined,
      type: updated.type as any,
      badge: updated.badge as any,
      message: updated.message,
      isPublic: updated.isPublic,
      createdAt: updated.createdAt.toISOString(),
      likes: updated.likes,
    }

    return NextResponse.json({ success: true, recognition: transformedRecognition })
  } catch (error) {
    console.error("Error updating recognition:", error)
    return NextResponse.json(
      { success: false, error: "Failed to update recognition" },
      { status: 500 }
    )
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  try {
    const user = await request.json().catch(() => null)
    if (!user) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
    }

    const { id } = await params

    // Check if user owns this recognition
    const recognition = await prisma.recognition.findUnique({
      where: { id },
    })

    if (!recognition) {
      return NextResponse.json(
        { success: false, error: "Recognition not found" },
        { status: 404 }
      )
    }

    if (recognition.fromUserId !== user.id) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 403 }
      )
    }

    // Archive instead of delete
    await prisma.recognition.update({
      where: { id },
      data: { isArchived: true },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting recognition:", error)
    return NextResponse.json(
      { success: false, error: "Failed to delete recognition" },
      { status: 500 }
    )
  }
}
