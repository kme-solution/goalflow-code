import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { getUserFromToken } from "@/lib/auth.server"
import type { EmployeeListResponse, Employee } from "@/lib/types/employee.types"

export async function GET(request: NextRequest) {
  try {
    const user = await getUserFromToken(request)
    if (!user) {
      return NextResponse.json<EmployeeListResponse>(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      )
    }

    const searchParams = request.nextUrl.searchParams
    const departmentId = searchParams.get("departmentId")
    const managerId = searchParams.get("managerId")
    const status = searchParams.get("status") as "active" | "inactive" | "on_leave" | "terminated" | null

    // Build where clause
    const where: any = {
      organizationId: user.organizationId,
    }

    if (departmentId) {
      where.departmentId = departmentId
    }

    if (managerId) {
      where.managerId = managerId
    }

    if (status) {
      // Map status to isActive field
      where.isActive = status === "active"
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
      title: "Employee", // Default title, could be enhanced with additional field
      department: dbUser.department?.name || "Unassigned",
      departmentId: dbUser.departmentId || "",
      managerId: dbUser.managerId || undefined,
      managerName: dbUser.manager?.name || undefined,
      role: dbUser.role,
      status: dbUser.isActive ? "active" : "inactive",
      startDate: dbUser.createdAt.toISOString().split('T')[0], // Use createdAt as start date
      avatar: dbUser.avatar || undefined,
      location: "Remote", // Default location, could be enhanced
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
    console.error("Employees API error:", error)
    return NextResponse.json<EmployeeListResponse>(
      {
        success: false,
        error: "Failed to fetch employees",
      },
      { status: 500 },
    )
  }
}
