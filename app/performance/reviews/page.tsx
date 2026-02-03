"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Calendar,
  ChevronRight,
  Clock,
  FileText,
  Filter,
  MoreHorizontal,
  Plus,
  Star,
  Target,
  TrendingUp,
  User,
  Users,
} from "lucide-react"

// Mock data
const reviewCycles = [
  {
    id: "1",
    name: "Q4 2025 Performance Review",
    status: "active",
    startDate: "2025-10-01",
    endDate: "2025-12-31",
    progress: 65,
    totalParticipants: 48,
    completedReviews: 31,
  },
  {
    id: "2",
    name: "Q3 2025 Performance Review",
    status: "completed",
    startDate: "2025-07-01",
    endDate: "2025-09-30",
    progress: 100,
    totalParticipants: 45,
    completedReviews: 45,
  },
]

const myReviews = [
  {
    id: "r1",
    type: "Self Assessment",
    cycle: "Q4 2025",
    status: "pending",
    dueDate: "2025-12-15",
    manager: "Sarah Chen",
    managerAvatar: "",
  },
  {
    id: "r2",
    type: "Manager Review",
    cycle: "Q3 2025",
    status: "completed",
    dueDate: "2025-09-30",
    manager: "Sarah Chen",
    managerAvatar: "",
    rating: 4.5,
  },
  {
    id: "r3",
    type: "Peer Feedback",
    cycle: "Q4 2025",
    status: "in_progress",
    dueDate: "2025-12-20",
    requestedBy: "Alex Johnson",
  },
]

const teamReviews = [
  {
    id: "t1",
    employee: "Emily Rodriguez",
    avatar: "",
    role: "Senior Developer",
    status: "pending",
    selfAssessment: "completed",
    managerReview: "pending",
    peerFeedback: 3,
    dueDate: "2025-12-15",
  },
  {
    id: "t2",
    employee: "Michael Chen",
    avatar: "",
    role: "Product Designer",
    status: "in_progress",
    selfAssessment: "completed",
    managerReview: "in_progress",
    peerFeedback: 2,
    dueDate: "2025-12-15",
  },
  {
    id: "t3",
    employee: "Jessica Park",
    avatar: "",
    role: "Frontend Engineer",
    status: "completed",
    selfAssessment: "completed",
    managerReview: "completed",
    peerFeedback: 4,
    dueDate: "2025-12-10",
    rating: 4.2,
  },
]

const statusConfig: Record<string, { label: string; variant: "default" | "secondary" | "outline" | "destructive" }> = {
  pending: { label: "Pending", variant: "outline" },
  in_progress: { label: "In Progress", variant: "secondary" },
  completed: { label: "Completed", variant: "default" },
  overdue: { label: "Overdue", variant: "destructive" },
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}

function getDaysRemaining(dateString: string) {
  const today = new Date()
  const dueDate = new Date(dateString)
  const diffTime = dueDate.getTime() - today.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return diffDays
}

export default function ReviewsPage() {
  const [activeTab, setActiveTab] = useState("my-reviews")

  return (
    <div className="space-y-6 p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Performance Reviews</h1>
          <p className="text-sm text-muted-foreground">Manage and track performance evaluations</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Start Review
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <FileText className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">3</p>
                <p className="text-xs text-muted-foreground">Pending Reviews</p>
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
                <p className="text-2xl font-bold text-foreground">12</p>
                <p className="text-xs text-muted-foreground">Days Until Deadline</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10">
                <TrendingUp className="h-5 w-5 text-emerald-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">4.3</p>
                <p className="text-xs text-muted-foreground">Avg. Rating</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10">
                <Users className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">6</p>
                <p className="text-xs text-muted-foreground">Team Members</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Active Cycle Banner */}
      {reviewCycles.filter((c) => c.status === "active").map((cycle) => (
        <Card key={cycle.id} className="border-primary/20 bg-primary/5">
          <CardContent className="p-4">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Target className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-foreground">{cycle.name}</h3>
                    <Badge variant="default" className="text-xs">
                      Active
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {formatDate(cycle.startDate)} - {formatDate(cycle.endDate)}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="min-w-[200px]">
                  <div className="mb-1 flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-medium text-foreground">{cycle.progress}%</span>
                  </div>
                  <Progress value={cycle.progress} className="h-2" />
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-foreground">
                    {cycle.completedReviews}/{cycle.totalParticipants}
                  </p>
                  <p className="text-xs text-muted-foreground">Completed</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="my-reviews">
            <User className="mr-2 h-4 w-4" />
            My Reviews
          </TabsTrigger>
          <TabsTrigger value="team-reviews">
            <Users className="mr-2 h-4 w-4" />
            Team Reviews
          </TabsTrigger>
        </TabsList>

        {/* My Reviews Tab */}
        <TabsContent value="my-reviews" className="space-y-4">
          <div className="grid gap-4">
            {myReviews.map((review) => {
              const daysRemaining = getDaysRemaining(review.dueDate)
              const status = statusConfig[review.status] || statusConfig.pending

              return (
                <Card key={review.id} className="transition-all hover:shadow-md">
                  <CardContent className="p-4">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex items-start gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-muted">
                          {review.type === "Self Assessment" ? (
                            <User className="h-6 w-6 text-muted-foreground" />
                          ) : review.type === "Peer Feedback" ? (
                            <Users className="h-6 w-6 text-muted-foreground" />
                          ) : (
                            <FileText className="h-6 w-6 text-muted-foreground" />
                          )}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-foreground">{review.type}</h3>
                            <Badge variant={status.variant}>{status.label}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{review.cycle} Review Cycle</p>
                          {review.manager && (
                            <div className="mt-2 flex items-center gap-2">
                              <Avatar className="h-5 w-5">
                                <AvatarImage src={review.managerAvatar} />
                                <AvatarFallback className="text-[10px]">
                                  {getInitials(review.manager)}
                                </AvatarFallback>
                              </Avatar>
                              <span className="text-xs text-muted-foreground">Manager: {review.manager}</span>
                            </div>
                          )}
                          {review.requestedBy && (
                            <p className="mt-1 text-xs text-muted-foreground">
                              Requested by: {review.requestedBy}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        {review.rating && (
                          <div className="flex items-center gap-1 rounded-lg bg-amber-500/10 px-3 py-1.5">
                            <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
                            <span className="font-semibold text-amber-600">{review.rating}</span>
                          </div>
                        )}
                        <div className="text-right">
                          <div className="flex items-center gap-1 text-sm">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span className="text-muted-foreground">{formatDate(review.dueDate)}</span>
                          </div>
                          {review.status !== "completed" && (
                            <p
                              className={`text-xs ${daysRemaining <= 3 ? "text-destructive" : daysRemaining <= 7 ? "text-amber-500" : "text-muted-foreground"}`}
                            >
                              {daysRemaining > 0 ? `${daysRemaining} days left` : "Overdue"}
                            </p>
                          )}
                        </div>
                        <Button variant="ghost" size="sm">
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        {/* Team Reviews Tab */}
        <TabsContent value="team-reviews" className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold">Team Members</CardTitle>
              <CardDescription>Review status for your direct reports</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y">
                {teamReviews.map((member) => {
                  const status = statusConfig[member.status] || statusConfig.pending

                  return (
                    <div
                      key={member.id}
                      className="flex flex-col gap-4 p-4 transition-colors hover:bg-muted/50 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={member.avatar} />
                          <AvatarFallback>{getInitials(member.employee)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-medium text-foreground">{member.employee}</h4>
                            <Badge variant={status.variant} className="text-xs">
                              {status.label}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{member.role}</p>
                        </div>
                      </div>
                      <div className="flex flex-wrap items-center gap-3 sm:gap-6">
                        <div className="flex items-center gap-4">
                          <div className="text-center">
                            <div
                              className={`h-2 w-2 rounded-full ${member.selfAssessment === "completed" ? "bg-emerald-500" : "bg-muted"}`}
                            />
                            <p className="mt-1 text-[10px] text-muted-foreground">Self</p>
                          </div>
                          <div className="text-center">
                            <div
                              className={`h-2 w-2 rounded-full ${member.managerReview === "completed" ? "bg-emerald-500" : member.managerReview === "in_progress" ? "bg-amber-500" : "bg-muted"}`}
                            />
                            <p className="mt-1 text-[10px] text-muted-foreground">Manager</p>
                          </div>
                          <div className="text-center">
                            <div className="flex h-4 items-center justify-center rounded bg-muted px-1.5 text-[10px] font-medium text-muted-foreground">
                              {member.peerFeedback}
                            </div>
                            <p className="mt-1 text-[10px] text-muted-foreground">Peers</p>
                          </div>
                        </div>
                        {member.rating && (
                          <div className="flex items-center gap-1 rounded-lg bg-amber-500/10 px-2 py-1">
                            <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
                            <span className="text-sm font-medium text-amber-600">{member.rating}</span>
                          </div>
                        )}
                        <div className="text-right">
                          <p className="text-xs text-muted-foreground">Due {formatDate(member.dueDate)}</p>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>View Details</DropdownMenuItem>
                            <DropdownMenuItem>Start Review</DropdownMenuItem>
                            <DropdownMenuItem>Request Peer Feedback</DropdownMenuItem>
                            <DropdownMenuItem>Send Reminder</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
