export interface Department {
  id: string
  name: string
  description?: string
  headId?: string
  headName?: string
  parentDepartmentId?: string
  employeeCount: number
  createdAt: string
}

export interface OrgNode {
  id: string
  name: string
  title: string
  avatar?: string
  department: string
  managerId?: string
  children?: OrgNode[]
}

export interface Location {
  id: string
  name: string
  address: string
  city: string
  country: string
  employeeCount: number
}

export interface OrganizationSettings {
  companyName: string
  industry: string
  size: string
  fiscalYearStart: string
  reviewCycles: string[]
  performanceRatingScale: number
}

export interface DepartmentListResponse {
  success: boolean
  departments?: Department[]
  error?: string
}

export interface OrgChartResponse {
  success: boolean
  orgChart?: OrgNode
  error?: string
}
