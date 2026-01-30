"use client"

import useSWR from "swr"
import type { EmployeeListResponse } from "@/lib/types/employee.types"

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export function useEmployees(departmentId?: string, managerId?: string, status?: string) {
  const params = new URLSearchParams()
  if (departmentId) params.append("departmentId", departmentId)
  if (managerId) params.append("managerId", managerId)
  if (status) params.append("status", status)

  const { data, error, isLoading, mutate } = useSWR<EmployeeListResponse>(
    `/api/employees${params.toString() ? `?${params.toString()}` : ""}`,
    fetcher,
  )

  return {
    employees: data?.employees || [],
    total: data?.total || 0,
    isLoading,
    isError: error,
    mutate,
  }
}
