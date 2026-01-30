import { Layout } from "@/components/layout"
import { ProtectedRoute } from "@/components/protected-route"

export default function ContactPage() {
  return (
    <ProtectedRoute>
      <Layout>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">Contact Support</h1>
          </div>
          <div className="bg-white rounded-lg p-6 border max-w-2xl">
            <p className="text-gray-600">Support contact form coming soon</p>
          </div>
        </div>
      </Layout>
    </ProtectedRoute>
  )
}
