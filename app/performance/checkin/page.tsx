"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"

export default function CheckinPage() {
  const [mood, setMood] = useState<string>("")
  const [energy, setEnergy] = useState(5)

  const moods = ["😞", "😐", "😊", "😃", "🎉"]

  return (
    <div className="space-y-4 p-4 md:p-6">
      <h1 className="text-3xl font-bold">Daily Check-in</h1>

      <Card className="p-6">
        <form className="space-y-6">
          <div className="space-y-3">
            <Label>How are you feeling today?</Label>
            <div className="flex justify-between gap-2">
              {moods.map((m) => (
                <button
                  key={m}
                  onClick={() => setMood(m)}
                  className={`text-3xl p-2 rounded-lg transition-all ${
                    mood === m ? "bg-primary text-white scale-110" : "hover:bg-muted"
                  }`}
                  type="button"
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <Label>Energy Level: {energy}/10</Label>
            <input
              type="range"
              min="1"
              max="10"
              value={energy}
              onChange={(e) => setEnergy(Number.parseInt(e.target.value))}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="priorities">Top 3 Priorities</Label>
            <Textarea id="priorities" placeholder="What are your top priorities today?" rows={3} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="blockers">Blockers (Optional)</Label>
            <Textarea id="blockers" placeholder="Anything blocking your progress?" rows={2} />
          </div>

          <Button className="w-full">Submit Check-in</Button>
        </form>
      </Card>
    </div>
  )
}
