"use client"

import { Card } from "@/components/ui/card"

export default function RecognitionFeedPage() {
  return (
    <div className="space-y-4 p-4 md:p-6">
      <h1 className="text-3xl font-bold">Team Recognition Feed</h1>

      <div className="space-y-4">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="p-4">
            <div className="space-y-2">
              <div className="text-sm font-semibold">From: Member A → To: Member B</div>
              <div className="text-sm text-muted-foreground">Great teamwork on the launch!</div>
              <div className="text-xs text-muted-foreground">Just now</div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
