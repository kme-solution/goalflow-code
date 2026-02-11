import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { getUserFromToken } from "@/lib/auth.server"
import type { EmployeeListResponse, Employee } from "@/lib/types/employee.types"

interface RouteParams {
  params: { projectId: string }
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const user = await getUserFromToken(request)
    if (!user) {
      return NextResponse.json<EmployeeListResponse>(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      )
    }

    const projectId = params.projectId

    // Since there's no direct project-team relationship in the database,
    // we'll return users that could be conceptually associated with this project
    // For now, return all active users in the organization
    // In a real implementation, this would filter by project team membership

    const { searchParams } = new URL(request.url)
    const departmentId = searchParams.get("departmentId")
    const role = searchParams.get("role")

    // Build where clause
    const where: any = {
      organizationId: user.organizationId,
      isActive: true,
    }

    if (departmentId) {
      where.departmentId = departmentId
    }

    if (role) {
      where.role = role
    }

    const users = await prisma.user.findMany({
      where,
      include: {
        department: {
          select: {
            id: true,
            name: true,
          },
        },
        manager: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: {
        name: "asc",
      },
    })

    // Transform database users to match the expected Employee type
    const employees: Employee[] = users.map((dbUser) => ({
      id: dbUser.id,
      email: dbUser.email,
      name: dbUser.name,
      title: "Team Member", // Default title, could be enhanced
      department: dbUser.department?.name || "Unassigned",
      departmentId: dbUser.departmentId || "",
      managerId: dbUser.managerId || undefined,
      managerName: dbUser.manager?.name || undefined,
      role: dbUser.role,
      status: dbUser.isActive ? "active" : "inactive",
      startDate: dbUser.createdAt.toISOString().split('T')[0], // Use createdAt as start date
      avatar: dbUser.avatar || undefined,
      location: "Remote", // Default location
      skills: [], // Not implemented in schema yet
      performanceScore: undefined, // Not implemented in schema yet
      goalCompletionRate: undefined, // Not implemented in schema yet
      lastReviewDate: undefined, // Not implemented in schema yet
      nextReviewDate: undefined, // Not implemented in schema yet
    }))

    return NextResponse.json<EmployeeListResponse>({
      success: true,
      employees,
      total: employees.length,
    })
  } catch (error) {
    console.error("Project team API error:", error)
    return NextResponse.json<EmployeeListResponse>(
      {
        success: false,
        error: "Failed to fetch project team",
      },
      { status: 500 },
    )
  }
}