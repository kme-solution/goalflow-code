"use client"

import useSWR from "swr"
import { useState } from "react"
import type { GoalProgressRequest } from "@/lib/types/goal.types"

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export function useGoalProgress(goalId: string) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const { data, mutate } = useSWR(`/api/goals/${goalId}/progress`, fetcher, { revalidateOnFocus: false })

  const updateProgress = async (progressData: GoalProgressRequest) => {
    setIsSubmitting(true)
    setError(null)

    try {
      const response = await fetch(`/api/goals/${goalId}/progress`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(progressData),
      })

      if (!response.ok) throw new Error("Failed to update progress")

      await mutate()
      return true
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error")
      return false
    } finally {
      setIsSubmitting(false)
    }
  }

  return {
    progressHistory: data?.history || [],
    isLoading: !data,
    isSubmitting,
    error,
    updateProgress,
  }
}
