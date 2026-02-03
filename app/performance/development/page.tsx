"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  ArrowRight,
  Award,
  BookOpen,
  Calendar,
  Check,
  ChevronRight,
  Clock,
  ExternalLink,
  GraduationCap,
  Lightbulb,
  Plus,
  Rocket,
  Star,
  Target,
  TrendingUp,
  Trophy,
  Users,
  Zap,
} from "lucide-react"

// Mock data
const developmentPlan = {
  id: "dp-001",
  status: "active",
  progress: 45,
  createdAt: "2025-01-15",
  targetDate: "2025-12-31",
  strengths: [
    { id: "s1", name: "Technical Problem Solving", rating: 5 },
    { id: "s2", name: "Team Collaboration", rating: 4 },
    { id: "s3", name: "Code Quality", rating: 5 },
  ],
  areasForImprovement: [
    { id: "a1", name: "Public Speaking", currentLevel: 2, targetLevel: 4 },
    { id: "a2", name: "Strategic Thinking", currentLevel: 3, targetLevel: 4 },
    { id: "a3", name: "Stakeholder Management", currentLevel: 2, targetLevel: 4 },
  ],
}

const developmentGoals = [
  {
    id: "dg1",
    title: "Complete Leadership Development Program",
    description: "Enroll in and complete the company's leadership development program",
    category: "Leadership",
    status: "in_progress",
    progress: 60,
    targetDate: "2025-06-30",
    milestones: [
      { id: "m1", title: "Enroll in program", completed: true },
      { id: "m2", title: "Complete Module 1: Self-Awareness", completed: true },
      { id: "m3", title: "Complete Module 2: Leading Teams", completed: true },
      { id: "m4", title: "Complete Module 3: Strategic Leadership", completed: false },
      { id: "m5", title: "Final Assessment", completed: false },
    ],
    resources: [
      { type: "course", title: "Leadership Fundamentals", provider: "Internal LMS" },
      { type: "book", title: "The Making of a Manager", provider: "Julie Zhuo" },
    ],
  },
  {
    id: "dg2",
    title: "Improve Public Speaking Skills",
    description: "Build confidence and effectiveness in presentations and public speaking",
    category: "Communication",
    status: "in_progress",
    progress: 30,
    targetDate: "2025-09-30",
    milestones: [
      { id: "m1", title: "Join Toastmasters", completed: true },
      { id: "m2", title: "Give 5 practice speeches", completed: false },
      { id: "m3", title: "Present at team all-hands", completed: false },
      { id: "m4", title: "Lead a workshop", completed: false },
    ],
    resources: [
      { type: "course", title: "Public Speaking Mastery", provider: "LinkedIn Learning" },
      { type: "activity", title: "Weekly Toastmasters meetings", provider: "Local Chapter" },
    ],
  },
  {
    id: "dg3",
    title: "Mentor Junior Developers",
    description: "Take on mentorship responsibilities to develop coaching skills",
    category: "Leadership",
    status: "not_started",
    progress: 0,
    targetDate: "2025-12-31",
    milestones: [
      { id: "m1", title: "Complete mentor training", completed: false },
      { id: "m2", title: "Get assigned mentee", completed: false },
      { id: "m3", title: "Hold bi-weekly 1:1s for 6 months", completed: false },
      { id: "m4", title: "Help mentee achieve their goals", completed: false },
    ],
    resources: [
      { type: "guide", title: "Mentorship Best Practices", provider: "HR Portal" },
    ],
  },
]

const learningResources = [
  {
    id: "lr1",
    title: "Advanced System Design",
    type: "Course",
    provider: "Internal LMS",
    duration: "8 hours",
    status: "in_progress",
    progress: 75,
    dueDate: "2025-03-15",
  },
  {
    id: "lr2",
    title: "Effective Communication Workshop",
    type: "Workshop",
    provider: "External",
    duration: "2 days",
    status: "upcoming",
    progress: 0,
    dueDate: "2025-04-10",
  },
  {
    id: "lr3",
    title: "AWS Solutions Architect",
    type: "Certification",
    provider: "AWS",
    duration: "40 hours",
    status: "completed",
    progress: 100,
    completedDate: "2025-01-20",
  },
]

const achievements = [
  { id: "a1", title: "Fast Learner", description: "Completed 5 courses in one month", icon: Zap, date: "2025-01-20" },
  { id: "a2", title: "Team Player", description: "Collaborated on 10 cross-team projects", icon: Users, date: "2025-02-01" },
  { id: "a3", title: "Goal Crusher", description: "Achieved 100% of Q4 goals", icon: Trophy, date: "2025-01-15" },
]

const statusConfig: Record<string, { label: string; variant: "default" | "secondary" | "outline" }> = {
  completed: { label: "Completed", variant: "default" },
  in_progress: { label: "In Progress", variant: "secondary" },
  not_started: { label: "Not Started", variant: "outline" },
  upcoming: { label: "Upcoming", variant: "outline" },
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}

function getCategoryColor(category: string) {
  const colors: Record<string, string> = {
    Leadership: "bg-blue-500/10 text-blue-500",
    Communication: "bg-purple-500/10 text-purple-500",
    Technical: "bg-emerald-500/10 text-emerald-500",
    Management: "bg-amber-500/10 text-amber-500",
  }
  return colors[category] || "bg-muted text-muted-foreground"
}

export default function DevelopmentPage() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="space-y-6 p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Development Plan</h1>
          <p className="text-sm text-muted-foreground">Track your growth and career development</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <BookOpen className="mr-2 h-4 w-4" />
            Resources
          </Button>
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Add Goal
          </Button>
        </div>
      </div>

      {/* Progress Overview Card */}
      <Card className="border-primary/20 bg-primary/5">
        <CardContent className="p-6">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
                <Rocket className="h-7 w-7 text-primary" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-foreground">2025 Development Plan</h2>
                <p className="text-sm text-muted-foreground">
                  Started {formatDate(developmentPlan.createdAt)} - Target {formatDate(developmentPlan.targetDate)}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="min-w-[200px]">
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Overall Progress</span>
                  <span className="font-semibold text-foreground">{developmentPlan.progress}%</span>
                </div>
                <Progress value={developmentPlan.progress} className="h-3" />
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-foreground">
                  {developmentGoals.filter((g) => g.status === "completed").length}/{developmentGoals.length}
                </p>
                <p className="text-xs text-muted-foreground">Goals Completed</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10">
                <Target className="h-5 w-5 text-emerald-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{developmentGoals.length}</p>
                <p className="text-xs text-muted-foreground">Active Goals</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10">
                <GraduationCap className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {learningResources.filter((r) => r.status === "completed").length}
                </p>
                <p className="text-xs text-muted-foreground">Courses Completed</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10">
                <Clock className="h-5 w-5 text-amber-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">24h</p>
                <p className="text-xs text-muted-foreground">Learning Time</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500/10">
                <Award className="h-5 w-5 text-purple-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{achievements.length}</p>
                <p className="text-xs text-muted-foreground">Achievements</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">
            <Target className="mr-2 h-4 w-4" />
            Goals
          </TabsTrigger>
          <TabsTrigger value="learning">
            <BookOpen className="mr-2 h-4 w-4" />
            Learning
          </TabsTrigger>
          <TabsTrigger value="strengths">
            <Star className="mr-2 h-4 w-4" />
            Strengths
          </TabsTrigger>
        </TabsList>

        {/* Goals Tab */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4">
            {developmentGoals.map((goal) => {
              const status = statusConfig[goal.status] || statusConfig.not_started
              const completedMilestones = goal.milestones.filter((m) => m.completed).length

              return (
                <Card key={goal.id} className="transition-all hover:shadow-md">
                  <CardContent className="p-0">
                    <Accordion type="single" collapsible>
                      <AccordionItem value={goal.id} className="border-0">
                        <AccordionTrigger className="px-4 py-4 hover:no-underline">
                          <div className="flex flex-1 flex-col gap-3 text-left sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                            <div className="flex items-start gap-3">
                              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                                <Target className="h-5 w-5 text-muted-foreground" />
                              </div>
                              <div>
                                <div className="flex flex-wrap items-center gap-2">
                                  <h3 className="font-semibold text-foreground">{goal.title}</h3>
                                  <Badge variant={status.variant}>{status.label}</Badge>
                                  <Badge className={getCategoryColor(goal.category)}>{goal.category}</Badge>
                                </div>
                                <p className="mt-1 text-sm text-muted-foreground">{goal.description}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-4">
                              <div className="min-w-[120px]">
                                <div className="mb-1 flex items-center justify-between text-xs">
                                  <span className="text-muted-foreground">Progress</span>
                                  <span className="font-medium">{goal.progress}%</span>
                                </div>
                                <Progress value={goal.progress} className="h-2" />
                              </div>
                              <div className="text-right">
                                <p className="text-xs text-muted-foreground">Due</p>
                                <p className="text-sm font-medium text-foreground">{formatDate(goal.targetDate)}</p>
                              </div>
                            </div>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="border-t bg-muted/30 px-4 pb-4 pt-4">
                          <div className="grid gap-6 md:grid-cols-2">
                            {/* Milestones */}
                            <div>
                              <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
                                <TrendingUp className="h-4 w-4 text-primary" />
                                Milestones ({completedMilestones}/{goal.milestones.length})
                              </h4>
                              <div className="space-y-2">
                                {goal.milestones.map((milestone) => (
                                  <div
                                    key={milestone.id}
                                    className={`flex items-center gap-3 rounded-lg border p-3 ${milestone.completed ? "border-emerald-500/30 bg-emerald-500/5" : "bg-card"}`}
                                  >
                                    <div
                                      className={`flex h-5 w-5 items-center justify-center rounded-full ${milestone.completed ? "bg-emerald-500" : "border-2 border-muted-foreground/30"}`}
                                    >
                                      {milestone.completed && <Check className="h-3 w-3 text-white" />}
                                    </div>
                                    <span
                                      className={`text-sm ${milestone.completed ? "text-foreground" : "text-muted-foreground"}`}
                                    >
                                      {milestone.title}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>
                            {/* Resources */}
                            <div>
                              <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
                                <BookOpen className="h-4 w-4 text-blue-500" />
                                Learning Resources
                              </h4>
                              <div className="space-y-2">
                                {goal.resources.map((resource, idx) => (
                                  <div
                                    key={idx}
                                    className="flex items-center justify-between rounded-lg border bg-card p-3"
                                  >
                                    <div>
                                      <p className="text-sm font-medium text-foreground">{resource.title}</p>
                                      <p className="text-xs text-muted-foreground">{resource.provider}</p>
                                    </div>
                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                      <ExternalLink className="h-4 w-4" />
                                    </Button>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        {/* Learning Tab */}
        <TabsContent value="learning" className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold">Learning & Training</CardTitle>
              <CardDescription>Your assigned and completed learning activities</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y">
                {learningResources.map((resource) => {
                  const status = statusConfig[resource.status] || statusConfig.upcoming

                  return (
                    <div
                      key={resource.id}
                      className="flex flex-col gap-4 p-4 transition-colors hover:bg-muted/50 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                          {resource.type === "Course" ? (
                            <BookOpen className="h-5 w-5 text-muted-foreground" />
                          ) : resource.type === "Certification" ? (
                            <Award className="h-5 w-5 text-muted-foreground" />
                          ) : (
                            <GraduationCap className="h-5 w-5 text-muted-foreground" />
                          )}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-medium text-foreground">{resource.title}</h4>
                            <Badge variant={status.variant}>{status.label}</Badge>
                          </div>
                          <div className="mt-1 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                            <span>{resource.type}</span>
                            <span>-</span>
                            <span>{resource.provider}</span>
                            <span>-</span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {resource.duration}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        {resource.status === "in_progress" && (
                          <div className="min-w-[100px]">
                            <div className="mb-1 flex items-center justify-between text-xs">
                              <span className="text-muted-foreground">Progress</span>
                              <span className="font-medium">{resource.progress}%</span>
                            </div>
                            <Progress value={resource.progress} className="h-2" />
                          </div>
                        )}
                        <div className="text-right">
                          <p className="text-xs text-muted-foreground">
                            {resource.status === "completed" ? "Completed" : "Due"}
                          </p>
                          <p className="text-sm font-medium text-foreground">
                            {formatDate(resource.completedDate || resource.dueDate)}
                          </p>
                        </div>
                        <Button variant="ghost" size="sm">
                          {resource.status === "completed" ? "View" : "Continue"}
                          <ChevronRight className="ml-1 h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Achievements */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base font-semibold">
                <Trophy className="h-4 w-4 text-amber-500" />
                Achievements
              </CardTitle>
              <CardDescription>Recognition for your learning milestones</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 sm:grid-cols-3">
                {achievements.map((achievement) => {
                  const Icon = achievement.icon
                  return (
                    <div
                      key={achievement.id}
                      className="flex items-center gap-3 rounded-lg border bg-card p-4 transition-all hover:shadow-md"
                    >
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-500/10">
                        <Icon className="h-6 w-6 text-amber-500" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{achievement.title}</p>
                        <p className="text-xs text-muted-foreground">{achievement.description}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Strengths Tab */}
        <TabsContent value="strengths" className="space-y-4">
          <div className="grid gap-4 lg:grid-cols-2">
            {/* Strengths */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base font-semibold">
                  <Star className="h-4 w-4 text-amber-500" />
                  Key Strengths
                </CardTitle>
                <CardDescription>Areas where you excel</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {developmentPlan.strengths.map((strength) => (
                    <div key={strength.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-foreground">{strength.name}</span>
                        <div className="flex items-center gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`h-4 w-4 ${star <= strength.rating ? "fill-amber-500 text-amber-500" : "text-muted"}`}
                            />
                          ))}
                        </div>
                      </div>
                      <Progress value={strength.rating * 20} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Areas for Improvement */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base font-semibold">
                  <Lightbulb className="h-4 w-4 text-blue-500" />
                  Growth Areas
                </CardTitle>
                <CardDescription>Opportunities for development</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {developmentPlan.areasForImprovement.map((area) => (
                    <div key={area.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-foreground">{area.name}</span>
                        <div className="flex items-center gap-2 text-xs">
                          <span className="text-muted-foreground">Level {area.currentLevel}</span>
                          <ArrowRight className="h-3 w-3 text-muted-foreground" />
                          <span className="font-medium text-primary">Target {area.targetLevel}</span>
                        </div>
                      </div>
                      <div className="relative h-2 overflow-hidden rounded-full bg-muted">
                        <div
                          className="absolute h-full bg-blue-500/30"
                          style={{ width: `${area.targetLevel * 20}%` }}
                        />
                        <div
                          className="absolute h-full bg-blue-500"
                          style={{ width: `${area.currentLevel * 20}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
