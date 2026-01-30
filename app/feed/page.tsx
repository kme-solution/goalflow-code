"use client"

import { useAuth } from "@/lib/auth"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, MessageCircle, Share2 } from "lucide-react"

export default function FeedPage() {
  const { user } = useAuth()

  return (
    <div className="space-y-4 p-4 md:p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Activity Feed</h1>
        <Button className="gap-2">
          <Heart className="h-4 w-4" />
          Give Recognition
        </Button>
      </div>

      {/* Feed Activity Cards */}
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="p-4">
            <div className="flex items-start gap-4">
              <div className="h-10 w-10 rounded-full bg-primary/10" />
              <div className="flex-1">
                <div className="font-semibold">Team Member Name</div>
                <div className="text-sm text-muted-foreground">Updated goal progress • 2 hours ago</div>
                <div className="mt-2 text-sm">
                  Great progress on Q3 marketing campaign. Team collaboration was amazing!
                </div>
                <div className="mt-4 flex gap-4 text-sm text-muted-foreground">
                  <button className="flex items-center gap-1 hover:text-primary">
                    <Heart className="h-4 w-4" />
                    24
                  </button>
                  <button className="flex items-center gap-1 hover:text-primary">
                    <MessageCircle className="h-4 w-4" />5
                  </button>
                  <button className="flex items-center gap-1 hover:text-primary">
                    <Share2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
