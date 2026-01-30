import { Layout } from "@/components/layout"
import { ProtectedRoute } from "@/components/protected-route"

export default function CustomerDetailPage({
  params,
}: {
  params: { customerId: string }
}) {
  return (
    <ProtectedRoute allowedRoles={["hr_admin"]}>
      <Layout>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">Customer: {params.customerId}</h1>
          </div>
          <div className="bg-white rounded-lg p-6 border">
            <p className="text-gray-600">Customer details coming soon</p>
          </div>
        </div>
      </Layout>
    </ProtectedRoute>
  )
}
