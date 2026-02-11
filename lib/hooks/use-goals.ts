"use client"

import useSWR from "swr"
import type { GoalListResponse, CreateGoalRequest, UpdateGoalRequest, Goal } from "@/lib/types/goal.types"

// Helper function to get auth headers
const getAuthHeaders = () => {
  const sessionData = typeof window !== "undefined" ? localStorage.getItem("goalflow_session") : null
  const token = sessionData ? JSON.parse(sessionData).token : null

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  return headers
}

// Custom fetcher that includes auth token
const fetcher = async (url: string) => {
  const response = await fetch(url, { headers: getAuthHeaders() })
  return response.json()
}

export function useGoals(userId?: string, type?: string, status?: string, level?: string, teamId?: string) {
  const params = new URLSearchParams()
  if (userId) params.append("userId", userId)
  if (type) params.append("type", type)
  if (status) params.append("status", status)
  if (level) params.append("level", level)
  if (teamId) params.append("teamId", teamId)

  const { data, error, isLoading, mutate } = useSWR<GoalListResponse>(
    `/api/goals${params.toString() ? `?${params.toString()}` : ""}`,
    fetcher,
  )

  const createGoal = async (goalData: CreateGoalRequest): Promise<{ success: boolean; goal?: Goal; error?: string }> => {
    try {
      const response = await fetch("/api/goals", {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(goalData),
      })
      const result = await response.json()

      if (result.success) {
        // Invalidate and refetch goals
        mutate()
        return { success: true, goal: result.goal }
      } else {
        return { success: false, error: result.error }
      }
    } catch (error) {
      return { success: false, error: "Failed to create goal" }
    }
  }

  const updateGoal = async (goalId: string, updateData: UpdateGoalRequest): Promise<{ success: boolean; goal?: Goal; error?: string }> => {
    try {
      const response = await fetch(`/api/goals/${goalId}`, {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify(updateData),
      })
      const result = await response.json()

      if (result.success) {
        // Invalidate and refetch goals
        mutate()
        return { success: true, goal: result.goal }
      } else {
        return { success: false, error: result.error }
      }
    } catch (error) {
      return { success: false, error: "Failed to update goal" }
    }
  }

  const deleteGoal = async (goalId: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const response = await fetch(`/api/goals/${goalId}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      })
      const result = await response.json()

      if (result.success) {
        // Invalidate and refetch goals
        mutate()
        return { success: true }
      } else {
        return { success: false, error: result.error }
      }
    } catch (error) {
      return { success: false, error: "Failed to delete goal" }
    }
  }

  const updateProgress = async (goalId: string, newValue: number, confidence: number, comment?: string, evidenceUrl?: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const response = await fetch(`/api/goals/${goalId}/progress`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify({ newValue, confidence, comment, evidenceUrl }),
      })
      const result = await response.json()

      if (result.success) {
        // Invalidate and refetch goals
        mutate()
        return { success: true }
      } else {
        return { success: false, error: result.error }
      }
    } catch (error) {
      return { success: false, error: "Failed to update progress" }
    }
  }

  return {
    goals: data?.goals || [],
    isLoading,
    isError: error,
    mutate,
    createGoal,
    updateGoal,
    deleteGoal,
    updateProgress,
  }
}
