import type React from "react"
import { Layout } from "@/components/layout"
import { ProtectedRoute } from "@/components/protected-route"

export const metadata = {
  title: "Goals - GoalFlow Pro",
  description: "Goal management and tracking",
}

export default function GoalsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ProtectedRoute>
      <Layout>{children}</Layout>
    </ProtectedRoute>
  )
}
