import type React from "react"
import { Layout } from "@/components/layout"
import { ProtectedRoute } from "@/components/protected-route"

export const metadata = {
  title: "Profile - GoalFlow Pro",
  description: "User profile and settings",
}

export default function ProfileLayout({
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
