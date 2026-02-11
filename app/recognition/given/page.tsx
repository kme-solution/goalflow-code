"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Award, Trash2 } from "lucide-react"
import { useRecognitions } from "@/lib/hooks/use-recognition"
import { useState } from "react"

const badgeColors: Record<string, string> = {
  team_player: "bg-blue-100 text-blue-800",
  innovator: "bg-purple-100 text-purple-800",
  mentor: "bg-green-100 text-green-800",
  leader: "bg-amber-100 text-amber-800",
  achiever: "bg-emerald-100 text-emerald-800",
  helper: "bg-pink-100 text-pink-800",
}

export default function RecognitionGivenPage() {
  const { recognitions, isLoading, isError, deleteRecognition } = useRecognitions("given")
  const [deletingId, setDeletingId] = useState<string | null>(null)

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

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this recognition?")) return
    
    setDeletingId(id)
    const result = await deleteRecognition(id)
    setDeletingId(null)
    
    if (!result.success) {
      alert("Failed to delete recognition")
    }
  }

  return (
    <div className="space-y-4 p-4 md:p-6">
      <h1 className="text-3xl font-bold">Recognition Given</h1>

      {recognitions.length === 0 ? (
        <Card className="p-12 text-center">
          <Award className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="font-semibold text-lg mb-2">No Recognition Given Yet</h3>
          <p className="text-sm text-muted-foreground">
            Recognize your teammates for their contributions and achievements!
          </p>
        </Card>
      ) : (
        <div className="space-y-4">
          {recognitions.map((recognition) => (
            <Card key={recognition.id} className="p-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="font-semibold">To: {recognition.toUserName}</div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(recognition.id)}
                    disabled={deletingId === recognition.id}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <div className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${badgeColors[recognition.badge] || "bg-gray-100 text-gray-800"}`}>
                  {recognition.badge.replace("_", " ").toUpperCase()}
                </div>
                <div className="text-sm">
                  {recognition.message}
                </div>
                <div className="text-xs text-muted-foreground flex items-center justify-between">
                  <span>{new Date(recognition.createdAt).toLocaleDateString()}</span>
                  <span>{recognition.likes} {recognition.likes === 1 ? "like" : "likes"}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
