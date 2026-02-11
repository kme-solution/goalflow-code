"use client"

import { useState, useMemo } from "react"
import { GoalStats } from "@/components/goals/GoalStats"
import { GoalFilters, type ViewMode, type StatusFilter, type PriorityFilter } from "@/components/goals/GoalFilters"
import { GoalCard, type GoalData, type GoalPriority, type GoalStatus as ComponentGoalStatus } from "@/components/goals/GoalCard"
import { InlineGoalCreator, type NewGoalData } from "@/components/goals/InlineGoalCreator"
import { GoalAlignmentView, type AlignedGoal } from "@/components/goals/GoalAlignmentView"
import { GoalEmptyState } from "@/components/goals/GoalEmptyState"
import { GoalEditDialog } from "@/components/goals/GoalEditDialog"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { UserCircle, Target, Info } from "lucide-react"
import { useGoalPermissions, type CurrentUser } from "@/lib/hooks/useGoalPermissions"
import { useGoals } from "@/lib/hooks/use-goals"
import { useAuth } from "@/components/auth-provider"
import type { ConfidenceLevel, GoalStatus } from "@/lib/types/goal.types"

// Simulated current user - in production this comes from auth context
const currentUser: CurrentUser = {
  id: "user-1",
  name: "John Doe",
  role: "employee", // Change to "manager", "ceo", "cto", "vp", etc. to test different permissions
  teamId: "team-1",
  departmentId: "dept-1",
  managerId: "manager-1",
}

// Placeholder data for alignment view
const alignmentData: AlignedGoal[] = []
const parentGoals: { id: string; title: string }[] = []

export default function MyGoalsPage() {
  const { user } = useAuth()
  const permissions = useGoalPermissions(currentUser)

  // Fetch goals from API
  const { goals: allGoals, isLoading, isError, createGoal, updateGoal, deleteGoal, updateProgress } = useGoals(user?.id)

  // Transform API goals to component format
  const transformedGoals: GoalData[] = useMemo(() =>
    allGoals.map((goal): GoalData => ({
      id: goal.id,
      title: goal.title,
      description: goal.description || "",
      progress: goal.progress,
      status: (goal.status === "active" ? "on_track" : goal.status === "at_risk" ? "at_risk" : goal.status === "completed" ? "completed" : goal.status === "draft" ? "draft" : "on_track") as ComponentGoalStatus,
      priority: (goal.confidence >= 8 ? "high" : goal.confidence >= 6 ? "medium" : "low") as GoalPriority,
      dueDate: goal.endDate,
      owner: goal.ownerName,
      ownerId: goal.ownerId,
      assignedBy: goal.ownerId !== user?.id ? "Manager" : undefined,
      parentGoal: goal.parentGoalId ? "Parent Goal" : undefined,
      alignedGoals: goal.childGoalIds?.length || 0,
    })), [allGoals, user?.id]
  )

  // Separate goals into assigned and personal
  const assignedGoalsList = useMemo(() =>
    transformedGoals.filter(goal => goal.ownerId !== user?.id), [transformedGoals, user?.id]
  )
  const personalGoalsList = useMemo(() =>
    transformedGoals.filter(goal => goal.ownerId === user?.id), [transformedGoals, user?.id]
  )

  const [activeTab, setActiveTab] = useState<"assigned" | "personal">("assigned")
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all")
  const [priorityFilter, setPriorityFilter] = useState<PriorityFilter>("all")
  const [viewMode, setViewMode] = useState<ViewMode>("cards")

  // Edit dialog state
  const [editingGoal, setEditingGoal] = useState<GoalData | null>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)

  // Combined goals for stats
  const combinedGoals = [...assignedGoalsList, ...personalGoalsList]

  // Calculate stats
  const stats = useMemo(() => {
    const total = combinedGoals.length
    const completed = combinedGoals.filter((g) => g.status === "completed").length
    const atRisk = combinedGoals.filter((g) => g.status === "at_risk").length
    const avgProgress = Math.round(combinedGoals.reduce((sum, g) => sum + g.progress, 0) / total) || 0
    return { total, completed, atRisk, avgProgress }
  }, [combinedGoals])

  // Filter goals based on active tab
  const currentGoals = activeTab === "assigned" ? assignedGoalsList : personalGoalsList

  const filteredGoals = useMemo(() => {
    return currentGoals.filter((goal) => {
      const matchesSearch =
        goal.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        goal.description.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesStatus = statusFilter === "all" || goal.status === statusFilter
      const matchesPriority = priorityFilter === "all" || goal.priority === priorityFilter
      return matchesSearch && matchesStatus && matchesPriority
    })
  }, [currentGoals, searchQuery, statusFilter, priorityFilter])

  // Show loading state
  if (isLoading) {
    return (
      <div className="space-y-6 p-4 md:p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            <p className="mt-2 text-muted-foreground">Loading your goals...</p>
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
            <div className="text-red-600 mb-2">Failed to load goals</div>
            <p className="text-muted-foreground">Please try refreshing the page</p>
          </div>
        </div>
      </div>
    )
  }

  const handleCreateGoal = async (data: NewGoalData) => {
    if (!user) return

    // Convert NewGoalData to CreateGoalRequest
    const createData = {
      title: data.title,
      description: data.description,
      type: "objective" as const,
      level: "personal" as const,
      startDate: new Date().toISOString(),
      endDate: data.dueDate ? new Date(data.dueDate).toISOString() : new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(), // Default 90 days
      ownerId: user.id,
      confidenceLevel: (data.priority === "high" ? "green" : data.priority === "medium" ? "yellow" : "red") as ConfidenceLevel,
      parentGoalId: data.parentGoalId,
    }

    const result = await createGoal(createData)
    if (result.success) {
      setActiveTab("personal") // Switch to personal goals tab
    } else {
      console.error("Failed to create goal:", result.error)
      // TODO: Show error toast
    }
  }

  const handleUpdateProgress = async (goalId: string, progress: number) => {
    // Find the goal to get current values
    const goal = allGoals.find(g => g.id === goalId)
    if (!goal) return

    // Calculate new current value based on progress percentage
    const newValue = goal.targetValue ? (progress / 100) * goal.targetValue : progress

    const result = await updateProgress(goalId, newValue, goal.confidence)
    if (!result.success) {
      console.error("Failed to update progress:", result.error)
      // TODO: Show error toast
    }
  }

  const handleEditGoal = (goal: GoalData) => {
    setEditingGoal(goal)
    setIsEditDialogOpen(true)
  }

  const handleSaveGoal = async (updatedGoal: GoalData) => {
    // Convert GoalData back to UpdateGoalRequest
    const updateData = {
      title: updatedGoal.title,
      description: updatedGoal.description,
      endDate: updatedGoal.dueDate || new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(),
      status: (updatedGoal.status === "on_track" ? "active" : updatedGoal.status === "at_risk" ? "at_risk" : updatedGoal.status === "completed" ? "completed" : "draft") as GoalStatus,
    }

    const result = await updateGoal(updatedGoal.id, updateData)
    if (result.success) {
      setIsEditDialogOpen(false)
      setEditingGoal(null)
    } else {
      console.error("Failed to update goal:", result.error)
      // TODO: Show error toast
    }
  }

  const handleDeleteGoal = async (goalId: string) => {
    const result = await deleteGoal(goalId)
    if (!result.success) {
      console.error("Failed to delete goal:", result.error)
      // TODO: Show error toast
    }
  }

  const handleArchiveGoal = async (goalId: string) => {
    const result = await deleteGoal(goalId) // Archive is same as delete (soft delete)
    if (!result.success) {
      console.error("Failed to archive goal:", result.error)
      // TODO: Show error toast
    }
  }

  const renderGoalList = () => {
    if (filteredGoals.length === 0) {
      return (
        <GoalEmptyState
          title={currentGoals.length === 0 ? `No ${activeTab} goals yet` : "No matching goals"}
          description={
            currentGoals.length === 0
              ? activeTab === "assigned"
                ? "Goals assigned by your manager will appear here."
                : "Create your first personal goal to start tracking your professional development."
              : "Try adjusting your filters or search query to find what you're looking for."
          }
          actionLabel={activeTab === "personal" ? "Create Goal" : undefined}
          onAction={activeTab === "personal" && currentGoals.length === 0 ? () => { } : undefined}
        />
      )
    }

    if (viewMode === "alignment") {
      return (
        <GoalAlignmentView
          goals={alignmentData}
          onGoalClick={(goal) => console.log("Clicked:", goal)}
        />
      )
    }

    if (viewMode === "list") {
      return (
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
              canEdit={permissions.canUpdateGoal(currentUser.id, currentUser.managerId)}
              canDelete={permissions.canDeleteGoal(currentUser.id)}
            />
          ))}
        </Card>
      )
    }

    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredGoals.map((goal) => (
          <GoalCard
            key={goal.id}
            goal={goal}
            onEdit={handleEditGoal}
            onDelete={handleDeleteGoal}
            onArchive={handleArchiveGoal}
            onUpdateProgress={handleUpdateProgress}
            canEdit={permissions.canUpdateGoal(currentUser.id, currentUser.managerId)}
            canDelete={permissions.canDeleteGoal(currentUser.id)}
          />
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6 p-4 md:p-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">My Goals</h1>
        <p className="mt-1 text-muted-foreground">
          Track goals assigned to you and your personal objectives
        </p>
      </div>

      {/* Stats Overview */}
      <GoalStats
        totalGoals={stats.total}
        completedGoals={stats.completed}
        atRiskGoals={stats.atRisk}
        averageProgress={stats.avgProgress}
      />

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

      {/* Tabs for Assigned vs Personal Goals */}
      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "assigned" | "personal")}>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <TabsList className="grid w-full grid-cols-2 sm:w-auto">
            <TabsTrigger value="assigned" className="gap-2">
              <Target className="h-4 w-4" />
              Assigned to Me
              <Badge variant="secondary" className="ml-1">
                {assignedGoalsList.length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="personal" className="gap-2">
              <UserCircle className="h-4 w-4" />
              My Personal Goals
              <Badge variant="secondary" className="ml-1">
                {personalGoalsList.length}
              </Badge>
            </TabsTrigger>
          </TabsList>
        </div>

        {/* Info Alert based on tab */}
        {activeTab === "assigned" && (
          <Alert className="mt-4 border-primary/20 bg-primary/5">
            <Info className="h-4 w-4" />
            <AlertDescription>
              These goals have been assigned to you by your manager or team lead. You can update progress, but only your manager can modify or remove them.
            </AlertDescription>
          </Alert>
        )}

        <TabsContent value="assigned" className="mt-6">
          {renderGoalList()}
        </TabsContent>

        <TabsContent value="personal" className="mt-6">
          <div className="mb-6">
            <InlineGoalCreator
              onCreateGoal={handleCreateGoal}
              parentGoals={parentGoals}
            />
          </div>
          {renderGoalList()}
        </TabsContent>
      </Tabs>

      {/* Edit Dialog */}
      <GoalEditDialog
        goal={editingGoal}
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        onSave={handleSaveGoal}
        parentGoals={parentGoals}
      />
    </div>
  )
}
