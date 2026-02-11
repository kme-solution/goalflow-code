import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { getUserFromToken } from "@/lib/auth.server"

interface DashboardStats {
    totalGoals: number
    completedGoals: number
    activeGoals: number
    overdueGoals: number
    upcomingReviews: number
    pendingRecognitions: number
    unreadNotifications: number
    teamMembers: number
}

interface DashboardResponse {
    success: boolean
    stats?: DashboardStats
    recentActivity?: any[]
    error?: string
}

export async function GET(request: NextRequest) {
    try {
        const user = await getUserFromToken(request)
        if (!user) {
            return NextResponse.json<DashboardResponse>(
                { success: false, error: "Unauthorized" },
                { status: 401 }
            )
        }

        // Get user's goals
        const userGoals = await prisma.goal.findMany({
            where: {
                ownerId: user.id,
                isArchived: false,
            },
        })

        const totalGoals = userGoals.length
        const completedGoals = userGoals.filter(goal => goal.status === "completed").length
        const activeGoals = userGoals.filter(goal => goal.status === "active").length
        const overdueGoals = userGoals.filter(goal => {
            return goal.status !== "completed" && goal.endDate < new Date()
        }).length

        // Get upcoming reviews (reviews where user is employee or manager)
        const upcomingReviews = await prisma.review.count({
            where: {
                OR: [
                    { employeeId: user.id },
                    { managerId: user.id },
                ],
                status: { in: ["scheduled", "in_progress"] },
                isArchived: false,
            },
        })

        // Get pending recognitions (received but not read)
        const pendingRecognitions = await prisma.recognition.count({
            where: {
                toUserId: user.id,
                isPublic: true,
            },
        })

        // Get unread notifications
        const unreadNotifications = await prisma.notification.count({
            where: {
                userId: user.id,
                isRead: false,
            },
        })

        // Get team members (if user is a manager)
        const teamMembers = await prisma.user.count({
            where: {
                managerId: user.id,
                organizationId: user.organizationId,
                isActive: true,
            },
        })

        const stats: DashboardStats = {
            totalGoals,
            completedGoals,
            activeGoals,
            overdueGoals,
            upcomingReviews,
            pendingRecognitions,
            unreadNotifications,
            teamMembers,
        }

        // Get recent activity (last 5 goals updated)
        const recentGoals = await prisma.goal.findMany({
            where: {
                ownerId: user.id,
                isArchived: false,
            },
            orderBy: {
                updatedAt: "desc",
            },
            take: 5,
            select: {
                id: true,
                title: true,
                status: true,
                updatedAt: true,
            },
        })

        const recentActivity = recentGoals.map(goal => ({
            id: goal.id,
            type: "goal_update",
            title: `Updated goal: ${goal.title}`,
            status: goal.status,
            timestamp: goal.updatedAt.toISOString(),
        }))

        return NextResponse.json<DashboardResponse>({
            success: true,
            stats,
            recentActivity,
        })
    } catch (error) {
        console.error("Dashboard API error:", error)
        return NextResponse.json<DashboardResponse>(
            {
                success: false,
                error: "Failed to fetch dashboard data",
            },
            { status: 500 },
        )
    }
}