"use client"

import { useState, useRef, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { DatePicker } from "@/components/ui/date-picker"
import { Plus, X, ChevronDown, ChevronUp, Lightbulb, Users } from "lucide-react"
import { cn } from "@/lib/utils"
import type { GoalPriority } from "./GoalCard"

export interface NewGoalData {
  title: string
  description: string
  priority: GoalPriority
  dueDate?: Date
  parentGoalId?: string
  assigneeId?: string
}

interface ParentGoal {
  id: string
  title: string
}

interface Assignee {
  id: string
  name: string
}

interface InlineGoalCreatorProps {
  onCreateGoal: (data: NewGoalData) => Promise<void>
  parentGoals?: ParentGoal[]
  placeholder?: string
  className?: string
  showAssignee?: boolean
  assignees?: Assignee[]
  assigneeLabel?: string
  showAlignmentSuggestion?: boolean
}

export function InlineGoalCreator({
  onCreateGoal,
  parentGoals = [],
  placeholder = "Add a new goal...",
  className,
  showAssignee = false,
  assignees = [],
  assigneeLabel = "Assign to",
  showAlignmentSuggestion = false,
}: InlineGoalCreatorProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [formData, setFormData] = useState<NewGoalData>({
    title: "",
    description: "",
    priority: "medium",
    dueDate: undefined,
    parentGoalId: undefined,
    assigneeId: undefined,
  })

  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isExpanded && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isExpanded])

  const handleSubmit = async () => {
    if (!formData.title.trim()) return

    setIsSubmitting(true)
    try {
      await onCreateGoal(formData)
      setFormData({
        title: "",
        description: "",
        priority: "medium",
        dueDate: undefined,
        parentGoalId: undefined,
        assigneeId: undefined,
      })
      setShowAdvanced(false)
      setIsExpanded(false)
    } catch (error) {
      console.error("Failed to create goal:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCancel = () => {
    setFormData({
      title: "",
      description: "",
      priority: "medium",
      dueDate: undefined,
      parentGoalId: undefined,
      assigneeId: undefined,
    })
    setShowAdvanced(false)
    setIsExpanded(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey && !showAdvanced) {
      e.preventDefault()
      handleSubmit()
    }
    if (e.key === "Escape") {
      handleCancel()
    }
  }

  if (!isExpanded) {
    return (
      <button
        onClick={() => setIsExpanded(true)}
        className={cn(
          "flex w-full items-center gap-2 rounded-lg border-2 border-dashed border-muted-foreground/25 p-4 text-muted-foreground transition-colors hover:border-primary/50 hover:bg-muted/50 hover:text-foreground",
          className
        )}
      >
        <Plus className="h-5 w-5" />
        <span>{placeholder}</span>
      </button>
    )
  }

  return (
    <Card className={cn("overflow-hidden", className)}>
      <div className="p-4">
        <div className="flex items-start gap-2">
          <div className="min-w-0 flex-1 space-y-3">
            {/* Title Input */}
            <Input
              ref={inputRef}
              placeholder="Goal title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              onKeyDown={handleKeyDown}
              className="border-0 bg-transparent px-0 text-base font-medium placeholder:text-muted-foreground focus-visible:ring-0"
            />

            {/* Quick Options Row */}
            <div className="flex flex-wrap items-center gap-2">
              <Select
                value={formData.priority}
                onValueChange={(value: GoalPriority) =>
                  setFormData({ ...formData, priority: value })
                }
              >
                <SelectTrigger className="h-8 w-[110px]">
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                </SelectContent>
              </Select>

              <DatePicker
                id="due-date"
                date={formData.dueDate}
                onDateChange={(date) => setFormData({ ...formData, dueDate: date })}
                placeholder="Due date"
                className="h-8 w-[140px]"
              />

              {/* Assignee selector - only shown when enabled */}
              {showAssignee && assignees.length > 0 && (
                <Select
                  value={formData.assigneeId || "unassigned"}
                  onValueChange={(value) =>
                    setFormData({
                      ...formData,
                      assigneeId: value === "unassigned" ? undefined : value,
                    })
                  }
                >
                  <SelectTrigger className="h-8 w-[160px]">
                    <Users className="mr-1.5 h-3.5 w-3.5" />
                    <SelectValue placeholder={assigneeLabel} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="unassigned">Unassigned</SelectItem>
                    {assignees.map((assignee) => (
                      <SelectItem key={assignee.id} value={assignee.id}>
                        {assignee.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}

              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-8 gap-1 text-xs text-muted-foreground"
                onClick={() => setShowAdvanced(!showAdvanced)}
              >
                {showAdvanced ? (
                  <>
                    <ChevronUp className="h-3 w-3" />
                    Less options
                  </>
                ) : (
                  <>
                    <ChevronDown className="h-3 w-3" />
                    More options
                  </>
                )}
              </Button>
            </div>

            {/* Advanced Options */}
            {showAdvanced && (
              <div className="space-y-3 border-t pt-3">
                <Textarea
                  placeholder="Description (optional)"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={2}
                  className="resize-none"
                />

                {parentGoals.length > 0 && (
                  <div className="space-y-2">
                    <Select
                      value={formData.parentGoalId || "none"}
                      onValueChange={(value) =>
                        setFormData({
                          ...formData,
                          parentGoalId: value === "none" ? undefined : value,
                        })
                      }
                    >
                      <SelectTrigger className="h-8">
                        <SelectValue placeholder="Align to parent goal (optional)" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">No parent goal</SelectItem>
                        {parentGoals.map((goal) => (
                          <SelectItem key={goal.id} value={goal.id}>
                            {goal.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    
                    {showAlignmentSuggestion && !formData.parentGoalId && (
                      <div className="flex items-start gap-2 rounded-md bg-amber-500/10 px-3 py-2 text-xs text-amber-700">
                        <Lightbulb className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                        <span>
                          Aligning goals to company or team objectives helps track how individual efforts contribute to organizational success.
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-2 border-t pt-3">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={handleCancel}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                size="sm"
                onClick={handleSubmit}
                disabled={!formData.title.trim() || isSubmitting}
              >
                {isSubmitting ? "Creating..." : "Create Goal"}
              </Button>
            </div>
          </div>

          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-8 w-8 shrink-0 p-0"
            onClick={handleCancel}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  )
}
