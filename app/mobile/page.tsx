"use client"

import { useState } from "react"
import { DashboardHeader } from "@/components/dashboard-header"
import { Layout } from "@/components/layout"
import { AlertHub } from "@/components/mobile/AlertHub"
import { FocusTracker } from "@/components/mobile/FocusTracker"
import { SatisfactionTracker } from "@/components/mobile/SatisfactionTracker"
import { ActiveGoals } from "@/components/mobile/ActiveGoals"
import { TimelineView } from "@/components/mobile/TimelineView"
import { useMobileActivity, logMobileActivity } from "@/lib/hooks/use-mobile-activity"
import { Card } from "@/components/ui/card"
import type { DailyAlert, SatisfactionLevel } from "@/lib/types/mobile-activity.types"

export default function MobileHomePage() {
  const { activity } = useMobileActivity("emp-001")
  const [dismissedAlerts, setDismissedAlerts] = useState<Set<string>>(new Set())

  const handleAlertDismiss = (alertId: string) => {
    setDismissedAlerts((prev) => new Set([...prev, alertId]))
  }

  const handleStartFocusSession = (focusType: "deep_work" | "meeting" | "admin" | "break") => {
    logMobileActivity("emp-001", { focusType }).catch(console.error)
  }

  const handleStartGoalSession = (goalId: string) => {
    logMobileActivity("emp-001", { 
      goalProgressUpdate: { goalId, minutesLogged: 0 }
    }).catch(console.error)
  }

  const handleMoodUpdate = (rating: SatisfactionLevel, note?: string) => {
    console.log("[v0] Mood updated:", { rating, note })
  }

  const handleGoalRatingUpdate = (goalId: string, rating: SatisfactionLevel, note?: string) => {
    console.log("[v0] Goal satisfaction updated:", { goalId, rating, note })
  }

  const visibleAlerts = activity.alerts.filter((a) => !dismissedAlerts.has(a.id))

  return (
    <Layout>
      <div className="space-y-6 pb-24 md:pb-6">
        <DashboardHeader 
          title="Today" 
          description="Your daily activity, focus, and progress" 
        />

        <div className="grid gap-4">
          {/* Alert Hub - Top Priority */}
          {visibleAlerts.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold mb-2 text-foreground/70">Alerts & Warnings</h3>
              <AlertHub 
                alerts={visibleAlerts} 
                onDismiss={handleAlertDismiss}
                onAction={(id, url) => {
                  if (url) window.location.href = url
                  handleAlertDismiss(id)
                }}
              />
            </div>
          )}

          {/* Focus Tracker */}
          <div>
            <h3 className="text-sm font-semibold mb-2 text-foreground/70">Focus & Productivity</h3>
            <FocusTracker
              totalFocusTime={activity.totalFocusTime}
              targetFocusTime={activity.targetFocusTime}
              completedTasks={activity.highPriorityTasksCompleted}
              totalTasks={activity.highPriorityTasksTotal}
              activeSessions={activity.focusSessions}
              onStartSession={handleStartFocusSession}
              activeGoals={activity.activeGoals}
            />
          </div>

          {/* Satisfaction Tracker */}
          <div>
            <h3 className="text-sm font-semibold mb-2 text-foreground/70">Daily Satisfaction</h3>
            <SatisfactionTracker
              satisfaction={activity.satisfaction}
              onMoodUpdate={handleMoodUpdate}
              onGoalRatingUpdate={handleGoalRatingUpdate}
            />
          </div>

          {/* Active Goals - Swipeable */}
          <div>
            <h3 className="text-sm font-semibold mb-2 text-foreground/70">Active Goals</h3>
            <ActiveGoals
              goals={activity.activeGoals}
              onStartSession={handleStartGoalSession}
              onViewGoal={(goalId) => {
                window.location.href = `/goals/my`
              }}
            />
          </div>

          {/* Timeline View */}
          <div>
            <h3 className="text-sm font-semibold mb-2 text-foreground/70">Today's Timeline</h3>
            <TimelineView events={activity.timeline} />
          </div>

          {/* Daily Summary Stats */}
          <Card className="p-4 bg-gradient-to-br from-muted/50 to-muted/30">
            <h3 className="text-sm font-semibold mb-3">Daily Summary</h3>
            <div className="grid grid-cols-2 gap-2 text-center">
              <div className="p-2">
                <p className="text-xs text-muted-foreground mb-1">Focus Time</p>
                <p className="text-lg font-bold">{activity.totalFocusTime}m</p>
              </div>
              <div className="p-2">
                <p className="text-xs text-muted-foreground mb-1">Target</p>
                <p className="text-lg font-bold">{activity.targetFocusTime}m</p>
              </div>
              <div className="p-2">
                <p className="text-xs text-muted-foreground mb-1">Tasks Done</p>
                <p className="text-lg font-bold">
                  {activity.highPriorityTasksCompleted}/{activity.highPriorityTasksTotal}
                </p>
              </div>
              <div className="p-2">
                <p className="text-xs text-muted-foreground mb-1">Mood</p>
                <p className="text-lg font-bold">
                  {activity.satisfaction?.moodRating || "-"}
                  <span className="text-xs font-normal ml-1">/5</span>
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </Layout>
  )
}
