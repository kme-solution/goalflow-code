import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { getUserFromToken } from "@/lib/auth.server"
import type { AnalyticsResponse, PerformanceMetrics, DepartmentPerformance, EngagementData } from "@/lib/types/analytics.types"

export async function GET(request: NextRequest) {
  try {
    const user = await getUserFromToken(request)
    console.log("Authenticated user in analytics route:", user)
    if (!user) {
      return NextResponse.json<AnalyticsResponse>(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      )
    }

    // Get all goals for the organization
    const goals = await prisma.goal.findMany({
      where: {
        organizationId: user.organizationId,
        isArchived: false,
      },
      include: {
        owner: {
          include: {
            department: true,
          },
        },
      },
    })

    // Calculate goal completion rate
    const completedGoals = goals.filter(goal => goal.status === "completed").length
    const goalCompletionRate = goals.length > 0 ? Math.round((completedGoals / goals.length) * 100) : 0

    // Get all users for the organization
    const users = await prisma.user.findMany({
      where: {
        organizationId: user.organizationId,
        isActive: true,
      },
      include: {
        department: true,
      },
    })

    // Get departments
    const departments = await prisma.department.findMany({
      where: {
        organizationId: user.organizationId,
      },
      include: {
        _count: {
          select: {
            members: true,
          },
        },
      },
    })

    // Calculate department performance
    const departmentPerformance: DepartmentPerformance[] = departments.map(dept => {
      const deptUsers = users.filter(user => user.departmentId === dept.id)
      const deptGoals = goals.filter(goal =>
        deptUsers.some(user => user.id === goal.ownerId)
      )

      const deptCompletedGoals = deptGoals.filter(goal => goal.status === "completed").length
      const deptGoalCompletionRate = deptGoals.length > 0 ? Math.round((deptCompletedGoals / deptGoals.length) * 100) : 0

      // Calculate average performance score (mock for now, could be based on reviews)
      const avgPerformanceScore = 4.0 + Math.random() * 0.8 // Random between 4.0-4.8

      // Count at-risk goals
      const atRiskCount = deptGoals.filter(goal => goal.status === "at_risk").length

      return {
        id: dept.id,
        name: dept.name,
        headCount: dept._count.members,
        avgPerformanceScore: Math.round(avgPerformanceScore * 10) / 10,
        goalCompletionRate: deptGoalCompletionRate,
        atRiskCount,
        trend: "stable" as const, // Could be calculated based on historical data
      }
    })

    // Calculate overall metrics
    const overallScore = departmentPerformance.length > 0
      ? departmentPerformance.reduce((sum, dept) => sum + dept.avgPerformanceScore, 0) / departmentPerformance.length
      : 4.3

    const atRiskCount = goals.filter(goal => goal.status === "at_risk").length

    const metrics: PerformanceMetrics = {
      overallScore: Math.round(overallScore * 10) / 10,
      trend: "up" as const, // Could be calculated based on historical data
      goalCompletionRate,
      averageRating: overallScore,
      engagementScore: 75 + Math.floor(Math.random() * 15), // Mock engagement score
      atRiskCount,
    }

    // Mock engagement data (would need more schema/tables for real data)
    const engagement: EngagementData = {
      eNPS: 35 + Math.floor(Math.random() * 30), // Random between 35-65
      engagementRate: 75 + Math.floor(Math.random() * 15), // Random between 75-90
      responseRate: 85 + Math.floor(Math.random() * 10), // Random between 85-95
      byDepartment: departmentPerformance.map(dept => ({
        departmentId: dept.id,
        departmentName: dept.name,
        score: 70 + Math.floor(Math.random() * 20), // Random between 70-90
        change: Math.floor(Math.random() * 10) - 5, // Random between -5 and 5
      })),
      trends: [
        { date: "2025-01", score: 75 },
        { date: "2025-02", score: 78 },
        { date: "2025-03", score: 82 },
      ],
    }

    return NextResponse.json<AnalyticsResponse>({
      success: true,
      metrics,
      departmentPerformance,
      engagement,
    })
  } catch (error) {
    console.error("Analytics API error:", error)
    return NextResponse.json<AnalyticsResponse>(
      {
        success: false,
        error: "Failed to fetch analytics",
      },
      { status: 500 },
    )
  }
}
