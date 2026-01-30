import { Layout } from "@/components/layout"
import { ProtectedRoute } from "@/components/protected-route"

export default function CareerPathsPage() {
  return (
    <ProtectedRoute allowedRoles={["employee", "manager", "hr_admin", "team_lead"]}>
      <Layout>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">Career Paths</h1>
            <p className="text-gray-600">Explore and plan your career journey</p>
          </div>
          <div className="bg-white rounded-lg p-6 border">
            <p className="text-gray-600">Career paths coming soon</p>
          </div>
        </div>
      </Layout>
    </ProtectedRoute>
  )
}
