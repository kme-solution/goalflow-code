"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  ArrowRight,
  Award,
  BookOpen,
  Briefcase,
  Check,
  ChevronRight,
  Clock,
  Code,
  GitBranch,
  GraduationCap,
  Layers,
  Map,
  Rocket,
  Star,
  Target,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react"

// Mock data
const currentPosition = {
  title: "Senior Software Engineer",
  level: "L5",
  department: "Engineering",
  tenure: "2 years",
  nextReview: "2025-06-01",
}

const careerTracks = [
  {
    id: "ic",
    name: "Individual Contributor",
    icon: Code,
    color: "bg-blue-500",
    description: "Technical excellence and deep expertise",
    current: true,
  },
  {
    id: "management",
    name: "Engineering Management",
    icon: Users,
    color: "bg-purple-500",
    description: "Lead teams and develop people",
    current: false,
  },
  {
    id: "architect",
    name: "Technical Architect",
    icon: Layers,
    color: "bg-emerald-500",
    description: "System design and technical strategy",
    current: false,
  },
]

const careerLadder = [
  {
    level: "L3",
    title: "Software Engineer",
    description: "Developing core engineering skills",
    status: "completed",
    requirements: ["Solid coding skills", "Can complete tasks independently", "Learning best practices"],
  },
  {
    level: "L4",
    title: "Software Engineer II",
    description: "Contributing independently to projects",
    status: "completed",
    requirements: ["Owns feature development", "Mentors juniors", "Contributes to technical discussions"],
  },
  {
    level: "L5",
    title: "Senior Software Engineer",
    description: "Technical leadership and mentorship",
    status: "current",
    requirements: ["Leads complex projects", "Sets technical direction", "Mentors team members", "Cross-team collaboration"],
  },
  {
    level: "L6",
    title: "Staff Engineer",
    description: "Organization-wide technical impact",
    status: "next",
    requirements: ["Multi-team technical leadership", "Defines architecture patterns", "Influences engineering culture", "Strategic technical decisions"],
  },
  {
    level: "L7",
    title: "Principal Engineer",
    description: "Company-wide technical vision",
    status: "future",
    requirements: ["Industry recognition", "Company-wide technical strategy", "External thought leadership"],
  },
]

const promotionReadiness = {
  overall: 65,
  categories: [
    { name: "Technical Skills", progress: 85, status: "strong" },
    { name: "Leadership", progress: 60, status: "developing" },
    { name: "Impact & Scope", progress: 55, status: "developing" },
    { name: "Communication", progress: 70, status: "on-track" },
  ],
  gaps: [
    { area: "Cross-team Leadership", description: "Lead a cross-functional initiative" },
    { area: "Architecture Decisions", description: "Own more system design decisions" },
    { area: "External Visibility", description: "Present at tech talks or conferences" },
  ],
}

const milestones = [
  {
    id: "m1",
    title: "Lead Architecture Review",
    description: "Successfully led the Q1 architecture review for the payments system",
    date: "2025-01-15",
    type: "achievement",
    icon: Award,
  },
  {
    id: "m2",
    title: "Complete Leadership Training",
    description: "Enrolled in company leadership development program",
    date: "2025-03-01",
    type: "upcoming",
    icon: GraduationCap,
  },
  {
    id: "m3",
    title: "Mentorship Program",
    description: "Start mentoring 2 junior engineers",
    date: "2025-04-01",
    type: "upcoming",
    icon: Users,
  },
]

const suggestedActions = [
  {
    id: "sa1",
    title: "Lead a cross-functional project",
    category: "Leadership",
    impact: "High",
    timeframe: "3-6 months",
  },
  {
    id: "sa2",
    title: "Write technical RFC for new system",
    category: "Technical",
    impact: "Medium",
    timeframe: "1-2 months",
  },
  {
    id: "sa3",
    title: "Present at team tech talk",
    category: "Communication",
    impact: "Medium",
    timeframe: "1 month",
  },
]

function getStatusColor(status: string) {
  const colors: Record<string, string> = {
    completed: "bg-emerald-500",
    current: "bg-primary",
    next: "bg-amber-500",
    future: "bg-muted",
  }
  return colors[status] || "bg-muted"
}

function getProgressColor(status: string) {
  const colors: Record<string, string> = {
    strong: "text-emerald-500",
    "on-track": "text-blue-500",
    developing: "text-amber-500",
    "needs-work": "text-red-500",
  }
  return colors[status] || "text-muted-foreground"
}

export default function CareerPathsPage() {
  const [activeTab, setActiveTab] = useState("path")
  const [selectedTrack, setSelectedTrack] = useState("ic")

  return (
    <div className="space-y-6 p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Career Path</h1>
          <p className="text-sm text-muted-foreground">Visualize and plan your career journey</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <BookOpen className="mr-2 h-4 w-4" />
            Career Guide
          </Button>
          <Button size="sm">
            <Target className="mr-2 h-4 w-4" />
            Set Goal
          </Button>
        </div>
      </div>

      {/* Current Position Card */}
      <Card className="border-primary/20 bg-primary/5">
        <CardContent className="p-6">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
                <Briefcase className="h-7 w-7 text-primary" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-semibold text-foreground">{currentPosition.title}</h2>
                  <Badge variant="secondary">{currentPosition.level}</Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  {currentPosition.department} - {currentPosition.tenure}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div>
                <p className="text-sm text-muted-foreground">Promotion Readiness</p>
                <div className="mt-1 flex items-center gap-2">
                  <span className="text-2xl font-bold text-foreground">{promotionReadiness.overall}%</span>
                  <TrendingUp className="h-5 w-5 text-emerald-500" />
                </div>
              </div>
              <div className="min-w-[150px]">
                <Progress value={promotionReadiness.overall} className="h-3" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Career Track Selection */}
      <div className="grid gap-4 sm:grid-cols-3">
        {careerTracks.map((track) => {
          const Icon = track.icon
          return (
            <Card
              key={track.id}
              className={`cursor-pointer transition-all hover:shadow-md ${track.current ? "border-primary/50 bg-primary/5" : ""}`}
              onClick={() => setSelectedTrack(track.id)}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${track.color}/10`}>
                    <Icon className={`h-5 w-5 ${track.color.replace("bg-", "text-")}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-foreground">{track.name}</h3>
                      {track.current && (
                        <Badge variant="default" className="text-xs">
                          Current
                        </Badge>
                      )}
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">{track.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="path">
            <Map className="mr-2 h-4 w-4" />
            Career Ladder
          </TabsTrigger>
          <TabsTrigger value="readiness">
            <Rocket className="mr-2 h-4 w-4" />
            Readiness
          </TabsTrigger>
          <TabsTrigger value="milestones">
            <GitBranch className="mr-2 h-4 w-4" />
            Milestones
          </TabsTrigger>
        </TabsList>

        {/* Career Ladder Tab */}
        <TabsContent value="path" className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold">Engineering Career Ladder</CardTitle>
              <CardDescription>Your progression through engineering levels</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative">
                {/* Progress Line */}
                <div className="absolute left-[23px] top-0 h-full w-0.5 bg-border" />

                <div className="space-y-6">
                  {careerLadder.map((level, index) => (
                    <div key={level.level} className="relative flex gap-6">
                      {/* Level Indicator */}
                      <div className="relative z-10 flex flex-col items-center">
                        <div
                          className={`flex h-12 w-12 items-center justify-center rounded-full border-4 ${
                            level.status === "current"
                              ? "border-primary bg-primary text-primary-foreground"
                              : level.status === "completed"
                                ? "border-emerald-500 bg-emerald-500 text-white"
                                : level.status === "next"
                                  ? "border-amber-500 bg-card"
                                  : "border-border bg-card"
                          }`}
                        >
                          {level.status === "completed" ? (
                            <Check className="h-6 w-6" />
                          ) : (
                            <span className="text-sm font-bold">{level.level}</span>
                          )}
                        </div>
                      </div>

                      {/* Level Content */}
                      <div
                        className={`flex-1 rounded-lg border p-4 transition-all ${
                          level.status === "current"
                            ? "border-primary/30 bg-primary/5"
                            : level.status === "next"
                              ? "border-amber-500/30 bg-amber-500/5"
                              : ""
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold text-foreground">{level.title}</h3>
                              {level.status === "current" && (
                                <Badge variant="default">Current</Badge>
                              )}
                              {level.status === "next" && (
                                <Badge variant="secondary" className="bg-amber-500/10 text-amber-600">
                                  Next Target
                                </Badge>
                              )}
                            </div>
                            <p className="mt-1 text-sm text-muted-foreground">{level.description}</p>
                          </div>
                          {level.status === "next" && (
                            <Button size="sm" variant="outline">
                              View Requirements
                              <ChevronRight className="ml-1 h-4 w-4" />
                            </Button>
                          )}
                        </div>
                        {(level.status === "current" || level.status === "next") && (
                          <div className="mt-4">
                            <p className="mb-2 text-xs font-medium text-muted-foreground uppercase">
                              Key Requirements
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {level.requirements.map((req, idx) => (
                                <Badge key={idx} variant="outline" className="text-xs">
                                  {req}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Readiness Tab */}
        <TabsContent value="readiness" className="space-y-4">
          <div className="grid gap-4 lg:grid-cols-2">
            {/* Readiness Breakdown */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-semibold">Promotion Readiness Breakdown</CardTitle>
                <CardDescription>Your progress toward Staff Engineer (L6)</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {promotionReadiness.categories.map((category) => (
                  <div key={category.name} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-foreground">{category.name}</span>
                      <span className={`text-sm font-medium ${getProgressColor(category.status)}`}>
                        {category.progress}%
                      </span>
                    </div>
                    <Progress value={category.progress} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Growth Areas */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base font-semibold">
                  <Target className="h-4 w-4 text-amber-500" />
                  Growth Areas
                </CardTitle>
                <CardDescription>Key gaps to address for promotion</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {promotionReadiness.gaps.map((gap, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 rounded-lg border bg-muted/30 p-3"
                  >
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-500/10">
                      <Zap className="h-3 w-3 text-amber-500" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{gap.area}</p>
                      <p className="text-sm text-muted-foreground">{gap.description}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Suggested Actions */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base font-semibold">
                <Rocket className="h-4 w-4 text-primary" />
                Suggested Actions
              </CardTitle>
              <CardDescription>Recommended steps to accelerate your career growth</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y">
                {suggestedActions.map((action) => (
                  <div
                    key={action.id}
                    className="flex items-center justify-between p-4 transition-colors hover:bg-muted/50"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                        <Star className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{action.title}</p>
                        <div className="mt-1 flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">
                            {action.category}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            Impact: {action.impact}
                          </span>
                          <span className="text-xs text-muted-foreground">-</span>
                          <span className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            {action.timeframe}
                          </span>
                        </div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Add to Plan
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Milestones Tab */}
        <TabsContent value="milestones" className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold">Career Milestones</CardTitle>
              <CardDescription>Track your achievements and upcoming goals</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <div className="absolute left-[19px] top-0 h-full w-0.5 bg-border" />

                <div className="space-y-6">
                  {milestones.map((milestone) => {
                    const Icon = milestone.icon
                    return (
                      <div key={milestone.id} className="relative flex gap-4">
                        <div
                          className={`relative z-10 flex h-10 w-10 items-center justify-center rounded-full ${
                            milestone.type === "achievement"
                              ? "bg-emerald-500"
                              : "border-2 border-dashed border-muted-foreground/50 bg-card"
                          }`}
                        >
                          <Icon
                            className={`h-5 w-5 ${
                              milestone.type === "achievement" ? "text-white" : "text-muted-foreground"
                            }`}
                          />
                        </div>
                        <div className="flex-1 rounded-lg border bg-card p-4">
                          <div className="flex items-start justify-between">
                            <div>
                              <div className="flex items-center gap-2">
                                <h4 className="font-medium text-foreground">{milestone.title}</h4>
                                {milestone.type === "achievement" ? (
                                  <Badge variant="default" className="bg-emerald-500">
                                    <Check className="mr-1 h-3 w-3" />
                                    Achieved
                                  </Badge>
                                ) : (
                                  <Badge variant="outline">Upcoming</Badge>
                                )}
                              </div>
                              <p className="mt-1 text-sm text-muted-foreground">{milestone.description}</p>
                            </div>
                            <span className="text-xs text-muted-foreground">{milestone.date}</span>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
