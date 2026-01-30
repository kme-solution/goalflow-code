"use client"

import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export default function CompanyGoalsPage() {
  return (
    <div className="space-y-4 p-4 md:p-6">
      <h1 className="text-3xl font-bold">Company Goals</h1>

      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="p-4">
            <div className="space-y-3">
              <div className="font-semibold">Company Strategic Goal {i}</div>
              <div className="text-sm text-muted-foreground">Organization-wide objective for 2024</div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Progress</span>
                  <span>{70 + i * 5}%</span>
                </div>
                <Progress value={70 + i * 5} />
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
