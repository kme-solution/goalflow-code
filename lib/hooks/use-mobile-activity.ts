"use client"

import useSWR from "swr"
import type { DailyActivitySummary, MobileActivityRequest } from "@/lib/types/mobile-activity.types"
import { MOCK_DAILY_ACTIVITY_SUMMARY } from "@/lib/mock-data/mobile-activities"

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export function useMobileActivity(userId?: string, date?: string) {
  const params = new URLSearchParams()
  if (userId) params.append("userId", userId)
  if (date) params.append("date", date)

  const { data, error, isLoading, mutate } = useSWR<{
    success: boolean
    data?: DailyActivitySummary
    error?: string
  }>(
    userId ? `/api/mobile/activity${params.toString() ? `?${params.toString()}` : ""}` : null,
    fetcher,
    {
      fallbackData: {
        success: true,
        data: MOCK_DAILY_ACTIVITY_SUMMARY,
      },
    },
  )

  return {
    activity: data?.data || MOCK_DAILY_ACTIVITY_SUMMARY,
    isLoading,
    isError: error,
    mutate,
  }
}

export async function logMobileActivity(userId: string, activity: MobileActivityRequest) {
  try {
    const response = await fetch("/api/mobile/activity", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId,
        ...activity,
        timestamp: new Date().toISOString(),
      }),
    })

    if (!response.ok) throw new Error("Failed to log activity")
    return await response.json()
  } catch (error) {
    console.error("Error logging activity:", error)
    throw error
  }
}
