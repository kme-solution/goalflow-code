// components/dashboard/CEODashboard.tsx
"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  TrendingUp,
  Target,
  Users,
  BarChart3,
  Building2,
  DollarSign,
  Award,
  Clock,
  AlertTriangle,
  Download,
  Filter,
  MoreVertical,
  ArrowUpRight,
  ArrowDownRight,
  ChevronRight,
  TrendingDown,
  Calendar,
  PieChart,
  LineChart
} from "lucide-react"
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  BarChart,
  Bar
} from "recharts"
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

// Mock data - replace with real API calls
const companyHealthData = [
  { month: 'Jan', engagement: 7.8, performance: 7.5, retention: 8.2 },
  { month: 'Feb', engagement: 8.1, performance: 7.8, retention: 8.4 },
  { month: 'Mar', engagement: 8.3, performance: 8.0, retention: 8.5 },
  { month: 'Apr', engagement: 8.2, performance: 8.1, retention: 8.6 },
  { month: 'May', engagement: 8.4, performance: 8.3, retention: 8.7 },
  { month: 'Jun', engagement: 8.5, performance: 8.4, retention: 8.8 },
]

const departmentPerformance = [
  { department: 'Engineering', goals: 85, engagement: 8.7, budget: 95 },
  { department: 'Sales', goals: 92, engagement: 8.3, budget: 110 },
  { department: 'Marketing', goals: 78, engagement: 8.0, budget: 102 },
  { department: 'HR', goals: 88, engagement: 8.9, budget: 97 },
  { department: 'Product', goals: 90, engagement: 8.5, budget: 99 },
  { department: 'Finance', goals: 96, engagement: 8.6, budget: 96 },
]

const strategicGoalsData = [
  { category: 'Revenue Growth', completed: 75, total: 100, trend: 'up' },
  { category: 'Market Expansion', completed: 45, total: 100, trend: 'up' },
  { category: 'Employee Retention', completed: 82, total: 100, trend: 'stable' },
  { category: 'Product Innovation', completed: 68, total: 100, trend: 'up' },
  { category: 'Customer Satisfaction', completed: 91, total: 100, trend: 'down' },
]

const culturalMetrics = [
  { name: 'Recognition Rate', value: 78, color: '#10b981' },
  { name: 'Cross-team Collab', value: 65, color: '#3b82f6' },
  { name: 'Feedback Response', value: 82, color: '#8b5cf6' },
  { name: 'Meeting Efficiency', value: 56, color: '#f59e0b' },
]

const COLORS = ['#10b981', '#3b82f6', '#8b5cf6', '#f59e0b'];

export default function ExecutiveDashboard() {
  const [timeRange, setTimeRange] = useState('quarter')
  const [loading, setLoading] = useState(false)

  // Quick actions
  const quickActions = [
    { label: 'Generate Report', icon: Download, action: () => console.log('Generate report') },
    { label: 'Schedule Review', icon: Calendar, action: () => console.log('Schedule review') },
    { label: 'View Analytics', icon: LineChart, action: () => console.log('View analytics') },
    { label: 'Team Pulse', icon: PieChart, action: () => console.log('Team pulse') },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">CEO Dashboard</h1>
            <p className="text-gray-600 mt-2">Strategic overview and company health metrics</p>
          </div>

          <div className="flex items-center gap-3">
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

            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>

            <Button>
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="border-l-4 border-l-blue-500">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center justify-between">
                <span className="text-gray-600">Company Health</span>
                <Badge variant="outline" className="bg-blue-50 text-blue-700">8.2/10</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-gray-900">+12.5%</div>
                  <div className="text-sm text-gray-500">vs last quarter</div>
                </div>
                <TrendingUp className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-emerald-500">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center justify-between">
                <span className="text-gray-600">Strategic Goals</span>
                <Badge variant="outline" className="bg-emerald-50 text-emerald-700">74%</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-gray-900">18/24</div>
                  <div className="text-sm text-gray-500">On track</div>
                </div>
                <Target className="h-8 w-8 text-emerald-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-purple-500">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center justify-between">
                <span className="text-gray-600">Employee Engagement</span>
                <Badge variant="outline" className="bg-purple-50 text-purple-700">8.5/10</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-gray-900">+8.2%</div>
                  <div className="text-sm text-gray-500">+340 points</div>
                </div>
                <Users className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-amber-500">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center justify-between">
                <span className="text-gray-600">Revenue Impact</span>
                <Badge variant="outline" className="bg-amber-50 text-amber-700">$4.2M</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-gray-900">+23%</div>
                  <div className="text-sm text-gray-500">Attributed to goals</div>
                </div>
                <DollarSign className="h-8 w-8 text-amber-500" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Charts */}
        <div className="lg:col-span-2 space-y-6">
          {/* Company Health Trend */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Company Health Trend</CardTitle>
                  <CardDescription>Last 6 months performance indicators</CardDescription>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>View Details</DropdownMenuItem>
                    <DropdownMenuItem>Export Data</DropdownMenuItem>
                    <DropdownMenuItem>Set Alert</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsLineChart data={companyHealthData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="month" stroke="#6b7280" />
                    <YAxis stroke="#6b7280" />
                    <Tooltip />
                    <Line type="monotone" dataKey="engagement" stroke="#10b981" strokeWidth={2} />
                    <Line type="monotone" dataKey="performance" stroke="#3b82f6" strokeWidth={2} />
                    <Line type="monotone" dataKey="retention" stroke="#8b5cf6" strokeWidth={2} />
                  </RechartsLineChart>
                </ResponsiveContainer>
              </div>
              <div className="flex items-center justify-center gap-6 mt-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-emerald-500"></div>
                  <span className="text-gray-600">Engagement</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                  <span className="text-gray-600">Performance</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-purple-500"></div>
                  <span className="text-gray-600">Retention</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Department Performance */}
          <Card>
            <CardHeader>
              <CardTitle>Department Performance</CardTitle>
              <CardDescription>Goal completion and engagement by department</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={departmentPerformance}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="department" stroke="#6b7280" />
                    <YAxis stroke="#6b7280" />
                    <Tooltip />
                    <Bar dataKey="goals" fill="#10b981" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="engagement" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Insights & Alerts */}
        <div className="space-y-6">
          {/* Strategic Goals Progress */}
          <Card>
            <CardHeader>
              <CardTitle>Strategic Goals</CardTitle>
              <CardDescription>Progress on key company objectives</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {strategicGoalsData.map((goal, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="font-medium text-gray-900">{goal.category}</div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold">{goal.completed}%</span>
                      {goal.trend === 'up' ? (
                        <ArrowUpRight className="h-4 w-4 text-green-500" />
                      ) : goal.trend === 'down' ? (
                        <ArrowDownRight className="h-4 w-4 text-red-500" />
                      ) : (
                        <div className="h-4 w-4 text-gray-400">—</div>
                      )}
                    </div>
                  </div>
                  <Progress value={goal.completed} className="h-2" />
                </div>
              ))}
            </CardContent>
            <CardFooter>
              <Button variant="ghost" className="w-full" size="sm">
                View All Goals
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </CardFooter>
          </Card>

          {/* Cultural Metrics */}
          <Card>
            <CardHeader>
              <CardTitle>Cultural Metrics</CardTitle>
              <CardDescription>Key indicators of company culture</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPieChart>
                    <Pie
                      data={culturalMetrics}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={(entry) => `${entry.value}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {culturalMetrics.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4">
                {culturalMetrics.map((metric, index) => (
                  <div key={index} className="flex flex-col items-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold">{metric.value}%</div>
                    <div className="text-sm text-gray-600 text-center">{metric.name}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common ceo tasks</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-3">
              {quickActions.map((action, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="h-auto py-4 flex flex-col items-center justify-center gap-2"
                  onClick={action.action}
                >
                  <action.icon className="h-5 w-5" />
                  <span className="text-sm">{action.label}</span>
                </Button>
              ))}
            </CardContent>
          </Card>

          {/* Alerts & Notifications */}
          <Card className="border-red-100">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-red-500" />
                Priority Alerts
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-3 p-3 bg-red-50 rounded-lg">
                <div className="h-2 w-2 bg-red-500 rounded-full mt-2"></div>
                <div>
                  <div className="font-medium">Engagement Drop in Sales</div>
                  <div className="text-sm text-gray-600">-12% this month</div>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-amber-50 rounded-lg">
                <div className="h-2 w-2 bg-amber-500 rounded-full mt-2"></div>
                <div>
                  <div className="font-medium">Budget Overtun - Marketing</div>
                  <div className="text-sm text-gray-600">8% over projected</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Bottom Section - Recent Activity */}
      <div className="mt-8">
        <Tabs defaultValue="recognition" className="w-full">
          <div className="flex items-center justify-between mb-4">
            <TabsList>
              <TabsTrigger value="recognition">Top Recognition</TabsTrigger>
              <TabsTrigger value="goals">Recent Goal Updates</TabsTrigger>
              <TabsTrigger value="performance">Performance Highlights</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="recognition" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[1, 2, 3].map((item) => (
                <Card key={item} className="border-emerald-100">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-3">
                      <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center">
                        <Award className="h-5 w-5 text-emerald-600" />
                      </div>
                      <div>
                        <div className="font-semibold">Employee of the Month</div>
                        <div className="text-sm text-gray-600">Sarah Chen - Engineering</div>
                        <div className="text-xs text-gray-500 mt-1">Received 24 recognitions</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}