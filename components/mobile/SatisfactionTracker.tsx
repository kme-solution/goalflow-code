"use client"

import { useState } from "react"
import { Heart, TrendingUp, TrendingDown, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { DailySatisfaction, SatisfactionLevel } from "@/lib/types/mobile-activity.types"

interface SatisfactionTrackerProps {
  satisfaction?: DailySatisfaction
  onMoodUpdate?: (rating: SatisfactionLevel, note?: string) => void
  onGoalRatingUpdate?: (goalId: string, rating: SatisfactionLevel, note?: string) => void
}

export function SatisfactionTracker({
  satisfaction,
  onMoodUpdate,
  onGoalRatingUpdate,
}: SatisfactionTrackerProps) {
  const [showNoteInput, setShowNoteInput] = useState(false)
  const [moodNote, setMoodNote] = useState(satisfaction?.moodNote || "")
  const [selectedMood, setSelectedMood] = useState<SatisfactionLevel>(
    satisfaction?.moodRating || 3,
  )

  const moodEmojis: Record<SatisfactionLevel, string> = {
    1: "😞",
    2: "😕",
    3: "😐",
    4: "🙂",
    5: "😄",
  }

  const moodLabels: Record<SatisfactionLevel, string> = {
    1: "Struggling",
    2: "Challenged",
    3: "Neutral",
    4: "Good",
    5: "Excellent",
  }

  const handleMoodSelect = (rating: SatisfactionLevel) => {
    setSelectedMood(rating)
    onMoodUpdate?.(rating, moodNote)
  }

  const handleNoteSubmit = () => {
    onMoodUpdate?.(selectedMood, moodNote)
    setShowNoteInput(false)
  }

  return (
    <div className="space-y-4">
      {/* Daily Mood Card */}
      <Card className="p-4 bg-gradient-to-br from-purple-500/5 to-pink-500/5 border-purple-200/30">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-sm">How are you feeling today?</h3>
            {satisfaction?.overallTrend && (
              <Badge
                variant="outline"
                className={
                  satisfaction.overallTrend === "up"
                    ? "text-success border-success/30"
                    : satisfaction.overallTrend === "down"
                      ? "text-destructive border-destructive/30"
                      : ""
                }
              >
                {satisfaction.overallTrend === "up" && (
                  <TrendingUp className="w-3 h-3 mr-1" />
                )}
                {satisfaction.overallTrend === "down" && (
                  <TrendingDown className="w-3 h-3 mr-1" />
                )}
                {satisfaction.overallTrend === "up" ? "Trending up" : "Stable"}
              </Badge>
            )}
          </div>

          {/* Mood Selector */}
          <div className="flex justify-between gap-2">
            {(Object.keys(moodEmojis) as Array<keyof typeof moodEmojis>).map((rating) => (
              <Button
                key={rating}
                variant={selectedMood === rating ? "default" : "outline"}
                size="sm"
                className="flex-1 h-auto py-3 flex-col gap-1 bg-background"
                onClick={() => handleMoodSelect(rating as SatisfactionLevel)}
              >
                <span className="text-2xl">{moodEmojis[rating as SatisfactionLevel]}</span>
                <span className="text-xs opacity-70">{rating}</span>
              </Button>
            ))}
          </div>

          {/* Mood Label */}
          <p className="text-xs text-center text-muted-foreground">
            Currently feeling: <span className="font-semibold">{moodLabels[selectedMood]}</span>
          </p>

          {/* Note Input */}
          <div>
            {!showNoteInput ? (
              <Button
                variant="ghost"
                size="sm"
                className="text-xs h-7 w-full"
                onClick={() => setShowNoteInput(true)}
              >
                <Plus className="w-3 h-3 mr-1" />
                Add a note
              </Button>
            ) : (
              <div className="space-y-2">
                <textarea
                  value={moodNote}
                  onChange={(e) => setMoodNote(e.target.value)}
                  placeholder="What contributed to this mood? (optional)"
                  className="w-full text-xs p-2 rounded border border-input bg-background"
                  rows={2}
                />
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="default"
                    className="text-xs h-7 flex-1"
                    onClick={handleNoteSubmit}
                  >
                    Save
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-xs h-7 flex-1"
                    onClick={() => setShowNoteInput(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </Card>

      {/* Goal Satisfaction Ratings */}
      {satisfaction?.goalRatings && satisfaction.goalRatings.length > 0 && (
        <Card className="p-4">
          <h4 className="font-semibold text-sm mb-3">Goal Satisfaction</h4>
          <div className="space-y-2">
            {satisfaction.goalRatings.map((goalRating) => (
              <div
                key={goalRating.goalId}
                className="p-2 rounded-lg bg-muted/30 border border-muted/50 hover:border-primary/30 transition"
              >
                <div className="flex items-center justify-between mb-1">
                  <p className="text-xs font-medium truncate flex-1">
                    {goalRating.goalTitle}
                  </p>
                  <div className="flex gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <button
                        key={i}
                        onClick={() =>
                          onGoalRatingUpdate?.(
                            goalRating.goalId,
                            (i + 1) as SatisfactionLevel,
                            goalRating.note,
                          )
                        }
                        className="focus:outline-none transition"
                      >
                        <Heart
                          className={`w-3 h-3 ${
                            i < goalRating.rating
                              ? "fill-red-500 text-red-500"
                              : "text-muted-foreground"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>
                {goalRating.note && (
                  <p className="text-xs text-muted-foreground">{goalRating.note}</p>
                )}
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  )
}
