import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { getUserFromToken } from "@/lib/auth.server"

interface RouteParams {
  params: { userId: string }
}

interface PerformanceData {
  userId: string
  userName: string
  department?: string
  currentGoals: number
  completedGoals: number
  goalCompletionRate: number
  averageConfidence: number
  recentReviews: any[]
  upcomingReviews: any[]
  recognitions: number
  lastActivity: string
}

interface PerformanceResponse {
  success: boolean
  performance?: PerformanceData
  error?: string
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const user = await getUserFromToken(request)
    if (!user) {
      return NextResponse.json<PerformanceResponse>(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      )
    }

    const targetUserId = params.userId

    // Verify the target user exists and belongs to the same organization
    const targetUser = await prisma.user.findFirst({
      where: {
        id: targetUserId,
        organizationId: user.organizationId,
      },
      include: {
        department: {
          select: {
            name: true,
          },
        },
      },
    })

    if (!targetUser) {
      return NextResponse.json<PerformanceResponse>(
        { success: false, error: "User not found" },
        { status: 404 }
      )
    }

    // Get user's goals
    const userGoals = await prisma.goal.findMany({
      where: {
        ownerId: targetUserId,
        organizationId: user.organizationId,
        isArchived: false,
      },
    })

    const currentGoals = userGoals.filter(goal => goal.status !== "completed").length
    const completedGoals = userGoals.filter(goal => goal.status === "completed").length
    const totalGoals = userGoals.length
    const goalCompletionRate = totalGoals > 0 ? Math.round((completedGoals / totalGoals) * 100) : 0

    // Calculate average confidence
    const averageConfidence = userGoals.length > 0
      ? Math.round(userGoals.reduce((sum, goal) => sum + goal.confidence, 0) / userGoals.length)
      : 5

    // Get recent reviews
    const recentReviews = await prisma.review.findMany({
      where: {
        employeeId: targetUserId,
        status: "completed",
      },
      include: {
        cycle: {
          select: {
            name: true,
            type: true,
          },
        },
      },
      orderBy: {
        updatedAt: "desc",
      },
      take: 3,
    })

    // Get upcoming reviews
    const upcomingReviews = await prisma.review.findMany({
      where: {
        employeeId: targetUserId,
        status: {
          in: ["scheduled", "in_progress"],
        },
      },
      include: {
        cycle: {
          select: {
            name: true,
            type: true,
          },
        },
      },
      orderBy: {
        createdAt: "asc",
      },
      take: 2,
    })

    // Get recognition count
    const recognitionCount = await prisma.recognition.count({
      where: {
        OR: [
          { toUserId: targetUserId },
          { fromUserId: targetUserId },
        ],
        fromUser: {
          organizationId: user.organizationId,
        },
        toUser: {
          organizationId: user.organizationId,
        },
      },
    })

    // Get last activity (most recent goal update or review)
    const lastGoalUpdate = userGoals.length > 0
      ? userGoals.sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime())[0].updatedAt
      : null

    const lastReviewUpdate = recentReviews.length > 0 ? recentReviews[0].updatedAt : null

    const lastActivity = lastGoalUpdate && lastReviewUpdate
      ? (lastGoalUpdate > lastReviewUpdate ? lastGoalUpdate : lastReviewUpdate)
      : lastGoalUpdate || lastReviewUpdate || new Date()

    const performanceData: PerformanceData = {
      userId: targetUser.id,
      userName: targetUser.name,
      department: targetUser.department?.name,
      currentGoals,
      completedGoals,
      goalCompletionRate,
      averageConfidence,
      recentReviews: recentReviews.map(review => ({
        id: review.id,
        cycle: review.cycle.name,
        type: review.cycle.type,
        overallRating: review.managerRating ? review.managerRating / 2 : review.selfRating ? review.selfRating / 2 : undefined,
        completedAt: review.updatedAt.toISOString(),
      })),
      upcomingReviews: upcomingReviews.map(review => ({
        id: review.id,
        cycle: review.cycle.name,
        type: review.cycle.type,
        status: review.status,
        scheduledDate: review.createdAt.toISOString(),
      })),
      recognitions: recognitionCount,
      lastActivity: lastActivity.toISOString(),
    }

    return NextResponse.json<PerformanceResponse>({
      success: true,
      performance: performanceData,
    })
  } catch (error) {
    console.error("User performance API error:", error)
    return NextResponse.json<PerformanceResponse>(
      {
        success: false,
        error: "Failed to fetch user performance",
      },
      { status: 500 },
    )
  }
}