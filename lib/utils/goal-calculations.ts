import type { Goal } from "@/lib/types/goal.types"

export function calculateGoalProgress(goal: Goal): number {
  if (goal.currentValue === undefined || goal.currentValue === null) {
    return 0
  }

  if (goal.targetValue && goal.targetValue > 0) {
    return Math.min((goal.currentValue / goal.targetValue) * 100, 100)
  }

  return goal.progress || 0
}

export function detectGoalRisk(goal: Goal): "low_risk" | "medium_risk" | "high_risk" {
  const startDate = new Date(goal.startDate)
  const endDate = new Date(goal.endDate)
  const today = new Date()

  const totalDays = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
  const daysElapsed = (today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)

  if (daysElapsed < 0) return "low_risk"
  if (daysElapsed > totalDays) return "low_risk"

  const expectedProgress = (daysElapsed / totalDays) * 100
  const actualProgress = goal.progress || 0

  if (actualProgress < expectedProgress - 20) {
    return "high_risk"
  } else if (actualProgress < expectedProgress - 10) {
    return "medium_risk"
  }
  return "low_risk"
}

export function getConfidenceLevel(score: number): "red" | "yellow" | "green" {
  if (score <= 3) return "red"
  if (score <= 7) return "yellow"
  return "green"
}

export function calculateParentGoalProgress(childGoals: Goal[]): number {
  if (childGoals.length === 0) return 0

  const totalWeight = childGoals.reduce((sum, goal) => sum + 1 / childGoals.length, 0)
  const weightedProgress = childGoals.reduce((sum, goal) => {
    return sum + (goal.progress || 0) * (1 / childGoals.length)
  }, 0)

  return Math.round(weightedProgress)
}
