export type EmployeeStatus = "active" | "inactive" | "on_leave" | "terminated"

export interface Employee {
  id: string
  email: string
  name: string
  title: string
  department: string
  departmentId: string
  managerId?: string
  managerName?: string
  role: string
  status: EmployeeStatus
  startDate: string
  avatar?: string
  location: string
  skills?: string[]
  performanceScore?: number
  goalCompletionRate?: number
  lastReviewDate?: string
  nextReviewDate?: string
}

export interface EmployeeListResponse {
  success: boolean
  employees?: Employee[]
  total?: number
  error?: string
}

export interface EmployeeDetailResponse {
  success: boolean
  employee?: Employee
  error?: string
}
