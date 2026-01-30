"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BarChart3, TrendingUp, Download, Database, Zap, Activity, Calendar } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function AnalyticsPage() {
  return (
    <div className="space-y-6 p-4 md:p-6">
      <div>
        <h1 className="text-3xl font-bold">Analytics & Reports</h1>
        <p className="text-muted-foreground">Advanced analytics and data management tools</p>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-2">
            <Activity className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium">Active Users</span>
          </div>
          <p className="text-2xl font-bold">234</p>
          <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
            <TrendingUp className="w-3 h-3" />
            94% adoption rate
          </p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-2 mb-2">
            <BarChart3 className="w-5 h-5 text-yellow-600" />
            <span className="text-sm font-medium">Reports Generated</span>
          </div>
          <p className="text-2xl font-bold">142</p>
          <p className="text-xs text-muted-foreground mt-1">This month</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-2 mb-2">
            <Database className="w-5 h-5 text-green-600" />
            <span className="text-sm font-medium">Data Exports</span>
          </div>
          <p className="text-2xl font-bold">38</p>
          <p className="text-xs text-muted-foreground mt-1">This quarter</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="w-5 h-5 text-purple-600" />
            <span className="text-sm font-medium">API Calls</span>
          </div>
          <p className="text-2xl font-bold">12.5K</p>
          <p className="text-xs text-muted-foreground mt-1">Last 24 hours</p>
        </Card>
      </div>

      {/* Advanced Analytics */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold">Custom Analytics Builder</h2>
            <p className="text-sm text-muted-foreground mt-1">Create custom metrics and correlations</p>
          </div>
          <Button>
            <BarChart3 className="w-4 h-4 mr-2" />
            New Analysis
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {[
            {
              name: "Goal Completion vs Engagement",
              type: "Correlation",
              lastRun: "2 hours ago",
              insights: 3,
            },
            {
              name: "Recognition Impact on Performance",
              type: "Regression",
              lastRun: "1 day ago",
              insights: 5,
            },
            {
              name: "Team Size vs Productivity",
              type: "Trend Analysis",
              lastRun: "3 days ago",
              insights: 2,
            },
          ].map((analysis, i) => (
            <div key={i} className="p-4 rounded-lg border">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <p className="font-medium text-sm">{analysis.name}</p>
                  <Badge variant="outline" className="mt-1">
                    {analysis.type}
                  </Badge>
                </div>
              </div>
              <div className="flex items-center justify-between text-xs text-muted-foreground mt-3">
                <span>Last run: {analysis.lastRun}</span>
                <span>{analysis.insights} insights</span>
              </div>
              <Button size="sm" variant="outline" className="w-full mt-3 bg-transparent">
                View Results
              </Button>
            </div>
          ))}
        </div>
      </Card>

      {/* Data Export & Integration */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold">Data Export & Integration</h2>
            <p className="text-sm text-muted-foreground mt-1">Export data and manage API connections</p>
          </div>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Data
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="p-4 rounded-lg border">
            <div className="flex items-center gap-2 mb-3">
              <Database className="w-5 h-5 text-primary" />
              <h3 className="font-semibold">Bulk Data Export</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-3">Export all data in CSV, JSON, or Excel format</p>
            <div className="space-y-2">
              <Button size="sm" variant="outline" className="w-full bg-transparent">
                Export Goals
              </Button>
              <Button size="sm" variant="outline" className="w-full bg-transparent">
                Export Recognition
              </Button>
              <Button size="sm" variant="outline" className="w-full bg-transparent">
                Export Reviews
              </Button>
            </div>
          </div>

          <div className="p-4 rounded-lg border">
            <div className="flex items-center gap-2 mb-3">
              <Zap className="w-5 h-5 text-yellow-600" />
              <h3 className="font-semibold">API Access</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-3">Manage API keys and access tokens</p>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Active API Keys</span>
                <span className="font-medium">3</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Rate Limit</span>
                <span className="font-medium">1000/hour</span>
              </div>
              <Button size="sm" variant="outline" className="w-full bg-transparent">
                Manage API Keys
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Report Scheduler */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold">Automated Report Scheduler</h2>
            <p className="text-sm text-muted-foreground mt-1">Schedule and manage automated report delivery</p>
          </div>
          <Button>
            <Calendar className="w-4 h-4 mr-2" />
            New Schedule
          </Button>
        </div>

        <div className="space-y-3">
          {[
            {
              name: "Weekly Team Performance",
              frequency: "Every Monday 9:00 AM",
              recipients: "HR Team (5 people)",
              format: "PDF",
              status: "active",
            },
            {
              name: "Monthly CEO Summary",
              frequency: "1st of every month",
              recipients: "CEO Team (8 people)",
              format: "PowerPoint",
              status: "active",
            },
            {
              name: "Quarterly Culture Report",
              frequency: "Every quarter end",
              recipients: "All Managers (18 people)",
              format: "PDF",
              status: "active",
            },
            {
              name: "Daily Goal Progress",
              frequency: "Every day 6:00 PM",
              recipients: "Department Heads (8 people)",
              format: "Email",
              status: "paused",
            },
          ].map((schedule, i) => (
            <div key={i} className="p-4 rounded-lg border">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-semibold">{schedule.name}</p>
                    <Badge variant={schedule.status === "active" ? "default" : "secondary"}>{schedule.status}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{schedule.frequency}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm">
                    Edit
                  </Button>
                  <Button variant="ghost" size="sm">
                    {schedule.status === "active" ? "Pause" : "Resume"}
                  </Button>
                </div>
              </div>
              <div className="flex items-center gap-4 text-xs text-muted-foreground mt-2">
                <span>To: {schedule.recipients}</span>
                <span>Format: {schedule.format}</span>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Usage Analytics */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Platform Usage Analytics</h2>

        <div className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="p-4 rounded-lg border">
              <p className="text-sm text-muted-foreground mb-1">Feature Adoption</p>
              <p className="text-2xl font-bold mb-2">87%</p>
              <div className="space-y-1 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Goals</span>
                  <span className="font-medium">94%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Recognition</span>
                  <span className="font-medium">89%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Check-ins</span>
                  <span className="font-medium">78%</span>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-lg border">
              <p className="text-sm text-muted-foreground mb-1">User Engagement</p>
              <p className="text-2xl font-bold mb-2">8.2/10</p>
              <div className="space-y-1 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Daily Active</span>
                  <span className="font-medium">156</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Weekly Active</span>
                  <span className="font-medium">234</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Avg Session</span>
                  <span className="font-medium">12 min</span>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-lg border">
              <p className="text-sm text-muted-foreground mb-1">Device Breakdown</p>
              <p className="text-2xl font-bold mb-2">Mixed</p>
              <div className="space-y-1 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Desktop</span>
                  <span className="font-medium">68%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Mobile</span>
                  <span className="font-medium">28%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Tablet</span>
                  <span className="font-medium">4%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
