"use client"

import { Layout } from "@/components/layout"
import { useAuth } from "@/components/auth-provider"
import EmployeeDashboard from "@/components/dashboard/EmployeeDashboard"
import ManagerDashboard from "@/components/dashboard/ManagerDashboard"
import HRDashboard from "@/components/dashboard/HRDashboard"
import ExecutiveDashboard from "@/components/dashboard/CEODashboard"
import TeamLeadDashboard from "@/components/dashboard/TeamLeadDashboard"
import { LoadingState } from "@/components/loading-state"
import { ProtectedRoute } from "@/components/protected-route"

function DashboardContent() {
  const { user } = useAuth()

  if (!user) {
    return <LoadingState />
  }

  const dashboardComponents = {
    employee: <EmployeeDashboard userId={user.id} />,
    manager: <ManagerDashboard userId={user.id} />,
    hr_admin: <HRDashboard />,
    ceo: <ExecutiveDashboard />,
    team_lead: <TeamLeadDashboard userId={user.id} />,
  }

  return (
    <Layout>
      {dashboardComponents[user.role as keyof typeof dashboardComponents] || dashboardComponents.employee}
    </Layout>
  )
}

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  )
}
