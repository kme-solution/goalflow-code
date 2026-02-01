"use client"

import { Target, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface GoalEmptyStateProps {
  title?: string
  description?: string
  actionLabel?: string
  onAction?: () => void
  className?: string
}

export function GoalEmptyState({
  title = "No goals yet",
  description = "Create your first goal to start tracking your progress.",
  actionLabel = "Create Goal",
  onAction,
  className,
}: GoalEmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/25 p-12 text-center",
        className
      )}
    >
      <div className="rounded-full bg-primary/10 p-4">
        <Target className="h-8 w-8 text-primary" />
      </div>
      <h3 className="mt-4 text-lg font-semibold">{title}</h3>
      <p className="mt-1 max-w-sm text-sm text-muted-foreground">{description}</p>
      {onAction && (
        <Button className="mt-6 gap-2" onClick={onAction}>
          <Plus className="h-4 w-4" />
          {actionLabel}
        </Button>
      )}
    </div>
  )
}
