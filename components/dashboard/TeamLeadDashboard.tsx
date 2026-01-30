// components/dashboard/TeamLeadDashboard.tsx
"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  Users, 
  Target, 
  TrendingUp, 
  Award,
  MessageSquare,
  Calendar,
  Star,
  Filter,
  MoreVertical,
  ChevronRight,
  Eye,
  Edit,
  Download,
  BarChart3,
  PieChart,
  LineChart,
  Settings,
  RefreshCw,
  ArrowUpRight,
  ArrowDownRight,
  Zap,
  BookOpen,
  AlertCircle,
  TrendingDown,
  Search,
  Users2,
  GitBranch,
  ClipboardCheck,
  ThumbsUp,
  Clock,
  TrendingUpIcon,
  CheckCircle2
} from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  LineChart as RechartsLineChart,
  Line,
  AreaChart,
  Area
} from "recharts"

// Mock data - generic team leadership metrics
const teamMembers = [
  { name: "Alex Johnson", role: "Team Member", progress: 85, tasks: 12, recognition: 5, engagement: "high", status: "active" },
  { name: "Sarah Miller", role: "Team Member", progress: 92, tasks: 8, recognition: 8, engagement: "high", status: "active" },
  { name: "Mike Chen", role: "Team Member", progress: 67, tasks: 15, recognition: 3, engagement: "medium", status: "active" },
  { name: "Lisa Wang", role: "Team Member", progress: 78, tasks: 10, recognition: 6, engagement: "high", status: "active" },
  { name: "Jamie Wilson", role: "Team Member", progress: 45, tasks: 20, recognition: 2, engagement: "low", status: "needs-attention" },
]

const teamGoals = [
  { category: "Completed", value: 45, color: "#10b981" },
  { category: "In Progress", value: 35, color: "#3b82f6" },
  { category: "At Risk", value: 12, color: "#f59e0b" },
  { category: "Not Started", value: 8, color: "#6b7280" },
]

const teamHealthMetrics = [
  { metric: "Engagement", score: 8.2, trend: "up" },
  { metric: "Collaboration", score: 7.8, trend: "stable" },
  { metric: "Productivity", score: 8.5, trend: "up" },
  { metric: "Workload Balance", score: 6.5, trend: "down" },
  { metric: "Recognition", score: 8.0, trend: "up" },
]

const projectStatus = [
  { project: "Q4 Campaign", team: "Marketing", status: "on-track", blockers: 0, progress: 82 },
  { project: "Sales Target", team: "Sales", status: "ahead", blockers: 0, progress: 95 },
  { project: "Process Optimization", team: "Operations", status: "at-risk", blockers: 2, progress: 45 },
  { project: "Client Onboarding", team: "Customer Success", status: "blocked", blockers: 3, progress: 30 },
]

const upcomingTeamMeetings = [
  { id: 1, type: "Team Stand-up", time: "Today, 9:30 AM", duration: "15 min", attendees: 8 },
  { id: 2, type: "Monthly Review", time: "Tomorrow, 2:00 PM", duration: "1 hour", attendees: "Full team" },
  { id: 3, type: "One-on-One", time: "Nov 20, 11:00 AM", duration: "30 min", attendees: 2 },
]

const recentTeamRecognition = [
  { id: 1, from: "Sarah Miller", to: "Alex Johnson", message: "Great collaboration on the project!", type: "teamwork", time: "2 hours ago" },
  { id: 2, from: "Mike Chen", to: "Lisa Wang", message: "Excellent problem-solving skills!", type: "innovation", time: "Yesterday" },
  { id: 3, from: "Team Lead", to: "Jamie Wilson", message: "Outstanding presentation skills", type: "communication", time: "2 days ago" },
]

const teamCapacity = [
  { week: "Week 42", planned: 85, completed: 72 },
  { week: "Week 43", planned: 90, completed: 88 },
  { week: "Week 44", planned: 85, completed: 92 },
  { week: "Week 45", planned: 95, completed: 86 },
]

const trainingProgress = [
  { program: "Leadership Skills", enrolled: 5, completed: 3 },
  { program: "Project Management", enrolled: 8, completed: 5 },
  { program: "Communication", enrolled: 6, completed: 4 },
  { program: "Team Building", enrolled: 4, completed: 2 },
]

const recentTeamAchievements = [
  { id: 1, achievement: "Exceeded Q3 Targets", type: "performance", impact: "high", date: "This week" },
  { id: 2, achievement: "100% Client Satisfaction", type: "quality", impact: "medium", date: "Last week" },
  { id: 3, achievement: "Cross-team Collaboration", type: "teamwork", impact: "high", date: "2 weeks ago" },
]

const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#6b7280']

export default function TeamLeadDashboard({ userId }: { userId: string }) {
  const [activeTab, setActiveTab] = useState("overview")
  const [loading, setLoading] = useState(false)
  const [timeRange, setTimeRange] = useState("month")
  const [searchQuery, setSearchQuery] = useState("")

  const quickActions = [
    { label: 'Team Meeting', icon: Users2, action: () => console.log('Team meeting') },
    { label: 'Recognize Team', icon: Star, action: () => console.log('Recognize team') },
    { label: 'Review Goals', icon: ClipboardCheck, action: () => console.log('Review goals') },
    { label: 'Team Sync', icon: MessageSquare, action: () => console.log('Team sync') },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "blocked": return "bg-red-100 text-red-700 border-red-200"
      case "ahead": return "bg-emerald-100 text-emerald-700 border-emerald-200"
      case "on-track": return "bg-green-100 text-green-700 border-green-200"
      case "at-risk": return "bg-amber-100 text-amber-700 border-amber-200"
      default: return "bg-gray-100 text-gray-700"
    }
  }

  const getEngagementColor = (engagement: string) => {
    switch (engagement) {
      case "high": return "bg-green-100 text-green-700"
      case "medium": return "bg-amber-100 text-amber-700"
      case "low": return "bg-red-100 text-red-700"
      default: return "bg-gray-100 text-gray-700"
    }
  }

  const getImpactBadge = (impact: string) => {
    switch (impact) {
      case "high": return <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100">High Impact</Badge>
      case "medium": return <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100">Medium Impact</Badge>
      case "low": return <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">Low Impact</Badge>
      default: return <Badge variant="outline">{impact}</Badge>
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Team Lead Dashboard</h1>
            <p className="text-gray-600 mt-2">Lead, coordinate, and empower your team</p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search team or projects..."
                className="pl-9 w-[200px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="quarter">This Quarter</SelectItem>
              </SelectContent>
            </Select>
            
            <Button>
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="border-l-4 border-l-blue-500">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center justify-between">
                <span className="text-gray-600">Team Size</span>
                <Badge variant="outline" className="bg-blue-50 text-blue-700">8</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-gray-900">+2</div>
                  <div className="text-sm text-gray-500">This quarter</div>
                </div>
                <Users className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-emerald-500">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center justify-between">
                <span className="text-gray-600">Team Goals</span>
                <Badge variant="outline" className="bg-emerald-50 text-emerald-700">18</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-gray-900">81%</div>
                  <div className="text-sm text-gray-500">Average progress</div>
                </div>
                <Target className="h-8 w-8 text-emerald-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-amber-500">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center justify-between">
                <span className="text-gray-600">Team Engagement</span>
                <Badge variant="outline" className="bg-amber-50 text-amber-700">8.2/10</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-gray-900">+12%</div>
                  <div className="text-sm text-gray-500">vs last month</div>
                </div>
                <TrendingUp className="h-8 w-8 text-amber-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-purple-500">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center justify-between">
                <span className="text-gray-600">Recognition</span>
                <Badge variant="outline" className="bg-purple-50 text-purple-700">24</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-gray-900">+8</div>
                  <div className="text-sm text-gray-500">This month</div>
                </div>
                <Award className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Team Members */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Team Members</CardTitle>
                  <CardDescription>Performance and engagement overview</CardDescription>
                </div>
                <Button variant="ghost" size="sm">
                  <Users2 className="h-4 w-4 mr-2" />
                  Add Member
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="all" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="high-performers">High Performers</TabsTrigger>
                  <TabsTrigger value="needs-attention">Needs Attention</TabsTrigger>
                  <TabsTrigger value="engagement">Engagement</TabsTrigger>
                </TabsList>
                
                <TabsContent value="all" className="space-y-4">
                  {teamMembers.map((member) => (
                    <div key={member.name} className="p-4 border rounded-lg hover:border-blue-300 transition-colors">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-start gap-3">
                          <Avatar className="h-12 w-12">
                            <AvatarFallback className="bg-blue-100 text-blue-700">
                              {member.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-semibold text-gray-900">{member.name}</div>
                            <div className="text-sm text-gray-500">{member.role}</div>
                            <div className="flex gap-2 mt-2">
                              <Badge variant="outline" className="text-xs">
                                {member.tasks} tasks
                              </Badge>
                              <Badge className={getEngagementColor(member.engagement)}>
                                {member.engagement} engagement
                              </Badge>
                              {member.status === "needs-attention" && (
                                <Badge className="bg-red-100 text-red-700">
                                  <AlertCircle className="h-3 w-3 mr-1" />
                                  Needs attention
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-gray-900">{member.progress}%</div>
                          <div className="text-xs text-gray-500">Progress</div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Progress value={member.progress} className="h-2" />
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">
                            {member.recognition} recognitions received
                          </span>
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm">
                              <MessageSquare className="h-4 w-4 mr-1" />
                              Chat
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Star className="h-4 w-4 mr-1" />
                              Recognize
                            </Button>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent>
                                <DropdownMenuItem>View Profile</DropdownMenuItem>
                                <DropdownMenuItem>View Goals</DropdownMenuItem>
                                <DropdownMenuItem>Schedule Review</DropdownMenuItem>
                                <DropdownMenuItem>Adjust Workload</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Project Coordination */}
          <Card>
            <CardHeader>
              <CardTitle>Project Coordination</CardTitle>
              <CardDescription>Cross-functional project status and dependencies</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {projectStatus.map((project) => (
                  <div key={project.project} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <div className="font-semibold text-gray-900">{project.project}</div>
                        <div className="text-sm text-gray-500">{project.team}</div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge className={getStatusColor(project.status)}>
                          {project.status}
                        </Badge>
                        <div className="text-right">
                          <div className="text-2xl font-bold">{project.progress}%</div>
                          <div className="text-xs text-gray-500">Progress</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Progress value={project.progress} className="h-2" />
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-4">
                          <span className="text-gray-600">
                            {project.blockers > 0 ? (
                              <span className="text-red-600 font-medium">{project.blockers} blockers</span>
                            ) : (
                              "No blockers"
                            )}
                          </span>
                          <Button size="sm" variant="outline">
                            <GitBranch className="h-3 w-3 mr-1" />
                            Coordinate
                          </Button>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button size="sm" variant="outline">
                            <MessageSquare className="h-3 w-3 mr-1" />
                            Update
                          </Button>
                          <Button size="sm" variant="outline">
                            <Eye className="h-3 w-3 mr-1" />
                            Details
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Team Health */}
          <Card className="border border-blue-100">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <TrendingUpIcon className="h-5 w-5 text-blue-500" />
                Team Health
              </CardTitle>
              <CardDescription>Key indicators of team performance and wellbeing</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {teamHealthMetrics.map((metric, index) => (
                <div key={index} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`p-1 rounded ${
                      metric.trend === 'up' ? 'bg-green-100' : 
                      metric.trend === 'down' ? 'bg-red-100' : 'bg-gray-100'
                    }`}>
                      {metric.trend === 'up' ? (
                        <ArrowUpRight className="h-3 w-3 text-green-600" />
                      ) : metric.trend === 'down' ? (
                        <ArrowDownRight className="h-3 w-3 text-red-600" />
                      ) : (
                        <div className="h-3 w-3 text-gray-400">—</div>
                      )}
                    </div>
                    <span className="font-medium text-gray-900">{metric.metric}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-semibold">{metric.score}/10</span>
                    <Progress value={metric.score * 10} className="w-20 h-2" />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Upcoming Meetings */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-purple-500" />
                Upcoming Meetings
              </CardTitle>
              <CardDescription>Scheduled team interactions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {upcomingTeamMeetings.map((meeting) => (
                <div key={meeting.id} className="p-3 border rounded-lg hover:border-purple-300 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-medium text-gray-900">{meeting.type}</div>
                    <Badge variant="outline">{meeting.duration}</Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">{meeting.time}</span>
                    <span className="text-gray-500">{meeting.attendees} attending</span>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <Button variant="outline" size="sm" className="flex-1">
                      Reschedule
                    </Button>
                    <Button size="sm" className="flex-1">
                      <MessageSquare className="h-3 w-3 mr-1" />
                      Prepare
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" size="sm">
                <Calendar className="h-4 w-4 mr-2" />
                Schedule Meeting
              </Button>
            </CardFooter>
          </Card>

          {/* Recent Team Recognition */}
          <Card className="border border-yellow-100">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-500" />
                Team Recognition
              </CardTitle>
              <CardDescription>Recent appreciation within the team</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentTeamRecognition.map((recognition) => (
                <div key={recognition.id} className="p-3 bg-gradient-to-r from-yellow-50/50 to-white border border-yellow-100 rounded-lg">
                  <div className="flex items-start gap-2 mb-1">
                    <div className="h-6 w-6 rounded-full bg-yellow-100 flex items-center justify-center">
                      <Star className="h-3 w-3 text-yellow-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">
                        {recognition.from} → {recognition.to}
                      </p>
                      <p className="text-sm text-gray-600 line-clamp-2">{recognition.message}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-500 mt-2">
                    <Badge variant="outline">{recognition.type}</Badge>
                    <span>{recognition.time}</span>
                  </div>
                </div>
              ))}
            </CardContent>
            <CardFooter>
              <Button variant="ghost" className="w-full" size="sm">
                <ThumbsUp className="h-4 w-4 mr-2" />
                Give Recognition
              </Button>
            </CardFooter>
          </Card>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-3">
            {quickActions.map((action, index) => (
              <Button
                key={index}
                variant="outline"
                className="h-auto py-4 flex flex-col items-center justify-center gap-2"
                onClick={action.action}
              >
                <action.icon className="h-5 w-5" />
                <span className="text-sm text-center">{action.label}</span>
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-8 space-y-6">
        {/* Goal Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Goal Distribution</CardTitle>
            <CardDescription>Status of team objectives across categories</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPieChart>
                    <Pie
                      data={teamGoals}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={(entry) => `${entry.value}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {teamGoals.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-4">
                {teamGoals.map((goal) => (
                  <div key={goal.category} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full" style={{ backgroundColor: goal.color }}></div>
                      <span className="font-medium">{goal.category}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-semibold">{goal.value}%</span>
                      <Badge variant="outline" className="text-xs">
                        {Math.round((goal.value / 100) * 18)} goals
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Training & Development */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Training & Development</CardTitle>
                <CardDescription>Team skill enhancement programs</CardDescription>
              </div>
              <Button variant="outline">
                <BookOpen className="h-4 w-4 mr-2" />
                Enroll Team
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {trainingProgress.map((training, index) => (
                <Card key={index} className="border-dashed border-2">
                  <CardContent className="pt-6">
                    <div className="text-center mb-4">
                      <div className="text-2xl font-bold text-gray-900">{training.enrolled}</div>
                      <div className="text-sm text-gray-600">Enrolled</div>
                    </div>
                    <div className="text-center mb-4">
                      <div className="text-2xl font-bold text-emerald-700">{training.completed}</div>
                      <div className="text-sm text-gray-600">Completed</div>
                    </div>
                    <div className="text-center">
                      <h3 className="font-semibold mb-2">{training.program}</h3>
                      <Progress value={(training.completed / training.enrolled) * 100 || 0} className="h-2" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Team Achievements */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Team Achievements</CardTitle>
            <CardDescription>Team accomplishments and milestones</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {recentTeamAchievements.map((achievement) => (
                <Card key={achievement.id} className="border border-emerald-100">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-3">
                      <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center">
                        <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">{achievement.achievement}</div>
                        <div className="flex items-center gap-2 mt-2">
                          {getImpactBadge(achievement.impact)}
                          <Badge variant="outline">{achievement.type}</Badge>
                        </div>
                        <div className="text-sm text-gray-500 mt-2">{achievement.date}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}