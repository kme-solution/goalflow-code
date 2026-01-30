import { Layout } from "@/components/layout"
import { ProtectedRoute } from "@/components/protected-route"

export default function ProjectGoalsPage({ params }: { params: { projectId: string } }) {
  return (
    <ProtectedRoute allowedRoles={["employee", "manager", "team_lead"]}>
      <Layout>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">Project Goals - {params.projectId}</h1>
          </div>
          <div className="bg-white rounded-lg p-6 border">
            <p className="text-gray-600">Project goals coming soon</p>
          </div>
        </div>
      </Layout>
    </ProtectedRoute>
  )
}
