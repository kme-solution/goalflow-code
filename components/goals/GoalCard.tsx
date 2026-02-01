"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  MoreHorizontal,
  Pencil,
  Trash2,
  Archive,
  ChevronDown,
  ChevronUp,
  Calendar,
  User,
  Target,
  Link2,
  CheckCircle2,
} from "lucide-react"
import { cn } from "@/lib/utils"

export type GoalStatus = "on_track" | "at_risk" | "completed" | "draft"
export type GoalPriority = "low" | "medium" | "high" | "critical"

export interface GoalData {
  id: string
  title: string
  description: string
  progress: number
  status: GoalStatus
  priority: GoalPriority
  dueDate?: string
  owner?: string
  parentGoal?: string
  alignedGoals?: number
}

interface GoalCardProps {
  goal: GoalData
  onEdit?: (goal: GoalData) => void
  onDelete?: (goalId: string) => void
  onArchive?: (goalId: string) => void
  onUpdateProgress?: (goalId: string, progress: number) => void
  variant?: "card" | "list"
  className?: string
}

const statusConfig: Record<GoalStatus, { label: string; className: string }> = {
  on_track: { label: "On Track", className: "bg-emerald-500/10 text-emerald-700 border-emerald-500/20" },
  at_risk: { label: "At Risk", className: "bg-amber-500/10 text-amber-700 border-amber-500/20" },
  completed: { label: "Completed", className: "bg-primary/10 text-primary border-primary/20" },
  draft: { label: "Draft", className: "bg-muted text-muted-foreground border-muted-foreground/20" },
}

const priorityConfig: Record<GoalPriority, { label: string; className: string }> = {
  critical: { label: "Critical", className: "bg-rose-500/10 text-rose-700 border-rose-500/20" },
  high: { label: "High", className: "bg-orange-500/10 text-orange-700 border-orange-500/20" },
  medium: { label: "Medium", className: "bg-sky-500/10 text-sky-700 border-sky-500/20" },
  low: { label: "Low", className: "bg-slate-500/10 text-slate-600 border-slate-500/20" },
}

export function GoalCard({
  goal,
  onEdit,
  onDelete,
  onArchive,
  onUpdateProgress,
  variant = "card",
  className,
}: GoalCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isEditingProgress, setIsEditingProgress] = useState(false)
  const [progressValue, setProgressValue] = useState(goal.progress.toString())

  const handleProgressSubmit = () => {
    const newProgress = Math.min(100, Math.max(0, parseInt(progressValue) || 0))
    onUpdateProgress?.(goal.id, newProgress)
    setIsEditingProgress(false)
  }

  const handleQuickProgress = (increment: number) => {
    const newProgress = Math.min(100, Math.max(0, goal.progress + increment))
    onUpdateProgress?.(goal.id, newProgress)
  }

  if (variant === "list") {
    return (
      <div
        className={cn(
          "flex items-center gap-4 border-b px-4 py-3 transition-colors hover:bg-muted/50 last:border-b-0",
          className
        )}
      >
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="font-medium">{goal.title}</span>
            <Badge variant="outline" className={cn("text-xs", statusConfig[goal.status].className)}>
              {statusConfig[goal.status].label}
            </Badge>
          </div>
          {goal.owner && (
            <p className="mt-0.5 text-xs text-muted-foreground">
              <User className="mr-1 inline h-3 w-3" />
              {goal.owner}
            </p>
          )}
        </div>
        <div className="flex w-32 items-center gap-2">
          <Progress value={goal.progress} className="h-2" />
          <span className="w-10 text-right text-sm font-medium">{goal.progress}%</span>
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0"
            onClick={() => handleQuickProgress(10)}
            aria-label="Increase progress"
          >
            <ChevronUp className="h-4 w-4" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onEdit?.(goal)}>
                <Pencil className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onArchive?.(goal.id)}>
                <Archive className="mr-2 h-4 w-4" />
                Archive
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-destructive focus:text-destructive"
                onClick={() => onDelete?.(goal.id)}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    )
  }

  return (
    <Card className={cn("overflow-hidden transition-all hover:shadow-md", className)}>
      <div className="p-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="outline" className={cn("text-xs", statusConfig[goal.status].className)}>
                {statusConfig[goal.status].label}
              </Badge>
              <Badge variant="outline" className={cn("text-xs", priorityConfig[goal.priority].className)}>
                {priorityConfig[goal.priority].label}
              </Badge>
            </div>
            <h3 className="mt-2 font-semibold leading-tight">{goal.title}</h3>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 shrink-0 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onEdit?.(goal)}>
                <Pencil className="mr-2 h-4 w-4" />
                Edit Goal
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onArchive?.(goal.id)}>
                <Archive className="mr-2 h-4 w-4" />
                Archive
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-destructive focus:text-destructive"
                onClick={() => onDelete?.(goal.id)}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Description (collapsed by default) */}
        <p
          className={cn(
            "mt-2 text-sm text-muted-foreground",
            !isExpanded && "line-clamp-2"
          )}
        >
          {goal.description}
        </p>

        {/* Progress Section */}
        <div className="mt-4">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Progress</span>
            {isEditingProgress ? (
              <div className="flex items-center gap-1">
                <Input
                  type="number"
                  min="0"
                  max="100"
                  value={progressValue}
                  onChange={(e) => setProgressValue(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleProgressSubmit()}
                  className="h-7 w-16 text-right text-sm"
                  autoFocus
                />
                <span className="text-sm">%</span>
                <Button size="sm" variant="ghost" className="h-7 w-7 p-0" onClick={handleProgressSubmit}>
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                </Button>
              </div>
            ) : (
              <button
                onClick={() => setIsEditingProgress(true)}
                className="text-sm font-semibold hover:text-primary"
              >
                {goal.progress}%
              </button>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Progress value={goal.progress} className="h-2 flex-1" />
            <div className="flex items-center gap-0.5">
              <Button
                variant="outline"
                size="sm"
                className="h-6 w-6 p-0"
                onClick={() => handleQuickProgress(-10)}
                aria-label="Decrease progress"
              >
                <ChevronDown className="h-3 w-3" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="h-6 w-6 p-0"
                onClick={() => handleQuickProgress(10)}
                aria-label="Increase progress"
              >
                <ChevronUp className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </div>

        {/* Metadata */}
        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
          {goal.dueDate && (
            <span className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {goal.dueDate}
            </span>
          )}
          {goal.owner && (
            <span className="flex items-center gap-1">
              <User className="h-3 w-3" />
              {goal.owner}
            </span>
          )}
          {goal.parentGoal && (
            <span className="flex items-center gap-1">
              <Target className="h-3 w-3" />
              {goal.parentGoal}
            </span>
          )}
          {goal.alignedGoals !== undefined && goal.alignedGoals > 0 && (
            <span className="flex items-center gap-1">
              <Link2 className="h-3 w-3" />
              {goal.alignedGoals} aligned
            </span>
          )}
        </div>

        {/* Expand/Collapse */}
        {goal.description.length > 100 && (
          <Button
            variant="ghost"
            size="sm"
            className="mt-2 h-auto p-0 text-xs text-muted-foreground hover:text-foreground"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? "Show less" : "Show more"}
          </Button>
        )}
      </div>
    </Card>
  )
}
