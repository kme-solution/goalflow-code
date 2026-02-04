// Daily activity and focus tracking types for mobile
export type FocusSessionStatus = "idle" | "active" | "paused" | "completed"
export type SatisfactionLevel = 1 | 2 | 3 | 4 | 5
export type AlertSeverity = "info" | "warning" | "critical"
export type AlertType = "deadline" | "focus" | "progress" | "milestone"

export interface FocusSession {
  id: string
  userId: string
  startTime: string
  endTime?: string
  duration: number // in minutes
  goal?: string
  status: FocusSessionStatus
  focusType: "deep_work" | "meeting" | "admin" | "break"
  createdAt: string
}

export interface DailySatisfaction {
  id: string
  userId: string
  date: string
  moodRating: SatisfactionLevel
  moodNote?: string
  goalRatings: GoalSatisfaction[]
  overallTrend?: "up" | "down" | "stable"
  createdAt: string
  updatedAt: string
}

export interface GoalSatisfaction {
  goalId: string
  goalTitle: string
  rating: SatisfactionLevel
  note?: string
}

export interface DailyAlert {
  id: string
  userId: string
  type: AlertType
  severity: AlertSeverity
  title: string
  description?: string
  relatedGoalId?: string
  daysUntil?: number
  actionRequired?: boolean
  actionUrl?: string
  createdAt: string
  dismissedAt?: string
}

export interface DailyActivitySummary {
  id: string
  userId: string
  date: string
  totalFocusTime: number // in minutes
  focusSessions: FocusSession[]
  targetFocusTime: number // daily target in minutes
  highPriorityTasksCompleted: number
  highPriorityTasksTotal: number
  satisfaction?: DailySatisfaction
  alerts: DailyAlert[]
  timeline: TimelineEvent[]
  activeGoals: DailyGoalProgress[]
  createdAt: string
  updatedAt: string
}

export interface TimelineEvent {
  id: string
  time: string // HH:MM format
  period: "morning" | "afternoon" | "evening"
  title: string
  type: "focus" | "meeting" | "task" | "milestone"
  status: "completed" | "in_progress" | "upcoming"
  goalId?: string
}

export interface DailyGoalProgress {
  goalId: string
  goalTitle: string
  progressToday: number // percentage points added today
  totalProgress: number // current total percentage
  focusTimeToday: number // minutes spent on this goal today
  onTrack: boolean
  nextMilestone?: string
  daysRemaining: number
}

export interface MobileActivityRequest {
  focusMinutes?: number
  focusType?: "deep_work" | "meeting" | "admin" | "break"
  moodRating?: SatisfactionLevel
  goalSatisfactions?: GoalSatisfaction[]
  goalProgressUpdate?: {
    goalId: string
    minutesLogged: number
  }
}
