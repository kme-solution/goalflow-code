import useSWR from "swr"
import type { RecognitionListResponse, Recognition, CreateRecognitionRequest } from "@/lib/types/recognition.types"

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export function useRecognitions(type?: "given" | "received" | "all", badge?: string) {
  const params = new URLSearchParams()
  if (type) params.append("type", type)
  if (badge) params.append("badge", badge)

  const { data, error, isLoading, mutate } = useSWR<RecognitionListResponse>(
    `/api/recognition${params.toString() ? `?${params.toString()}` : ""}`,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
    }
  )

  const recognitions = data?.recognitions || []

  const createRecognition = async (payload: CreateRecognitionRequest) => {
    try {
      const response = await fetch("/api/recognition", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      const result = await response.json()
      if (result.success) {
        mutate()
        return { success: true, recognition: result.recognition }
      }
      return { success: false, error: result.error }
    } catch (err) {
      return { success: false, error: "Failed to create recognition" }
    }
  }

  const updateRecognition = async (id: string, payload: Partial<CreateRecognitionRequest>) => {
    try {
      const response = await fetch(`/api/recognition/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      const result = await response.json()
      if (result.success) {
        mutate()
        return { success: true, recognition: result.recognition }
      }
      return { success: false, error: result.error }
    } catch (err) {
      return { success: false, error: "Failed to update recognition" }
    }
  }

  const deleteRecognition = async (id: string) => {
    try {
      const response = await fetch(`/api/recognition/${id}`, {
        method: "DELETE",
      })

      const result = await response.json()
      if (result.success) {
        mutate()
        return { success: true }
      }
      return { success: false, error: result.error }
    } catch (err) {
      return { success: false, error: "Failed to delete recognition" }
    }
  }

  const likeRecognition = async (id: string) => {
    try {
      const response = await fetch(`/api/recognition/${id}/like`, {
        method: "POST",
      })

      const result = await response.json()
      if (result.success) {
        mutate()
        return { success: true, likes: result.likes }
      }
      return { success: false, error: result.error }
    } catch (err) {
      return { success: false, error: "Failed to like recognition" }
    }
  }

  const unlikeRecognition = async (id: string) => {
    try {
      const response = await fetch(`/api/recognition/${id}/like`, {
        method: "DELETE",
      })

      const result = await response.json()
      if (result.success) {
        mutate()
        return { success: true, likes: result.likes }
      }
      return { success: false, error: result.error }
    } catch (err) {
      return { success: false, error: "Failed to unlike recognition" }
    }
  }

  return {
    recognitions,
    isLoading,
    isError: !!error,
    mutate,
    createRecognition,
    updateRecognition,
    deleteRecognition,
    likeRecognition,
    unlikeRecognition,
  }
}
