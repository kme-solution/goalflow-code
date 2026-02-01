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
import { Building2, CalendarDays } from "lucide-react"

// Company info
const companyInfo = {
  name: "GoalFlow Inc.",
  period: "Q1 2024",
  teamsAligned: 8,
}

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
    alignedGoals: 4,
  },
  {
    id: "c7",
    title: "Launch Enterprise Product Tier",
    description: "Develop and launch enterprise-grade features including SSO, advanced analytics, custom integrations, and dedicated support.",
    progress: 68,
    status: "on_track",
    priority: "high",
    dueDate: "Jun 30, 2024",
    owner: "VP of Product",
    alignedGoals: 9,
  },
  {
    id: "c8",
    title: "Reduce Customer Churn to Under 5%",
    description: "Implement proactive retention strategies, improve onboarding experience, and enhance customer success programs.",
    progress: 55,
    status: "at_risk",
    priority: "high",
    dueDate: "Dec 31, 2024",
    owner: "VP of Customer Success",
    alignedGoals: 7,
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
          {
            id: "p2",
            title: "Close Strategic Accounts",
            description: "Enterprise sales goal",
            progress: 80,
            status: "on_track",
            priority: "critical",
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
    id: "c2",
    title: "Achieve 99.9% System Uptime",
    description: "Reliability objective",
    progress: 85,
    status: "on_track",
    priority: "critical",
    level: "company",
    children: [
      {
        id: "t3",
        title: "Reduce System Downtime by 50%",
        description: "Engineering team target",
        progress: 65,
        status: "on_track",
        priority: "critical",
        level: "team",
        children: [
          {
            id: "p3",
            title: "Implement Auto-Recovery",
            description: "SRE individual goal",
            progress: 70,
            status: "on_track",
            priority: "high",
            level: "personal",
          },
        ],
      },
      {
        id: "t4",
        title: "Improve Incident Response Time",
        description: "Ops team target",
        progress: 90,
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
  {
    id: "c4",
    title: "Achieve 95% Customer Satisfaction",
    description: "Customer experience objective",
    progress: 88,
    status: "on_track",
    priority: "high",
    level: "company",
    children: [
      {
        id: "t7",
        title: "Reduce Support Response Time",
        description: "Support team target",
        progress: 92,
        status: "on_track",
        priority: "high",
        level: "team",
      },
      {
        id: "t8",
        title: "Improve Product Quality Score",
        description: "Product team target",
        progress: 85,
        status: "on_track",
        priority: "high",
        level: "team",
      },
    ],
  },
]

export default function CompanyGoalsPage() {
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
      owner: "Executive Team",
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
        <div className="flex items-center gap-2 rounded-lg bg-muted/50 px-3 py-2 text-sm">
          <CalendarDays className="h-4 w-4 text-muted-foreground" />
          <span className="text-muted-foreground">Period:</span>
          <span className="font-medium">{companyInfo.period}</span>
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
        placeholder="Add a new company objective..."
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
          title={goals.length === 0 ? "No company goals yet" : "No matching goals"}
          description={
            goals.length === 0
              ? "Define your organization's strategic objectives to align all teams."
              : "Try adjusting your filters or search query to find what you're looking for."
          }
          actionLabel="Create Company Goal"
          onAction={goals.length === 0 ? () => {} : undefined}
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
