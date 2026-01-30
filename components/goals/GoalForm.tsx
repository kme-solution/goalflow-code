"use client"

import { useState } from "react"
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
import { DatePicker } from "@/components/ui/date-picker"

interface GoalFormProps {
  onSubmit: (data: GoalFormData) => void
  onCancel: () => void
  isLoading?: boolean
}

export interface GoalFormData {
  title: string
  description: string
  type: "company" | "department" | "individual"
  priority: "low" | "medium" | "high" | "critical"
  startDate: string
  dueDate: string
  targetValue?: number
  unit?: string
}

export default function GoalForm({ onSubmit, onCancel, isLoading }: GoalFormProps) {
  const [formData, setFormData] = useState<GoalFormData>({
    title: "",
    description: "",
    type: "individual",
    priority: "medium",
    startDate: new Date().toISOString().split("T")[0],
    dueDate: "",
    targetValue: undefined,
    unit: "",
  })

  const [startDate, setStartDate] = useState<Date | undefined>(new Date())
  const [dueDate, setDueDate] = useState<Date | undefined>(undefined)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({
      ...formData,
      startDate: startDate ? startDate.toISOString().split("T")[0] : "",
      dueDate: dueDate ? dueDate.toISOString().split("T")[0] : "",
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Goal Title</Label>
        <Input
          id="title"
          placeholder="Enter goal title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          placeholder="Describe your goal and what success looks like"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows={3}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="type">Goal Type</Label>
          <Select
            value={formData.type}
            onValueChange={(value: "company" | "department" | "individual") =>
              setFormData({ ...formData, type: value })
            }
          >
            <SelectTrigger id="type">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="individual">Individual</SelectItem>
              <SelectItem value="department">Department</SelectItem>
              <SelectItem value="company">Company</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="priority">Priority</Label>
          <Select
            value={formData.priority}
            onValueChange={(value: "low" | "medium" | "high" | "critical") =>
              setFormData({ ...formData, priority: value })
            }
          >
            <SelectTrigger id="priority">
              <SelectValue placeholder="Select priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="critical">Critical</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="startDate">Start Date</Label>
          <DatePicker
            id="startDate"
            date={startDate}
            onDateChange={setStartDate}
            placeholder="Select start date"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="dueDate">Due Date</Label>
          <DatePicker
            id="dueDate"
            date={dueDate}
            onDateChange={setDueDate}
            placeholder="Select due date"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="targetValue">Target Value (optional)</Label>
          <Input
            id="targetValue"
            type="number"
            placeholder="e.g., 100"
            value={formData.targetValue || ""}
            onChange={(e) =>
              setFormData({
                ...formData,
                targetValue: e.target.value ? Number(e.target.value) : undefined,
              })
            }
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="unit">Unit (optional)</Label>
          <Input
            id="unit"
            placeholder="e.g., %, hours, tasks"
            value={formData.unit}
            onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
          />
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <Button type="button" variant="outline" onClick={onCancel} disabled={isLoading}>
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading || !dueDate}>
          {isLoading ? "Creating..." : "Create Goal"}
        </Button>
      </div>
    </form>
  )
}
