"use client"

import { useState } from "react"
import { Play, Pause, RotateCcw, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import type { FocusSession, DailyGoalProgress } from "@/lib/types/mobile-activity.types"

interface FocusTrackerProps {
  totalFocusTime: number
  targetFocusTime: number
  completedTasks: number
  totalTasks: number
  activeSessions: FocusSession[]
  onStartSession?: (focusType: "deep_work" | "meeting" | "admin" | "break") => void
  activeGoals?: DailyGoalProgress[]
}

export function FocusTracker({
  totalFocusTime,
  targetFocusTime,
  completedTasks,
  totalTasks,
  activeSessions,
  onStartSession,
  activeGoals,
}: FocusTrackerProps) {
  const [selectedFocusType, setSelectedFocusType] = useState<
    "deep_work" | "meeting" | "admin" | "break"
  >("deep_work")
  const focusPercentage = Math.min((totalFocusTime / targetFocusTime) * 100, 100)
  const focusRemaining = Math.max(targetFocusTime - totalFocusTime, 0)

  const focusTypeLabels = {
    deep_work: "Deep Work",
    meeting: "Meeting",
    admin: "Admin",
    break: "Break",
  }

  const focusTypeColors = {
    deep_work: "bg-blue-500",
    meeting: "bg-purple-500",
    admin: "bg-gray-500",
    break: "bg-green-500",
  }

  const currentSession = activeSessions.find((s) => s.status === "active")

  return (
    <div className="space-y-4">
      {/* Main Focus Stats */}
      <Card className="p-4 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-sm">Today's Focus</h3>
            <Badge
              variant="secondary"
              className={
                focusPercentage >= 100
                  ? "bg-success text-white"
                  : focusPercentage >= 75
                    ? "bg-primary text-white"
                    : "bg-yellow-500 text-white"
              }
            >
              {totalFocusTime}m
            </Badge>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Progress</span>
              <span>
                {totalFocusTime} of {targetFocusTime} minutes
              </span>
            </div>
            <Progress value={focusPercentage} className="h-2" />
          </div>

          {focusRemaining > 0 && (
            <p className="text-xs text-muted-foreground">
              {focusRemaining} minutes remaining to reach daily goal
            </p>
          )}

          <div className="grid grid-cols-2 gap-2 pt-2">
            <div className="bg-background/50 rounded-lg p-2">
              <p className="text-xs text-muted-foreground mb-1">Tasks Done</p>
              <p className="text-lg font-bold">
                {completedTasks}
                <span className="text-xs font-normal text-muted-foreground ml-1">
                  /{totalTasks}
                </span>
              </p>
            </div>
            <div className="bg-background/50 rounded-lg p-2">
              <p className="text-xs text-muted-foreground mb-1">Weekly Avg</p>
              <p className="text-lg font-bold">
                235<span className="text-xs font-normal text-muted-foreground ml-1">m</span>
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* Active Session Display */}
      {currentSession && (
        <Card className="p-3 border-primary/30 bg-primary/5">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <p className="text-sm font-semibold">Active Focus Session</p>
            </div>
            <Badge variant="default">
              {focusTypeLabels[currentSession.focusType]}
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground">
            {currentSession.goal ? `Working on: ${currentSession.goal}` : "Focus in progress"}
          </p>
        </Card>
      )}

      {/* Start Focus Session */}
      <div className="space-y-2">
        <p className="text-xs font-medium text-muted-foreground">Start a focus session</p>
        <div className="grid grid-cols-2 gap-2">
          {(Object.keys(focusTypeLabels) as Array<keyof typeof focusTypeLabels>).map(
            (focusType) => (
              <Button
                key={focusType}
                variant={selectedFocusType === focusType ? "default" : "outline"}
                size="sm"
                className="h-auto py-3 flex-col gap-1"
                onClick={() => {
                  setSelectedFocusType(focusType)
                  onStartSession?.(focusType)
                }}
              >
                <Play className="w-4 h-4" />
                <span className="text-xs">{focusTypeLabels[focusType]}</span>
              </Button>
            ),
          )}
        </div>
      </div>

      {/* Related Active Goals */}
      {activeGoals && activeGoals.length > 0 && (
        <Card className="p-3 border-muted">
          <h4 className="text-xs font-semibold mb-2">Contributing to Goals</h4>
          <div className="space-y-2">
            {activeGoals.slice(0, 2).map((goal) => (
              <div key={goal.goalId} className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium truncate">{goal.goalTitle}</p>
                  <p className="text-xs text-muted-foreground">
                    {goal.focusTimeToday}m today
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  {goal.onTrack && (
                    <CheckCircle2 className="w-4 h-4 text-success flex-shrink-0" />
                  )}
                  <Badge variant="outline" className="text-xs">
                    {goal.totalProgress}%
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  )
}
