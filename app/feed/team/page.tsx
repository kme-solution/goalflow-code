"use client"

import { Card } from "@/components/ui/card"
import { useAuth } from "@/lib/auth"

export default function TeamFeedPage() {
  const { user } = useAuth()

  return (
    <div className="space-y-4 p-4 md:p-6">
      <h1 className="text-3xl font-bold">My Team Activity</h1>

      <div className="space-y-4">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="p-4">
            <div className="space-y-2">
              <div className="font-semibold">Team Member Activity {i}</div>
              <div className="text-sm text-muted-foreground">Just now</div>
              <div className="text-sm">Updated goal progress for Q3 initiatives</div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
