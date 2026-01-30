import { Layout } from "@/components/layout"
import { ProtectedRoute } from "@/components/protected-route"

export default function OnboardingPage() {
  return (
    <ProtectedRoute allowedRoles={["hr_admin"]}>
      <Layout>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">Onboarding Workflows</h1>
            <p className="text-gray-600">Manage new employee onboarding processes</p>
          </div>
          <div className="bg-white rounded-lg p-6 border">
            <p className="text-gray-600">Onboarding workflows coming soon</p>
          </div>
        </div>
      </Layout>
    </ProtectedRoute>
  )
}
