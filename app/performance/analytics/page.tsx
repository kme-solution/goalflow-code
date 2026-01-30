import { Layout } from "@/components/layout"
import { ProtectedRoute } from "@/components/protected-route"

export default function PerformanceAnalyticsPage() {
  return (
    <ProtectedRoute allowedRoles={["hr_admin", "manager", "ceo"]}>
      <Layout>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">Performance Analytics</h1>
            <p className="text-gray-600">View team and organizational performance metrics</p>
          </div>
          <div className="bg-white rounded-lg p-6 border">
            <p className="text-gray-600">Performance analytics coming soon</p>
          </div>
        </div>
      </Layout>
    </ProtectedRoute>
  )
}
