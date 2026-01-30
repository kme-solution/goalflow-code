"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Plus } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import GoalForm, { type GoalFormData } from "@/components/goals/GoalForm"

interface Goal {
  id: string
  title: string
  description: string
  progress: number
  status: "on_track" | "at_risk" | "completed"
}

export default function MyGoalsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [goals, setGoals] = useState<Goal[]>([
    {
      id: "1",
      title: "Complete Q1 Performance Review",
      description: "Finish all performance evaluations for direct reports",
      progress: 70,
      status: "on_track",
    },
    {
      id: "2",
      title: "Launch New Feature",
      description: "Ship the dashboard redesign to production",
      progress: 80,
      status: "on_track",
    },
    {
      id: "3",
      title: "Improve Customer Satisfaction",
      description: "Increase NPS score by 10 points",
      progress: 45,
      status: "at_risk",
    },
  ])

  const handleCreateGoal = async (data: GoalFormData) => {
    setIsLoading(true)
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500))
    
    const newGoal: Goal = {
      id: `goal-${Date.now()}`,
      title: data.title,
      description: data.description,
      progress: 0,
      status: "on_track",
    }
    
    setGoals([newGoal, ...goals])
    setIsLoading(false)
    setIsModalOpen(false)
  }

  const getStatusBadge = (status: Goal["status"]) => {
    switch (status) {
      case "on_track":
        return (
          <div className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-semibold text-green-800">
            On Track
          </div>
        )
      case "at_risk":
        return (
          <div className="inline-flex items-center rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-semibold text-amber-800">
            At Risk
          </div>
        )
      case "completed":
        return (
          <div className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-semibold text-blue-800">
            Completed
          </div>
        )
    }
  }

  return (
    <div className="space-y-4 p-4 md:p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">My Goals</h1>
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Create Goal
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[550px]">
            <DialogHeader>
              <DialogTitle>Create New Goal</DialogTitle>
              <DialogDescription>
                Define your goal and set measurable targets to track your progress.
              </DialogDescription>
            </DialogHeader>
            <GoalForm
              onSubmit={handleCreateGoal}
              onCancel={() => setIsModalOpen(false)}
              isLoading={isLoading}
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-4">
        {goals.map((goal) => (
          <Card key={goal.id} className="p-4">
            <div className="space-y-3">
              <div className="font-semibold">{goal.title}</div>
              <div className="text-sm text-muted-foreground">{goal.description}</div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Progress</span>
                  <span className="font-semibold">{goal.progress}%</span>
                </div>
                <Progress value={goal.progress} />
              </div>
              <div className="flex gap-2">{getStatusBadge(goal.status)}</div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
