import { Layout } from "@/components/layout"
import { ProtectedRoute } from "@/components/protected-route"

export default function SupportPage() {
  return (
    <ProtectedRoute allowedRoles={["hr_admin"]}>
      <Layout>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">Support Tickets</h1>
            <p className="text-gray-600">Manage customer support tickets</p>
          </div>
          <div className="bg-white rounded-lg p-6 border">
            <p className="text-gray-600">Support tickets coming soon</p>
          </div>
        </div>
      </Layout>
    </ProtectedRoute>
  )
}
