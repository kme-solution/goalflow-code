"use client"

import { useState } from "react"
import Link from "next/link"
import { Layout } from "@/components/layout"
import { ProtectedRoute } from "@/components/protected-route"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Building2,
  Users,
  Network,
  Settings,
  ChevronRight,
  Target,
  TrendingUp,
  Plus,
} from "lucide-react"
import { MOCK_DEPARTMENTS, MOCK_TEAMS, MOCK_ORGANIZATION } from "@/lib/mock-data/organization"
import OrgChart from "@/components/people/OrgChart"
import { MOCK_ORG_CHART } from "@/lib/mock-data/organization"

export default function PeopleOrganizationPage() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <ProtectedRoute allowedRoles={["hr_admin", "ceo"]}>
      <Layout>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Organization</h1>
              <p className="text-muted-foreground mt-1">
                View and manage your organization structure
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Link href="/admin/organization/hierarchy">
                <Button variant="outline" className="gap-2">
                  <Settings className="h-4 w-4" />
                  Manage Structure
                </Button>
              </Link>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardContent className="flex items-center gap-4 p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Employees</p>
                  <p className="text-2xl font-semibold">{MOCK_ORGANIZATION.employeeCount}</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex items-center gap-4 p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                  <Building2 className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Departments</p>
                  <p className="text-2xl font-semibold">{MOCK_DEPARTMENTS.length}</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex items-center gap-4 p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-warning/10">
                  <Network className="h-5 w-5 text-warning" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Teams</p>
                  <p className="text-2xl font-semibold">{MOCK_TEAMS.length}</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex items-center gap-4 p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-success/10">
                  <Target className="h-5 w-5 text-success" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Structure</p>
                  <Badge variant="secondary" className="mt-1 capitalize">
                    {MOCK_ORGANIZATION.structureType}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="chart">Org Chart</TabsTrigger>
              <TabsTrigger value="departments">Departments</TabsTrigger>
              <TabsTrigger value="teams">Teams</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <div className="grid gap-6 lg:grid-cols-2">
                {/* Company Info */}
                <Card>
                  <CardHeader>
                    <CardTitle>Company Information</CardTitle>
                    <CardDescription>Basic organization details</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Company Name</span>
                      <span className="font-medium">{MOCK_ORGANIZATION.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Industry</span>
                      <span className="font-medium capitalize">{MOCK_ORGANIZATION.industry}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Company Size</span>
                      <span className="font-medium capitalize">{MOCK_ORGANIZATION.size}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Structure Type</span>
                      <span className="font-medium capitalize">{MOCK_ORGANIZATION.structureType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Fiscal Year Start</span>
                      <span className="font-medium">
                        {new Date(2024, parseInt(MOCK_ORGANIZATION.fiscalYearStart) - 1).toLocaleString("default", { month: "long" })}
                      </span>
                    </div>
                  </CardContent>
                </Card>

                {/* Goal Alignment */}
                <Card>
                  <CardHeader>
                    <CardTitle>Goal Alignment</CardTitle>
                    <CardDescription>How goals flow through the organization</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Alignment Enabled</span>
                      <Badge variant={MOCK_ORGANIZATION.settings.goalAlignment.enabled ? "default" : "secondary"}>
                        {MOCK_ORGANIZATION.settings.goalAlignment.enabled ? "Yes" : "No"}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Cascade Direction</span>
                      <span className="font-medium capitalize">
                        {MOCK_ORGANIZATION.settings.goalAlignment.cascadeType.replace("_", " ")}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Max Goal Levels</span>
                      <span className="font-medium">{MOCK_ORGANIZATION.settings.goalAlignment.maxGoalLevels}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Auto Progress Rollup</span>
                      <Badge variant={MOCK_ORGANIZATION.settings.goalAlignment.autoProgressRollup ? "default" : "secondary"}>
                        {MOCK_ORGANIZATION.settings.goalAlignment.autoProgressRollup ? "Yes" : "No"}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Departments Overview */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Departments</CardTitle>
                    <CardDescription>Quick overview of all departments</CardDescription>
                  </div>
                  <Link href="/admin/organization/hierarchy">
                    <Button variant="outline" size="sm">
                      Manage
                    </Button>
                  </Link>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {MOCK_DEPARTMENTS.slice(0, 6).map((dept) => (
                      <div
                        key={dept.id}
                        className="flex items-center gap-3 rounded-lg border p-3 hover:bg-muted/50 transition-colors"
                      >
                        <div
                          className="h-10 w-10 rounded-lg flex items-center justify-center"
                          style={{ backgroundColor: `${dept.color}20` }}
                        >
                          <Building2 className="h-5 w-5" style={{ color: dept.color }} />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="font-medium truncate">{dept.name}</p>
                          <p className="text-sm text-muted-foreground">{dept.employeeCount} employees</p>
                        </div>
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Org Chart Tab */}
            <TabsContent value="chart">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Organization Chart</CardTitle>
                    <CardDescription>Visual hierarchy of your organization</CardDescription>
                  </div>
                  <Link href="/admin/organization/hierarchy/chart">
                    <Button variant="outline" size="sm">
                      Full Screen
                    </Button>
                  </Link>
                </CardHeader>
                <CardContent className="h-[500px] overflow-auto">
                  <OrgChart data={MOCK_ORG_CHART} showGoals />
                </CardContent>
              </Card>
            </TabsContent>

            {/* Departments Tab */}
            <TabsContent value="departments" className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-muted-foreground">
                  {MOCK_DEPARTMENTS.length} departments in your organization
                </p>
                <Link href="/admin/organization/hierarchy">
                  <Button size="sm" className="gap-2">
                    <Plus className="h-4 w-4" />
                    Add Department
                  </Button>
                </Link>
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {MOCK_DEPARTMENTS.map((dept) => (
                  <Card key={dept.id}>
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div
                          className="h-12 w-12 rounded-lg flex items-center justify-center flex-shrink-0"
                          style={{ backgroundColor: `${dept.color}20` }}
                        >
                          <Building2 className="h-6 w-6" style={{ color: dept.color }} />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold truncate">{dept.name}</h3>
                            {dept.code && (
                              <Badge variant="outline" className="text-xs">
                                {dept.code}
                              </Badge>
                            )}
                          </div>
                          {dept.description && (
                            <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                              {dept.description}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Employees</p>
                          <p className="font-medium">{dept.employeeCount}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Head</p>
                          <p className="font-medium truncate">{dept.headName || "Not assigned"}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Teams Tab */}
            <TabsContent value="teams" className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-muted-foreground">
                  {MOCK_TEAMS.length} teams across all departments
                </p>
                <Link href="/admin/organization/hierarchy">
                  <Button size="sm" className="gap-2">
                    <Plus className="h-4 w-4" />
                    Add Team
                  </Button>
                </Link>
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {MOCK_TEAMS.map((team) => {
                  const dept = MOCK_DEPARTMENTS.find((d) => d.id === team.departmentId)
                  return (
                    <Card key={team.id}>
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-semibold">{team.name}</h3>
                            {team.description && (
                              <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                                {team.description}
                              </p>
                            )}
                          </div>
                          <Badge variant="outline" className="capitalize text-xs">
                            {team.type.replace("_", " ")}
                          </Badge>
                        </div>
                        <div className="mt-4 flex items-center gap-4 text-sm">
                          <div className="flex items-center gap-1.5 text-muted-foreground">
                            <Users className="h-3.5 w-3.5" />
                            <span>{team.memberCount} members</span>
                          </div>
                          {dept && (
                            <div className="flex items-center gap-1.5 text-muted-foreground">
                              <Building2 className="h-3.5 w-3.5" />
                              <span className="truncate">{dept.name}</span>
                            </div>
                          )}
                        </div>
                        {team.leadName && (
                          <div className="mt-3 pt-3 border-t">
                            <p className="text-xs text-muted-foreground">Team Lead</p>
                            <p className="text-sm font-medium">{team.leadName}</p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </Layout>
    </ProtectedRoute>
  )
}
