import { type NextRequest, NextResponse } from "next/server"
import { MOCK_EMPLOYEES } from "@/lib/mock-data/employees"
import type { EmployeeListResponse } from "@/lib/types/employee.types"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const departmentId = searchParams.get("departmentId")
    const managerId = searchParams.get("managerId")
    const status = searchParams.get("status")

    let filteredEmployees = [...MOCK_EMPLOYEES]

    if (departmentId) {
      filteredEmployees = filteredEmployees.filter((emp) => emp.departmentId === departmentId)
    }

    if (managerId) {
      filteredEmployees = filteredEmployees.filter((emp) => emp.managerId === managerId)
    }

    if (status) {
      filteredEmployees = filteredEmployees.filter((emp) => emp.status === status)
    }

    return NextResponse.json<EmployeeListResponse>({
      success: true,
      employees: filteredEmployees,
      total: filteredEmployees.length,
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
