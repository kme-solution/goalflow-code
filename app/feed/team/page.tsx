"use client"

import { useState } from "react"
import { useAuth } from "@/lib/auth"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
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
  Heart,
  MessageCircle,
  Share2,
  MoreHorizontal,
  Target,
  Award,
  CheckCircle,
  TrendingUp,
  Users,
  Calendar,
  Clock,
  ChevronRight,
  Zap,
  Activity,
  Circle,
  ArrowUp,
  ArrowDown,
  Minus,
} from "lucide-react"

// Team member status type
type MemberStatus = "online" | "away" | "busy" | "offline"

// Mock team members with their current status
const teamMembers = [
  {
    id: "1",
    name: "Alex Rodriguez",
    avatar: "/avatars/alex.jpg",
    initials: "AR",
    role: "Senior Engineer",
    status: "online" as MemberStatus,
    lastActivity: "Just now",
    currentGoals: 4,
    completedGoals: 2,
    weeklyProgress: 85,
    mood: 4,
    recentActivity: {
      type: "goal_progress",
      description: "Updated API optimization goal to 75%",
      time: "10 min ago",
    },
  },
  {
    id: "2",
    name: "Sarah Chen",
    avatar: "/avatars/sarah.jpg",
    initials: "SC",
    role: "Product Manager",
    status: "online" as MemberStatus,
    lastActivity: "5 min ago",
    currentGoals: 5,
    completedGoals: 3,
    weeklyProgress: 92,
    mood: 5,
    recentActivity: {
      type: "recognition",
      description: "Recognized Michael for great collaboration",
      time: "30 min ago",
    },
  },
  {
    id: "3",
    name: "Michael Park",
    avatar: "/avatars/michael.jpg",
    initials: "MP",
    role: "Backend Developer",
    status: "busy" as MemberStatus,
    lastActivity: "1 hour ago",
    currentGoals: 3,
    completedGoals: 1,
    weeklyProgress: 68,
    mood: 3,
    recentActivity: {
      type: "checkin",
      description: "Completed daily check-in",
      time: "2 hours ago",
    },
  },
  {
    id: "4",
    name: "Emily Watson",
    avatar: "/avatars/emily.jpg",
    initials: "EW",
    role: "UX Designer",
    status: "away" as MemberStatus,
    lastActivity: "3 hours ago",
    currentGoals: 4,
    completedGoals: 2,
    weeklyProgress: 78,
    mood: 4,
    recentActivity: {
      type: "goal_completed",
      description: "Completed 'Design System V2' goal",
      time: "Yesterday",
    },
  },
  {
    id: "5",
    name: "David Kim",
    avatar: "/avatars/david.jpg",
    initials: "DK",
    role: "QA Engineer",
    status: "offline" as MemberStatus,
    lastActivity: "Yesterday",
    currentGoals: 3,
    completedGoals: 2,
    weeklyProgress: 95,
    mood: 5,
    recentActivity: {
      type: "goal_progress",
      description: "Test coverage increased to 90%",
      time: "Yesterday",
    },
  },
]

// Mock team activities
const teamActivities = [
  {
    id: "1",
    user: { name: "Alex Rodriguez", initials: "AR", avatar: "/avatars/alex.jpg" },
    type: "goal_progress" as const,
    content: "Made great progress on API optimization - now at 75% completion!",
    goalTitle: "API Performance Optimization",
    goalProgress: 75,
    timestamp: "10 minutes ago",
    reactions: { likes: 5, comments: 2 },
  },
  {
    id: "2",
    user: { name: "Sarah Chen", initials: "SC", avatar: "/avatars/sarah.jpg" },
    type: "recognition" as const,
    content: "Huge thanks to @Michael Park for staying late to help debug the payment issue. Your dedication is truly appreciated!",
    recipient: { name: "Michael Park", initials: "MP" },
    badge: "Teamwork",
    timestamp: "30 minutes ago",
    reactions: { likes: 12, comments: 4 },
  },
  {
    id: "3",
    user: { name: "Emily Watson", initials: "EW", avatar: "/avatars/emily.jpg" },
    type: "goal_completed" as const,
    content: "Just wrapped up the Design System V2! All components are now documented and ready for handoff.",
    goalTitle: "Design System V2",
    goalProgress: 100,
    timestamp: "2 hours ago",
    reactions: { likes: 18, comments: 7 },
  },
  {
    id: "4",
    user: { name: "David Kim", initials: "DK", avatar: "/avatars/david.jpg" },
    type: "milestone" as const,
    content: "Test coverage milestone achieved! We've reached 90% coverage across all critical modules.",
    milestone: "90% Test Coverage",
    timestamp: "Yesterday",
    reactions: { likes: 24, comments: 9 },
  },
]

const statusColors: Record<MemberStatus, string> = {
  online: "bg-emerald-500",
  away: "bg-amber-500",
  busy: "bg-red-500",
  offline: "bg-gray-400",
}

const activityTypeStyles = {
  goal_progress: { icon: TrendingUp, color: "text-blue-500", bg: "bg-blue-500/10" },
  goal_completed: { icon: Target, color: "text-emerald-500", bg: "bg-emerald-500/10" },
  recognition: { icon: Award, color: "text-amber-500", bg: "bg-amber-500/10" },
  checkin: { icon: CheckCircle, color: "text-teal-500", bg: "bg-teal-500/10" },
  milestone: { icon: Zap, color: "text-purple-500", bg: "bg-purple-500/10" },
}

export default function TeamFeedPage() {
  const { user } = useAuth()
  const [timeRange, setTimeRange] = useState("week")
  const [sortBy, setSortBy] = useState("recent")

  // Calculate team stats
  const teamStats = {
    totalMembers: teamMembers.length,
    online: teamMembers.filter(m => m.status === "online").length,
    avgProgress: Math.round(teamMembers.reduce((sum, m) => sum + m.weeklyProgress, 0) / teamMembers.length),
    goalsCompleted: teamMembers.reduce((sum, m) => sum + m.completedGoals, 0),
    avgMood: (teamMembers.reduce((sum, m) => sum + m.mood, 0) / teamMembers.length).toFixed(1),
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-6xl mx-auto p-4 md:p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">My Team Activity</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Track your team's progress, achievements, and well-being
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[130px]">
                <Calendar className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="quarter">This Quarter</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Team Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <div>
                <div className="text-2xl font-bold">{teamStats.totalMembers}</div>
                <div className="text-xs text-muted-foreground">Team Members</div>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                <Circle className="h-5 w-5 text-emerald-500 fill-emerald-500" />
              </div>
              <div>
                <div className="text-2xl font-bold">{teamStats.online}</div>
                <div className="text-xs text-muted-foreground">Online Now</div>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <div className="text-2xl font-bold">{teamStats.avgProgress}%</div>
                <div className="text-xs text-muted-foreground">Avg Progress</div>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-amber-500/10 flex items-center justify-center">
                <Target className="h-5 w-5 text-amber-500" />
              </div>
              <div>
                <div className="text-2xl font-bold">{teamStats.goalsCompleted}</div>
                <div className="text-xs text-muted-foreground">Goals Done</div>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-pink-500/10 flex items-center justify-center">
                <Heart className="h-5 w-5 text-pink-500" />
              </div>
              <div>
                <div className="text-2xl font-bold">{teamStats.avgMood}</div>
                <div className="text-xs text-muted-foreground">Avg Mood</div>
              </div>
            </div>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Team Members Panel */}
          <div className="lg:col-span-1 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-foreground">Team Members</h2>
              <Button variant="ghost" size="sm" className="text-xs">
                View All
              </Button>
            </div>

            <div className="space-y-2">
              {teamMembers.map((member) => (
                <Card
                  key={member.id}
                  className="p-3 hover:bg-muted/50 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={member.avatar} />
                        <AvatarFallback className="bg-primary/10 text-primary text-sm">
                          {member.initials}
                        </AvatarFallback>
                      </Avatar>
                      <div
                        className={`absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-card ${statusColors[member.status]}`}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-sm truncate">{member.name}</span>
                        <div className="flex items-center gap-1">
                          {member.weeklyProgress >= 80 ? (
                            <ArrowUp className="h-3 w-3 text-emerald-500" />
                          ) : member.weeklyProgress >= 50 ? (
                            <Minus className="h-3 w-3 text-amber-500" />
                          ) : (
                            <ArrowDown className="h-3 w-3 text-red-500" />
                          )}
                          <span className="text-xs font-medium">{member.weeklyProgress}%</span>
                        </div>
                      </div>
                      <div className="text-xs text-muted-foreground truncate">{member.role}</div>
                      <div className="mt-1.5">
                        <Progress value={member.weeklyProgress} className="h-1" />
                      </div>
                    </div>
                  </div>
                  <div className="mt-2 pt-2 border-t flex items-center justify-between text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Activity className="h-3 w-3" />
                      {member.recentActivity.time}
                    </span>
                    <span>
                      {member.completedGoals}/{member.currentGoals} goals
                    </span>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Team Activity Feed */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-foreground">Recent Activity</h2>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[140px] h-8 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">Most Recent</SelectItem>
                  <SelectItem value="popular">Most Popular</SelectItem>
                  <SelectItem value="goals">Goals Only</SelectItem>
                  <SelectItem value="recognition">Recognition Only</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4">
              {teamActivities.map((activity) => {
                const typeStyle = activityTypeStyles[activity.type]
                const TypeIcon = typeStyle.icon

                return (
                  <Card key={activity.id} className="p-4">
                    {/* Activity Header */}
                    <div className="flex items-start gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={activity.user.avatar} />
                        <AvatarFallback className="bg-primary/10 text-primary text-sm">
                          {activity.user.initials}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-semibold text-sm">{activity.user.name}</span>
                          <Badge variant="secondary" className={`${typeStyle.bg} ${typeStyle.color} border-0 text-[10px]`}>
                            <TypeIcon className="h-3 w-3 mr-1" />
                            {activity.type.replace("_", " ")}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
                          <Clock className="h-3 w-3" />
                          {activity.timestamp}
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>

                    {/* Activity Content */}
                    <div className="mt-3 text-sm">
                      {/* Recognition recipient */}
                      {"recipient" in activity && activity.recipient && (
                        <div className="flex items-center gap-2 mb-2 text-muted-foreground">
                          <span>Recognized</span>
                          <Avatar className="h-5 w-5">
                            <AvatarFallback className="text-[10px] bg-amber-500/10 text-amber-600">
                              {activity.recipient.initials}
                            </AvatarFallback>
                          </Avatar>
                          <span className="font-medium text-foreground">{activity.recipient.name}</span>
                          {"badge" in activity && (
                            <Badge variant="outline" className="text-[10px]">
                              {activity.badge}
                            </Badge>
                          )}
                        </div>
                      )}

                      <p className="text-foreground">{activity.content}</p>

                      {/* Goal progress */}
                      {"goalTitle" in activity && (
                        <div className="mt-3 p-3 bg-muted/50 rounded-lg border">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-medium">{activity.goalTitle}</span>
                            <span className={`text-xs font-bold ${activity.goalProgress === 100 ? "text-emerald-500" : "text-primary"}`}>
                              {activity.goalProgress}%
                            </span>
                          </div>
                          <Progress value={activity.goalProgress} className="h-2" />
                        </div>
                      )}

                      {/* Milestone */}
                      {"milestone" in activity && (
                        <div className="mt-3 p-3 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg border border-purple-200/50">
                          <div className="flex items-center gap-2">
                            <Zap className="h-5 w-5 text-purple-500" />
                            <span className="font-semibold text-purple-700">{activity.milestone}</span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Activity Actions */}
                    <div className="mt-3 pt-3 border-t flex items-center gap-4">
                      <Button variant="ghost" size="sm" className="gap-1.5 text-xs h-8 text-muted-foreground">
                        <Heart className="h-4 w-4" />
                        {activity.reactions.likes}
                      </Button>
                      <Button variant="ghost" size="sm" className="gap-1.5 text-xs h-8 text-muted-foreground">
                        <MessageCircle className="h-4 w-4" />
                        {activity.reactions.comments}
                      </Button>
                      <Button variant="ghost" size="sm" className="gap-1.5 text-xs h-8 text-muted-foreground">
                        <Share2 className="h-4 w-4" />
                        Share
                      </Button>
                    </div>
                  </Card>
                )
              })}
            </div>

            {/* Load more */}
            <div className="flex justify-center">
              <Button variant="outline" size="sm">
                Load More Activity
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
