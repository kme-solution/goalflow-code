"use client"

import { useState, useMemo } from "react"
import { GoalStats } from "@/components/goals/GoalStats"
import { GoalFilters, type ViewMode, type StatusFilter, type PriorityFilter } from "@/components/goals/GoalFilters"
import { GoalCard, type GoalData, type GoalStatus } from "@/components/goals/GoalCard"
import { InlineGoalCreator, type NewGoalData } from "@/components/goals/InlineGoalCreator"
import { GoalAlignmentView, type AlignedGoal } from "@/components/goals/GoalAlignmentView"
import { GoalEmptyState } from "@/components/goals/GoalEmptyState"
import { GoalEditDialog } from "@/components/goals/GoalEditDialog"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Users, Shield, Info } from "lucide-react"
import { useGoalPermissions, getRoleDisplayInfo, type CurrentUser } from "@/lib/hooks/useGoalPermissions"
import { useGoals } from "@/lib/hooks/use-goals"
import { useAuth } from "@/components/auth-provider"
import type { ConfidenceLevel, GoalStatus as APIGoalStatus } from "@/lib/types/goal.types"

// Simulated current user - in production this comes from auth context
// Change role to test: "employee", "team_lead", "manager", "vp", "department_head", "ceo"
const currentUser: CurrentUser = {
  id: "manager-1",
  name: "Sarah Chen",
  role: "team_lead", // Team leads can create team goals
  teamId: "team-1",
  departmentId: "dept-1",
  managerId: "director-1",
}

// Sample team data
const teamInfo = {
  id: "team-1",
  name: "Engineering",
  memberCount: 12,
  lead: { id: "manager-1", name: "Sarah Chen" },
}

// Sample team members for assignment
const teamMembers = [
  { id: "user-1", name: "John Doe" },
  { id: "user-2", name: "Jane Smith" },
  { id: "user-3", name: "Mike Johnson" },
  { id: "user-4", name: "Emily Watson" },
  { id: "user-5", name: "Alex Rivera" },
]

// Sample team goals
const initialGoals: GoalData[] = [
  {
    id: "t1",
    title: "Reduce System Downtime by 50%",
    description: "Improve infrastructure reliability through better monitoring, automated recovery, and proactive maintenance. Target is to reduce unplanned downtime from 4 hours/month to 2 hours/month.",
    progress: 65,
    status: "on_track",
    priority: "critical",
    dueDate: "Mar 31, 2024",
    owner: "Sarah Chen",
    ownerId: "manager-1",
    parentGoal: "Operational Excellence",
    alignedGoals: 4,
  },
  {
    id: "t2",
    title: "Launch Mobile App v2.0",
    description: "Complete the redesign and feature additions for the mobile app including offline mode, push notifications, and improved performance.",
    progress: 78,
    status: "on_track",
    priority: "high",
    dueDate: "Feb 28, 2024",
    owner: "Mike Johnson",
    ownerId: "user-3",
    parentGoal: "Product Innovation",
    alignedGoals: 6,
  },
  {
    id: "t3",
    title: "Migrate to Kubernetes",
    description: "Complete the infrastructure migration from legacy servers to Kubernetes cluster for improved scalability and deployment efficiency.",
    progress: 40,
    status: "at_risk",
    priority: "high",
    dueDate: "Apr 15, 2024",
    owner: "Alex Rivera",
    ownerId: "user-5",
    parentGoal: "Technical Excellence",
    alignedGoals: 3,
  },
  {
    id: "t4",
    title: "Achieve 90% Code Coverage",
    description: "Improve test coverage across all critical services from current 72% to target 90%.",
    progress: 82,
    status: "on_track",
    priority: "medium",
    dueDate: "May 30, 2024",
    owner: "Emily Watson",
    ownerId: "user-4",
    alignedGoals: 2,
  },
  {
    id: "t5",
    title: "Complete Security Audit",
    description: "Successfully pass the annual security audit with no critical findings.",
    progress: 100,
    status: "completed",
    priority: "critical",
    dueDate: "Jan 15, 2024",
    owner: "David Kim",
    ownerId: "user-6",
    parentGoal: "Security & Compliance",
  },
]

// Sample parent goals (company goals) for alignment
const parentGoals = [
  { id: "c1", title: "Operational Excellence" },
  { id: "c2", title: "Product Innovation" },
  { id: "c3", title: "Technical Excellence" },
  { id: "c4", title: "Security & Compliance" },
  { id: "c5", title: "Customer Satisfaction" },
]

// Sample alignment data for team
const alignmentData: AlignedGoal[] = [
  {
    id: "company-1",
    title: "Achieve 99.9% System Uptime",
    description: "Company-wide reliability initiative",
    progress: 85,
    status: "on_track",
    priority: "critical",
    level: "company",
    children: [
      {
        id: "t1",
        title: "Reduce System Downtime by 50%",
        description: "Team contribution to reliability",
        progress: 65,
        status: "on_track",
        priority: "critical",
        level: "team",
        children: [
          {
            id: "p1",
            title: "Implement Auto-Recovery System",
            description: "Individual contributor goal",
            progress: 70,
            status: "on_track",
            priority: "high",
            level: "personal",
          },
          {
            id: "p2",
            title: "Set Up Advanced Monitoring",
            description: "Individual contributor goal",
            progress: 55,
            status: "on_track",
            priority: "high",
            level: "personal",
          },
        ],
      },
    ],
  },
]

export default function TeamGoalsPage() {
  const { user } = useAuth()
  const permissions = useGoalPermissions(currentUser)
  const roleInfo = getRoleDisplayInfo(currentUser.role)
  
  // Fetch team goals from API
  const { goals: apiGoals, isLoading, isError, createGoal, updateGoal, deleteGoal } = useGoals(undefined, undefined, undefined, "team", currentUser.teamId)
  
  // Transform API goals to component format
  const transformedGoals: GoalData[] = useMemo(() =>
    apiGoals.map((goal): GoalData => ({
      id: goal.id,
      title: goal.title,
      description: goal.description || "",
      progress: goal.progress,
      status: (goal.status === "active" ? "on_track" : goal.status === "at_risk" ? "at_risk" : goal.status === "completed" ? "completed" : goal.status === "draft" ? "draft" : "on_track") as GoalStatus,
      priority: (goal.confidence >= 8 ? "critical" : goal.confidence >= 7 ? "high" : goal.confidence >= 5 ? "medium" : "low") as any,
      dueDate: goal.endDate,
      owner: goal.ownerName,
      ownerId: goal.ownerId,
      parentGoal: goal.parentGoalId ? "Parent Goal" : undefined,
      alignedGoals: goal.childGoalIds?.length || 0,
    })), [apiGoals]
  )
  
  const [goals, setGoals] = useState<GoalData[]>(initialGoals)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all")
  const [priorityFilter, setPriorityFilter] = useState<PriorityFilter>("all")
  const [viewMode, setViewMode] = useState<ViewMode>("cards")
  
  // Use API goals if available, fallback to local state
  const displayGoals = transformedGoals.length > 0 ? transformedGoals : goals
  
  // Edit dialog state
  const [editingGoal, setEditingGoal] = useState<GoalData | null>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)

  // Calculate stats
  const stats = useMemo(() => {
    const total = displayGoals.length
    const completed = displayGoals.filter((g) => g.status === "completed").length
    const atRisk = displayGoals.filter((g) => g.status === "at_risk").length
    const avgProgress = Math.round(displayGoals.reduce((sum, g) => sum + g.progress, 0) / total) || 0
    return { total, completed, atRisk, avgProgress }
  }, [displayGoals])

  // Filter goals
  const filteredGoals = useMemo(() => {
    return displayGoals.filter((goal) => {
      const matchesSearch =
        goal.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        goal.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (goal.owner && goal.owner.toLowerCase().includes(searchQuery.toLowerCase()))
      const matchesStatus = statusFilter === "all" || goal.status === statusFilter
      const matchesPriority = priorityFilter === "all" || goal.priority === priorityFilter
      return matchesSearch && matchesStatus && matchesPriority
    })
  }, [displayGoals, searchQuery, statusFilter, priorityFilter])

  const handleCreateGoal = async (data: NewGoalData) => {
    if (!user) return

    const createData = {
      title: data.title,
      description: data.description,
      type: "objective" as const,
      level: "team" as const,
      startDate: new Date().toISOString(),
      endDate: data.dueDate ? new Date(data.dueDate).toISOString() : new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(),
      ownerId: data.assigneeId || user.id,
      confidenceLevel: (data.priority === "critical" ? "green" : data.priority === "high" ? "green" : data.priority === "medium" ? "yellow" : "red") as ConfidenceLevel,
      parentGoalId: data.parentGoalId,
      teamId: currentUser.teamId,
    }

    const result = await createGoal(createData as any)
    if (!result.success) {
      console.error("Failed to create goal:", result.error)
    }
  }

  const handleUpdateProgress = (goalId: string, progress: number) => {
    // Note: Progress updates would need a separate endpoint
    setGoals(
      goals.map((goal) => {
        if (goal.id === goalId) {
          const newStatus: GoalStatus =
            progress >= 100 ? "completed" : goal.status === "completed" ? "on_track" : goal.status
          return { ...goal, progress, status: newStatus }
        }
        return goal
      })
    )
  }

  const handleEditGoal = (goal: GoalData) => {
    setEditingGoal(goal)
    setIsEditDialogOpen(true)
  }

  const handleSaveGoal = async (updatedGoal: GoalData) => {
    const updateData = {
      title: updatedGoal.title,
      description: updatedGoal.description,
      endDate: updatedGoal.dueDate || new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(),
      status: (updatedGoal.status === "on_track" ? "active" : updatedGoal.status === "at_risk" ? "at_risk" : updatedGoal.status === "completed" ? "completed" : "draft") as APIGoalStatus,
    }

    const result = await updateGoal(updatedGoal.id, updateData)
    if (result.success) {
      setIsEditDialogOpen(false)
      setEditingGoal(null)
    }
  }

  const handleDeleteGoal = async (goalId: string) => {
    const result = await deleteGoal(goalId)
    if (!result.success) {
      console.error("Failed to delete goal:", result.error)
    }
  }

  const handleArchiveGoal = async (goalId: string) => {
    const result = await deleteGoal(goalId)
    if (!result.success) {
      console.error("Failed to archive goal:", result.error)
    }
  }

  // Show loading state
  if (isLoading) {
    return (
      <div className="space-y-6 p-4 md:p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            <p className="mt-2 text-muted-foreground">Loading team goals...</p>
          </div>
        </div>
      </div>
    )
  }

  // Show error state
  if (isError) {
    return (
      <div className="space-y-6 p-4 md:p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="text-red-600 mb-2">Failed to load team goals</div>
            <p className="text-muted-foreground">Please try refreshing the page</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold tracking-tight">Team Goals</h1>
            <Badge variant="secondary" className="gap-1">
              <Users className="h-3 w-3" />
              {teamInfo.memberCount} members
            </Badge>
          </div>
          <p className="mt-1 text-muted-foreground">
            {teamInfo.name} team objectives and key results
          </p>
        </div>
        <div className="flex flex-col items-start gap-2 sm:items-end">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Team Lead:</span>
            <div className="flex items-center gap-2">
              <Avatar className="h-6 w-6">
                <AvatarImage src="/placeholder.svg" alt={teamInfo.lead.name} />
                <AvatarFallback className="text-xs">
                  {teamInfo.lead.name.split(" ").map((n) => n[0]).join("")}
                </AvatarFallback>
              </Avatar>
              <span className="font-medium text-foreground">{teamInfo.lead.name}</span>
            </div>
          </div>
          <Badge variant="outline" className="gap-1.5">
            <Shield className="h-3 w-3" />
            Your role: {roleInfo.label}
          </Badge>
        </div>
      </div>

      {/* Permission Info */}
      {!permissions.canCreateTeamGoals && (
        <Alert className="border-amber-500/20 bg-amber-500/5">
          <Info className="h-4 w-4" />
          <AlertDescription>
            Team goals can only be created by Managers or Team Leads. You can view and track progress on goals assigned to you.
          </AlertDescription>
        </Alert>
      )}

      {permissions.canCreateTeamGoals && (
        <Alert className="border-primary/20 bg-primary/5">
          <Info className="h-4 w-4" />
          <AlertDescription>
            As a {roleInfo.label}, you can create team goals and assign them to team members. Goals you create will cascade to individual contributors.
          </AlertDescription>
        </Alert>
      )}

      {/* Stats Overview */}
      <GoalStats
        totalGoals={stats.total}
        completedGoals={stats.completed}
        atRiskGoals={stats.atRisk}
        averageProgress={stats.avgProgress}
      />

      {/* Inline Goal Creator - Only for managers/team leads */}
      {permissions.canCreateTeamGoals && (
        <InlineGoalCreator
          onCreateGoal={handleCreateGoal}
          parentGoals={parentGoals}
          placeholder="Add a new team goal..."
          showAssignee={true}
          assignees={teamMembers}
          showAlignmentSuggestion={true}
        />
      )}

      {/* Filters */}
      <GoalFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
        priorityFilter={priorityFilter}
        onPriorityChange={setPriorityFilter}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
      />

      {/* Goals Display */}
      {filteredGoals.length === 0 ? (
        <GoalEmptyState
          title={displayGoals.length === 0 ? "No team goals yet" : "No matching goals"}
          description={
            displayGoals.length === 0
              ? permissions.canCreateTeamGoals
                ? "Create your first team goal to start tracking collective progress."
                : "Your team lead will add goals here. Check back soon!"
              : "Try adjusting your filters or search query to find what you're looking for."
          }
          actionLabel={permissions.canCreateTeamGoals ? "Create Team Goal" : undefined}
          onAction={displayGoals.length === 0 && permissions.canCreateTeamGoals ? () => {} : undefined}
        />
      ) : viewMode === "alignment" ? (
        <GoalAlignmentView
          goals={alignmentData}
          onGoalClick={(goal) => console.log("Clicked:", goal)}
        />
      ) : viewMode === "list" ? (
        <Card className="divide-y">
          {filteredGoals.map((goal) => (
            <GoalCard
              key={goal.id}
              goal={goal}
              variant="list"
              onEdit={handleEditGoal}
              onDelete={handleDeleteGoal}
              onArchive={handleArchiveGoal}
              onUpdateProgress={handleUpdateProgress}
              canEdit={permissions.canUpdateGoal(goal.ownerId || "", currentUser.id)}
              canDelete={permissions.canDeleteGoal(goal.ownerId || "")}
            />
          ))}
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredGoals.map((goal) => (
            <GoalCard
              key={goal.id}
              goal={goal}
              onEdit={handleEditGoal}
              onDelete={handleDeleteGoal}
              onArchive={handleArchiveGoal}
              onUpdateProgress={handleUpdateProgress}
              canEdit={permissions.canUpdateGoal(goal.ownerId || "", currentUser.id)}
              canDelete={permissions.canDeleteGoal(goal.ownerId || "")}
            />
          ))}
        </div>
      )}

      {/* Edit Goal Dialog */}
      <GoalEditDialog
        goal={editingGoal}
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        onSave={handleSaveGoal}
        parentGoals={parentGoals}
        canEditAllFields={
          editingGoal
            ? permissions.canEditGoalDetails(editingGoal.ownerId || "", currentUser.id)
            : false
        }
      />
    </div>
  )
}
