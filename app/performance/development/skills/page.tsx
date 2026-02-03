"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Award,
  BookOpen,
  Check,
  ChevronRight,
  Code,
  Filter,
  Layers,
  MessageSquare,
  Plus,
  Search,
  Star,
  Target,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react"

// Mock data for skills
const skillCategories = [
  {
    id: "technical",
    name: "Technical Skills",
    icon: Code,
    color: "bg-blue-500/10 text-blue-500",
    skills: [
      { id: "ts1", name: "JavaScript/TypeScript", currentLevel: 4, targetLevel: 5, validated: true },
      { id: "ts2", name: "React/Next.js", currentLevel: 4, targetLevel: 5, validated: true },
      { id: "ts3", name: "Node.js", currentLevel: 3, targetLevel: 4, validated: false },
      { id: "ts4", name: "Database Design", currentLevel: 3, targetLevel: 4, validated: false },
      { id: "ts5", name: "System Architecture", currentLevel: 2, targetLevel: 4, validated: false },
      { id: "ts6", name: "Cloud Services (AWS)", currentLevel: 3, targetLevel: 4, validated: true },
    ],
  },
  {
    id: "leadership",
    name: "Leadership & Management",
    icon: Users,
    color: "bg-purple-500/10 text-purple-500",
    skills: [
      { id: "ls1", name: "Team Leadership", currentLevel: 2, targetLevel: 4, validated: false },
      { id: "ls2", name: "Project Management", currentLevel: 3, targetLevel: 4, validated: true },
      { id: "ls3", name: "Mentoring", currentLevel: 3, targetLevel: 4, validated: false },
      { id: "ls4", name: "Decision Making", currentLevel: 3, targetLevel: 4, validated: false },
    ],
  },
  {
    id: "communication",
    name: "Communication",
    icon: MessageSquare,
    color: "bg-emerald-500/10 text-emerald-500",
    skills: [
      { id: "cs1", name: "Written Communication", currentLevel: 4, targetLevel: 4, validated: true },
      { id: "cs2", name: "Presentation Skills", currentLevel: 2, targetLevel: 4, validated: false },
      { id: "cs3", name: "Stakeholder Management", currentLevel: 2, targetLevel: 3, validated: false },
      { id: "cs4", name: "Active Listening", currentLevel: 4, targetLevel: 4, validated: true },
    ],
  },
  {
    id: "strategic",
    name: "Strategic Thinking",
    icon: Target,
    color: "bg-amber-500/10 text-amber-500",
    skills: [
      { id: "ss1", name: "Problem Solving", currentLevel: 4, targetLevel: 5, validated: true },
      { id: "ss2", name: "Critical Thinking", currentLevel: 3, targetLevel: 4, validated: false },
      { id: "ss3", name: "Business Acumen", currentLevel: 2, targetLevel: 4, validated: false },
    ],
  },
]

const skillLevels = [
  { level: 1, name: "Beginner", description: "Basic awareness, learning fundamentals" },
  { level: 2, name: "Developing", description: "Can apply with guidance" },
  { level: 3, name: "Proficient", description: "Works independently" },
  { level: 4, name: "Advanced", description: "Deep expertise, mentors others" },
  { level: 5, name: "Expert", description: "Industry-recognized authority" },
]

const pendingValidations = [
  { id: "pv1", skill: "Node.js", requestedFrom: "Sarah Chen", requestedDate: "2025-01-28", status: "pending" },
  { id: "pv2", skill: "System Architecture", requestedFrom: "Michael Park", requestedDate: "2025-02-01", status: "pending" },
]

const recentAchievements = [
  { id: "ra1", skill: "AWS Cloud Services", level: 3, validatedBy: "Tech Lead", date: "2025-01-20" },
  { id: "ra2", skill: "React/Next.js", level: 4, validatedBy: "Senior Developer", date: "2025-01-15" },
]

function getLevelColor(level: number) {
  const colors: Record<number, string> = {
    1: "bg-slate-500",
    2: "bg-blue-500",
    3: "bg-emerald-500",
    4: "bg-purple-500",
    5: "bg-amber-500",
  }
  return colors[level] || "bg-slate-500"
}

function getLevelName(level: number) {
  return skillLevels.find((l) => l.level === level)?.name || "Unknown"
}

export default function SkillsPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")

  const totalSkills = skillCategories.reduce((acc, cat) => acc + cat.skills.length, 0)
  const validatedSkills = skillCategories.reduce(
    (acc, cat) => acc + cat.skills.filter((s) => s.validated).length,
    0
  )
  const atTargetSkills = skillCategories.reduce(
    (acc, cat) => acc + cat.skills.filter((s) => s.currentLevel >= s.targetLevel).length,
    0
  )

  const filteredCategories = skillCategories.filter(
    (cat) => categoryFilter === "all" || cat.id === categoryFilter
  )

  return (
    <div className="space-y-6 p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Skills & Competencies</h1>
          <p className="text-sm text-muted-foreground">Track and develop your professional skills</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Award className="mr-2 h-4 w-4" />
            Request Validation
          </Button>
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Add Skill
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10">
                <Layers className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{totalSkills}</p>
                <p className="text-xs text-muted-foreground">Total Skills</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10">
                <Check className="h-5 w-5 text-emerald-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{validatedSkills}</p>
                <p className="text-xs text-muted-foreground">Validated</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500/10">
                <Target className="h-5 w-5 text-purple-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{atTargetSkills}</p>
                <p className="text-xs text-muted-foreground">At Target Level</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10">
                <TrendingUp className="h-5 w-5 text-amber-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{pendingValidations.length}</p>
                <p className="text-xs text-muted-foreground">Pending Validations</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Skill Level Legend */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap items-center gap-4">
            <span className="text-sm font-medium text-foreground">Skill Levels:</span>
            {skillLevels.map((level) => (
              <div key={level.level} className="flex items-center gap-2">
                <div className={`h-3 w-3 rounded-full ${getLevelColor(level.level)}`} />
                <span className="text-xs text-muted-foreground">
                  {level.level}. {level.name}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <TabsList>
            <TabsTrigger value="all">
              <Layers className="mr-2 h-4 w-4" />
              All Skills
            </TabsTrigger>
            <TabsTrigger value="validations">
              <Award className="mr-2 h-4 w-4" />
              Validations
            </TabsTrigger>
          </TabsList>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search skills..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-[200px] pl-9"
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[180px]">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {skillCategories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* All Skills Tab */}
        <TabsContent value="all" className="space-y-6">
          {filteredCategories.map((category) => {
            const Icon = category.icon
            const filteredSkills = category.skills.filter((skill) =>
              skill.name.toLowerCase().includes(searchQuery.toLowerCase())
            )

            if (filteredSkills.length === 0) return null

            return (
              <Card key={category.id}>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-base font-semibold">
                    <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${category.color}`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    {category.name}
                  </CardTitle>
                  <CardDescription>
                    {filteredSkills.length} skills - {filteredSkills.filter((s) => s.validated).length} validated
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {filteredSkills.map((skill) => (
                      <div
                        key={skill.id}
                        className="group relative rounded-lg border bg-card p-4 transition-all hover:shadow-md"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <h4 className="font-medium text-foreground">{skill.name}</h4>
                              {skill.validated && (
                                <Badge variant="default" className="h-5 px-1.5 text-[10px]">
                                  <Check className="mr-0.5 h-3 w-3" />
                                  Verified
                                </Badge>
                              )}
                            </div>
                            <div className="mt-2 flex items-center gap-2">
                              <div className={`h-2 w-2 rounded-full ${getLevelColor(skill.currentLevel)}`} />
                              <span className="text-xs text-muted-foreground">
                                {getLevelName(skill.currentLevel)}
                              </span>
                              {skill.currentLevel < skill.targetLevel && (
                                <>
                                  <ChevronRight className="h-3 w-3 text-muted-foreground" />
                                  <span className="text-xs font-medium text-primary">
                                    Target: {getLevelName(skill.targetLevel)}
                                  </span>
                                </>
                              )}
                            </div>
                          </div>
                          <div className="flex flex-col items-center gap-1">
                            <div
                              className={`flex h-10 w-10 items-center justify-center rounded-full ${getLevelColor(skill.currentLevel)}`}
                            >
                              <span className="text-lg font-bold text-white">{skill.currentLevel}</span>
                            </div>
                            <span className="text-[10px] text-muted-foreground">/ 5</span>
                          </div>
                        </div>
                        <div className="mt-3">
                          <Progress
                            value={(skill.currentLevel / skill.targetLevel) * 100}
                            className="h-1.5"
                          />
                        </div>
                        <div className="mt-3 flex items-center justify-between opacity-0 transition-opacity group-hover:opacity-100">
                          <Button variant="ghost" size="sm" className="h-7 text-xs">
                            <BookOpen className="mr-1 h-3 w-3" />
                            Resources
                          </Button>
                          <Button variant="ghost" size="sm" className="h-7 text-xs">
                            <Award className="mr-1 h-3 w-3" />
                            Validate
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </TabsContent>

        {/* Validations Tab */}
        <TabsContent value="validations" className="space-y-4">
          <div className="grid gap-4 lg:grid-cols-2">
            {/* Pending Validations */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base font-semibold">
                  <Zap className="h-4 w-4 text-amber-500" />
                  Pending Validations
                </CardTitle>
                <CardDescription>Skills awaiting verification from peers</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                {pendingValidations.length > 0 ? (
                  <div className="divide-y">
                    {pendingValidations.map((validation) => (
                      <div
                        key={validation.id}
                        className="flex items-center justify-between p-4 transition-colors hover:bg-muted/50"
                      >
                        <div>
                          <p className="font-medium text-foreground">{validation.skill}</p>
                          <p className="text-sm text-muted-foreground">
                            Requested from {validation.requestedFrom}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">Pending</Badge>
                          <Button variant="ghost" size="sm">
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-6 text-center text-muted-foreground">
                    No pending validations
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Recent Achievements */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base font-semibold">
                  <Star className="h-4 w-4 text-emerald-500" />
                  Recent Achievements
                </CardTitle>
                <CardDescription>Recently validated skill levels</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y">
                  {recentAchievements.map((achievement) => (
                    <div
                      key={achievement.id}
                      className="flex items-center justify-between p-4 transition-colors hover:bg-muted/50"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`flex h-10 w-10 items-center justify-center rounded-full ${getLevelColor(achievement.level)}`}
                        >
                          <span className="text-lg font-bold text-white">{achievement.level}</span>
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{achievement.skill}</p>
                          <p className="text-sm text-muted-foreground">
                            Validated by {achievement.validatedBy}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant="default" className="bg-emerald-500">
                          <Check className="mr-1 h-3 w-3" />
                          Verified
                        </Badge>
                        <p className="mt-1 text-xs text-muted-foreground">{achievement.date}</p>
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
