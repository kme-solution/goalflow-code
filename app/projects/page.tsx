import { Layout } from "@/components/layout"
import { ProtectedRoute } from "@/components/protected-route"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function ProjectsPage() {
  return (
    <ProtectedRoute allowedRoles={["employee", "manager", "team_lead"]}>
      <Layout>
        <div className="space-y-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold">Projects</h1>
              <p className="text-gray-600">Manage cross-functional collaboration</p>
            </div>
            <Link href="/projects/new">
              <Button>New Project</Button>
            </Link>
          </div>
          <div className="bg-white rounded-lg p-6 border">
            <p className="text-gray-600">Projects coming soon</p>
          </div>
        </div>
      </Layout>
    </ProtectedRoute>
  )
}
