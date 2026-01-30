"use client"

import { Card } from "@/components/ui/card"
import { Heart } from "lucide-react"

export default function RecognitionReceivedPage() {
  return (
    <div className="space-y-4 p-4 md:p-6">
      <h1 className="text-3xl font-bold">Recognition Received</h1>

      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="p-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="font-semibold">From: Team Member Name</div>
                <Heart className="h-4 w-4 fill-red-500 text-red-500" />
              </div>
              <div className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-semibold text-blue-800">
                Teamwork
              </div>
              <div className="text-sm">
                Excellent collaboration on the project! Your support made a huge difference.
              </div>
              <div className="text-xs text-muted-foreground">2 days ago</div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
