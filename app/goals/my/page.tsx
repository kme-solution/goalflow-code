"use client"

import { useState, useMemo } from "react"
import { GoalStats } from "@/components/goals/GoalStats"
import { GoalFilters, type ViewMode, type StatusFilter, type PriorityFilter } from "@/components/goals/GoalFilters"
import { GoalCard, type GoalData, type GoalStatus, type GoalPriority } from "@/components/goals/GoalCard"
import { InlineGoalCreator, type NewGoalData } from "@/components/goals/InlineGoalCreator"
import { GoalAlignmentView, type AlignedGoal } from "@/components/goals/GoalAlignmentView"
import { GoalEmptyState } from "@/components/goals/GoalEmptyState"
import { Card } from "@/components/ui/card"

// Sample data - in production this would come from an API
const initialGoals: GoalData[] = [
  {
    id: "1",
    title: "Complete Q1 Performance Review",
    description: "Finish all performance evaluations for direct reports. This includes gathering feedback, scheduling 1:1 meetings, and submitting final assessments by the end of the quarter.",
    progress: 70,
    status: "on_track",
    priority: "high",
    dueDate: "Mar 31, 2024",
    owner: "You",
    parentGoal: "Team Development",
    alignedGoals: 2,
  },
  {
    id: "2",
    title: "Launch Dashboard Redesign",
    description: "Ship the new dashboard redesign to production with improved UX and performance optimizations.",
    progress: 85,
    status: "on_track",
    priority: "critical",
    dueDate: "Feb 28, 2024",
    owner: "You",
    parentGoal: "Product Excellence",
    alignedGoals: 1,
  },
  {
    id: "3",
    title: "Improve Customer Satisfaction Score",
    description: "Increase NPS score by 10 points through targeted improvements in support response time and product quality.",
    progress: 45,
    status: "at_risk",
    priority: "high",
    dueDate: "Apr 15, 2024",
    owner: "You",
    parentGoal: "Customer Success",
    alignedGoals: 0,
  },
  {
    id: "4",
    title: "Complete AWS Certification",
    description: "Study and pass the AWS Solutions Architect Professional certification exam.",
    progress: 30,
    status: "on_track",
    priority: "medium",
    dueDate: "May 30, 2024",
    owner: "You",
  },
  {
    id: "5",
    title: "Document API Best Practices",
    description: "Create comprehensive documentation for internal API development standards.",
    progress: 100,
    status: "completed",
    priority: "low",
    dueDate: "Jan 15, 2024",
    owner: "You",
  },
]

// Sample parent goals for alignment
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
            id: "3",
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
  {
    id: "company-2",
    title: "Launch New Product Features",
    description: "Q1 product roadmap execution",
    progress: 80,
    status: "on_track",
    priority: "high",
    level: "company",
    children: [
      {
        id: "2",
        title: "Launch Dashboard Redesign",
        description: "Ship the new dashboard redesign",
        progress: 85,
        status: "on_track",
        priority: "critical",
        level: "personal",
      },
    ],
  },
]

export default function MyGoalsPage() {
  const [goals, setGoals] = useState<GoalData[]>(initialGoals)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all")
  const [priorityFilter, setPriorityFilter] = useState<PriorityFilter>("all")
  const [viewMode, setViewMode] = useState<ViewMode>("cards")

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
        goal.description.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesStatus = statusFilter === "all" || goal.status === statusFilter
      const matchesPriority = priorityFilter === "all" || goal.priority === priorityFilter
      return matchesSearch && matchesStatus && matchesPriority
    })
  }, [goals, searchQuery, statusFilter, priorityFilter])

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
    // In production, open edit modal
    console.log("Edit goal:", goal)
  }

  const handleDeleteGoal = (goalId: string) => {
    setGoals(goals.filter((g) => g.id !== goalId))
  }

  const handleArchiveGoal = (goalId: string) => {
    // In production, archive via API
    setGoals(goals.filter((g) => g.id !== goalId))
  }

  return (
    <div className="space-y-6 p-4 md:p-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">My Goals</h1>
        <p className="mt-1 text-muted-foreground">
          Track and manage your personal objectives
        </p>
      </div>

      {/* Stats Overview */}
      <GoalStats
        totalGoals={stats.total}
        completedGoals={stats.completed}
        atRiskGoals={stats.atRisk}
        averageProgress={stats.avgProgress}
      />

      {/* Inline Goal Creator */}
      <InlineGoalCreator
        onCreateGoal={handleCreateGoal}
        parentGoals={parentGoals}
        placeholder="Add a new personal goal..."
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

      {/* Goals Display */}
      {filteredGoals.length === 0 ? (
        <GoalEmptyState
          title={goals.length === 0 ? "No goals yet" : "No matching goals"}
          description={
            goals.length === 0
              ? "Create your first goal to start tracking your progress and aligning with team objectives."
              : "Try adjusting your filters or search query to find what you're looking for."
          }
          actionLabel="Create Goal"
          onAction={goals.length === 0 ? () => {} : undefined}
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
            />
          ))}
        </div>
      )}
    </div>
  )
}
