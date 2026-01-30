import { type NextRequest, NextResponse } from "next/server"
import { MOCK_RECOGNITIONS } from "@/lib/mock-data/recognitions"
import type { RecognitionListResponse } from "@/lib/types/recognition.types"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const userId = searchParams.get("userId")
    const type = searchParams.get("type")

    let filteredRecognitions = [...MOCK_RECOGNITIONS]

    if (userId) {
      filteredRecognitions = filteredRecognitions.filter((rec) => rec.toUserId === userId || rec.fromUserId === userId)
    }

    if (type) {
      filteredRecognitions = filteredRecognitions.filter((rec) => rec.type === type)
    }

    // Sort by most recent first
    filteredRecognitions.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

    return NextResponse.json<RecognitionListResponse>({
      success: true,
      recognitions: filteredRecognitions,
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
    const body = await request.json()

    // Mock creating recognition
    const newRecognition = {
      id: `rec-${Date.now()}`,
      fromUserId: body.fromUserId || "current-user",
      fromUserName: body.fromUserName || "Current User",
      toUserId: body.toUserId,
      toUserName: body.toUserName,
      type: "peer" as const,
      badge: body.badge,
      message: body.message,
      isPublic: body.isPublic ?? true,
      createdAt: new Date().toISOString(),
      likes: 0,
    }

    return NextResponse.json({
      success: true,
      recognition: newRecognition,
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
