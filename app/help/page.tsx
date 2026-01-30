import { Layout } from "@/components/layout"
import { ProtectedRoute } from "@/components/protected-route"

export default function HelpPage() {
  return (
    <ProtectedRoute>
      <Layout>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">Help & Support</h1>
            <p className="text-gray-600">Get help with GoalFlow Pro</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg p-6 border">
              <h3 className="font-semibold mb-2">Guides</h3>
              <p className="text-gray-600">Learn how to use GoalFlow Pro</p>
            </div>
            <div className="bg-white rounded-lg p-6 border">
              <h3 className="font-semibold mb-2">Contact Us</h3>
              <p className="text-gray-600">Get in touch with support</p>
            </div>
          </div>
        </div>
      </Layout>
    </ProtectedRoute>
  )
}
