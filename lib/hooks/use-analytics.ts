"use client"

import useSWR from "swr"
import type { AnalyticsResponse } from "@/lib/types/analytics.types"

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export function useAnalytics() {
  const { data, error, isLoading } = useSWR<AnalyticsResponse>("/api/analytics/performance", fetcher)

  return {
    metrics: data?.metrics,
    departmentPerformance: data?.departmentPerformance || [],
    engagement: data?.engagement,
    isLoading,
    isError: error,
  }
}
