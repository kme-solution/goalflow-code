"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Plus } from "lucide-react"

export default function MyGoalsPage() {
  return (
    <div className="space-y-4 p-4 md:p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">My Goals</h1>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Create Goal
        </Button>
      </div>

      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="p-4">
            <div className="space-y-3">
              <div className="font-semibold">Goal Title {i}</div>
              <div className="text-sm text-muted-foreground">Description of the goal and what success looks like</div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Progress</span>
                  <span className="font-semibold">{60 + i * 10}%</span>
                </div>
                <Progress value={60 + i * 10} />
              </div>
              <div className="flex gap-2">
                <div className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-semibold text-green-800">
                  On Track
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
