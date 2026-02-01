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
import { Building2, CalendarDays, Shield, Info, Crown } from "lucide-react"
import { useGoalPermissions, getRoleDisplayInfo, type CurrentUser } from "@/lib/hooks/useGoalPermissions"

// Simulated current user - in production this comes from auth context
// Change role to test: "employee", "team_lead", "manager", "vp", "ceo", "cto", "coo", "cfo"
const currentUser: CurrentUser = {
  id: "ceo-1",
  name: "James Wilson",
  role: "ceo", // Executive leadership (CEO, CTO, COO, CFO) can create company goals
  teamId: undefined,
  departmentId: undefined,
  managerId: undefined,
}

// Company info
const companyInfo = {
  name: "GoalFlow Inc.",
  period: "Q1 2024",
  teamsAligned: 8,
}

// Sample executives who can own company goals
const executives = [
  { id: "ceo-1", name: "James Wilson (CEO)" },
  { id: "cto-1", name: "Lisa Park (CTO)" },
  { id: "cfo-1", name: "Robert Chen (CFO)" },
  { id: "vp-product", name: "Sarah Miller (VP Product)" },
  { id: "vp-growth", name: "Michael Brown (VP Growth)" },
  { id: "vp-cs", name: "Jennifer Lee (VP Customer Success)" },
]

// Sample company goals
const initialGoals: GoalData[] = [
  {
    id: "c1",
    title: "Achieve $10M ARR",
    description: "Grow annual recurring revenue to $10 million through customer acquisition, expansion, and retention strategies. Focus on enterprise segment growth.",
    progress: 72,
    status: "on_track",
    priority: "critical",
    dueDate: "Dec 31, 2024",
    owner: "Executive Team",
    ownerId: "ceo-1",
    alignedGoals: 15,
  },
  {
    id: "c2",
    title: "Achieve 99.9% System Uptime",
    description: "Maintain industry-leading reliability across all production systems. Implement redundancy, monitoring, and incident response improvements.",
    progress: 85,
    status: "on_track",
    priority: "critical",
    dueDate: "Ongoing",
    owner: "CTO",
    ownerId: "cto-1",
    alignedGoals: 8,
  },
  {
    id: "c3",
    title: "Launch in 3 New Markets",
    description: "Expand geographical presence to European Union, Southeast Asia, and Latin America with localized product offerings.",
    progress: 35,
    status: "at_risk",
    priority: "high",
    dueDate: "Sep 30, 2024",
    owner: "VP of Growth",
    ownerId: "vp-growth",
    alignedGoals: 12,
  },
  {
    id: "c4",
    title: "Achieve 95% Customer Satisfaction",
    description: "Improve NPS score to 70+ and maintain customer satisfaction rating at 95% or higher through enhanced support and product quality.",
    progress: 88,
    status: "on_track",
    priority: "high",
    dueDate: "Ongoing",
    owner: "VP of Customer Success",
    ownerId: "vp-cs",
    alignedGoals: 10,
  },
  {
    id: "c5",
    title: "Grow Team to 150 Employees",
    description: "Strategic hiring across engineering, sales, and customer success to support growth objectives while maintaining culture and quality.",
    progress: 60,
    status: "on_track",
    priority: "medium",
    dueDate: "Dec 31, 2024",
    owner: "VP of People",
    ownerId: "vp-people",
    alignedGoals: 6,
  },
  {
    id: "c6",
    title: "Achieve SOC 2 Type II Certification",
    description: "Complete security compliance certification to enable enterprise sales and demonstrate commitment to data protection.",
    progress: 100,
    status: "completed",
    priority: "critical",
    dueDate: "Jan 31, 2024",
    owner: "CISO",
    ownerId: "ciso-1",
    alignedGoals: 4,
  },
]

// Comprehensive alignment view showing company -> team -> individual cascade
const alignmentData: AlignedGoal[] = [
  {
    id: "c1",
    title: "Achieve $10M ARR",
    description: "Company revenue target",
    progress: 72,
    status: "on_track",
    priority: "critical",
    level: "company",
    children: [
      {
        id: "t1",
        title: "Close 50 Enterprise Deals",
        description: "Sales team target",
        progress: 65,
        status: "on_track",
        priority: "critical",
        level: "team",
        children: [
          {
            id: "p1",
            title: "Manage West Coast Pipeline",
            description: "Individual sales rep goal",
            progress: 70,
            status: "on_track",
            priority: "high",
            level: "personal",
          },
        ],
      },
      {
        id: "t2",
        title: "Increase Customer Expansion Revenue 30%",
        description: "Customer success team target",
        progress: 78,
        status: "on_track",
        priority: "high",
        level: "team",
      },
    ],
  },
  {
    id: "c3",
    title: "Launch in 3 New Markets",
    description: "Geographic expansion",
    progress: 35,
    status: "at_risk",
    priority: "high",
    level: "company",
    children: [
      {
        id: "t5",
        title: "Complete EU Market Research",
        description: "Growth team target",
        progress: 40,
        status: "at_risk",
        priority: "high",
        level: "team",
      },
      {
        id: "t6",
        title: "Build Localization Infrastructure",
        description: "Engineering team target",
        progress: 25,
        status: "at_risk",
        priority: "high",
        level: "team",
      },
    ],
  },
]

export default function CompanyGoalsPage() {
  const permissions = useGoalPermissions(currentUser)
  const roleInfo = getRoleDisplayInfo(currentUser.role)
  
  const [goals, setGoals] = useState<GoalData[]>(initialGoals)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all")
  const [priorityFilter, setPriorityFilter] = useState<PriorityFilter>("all")
  const [viewMode, setViewMode] = useState<ViewMode>("cards")
  
  // Edit dialog state
  const [editingGoal, setEditingGoal] = useState<GoalData | null>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)

  // Calculate stats
  const stats = useMemo(() => {
    const total = goals.length
    const completed = goals.filter((g) => g.status === "completed").length
    const atRisk = goals.filter((g) => g.status === "at_risk").length
    const avgProgress = Math.round(goals.reduce((sum, g) => sum + g.progress, 0) / total) || 0
    return { total, completed, atRisk, avgProgress }
  }, [goals])

  // Filter goals
  const filteredGoals = useMemo(() => {
    return goals.filter((goal) => {
      const matchesSearch =
        goal.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        goal.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (goal.owner && goal.owner.toLowerCase().includes(searchQuery.toLowerCase()))
      const matchesStatus = statusFilter === "all" || goal.status === statusFilter
      const matchesPriority = priorityFilter === "all" || goal.priority === priorityFilter
      return matchesSearch && matchesStatus && matchesPriority
    })
  }, [goals, searchQuery, statusFilter, priorityFilter])

  const handleCreateGoal = async (data: NewGoalData) => {
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
      owner: data.assigneeId 
        ? executives.find(e => e.id === data.assigneeId)?.name || "Executive Team"
        : "Executive Team",
      ownerId: data.assigneeId || currentUser.id,
      alignedGoals: 0,
    }

    setGoals([newGoal, ...goals])
  }

  const handleUpdateProgress = (goalId: string, progress: number) => {
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
    await new Promise((resolve) => setTimeout(resolve, 500))
    setGoals(goals.map((g) => (g.id === updatedGoal.id ? updatedGoal : g)))
  }

  const handleDeleteGoal = (goalId: string) => {
    setGoals(goals.filter((g) => g.id !== goalId))
  }

  const handleArchiveGoal = (goalId: string) => {
    setGoals(goals.filter((g) => g.id !== goalId))
  }

  return (
    <div className="space-y-6 p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold tracking-tight">Company Goals</h1>
            <Badge variant="secondary" className="gap-1">
              <Building2 className="h-3 w-3" />
              {companyInfo.teamsAligned} teams aligned
            </Badge>
          </div>
          <p className="mt-1 text-muted-foreground">
            Organization-wide strategic objectives for {companyInfo.name}
          </p>
        </div>
        <div className="flex flex-col items-start gap-2 sm:items-end">
          <div className="flex items-center gap-2 rounded-lg bg-muted/50 px-3 py-2 text-sm">
            <CalendarDays className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">Period:</span>
            <span className="font-medium">{companyInfo.period}</span>
          </div>
          <Badge variant="outline" className="gap-1.5">
            <Shield className="h-3 w-3" />
            Your role: {roleInfo.label}
          </Badge>
        </div>
      </div>

      {/* Permission Info */}
      {permissions.canCreateCompanyGoals ? (
        <Alert className="border-primary/20 bg-primary/5">
          <Crown className="h-4 w-4" />
          <AlertDescription>
            As {roleInfo.label}, you have full control over company goals. These goals cascade down to team and individual objectives across the organization.
          </AlertDescription>
        </Alert>
      ) : (
        <Alert className="border-muted-foreground/20 bg-muted/30">
          <Info className="h-4 w-4" />
          <AlertDescription>
            Company goals are set by executive leadership (CEO/System Admin). You can view these strategic objectives and align your team/personal goals to them.
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

      {/* Inline Goal Creator - Only for CEO/System Admin */}
      {permissions.canCreateCompanyGoals && (
        <InlineGoalCreator
          onCreateGoal={handleCreateGoal}
          placeholder="Add a new company objective..."
          showAssignee={true}
          assignees={executives}
          assigneeLabel="Owner"
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
          title={goals.length === 0 ? "No company goals yet" : "No matching goals"}
          description={
            goals.length === 0
              ? permissions.canCreateCompanyGoals
                ? "Define your organization's strategic objectives to align all teams."
                : "Company leadership will set strategic objectives here soon."
              : "Try adjusting your filters or search query to find what you're looking for."
          }
          actionLabel={permissions.canCreateCompanyGoals ? "Create Company Goal" : undefined}
          onAction={goals.length === 0 && permissions.canCreateCompanyGoals ? () => {} : undefined}
        />
      ) : viewMode === "alignment" ? (
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium">Goal Alignment View</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              See how company objectives cascade to team and individual goals
            </p>
          </div>
          <GoalAlignmentView
            goals={alignmentData}
            onGoalClick={(goal) => console.log("Clicked:", goal)}
          />
        </div>
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
        canEditAllFields={
          editingGoal
            ? permissions.canEditGoalDetails(editingGoal.ownerId || "", currentUser.id)
            : false
        }
      />
    </div>
  )
}
