"use client"

import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { ChevronRight, Target, Building2, Users, User } from "lucide-react"
import { cn } from "@/lib/utils"
import type { GoalData, GoalStatus } from "./GoalCard"

interface AlignedGoal extends GoalData {
  level: "company" | "team" | "personal"
  children?: AlignedGoal[]
}

interface GoalAlignmentViewProps {
  goals: AlignedGoal[]
  onGoalClick?: (goal: AlignedGoal) => void
  className?: string
}

const levelConfig = {
  company: {
    icon: Building2,
    label: "Company",
    color: "text-primary",
    bgColor: "bg-primary/10",
    borderColor: "border-l-primary",
  },
  team: {
    icon: Users,
    label: "Team",
    color: "text-amber-600",
    bgColor: "bg-amber-500/10",
    borderColor: "border-l-amber-500",
  },
  personal: {
    icon: User,
    label: "Personal",
    color: "text-emerald-600",
    bgColor: "bg-emerald-500/10",
    borderColor: "border-l-emerald-500",
  },
}

const statusColors: Record<GoalStatus, string> = {
  on_track: "bg-emerald-500",
  at_risk: "bg-amber-500",
  completed: "bg-primary",
  draft: "bg-muted-foreground",
}

function GoalNode({
  goal,
  depth = 0,
  onGoalClick,
}: {
  goal: AlignedGoal
  depth?: number
  onGoalClick?: (goal: AlignedGoal) => void
}) {
  const config = levelConfig[goal.level]
  const Icon = config.icon

  return (
    <div className="relative">
      {/* Connection line */}
      {depth > 0 && (
        <div
          className="absolute -left-6 top-0 h-full w-6"
          style={{ left: `${-24 + depth * 0}px` }}
        >
          <div className="absolute left-3 top-0 h-6 w-px bg-border" />
          <div className="absolute left-3 top-6 h-px w-3 bg-border" />
        </div>
      )}

      <button
        onClick={() => onGoalClick?.(goal)}
        className={cn(
          "group flex w-full items-start gap-3 rounded-lg border-l-4 bg-card p-3 text-left transition-all hover:bg-muted/50 hover:shadow-sm",
          config.borderColor
        )}
        style={{ marginLeft: `${depth * 24}px` }}
      >
        <div className={cn("rounded-lg p-2", config.bgColor)}>
          <Icon className={cn("h-4 w-4", config.color)} />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="font-medium">{goal.title}</span>
            <div className={cn("h-2 w-2 rounded-full", statusColors[goal.status])} />
          </div>
          <div className="mt-1 flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Progress value={goal.progress} className="h-1.5 w-20" />
              <span className="text-xs text-muted-foreground">{goal.progress}%</span>
            </div>
            <Badge variant="outline" className="text-xs">
              {config.label}
            </Badge>
          </div>
        </div>

        {goal.children && goal.children.length > 0 && (
          <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
        )}
      </button>

      {/* Children */}
      {goal.children && goal.children.length > 0 && (
        <div className="mt-2 space-y-2">
          {goal.children.map((child) => (
            <GoalNode
              key={child.id}
              goal={child}
              depth={depth + 1}
              onGoalClick={onGoalClick}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export function GoalAlignmentView({ goals, onGoalClick, className }: GoalAlignmentViewProps) {
  if (goals.length === 0) {
    return (
      <Card className={cn("flex flex-col items-center justify-center p-12 text-center", className)}>
        <div className="rounded-full bg-muted p-4">
          <Target className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="mt-4 font-semibold">No Goal Alignment</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Goals will appear here once they are aligned to company or team objectives.
        </p>
      </Card>
    )
  }

  return (
    <div className={cn("space-y-3", className)}>
      {goals.map((goal) => (
        <GoalNode key={goal.id} goal={goal} onGoalClick={onGoalClick} />
      ))}
    </div>
  )
}

export type { AlignedGoal }
