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
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from "recharts"
import {
  ArrowDown,
  ArrowUp,
  Award,
  BarChart3,
  Calendar,
  ChevronRight,
  Download,
  Filter,
  Lightbulb,
  Star,
  Target,
  TrendingDown,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react"

// Mock data
const performanceOverTime = [
  { month: "Jul", rating: 3.8, completion: 75 },
  { month: "Aug", rating: 3.9, completion: 78 },
  { month: "Sep", rating: 4.0, completion: 82 },
  { month: "Oct", rating: 4.1, completion: 80 },
  { month: "Nov", rating: 4.2, completion: 85 },
  { month: "Dec", rating: 4.3, completion: 88 },
  { month: "Jan", rating: 4.2, completion: 90 },
]

const ratingDistribution = [
  { name: "5 - Exceptional", value: 8, color: "#10b981" },
  { name: "4 - Exceeds", value: 22, color: "#22c55e" },
  { name: "3 - Meets", value: 15, color: "#f59e0b" },
  { name: "2 - Needs Work", value: 3, color: "#f97316" },
  { name: "1 - Below", value: 0, color: "#ef4444" },
]

const departmentPerformance = [
  { name: "Engineering", avgRating: 4.2, completion: 92, headcount: 45 },
  { name: "Design", avgRating: 4.4, completion: 88, headcount: 12 },
  { name: "Product", avgRating: 4.1, completion: 95, headcount: 18 },
  { name: "Marketing", avgRating: 3.9, completion: 85, headcount: 15 },
  { name: "Operations", avgRating: 4.0, completion: 90, headcount: 20 },
  { name: "Sales", avgRating: 4.3, completion: 82, headcount: 25 },
]

const competencyScores = [
  { subject: "Technical Skills", A: 4.2, fullMark: 5 },
  { subject: "Leadership", A: 3.8, fullMark: 5 },
  { subject: "Communication", A: 4.0, fullMark: 5 },
  { subject: "Problem Solving", A: 4.3, fullMark: 5 },
  { subject: "Teamwork", A: 4.5, fullMark: 5 },
  { subject: "Innovation", A: 3.9, fullMark: 5 },
]

const topPerformers = [
  { id: "1", name: "Emily Rodriguez", role: "Senior Engineer", rating: 4.9, trend: "up", avatar: "" },
  { id: "2", name: "Michael Chen", role: "Product Designer", rating: 4.8, trend: "up", avatar: "" },
  { id: "3", name: "Sarah Johnson", role: "Tech Lead", rating: 4.7, trend: "same", avatar: "" },
  { id: "4", name: "David Kim", role: "Engineering Manager", rating: 4.6, trend: "up", avatar: "" },
  { id: "5", name: "Jessica Park", role: "Senior PM", rating: 4.6, trend: "down", avatar: "" },
]

const reviewCompletion = {
  total: 135,
  completed: 98,
  inProgress: 25,
  pending: 12,
}

const overallStats = {
  avgRating: 4.2,
  ratingChange: 0.3,
  completionRate: 73,
  completionChange: 8,
  goalsAchieved: 156,
  goalsChange: 12,
  developmentPlans: 89,
  plansChange: 5,
}

const insights = [
  {
    id: "1",
    type: "positive",
    title: "Strong technical skill growth",
    description: "Technical competency scores increased 12% across engineering teams this quarter.",
  },
  {
    id: "2",
    type: "attention",
    title: "Leadership development opportunity",
    description: "25% of senior ICs are interested in management track but lack formal training.",
  },
  {
    id: "3",
    type: "positive",
    title: "Review completion trending up",
    description: "Self-assessment completion rate improved from 65% to 88% this cycle.",
  },
]

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
}

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("quarter")
  const [department, setDepartment] = useState("all")

  const completionPercentage = Math.round((reviewCompletion.completed / reviewCompletion.total) * 100)

  return (
    <div className="space-y-6 p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Performance Analytics</h1>
          <p className="text-sm text-muted-foreground">Organization-wide performance insights</p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[140px]">
              <Calendar className="mr-2 h-4 w-4" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="quarter">This Quarter</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
            </SelectContent>
          </Select>
          <Select value={department} onValueChange={setDepartment}>
            <SelectTrigger className="w-[160px]">
              <Users className="mr-2 h-4 w-4" />
              <SelectValue placeholder="All Departments" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Departments</SelectItem>
              <SelectItem value="engineering">Engineering</SelectItem>
              <SelectItem value="design">Design</SelectItem>
              <SelectItem value="product">Product</SelectItem>
              <SelectItem value="marketing">Marketing</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Star className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{overallStats.avgRating}</p>
                  <p className="text-xs text-muted-foreground">Avg. Rating</p>
                </div>
              </div>
              <div
                className={`flex items-center gap-1 text-xs ${overallStats.ratingChange >= 0 ? "text-emerald-500" : "text-red-500"}`}
              >
                {overallStats.ratingChange >= 0 ? (
                  <ArrowUp className="h-3 w-3" />
                ) : (
                  <ArrowDown className="h-3 w-3" />
                )}
                {Math.abs(overallStats.ratingChange)}
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10">
                  <BarChart3 className="h-5 w-5 text-emerald-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{overallStats.completionRate}%</p>
                  <p className="text-xs text-muted-foreground">Review Completion</p>
                </div>
              </div>
              <div
                className={`flex items-center gap-1 text-xs ${overallStats.completionChange >= 0 ? "text-emerald-500" : "text-red-500"}`}
              >
                {overallStats.completionChange >= 0 ? (
                  <ArrowUp className="h-3 w-3" />
                ) : (
                  <ArrowDown className="h-3 w-3" />
                )}
                {Math.abs(overallStats.completionChange)}%
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10">
                  <Target className="h-5 w-5 text-amber-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{overallStats.goalsAchieved}</p>
                  <p className="text-xs text-muted-foreground">Goals Achieved</p>
                </div>
              </div>
              <div
                className={`flex items-center gap-1 text-xs ${overallStats.goalsChange >= 0 ? "text-emerald-500" : "text-red-500"}`}
              >
                {overallStats.goalsChange >= 0 ? (
                  <ArrowUp className="h-3 w-3" />
                ) : (
                  <ArrowDown className="h-3 w-3" />
                )}
                {Math.abs(overallStats.goalsChange)}
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10">
                  <Zap className="h-5 w-5 text-blue-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{overallStats.developmentPlans}</p>
                  <p className="text-xs text-muted-foreground">Active Dev Plans</p>
                </div>
              </div>
              <div
                className={`flex items-center gap-1 text-xs ${overallStats.plansChange >= 0 ? "text-emerald-500" : "text-red-500"}`}
              >
                {overallStats.plansChange >= 0 ? (
                  <ArrowUp className="h-3 w-3" />
                ) : (
                  <ArrowDown className="h-3 w-3" />
                )}
                {Math.abs(overallStats.plansChange)}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 1 */}
      <div className="grid gap-4 lg:grid-cols-3">
        {/* Performance Trend */}
        <Card className="lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">Performance Trend</CardTitle>
            <CardDescription>Average ratings and completion rates over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={performanceOverTime}>
                <defs>
                  <linearGradient id="ratingGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                <YAxis
                  yAxisId="left"
                  domain={[3, 5]}
                  tick={{ fontSize: 12 }}
                  stroke="hsl(var(--muted-foreground))"
                />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  domain={[0, 100]}
                  tick={{ fontSize: 12 }}
                  stroke="hsl(var(--muted-foreground))"
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Area
                  yAxisId="left"
                  type="monotone"
                  dataKey="rating"
                  stroke="#10b981"
                  strokeWidth={2}
                  fill="url(#ratingGradient)"
                  name="Avg. Rating"
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="completion"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={{ fill: "#3b82f6", strokeWidth: 2 }}
                  name="Completion %"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Rating Distribution */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">Rating Distribution</CardTitle>
            <CardDescription>Employee ratings breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie
                  data={ratingDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={70}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {ratingDistribution.map((entry, index) => (
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
            <div className="mt-2 space-y-1">
              {ratingDistribution.slice(0, 4).map((item) => (
                <div key={item.name} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-muted-foreground">{item.name}</span>
                  </div>
                  <span className="font-medium text-foreground">{item.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 2 */}
      <div className="grid gap-4 lg:grid-cols-2">
        {/* Department Performance */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">Department Performance</CardTitle>
            <CardDescription>Average ratings by department</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={departmentPerformance} layout="vertical">
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
                <Bar dataKey="avgRating" fill="#10b981" radius={[0, 4, 4, 0]} name="Avg. Rating" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Competency Radar */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">Competency Overview</CardTitle>
            <CardDescription>Organization-wide skill assessment</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <RadarChart data={competencyScores}>
                <PolarGrid stroke="hsl(var(--border))" />
                <PolarAngleAxis
                  dataKey="subject"
                  tick={{ fontSize: 11 }}
                  stroke="hsl(var(--muted-foreground))"
                />
                <PolarRadiusAxis domain={[0, 5]} tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" />
                <Radar
                  name="Score"
                  dataKey="A"
                  stroke="#10b981"
                  fill="#10b981"
                  fillOpacity={0.3}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Row */}
      <div className="grid gap-4 lg:grid-cols-3">
        {/* Review Completion Status */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold">Review Cycle Status</CardTitle>
            <CardDescription>Q4 2025 review completion</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-3xl font-bold text-foreground">{completionPercentage}%</span>
              <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-500">
                <TrendingUp className="mr-1 h-3 w-3" />
                On Track
              </Badge>
            </div>
            <Progress value={completionPercentage} className="h-3" />
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="rounded-lg bg-emerald-500/10 p-2">
                <p className="text-lg font-bold text-emerald-600">{reviewCompletion.completed}</p>
                <p className="text-[10px] text-muted-foreground">Completed</p>
              </div>
              <div className="rounded-lg bg-amber-500/10 p-2">
                <p className="text-lg font-bold text-amber-600">{reviewCompletion.inProgress}</p>
                <p className="text-[10px] text-muted-foreground">In Progress</p>
              </div>
              <div className="rounded-lg bg-muted p-2">
                <p className="text-lg font-bold text-muted-foreground">{reviewCompletion.pending}</p>
                <p className="text-[10px] text-muted-foreground">Pending</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Top Performers */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base font-semibold">
              <Award className="h-4 w-4 text-amber-500" />
              Top Performers
            </CardTitle>
            <CardDescription>Highest-rated employees this cycle</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y">
              {topPerformers.slice(0, 5).map((performer, index) => (
                <div
                  key={performer.id}
                  className="flex items-center justify-between p-3 transition-colors hover:bg-muted/50"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-muted text-xs font-bold text-muted-foreground">
                      {index + 1}
                    </div>
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={performer.avatar} />
                      <AvatarFallback className="text-xs">{getInitials(performer.name)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium text-foreground">{performer.name}</p>
                      <p className="text-xs text-muted-foreground">{performer.role}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 rounded-lg bg-amber-500/10 px-2 py-1">
                      <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
                      <span className="text-sm font-semibold text-amber-600">{performer.rating}</span>
                    </div>
                    {performer.trend === "up" && <TrendingUp className="h-4 w-4 text-emerald-500" />}
                    {performer.trend === "down" && <TrendingDown className="h-4 w-4 text-red-500" />}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* AI Insights */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base font-semibold">
              <Lightbulb className="h-4 w-4 text-blue-500" />
              Key Insights
            </CardTitle>
            <CardDescription>AI-generated performance insights</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {insights.map((insight) => (
              <div
                key={insight.id}
                className={`rounded-lg border p-3 ${
                  insight.type === "positive"
                    ? "border-emerald-500/30 bg-emerald-500/5"
                    : "border-amber-500/30 bg-amber-500/5"
                }`}
              >
                <div className="flex items-start gap-2">
                  {insight.type === "positive" ? (
                    <TrendingUp className="mt-0.5 h-4 w-4 text-emerald-500" />
                  ) : (
                    <Lightbulb className="mt-0.5 h-4 w-4 text-amber-500" />
                  )}
                  <div>
                    <p className="text-sm font-medium text-foreground">{insight.title}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{insight.description}</p>
                  </div>
                </div>
              </div>
            ))}
            <Button variant="ghost" size="sm" className="w-full">
              View All Insights
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
