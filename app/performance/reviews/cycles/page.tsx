import { Layout } from "@/components/layout"
import { ProtectedRoute } from "@/components/protected-route"

export default function ReviewCyclesPage() {
  return (
    <ProtectedRoute allowedRoles={["hr_admin", "manager"]}>
      <Layout>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">Review Cycles</h1>
            <p className="text-gray-600">Manage performance review cycles</p>
          </div>
          <div className="bg-white rounded-lg p-6 border">
            <p className="text-gray-600">Review cycles configuration coming soon</p>
          </div>
        </div>
      </Layout>
    </ProtectedRoute>
  )
}
