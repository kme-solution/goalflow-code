import { type NextRequest, NextResponse } from "next/server"
import { detectGoalRisk, getConfidenceLevel } from "@/lib/utils/goal-calculations"
import { MOCK_GOALS } from "@/lib/mock-data/goals"

interface RouteParams {
  params: { id: string }
}

export async function POST(request: NextRequest, { params }: RouteParams) {
  try {
    const { newValue, confidence, comment, evidenceUrl } = await request.json()
    const goalId = params.id

    const goal = MOCK_GOALS.find((g) => g.id === goalId)
    if (!goal) {
      return NextResponse.json({ success: false, error: "Goal not found" }, { status: 404 })
    }

    const previousValue = goal.currentValue
    goal.currentValue = newValue
    goal.confidence = confidence
    goal.confidenceLevel = getConfidenceLevel(confidence)
    goal.progress = (newValue / (goal.targetValue || 100)) * 100
    goal.riskLevel = detectGoalRisk(goal)
    goal.updatedAt = new Date().toISOString()

    if (!goal.progressHistory) {
      goal.progressHistory = []
    }

    goal.progressHistory.push({
      id: `progress-${Date.now()}`,
      goalId,
      previousValue,
      newValue,
      confidence,
      comment,
      evidenceUrl,
      userId: "current-user",
      createdAt: new Date().toISOString(),
    })

    return NextResponse.json({
      success: true,
      goal,
    })
  } catch (error) {
    console.error("Goal progress update error:", error)
    return NextResponse.json({ success: false, error: "Failed to update goal progress" }, { status: 500 })
  }
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const goalId = params.id
    const goal = MOCK_GOALS.find((g) => g.id === goalId)

    if (!goal) {
      return NextResponse.json({ success: false, error: "Goal not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      history: goal.progressHistory || [],
    })
  } catch (error) {
    console.error("Goal progress fetch error:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch goal progress" }, { status: 500 })
  }
}
