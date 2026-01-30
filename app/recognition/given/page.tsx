"use client"

import { Card } from "@/components/ui/card"

export default function RecognitionGivenPage() {
  return (
    <div className="space-y-4 p-4 md:p-6">
      <h1 className="text-3xl font-bold">Recognition Given</h1>

      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="p-4">
            <div className="space-y-3">
              <div className="font-semibold">To: Team Member Name {i}</div>
              <div className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-semibold text-green-800">
                Innovation
              </div>
              <div className="text-sm">Great idea that improved our workflow significantly!</div>
              <div className="text-xs text-muted-foreground">1 week ago</div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
