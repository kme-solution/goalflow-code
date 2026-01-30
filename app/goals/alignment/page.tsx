"use client"

import { Card } from "@/components/ui/card"

export default function AlignmentPage() {
  return (
    <div className="space-y-4 p-4 md:p-6">
      <h1 className="text-3xl font-bold">Goal Alignment</h1>

      <Card className="p-6">
        <div className="space-y-4">
          <div className="text-center text-muted-foreground">
            Visual representation of goal cascading from company to individual level
          </div>
          {/* Goal alignment tree visualization would go here */}
          <div className="flex justify-center py-8">
            <div className="text-sm text-muted-foreground">Goal alignment visualization</div>
          </div>
        </div>
      </Card>
    </div>
  )
}
