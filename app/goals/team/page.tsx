"use client"

import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export default function TeamGoalsPage() {
  return (
    <div className="space-y-4 p-4 md:p-6">
      <h1 className="text-3xl font-bold">Team Goals</h1>

      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="p-4">
            <div className="space-y-3">
              <div className="font-semibold">Team Goal {i}</div>
              <div className="text-sm text-muted-foreground">Led by Team Lead Name</div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Progress</span>
                  <span>{50 + i * 10}%</span>
                </div>
                <Progress value={50 + i * 10} />
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
