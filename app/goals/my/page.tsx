"use client"

import { useState, useMemo } from "react"
import { GoalStats } from "@/components/goals/GoalStats"
import { GoalFilters, type ViewMode, type StatusFilter, type PriorityFilter } from "@/components/goals/GoalFilters"
import { GoalCard, type GoalData, type GoalStatus, type GoalPriority } from "@/components/goals/GoalCard"
import { InlineGoalCreator, type NewGoalData } from "@/components/goals/InlineGoalCreator"
import { GoalAlignmentView, type AlignedGoal } from "@/components/goals/GoalAlignmentView"
import { GoalEmptyState } from "@/components/goals/GoalEmptyState"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { UserCircle, Target, Info } from "lucide-react"
import { useGoalPermissions, type CurrentUser } from "@/lib/hooks/useGoalPermissions"

// Simulated current user - in production this comes from auth context
const currentUser: CurrentUser = {
  id: "user-1",
  name: "John Doe",
  role: "employee", // Change to "manager", "ceo", etc. to test different permissions
  teamId: "team-1",
  managerId: "manager-1",
}

// Sample assigned goals (from manager/team lead)
const assignedGoals: GoalData[] = [
  {
    id: "a1",
    title: "Complete Q1 Performance Review",
    description: "Finish all performance evaluations for direct reports. This includes gathering feedback, scheduling 1:1 meetings, and submitting final assessments by the end of the quarter.",
    progress: 70,
    status: "on_track",
    priority: "high",
    dueDate: "Mar 31, 2024",
    owner: "You",
    assignedBy: "Sarah Chen",
    parentGoal: "Team Development",
    alignedGoals: 2,
  },
  {
    id: "a2",
    title: "Improve Customer Satisfaction Score",
    description: "Increase NPS score by 10 points through targeted improvements in support response time and product quality.",
    progress: 45,
    status: "at_risk",
    priority: "high",
    dueDate: "Apr 15, 2024",
    owner: "You",
    assignedBy: "Sarah Chen",
    parentGoal: "Customer Success",
    alignedGoals: 0,
  },
  {
    id: "a3",
    title: "Complete Security Training",
    description: "Complete all required security compliance training modules by end of quarter.",
    progress: 100,
    status: "completed",
    priority: "medium",
    dueDate: "Feb 28, 2024",
    owner: "You",
    assignedBy: "HR Team",
    parentGoal: "Compliance",
  },
]

// Sample personal goals (self-created)
const personalGoals: GoalData[] = [
  {
    id: "p1",
    title: "Complete AWS Certification",
    description: "Study and pass the AWS Solutions Architect Professional certification exam.",
    progress: 30,
    status: "on_track",
    priority: "medium",
    dueDate: "May 30, 2024",
    owner: "You",
  },
  {
    id: "p2",
    title: "Document API Best Practices",
    description: "Create comprehensive documentation for internal API development standards.",
    progress: 100,
    status: "completed",
    priority: "low",
    dueDate: "Jan 15, 2024",
    owner: "You",
  },
  {
    id: "p3",
    title: "Learn TypeScript Advanced Patterns",
    description: "Master advanced TypeScript patterns including generics, decorators, and type guards.",
    progress: 55,
    status: "on_track",
    priority: "low",
    dueDate: "Jun 30, 2024",
    owner: "You",
  },
]

// Sample parent goals for alignment (from team/company goals)
const parentGoals = [
  { id: "p1", title: "Team Development" },
  { id: "p2", title: "Product Excellence" },
  { id: "p3", title: "Customer Success" },
  { id: "p4", title: "Technical Innovation" },
]

// Sample alignment data
const alignmentData: AlignedGoal[] = [
  {
    id: "company-1",
    title: "Achieve 95% Customer Satisfaction",
    description: "Company-wide initiative to improve customer experience",
    progress: 72,
    status: "on_track",
    priority: "critical",
    level: "company",
    children: [
      {
        id: "team-1",
        title: "Reduce Support Response Time",
        description: "Team goal to improve support efficiency",
        progress: 60,
        status: "on_track",
        priority: "high",
        level: "team",
        children: [
          {
            id: "a2",
            title: "Improve Customer Satisfaction Score",
            description: "Personal contribution to customer success",
            progress: 45,
            status: "at_risk",
            priority: "high",
            level: "personal",
          },
        ],
      },
    ],
  },
]

export default function MyGoalsPage() {
  const permissions = useGoalPermissions(currentUser)
  
  const [assignedGoalsList, setAssignedGoalsList] = useState<GoalData[]>(assignedGoals)
  const [personalGoalsList, setPersonalGoalsList] = useState<GoalData[]>(personalGoals)
  const [activeTab, setActiveTab] = useState<"assigned" | "personal">("assigned")
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all")
  const [priorityFilter, setPriorityFilter] = useState<PriorityFilter>("all")
  const [viewMode, setViewMode] = useState<ViewMode>("cards")

  // Combined goals for stats
  const allGoals = [...assignedGoalsList, ...personalGoalsList]
  
  // Calculate stats
  const stats = useMemo(() => {
    const total = allGoals.length
    const completed = allGoals.filter((g) => g.status === "completed").length
    const atRisk = allGoals.filter((g) => g.status === "at_risk").length
    const avgProgress = Math.round(allGoals.reduce((sum, g) => sum + g.progress, 0) / total) || 0
    return { total, completed, atRisk, avgProgress }
  }, [allGoals])

  // Filter goals based on active tab
  const currentGoals = activeTab === "assigned" ? assignedGoalsList : personalGoalsList
  const setCurrentGoals = activeTab === "assigned" ? setAssignedGoalsList : setPersonalGoalsList

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

  const handleCreateGoal = async (data: NewGoalData) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500))

    const newGoal: GoalData = {
      id: `goal-${Date.now()}`,
      title: data.title,
      description: data.description,
      progress: 0,
      status: "on_track",
      priority: data.priority,
      dueDate: data.dueDate
        ? data.dueDate.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })
        : undefined,
      owner: "You",
      parentGoal: parentGoals.find((p) => p.id === data.parentGoalId)?.title,
    }

    // Personal goals created by user go to personal list
    setPersonalGoalsList([newGoal, ...personalGoalsList])
    setActiveTab("personal")
  }

  const handleUpdateProgress = (goalId: string, progress: number) => {
    const updateGoals = (goals: GoalData[]) =>
      goals.map((goal) => {
        if (goal.id === goalId) {
          const newStatus: GoalStatus =
            progress >= 100 ? "completed" : goal.status === "completed" ? "on_track" : goal.status
          return { ...goal, progress, status: newStatus }
        }
        return goal
      })

    setAssignedGoalsList(updateGoals(assignedGoalsList))
    setPersonalGoalsList(updateGoals(personalGoalsList))
  }

  const handleEditGoal = (goal: GoalData) => {
    console.log("Edit goal:", goal)
  }

  const handleDeleteGoal = (goalId: string) => {
    setAssignedGoalsList(assignedGoalsList.filter((g) => g.id !== goalId))
    setPersonalGoalsList(personalGoalsList.filter((g) => g.id !== goalId))
  }

  const handleArchiveGoal = (goalId: string) => {
    setAssignedGoalsList(assignedGoalsList.filter((g) => g.id !== goalId))
    setPersonalGoalsList(personalGoalsList.filter((g) => g.id !== goalId))
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
          onAction={activeTab === "personal" && currentGoals.length === 0 ? () => {} : undefined}
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

        <TabsContent value="assigned" className="mt-4 space-y-4">
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
          {renderGoalList()}
        </TabsContent>

        <TabsContent value="personal" className="mt-4 space-y-4">
          {/* Inline Goal Creator - Only for personal goals */}
          {permissions.canCreatePersonalGoals && (
            <InlineGoalCreator
              onCreateGoal={handleCreateGoal}
              parentGoals={parentGoals}
              placeholder="Add a new personal goal..."
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
          {renderGoalList()}
        </TabsContent>
      </Tabs>
    </div>
  )
}
