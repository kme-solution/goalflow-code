import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { getUserFromToken } from "@/lib/auth.server"
import type { GoalListResponse, Goal, CreateGoalRequest } from "@/lib/types/goal.types"

export async function GET(request: NextRequest) {
  try {
    const user = await getUserFromToken(request)
    if (!user) {
      return NextResponse.json<GoalListResponse>(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      )
    }

    const searchParams = request.nextUrl.searchParams
    const userId = searchParams.get("userId")
    const type = searchParams.get("type") as "objective" | "key_result" | null
    const status = searchParams.get("status") as "draft" | "active" | "completed" | "at_risk" | "archived" | null
    const level = searchParams.get("level") as "personal" | "team" | "company" | null
    const teamId = searchParams.get("teamId")

    // Build where clause
    const where: any = {
      organizationId: user.organizationId,
      isArchived: false,
    }

    if (userId) {
      where.ownerId = userId
    }

    if (type) {
      where.type = type
    }

    if (status) {
      where.status = status
    }

    if (level) {
      where.level = level
    }

    if (teamId) {
      where.teamId = teamId
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
        level: goal.level || "personal", // Use actual level from database
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
        contributors: [], // Not implemented in schema yet
        parentGoalId: goal.parentGoalId || undefined,
        childGoalIds: goal.childGoals.map(child => child.id),
        relatedGoalIds: [], // Not implemented in schema yet
        dependencies: [], // Not implemented in schema yet
        progress,
        riskLevel: "low_risk" as const, // Default, could be calculated
        createdAt: goal.createdAt.toISOString(),
        updatedAt: goal.updatedAt.toISOString(),
        progressHistory: [], // Not implemented in current response
      }
    })

    return NextResponse.json<GoalListResponse>({
      success: true,
      goals: transformedGoals,
      total: transformedGoals.length,
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

// POST /api/goals - Create a new goal
export async function POST(request: NextRequest) {
  try {
    const user = await getUserFromToken(request)
    if (!user) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
    }

    const createData: CreateGoalRequest = await request.json()

    // Create the goal
    const newGoal = await prisma.goal.create({
      data: {
        organizationId: user.organizationId,
        title: createData.title,
        description: createData.description,
        type: createData.type,
        level: createData.level || "personal", // Set goal level
        targetValue: createData.targetValue,
        currentValue: 0, // Start at 0
        unit: createData.unit,
        confidence: createData.confidenceLevel ? (createData.confidenceLevel === "green" ? 8 : createData.confidenceLevel === "yellow" ? 5 : 3) : 5,
        startDate: createData.startDate ? new Date(createData.startDate) : new Date(),
        endDate: new Date(createData.endDate),
        status: "draft", // New goals start as draft
        ownerId: createData.ownerId || user.id, // Default to current user if not specified
        parentGoalId: createData.parentGoalId,
        teamId: (createData as any).teamId, // Set team association if provided
      },
      include: {
        owner: {
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
    })

    // Transform to match Goal type
    const transformedGoal: Goal = {
      id: newGoal.id,
      organizationId: newGoal.organizationId,
      title: newGoal.title,
      description: newGoal.description || undefined,
      type: newGoal.type,
      level: newGoal.level || "personal",
      targetValue: newGoal.targetValue || undefined,
      currentValue: newGoal.currentValue,
      unit: newGoal.unit || undefined,
      confidence: newGoal.confidence,
      confidenceLevel: newGoal.confidence >= 7 ? "green" : newGoal.confidence >= 4 ? "yellow" : "red",
      startDate: newGoal.startDate?.toISOString() || "",
      endDate: newGoal.endDate.toISOString(),
      status: newGoal.status,
      ownerId: newGoal.ownerId,
      ownerName: newGoal.owner.name,
      contributors: [],
      parentGoalId: newGoal.parentGoalId || undefined,
      childGoalIds: newGoal.childGoals.map(child => child.id),
      relatedGoalIds: [],
      dependencies: [],
      progress: newGoal.targetValue ? Math.round((newGoal.currentValue / newGoal.targetValue) * 100) : 0,
      riskLevel: "low_risk" as const,
      createdAt: newGoal.createdAt.toISOString(),
      updatedAt: newGoal.updatedAt.toISOString(),
    }

    return NextResponse.json({ success: true, goal: transformedGoal }, { status: 201 })
  } catch (error) {
    console.error("Create goal error:", error)
    return NextResponse.json({ success: false, error: "Failed to create goal" }, { status: 500 })
  }
}
