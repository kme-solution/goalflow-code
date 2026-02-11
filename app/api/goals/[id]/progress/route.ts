import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { getUserFromToken } from "@/lib/auth.server"
import { detectGoalRisk, getConfidenceLevel } from "@/lib/utils/goal-calculations"
import type { GoalProgress } from "@/lib/types/goal.types"
import { broadcastToUser } from "@/app/api/people/[userId]/websocket/route"

interface RouteParams {
  params: { id: string }
}

export async function POST(request: NextRequest, { params }: RouteParams) {
  try {
    const user = await getUserFromToken(request)
    if (!user) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
    }

    const { newValue, confidence, comment, evidenceUrl } = await request.json()
    const goalId = params.id

    // Find the goal and ensure it belongs to the user's organization
    const goal = await prisma.goal.findFirst({
      where: {
        id: goalId,
        organizationId: user.organizationId,
        isArchived: false,
      },
    })

    if (!goal) {
      return NextResponse.json({ success: false, error: "Goal not found" }, { status: 404 })
    }

    const previousValue = goal.currentValue

    // Create progress record
    const progressRecord = await prisma.goalProgress.create({
      data: {
        goalId,
        previousValue,
        newValue,
        confidence,
        comment,
        evidenceUrl,
        userId: user.id,
      },
    })

    // Update the goal with new values
    const updatedGoal = await prisma.goal.update({
      where: { id: goalId },
      data: {
        currentValue: newValue,
        confidence,
        updatedAt: new Date(),
      },
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
    })

    // Create notification for goal progress update
    const notification = await prisma.notification.create({
      data: {
        userId: goal.ownerId,
        type: "goal_progress",
        title: "Goal Progress Updated",
        message: `Progress updated on "${goal.title}" from ${previousValue} to ${newValue}${goal.unit ? ` ${goal.unit}` : ""}`,
        data: {
          goalId: goal.id,
          previousValue,
          newValue,
          unit: goal.unit,
        },
        organizationId: user.organizationId,
      },
    })

    // Broadcast notification to the goal owner
    await broadcastToUser(goal.ownerId, {
      type: "notification",
      data: {
        id: notification.id,
        type: notification.type,
        title: notification.title,
        message: notification.message,
        data: notification.data,
        createdAt: notification.createdAt.toISOString(),
        read: false,
      },
    })

    // If the goal owner is different from the updater, also notify relevant team members
    if (goal.ownerId !== user.id) {
      // Notify the updater about their own action
      const selfNotification = await prisma.notification.create({
        data: {
          userId: user.id,
          type: "goal_progress",
          title: "Goal Progress Updated",
          message: `You updated progress on "${goal.title}" from ${previousValue} to ${newValue}${goal.unit ? ` ${goal.unit}` : ""}`,
          data: {
            goalId: goal.id,
            previousValue,
            newValue,
            unit: goal.unit,
          },
          organizationId: user.organizationId,
        },
      })

      await broadcastToUser(user.id, {
        type: "notification",
        data: {
          id: selfNotification.id,
          type: selfNotification.type,
          title: selfNotification.title,
          message: selfNotification.message,
          data: selfNotification.data,
          createdAt: selfNotification.createdAt.toISOString(),
          read: false,
        },
      })
    }

    // Calculate progress percentage
    const progress = updatedGoal.targetValue
      ? Math.round((updatedGoal.currentValue / updatedGoal.targetValue) * 100)
      : 0

    // Transform to match the expected Goal type
    const transformedGoal = {
      id: updatedGoal.id,
      organizationId: updatedGoal.organizationId,
      title: updatedGoal.title,
      description: updatedGoal.description || undefined,
      type: updatedGoal.type,
      level: "personal" as const,
      targetValue: updatedGoal.targetValue || undefined,
      currentValue: updatedGoal.currentValue,
      unit: updatedGoal.unit || undefined,
      confidence: updatedGoal.confidence,
      confidenceLevel: updatedGoal.confidence >= 7 ? "green" : updatedGoal.confidence >= 4 ? "yellow" : "red",
      startDate: updatedGoal.startDate?.toISOString() || "",
      endDate: updatedGoal.endDate.toISOString(),
      status: updatedGoal.status,
      ownerId: updatedGoal.ownerId,
      ownerName: updatedGoal.owner.name,
      contributors: [],
      parentGoalId: updatedGoal.parentGoalId || undefined,
      childGoalIds: updatedGoal.childGoals.map(child => child.id),
      relatedGoalIds: [],
      dependencies: [],
      progress,
      riskLevel: "low_risk" as const,
      createdAt: updatedGoal.createdAt.toISOString(),
      updatedAt: updatedGoal.updatedAt.toISOString(),
      progressHistory: [], // Will be populated by GET request
    }

    return NextResponse.json({
      success: true,
      goal: transformedGoal,
      progressRecord: {
        id: progressRecord.id,
        goalId: progressRecord.goalId,
        previousValue: progressRecord.previousValue,
        newValue: progressRecord.newValue,
        confidence: progressRecord.confidence,
        comment: progressRecord.comment,
        evidenceUrl: progressRecord.evidenceUrl,
        userId: progressRecord.userId,
        createdAt: progressRecord.createdAt.toISOString(),
      },
    })
  } catch (error) {
    console.error("Goal progress update error:", error)
    return NextResponse.json({ success: false, error: "Failed to update goal progress" }, { status: 500 })
  }
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const user = await getUserFromToken(request)
    if (!user) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
    }

    const goalId = params.id

    // Verify the goal exists and belongs to the user's organization
    const goal = await prisma.goal.findFirst({
      where: {
        id: goalId,
        organizationId: user.organizationId,
        isArchived: false,
      },
    })

    if (!goal) {
      return NextResponse.json({ success: false, error: "Goal not found" }, { status: 404 })
    }

    // Fetch progress history
    const progressHistory = await prisma.goalProgress.findMany({
      where: {
        goalId,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    // Transform to match the expected GoalProgress type
    const transformedHistory: GoalProgress[] = progressHistory.map(record => ({
      id: record.id,
      goalId: record.goalId,
      previousValue: record.previousValue,
      newValue: record.newValue,
      confidence: record.confidence,
      comment: record.comment || undefined,
      evidenceUrl: record.evidenceUrl || undefined,
      userId: record.userId,
      createdAt: record.createdAt.toISOString(),
    }))

    return NextResponse.json({
      success: true,
      history: transformedHistory,
    })
  } catch (error) {
    console.error("Goal progress fetch error:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch goal progress" }, { status: 500 })
  }
}
