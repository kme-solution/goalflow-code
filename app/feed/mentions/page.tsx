"use client"

import { Card } from "@/components/ui/card"

export default function MentionsPage() {
  return (
    <div className="space-y-4 p-4 md:p-6">
      <h1 className="text-3xl font-bold">Mentions</h1>

      <div className="space-y-4">
        {[1, 2].map((i) => (
          <Card key={i} className="p-4">
            <div className="space-y-2">
              <div className="font-semibold">You were mentioned</div>
              <div className="text-sm text-muted-foreground">3 days ago</div>
              <div className="text-sm">@you - Great collaboration on the project!</div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
