import type React from "react"
import { Layout } from "@/components/layout"
import { ProtectedRoute } from "@/components/protected-route"

export const metadata = {
  title: "Performance - GoalFlow Pro",
  description: "Performance management and check-ins",
}

export default function PerformanceLayout({
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
