import type React from "react"
import { Layout } from "@/components/layout"
import { ProtectedRoute } from "@/components/protected-route"

export const metadata = {
  title: "Feed - GoalFlow Pro",
  description: "Activity feed and updates",
}

export default function FeedLayout({
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
