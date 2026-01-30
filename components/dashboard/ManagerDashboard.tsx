// components/dashboard/ManagerDashboard.tsx
"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  Target, 
  Users, 
  TrendingUp, 
  AlertCircle,
  MessageSquare,
  Calendar,
  Star,
  Award,
  Clock,
  CheckCircle2,
  XCircle,
  Filter,
  MoreVertical,
  ChevronRight,
  Eye,
  Edit,
  ThumbsUp,
  Bell,
  Download,
  BarChart3,
  PieChart,
  LineChart,
  UserPlus,
  Settings,
  RefreshCw,
  ArrowUpRight,
  ArrowDownRight,
  TrendingDown,
  Search
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
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis
} from "recharts"

// Mock data
const teamPerformance = [
  { name: "Sarah Johnson", progress: 95, goals: 8, recognition: 12, trend: "up" },
  { name: "Michael Chen", progress: 88, goals: 6, recognition: 8, trend: "stable" },
  { name: "Emma Davis", progress: 72, goals: 5, recognition: 5, trend: "down" },
  { name: "Alex Morgan", progress: 91, goals: 7, recognition: 15, trend: "up" },
  { name: "Jamie Wilson", progress: 85, goals: 6, recognition: 9, trend: "up" },
  { name: "Taylor Smith", progress: 67, goals: 4, recognition: 3, trend: "down" },
]

const goalDistribution = [
  { category: "Completed", value: 45, color: "#10b981" },
  { category: "In Progress", value: 35, color: "#3b82f6" },
  { category: "At Risk", value: 12, color: "#f59e0b" },
  { category: "Delayed", value: 8, color: "#ef4444" },
]

const teamPulseData = [
  { metric: "Engagement", score: 8.2, trend: "up" },
  { metric: "Morale", score: 7.8, trend: "up" },
  { metric: "Workload", score: 6.5, trend: "down" },
  { metric: "Collaboration", score: 8.5, trend: "stable" },
  { metric: "Productivity", score: 8.0, trend: "up" },
]

const recentRecognition = [
  { id: 1, from: "Sarah Johnson", to: "Michael Chen", message: "Great help with the client presentation!", type: "teamwork", time: "2 hours ago" },
  { id: 2, from: "Emma Davis", to: "Alex Morgan", message: "Outstanding problem-solving skills!", type: "innovation", time: "Yesterday" },
  { id: 3, from: "Jamie Wilson", to: "Taylor Smith", message: "Excellent meeting facilitation", type: "leadership", time: "2 days ago" },
]

const upcomingOneOnOnes = [
  { id: 1, name: "Sarah Johnson", time: "Today, 2:00 PM", status: "confirmed", duration: "30 min" },
  { id: 2, name: "Michael Chen", time: "Tomorrow, 10:30 AM", status: "pending", duration: "45 min" },
  { id: 3, name: "Emma Davis", time: "Nov 20, 3:00 PM", status: "scheduled", duration: "30 min" },
]

const atRiskGoals = [
  { id: 1, title: "Q4 Product Launch", owner: "Emma Davis", progress: 45, dueDate: "2024-12-01", risk: "high" },
  { id: 2, title: "Annual Budget Planning", owner: "Michael Chen", progress: 30, dueDate: "2024-11-25", risk: "medium" },
  { id: 3, title: "Client Retention Report", owner: "Taylor Smith", progress: 25, dueDate: "2024-11-20", risk: "high" },
]

const teamActivity = [
  { id: 1, user: "Sarah Johnson", action: "completed", target: "Q3 Report", time: "30 min ago" },
  { id: 2, user: "Alex Morgan", action: "received", target: "Employee of the Month", time: "1 hour ago" },
  { id: 3, user: "Jamie Wilson", action: "started", target: "New Project", time: "2 hours ago" },
  { id: 4, user: "Michael Chen", action: "updated", target: "Budget Goals", time: "3 hours ago" },
]

const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444']

export default function ManagerDashboard({ userId }: { userId: string }) {
  const [activeTab, setActiveTab] = useState("overview")
  const [loading, setLoading] = useState(false)
  const [timeRange, setTimeRange] = useState("month")
  const [searchQuery, setSearchQuery] = useState("")

  const quickActions = [
    { label: 'Give Recognition', icon: Star, action: () => console.log('Give recognition') },
    { label: 'Schedule 1:1', icon: Calendar, action: () => console.log('Schedule 1:1') },
    { label: 'Team Pulse', icon: LineChart, action: () => console.log('Team pulse') },
    { label: 'Run Report', icon: Download, action: () => console.log('Run report') },
  ]

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "high": return "bg-red-100 text-red-700 border-red-200"
      case "medium": return "bg-amber-100 text-amber-700 border-amber-200"
      case "low": return "bg-blue-100 text-blue-700 border-blue-200"
      default: return "bg-gray-100 text-gray-700"
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed": return <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Confirmed</Badge>
      case "pending": return <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100">Pending</Badge>
      case "scheduled": return <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">Scheduled</Badge>
      default: return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Team Dashboard</h1>
            <p className="text-gray-600 mt-2">Manage your team's performance and goals</p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search team..."
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
                <SelectItem value="year">This Year</SelectItem>
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
                <span className="text-gray-600">Team Members</span>
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
                <Badge variant="outline" className="bg-emerald-50 text-emerald-700">24</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-gray-900">78%</div>
                  <div className="text-sm text-gray-500">Average progress</div>
                </div>
                <Target className="h-8 w-8 text-emerald-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-amber-500">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center justify-between">
                <span className="text-gray-600">At Risk Goals</span>
                <Badge variant="outline" className="bg-amber-50 text-amber-700">3</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-gray-900">12%</div>
                  <div className="text-sm text-gray-500">Require attention</div>
                </div>
                <AlertCircle className="h-8 w-8 text-amber-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-purple-500">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center justify-between">
                <span className="text-gray-600">Team Recognition</span>
                <Badge variant="outline" className="bg-purple-50 text-purple-700">42</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-gray-900">+25%</div>
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
          {/* Team Performance */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Team Performance</CardTitle>
                  <CardDescription>Goal progress by team members</CardDescription>
                </div>
                <Tabs defaultValue="progress" className="w-auto">
                  <TabsList>
                    <TabsTrigger value="progress">Progress</TabsTrigger>
                    <TabsTrigger value="recognition">Recognition</TabsTrigger>
                    <TabsTrigger value="engagement">Engagement</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {teamPerformance.map((member) => (
                  <div key={member.name} className="p-4 border rounded-lg hover:border-blue-300 transition-colors">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback className="bg-blue-100 text-blue-700">
                            {member.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-semibold text-gray-900">{member.name}</div>
                          <div className="text-sm text-gray-500">
                            {member.goals} goals • {member.recognition} recognitions
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {member.trend === "up" ? (
                          <ArrowUpRight className="h-4 w-4 text-green-500" />
                        ) : member.trend === "down" ? (
                          <ArrowDownRight className="h-4 w-4 text-red-500" />
                        ) : (
                          <div className="h-4 w-4 text-gray-400">—</div>
                        )}
                        <span className="font-bold text-lg">{member.progress}%</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Progress value={member.progress} className="h-2" />
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Progress</span>
                        <div className="flex items-center gap-4">
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
                              <DropdownMenuItem>Performance Review</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                <UserPlus className="h-4 w-4 mr-2" />
                Add Team Member
              </Button>
            </CardFooter>
          </Card>

          {/* Goal Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Goal Distribution</CardTitle>
              <CardDescription>Status of team goals across categories</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <Pie
                        data={goalDistribution}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={(entry) => `${entry.value}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {goalDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </div>
                <div className="space-y-4">
                  {goalDistribution.map((goal) => (
                    <div key={goal.category} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full" style={{ backgroundColor: goal.color }}></div>
                        <span className="font-medium">{goal.category}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-semibold">{goal.value}%</span>
                        <Badge variant="outline" className="text-xs">
                          {Math.round((goal.value / 100) * 24)} goals
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Team Pulse */}
          <Card className="border border-blue-100">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <LineChart className="h-5 w-5 text-blue-500" />
                Team Pulse
              </CardTitle>
              <CardDescription>Current team health metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={teamPulseData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="metric" />
                    <PolarRadiusAxis angle={30} domain={[0, 10]} />
                    <Radar name="Team" dataKey="score" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
                    <Tooltip />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* At Risk Goals */}
          <Card className="border border-red-100">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-red-500" />
                  At Risk Goals
                </CardTitle>
                <Badge variant="destructive">3</Badge>
              </div>
              <CardDescription>Goals requiring immediate attention</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {atRiskGoals.map((goal) => (
                <div key={goal.id} className="p-3 border border-red-200 rounded-lg bg-red-50">
                  <div className="flex items-start justify-between mb-2">
                    <div className="font-medium text-gray-900">{goal.title}</div>
                    <Badge className={getRiskColor(goal.risk)}>
                      {goal.risk} risk
                    </Badge>
                  </div>
                  <div className="text-sm text-gray-600 mb-2">Owner: {goal.owner}</div>
                  <div className="space-y-2">
                    <Progress value={goal.progress} className="h-2" />
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">{goal.progress}% complete</span>
                      <span className="text-gray-500">
                        Due {new Date(goal.dueDate).toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric' 
                        })}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <Button variant="outline" size="sm" className="flex-1">
                      <MessageSquare className="h-3 w-3 mr-1" />
                      Discuss
                    </Button>
                    <Button size="sm" className="flex-1">
                      <Edit className="h-3 w-3 mr-1" />
                      Action Plan
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Upcoming 1:1s */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-purple-500" />
                Upcoming 1:1s
              </CardTitle>
              <CardDescription>Scheduled one-on-one meetings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {upcomingOneOnOnes.map((meeting) => (
                <div key={meeting.id} className="p-3 border rounded-lg hover:border-purple-300 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-medium text-gray-900">{meeting.name}</div>
                    {getStatusBadge(meeting.status)}
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">{meeting.time}</span>
                    <span className="text-gray-500">{meeting.duration}</span>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <Button variant="outline" size="sm" className="flex-1">
                      Reschedule
                    </Button>
                    <Button size="sm" className="flex-1">
                      Prepare Agenda
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" size="sm">
                <Calendar className="h-4 w-4 mr-2" />
                Schedule New 1:1
              </Button>
            </CardFooter>
          </Card>

          {/* Recent Recognition */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-500" />
                Recent Recognition
              </CardTitle>
              <CardDescription>Latest kudos in your team</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentRecognition.map((recognition) => (
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

      {/* Bottom Section - Team Activity */}
      <div className="mt-8">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Team Activity</CardTitle>
                <CardDescription>Recent updates from your team</CardDescription>
              </div>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {teamActivity.map((activity) => (
                <div key={activity.id} className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-gray-100 text-gray-600 text-xs">
                      {activity.user.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900">
                      <span className="font-medium">{activity.user}</span>{" "}
                      <span className="text-gray-600">{activity.action}</span>{" "}
                      <span className="font-medium">{activity.target}</span>
                    </p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                  <Button variant="ghost" size="sm">
                    <MessageSquare className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              <Bell className="h-4 w-4 mr-2" />
              Set Activity Alerts
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}