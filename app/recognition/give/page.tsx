"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
import { useRecognitions } from "@/lib/hooks/use-recognition"
import { useAuth } from "@/components/auth-provider"
import { useRouter } from "next/navigation"
import type { RecognitionBadge } from "@/lib/types/recognition.types"

const badgeOptions = [
  { id: "team_player" as const, name: "Teamwork" },
  { id: "innovator" as const, name: "Innovation" },
  { id: "mentor" as const, name: "Mentorship" },
  { id: "leader" as const, name: "Leadership" },
  { id: "achiever" as const, name: "Excellence" },
  { id: "helper" as const, name: "Customer Focus" },
]

export default function GiveRecognitionPage() {
  const { user } = useAuth()
  const router = useRouter()
  const { createRecognition } = useRecognitions()
  
  const [recipientId, setRecipientId] = useState("")
  const [selectedBadge, setSelectedBadge] = useState<RecognitionBadge>("team_player")
  const [message, setMessage] = useState("")
  const [isPublic, setIsPublic] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!user) {
      setError("You must be logged in")
      return
    }

    if (!recipientId || !message.trim()) {
      setError("Please fill in all fields")
      return
    }

    setIsSubmitting(true)
    setError("")

    const result = await createRecognition({
      toUserId: recipientId,
      badge: selectedBadge,
      message: message.trim(),
      isPublic,
    })

    setIsSubmitting(false)

    if (result.success) {
      router.push("/recognition/feed")
    } else {
      setError(result.error || "Failed to send recognition")
    }
  }

  return (
    <div className="space-y-4 p-4 md:p-6">
      <h1 className="text-3xl font-bold">Give Recognition</h1>

      <Card className="p-6">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label htmlFor="recipient">Who do you want to recognize?</Label>
            <Input 
              id="recipient" 
              placeholder="Search team members..."
              value={recipientId}
              onChange={(e) => setRecipientId(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Recognition Badge</Label>
            <div className="flex flex-wrap gap-2">
              {badgeOptions.map((badge) => (
                <Button 
                  key={badge.id} 
                  variant={selectedBadge === badge.id ? "default" : "outline"} 
                  type="button"
                  onClick={() => setSelectedBadge(badge.id)}
                >
                  {badge.name}
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Your message</Label>
            <Textarea
              id="message"
              placeholder="Share your appreciation..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              required
            />
          </div>

          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <input 
                type="checkbox"
                checked={isPublic}
                onChange={(e) => setIsPublic(e.target.checked)}
              />
              Make this recognition public
            </Label>
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
              {error}
            </div>
          )}

          <Button className="w-full" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Sending..." : "Send Recognition"}
          </Button>
        </form>
      </Card>
    </div>
  )
}
