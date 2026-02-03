"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertTriangle,
  Archive,
  Calendar,
  Check,
  ChevronRight,
  Clock,
  Copy,
  Edit,
  FileText,
  MoreHorizontal,
  Pause,
  Play,
  Plus,
  RefreshCw,
  Settings,
  Target,
  Trash2,
  Users,
} from "lucide-react"

// Mock data
const reviewCycles = [
  {
    id: "rc1",
    name: "Q4 2025 Performance Review",
    type: "Quarterly",
    status: "active",
    startDate: "2025-10-01",
    endDate: "2025-12-31",
    selfAssessmentDeadline: "2025-12-10",
    managerReviewDeadline: "2025-12-20",
    calibrationDate: "2025-12-22",
    finalDate: "2025-12-31",
    totalParticipants: 135,
    completedReviews: 98,
    inProgress: 25,
    notStarted: 12,
    template: "Standard Performance Review",
  },
  {
    id: "rc2",
    name: "Q3 2025 Performance Review",
    type: "Quarterly",
    status: "completed",
    startDate: "2025-07-01",
    endDate: "2025-09-30",
    selfAssessmentDeadline: "2025-09-10",
    managerReviewDeadline: "2025-09-20",
    calibrationDate: "2025-09-25",
    finalDate: "2025-09-30",
    totalParticipants: 128,
    completedReviews: 128,
    inProgress: 0,
    notStarted: 0,
    template: "Standard Performance Review",
  },
  {
    id: "rc3",
    name: "2025 Annual Review",
    type: "Annual",
    status: "scheduled",
    startDate: "2026-01-15",
    endDate: "2026-02-28",
    selfAssessmentDeadline: "2026-02-01",
    managerReviewDeadline: "2026-02-14",
    calibrationDate: "2026-02-21",
    finalDate: "2026-02-28",
    totalParticipants: 145,
    completedReviews: 0,
    inProgress: 0,
    notStarted: 145,
    template: "Annual Comprehensive Review",
  },
  {
    id: "rc4",
    name: "Probation Review - Engineering",
    type: "Probation",
    status: "active",
    startDate: "2025-11-01",
    endDate: "2025-12-15",
    selfAssessmentDeadline: "2025-12-05",
    managerReviewDeadline: "2025-12-12",
    calibrationDate: null,
    finalDate: "2025-12-15",
    totalParticipants: 8,
    completedReviews: 3,
    inProgress: 4,
    notStarted: 1,
    template: "Probation Assessment",
  },
]

const cyclePhases = [
  { id: "setup", name: "Setup", icon: Settings },
  { id: "self", name: "Self Assessment", icon: FileText },
  { id: "manager", name: "Manager Review", icon: Users },
  { id: "calibration", name: "Calibration", icon: Target },
  { id: "complete", name: "Complete", icon: Check },
]

const statusConfig: Record<string, { label: string; variant: "default" | "secondary" | "outline" | "destructive"; color: string }> = {
  active: { label: "Active", variant: "default", color: "bg-emerald-500" },
  scheduled: { label: "Scheduled", variant: "secondary", color: "bg-blue-500" },
  completed: { label: "Completed", variant: "outline", color: "bg-muted" },
  paused: { label: "Paused", variant: "secondary", color: "bg-amber-500" },
  archived: { label: "Archived", variant: "outline", color: "bg-muted" },
}

const typeConfig: Record<string, { color: string }> = {
  Quarterly: { color: "bg-blue-500/10 text-blue-600" },
  Annual: { color: "bg-purple-500/10 text-purple-600" },
  Probation: { color: "bg-amber-500/10 text-amber-600" },
  "Mid-Year": { color: "bg-emerald-500/10 text-emerald-600" },
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}

function getPhaseStatus(cycle: typeof reviewCycles[0]) {
  const today = new Date()
  const start = new Date(cycle.startDate)
  const selfDeadline = new Date(cycle.selfAssessmentDeadline)
  const managerDeadline = new Date(cycle.managerReviewDeadline)
  const finalDate = new Date(cycle.finalDate)

  if (cycle.status === "completed") return "complete"
  if (cycle.status === "scheduled") return "setup"
  if (today < selfDeadline) return "self"
  if (today < managerDeadline) return "manager"
  if (cycle.calibrationDate && today < new Date(cycle.calibrationDate)) return "calibration"
  return "complete"
}

export default function ReviewCyclesPage() {
  const [activeTab, setActiveTab] = useState("all")

  const activeCycles = reviewCycles.filter((c) => c.status === "active")
  const scheduledCycles = reviewCycles.filter((c) => c.status === "scheduled")
  const completedCycles = reviewCycles.filter((c) => c.status === "completed")

  const filteredCycles = activeTab === "all" 
    ? reviewCycles 
    : reviewCycles.filter((c) => c.status === activeTab)

  return (
    <div className="space-y-6 p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Review Cycles</h1>
          <p className="text-sm text-muted-foreground">Manage performance review cycles and timelines</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <RefreshCw className="mr-2 h-4 w-4" />
            Sync
          </Button>
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Create Cycle
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10">
                <Play className="h-5 w-5 text-emerald-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{activeCycles.length}</p>
                <p className="text-xs text-muted-foreground">Active Cycles</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10">
                <Calendar className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{scheduledCycles.length}</p>
                <p className="text-xs text-muted-foreground">Scheduled</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {activeCycles.reduce((acc, c) => acc + c.totalParticipants, 0)}
                </p>
                <p className="text-xs text-muted-foreground">Active Participants</p>
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
                <p className="text-2xl font-bold text-foreground">{completedCycles.length}</p>
                <p className="text-xs text-muted-foreground">Completed</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Cycles</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-4">
          {filteredCycles.map((cycle) => {
            const status = statusConfig[cycle.status] || statusConfig.active
            const typeStyle = typeConfig[cycle.type] || typeConfig.Quarterly
            const completionPercentage = Math.round(
              (cycle.completedReviews / cycle.totalParticipants) * 100
            )
            const currentPhase = getPhaseStatus(cycle)

            return (
              <Card key={cycle.id} className="transition-all hover:shadow-md">
                <CardContent className="p-0">
                  <div className="p-4">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                      {/* Cycle Info */}
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="font-semibold text-foreground">{cycle.name}</h3>
                          <Badge variant={status.variant}>{status.label}</Badge>
                          <Badge className={typeStyle.color}>{cycle.type}</Badge>
                        </div>
                        <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {formatDate(cycle.startDate)} - {formatDate(cycle.endDate)}
                          </span>
                          <span className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            {cycle.totalParticipants} participants
                          </span>
                          <span className="flex items-center gap-1">
                            <FileText className="h-4 w-4" />
                            {cycle.template}
                          </span>
                        </div>

                        {/* Phase Progress */}
                        {cycle.status !== "completed" && (
                          <div className="mt-4">
                            <div className="flex items-center justify-between">
                              {cyclePhases.map((phase, idx) => {
                                const PhaseIcon = phase.icon
                                const isActive = phase.id === currentPhase
                                const isPast =
                                  cyclePhases.findIndex((p) => p.id === currentPhase) >
                                  cyclePhases.findIndex((p) => p.id === phase.id)

                                return (
                                  <div key={phase.id} className="flex flex-1 items-center">
                                    <div className="flex flex-col items-center">
                                      <div
                                        className={`flex h-8 w-8 items-center justify-center rounded-full ${
                                          isPast
                                            ? "bg-emerald-500 text-white"
                                            : isActive
                                              ? "bg-primary text-primary-foreground"
                                              : "bg-muted text-muted-foreground"
                                        }`}
                                      >
                                        {isPast ? (
                                          <Check className="h-4 w-4" />
                                        ) : (
                                          <PhaseIcon className="h-4 w-4" />
                                        )}
                                      </div>
                                      <span
                                        className={`mt-1 text-[10px] ${isActive ? "font-medium text-foreground" : "text-muted-foreground"}`}
                                      >
                                        {phase.name}
                                      </span>
                                    </div>
                                    {idx < cyclePhases.length - 1 && (
                                      <div
                                        className={`mx-1 h-0.5 flex-1 ${isPast ? "bg-emerald-500" : "bg-border"}`}
                                      />
                                    )}
                                  </div>
                                )
                              })}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Stats & Actions */}
                      <div className="flex items-center gap-4">
                        <div className="min-w-[180px]">
                          <div className="mb-2 flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Completion</span>
                            <span className="font-medium text-foreground">{completionPercentage}%</span>
                          </div>
                          <Progress value={completionPercentage} className="h-2" />
                          <div className="mt-2 flex justify-between text-xs text-muted-foreground">
                            <span>{cycle.completedReviews} done</span>
                            <span>{cycle.inProgress} in progress</span>
                            <span>{cycle.notStarted} pending</span>
                          </div>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <ChevronRight className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit Cycle
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Copy className="mr-2 h-4 w-4" />
                              Duplicate
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            {cycle.status === "active" && (
                              <DropdownMenuItem>
                                <Pause className="mr-2 h-4 w-4" />
                                Pause Cycle
                              </DropdownMenuItem>
                            )}
                            {cycle.status === "completed" && (
                              <DropdownMenuItem>
                                <Archive className="mr-2 h-4 w-4" />
                                Archive
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuItem className="text-destructive">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </div>

                  {/* Deadlines Row */}
                  {cycle.status === "active" && (
                    <div className="border-t bg-muted/30 px-4 py-3">
                      <div className="flex flex-wrap items-center gap-6 text-xs">
                        <div className="flex items-center gap-2">
                          <span className="text-muted-foreground">Self Assessment:</span>
                          <span className="font-medium text-foreground">
                            {formatDate(cycle.selfAssessmentDeadline)}
                          </span>
                          {new Date(cycle.selfAssessmentDeadline) < new Date() && (
                            <Badge variant="destructive" className="text-[10px]">
                              Overdue
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-muted-foreground">Manager Review:</span>
                          <span className="font-medium text-foreground">
                            {formatDate(cycle.managerReviewDeadline)}
                          </span>
                        </div>
                        {cycle.calibrationDate && (
                          <div className="flex items-center gap-2">
                            <span className="text-muted-foreground">Calibration:</span>
                            <span className="font-medium text-foreground">
                              {formatDate(cycle.calibrationDate)}
                            </span>
                          </div>
                        )}
                        <div className="flex items-center gap-2">
                          <span className="text-muted-foreground">Finalize:</span>
                          <span className="font-medium text-foreground">{formatDate(cycle.finalDate)}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )
          })}

          {filteredCycles.length === 0 && (
            <Card>
              <CardContent className="flex flex-col items-center justify-center p-12">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                  <Calendar className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="mt-4 font-semibold text-foreground">No cycles found</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {activeTab === "all"
                    ? "Create your first review cycle to get started."
                    : `No ${activeTab} cycles at the moment.`}
                </p>
                <Button className="mt-4" size="sm">
                  <Plus className="mr-2 h-4 w-4" />
                  Create Cycle
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
