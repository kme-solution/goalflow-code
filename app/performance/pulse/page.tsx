"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie,
} from "recharts"
import {
  AlertTriangle,
  ArrowDown,
  ArrowUp,
  Battery,
  Calendar,
  ChevronRight,
  Filter,
  Flame,
  Sparkles,
  TrendingDown,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react"

// Mock data
const moodTrendData = [
  { date: "Mon", mood: 3.8, energy: 7.2 },
  { date: "Tue", mood: 4.1, energy: 7.5 },
  { date: "Wed", mood: 3.9, energy: 6.8 },
  { date: "Thu", mood: 4.3, energy: 7.8 },
  { date: "Fri", mood: 4.5, energy: 8.0 },
  { date: "Sat", mood: 4.2, energy: 7.4 },
  { date: "Sun", mood: 4.0, energy: 7.1 },
]

const moodDistribution = [
  { name: "Excellent", value: 8, color: "#10b981" },
  { name: "Good", value: 15, color: "#22c55e" },
  { name: "Neutral", value: 6, color: "#f59e0b" },
  { name: "Challenging", value: 2, color: "#f97316" },
  { name: "Struggling", value: 1, color: "#ef4444" },
]

const departmentStats = [
  { name: "Engineering", avgMood: 4.2, avgEnergy: 7.5, checkinRate: 92, members: 12 },
  { name: "Design", avgMood: 4.5, avgEnergy: 8.0, checkinRate: 88, members: 6 },
  { name: "Product", avgMood: 4.0, avgEnergy: 7.2, checkinRate: 95, members: 8 },
  { name: "Marketing", avgMood: 3.8, avgEnergy: 6.8, checkinRate: 82, members: 5 },
  { name: "Operations", avgMood: 4.1, avgEnergy: 7.4, checkinRate: 90, members: 4 },
]

const teamMembers = [
  {
    id: "1",
    name: "Emily Rodriguez",
    role: "Senior Developer",
    avatar: "",
    lastCheckin: "2025-02-02",
    mood: 5,
    energy: 9,
    streak: 12,
    hasBlockers: false,
  },
  {
    id: "2",
    name: "Michael Chen",
    role: "Product Designer",
    avatar: "",
    lastCheckin: "2025-02-02",
    mood: 4,
    energy: 7,
    streak: 5,
    hasBlockers: true,
  },
  {
    id: "3",
    name: "Jessica Park",
    role: "Frontend Engineer",
    avatar: "",
    lastCheckin: "2025-02-01",
    mood: 3,
    energy: 5,
    streak: 3,
    hasBlockers: true,
  },
  {
    id: "4",
    name: "David Kim",
    role: "Backend Engineer",
    avatar: "",
    lastCheckin: "2025-02-02",
    mood: 4,
    energy: 8,
    streak: 8,
    hasBlockers: false,
  },
  {
    id: "5",
    name: "Sarah Johnson",
    role: "QA Engineer",
    avatar: "",
    lastCheckin: "2025-01-30",
    mood: 2,
    energy: 4,
    streak: 0,
    hasBlockers: true,
  },
]

const overallStats = {
  avgMood: 4.2,
  moodChange: 0.3,
  avgEnergy: 7.5,
  energyChange: 0.5,
  checkinRate: 88,
  rateChange: 5,
  activeStreaks: 24,
  streakChange: -2,
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
}

function getMoodColor(mood: number) {
  if (mood >= 4.5) return "text-emerald-500"
  if (mood >= 3.5) return "text-green-500"
  if (mood >= 2.5) return "text-amber-500"
  if (mood >= 1.5) return "text-orange-500"
  return "text-red-500"
}

function getMoodBgColor(mood: number) {
  if (mood >= 4.5) return "bg-emerald-500"
  if (mood >= 3.5) return "bg-green-500"
  if (mood >= 2.5) return "bg-amber-500"
  if (mood >= 1.5) return "bg-orange-500"
  return "bg-red-500"
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

export default function PulsePage() {
  const [timeRange, setTimeRange] = useState("week")
  const [department, setDepartment] = useState("all")

  return (
    <div className="space-y-6 p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Team Pulse</h1>
          <p className="text-sm text-muted-foreground">Monitor team wellbeing and engagement</p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[140px]">
              <Calendar className="mr-2 h-4 w-4" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="quarter">This Quarter</SelectItem>
            </SelectContent>
          </Select>
          <Select value={department} onValueChange={setDepartment}>
            <SelectTrigger className="w-[160px]">
              <Users className="mr-2 h-4 w-4" />
              <SelectValue placeholder="All Teams" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Teams</SelectItem>
              <SelectItem value="engineering">Engineering</SelectItem>
              <SelectItem value="design">Design</SelectItem>
              <SelectItem value="product">Product</SelectItem>
              <SelectItem value="marketing">Marketing</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10">
                  <Sparkles className="h-5 w-5 text-emerald-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{overallStats.avgMood}</p>
                  <p className="text-xs text-muted-foreground">Avg. Mood</p>
                </div>
              </div>
              <div
                className={`flex items-center gap-1 text-xs ${overallStats.moodChange >= 0 ? "text-emerald-500" : "text-red-500"}`}
              >
                {overallStats.moodChange >= 0 ? (
                  <ArrowUp className="h-3 w-3" />
                ) : (
                  <ArrowDown className="h-3 w-3" />
                )}
                {Math.abs(overallStats.moodChange)}
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10">
                  <Zap className="h-5 w-5 text-amber-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{overallStats.avgEnergy}</p>
                  <p className="text-xs text-muted-foreground">Avg. Energy</p>
                </div>
              </div>
              <div
                className={`flex items-center gap-1 text-xs ${overallStats.energyChange >= 0 ? "text-emerald-500" : "text-red-500"}`}
              >
                {overallStats.energyChange >= 0 ? (
                  <ArrowUp className="h-3 w-3" />
                ) : (
                  <ArrowDown className="h-3 w-3" />
                )}
                {Math.abs(overallStats.energyChange)}
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10">
                  <Users className="h-5 w-5 text-blue-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{overallStats.checkinRate}%</p>
                  <p className="text-xs text-muted-foreground">Check-in Rate</p>
                </div>
              </div>
              <div
                className={`flex items-center gap-1 text-xs ${overallStats.rateChange >= 0 ? "text-emerald-500" : "text-red-500"}`}
              >
                {overallStats.rateChange >= 0 ? (
                  <ArrowUp className="h-3 w-3" />
                ) : (
                  <ArrowDown className="h-3 w-3" />
                )}
                {Math.abs(overallStats.rateChange)}%
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-500/10">
                  <Flame className="h-5 w-5 text-orange-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{overallStats.activeStreaks}</p>
                  <p className="text-xs text-muted-foreground">Active Streaks</p>
                </div>
              </div>
              <div
                className={`flex items-center gap-1 text-xs ${overallStats.streakChange >= 0 ? "text-emerald-500" : "text-red-500"}`}
              >
                {overallStats.streakChange >= 0 ? (
                  <ArrowUp className="h-3 w-3" />
                ) : (
                  <ArrowDown className="h-3 w-3" />
                )}
                {Math.abs(overallStats.streakChange)}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid gap-4 lg:grid-cols-3">
        {/* Mood & Energy Trend */}
        <Card className="lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">Mood & Energy Trend</CardTitle>
            <CardDescription>Weekly team wellbeing metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={moodTrendData}>
                <defs>
                  <linearGradient id="moodGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="energyGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="date" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" domain={[0, 10]} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="mood"
                  stroke="#10b981"
                  strokeWidth={2}
                  fill="url(#moodGradient)"
                  name="Mood"
                />
                <Area
                  type="monotone"
                  dataKey="energy"
                  stroke="#f59e0b"
                  strokeWidth={2}
                  fill="url(#energyGradient)"
                  name="Energy"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Mood Distribution */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">Mood Distribution</CardTitle>
            <CardDescription>Current team sentiment</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie
                  data={moodDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={70}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {moodDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-2 flex flex-wrap justify-center gap-3">
              {moodDistribution.map((item) => (
                <div key={item.name} className="flex items-center gap-1.5">
                  <div className="h-2 w-2 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-xs text-muted-foreground">{item.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Department Breakdown & Team Members */}
      <div className="grid gap-4 lg:grid-cols-2">
        {/* Department Breakdown */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">Department Breakdown</CardTitle>
            <CardDescription>Wellbeing metrics by team</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={departmentStats} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis type="number" domain={[0, 5]} tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                <YAxis
                  type="category"
                  dataKey="name"
                  tick={{ fontSize: 12 }}
                  stroke="hsl(var(--muted-foreground))"
                  width={80}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Bar dataKey="avgMood" fill="#10b981" radius={[0, 4, 4, 0]} name="Avg. Mood" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Team Members Needing Attention */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-base font-semibold">
              <AlertTriangle className="h-4 w-4 text-amber-500" />
              Needs Attention
            </CardTitle>
            <CardDescription>Team members who may need support</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y">
              {teamMembers
                .filter((m) => m.mood <= 3 || m.hasBlockers || m.streak === 0)
                .slice(0, 4)
                .map((member) => (
                  <div
                    key={member.id}
                    className="flex items-center justify-between p-4 transition-colors hover:bg-muted/50"
                  >
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9">
                        <AvatarImage src={member.avatar} />
                        <AvatarFallback className="text-xs">{getInitials(member.name)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium text-foreground">{member.name}</p>
                        <p className="text-xs text-muted-foreground">{member.role}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        {member.mood <= 3 && (
                          <Badge variant="outline" className="border-amber-500/50 text-amber-500">
                            <TrendingDown className="mr-1 h-3 w-3" />
                            Low mood
                          </Badge>
                        )}
                        {member.hasBlockers && (
                          <Badge variant="outline" className="border-red-500/50 text-red-500">
                            <AlertTriangle className="mr-1 h-3 w-3" />
                            Blocked
                          </Badge>
                        )}
                        {member.streak === 0 && (
                          <Badge variant="outline" className="border-muted-foreground/50 text-muted-foreground">
                            No streak
                          </Badge>
                        )}
                      </div>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Full Team List */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-base font-semibold">Team Overview</CardTitle>
              <CardDescription>All team members and their current status</CardDescription>
            </div>
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className="flex flex-col gap-4 p-4 transition-colors hover:bg-muted/50 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={member.avatar} />
                    <AvatarFallback>{getInitials(member.name)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-foreground">{member.name}</p>
                    <p className="text-sm text-muted-foreground">{member.role}</p>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-4 sm:gap-6">
                  <div className="flex items-center gap-4">
                    <div className="text-center">
                      <div
                        className={`flex h-8 w-8 items-center justify-center rounded-full ${getMoodBgColor(member.mood)}`}
                      >
                        <span className="text-sm font-bold text-white">{member.mood}</span>
                      </div>
                      <p className="mt-1 text-[10px] text-muted-foreground">Mood</p>
                    </div>
                    <div className="text-center">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-500/20">
                        <span className="text-sm font-bold text-amber-600">{member.energy}</span>
                      </div>
                      <p className="mt-1 text-[10px] text-muted-foreground">Energy</p>
                    </div>
                    <div className="text-center">
                      <div className="flex h-8 items-center gap-1 rounded-full bg-orange-500/10 px-2">
                        <Flame className="h-3 w-3 text-orange-500" />
                        <span className="text-sm font-bold text-orange-600">{member.streak}</span>
                      </div>
                      <p className="mt-1 text-[10px] text-muted-foreground">Streak</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {member.hasBlockers && (
                      <Badge variant="outline" className="border-red-500/50 text-red-500">
                        <AlertTriangle className="mr-1 h-3 w-3" />
                        Blocked
                      </Badge>
                    )}
                    <span className="text-xs text-muted-foreground">{getRelativeDate(member.lastCheckin)}</span>
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
