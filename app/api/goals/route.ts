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

    // Apply logical filtering for level/teamId in memory to avoid
    // relying on Prisma client support for those fields in `where`.
    let filteredGoals = goals

    if (level) {
      filteredGoals = filteredGoals.filter((goal: any) => (goal.level || "personal") === level)
    }

    if (teamId) {
      filteredGoals = filteredGoals.filter((goal: any) => goal.teamId === teamId)
    }

    // Transform database goals to match the expected Goal type
    let transformedGoals: Goal[] = filteredGoals.map((goal: any) => {
      // Safely calculate progress and avoid NaN/Infinity which break JSON serialization
      const hasValidTarget = typeof goal.targetValue === "number" && goal.targetValue > 0
      const rawProgress = hasValidTarget ? (goal.currentValue / goal.targetValue) * 100 : 0
      const progress = Number.isFinite(rawProgress) ? Math.round(rawProgress) : 0

      return {
        id: goal.id,
        organizationId: goal.organizationId,
        title: goal.title,
        description: goal.description || undefined,
        type: goal.type,
        // Some deployments may not yet have a `level` column in the database.
        // Fall back to "personal" when it's missing.
        level: (goal as any).level || "personal",
        targetValue: goal.targetValue || undefined,
        currentValue: goal.currentValue,
        unit: goal.unit || undefined,
        confidence: goal.confidence,
        confidenceLevel: goal.confidence >= 7 ? "green" : goal.confidence >= 4 ? "yellow" : "red",
        startDate: goal.startDate?.toISOString() || "",
        // Some seed/legacy data may not have an end date; fall back safely to a non-null value
        endDate: goal.endDate ? goal.endDate.toISOString() : goal.startDate?.toISOString() || "",
        status: goal.status,
        ownerId: goal.ownerId,
        ownerName: goal.owner.name,
        contributors: [], // Not implemented in schema yet
        parentGoalId: goal.parentGoalId || undefined,
        childGoalIds: goal.childGoals.map((child: any) => child.id),
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
        targetValue: createData.targetValue,
        currentValue: 0, // Start at 0
        unit: createData.unit,
        confidence: createData.confidenceLevel ? (createData.confidenceLevel === "green" ? 8 : createData.confidenceLevel === "yellow" ? 5 : 3) : 5,
        startDate: createData.startDate ? new Date(createData.startDate) : new Date(),
        // Guard against invalid/missing end dates so subsequent reads don't crash
        endDate: createData.endDate ? new Date(createData.endDate) : new Date(),
        status: "draft", // New goals start as draft
        ownerId: createData.ownerId || user.id, // Default to current user if not specified
        parentGoalId: createData.parentGoalId,
        // NOTE: We intentionally avoid persisting `teamId` here because the
        // current Prisma client/database configuration does not accept it in
        // `data` either. Team scoping is currently handled logically in the
        // API/UI layer instead of via a hard DB column.
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
    const dbGoal: any = newGoal
    const transformedGoal: Goal = {
      id: dbGoal.id,
      organizationId: dbGoal.organizationId,
      title: dbGoal.title,
      description: dbGoal.description || undefined,
      type: dbGoal.type,
      level: dbGoal.level || "personal",
      targetValue: dbGoal.targetValue || undefined,
      currentValue: dbGoal.currentValue,
      unit: dbGoal.unit || undefined,
      confidence: dbGoal.confidence,
      confidenceLevel: dbGoal.confidence >= 7 ? "green" : dbGoal.confidence >= 4 ? "yellow" : "red",
      startDate: dbGoal.startDate?.toISOString() || "",
      endDate: dbGoal.endDate.toISOString(),
      status: dbGoal.status,
      ownerId: dbGoal.ownerId,
      ownerName: dbGoal.owner.name,
      contributors: [],
      parentGoalId: dbGoal.parentGoalId || undefined,
      childGoalIds: dbGoal.childGoals.map((child: any) => child.id),
      relatedGoalIds: [],
      dependencies: [],
      progress: dbGoal.targetValue ? Math.round((dbGoal.currentValue / dbGoal.targetValue) * 100) : 0,
      riskLevel: "low_risk" as const,
      createdAt: dbGoal.createdAt.toISOString(),
      updatedAt: dbGoal.updatedAt.toISOString(),
    }

    return NextResponse.json({ success: true, goal: transformedGoal }, { status: 201 })
  } catch (error) {
    console.error("Create goal error:", error)
    return NextResponse.json({ success: false, error: "Failed to create goal" }, { status: 500 })
  }
}
