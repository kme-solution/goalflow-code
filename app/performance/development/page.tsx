"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function DevelopmentPage() {
  return (
    <div className="space-y-4 p-4 md:p-6">
      <h1 className="text-3xl font-bold">Development Plan</h1>

      <Card className="p-6">
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold">Skills & Competencies</h3>
            <div className="mt-3 space-y-2">
              {["Leadership", "Technical Excellence", "Communication"].map((skill) => (
                <div key={skill} className="flex items-center justify-between">
                  <span className="text-sm">{skill}</span>
                  <Badge variant="secondary">Intermediate</Badge>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t pt-4">
            <h3 className="font-semibold">Development Goals</h3>
            <div className="mt-3 space-y-2 text-sm">
              <div>✓ Complete advanced leadership training</div>
              <div>✓ Lead cross-functional project</div>
              <div>✓ Mentor junior team member</div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
