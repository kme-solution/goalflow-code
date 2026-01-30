// components/dashboard/EmployeeDashboard.tsx
"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  Target, 
  TrendingUp, 
  CheckCircle2, 
  Clock,
  Star,
  TrendingDown,
  AlertCircle,
  Trophy,
  Award,
  MessageSquare,
  Heart,
  Zap,
  ChevronRight,
  Calendar,
  Users,
  Sparkles,
  BarChart3,
  PlusCircle,
  Bell,
  ArrowUpRight,
  Eye,
  Edit,
  ThumbsUp
} from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
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
  Sector
} from "recharts"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Mock data - replace with real API calls
const weeklyProgressData = [
  { day: 'Mon', progress: 45 },
  { day: 'Tue', progress: 60 },
  { day: 'Wed', progress: 75 },
  { day: 'Thu', progress: 82 },
  { day: 'Fri', progress: 90 },
  { day: 'Sat', progress: 92 },
  { day: 'Sun', progress: 95 },
]

const recognitionTypes = [
  { name: 'Excellent Work', value: 45, color: '#10b981' },
  { name: 'Team Player', value: 25, color: '#3b82f6' },
  { name: 'Innovation', value: 20, color: '#8b5cf6' },
  { name: 'Leadership', value: 10, color: '#f59e0b' },
]

const recentRecognitions = [
  { id: 1, from: "Alex Chen", message: "Great work on the Q3 presentation!", type: "excellent", date: "2 hours ago", emoji: "👏" },
  { id: 2, from: "Sarah Miller", message: "Thanks for helping with the client demo!", type: "team", date: "Yesterday", emoji: "🤝" },
  { id: 3, from: "Jamie Wilson", message: "Your solution saved us hours of work!", type: "innovation", date: "2 days ago", emoji: "💡" },
]

const teamUpdates = [
  { id: 1, user: "Mike Johnson", action: "completed", target: "Q4 Planning Doc", time: "30 min ago" },
  { id: 2, user: "Lisa Wang", action: "received", target: "Spot Award", time: "1 hour ago" },
  { id: 3, user: "Team Alpha", action: "achieved", target: "Monthly Target", time: "2 hours ago" },
]

const goalCategories = [
  { category: "Professional", count: 3, color: "#3b82f6" },
  { category: "Skills", count: 2, color: "#10b981" },
  { category: "Project", count: 4, color: "#8b5cf6" },
  { category: "Personal", count: 1, color: "#f59e0b" },
]

const COLORS = ['#3b82f6', '#10b981', '#8b5cf6', '#f59e0b']

export default function EmployeeDashboard({ userId }: { userId: string }) {
  const [activeTab, setActiveTab] = useState("overview")
  const [loading, setLoading] = useState(false)
  const [quickCheckIn, setQuickCheckIn] = useState(false)
  
  // Mock data - replace with your actual hooks
  const goals = [
    { id: 1, title: "Complete React Certification", progress: 75, dueDate: "2024-12-15", priority: "high" },
    { id: 2, title: "Lead Q4 Project Kickoff", progress: 30, dueDate: "2024-11-30", priority: "medium" },
    { id: 3, title: "Improve Code Review Time", progress: 90, dueDate: "2024-11-20", priority: "low" },
  ]
  
  const reviews = [
    { id: 1, type: "Quarterly Review", scheduledDate: "2024-12-10", status: "pending" },
    { id: 2, type: "360 Feedback", scheduledDate: "2024-11-25", status: "in-progress" },
  ]

  const activeGoals = goals.filter(g => g.progress < 100).length
  const completedGoals = goals.filter(g => g.progress === 100).length
  const avgProgress = goals.length > 0 ? Math.round(goals.reduce((acc, g) => acc + g.progress, 0) / goals.length) : 0
  const pendingReviews = reviews.filter(r => r.status === "pending").length

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-red-100 text-red-700 border-red-200"
      case "medium": return "bg-amber-100 text-amber-700 border-amber-200"
      case "low": return "bg-blue-100 text-blue-700 border-blue-200"
      default: return "bg-gray-100 text-gray-700 border-gray-200"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white p-4 md:p-6">
      {/* Header */}
      <div className="mb-6 md:mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Welcome back, Alex!</h1>
            <p className="text-gray-600 mt-1">Here's your work overview for today</p>
          </div>
          
          <div className="flex items-center gap-3">
            <Button 
              variant="outline" 
              size="sm"
              className="border-emerald-200 bg-emerald-50 hover:bg-emerald-100"
            >
              <Bell className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Notifications</span>
              <Badge variant="destructive" className="ml-2">3</Badge>
            </Button>
            
            <Button 
              onClick={() => setQuickCheckIn(true)}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              <Zap className="h-4 w-4 mr-2" />
              Quick Check-in
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          <Card className="border border-blue-100 bg-gradient-to-br from-blue-50 to-white">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-gray-700">Active Goals</CardTitle>
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Target className="h-4 w-4 text-blue-600" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-end justify-between">
                <div>
                  <div className="text-2xl md:text-3xl font-bold text-gray-900">{activeGoals}</div>
                  <div className="text-xs text-gray-500 mt-1">+2 from last week</div>
                </div>
                <ArrowUpRight className="h-5 w-5 text-green-500 mb-1" />
              </div>
            </CardContent>
          </Card>

          <Card className="border border-emerald-100 bg-gradient-to-br from-emerald-50 to-white">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-gray-700">Avg Progress</CardTitle>
                <div className="p-2 bg-emerald-100 rounded-lg">
                  <TrendingUp className="h-4 w-4 text-emerald-600" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-end justify-between">
                <div>
                  <div className="text-2xl md:text-3xl font-bold text-gray-900">{avgProgress}%</div>
                  <div className="text-xs text-gray-500 mt-1">On track</div>
                </div>
                <Progress value={avgProgress} className="w-16 h-2" />
              </div>
            </CardContent>
          </Card>

          <Card className="border border-purple-100 bg-gradient-to-br from-purple-50 to-white">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-gray-700">Completed</CardTitle>
                <div className="p-2 bg-purple-100 rounded-lg">
                  <CheckCircle2 className="h-4 w-4 text-purple-600" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-end justify-between">
                <div>
                  <div className="text-2xl md:text-3xl font-bold text-gray-900">{completedGoals}</div>
                  <div className="text-xs text-gray-500 mt-1">This quarter</div>
                </div>
                <Trophy className="h-5 w-5 text-amber-500 mb-1" />
              </div>
            </CardContent>
          </Card>

          <Card className="border border-amber-100 bg-gradient-to-br from-amber-50 to-white">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-gray-700">Recognition</CardTitle>
                <div className="p-2 bg-amber-100 rounded-lg">
                  <Award className="h-4 w-4 text-amber-600" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-end justify-between">
                <div>
                  <div className="text-2xl md:text-3xl font-bold text-gray-900">12</div>
                  <div className="text-xs text-gray-500 mt-1">Received this month</div>
                </div>
                <Star className="h-5 w-5 text-yellow-500 mb-1" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Goals Overview */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>My Goals</CardTitle>
                  <CardDescription>Track progress on your objectives</CardDescription>
                </div>
                <Button variant="ghost" size="sm">
                  <PlusCircle className="h-4 w-4 mr-2" />
                  New Goal
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="active" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="active">Active</TabsTrigger>
                  <TabsTrigger value="completed">Completed</TabsTrigger>
                  <TabsTrigger value="categories">Categories</TabsTrigger>
                </TabsList>
                
                <TabsContent value="active" className="space-y-4">
                  {goals.map((goal) => (
                    <div key={goal.id} className="p-4 border rounded-lg hover:border-blue-300 transition-colors">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-gray-900">{goal.title}</h3>
                            <Badge variant="outline" className={getPriorityColor(goal.priority)}>
                              {goal.priority}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-500">Due {new Date(goal.dueDate).toLocaleDateString()}</p>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <span className="sr-only">Open menu</span>
                              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                              </svg>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Edit className="h-4 w-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Eye className="h-4 w-4 mr-2" />
                              View Details
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Progress</span>
                          <span className="font-semibold">{goal.progress}%</span>
                        </div>
                        <Progress value={goal.progress} className="h-2" />
                      </div>
                      
                      <div className="flex items-center justify-between mt-3">
                        <Button variant="ghost" size="sm">
                          <MessageSquare className="h-4 w-4 mr-1" />
                          Updates
                        </Button>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm">
                            <ThumbsUp className="h-4 w-4 mr-1" />
                            Celebrate
                          </Button>
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4 mr-1" />
                            Update
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </TabsContent>
                
                <TabsContent value="categories">
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={goalCategories}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={(entry) => `${entry.category}: ${entry.count}`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="count"
                        >
                          {goalCategories.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </TabsContent>
              </Tabs>
              
              <Button variant="outline" className="w-full mt-4">
                View All Goals
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </CardContent>
          </Card>

          {/* Weekly Progress */}
          <Card>
            <CardHeader>
              <CardTitle>Weekly Progress</CardTitle>
              <CardDescription>Your activity and goal progression this week</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={weeklyProgressData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="day" stroke="#6b7280" />
                    <YAxis stroke="#6b7280" />
                    <Tooltip 
                      formatter={(value) => [`${value}%`, 'Progress']}
                      labelFormatter={(label) => `Day: ${label}`}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="progress" 
                      stroke="#3b82f6" 
                      strokeWidth={3}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              
              <div className="grid grid-cols-3 gap-4 mt-6">
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-700">45%</div>
                  <div className="text-sm text-gray-600">Weekly Avg</div>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-700">+18%</div>
                  <div className="text-sm text-gray-600">vs Last Week</div>
                </div>
                <div className="text-center p-3 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-700">92%</div>
                  <div className="text-sm text-gray-600">Peak Day</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Recent Recognition */}
          <Card className="border border-purple-100">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-purple-500" />
                  Recent Recognition
                </CardTitle>
                <Badge variant="outline" className="bg-purple-50 text-purple-700">
                  {recentRecognitions.length} new
                </Badge>
              </div>
              <CardDescription>Kudos from your colleagues</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentRecognitions.map((recognition) => (
                <div key={recognition.id} className="p-3 bg-gradient-to-r from-purple-50/50 to-white border border-purple-100 rounded-lg">
                  <div className="flex items-start gap-3">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center text-xl">
                      {recognition.emoji}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-semibold text-gray-900">{recognition.from}</span>
                        <span className="text-xs text-gray-500">{recognition.date}</span>
                      </div>
                      <p className="text-sm text-gray-600 line-clamp-2">{recognition.message}</p>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
            <CardFooter>
              <Button variant="ghost" className="w-full" size="sm">
                View All Recognition
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </CardFooter>
          </Card>

          {/* Upcoming Reviews */}
          <Card className="border border-blue-100">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-blue-500" />
                Upcoming Reviews
              </CardTitle>
              <CardDescription>Schedule and prepare for feedback sessions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {reviews.map((review) => (
                <div key={review.id} className="p-3 border rounded-lg hover:border-blue-300 transition-colors">
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg ${
                      review.status === 'pending' ? 'bg-amber-100' : 'bg-blue-100'
                    }`}>
                      <Clock className={`h-4 w-4 ${
                        review.status === 'pending' ? 'text-amber-600' : 'text-blue-600'
                      }`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold text-gray-900">{review.type}</h4>
                        <Badge variant={review.status === 'pending' ? 'default' : 'secondary'}>
                          {review.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        Scheduled: {new Date(review.scheduledDate).toLocaleDateString('en-US', { 
                          weekday: 'short',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <Button variant="outline" size="sm" className="flex-1">
                      Prepare
                    </Button>
                    <Button size="sm" className="flex-1">
                      Start Review
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" size="sm">
                <Calendar className="h-4 w-4 mr-2" />
                Schedule Review
              </Button>
            </CardFooter>
          </Card>

          {/* Team Activity */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-gray-600" />
                Team Activity
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {teamUpdates.map((update) => (
                <div key={update.id} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-gray-100 text-gray-600 text-xs">
                      {update.user.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900 truncate">
                      <span className="font-medium">{update.user}</span>{" "}
                      <span className="text-gray-600">{update.action}</span>{" "}
                      <span className="font-medium">{update.target}</span>
                    </p>
                    <p className="text-xs text-gray-500">{update.time}</p>
                  </div>
                </div>
              ))}
            </CardContent>
            <CardFooter>
              <Button variant="ghost" className="w-full" size="sm">
                <MessageSquare className="h-4 w-4 mr-2" />
                Join Discussion
              </Button>
            </CardFooter>
          </Card>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" className="h-auto py-4 flex flex-col gap-2">
              <Heart className="h-5 w-5 text-pink-500" />
              <span className="text-sm">Give Kudos</span>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex flex-col gap-2">
              <BarChart3 className="h-5 w-5 text-blue-500" />
              <span className="text-sm">Analytics</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Quick Check-in Modal (simplified) */}
      {quickCheckIn && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-blue-500" />
                Quick Check-in
              </CardTitle>
              <CardDescription>How are you feeling today?</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-5 gap-2">
                {[1, 2, 3, 4, 5].map((num) => (
                  <Button key={num} variant="outline" size="lg" className="h-16">
                    {num}
                  </Button>
                ))}
              </div>
              <textarea 
                placeholder="Any notes for today?"
                className="w-full h-32 p-3 border rounded-lg"
              />
            </CardContent>
            <CardFooter className="flex gap-3">
              <Button variant="outline" className="flex-1" onClick={() => setQuickCheckIn(false)}>
                Cancel
              </Button>
              <Button className="flex-1">
                Submit Check-in
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  )
}