"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Play, Flag, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import type { DailyGoalProgress } from "@/lib/types/mobile-activity.types"

interface ActiveGoalsProps {
  goals: DailyGoalProgress[]
  onStartSession?: (goalId: string) => void
  onViewGoal?: (goalId: string) => void
}

export function ActiveGoals({ goals, onStartSession, onViewGoal }: ActiveGoalsProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const currentGoal = goals[currentIndex]

  const handleNext = () => {
    setCurrentIndex((i) => (i + 1) % goals.length)
  }

  const handlePrev = () => {
    setCurrentIndex((i) => (i - 1 + goals.length) % goals.length)
  }

  if (!currentGoal) {
    return (
      <Card className="p-4 text-center">
        <p className="text-sm text-muted-foreground">No active goals</p>
      </Card>
    )
  }

  return (
    <div className="space-y-3">
      {/* Goal Card */}
      <Card
        className={`p-4 border-2 transition-all ${
          currentGoal.onTrack
            ? "border-success/30 bg-success/5"
            : "border-yellow-500/30 bg-yellow-500/5"
        }`}
      >
        <div className="space-y-3">
          {/* Header */}
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-sm truncate">{currentGoal.goalTitle}</h3>
              <p className="text-xs text-muted-foreground">
                Due in {currentGoal.daysRemaining} days
              </p>
            </div>
            {!currentGoal.onTrack && (
              <Badge variant="destructive" className="flex-shrink-0">
                <AlertCircle className="w-3 h-3 mr-1" />
                At Risk
              </Badge>
            )}
            {currentGoal.onTrack && (
              <Badge variant="secondary" className="flex-shrink-0 bg-success/20 text-success">
                On Track
              </Badge>
            )}
          </div>

          {/* Progress */}
          <div className="space-y-2">
            <div className="flex justify-between items-end">
              <span className="text-xs text-muted-foreground">Progress</span>
              <span className="text-sm font-semibold">{currentGoal.totalProgress}%</span>
            </div>
            <Progress value={currentGoal.totalProgress} className="h-2" />
            {currentGoal.progressToday > 0 && (
              <p className="text-xs text-success">
                +{currentGoal.progressToday}% added today
              </p>
            )}
          </div>

          {/* Key Stats */}
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-background rounded-lg p-2">
              <p className="text-xs text-muted-foreground mb-1">Focus Time Today</p>
              <p className="text-sm font-bold">
                {currentGoal.focusTimeToday}
                <span className="text-xs font-normal text-muted-foreground ml-1">min</span>
              </p>
            </div>
            <div className="bg-background rounded-lg p-2">
              <p className="text-xs text-muted-foreground mb-1">Next Milestone</p>
              <p className="text-xs font-medium truncate">
                {currentGoal.nextMilestone || "N/A"}
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-2">
            <Button
              size="sm"
              variant="default"
              className="flex-1 h-9 text-xs"
              onClick={() => onStartSession?.(currentGoal.goalId)}
            >
              <Play className="w-3 h-3 mr-1" />
              Start Session
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="flex-1 h-9 text-xs"
              onClick={() => onViewGoal?.(currentGoal.goalId)}
            >
              <Flag className="w-3 h-3 mr-1" />
              Details
            </Button>
          </div>
        </div>
      </Card>

      {/* Navigation */}
      {goals.length > 1 && (
        <div className="flex items-center justify-between gap-2">
          <Button
            size="sm"
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={handlePrev}
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>

          <div className="flex gap-1 justify-center flex-1">
            {goals.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`w-1.5 h-1.5 rounded-full transition ${
                  i === currentIndex ? "bg-primary" : "bg-muted"
                }`}
              />
            ))}
          </div>

          <Button
            size="sm"
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={handleNext}
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      )}

      {/* Goal Counter */}
      <div className="text-center">
        <p className="text-xs text-muted-foreground">
          {currentIndex + 1} of {goals.length} active goals
        </p>
      </div>
    </div>
  )
}
