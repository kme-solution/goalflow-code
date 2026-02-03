import type React from "react"
import { Layout } from "@/components/layout"
import { ProtectedRoute } from "@/components/protected-route"

export const metadata = {
  title: "Admin - GoalFlow Pro",
  description: "Administration and configuration",
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ProtectedRoute allowedRoles={["hr_admin"]}>
      <Layout>{children}</Layout>
    </ProtectedRoute>
  )
}
