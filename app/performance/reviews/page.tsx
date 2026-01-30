"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function ReviewsPage() {
  return (
    <div className="space-y-4 p-4 md:p-6">
      <h1 className="text-3xl font-bold">Performance Reviews</h1>

      <div className="space-y-4">
        {[
          { status: "Upcoming", label: "Q4 2024 Review", dueDate: "Dec 15" },
          { status: "In Progress", label: "Q3 2024 Review", dueDate: "In progress" },
          { status: "Completed", label: "Q2 2024 Review", dueDate: "Completed" },
        ].map((review, i) => (
          <Card key={i} className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-semibold">{review.label}</div>
                <div className="text-sm text-muted-foreground">Due: {review.dueDate}</div>
              </div>
              <Badge
                variant={
                  review.status === "Completed" ? "default" : review.status === "In Progress" ? "secondary" : "outline"
                }
              >
                {review.status}
              </Badge>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
