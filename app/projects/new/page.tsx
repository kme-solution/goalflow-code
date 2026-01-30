import { Layout } from "@/components/layout"
import { ProtectedRoute } from "@/components/protected-route"

export default function NewProjectPage() {
  return (
    <ProtectedRoute allowedRoles={["employee", "manager", "team_lead"]}>
      <Layout>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">Create Project</h1>
            <p className="text-gray-600">Start a new cross-functional project</p>
          </div>
          <div className="bg-white rounded-lg p-6 border">
            <p className="text-gray-600">Project creation form coming soon</p>
          </div>
        </div>
      </Layout>
    </ProtectedRoute>
  )
}
