"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Slider } from "@/components/ui/slider"
import {
  AlertCircle,
  ArrowRight,
  Battery,
  BatteryFull,
  BatteryLow,
  BatteryMedium,
  Calendar,
  Check,
  ChevronRight,
  Flame,
  History,
  Lightbulb,
  Sparkles,
  Target,
  TrendingUp,
  Zap,
} from "lucide-react"

// Mock check-in history
const checkInHistory = [
  {
    id: "1",
    date: "2025-02-02",
    mood: 4,
    energy: 8,
    priorities: ["Complete API integration", "Review PRs", "Team standup"],
    blockers: "Waiting for design approval",
    streak: 5,
  },
  {
    id: "2",
    date: "2025-02-01",
    mood: 3,
    energy: 6,
    priorities: ["Debug authentication", "Write tests", "Documentation"],
    blockers: "",
    streak: 4,
  },
  {
    id: "3",
    date: "2025-01-31",
    mood: 5,
    energy: 9,
    priorities: ["Launch feature", "Celebrate team win"],
    blockers: "",
    streak: 3,
  },
]

const weeklyStats = {
  checkInsCompleted: 5,
  totalDays: 5,
  avgMood: 4.2,
  avgEnergy: 7.5,
  currentStreak: 5,
  longestStreak: 12,
}

const moodOptions = [
  { value: 1, label: "Struggling", color: "bg-red-500", icon: BatteryLow },
  { value: 2, label: "Challenging", color: "bg-orange-500", icon: BatteryLow },
  { value: 3, label: "Neutral", color: "bg-amber-500", icon: BatteryMedium },
  { value: 4, label: "Good", color: "bg-emerald-500", icon: BatteryMedium },
  { value: 5, label: "Excellent", color: "bg-primary", icon: BatteryFull },
]

function getMoodLabel(value: number) {
  return moodOptions.find((m) => m.value === value)?.label || "Neutral"
}

function getMoodColor(value: number) {
  return moodOptions.find((m) => m.value === value)?.color || "bg-amber-500"
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  })
}

function getRelativeDate(dateString: string) {
  const today = new Date()
  const date = new Date(dateString)
  const diffTime = today.getTime() - date.getTime()
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))

  if (diffDays === 0) return "Today"
  if (diffDays === 1) return "Yesterday"
  return `${diffDays} days ago`
}

export default function CheckinPage() {
  const [activeTab, setActiveTab] = useState("checkin")
  const [mood, setMood] = useState<number>(3)
  const [energy, setEnergy] = useState<number[]>([5])
  const [priorities, setPriorities] = useState("")
  const [blockers, setBlockers] = useState("")
  const [wins, setWins] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitted(true)
    // Reset after animation
    setTimeout(() => {
      setIsSubmitted(false)
      setMood(3)
      setEnergy([5])
      setPriorities("")
      setBlockers("")
      setWins("")
    }, 2000)
  }

  const getEnergyIcon = (value: number) => {
    if (value <= 3) return BatteryLow
    if (value <= 6) return BatteryMedium
    return BatteryFull
  }

  const EnergyIcon = getEnergyIcon(energy[0])

  return (
    <div className="space-y-6 p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Daily Check-in</h1>
          <p className="text-sm text-muted-foreground">Track your wellbeing and stay focused</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 rounded-lg border bg-card px-3 py-2">
            <Flame className="h-4 w-4 text-orange-500" />
            <span className="text-sm font-medium text-foreground">{weeklyStats.currentStreak} day streak</span>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Calendar className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {weeklyStats.checkInsCompleted}/{weeklyStats.totalDays}
                </p>
                <p className="text-xs text-muted-foreground">This Week</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10">
                <Sparkles className="h-5 w-5 text-emerald-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{weeklyStats.avgMood.toFixed(1)}</p>
                <p className="text-xs text-muted-foreground">Avg. Mood</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10">
                <Zap className="h-5 w-5 text-amber-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{weeklyStats.avgEnergy.toFixed(1)}</p>
                <p className="text-xs text-muted-foreground">Avg. Energy</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-500/10">
                <Flame className="h-5 w-5 text-orange-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{weeklyStats.longestStreak}</p>
                <p className="text-xs text-muted-foreground">Best Streak</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="checkin">
            <Check className="mr-2 h-4 w-4" />
            Check-in
          </TabsTrigger>
          <TabsTrigger value="history">
            <History className="mr-2 h-4 w-4" />
            History
          </TabsTrigger>
        </TabsList>

        {/* Check-in Form */}
        <TabsContent value="checkin" className="space-y-4">
          {isSubmitted ? (
            <Card className="border-emerald-500/20 bg-emerald-500/5">
              <CardContent className="flex flex-col items-center justify-center p-12">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10">
                  <Check className="h-8 w-8 text-emerald-500" />
                </div>
                <h3 className="mt-4 text-xl font-semibold text-foreground">Check-in Complete!</h3>
                <p className="mt-2 text-sm text-muted-foreground">Great job staying consistent. Keep it up!</p>
              </CardContent>
            </Card>
          ) : (
            <form onSubmit={handleSubmit} className="grid gap-6 lg:grid-cols-2">
              {/* Left Column - Mood & Energy */}
              <div className="space-y-6">
                {/* Mood Selection */}
                <Card>
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center gap-2 text-base">
                      <Sparkles className="h-4 w-4 text-primary" />
                      How are you feeling today?
                    </CardTitle>
                    <CardDescription>Select the option that best describes your current mood</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-5 gap-2">
                      {moodOptions.map((option) => (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() => setMood(option.value)}
                          className={`flex flex-col items-center gap-2 rounded-lg border-2 p-3 transition-all ${
                            mood === option.value
                              ? `border-current ${option.color} bg-current/10 text-current`
                              : "border-transparent bg-muted/50 hover:bg-muted"
                          }`}
                        >
                          <div
                            className={`flex h-10 w-10 items-center justify-center rounded-full ${
                              mood === option.value ? option.color : "bg-muted"
                            }`}
                          >
                            <span className="text-lg font-bold text-white">
                              {option.value}
                            </span>
                          </div>
                          <span className="text-xs font-medium text-foreground">{option.label}</span>
                        </button>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Energy Level */}
                <Card>
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center gap-2 text-base">
                      <Battery className="h-4 w-4 text-amber-500" />
                      Energy Level
                    </CardTitle>
                    <CardDescription>Rate your current energy from 1 to 10</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <EnergyIcon
                          className={`h-5 w-5 ${energy[0] <= 3 ? "text-red-500" : energy[0] <= 6 ? "text-amber-500" : "text-emerald-500"}`}
                        />
                        <span className="text-2xl font-bold text-foreground">{energy[0]}</span>
                        <span className="text-sm text-muted-foreground">/ 10</span>
                      </div>
                      <Badge
                        variant="secondary"
                        className={
                          energy[0] <= 3
                            ? "bg-red-500/10 text-red-500"
                            : energy[0] <= 6
                              ? "bg-amber-500/10 text-amber-500"
                              : "bg-emerald-500/10 text-emerald-500"
                        }
                      >
                        {energy[0] <= 3 ? "Low" : energy[0] <= 6 ? "Moderate" : "High"}
                      </Badge>
                    </div>
                    <Slider
                      value={energy}
                      onValueChange={setEnergy}
                      min={1}
                      max={10}
                      step={1}
                      className="py-4"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Exhausted</span>
                      <span>Energized</span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Right Column - Priorities, Wins, Blockers */}
              <div className="space-y-6">
                {/* Priorities */}
                <Card>
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center gap-2 text-base">
                      <Target className="h-4 w-4 text-blue-500" />
                      Top Priorities
                    </CardTitle>
                    <CardDescription>What are your main focus areas for today?</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Textarea
                      value={priorities}
                      onChange={(e) => setPriorities(e.target.value)}
                      placeholder="1. Complete project proposal&#10;2. Review team feedback&#10;3. Prepare for meeting"
                      rows={4}
                      className="resize-none"
                    />
                  </CardContent>
                </Card>

                {/* Wins */}
                <Card>
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center gap-2 text-base">
                      <TrendingUp className="h-4 w-4 text-emerald-500" />
                      Recent Wins
                    </CardTitle>
                    <CardDescription>Celebrate your accomplishments, big or small</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Textarea
                      value={wins}
                      onChange={(e) => setWins(e.target.value)}
                      placeholder="What went well recently?"
                      rows={2}
                      className="resize-none"
                    />
                  </CardContent>
                </Card>

                {/* Blockers */}
                <Card>
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center gap-2 text-base">
                      <AlertCircle className="h-4 w-4 text-red-500" />
                      Blockers
                    </CardTitle>
                    <CardDescription>Any obstacles preventing progress?</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Textarea
                      value={blockers}
                      onChange={(e) => setBlockers(e.target.value)}
                      placeholder="Describe any challenges or blockers (optional)"
                      rows={2}
                      className="resize-none"
                    />
                  </CardContent>
                </Card>

                {/* Submit Button */}
                <Button type="submit" size="lg" className="w-full">
                  Complete Check-in
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </form>
          )}
        </TabsContent>

        {/* History Tab */}
        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold">Recent Check-ins</CardTitle>
              <CardDescription>Your check-in history and trends</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y">
                {checkInHistory.map((checkin) => (
                  <div
                    key={checkin.id}
                    className="flex flex-col gap-4 p-4 transition-colors hover:bg-muted/50 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className={`flex h-12 w-12 items-center justify-center rounded-lg ${getMoodColor(checkin.mood)}`}
                      >
                        <span className="text-xl font-bold text-white">{checkin.mood}</span>
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium text-foreground">{formatDate(checkin.date)}</h4>
                          <Badge variant="outline" className="text-xs">
                            {getRelativeDate(checkin.date)}
                          </Badge>
                        </div>
                        <div className="mt-1 flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Sparkles className="h-3 w-3" />
                            {getMoodLabel(checkin.mood)}
                          </span>
                          <span className="flex items-center gap-1">
                            <Zap className="h-3 w-3" />
                            Energy: {checkin.energy}/10
                          </span>
                        </div>
                        {checkin.priorities.length > 0 && (
                          <div className="mt-2 flex flex-wrap gap-1">
                            {checkin.priorities.slice(0, 3).map((priority, idx) => (
                              <Badge key={idx} variant="secondary" className="text-xs">
                                {priority}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      {checkin.blockers && (
                        <div className="flex items-center gap-1 text-amber-500">
                          <AlertCircle className="h-4 w-4" />
                          <span className="text-xs">Has blockers</span>
                        </div>
                      )}
                      <Button variant="ghost" size="sm">
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Weekly Trend Summary */}
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-base">
                <Lightbulb className="h-4 w-4 text-amber-500" />
                Weekly Insights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-lg border bg-muted/30 p-4">
                  <p className="text-sm text-muted-foreground">Mood Trend</p>
                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-foreground">{weeklyStats.avgMood.toFixed(1)}</span>
                    <span className="flex items-center text-xs text-emerald-500">
                      <TrendingUp className="mr-1 h-3 w-3" />
                      +0.3 from last week
                    </span>
                  </div>
                  <Progress value={weeklyStats.avgMood * 20} className="mt-3 h-2" />
                </div>
                <div className="rounded-lg border bg-muted/30 p-4">
                  <p className="text-sm text-muted-foreground">Energy Trend</p>
                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-foreground">{weeklyStats.avgEnergy.toFixed(1)}</span>
                    <span className="flex items-center text-xs text-emerald-500">
                      <TrendingUp className="mr-1 h-3 w-3" />
                      +0.5 from last week
                    </span>
                  </div>
                  <Progress value={weeklyStats.avgEnergy * 10} className="mt-3 h-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
