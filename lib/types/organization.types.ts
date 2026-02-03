// Industry classifications
export type IndustryType = 
  | "technology"
  | "finance"
  | "healthcare"
  | "manufacturing"
  | "retail"
  | "education"
  | "consulting"
  | "media"
  | "real_estate"
  | "nonprofit"
  | "other"

// Company size classifications
export type CompanySizeType = 
  | "startup"      // 1-10
  | "small"        // 11-50
  | "medium"       // 51-200
  | "large"        // 201-1000
  | "enterprise"   // 1000+

// Organization structure types
export type OrgStructureType = 
  | "hierarchical"
  | "flat"
  | "matrix"
  | "divisional"
  | "functional"

// Goal alignment level
export type GoalAlignmentLevel = "company" | "department" | "team" | "individual"

// Organization entity
export interface Organization {
  id: string
  name: string
  legalName?: string
  industry: IndustryType
  size: CompanySizeType
  employeeCount: number
  structureType: OrgStructureType
  description?: string
  mission?: string
  vision?: string
  website?: string
  logo?: string
  foundedDate?: string
  fiscalYearStart: string // Month (1-12)
  timezone: string
  defaultCurrency: string
  settings: OrganizationSettings
  createdAt: string
  updatedAt: string
}

// Department with enhanced hierarchy support
export interface Department {
  id: string
  organizationId: string
  name: string
  code?: string // Short code like "ENG", "HR", "FIN"
  description?: string
  headId?: string
  headName?: string
  headTitle?: string
  parentDepartmentId?: string
  childDepartmentIds?: string[]
  teamIds?: string[]
  employeeCount: number
  budget?: number
  costCenter?: string
  goals?: string[] // IDs of department-level goals
  level: number // Hierarchy depth (0 = root)
  order: number // Display order within parent
  color?: string // Department brand color
  createdAt: string
  updatedAt: string
}

// Team within a department
export interface Team {
  id: string
  organizationId: string
  departmentId: string
  name: string
  description?: string
  leadId?: string
  leadName?: string
  memberIds: string[]
  memberCount: number
  parentTeamId?: string // For sub-teams
  childTeamIds?: string[]
  goals?: string[] // IDs of team-level goals
  type: "functional" | "project" | "cross_functional" | "virtual"
  status: "active" | "inactive" | "archived"
  createdAt: string
  updatedAt: string
}

// Reporting relationship
export interface ReportingRelationship {
  id: string
  organizationId: string
  reporterId: string // Employee who reports
  reporterName: string
  managerId: string // Direct manager
  managerName: string
  relationshipType: "direct" | "dotted" | "functional" | "project"
  startDate: string
  endDate?: string
  isPrimary: boolean // Primary reporting line
  notes?: string
}

// Org chart node with enhanced data
export interface OrgNode {
  id: string
  name: string
  title: string
  email?: string
  avatar?: string
  department: string
  departmentId: string
  teamId?: string
  teamName?: string
  managerId?: string
  level: number // Hierarchy depth
  directReports: number
  totalReports: number // Including indirect
  goals?: {
    total: number
    completed: number
    atRisk: number
  }
  children?: OrgNode[]
}

// Position in organization
export interface Position {
  id: string
  organizationId: string
  title: string
  departmentId: string
  teamId?: string
  level: "executive" | "senior" | "mid" | "junior" | "entry"
  reportsToPositionId?: string
  description?: string
  requirements?: string[]
  headcount: number // Number of people in this position
  isVacant: boolean
  createdAt: string
}

// Location (office)
export interface Location {
  id: string
  organizationId: string
  name: string
  type: "headquarters" | "branch" | "satellite" | "remote"
  address: string
  city: string
  state?: string
  country: string
  postalCode?: string
  timezone: string
  employeeCount: number
  isPrimary: boolean
  coordinates?: {
    lat: number
    lng: number
  }
}

// Organization settings with goal alignment configuration
export interface OrganizationSettings {
  // Basic settings
  companyName: string
  industry: IndustryType
  size: CompanySizeType
  fiscalYearStart: string
  timezone: string
  
  // Performance settings
  reviewCycles: ReviewCycleConfig[]
  performanceRatingScale: number // 5 or 10
  
  // Goal alignment settings
  goalAlignment: {
    enabled: boolean
    cascadeType: "top_down" | "bottom_up" | "bidirectional"
    alignmentRequired: boolean // Must goals align to parent?
    maxGoalLevels: number
    weightingEnabled: boolean
    autoProgressRollup: boolean
  }
  
  // Hierarchy settings
  hierarchy: {
    maxDepth: number
    allowMatrixReporting: boolean
    requireDepartmentForEmployees: boolean
    requireTeamForEmployees: boolean
  }
  
  // Notification settings
  notifications: {
    goalUpdates: boolean
    reviewReminders: boolean
    recognitionAlerts: boolean
  }
}

// Review cycle configuration
export interface ReviewCycleConfig {
  id: string
  name: string
  frequency: "monthly" | "quarterly" | "biannual" | "annual"
  startMonth: number
  durationDays: number
  includesPeerReview: boolean
  includesSelfAssessment: boolean
  isActive: boolean
}

// Goal alignment relationship
export interface GoalAlignment {
  id: string
  organizationId: string
  childGoalId: string
  parentGoalId: string
  alignmentType: "cascades_from" | "contributes_to" | "supports"
  weight: number // 0-100, how much this goal contributes
  createdAt: string
}

// API Response types
export interface OrganizationResponse {
  success: boolean
  organization?: Organization
  error?: string
}

export interface DepartmentListResponse {
  success: boolean
  departments?: Department[]
  error?: string
}

export interface TeamListResponse {
  success: boolean
  teams?: Team[]
  error?: string
}

export interface OrgChartResponse {
  success: boolean
  orgChart?: OrgNode
  error?: string
}

export interface ReportingRelationshipResponse {
  success: boolean
  relationships?: ReportingRelationship[]
  error?: string
}

// Form types for creating/editing
export interface CreateOrganizationForm {
  name: string
  legalName?: string
  industry: IndustryType
  size: CompanySizeType
  structureType: OrgStructureType
  description?: string
  mission?: string
  vision?: string
  website?: string
  fiscalYearStart: string
  timezone: string
}

export interface CreateDepartmentForm {
  name: string
  code?: string
  description?: string
  headId?: string
  parentDepartmentId?: string
  color?: string
}

export interface CreateTeamForm {
  name: string
  departmentId: string
  description?: string
  leadId?: string
  type: Team["type"]
  memberIds?: string[]
}

export interface CreateReportingRelationshipForm {
  reporterId: string
  managerId: string
  relationshipType: ReportingRelationship["relationshipType"]
  isPrimary: boolean
  notes?: string
}
