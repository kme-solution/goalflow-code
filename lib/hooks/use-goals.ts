"use client"

import useSWR from "swr"
import type { GoalListResponse } from "@/lib/types/goal.types"

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export function useGoals(userId?: string, type?: string, status?: string) {
  const params = new URLSearchParams()
  if (userId) params.append("userId", userId)
  if (type) params.append("type", type)
  if (status) params.append("status", status)

  const { data, error, isLoading, mutate } = useSWR<GoalListResponse>(
    `/api/goals${params.toString() ? `?${params.toString()}` : ""}`,
    fetcher,
  )

  return {
    goals: data?.goals || [],
    isLoading,
    isError: error,
    mutate,
  }
}
