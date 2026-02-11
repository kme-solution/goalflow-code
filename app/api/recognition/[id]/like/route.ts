import { request } from "@/lib/auth"
import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"

const prisma = new PrismaClient()

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  try {
    const user = await request.json().catch(() => null)
    if (!user) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
    }

    const { id } = await params

    // Check if recognition exists
    const recognition = await prisma.recognition.findUnique({
      where: { id },
    })

    if (!recognition) {
      return NextResponse.json(
        { success: false, error: "Recognition not found" },
        { status: 404 }
      )
    }

    // Increment likes
    const updated = await prisma.recognition.update({
      where: { id },
      data: {
        likes: {
          increment: 1,
        },
      },
    })

    return NextResponse.json({ success: true, likes: updated.likes })
  } catch (error) {
    console.error("Error liking recognition:", error)
    return NextResponse.json(
      { success: false, error: "Failed to like recognition" },
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

    // Check if recognition exists
    const recognition = await prisma.recognition.findUnique({
      where: { id },
    })

    if (!recognition) {
      return NextResponse.json(
        { success: false, error: "Recognition not found" },
        { status: 404 }
      )
    }

    // Decrement likes (but not below 0)
    const updated = await prisma.recognition.update({
      where: { id },
      data: {
        likes: Math.max(0, recognition.likes - 1),
      },
    })

    return NextResponse.json({ success: true, likes: updated.likes })
  } catch (error) {
    console.error("Error unliking recognition:", error)
    return NextResponse.json(
      { success: false, error: "Failed to unlike recognition" },
      { status: 500 }
    )
  }
}
