import { Layout } from "@/components/layout"
import { ProtectedRoute } from "@/components/protected-route"

export default function GuidesPage() {
  return (
    <ProtectedRoute>
      <Layout>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">Guides & Documentation</h1>
          </div>
          <div className="space-y-4">
            <div className="bg-white rounded-lg p-6 border">
              <h3 className="font-semibold mb-2">Getting Started</h3>
              <p className="text-gray-600">Learn the basics</p>
            </div>
            <div className="bg-white rounded-lg p-6 border">
              <h3 className="font-semibold mb-2">Managing Goals</h3>
              <p className="text-gray-600">How to create and track goals</p>
            </div>
          </div>
        </div>
      </Layout>
    </ProtectedRoute>
  )
}
