import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { getUserFromToken } from "@/lib/auth.server"
import type { Goal, UpdateGoalRequest } from "@/lib/types/goal.types"

interface RouteParams {
    params: { id: string }
}

// GET /api/goals/[id] - Get a specific goal
export async function GET(request: NextRequest, { params }: RouteParams) {
    try {
        const user = await getUserFromToken(request)
        if (!user) {
            return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
        }

        const goal = await prisma.goal.findFirst({
            where: {
                id: params.id,
                organizationId: user.organizationId,
                isArchived: false,
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

        if (!goal) {
            return NextResponse.json({ success: false, error: "Goal not found" }, { status: 404 })
        }

        // Transform to match Goal type
        const hasValidTarget = typeof goal.targetValue === "number" && goal.targetValue > 0
        const rawProgress = hasValidTarget ? (goal.currentValue / goal.targetValue) * 100 : 0
        const progress = Number.isFinite(rawProgress) ? Math.round(rawProgress) : 0

        const transformedGoal: Goal = {
            id: goal.id,
            organizationId: goal.organizationId,
            title: goal.title,
            description: goal.description || undefined,
            type: goal.type,
            level: goal.level || "personal" as const, // Use actual level from database
            targetValue: goal.targetValue || undefined,
            currentValue: goal.currentValue,
            unit: goal.unit || undefined,
            confidence: goal.confidence,
            confidenceLevel: goal.confidence >= 7 ? "green" : goal.confidence >= 4 ? "yellow" : "red",
            startDate: goal.startDate?.toISOString() || "",
            // Safely handle missing end dates
            endDate: goal.endDate ? goal.endDate.toISOString() : goal.startDate?.toISOString() || "",
            status: goal.status,
            ownerId: goal.ownerId,
            ownerName: goal.owner.name,
            contributors: [], // Not implemented yet
            parentGoalId: goal.parentGoalId || undefined,
            childGoalIds: goal.childGoals.map(child => child.id),
            relatedGoalIds: [], // Not implemented yet
            dependencies: [], // Not implemented yet
            progress,
            riskLevel: "low_risk" as const, // Default
            createdAt: goal.createdAt.toISOString(),
            updatedAt: goal.updatedAt.toISOString(),
        }

        return NextResponse.json({ success: true, goal: transformedGoal })
    } catch (error) {
        console.error("Get goal error:", error)
        return NextResponse.json({ success: false, error: "Failed to fetch goal" }, { status: 500 })
    }
}

// PUT /api/goals/[id] - Update a goal
export async function PUT(request: NextRequest, { params }: RouteParams) {
    try {
        const user = await getUserFromToken(request)
        if (!user) {
            return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
        }

        const updateData: UpdateGoalRequest = await request.json()
        const goalId = params.id

        // Find the goal and ensure it belongs to the user's organization
        const existingGoal = await prisma.goal.findFirst({
            where: {
                id: goalId,
                organizationId: user.organizationId,
                isArchived: false,
            },
        })

        if (!existingGoal) {
            return NextResponse.json({ success: false, error: "Goal not found" }, { status: 404 })
        }

        // Check permissions - users can only update their own goals or goals assigned to them
        if (existingGoal.ownerId !== user.id) {
            return NextResponse.json({ success: false, error: "Unauthorized to update this goal" }, { status: 403 })
        }

        // Prepare update data
        const updatePayload: any = {}

        if (updateData.title !== undefined) updatePayload.title = updateData.title
        if (updateData.description !== undefined) updatePayload.description = updateData.description
        if (updateData.type !== undefined) updatePayload.type = updateData.type
        if (updateData.targetValue !== undefined) updatePayload.targetValue = updateData.targetValue
        if (updateData.unit !== undefined) updatePayload.unit = updateData.unit
        if (updateData.startDate !== undefined) updatePayload.startDate = new Date(updateData.startDate)
        if (updateData.endDate !== undefined) updatePayload.endDate = new Date(updateData.endDate)
        if (updateData.ownerId !== undefined) updatePayload.ownerId = updateData.ownerId
        if (updateData.confidence !== undefined) updatePayload.confidence = updateData.confidence
        if (updateData.status !== undefined) updatePayload.status = updateData.status
        if (updateData.parentGoalId !== undefined) updatePayload.parentGoalId = updateData.parentGoalId

        // Update the goal
        const updatedGoal = await prisma.goal.update({
            where: { id: goalId },
            data: updatePayload,
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
        const hasValidTarget = typeof updatedGoal.targetValue === "number" && updatedGoal.targetValue > 0
        const rawProgress = hasValidTarget ? (updatedGoal.currentValue / updatedGoal.targetValue) * 100 : 0
        const progress = Number.isFinite(rawProgress) ? Math.round(rawProgress) : 0

        const transformedGoal: Goal = {
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
            // Safely handle missing end dates
            endDate: updatedGoal.endDate ? updatedGoal.endDate.toISOString() : updatedGoal.startDate?.toISOString() || "",
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
        }

        return NextResponse.json({ success: true, goal: transformedGoal })
    } catch (error) {
        console.error("Update goal error:", error)
        return NextResponse.json({ success: false, error: "Failed to update goal" }, { status: 500 })
    }
}

// DELETE /api/goals/[id] - Delete/archive a goal
export async function DELETE(request: NextRequest, { params }: RouteParams) {
    try {
        const user = await getUserFromToken(request)
        if (!user) {
            return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
        }

        const goalId = params.id

        // Find the goal and ensure it belongs to the user's organization
        const existingGoal = await prisma.goal.findFirst({
            where: {
                id: goalId,
                organizationId: user.organizationId,
                isArchived: false,
            },
        })

        if (!existingGoal) {
            return NextResponse.json({ success: false, error: "Goal not found" }, { status: 404 })
        }

        // Check permissions - users can only delete their own goals
        if (existingGoal.ownerId !== user.id) {
            return NextResponse.json({ success: false, error: "Unauthorized to delete this goal" }, { status: 403 })
        }

        // Soft delete by archiving
        await prisma.goal.update({
            where: { id: goalId },
            data: { isArchived: true },
        })

        return NextResponse.json({ success: true, message: "Goal archived successfully" })
    } catch (error) {
        console.error("Delete goal error:", error)
        return NextResponse.json({ success: false, error: "Failed to delete goal" }, { status: 500 })
    }
}
