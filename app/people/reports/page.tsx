"use client"

import { useState } from "react"
import { Layout } from "@/components/layout"
import { ProtectedRoute } from "@/components/protected-route"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  BarChart3,
  Download,
  FileText,
  Users,
  Target,
  TrendingUp,
  Calendar,
  Building2,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react"
import { MOCK_DEPARTMENTS, MOCK_ORGANIZATION } from "@/lib/mock-data/organization"

interface ReportMetric {
  label: string
  value: number | string
  change?: number
  trend?: "up" | "down" | "neutral"
}

const headcountMetrics: ReportMetric[] = [
  { label: "Total Employees", value: MOCK_ORGANIZATION.employeeCount, change: 8.2, trend: "up" },
  { label: "New Hires (This Month)", value: 12, change: 20, trend: "up" },
  { label: "Departures (This Month)", value: 3, change: -25, trend: "down" },
  { label: "Open Positions", value: 8, change: 0, trend: "neutral" },
]

const performanceMetrics: ReportMetric[] = [
  { label: "Avg Performance Score", value: "4.2/5", change: 5, trend: "up" },
  { label: "Goals Completed", value: "78%", change: 12, trend: "up" },
  { label: "Reviews Completed", value: "92%", change: 3, trend: "up" },
  { label: "Recognition Given", value: 156, change: 18, trend: "up" },
]

const REPORT_TYPES = [
  {
    id: "headcount",
    name: "Headcount Report",
    description: "Employee count by department, location, and tenure",
    icon: Users,
  },
  {
    id: "performance",
    name: "Performance Summary",
    description: "Goal completion, review scores, and trends",
    icon: TrendingUp,
  },
  {
    id: "goals",
    name: "Goal Alignment Report",
    description: "Goal cascade and alignment across organization",
    icon: Target,
  },
  {
    id: "turnover",
    name: "Turnover Analysis",
    description: "Hiring, departures, and retention metrics",
    icon: BarChart3,
  },
  {
    id: "department",
    name: "Department Overview",
    description: "Department-specific metrics and KPIs",
    icon: Building2,
  },
  {
    id: "reviews",
    name: "Review Cycle Report",
    description: "Performance review completion and feedback",
    icon: Calendar,
  },
]

export default function PeopleReportsPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [selectedPeriod, setSelectedPeriod] = useState("this-month")
  const [selectedDepartment, setSelectedDepartment] = useState("all")

  const handleExport = (reportId: string, format: "csv" | "pdf") => {
    // Simulate export
    console.log(`Exporting ${reportId} as ${format}`)
  }

  return (
    <ProtectedRoute allowedRoles={["hr_admin", "ceo"]}>
      <Layout>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">People Reports</h1>
              <p className="text-muted-foreground mt-1">
                Analytics and insights about your workforce
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="this-week">This Week</SelectItem>
                  <SelectItem value="this-month">This Month</SelectItem>
                  <SelectItem value="this-quarter">This Quarter</SelectItem>
                  <SelectItem value="this-year">This Year</SelectItem>
                </SelectContent>
              </Select>
              <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                <SelectTrigger className="w-44">
                  <SelectValue placeholder="All Departments" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  {MOCK_DEPARTMENTS.map((dept) => (
                    <SelectItem key={dept.id} value={dept.id}>
                      {dept.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
              <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              {/* Headcount Metrics */}
              <div>
                <h2 className="text-lg font-semibold mb-4">Headcount</h2>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  {headcountMetrics.map((metric) => (
                    <Card key={metric.label}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <p className="text-sm text-muted-foreground">{metric.label}</p>
                          {metric.change !== undefined && metric.change !== 0 && (
                            <div
                              className={`flex items-center gap-0.5 text-xs ${
                                metric.trend === "up"
                                  ? "text-success"
                                  : metric.trend === "down"
                                    ? "text-destructive"
                                    : "text-muted-foreground"
                              }`}
                            >
                              {metric.trend === "up" ? (
                                <ArrowUpRight className="h-3 w-3" />
                              ) : metric.trend === "down" ? (
                                <ArrowDownRight className="h-3 w-3" />
                              ) : null}
                              {Math.abs(metric.change)}%
                            </div>
                          )}
                        </div>
                        <p className="text-2xl font-semibold mt-1">{metric.value}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Performance Metrics */}
              <div>
                <h2 className="text-lg font-semibold mb-4">Performance</h2>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  {performanceMetrics.map((metric) => (
                    <Card key={metric.label}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <p className="text-sm text-muted-foreground">{metric.label}</p>
                          {metric.change !== undefined && (
                            <div
                              className={`flex items-center gap-0.5 text-xs ${
                                metric.trend === "up"
                                  ? "text-success"
                                  : metric.trend === "down"
                                    ? "text-destructive"
                                    : "text-muted-foreground"
                              }`}
                            >
                              {metric.trend === "up" ? (
                                <ArrowUpRight className="h-3 w-3" />
                              ) : metric.trend === "down" ? (
                                <ArrowDownRight className="h-3 w-3" />
                              ) : null}
                              {Math.abs(metric.change)}%
                            </div>
                          )}
                        </div>
                        <p className="text-2xl font-semibold mt-1">{metric.value}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Department Breakdown */}
              <Card>
                <CardHeader>
                  <CardTitle>Department Breakdown</CardTitle>
                  <CardDescription>Employee distribution and performance by department</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {MOCK_DEPARTMENTS.map((dept) => (
                      <div key={dept.id} className="flex items-center gap-4">
                        <div
                          className="h-10 w-10 rounded-lg flex items-center justify-center flex-shrink-0"
                          style={{ backgroundColor: `${dept.color}20` }}
                        >
                          <Building2 className="h-5 w-5" style={{ color: dept.color }} />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between">
                            <p className="font-medium">{dept.name}</p>
                            <span className="text-sm text-muted-foreground">
                              {dept.employeeCount} employees
                            </span>
                          </div>
                          <div className="mt-2 h-2 w-full rounded-full bg-muted overflow-hidden">
                            <div
                              className="h-full rounded-full"
                              style={{
                                width: `${(dept.employeeCount / MOCK_ORGANIZATION.employeeCount) * 100}%`,
                                backgroundColor: dept.color,
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Reports Tab */}
            <TabsContent value="reports" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {REPORT_TYPES.map((report) => (
                  <Card key={report.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 flex-shrink-0">
                          <report.icon className="h-6 w-6 text-primary" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className="font-semibold">{report.name}</h3>
                          <p className="text-sm text-muted-foreground mt-1">{report.description}</p>
                          <div className="mt-4 flex items-center gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              className="gap-1.5"
                              onClick={() => handleExport(report.id, "csv")}
                            >
                              <Download className="h-3.5 w-3.5" />
                              CSV
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="gap-1.5"
                              onClick={() => handleExport(report.id, "pdf")}
                            >
                              <FileText className="h-3.5 w-3.5" />
                              PDF
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Scheduled Tab */}
            <TabsContent value="scheduled">
              <Card>
                <CardHeader>
                  <CardTitle>Scheduled Reports</CardTitle>
                  <CardDescription>
                    Set up automated reports to be delivered to your inbox
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <Calendar className="h-12 w-12 text-muted-foreground/50" />
                    <h3 className="mt-4 font-semibold">No scheduled reports</h3>
                    <p className="text-sm text-muted-foreground mt-1 max-w-sm">
                      Set up recurring reports to be automatically generated and sent to your email.
                    </p>
                    <Button className="mt-4" variant="outline">
                      Create Scheduled Report
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </Layout>
    </ProtectedRoute>
  )
}
