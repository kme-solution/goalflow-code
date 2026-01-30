import { Layout } from "@/components/layout"
import { ProtectedRoute } from "@/components/protected-route"

export default function UserGoalsPage({ params }: { params: { userId: string } }) {
  return (
    <ProtectedRoute allowedRoles={["hr_admin", "manager", "ceo"]}>
      <Layout>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">User Goals - {params.userId}</h1>
            <p className="text-gray-600">View goals for this user</p>
          </div>
          <div className="bg-white rounded-lg p-6 border">
            <p className="text-gray-600">User goals coming soon</p>
          </div>
        </div>
      </Layout>
    </ProtectedRoute>
  )
}
