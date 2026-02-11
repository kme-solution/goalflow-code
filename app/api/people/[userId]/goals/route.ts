import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { getUserFromToken } from "@/lib/auth.server"
import type { GoalListResponse, Goal } from "@/lib/types/goal.types"

interface RouteParams {
  params: { userId: string }
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const user = await getUserFromToken(request)
    if (!user) {
      return NextResponse.json<GoalListResponse>(
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
    })

    if (!targetUser) {
      return NextResponse.json<GoalListResponse>(
        { success: false, error: "User not found" },
        { status: 404 }
      )
    }

    const { searchParams } = new URL(request.url)
    const type = searchParams.get("type") as "objective" | "key_result" | null
    const status = searchParams.get("status") as "draft" | "active" | "completed" | "at_risk" | "archived" | null

    // Build where clause
    const where: any = {
      organizationId: user.organizationId,
      ownerId: targetUserId,
      isArchived: false,
    }

    if (type) {
      where.type = type
    }

    if (status) {
      where.status = status
    }

    const goals = await prisma.goal.findMany({
      where,
      include: {
        owner: {
          select: {
            id: true,
            name: true,
          },
        },
        department: {
          select: {
            id: true,
            name: true,
          },
        },
        parentGoal: {
          select: {
            id: true,
            title: true,
          },
        },
        childGoals: {
          select: {
            id: true,
            title: true,
            status: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    // Transform database goals to match the expected Goal type
    const transformedGoals: Goal[] = goals.map((goal) => {
      const progress = goal.targetValue
        ? Math.round((goal.currentValue / goal.targetValue) * 100)
        : 0

      return {
        id: goal.id,
        organizationId: goal.organizationId,
        title: goal.title,
        description: goal.description || undefined,
        type: goal.type,
        level: "personal" as const,
        targetValue: goal.targetValue || undefined,
        currentValue: goal.currentValue,
        unit: goal.unit || undefined,
        confidence: goal.confidence,
        confidenceLevel: goal.confidence >= 7 ? "green" : goal.confidence >= 4 ? "yellow" : "red",
        startDate: goal.startDate?.toISOString() || "",
        endDate: goal.endDate.toISOString(),
        status: goal.status,
        ownerId: goal.ownerId,
        ownerName: goal.owner.name,
        contributors: [],
        parentGoalId: goal.parentGoalId || undefined,
        childGoalIds: goal.childGoals.map(child => child.id),
        relatedGoalIds: [],
        dependencies: [],
        progress,
        riskLevel: "low_risk" as const,
        createdAt: goal.createdAt.toISOString(),
        updatedAt: goal.updatedAt.toISOString(),
        progressHistory: [],
      }
    })

    return NextResponse.json<GoalListResponse>({
      success: true,
      goals: transformedGoals,
      total: transformedGoals.length,
    })
  } catch (error) {
    console.error("User goals API error:", error)
    return NextResponse.json<GoalListResponse>(
      {
        success: false,
        error: "Failed to fetch user goals",
      },
      { status: 500 },
    )
  }
}