"use client"

import useSWR from "swr"
import type { RecognitionListResponse } from "@/lib/types/recognition.types"

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export function useRecognitions(userId?: string, type?: string) {
  const params = new URLSearchParams()
  if (userId) params.append("userId", userId)
  if (type) params.append("type", type)

  const { data, error, isLoading, mutate } = useSWR<RecognitionListResponse>(
    `/api/recognitions${params.toString() ? `?${params.toString()}` : ""}`,
    fetcher,
  )

  return {
    recognitions: data?.recognitions || [],
    isLoading,
    isError: error,
    mutate,
  }
}
