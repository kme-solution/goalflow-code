export async function fetchWithErrorHandling<T>(url: string, options?: RequestInit): Promise<T> {
  try {
    const response = await fetch(url, options)

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()

    if (!data.success) {
      throw new Error(data.error || "Request failed")
    }

    return data as T
  } catch (error) {
    console.error("API request failed:", error)
    throw error
  }
}

export function handleApiError(error: any): string {
  if (error instanceof Error) {
    return error.message
  }
  return "An unexpected error occurred"
}
