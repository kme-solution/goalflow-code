"use client"

import { useMemo } from "react"

// User roles from the existing system
export type UserRole = "hr_admin" | "manager" | "employee" | "ceo" | "team_lead" | "system_admin"

export interface CurrentUser {
  id: string
  name: string
  role: UserRole
  teamId?: string
  managerId?: string
}

export interface GoalPermissions {
  // Creation permissions
  canCreateCompanyGoals: boolean
  canCreateTeamGoals: boolean
  canCreatePersonalGoals: boolean
  canAssignGoalsToOthers: boolean
  
  // Update permissions  
  canUpdateGoal: (goalOwnerId: string, goalManagerId?: string) => boolean
  canDeleteGoal: (goalOwnerId: string) => boolean
  canArchiveGoal: (goalOwnerId: string) => boolean
  
  // View permissions
  canViewAllTeamGoals: boolean
  canViewAllCompanyGoals: boolean
  
  // Role info
  isExecutive: boolean
  isManager: boolean
  isTeamLead: boolean
}

/**
 * Hook to determine goal permissions based on user role
 * 
 * Permission Matrix:
 * - Company Goals: CEO, System Admin only can create
 * - Team Goals: Managers, Team Leads can create
 * - Personal Goals: Everyone can create their own
 * - Updates: Goal owner OR their direct manager can update progress/status
 */
export function useGoalPermissions(currentUser: CurrentUser | null): GoalPermissions {
  return useMemo(() => {
    if (!currentUser) {
      return {
        canCreateCompanyGoals: false,
        canCreateTeamGoals: false,
        canCreatePersonalGoals: false,
        canAssignGoalsToOthers: false,
        canUpdateGoal: () => false,
        canDeleteGoal: () => false,
        canArchiveGoal: () => false,
        canViewAllTeamGoals: false,
        canViewAllCompanyGoals: false,
        isExecutive: false,
        isManager: false,
        isTeamLead: false,
      }
    }

    const { role, id: userId } = currentUser

    // Role classifications
    const isExecutive = role === "ceo" || role === "system_admin"
    const isManager = role === "manager" || role === "hr_admin"
    const isTeamLead = role === "team_lead"
    const canManageOthers = isExecutive || isManager || isTeamLead

    // Creation permissions
    const canCreateCompanyGoals = isExecutive // Only CEO/System Admin
    const canCreateTeamGoals = isExecutive || isManager || isTeamLead
    const canCreatePersonalGoals = true // Everyone can create their own goals
    const canAssignGoalsToOthers = canManageOthers

    // Update permissions - owner OR their direct manager
    const canUpdateGoal = (goalOwnerId: string, goalManagerId?: string) => {
      // Owner can always update their own goal
      if (goalOwnerId === userId) return true
      
      // Manager/team lead can update their direct reports' goals
      if (canManageOthers && goalManagerId === userId) return true
      
      // Executives can update any goal
      if (isExecutive) return true
      
      return false
    }

    // Delete permissions - more restricted
    const canDeleteGoal = (goalOwnerId: string) => {
      if (goalOwnerId === userId) return true
      if (isExecutive) return true
      return false
    }

    // Archive permissions - same as update
    const canArchiveGoal = (goalOwnerId: string) => {
      if (goalOwnerId === userId) return true
      if (canManageOthers) return true
      return false
    }

    // View permissions
    const canViewAllTeamGoals = canManageOthers
    const canViewAllCompanyGoals = true // Everyone can view company goals for alignment

    return {
      canCreateCompanyGoals,
      canCreateTeamGoals,
      canCreatePersonalGoals,
      canAssignGoalsToOthers,
      canUpdateGoal,
      canDeleteGoal,
      canArchiveGoal,
      canViewAllTeamGoals,
      canViewAllCompanyGoals,
      isExecutive,
      isManager,
      isTeamLead,
    }
  }, [currentUser])
}

/**
 * Get role display info
 */
export function getRoleDisplayInfo(role: UserRole): { label: string; description: string } {
  const roleInfo: Record<UserRole, { label: string; description: string }> = {
    ceo: { label: "CEO", description: "Full access to all goals" },
    system_admin: { label: "System Admin", description: "Full access to all goals" },
    hr_admin: { label: "HR Admin", description: "Can create and manage team goals" },
    manager: { label: "Manager", description: "Can create and manage team goals" },
    team_lead: { label: "Team Lead", description: "Can create and manage team goals" },
    employee: { label: "Employee", description: "Can create and manage personal goals" },
  }
  return roleInfo[role]
}
