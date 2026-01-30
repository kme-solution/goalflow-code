import type React from "react"
import { Layout } from "@/components/layout"
import { ProtectedRoute } from "@/components/protected-route"

export const metadata = {
  title: "Recognition - GoalFlow Pro",
  description: "Give and receive recognition",
}

export default function RecognitionLayout({
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
