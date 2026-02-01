"use client"

import { useState, useMemo } from "react"
import { GoalStats } from "@/components/goals/GoalStats"
import { GoalFilters, type ViewMode, type StatusFilter, type PriorityFilter } from "@/components/goals/GoalFilters"
import { GoalCard, type GoalData, type GoalStatus } from "@/components/goals/GoalCard"
import { InlineGoalCreator, type NewGoalData } from "@/components/goals/InlineGoalCreator"
import { GoalAlignmentView, type AlignedGoal } from "@/components/goals/GoalAlignmentView"
import { GoalEmptyState } from "@/components/goals/GoalEmptyState"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Users } from "lucide-react"

// Sample team data
const teamInfo = {
  name: "Engineering",
  memberCount: 12,
  lead: "Sarah Chen",
}

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
    parentGoal: "Security & Compliance",
  },
  {
    id: "t6",
    title: "Reduce API Response Time",
    description: "Optimize API performance to achieve p95 response time under 200ms.",
    progress: 55,
    status: "on_track",
    priority: "high",
    dueDate: "Apr 30, 2024",
    owner: "Sarah Chen",
    parentGoal: "Product Excellence",
    alignedGoals: 2,
  },
]

// Sample parent goals for alignment
const parentGoals = [
  { id: "p1", title: "Operational Excellence" },
  { id: "p2", title: "Product Innovation" },
  { id: "p3", title: "Technical Excellence" },
  { id: "p4", title: "Security & Compliance" },
  { id: "p5", title: "Product Excellence" },
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
  {
    id: "company-2",
    title: "Launch Next-Gen Platform",
    description: "Product roadmap execution",
    progress: 72,
    status: "on_track",
    priority: "high",
    level: "company",
    children: [
      {
        id: "t2",
        title: "Launch Mobile App v2.0",
        description: "Team product delivery",
        progress: 78,
        status: "on_track",
        priority: "high",
        level: "team",
        children: [
          {
            id: "p3",
            title: "Complete UI Redesign",
            description: "Individual contributor goal",
            progress: 90,
            status: "on_track",
            priority: "high",
            level: "personal",
          },
        ],
      },
      {
        id: "t3",
        title: "Migrate to Kubernetes",
        description: "Infrastructure modernization",
        progress: 40,
        status: "at_risk",
        priority: "high",
        level: "team",
      },
    ],
  },
]

export default function TeamGoalsPage() {
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
      owner: teamInfo.lead,
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
    console.log("Edit goal:", goal)
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
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>Team Lead:</span>
          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src="/placeholder.svg" alt={teamInfo.lead} />
              <AvatarFallback className="text-xs">
                {teamInfo.lead.split(" ").map((n) => n[0]).join("")}
              </AvatarFallback>
            </Avatar>
            <span className="font-medium text-foreground">{teamInfo.lead}</span>
          </div>
        </div>
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
        placeholder="Add a new team goal..."
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
          title={goals.length === 0 ? "No team goals yet" : "No matching goals"}
          description={
            goals.length === 0
              ? "Create your first team goal to start tracking collective progress."
              : "Try adjusting your filters or search query to find what you're looking for."
          }
          actionLabel="Create Team Goal"
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
