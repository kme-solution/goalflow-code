"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Building2,
  Users,
  Network,
  Target,
  Settings,
  BarChart3,
  Zap,
  HelpCircle,
  ChevronRight,
  TrendingUp,
  ArrowUpRight,
} from "lucide-react"
import { MOCK_ORGANIZATION, MOCK_DEPARTMENTS, MOCK_TEAMS } from "@/lib/mock-data/organization"

const quickActions = [
  {
    title: "Organization Settings",
    description: "Configure company profile and goal alignment",
    href: "/admin/organization",
    icon: Building2,
  },
  {
    title: "Manage Hierarchy",
    description: "Departments, teams, and reporting",
    href: "/admin/organization/hierarchy",
    icon: Network,
  },
  {
    title: "View Org Chart",
    description: "Visual organization structure",
    href: "/admin/organization/hierarchy/chart",
    icon: Users,
  },
  {
    title: "Feature Management",
    description: "Enable/disable platform features",
    href: "/admin/features",
    icon: Zap,
  },
]

const stats = [
  {
    label: "Total Employees",
    value: MOCK_ORGANIZATION.employeeCount,
    change: "+8.2%",
    trend: "up",
    icon: Users,
  },
  {
    label: "Departments",
    value: MOCK_DEPARTMENTS.length,
    change: "+1",
    trend: "up",
    icon: Building2,
  },
  {
    label: "Teams",
    value: MOCK_TEAMS.length,
    change: "+3",
    trend: "up",
    icon: Network,
  },
  {
    label: "Goal Completion",
    value: "78%",
    change: "+5%",
    trend: "up",
    icon: Target,
  },
]

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Manage your organization settings and structure
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <stat.icon className="h-5 w-5 text-primary" />
                </div>
                <Badge variant="secondary" className="gap-1 text-xs">
                  <ArrowUpRight className="h-3 w-3" />
                  {stat.change}
                </Badge>
              </div>
              <div className="mt-3">
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="text-2xl font-semibold">{stat.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {quickActions.map((action) => (
            <Link key={action.href} href={action.href}>
              <Card className="h-full hover:shadow-md transition-all hover:border-primary/50 cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted flex-shrink-0">
                      <action.icon className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-medium">{action.title}</h3>
                      <p className="text-sm text-muted-foreground mt-0.5">{action.description}</p>
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Organization Overview */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Company Info */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Organization</CardTitle>
              <CardDescription>Current organization settings</CardDescription>
            </div>
            <Link href="/admin/organization">
              <Button variant="outline" size="sm">
                Edit
              </Button>
            </Link>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Company Name</span>
              <span className="font-medium">{MOCK_ORGANIZATION.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Industry</span>
              <span className="font-medium capitalize">{MOCK_ORGANIZATION.industry}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Size</span>
              <span className="font-medium capitalize">{MOCK_ORGANIZATION.size}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Structure</span>
              <Badge variant="secondary" className="capitalize">
                {MOCK_ORGANIZATION.structureType}
              </Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Goal Alignment</span>
              <Badge variant={MOCK_ORGANIZATION.settings.goalAlignment.enabled ? "default" : "secondary"}>
                {MOCK_ORGANIZATION.settings.goalAlignment.enabled ? "Enabled" : "Disabled"}
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Departments Overview */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Departments</CardTitle>
              <CardDescription>Top departments by headcount</CardDescription>
            </div>
            <Link href="/admin/organization/hierarchy">
              <Button variant="outline" size="sm">
                Manage
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {MOCK_DEPARTMENTS.slice(0, 5).map((dept) => (
                <div key={dept.id} className="flex items-center gap-3">
                  <div
                    className="h-8 w-8 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${dept.color}20` }}
                  >
                    <Building2 className="h-4 w-4" style={{ color: dept.color }} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <p className="font-medium truncate">{dept.name}</p>
                      <span className="text-sm text-muted-foreground">{dept.employeeCount}</span>
                    </div>
                    <div className="mt-1 h-1.5 w-full rounded-full bg-muted overflow-hidden">
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
      </div>

      {/* Admin Navigation */}
      <Card>
        <CardHeader>
          <CardTitle>Admin Tools</CardTitle>
          <CardDescription>All administrative functions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <Link href="/admin/organization">
              <div className="flex items-center gap-3 rounded-lg border p-3 hover:bg-muted/50 transition-colors">
                <Building2 className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Organization Settings</p>
                  <p className="text-xs text-muted-foreground">Company profile & configuration</p>
                </div>
              </div>
            </Link>
            <Link href="/admin/organization/hierarchy">
              <div className="flex items-center gap-3 rounded-lg border p-3 hover:bg-muted/50 transition-colors">
                <Network className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Hierarchy Management</p>
                  <p className="text-xs text-muted-foreground">Departments & teams</p>
                </div>
              </div>
            </Link>
            <Link href="/admin/organization/hierarchy/chart">
              <div className="flex items-center gap-3 rounded-lg border p-3 hover:bg-muted/50 transition-colors">
                <Users className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Org Chart</p>
                  <p className="text-xs text-muted-foreground">Visual structure</p>
                </div>
              </div>
            </Link>
            <Link href="/admin/customers">
              <div className="flex items-center gap-3 rounded-lg border p-3 hover:bg-muted/50 transition-colors">
                <Users className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Customer Management</p>
                  <p className="text-xs text-muted-foreground">Manage customers</p>
                </div>
              </div>
            </Link>
            <Link href="/admin/features">
              <div className="flex items-center gap-3 rounded-lg border p-3 hover:bg-muted/50 transition-colors">
                <Zap className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Feature Management</p>
                  <p className="text-xs text-muted-foreground">Enable/disable features</p>
                </div>
              </div>
            </Link>
            <Link href="/admin/analytics">
              <div className="flex items-center gap-3 rounded-lg border p-3 hover:bg-muted/50 transition-colors">
                <BarChart3 className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Analytics</p>
                  <p className="text-xs text-muted-foreground">Usage & performance</p>
                </div>
              </div>
            </Link>
            <Link href="/admin/support">
              <div className="flex items-center gap-3 rounded-lg border p-3 hover:bg-muted/50 transition-colors">
                <HelpCircle className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Support Tickets</p>
                  <p className="text-xs text-muted-foreground">Help requests</p>
                </div>
              </div>
            </Link>
            <Link href="/admin/settings">
              <div className="flex items-center gap-3 rounded-lg border p-3 hover:bg-muted/50 transition-colors">
                <Settings className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Admin Settings</p>
                  <p className="text-xs text-muted-foreground">System configuration</p>
                </div>
              </div>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
