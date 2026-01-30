"use client"

import { Card } from "@/components/ui/card"

export default function FollowingPage() {
  return (
    <div className="space-y-4 p-4 md:p-6">
      <h1 className="text-3xl font-bold">Following</h1>

      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="p-4">
            <div className="space-y-2">
              <div className="font-semibold">Person You Follow - Activity {i}</div>
              <div className="text-sm text-muted-foreground">1 day ago</div>
              <div className="text-sm">Achieved goal milestone</div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
