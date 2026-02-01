"use client"

import { useMemo } from "react"

/**
 * User roles based on the Goal Creation Policy & Workflow Specification
 * 
 * Executive Leadership: CEO, CTO, COO, CFO - can create company-level goals
 * Department Head/VP: Can create department-level goals
 * Manager/Team Lead: Can create team-level goals
 * Employee: Can create individual goals (requires manager approval)
 */
export type UserRole = 
  | "ceo" 
  | "cto" 
  | "coo" 
  | "cfo"
  | "vp"
  | "department_head"
  | "hr_admin" 
  | "manager" 
  | "team_lead" 
  | "employee" 
  | "system_admin"

export type GoalLevel = "company" | "department" | "team" | "individual"

export type ApprovalStatus = "pending" | "approved" | "rejected" | "changes_requested"

export interface CurrentUser {
  id: string
  name: string
  role: UserRole
  teamId?: string
  departmentId?: string
  managerId?: string
}

export interface GoalPermissions {
  // Creation permissions by level
  canCreateCompanyGoals: boolean
  canCreateDepartmentGoals: boolean
  canCreateTeamGoals: boolean
  canCreatePersonalGoals: boolean
  canAssignGoalsToOthers: boolean
  
  // Update permissions  
  canUpdateGoal: (goalOwnerId: string, goalManagerId?: string) => boolean
  canEditGoalDetails: (goalOwnerId: string, goalManagerId?: string) => boolean
  canDeleteGoal: (goalOwnerId: string) => boolean
  canArchiveGoal: (goalOwnerId: string) => boolean
  
  // Approval permissions
  canApproveGoals: boolean
  canApproveLevel: (level: GoalLevel) => boolean
  
  // View permissions
  canViewAllTeamGoals: boolean
  canViewAllDepartmentGoals: boolean
  canViewAllCompanyGoals: boolean
  
  // Role classifications
  isExecutive: boolean
  isDepartmentHead: boolean
  isManager: boolean
  isTeamLead: boolean
  
  // Helper
  getCreatableLevels: () => GoalLevel[]
}

/**
 * Hook to determine goal permissions based on user role
 * 
 * Permission Matrix (per policy document):
 * 
 * Company Goals:
 *   - Creator: Executive Leadership (CEO, CTO, COO, CFO)
 *   - Approver: Board or Executive Committee
 * 
 * Department Goals:
 *   - Creator: Department Head / VP
 *   - Approver: Relevant Executive Sponsor
 * 
 * Team Goals:
 *   - Creator: Team Lead / Manager
 *   - Approver: Department Head
 * 
 * Individual Goals:
 *   - Creator: Employee (with manager guidance)
 *   - Approver: Direct Manager
 * 
 * Updates:
 *   - Goal Owner: Primary responsibility for updating progress
 *   - Manager: Can review and adjust
 */
export function useGoalPermissions(currentUser: CurrentUser | null): GoalPermissions {
  return useMemo(() => {
    if (!currentUser) {
      return {
        canCreateCompanyGoals: false,
        canCreateDepartmentGoals: false,
        canCreateTeamGoals: false,
        canCreatePersonalGoals: false,
        canAssignGoalsToOthers: false,
        canUpdateGoal: () => false,
        canEditGoalDetails: () => false,
        canDeleteGoal: () => false,
        canArchiveGoal: () => false,
        canApproveGoals: false,
        canApproveLevel: () => false,
        canViewAllTeamGoals: false,
        canViewAllDepartmentGoals: false,
        canViewAllCompanyGoals: false,
        isExecutive: false,
        isDepartmentHead: false,
        isManager: false,
        isTeamLead: false,
        getCreatableLevels: () => [],
      }
    }

    const { role, id: userId } = currentUser

    // Role classifications per policy
    const isExecutive = ["ceo", "cto", "coo", "cfo", "system_admin"].includes(role)
    const isDepartmentHead = ["vp", "department_head"].includes(role)
    const isManager = ["manager", "hr_admin"].includes(role)
    const isTeamLead = role === "team_lead"
    const canManageOthers = isExecutive || isDepartmentHead || isManager || isTeamLead

    // Creation permissions per policy Section 2
    const canCreateCompanyGoals = isExecutive // CEO, CTO, COO, CFO, System Admin
    const canCreateDepartmentGoals = isExecutive || isDepartmentHead // Dept Head / VP
    const canCreateTeamGoals = isExecutive || isDepartmentHead || isManager || isTeamLead
    const canCreatePersonalGoals = true // Everyone can create their own
    const canAssignGoalsToOthers = canManageOthers

    // Update permissions per policy Section 4.2
    // Goal Owner: Primary responsibility
    // Manager: Reviews updates, provides feedback, may adjust
    const canUpdateGoal = (goalOwnerId: string, goalManagerId?: string) => {
      // Owner can always update their own goal's progress
      if (goalOwnerId === userId) return true
      
      // Manager can review and adjust their direct reports' goals
      if (canManageOthers && goalManagerId === userId) return true
      
      // Executives can update any goal
      if (isExecutive) return true
      
      return false
    }

    // Edit goal details (title, description, targets) - more restricted
    // Per policy Section 5.2: requires manager approval for changes
    const canEditGoalDetails = (goalOwnerId: string, goalManagerId?: string) => {
      // Owner can edit their own goal details
      if (goalOwnerId === userId) return true
      
      // Manager can edit their direct reports' goals
      if ((isManager || isTeamLead) && goalManagerId === userId) return true
      
      // Executives and dept heads can edit any goal in their purview
      if (isExecutive || isDepartmentHead) return true
      
      return false
    }

    // Delete permissions - more restricted per policy
    const canDeleteGoal = (goalOwnerId: string) => {
      if (goalOwnerId === userId) return true
      if (isExecutive) return true
      return false
    }

    // Archive permissions per policy Section 5.2
    // Requires approval from the goal's original approver
    const canArchiveGoal = (goalOwnerId: string) => {
      if (goalOwnerId === userId) return true
      if (canManageOthers) return true
      return false
    }

    // Approval permissions per policy Section 2
    const canApproveGoals = canManageOthers
    
    const canApproveLevel = (level: GoalLevel): boolean => {
      switch (level) {
        case "company":
          return isExecutive // Board or Executive Committee
        case "department":
          return isExecutive // Executive Sponsor
        case "team":
          return isExecutive || isDepartmentHead // Department Head
        case "individual":
          return canManageOthers // Direct Manager
        default:
          return false
      }
    }

    // View permissions
    const canViewAllTeamGoals = canManageOthers
    const canViewAllDepartmentGoals = isExecutive || isDepartmentHead || isManager
    const canViewAllCompanyGoals = true // Everyone can view for alignment

    // Helper to get what levels user can create
    const getCreatableLevels = (): GoalLevel[] => {
      const levels: GoalLevel[] = []
      if (canCreateCompanyGoals) levels.push("company")
      if (canCreateDepartmentGoals) levels.push("department")
      if (canCreateTeamGoals) levels.push("team")
      if (canCreatePersonalGoals) levels.push("individual")
      return levels
    }

    return {
      canCreateCompanyGoals,
      canCreateDepartmentGoals,
      canCreateTeamGoals,
      canCreatePersonalGoals,
      canAssignGoalsToOthers,
      canUpdateGoal,
      canEditGoalDetails,
      canDeleteGoal,
      canArchiveGoal,
      canApproveGoals,
      canApproveLevel,
      canViewAllTeamGoals,
      canViewAllDepartmentGoals,
      canViewAllCompanyGoals,
      isExecutive,
      isDepartmentHead,
      isManager,
      isTeamLead,
      getCreatableLevels,
    }
  }, [currentUser])
}

/**
 * Get role display info
 */
export function getRoleDisplayInfo(role: UserRole): { label: string; description: string; level: string } {
  const roleInfo: Record<UserRole, { label: string; description: string; level: string }> = {
    ceo: { label: "CEO", description: "Creates and approves company-level goals", level: "Executive" },
    cto: { label: "CTO", description: "Creates company-level technology goals", level: "Executive" },
    coo: { label: "COO", description: "Creates company-level operational goals", level: "Executive" },
    cfo: { label: "CFO", description: "Creates company-level financial goals", level: "Executive" },
    system_admin: { label: "System Admin", description: "Full system access", level: "Admin" },
    vp: { label: "VP", description: "Creates department-level goals", level: "Department" },
    department_head: { label: "Department Head", description: "Creates department-level goals", level: "Department" },
    hr_admin: { label: "HR Admin", description: "Creates team-level goals", level: "Manager" },
    manager: { label: "Manager", description: "Creates and approves team goals", level: "Manager" },
    team_lead: { label: "Team Lead", description: "Creates team goals", level: "Team" },
    employee: { label: "Employee", description: "Creates personal goals", level: "Individual" },
  }
  return roleInfo[role]
}

/**
 * Get approval chain for a goal level
 */
export function getApprovalChain(level: GoalLevel): string {
  switch (level) {
    case "company":
      return "Board or Executive Committee"
    case "department":
      return "Executive Sponsor"
    case "team":
      return "Department Head"
    case "individual":
      return "Direct Manager"
    default:
      return "Unknown"
  }
}
