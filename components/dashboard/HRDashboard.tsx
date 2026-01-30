// components/dashboard/HRDashboard.tsx
"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Users,
  UserPlus,
  TrendingUp,
  AlertCircle,
  Building,
  FileText,
  Target,
  Calendar,
  Download,
  Filter,
  MoreVertical,
  ArrowUpRight,
  ArrowDownRight,
  CheckCircle2,
  Clock,
  UserCheck,
  UserX,
  PieChart,
  BarChart3,
  LineChart,
  Shield,
  Mail,
  ChevronRight,
  Eye,
  Edit,
  MessageSquare,
  Settings,
  RefreshCw,
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
  AreaChart,
  Area
} from "recharts"

// Mock data
const employeeDistribution = [
  { department: 'Engineering', count: 45, color: '#3b82f6' },
  { department: 'Sales', count: 28, color: '#10b981' },
  { department: 'Marketing', count: 22, color: '#8b5cf6' },
  { department: 'HR', count: 8, color: '#f59e0b' },
  { department: 'Product', count: 18, color: '#ef4444' },
  { department: 'Finance', count: 12, color: '#06b6d4' },
]

const turnoverTrend = [
  { month: 'Jan', hired: 5, left: 2 },
  { month: 'Feb', hired: 3, left: 1 },
  { month: 'Mar', hired: 7, left: 0 },
  { month: 'Apr', hired: 4, left: 1 },
  { month: 'May', hired: 6, left: 3 },
  { month: 'Jun', hired: 8, left: 2 },
]

const onboardingProgress = [
  { stage: 'Background Check', completed: 95, pending: 5 },
  { stage: 'Documentation', completed: 88, pending: 12 },
  { stage: 'Equipment Setup', completed: 92, pending: 8 },
  { stage: 'Training', completed: 76, pending: 24 },
]

const recentHires = [
  { id: 1, name: "Alex Johnson", role: "Senior Developer", department: "Engineering", startDate: "2024-11-15", status: "active" },
  { id: 2, name: "Sarah Miller", role: "Marketing Lead", department: "Marketing", startDate: "2024-11-10", status: "active" },
  { id: 3, name: "Mike Chen", role: "Sales CEO", department: "Sales", startDate: "2024-11-05", status: "pending" },
  { id: 4, name: "Lisa Wang", role: "Product Manager", department: "Product", startDate: "2024-10-28", status: "active" },
]

const complianceAlerts = [
  { id: 1, type: "Training Overdue", count: 12, severity: "high" },
  { id: 2, type: "Contract Expiring", count: 8, severity: "medium" },
  { id: 3, type: "Policy Update", count: 3, severity: "low" },
  { id: 4, type: "Certification Renewal", count: 5, severity: "medium" },
]

const employeeEngagement = [
  { team: "Engineering", score: 8.7, trend: "up" },
  { team: "Sales", score: 8.3, trend: "stable" },
  { team: "Marketing", score: 8.0, trend: "down" },
  { team: "HR", score: 8.9, trend: "up" },
  { team: "Product", score: 8.5, trend: "up" },
  { team: "Finance", score: 8.6, trend: "stable" },
]

const COLORS = ['#3b82f6', '#10b981', '#8b5cf6', '#f59e0b', '#ef4444', '#06b6d4']

export default function HRDashboard() {
  const [timeRange, setTimeRange] = useState('quarter')
  const [loading, setLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  // Quick actions
  const quickActions = [
    { label: 'Invite Employee', icon: UserPlus, action: () => console.log('Invite employee') },
    { label: 'Run Report', icon: FileText, action: () => console.log('Run report') },
    { label: 'Schedule Training', icon: Calendar, action: () => console.log('Schedule training') },
    { label: 'Compliance Check', icon: Shield, action: () => console.log('Compliance check') },
  ]

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high": return "bg-red-100 text-red-700 border-red-200"
      case "medium": return "bg-amber-100 text-amber-700 border-amber-200"
      case "low": return "bg-blue-100 text-blue-700 border-blue-200"
      default: return "bg-gray-100 text-gray-700"
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active": return <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Active</Badge>
      case "pending": return <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100">Pending</Badge>
      case "onboarding": return <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">Onboarding</Badge>
      default: return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">HR Dashboard</h1>
            <p className="text-gray-600 mt-2">Comprehensive workforce management and analytics</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search employees..."
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
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="border-l-4 border-l-blue-500">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center justify-between">
                <span className="text-gray-600">Total Employees</span>
                <Badge variant="outline" className="bg-blue-50 text-blue-700">156</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-gray-900">+8</div>
                  <div className="text-sm text-gray-500">This quarter</div>
                </div>
                <Users className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-emerald-500">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center justify-between">
                <span className="text-gray-600">Engagement Score</span>
                <Badge variant="outline" className="bg-emerald-50 text-emerald-700">8.2/10</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-gray-900">+4.5%</div>
                  <div className="text-sm text-gray-500">vs last quarter</div>
                </div>
                <TrendingUp className="h-8 w-8 text-emerald-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-amber-500">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center justify-between">
                <span className="text-gray-600">Pending Invites</span>
                <Badge variant="outline" className="bg-amber-50 text-amber-700">12</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-gray-900">4 overdue</div>
                  <div className="text-sm text-gray-500">Require follow-up</div>
                </div>
                <UserPlus className="h-8 w-8 text-amber-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-red-500">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center justify-between">
                <span className="text-gray-600">Compliance</span>
                <Badge variant="outline" className="bg-red-50 text-red-700">96%</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-gray-900">3 alerts</div>
                  <div className="text-sm text-gray-500">Require attention</div>
                </div>
                <AlertCircle className="h-8 w-8 text-red-500" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Charts */}
        <div className="lg:col-span-2 space-y-6">
          {/* Employee Distribution */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Employee Distribution</CardTitle>
                  <CardDescription>Workforce by department</CardDescription>
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
                    <DropdownMenuItem>Compare Periods</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <Pie
                        data={employeeDistribution}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={(entry) => `${entry.count}`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="count"
                      >
                        {employeeDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`${value} employees`, 'Count']} />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </div>
                <div className="space-y-3">
                  {employeeDistribution.map((dept, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full" style={{ backgroundColor: dept.color }}></div>
                        <span className="text-sm font-medium">{dept.department}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-semibold">{dept.count}</span>
                        <span className="text-xs text-gray-500">
                          {Math.round((dept.count / 156) * 100)}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Turnover Trend */}
          <Card>
            <CardHeader>
              <CardTitle>Turnover Trend</CardTitle>
              <CardDescription>Hires and exits over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={turnoverTrend}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="month" stroke="#6b7280" />
                    <YAxis stroke="#6b7280" />
                    <Tooltip />
                    <Area type="monotone" dataKey="hired" stroke="#10b981" fill="#10b981" fillOpacity={0.3} />
                    <Area type="monotone" dataKey="left" stroke="#ef4444" fill="#ef4444" fillOpacity={0.3} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-3 gap-4 mt-6">
                <div className="text-center p-3 bg-emerald-50 rounded-lg">
                  <div className="text-2xl font-bold text-emerald-700">33</div>
                  <div className="text-sm text-gray-600">Hired YTD</div>
                </div>
                <div className="text-center p-3 bg-red-50 rounded-lg">
                  <div className="text-2xl font-bold text-red-700">9</div>
                  <div className="text-sm text-gray-600">Exits YTD</div>
                </div>
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-700">+24</div>
                  <div className="text-sm text-gray-600">Net Growth</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Onboarding Progress */}
          <Card>
            <CardHeader>
              <CardTitle>Onboarding Progress</CardTitle>
              <CardDescription>Completion rates across onboarding stages</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {onboardingProgress.map((stage, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="font-medium text-gray-900">{stage.stage}</div>
                    <div className="text-sm font-semibold">{stage.completed}%</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Progress value={stage.completed} className="flex-1 h-2" />
                    <Badge variant="outline" className="text-xs">
                      {stage.pending} pending
                    </Badge>
                  </div>
                </div>
              ))}
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                <Settings className="h-4 w-4 mr-2" />
                Configure Onboarding
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* Right Column - Insights & Actions */}
        <div className="space-y-6">
          {/* Recent Hires */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <UserCheck className="h-5 w-5 text-blue-500" />
                  Recent Hires
                </CardTitle>
                <Badge variant="outline">Last 30 days</Badge>
              </div>
              <CardDescription>New employees and their status</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentHires.map((hire) => (
                <div key={hire.id} className="p-3 border rounded-lg hover:border-blue-300 transition-colors">
                  <div className="flex items-start gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-blue-100 text-blue-700">
                        {hire.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-semibold text-gray-900 truncate">{hire.name}</h4>
                        {getStatusBadge(hire.status)}
                      </div>
                      <p className="text-sm text-gray-600">{hire.role}</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs text-gray-500">
                          {hire.department} • Started {new Date(hire.startDate).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric'
                          })}
                        </span>
                        <Button variant="ghost" size="sm">
                          <MessageSquare className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
            <CardFooter>
              <Button variant="ghost" className="w-full" size="sm">
                View All Employees
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </CardFooter>
          </Card>

          {/* Compliance Alerts */}
          <Card className="border-red-100">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-red-500" />
                Compliance Alerts
              </CardTitle>
              <CardDescription>Issues requiring attention</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {complianceAlerts.map((alert) => (
                <div key={alert.id} className="p-3 rounded-lg border transition-colors hover:shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-medium text-gray-900">{alert.type}</div>
                    <Badge className={getSeverityColor(alert.severity)}>
                      {alert.severity}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">{alert.count} employees affected</span>
                    <Button size="sm" variant="outline">
                      Resolve
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                <Shield className="h-4 w-4 mr-2" />
                Run Compliance Check
              </Button>
            </CardFooter>
          </Card>

          {/* Employee Engagement */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <LineChart className="h-5 w-5 text-green-500" />
                Engagement by Team
              </CardTitle>
              <CardDescription>Team engagement scores and trends</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {employeeEngagement.map((team, index) => (
                <div key={index} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`p-1 rounded ${team.trend === 'up' ? 'bg-green-100' :
                        team.trend === 'down' ? 'bg-red-100' : 'bg-gray-100'
                      }`}>
                      {team.trend === 'up' ? (
                        <ArrowUpRight className="h-3 w-3 text-green-600" />
                      ) : team.trend === 'down' ? (
                        <ArrowDownRight className="h-3 w-3 text-red-600" />
                      ) : (
                        <div className="h-3 w-3 text-gray-400">—</div>
                      )}
                    </div>
                    <span className="font-medium text-gray-900">{team.team}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-semibold">{team.score}/10</span>
                    <Progress value={team.score * 10} className="w-20 h-2" />
                  </div>
                </div>
              ))}
            </CardContent>
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

          {/* Upcoming Events */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-purple-500" />
                Upcoming Events
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3 p-2">
                <div className="h-10 w-10 rounded-lg bg-purple-100 flex items-center justify-center">
                  <Calendar className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <div className="font-medium">Quarterly Reviews</div>
                  <div className="text-sm text-gray-600">Starts in 3 days</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-2">
                <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center">
                  <FileText className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <div className="font-medium">Compliance Training</div>
                  <div className="text-sm text-gray-600">Due next week</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Bottom Section - Reports */}
      <div className="mt-8">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>HR Reports</CardTitle>
                <CardDescription>Generate and download reports</CardDescription>
              </div>
              <Button variant="outline">
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh Data
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="border-dashed border-2">
                <CardContent className="pt-6 flex flex-col items-center text-center">
                  <FileText className="h-10 w-10 text-gray-400 mb-3" />
                  <h3 className="font-semibold mb-2">Employee Turnover Report</h3>
                  <p className="text-sm text-gray-600 mb-4">Monthly turnover analysis and trends</p>
                  <Button variant="outline" className="w-full">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-dashed border-2">
                <CardContent className="pt-6 flex flex-col items-center text-center">
                  <Users className="h-10 w-10 text-gray-400 mb-3" />
                  <h3 className="font-semibold mb-2">Diversity Report</h3>
                  <p className="text-sm text-gray-600 mb-4">Demographics and inclusion metrics</p>
                  <Button variant="outline" className="w-full">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-dashed border-2">
                <CardContent className="pt-6 flex flex-col items-center text-center">
                  <TrendingUp className="h-10 w-10 text-gray-400 mb-3" />
                  <h3 className="font-semibold mb-2">Engagement Survey Results</h3>
                  <p className="text-sm text-gray-600 mb-4">Quarterly engagement insights</p>
                  <Button variant="outline" className="w-full">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}