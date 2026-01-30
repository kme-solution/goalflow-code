"use client"

import useSWR from "swr"
import type { ReviewListResponse } from "@/lib/types/review.types"

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export function useReviews(employeeId?: string, managerId?: string, status?: string) {
  const params = new URLSearchParams()
  if (employeeId) params.append("employeeId", employeeId)
  if (managerId) params.append("managerId", managerId)
  if (status) params.append("status", status)

  const { data, error, isLoading, mutate } = useSWR<ReviewListResponse>(
    `/api/reviews${params.toString() ? `?${params.toString()}` : ""}`,
    fetcher,
  )

  return {
    reviews: data?.reviews || [],
    isLoading,
    isError: error,
    mutate,
  }
}
