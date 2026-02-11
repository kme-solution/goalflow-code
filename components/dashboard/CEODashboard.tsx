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
import { useAnalytics } from "@/lib/hooks/use-analytics"
import { useGoals } from "@/lib/hooks/use-goals"

const COLORS = ['#10b981', '#3b82f6', '#8b5cf6', '#f59e0b'];

export default function ExecutiveDashboard() {
  const [timeRange, setTimeRange] = useState('quarter')
  const { metrics, departmentPerformance, engagement, isLoading, isError } = useAnalytics()
  const { goals: strategicGoals, isLoading: goalsLoading } = useGoals(undefined, "objective")

  // Transform department performance data for charts
  const chartData = departmentPerformance?.map(dept => ({
    department: dept.name,
    goals: dept.goalCompletionRate,
    engagement: dept.avgPerformanceScore,
  })) || []

  // Transform engagement trends for line chart
  const healthData = engagement?.trends?.map(trend => ({
    month: new Date(trend.date).toLocaleDateString('en-US', { month: 'short' }),
    engagement: trend.score,
    performance: trend.score * 0.9, // Placeholder - adjust based on actual data
    retention: trend.score * 0.95, // Placeholder - adjust based on actual data
  })) || []

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white p-4 md:p-6 lg:p-8">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-24 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white p-4 md:p-6 lg:p-8">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Failed to load dashboard</h2>
          <p className="text-gray-600">Please try refreshing the page</p>
        </div>
      </div>
    )
  }

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
                <Badge variant="outline" className="bg-blue-50 text-blue-700">{metrics?.overallScore || 0}/10</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-gray-900">{metrics?.goalCompletionRate || 0}%</div>
                  <div className="text-sm text-gray-500">Goal completion</div>
                </div>
                <TrendingUp className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-emerald-500">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center justify-between">
                <span className="text-gray-600">Strategic Goals</span>
                <Badge variant="outline" className="bg-emerald-50 text-emerald-700">{strategicGoals.length}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-gray-900">{strategicGoals.filter(g => g.status === 'completed').length}/{strategicGoals.length}</div>
                  <div className="text-sm text-gray-500">Completed</div>
                </div>
                <Target className="h-8 w-8 text-emerald-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-purple-500">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center justify-between">
                <span className="text-gray-600">Employee Engagement</span>
                <Badge variant="outline" className="bg-purple-50 text-purple-700">{engagement?.eNPS || 0}/10</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-gray-900">{engagement?.engagementRate || 0}%</div>
                  <div className="text-sm text-gray-500">Response rate</div>
                </div>
                <Users className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-amber-500">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center justify-between">
                <span className="text-gray-600">At Risk Goals</span>
                <Badge variant="outline" className="bg-amber-50 text-amber-700">{metrics?.atRiskCount || 0}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-gray-900">{metrics?.atRiskCount || 0}</div>
                  <div className="text-sm text-gray-500">Goals at risk</div>
                </div>
                <AlertTriangle className="h-8 w-8 text-amber-500" />
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
                  <RechartsLineChart data={healthData}>
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
                  <BarChart data={chartData}>
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
              {strategicGoals.slice(0, 5).map((goal) => (
                <div key={goal.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="font-medium text-gray-900">{goal.title}</div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold">{goal.targetValue ? Math.round((goal.currentValue / goal.targetValue) * 100) : 0}%</span>
                      <Badge variant={goal.status === 'completed' ? 'default' : goal.status === 'at_risk' ? 'destructive' : 'secondary'}>
                        {goal.status}
                      </Badge>
                    </div>
                  </div>
                  <Progress value={goal.targetValue ? (goal.currentValue / goal.targetValue) * 100 : 0} className="h-2" />
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