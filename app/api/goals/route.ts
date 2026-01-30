import { type NextRequest, NextResponse } from "next/server"
import { MOCK_GOALS } from "@/lib/mock-data/goals"
import type { GoalListResponse } from "@/lib/types/goal.types"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const userId = searchParams.get("userId")
    const type = searchParams.get("type")
    const status = searchParams.get("status")

    let filteredGoals = [...MOCK_GOALS]

    if (userId) {
      filteredGoals = filteredGoals.filter((goal) => goal.ownerId === userId)
    }

    if (type) {
      filteredGoals = filteredGoals.filter((goal) => goal.type === type)
    }

    if (status) {
      filteredGoals = filteredGoals.filter((goal) => goal.status === status)
    }

    return NextResponse.json<GoalListResponse>({
      success: true,
      goals: filteredGoals,
    })
  } catch (error) {
    console.error("Goals API error:", error)
    return NextResponse.json<GoalListResponse>(
      {
        success: false,
        error: "Failed to fetch goals",
      },
      { status: 500 },
    )
  }
}
