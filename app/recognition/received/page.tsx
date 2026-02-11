"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, Award } from "lucide-react"
import { useRecognitions } from "@/lib/hooks/use-recognition"
import { useMemo } from "react"

const badgeColors: Record<string, string> = {
  team_player: "bg-blue-100 text-blue-800",
  innovator: "bg-purple-100 text-purple-800",
  mentor: "bg-green-100 text-green-800",
  leader: "bg-amber-100 text-amber-800",
  achiever: "bg-emerald-100 text-emerald-800",
  helper: "bg-pink-100 text-pink-800",
}

export default function RecognitionReceivedPage() {
  const { recognitions, isLoading, isError, likeRecognition, unlikeRecognition } = useRecognitions("received")
  
  const likedIds = useMemo(() => new Set<string>(), [])

  if (isLoading) {
    return (
      <div className="space-y-4 p-4 md:p-6 flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-muted-foreground">Loading recognition...</p>
        </div>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="space-y-4 p-4 md:p-6 flex items-center justify-center h-64">
        <div className="text-center">
          <div className="text-red-600 mb-2">Failed to load recognition</div>
          <p className="text-muted-foreground">Please try refreshing the page</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4 p-4 md:p-6">
      <h1 className="text-3xl font-bold">Recognition Received</h1>

      {recognitions.length === 0 ? (
        <Card className="p-12 text-center">
          <Award className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="font-semibold text-lg mb-2">No Recognition Yet</h3>
          <p className="text-sm text-muted-foreground">
            Your teammates will recognize your achievements here. Keep up the great work!
          </p>
        </Card>
      ) : (
        <div className="space-y-4">
          {recognitions.map((recognition) => (
            <Card key={recognition.id} className="p-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="font-semibold">From: {recognition.fromUserName}</div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      if (likedIds.has(recognition.id)) {
                        unlikeRecognition(recognition.id)
                        likedIds.delete(recognition.id)
                      } else {
                        likeRecognition(recognition.id)
                        likedIds.add(recognition.id)
                      }
                    }}
                  >
                    <Heart className={`h-4 w-4 ${likedIds.has(recognition.id) ? "fill-red-500 text-red-500" : ""}`} />
                  </Button>
                </div>
                <div className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${badgeColors[recognition.badge] || "bg-gray-100 text-gray-800"}`}>
                  {recognition.badge.replace("_", " ").toUpperCase()}
                </div>
                <div className="text-sm">
                  {recognition.message}
                </div>
                <div className="text-xs text-muted-foreground">
                  {new Date(recognition.createdAt).toLocaleDateString()} • {recognition.likes} {recognition.likes === 1 ? "like" : "likes"}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
