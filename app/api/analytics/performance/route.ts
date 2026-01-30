import { NextResponse } from "next/server"
import type { AnalyticsResponse } from "@/lib/types/analytics.types"

export async function GET() {
  try {
    const mockAnalytics = {
      metrics: {
        overallScore: 4.3,
        trend: "up" as const,
        goalCompletionRate: 78,
        averageRating: 4.2,
        engagementScore: 82,
        atRiskCount: 5,
      },
      departmentPerformance: [
        {
          id: "dept-eng",
          name: "Engineering",
          headCount: 45,
          avgPerformanceScore: 4.5,
          goalCompletionRate: 85,
          atRiskCount: 2,
          trend: "up" as const,
        },
        {
          id: "dept-sales",
          name: "Sales",
          headCount: 30,
          avgPerformanceScore: 4.1,
          goalCompletionRate: 72,
          atRiskCount: 3,
          trend: "stable" as const,
        },
        {
          id: "dept-marketing",
          name: "Marketing",
          headCount: 20,
          avgPerformanceScore: 4.3,
          goalCompletionRate: 80,
          atRiskCount: 0,
          trend: "up" as const,
        },
      ],
      engagement: {
        eNPS: 45,
        engagementRate: 82,
        responseRate: 89,
        byDepartment: [
          { departmentId: "dept-eng", departmentName: "Engineering", score: 85, change: 3 },
          { departmentId: "dept-sales", departmentName: "Sales", score: 78, change: -2 },
          { departmentId: "dept-marketing", departmentName: "Marketing", score: 83, change: 5 },
        ],
        trends: [
          { date: "2025-01", score: 78 },
          { date: "2025-02", score: 80 },
          { date: "2025-03", score: 82 },
        ],
      },
    }

    return NextResponse.json<AnalyticsResponse>({
      success: true,
      ...mockAnalytics,
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
