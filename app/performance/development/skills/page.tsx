import { Layout } from "@/components/layout"
import { ProtectedRoute } from "@/components/protected-route"

export default function SkillsPage() {
  return (
    <ProtectedRoute allowedRoles={["employee", "manager", "hr_admin", "team_lead"]}>
      <Layout>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">Skills & Competencies</h1>
            <p className="text-gray-600">Track and develop professional skills</p>
          </div>
          <div className="bg-white rounded-lg p-6 border">
            <p className="text-gray-600">Skills tracking coming soon</p>
          </div>
        </div>
      </Layout>
    </ProtectedRoute>
  )
}
