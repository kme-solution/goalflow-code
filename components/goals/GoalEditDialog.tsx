"use client"

import { useState, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { CalendarIcon, Loader2, Target, AlertTriangle } from "lucide-react"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import type { GoalData, GoalStatus, GoalPriority } from "./GoalCard"

interface ParentGoal {
  id: string
  title: string
}

interface GoalEditDialogProps {
  goal: GoalData | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (goal: GoalData) => Promise<void>
  parentGoals?: ParentGoal[]
  canEditAllFields?: boolean // false = can only update progress/status
}

const statusOptions: { value: GoalStatus; label: string }[] = [
  { value: "draft", label: "Draft" },
  { value: "on_track", label: "On Track" },
  { value: "at_risk", label: "At Risk" },
  { value: "completed", label: "Completed" },
]

const priorityOptions: { value: GoalPriority; label: string }[] = [
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
  { value: "critical", label: "Critical" },
]

export function GoalEditDialog({
  goal,
  open,
  onOpenChange,
  onSave,
  parentGoals = [],
  canEditAllFields = true,
}: GoalEditDialogProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [status, setStatus] = useState<GoalStatus>("on_track")
  const [priority, setPriority] = useState<GoalPriority>("medium")
  const [progress, setProgress] = useState(0)
  const [dueDate, setDueDate] = useState<Date | undefined>()
  const [parentGoalId, setParentGoalId] = useState<string>("")

  // Reset form when goal changes
  useEffect(() => {
    if (goal) {
      setTitle(goal.title)
      setDescription(goal.description)
      setStatus(goal.status)
      setProgress(goal.progress)
      setPriority(goal.priority)
      setDueDate(goal.dueDate ? new Date(goal.dueDate) : undefined)
      // Find parent goal ID from title
      const parent = parentGoals.find(p => p.title === goal.parentGoal)
      setParentGoalId(parent?.id || "")
    }
  }, [goal, parentGoals])

  const handleSave = async () => {
    if (!goal) return
    
    setIsLoading(true)
    try {
      const updatedGoal: GoalData = {
        ...goal,
        title: canEditAllFields ? title : goal.title,
        description: canEditAllFields ? description : goal.description,
        status,
        priority: canEditAllFields ? priority : goal.priority,
        progress,
        dueDate: canEditAllFields && dueDate 
          ? format(dueDate, "MMM d, yyyy")
          : goal.dueDate,
        parentGoal: canEditAllFields 
          ? parentGoals.find(p => p.id === parentGoalId)?.title 
          : goal.parentGoal,
      }
      await onSave(updatedGoal)
      onOpenChange(false)
    } finally {
      setIsLoading(false)
    }
  }

  if (!goal) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {canEditAllFields ? "Edit Goal" : "Update Progress"}
          </DialogTitle>
          <DialogDescription>
            {canEditAllFields 
              ? "Modify goal details, status, and alignment."
              : "Update the progress and status of this goal. Other fields can only be modified by the goal owner or manager."}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Title - only editable if canEditAllFields */}
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            {canEditAllFields ? (
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Goal title"
              />
            ) : (
              <p className="rounded-md border bg-muted/50 px-3 py-2 text-sm">
                {goal.title}
              </p>
            )}
          </div>

          {/* Description - only editable if canEditAllFields */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            {canEditAllFields ? (
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe the goal and key results"
                rows={3}
              />
            ) : (
              <p className="rounded-md border bg-muted/50 px-3 py-2 text-sm">
                {goal.description}
              </p>
            )}
          </div>

          {/* Progress - always editable */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>Progress</Label>
              <Badge variant="outline" className="font-mono">
                {progress}%
              </Badge>
            </div>
            <Slider
              value={[progress]}
              onValueChange={([value]) => setProgress(value)}
              max={100}
              step={5}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>0%</span>
              <span>50%</span>
              <span>100%</span>
            </div>
          </div>

          {/* Status - always editable */}
          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select value={status} onValueChange={(v) => setStatus(v as GoalStatus)}>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                {statusOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    <div className="flex items-center gap-2">
                      {option.value === "at_risk" && (
                        <AlertTriangle className="h-3 w-3 text-amber-500" />
                      )}
                      {option.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Priority - only editable if canEditAllFields */}
          {canEditAllFields && (
            <div className="space-y-2">
              <Label htmlFor="priority">Priority</Label>
              <Select value={priority} onValueChange={(v) => setPriority(v as GoalPriority)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  {priorityOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Due Date - only editable if canEditAllFields */}
          {canEditAllFields && (
            <div className="space-y-2">
              <Label>Due Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !dueDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dueDate ? format(dueDate, "PPP") : "Select due date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={dueDate}
                    onSelect={setDueDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          )}

          {/* Parent Goal Alignment - only editable if canEditAllFields */}
          {canEditAllFields && parentGoals.length > 0 && (
            <div className="space-y-2">
              <Label htmlFor="parentGoal">
                <div className="flex items-center gap-2">
                  <Target className="h-4 w-4" />
                  Aligned to
                </div>
              </Label>
              <Select value={parentGoalId} onValueChange={setParentGoalId}>
                <SelectTrigger>
                  <SelectValue placeholder="Select parent goal (optional)" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">None</SelectItem>
                  {parentGoals.map((parent) => (
                    <SelectItem key={parent.id} value={parent.id}>
                      {parent.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                Link this goal to a higher-level objective for alignment tracking.
              </p>
            </div>
          )}

          {/* Info about restricted editing */}
          {!canEditAllFields && (
            <div className="rounded-md border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800">
              <p className="font-medium">Limited Edit Access</p>
              <p className="mt-1 text-xs">
                You can update progress and status. Contact the goal owner or your manager to modify other fields.
              </p>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isLoading}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={isLoading || (canEditAllFields && !title.trim())}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
