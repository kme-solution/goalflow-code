"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function HelpPage() {
  return (
    <div className="space-y-4 p-4 md:p-6">
      <h1 className="text-3xl font-bold">Help & Support</h1>

      <div className="space-y-4">
        <Card className="p-4">
          <div className="space-y-2">
            <div className="font-semibold">Getting Started Guide</div>
            <div className="text-sm text-muted-foreground">Learn the basics of GoalFlow Pro</div>
            <Button variant="outline" className="mt-2 bg-transparent">
              Read Guide
            </Button>
          </div>
        </Card>

        <Card className="p-4">
          <div className="space-y-2">
            <div className="font-semibold">FAQ</div>
            <div className="text-sm text-muted-foreground">Answers to common questions</div>
            <Button variant="outline" className="mt-2 bg-transparent">
              View FAQ
            </Button>
          </div>
        </Card>

        <Card className="p-4">
          <div className="space-y-2">
            <div className="font-semibold">Contact Support</div>
            <div className="text-sm text-muted-foreground">Get help from our support team</div>
            <Button variant="outline" className="mt-2 bg-transparent">
              Contact Us
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}
