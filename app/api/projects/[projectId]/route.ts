import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { getUserFromToken } from "@/lib/auth"

interface RouteParams {
  params: { projectId: string }
}

interface ProjectData {
  id: string
  name: string
  description?: string
  status: "active" | "completed" | "on_hold" | "cancelled"
  ownerId: string
  ownerName: string
  teamMembers: number
  goalsCount: number
  completedGoals: number
  progress: number
  startDate?: string
  endDate?: string
  createdAt: string
  updatedAt: string
}

interface ProjectResponse {
  success: boolean
  project?: ProjectData
  error?: string
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const user = await getUserFromToken(request)
    if (!user) {
      return NextResponse.json<ProjectResponse>(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      )
    }

    const projectId = params.projectId

    // Since there's no Project model, we'll treat this as a conceptual project
    // For now, return a mock project structure
    // In a real implementation, this would query a Project model

    const projectData: ProjectData = {
      id: projectId,
      name: `Project ${projectId}`,
      description: `Project ${projectId} description`,
      status: "active",
      ownerId: user.id,
      ownerName: user.name || "Unknown",
      teamMembers: 0,
      goalsCount: 0,
      completedGoals: 0,
      progress: 0,
      startDate: new Date().toISOString(),
      endDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(), // 90 days from now
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    return NextResponse.json<ProjectResponse>({
      success: true,
      project: projectData,
    })
  } catch (error) {
    console.error("Project API error:", error)
    return NextResponse.json<ProjectResponse>(
      {
        success: false,
        error: "Failed to fetch project",
      },
      { status: 500 },
    )
  }
}