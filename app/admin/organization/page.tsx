"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Building2,
  Settings,
  Users,
  Target,
  Bell,
  Calendar,
  Globe,
  Network,
  ChevronRight,
  Save,
  AlertCircle,
} from "lucide-react"
import {
  MOCK_ORGANIZATION,
  INDUSTRY_OPTIONS,
  COMPANY_SIZE_OPTIONS,
  ORG_STRUCTURE_OPTIONS,
  TIMEZONE_OPTIONS,
  MOCK_DEPARTMENTS,
  MOCK_TEAMS,
} from "@/lib/mock-data/organization"
import type { Organization, OrganizationSettings } from "@/lib/types/organization.types"

export default function OrganizationPage() {
  const [organization, setOrganization] = useState<Organization>(MOCK_ORGANIZATION)
  const [settings, setSettings] = useState<OrganizationSettings>(MOCK_ORGANIZATION.settings)
  const [isSaving, setIsSaving] = useState(false)
  const [activeTab, setActiveTab] = useState("company")

  const handleSave = async () => {
    setIsSaving(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsSaving(false)
  }

  const updateOrganization = (field: keyof Organization, value: unknown) => {
    setOrganization((prev) => ({ ...prev, [field]: value }))
  }

  const updateSettings = (path: string, value: unknown) => {
    setSettings((prev) => {
      const newSettings = { ...prev }
      const keys = path.split(".")
      let current: Record<string, unknown> = newSettings

      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]] as Record<string, unknown>
      }
      current[keys[keys.length - 1]] = value

      return newSettings as OrganizationSettings
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Organization Settings</h1>
          <p className="mt-1 text-muted-foreground">
            Configure your company profile, hierarchy, and goal alignment settings
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/admin/organization/hierarchy">
            <Button variant="outline" className="gap-2">
              <Network className="h-4 w-4" />
              Manage Hierarchy
            </Button>
          </Link>
          <Button onClick={handleSave} disabled={isSaving} className="gap-2">
            <Save className="h-4 w-4" />
            {isSaving ? "Saving..." : "Save Changes"}
          </Button>
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
              <p className="text-sm text-muted-foreground">Employees</p>
              <p className="text-2xl font-semibold">{organization.employeeCount}</p>
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
              <p className="text-sm text-muted-foreground">Goal Alignment</p>
              <Badge variant="secondary" className="mt-1">
                {settings.goalAlignment.enabled ? "Active" : "Disabled"}
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Settings Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:grid-cols-4">
          <TabsTrigger value="company" className="gap-2">
            <Building2 className="hidden h-4 w-4 sm:block" />
            Company
          </TabsTrigger>
          <TabsTrigger value="goals" className="gap-2">
            <Target className="hidden h-4 w-4 sm:block" />
            Goals
          </TabsTrigger>
          <TabsTrigger value="hierarchy" className="gap-2">
            <Network className="hidden h-4 w-4 sm:block" />
            Hierarchy
          </TabsTrigger>
          <TabsTrigger value="notifications" className="gap-2">
            <Bell className="hidden h-4 w-4 sm:block" />
            Notifications
          </TabsTrigger>
        </TabsList>

        {/* Company Information Tab */}
        <TabsContent value="company" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5" />
                  Basic Information
                </CardTitle>
                <CardDescription>Your company identity and profile</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Company Name</Label>
                  <Input
                    id="name"
                    value={organization.name}
                    onChange={(e) => updateOrganization("name", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="legalName">Legal Name</Label>
                  <Input
                    id="legalName"
                    value={organization.legalName || ""}
                    onChange={(e) => updateOrganization("legalName", e.target.value)}
                    placeholder="Official registered name"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    type="url"
                    value={organization.website || ""}
                    onChange={(e) => updateOrganization("website", e.target.value)}
                    placeholder="https://example.com"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={organization.description || ""}
                    onChange={(e) => updateOrganization("description", e.target.value)}
                    placeholder="Brief description of your company"
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Classification */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Classification
                </CardTitle>
                <CardDescription>Industry and company size settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="industry">Industry</Label>
                  <Select
                    value={organization.industry}
                    onValueChange={(value) => updateOrganization("industry", value)}
                  >
                    <SelectTrigger id="industry">
                      <SelectValue placeholder="Select industry" />
                    </SelectTrigger>
                    <SelectContent>
                      {INDUSTRY_OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="size">Company Size</Label>
                  <Select
                    value={organization.size}
                    onValueChange={(value) => updateOrganization("size", value)}
                  >
                    <SelectTrigger id="size">
                      <SelectValue placeholder="Select size" />
                    </SelectTrigger>
                    <SelectContent>
                      {COMPANY_SIZE_OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="structure">Organization Structure</Label>
                  <Select
                    value={organization.structureType}
                    onValueChange={(value) => updateOrganization("structureType", value)}
                  >
                    <SelectTrigger id="structure">
                      <SelectValue placeholder="Select structure" />
                    </SelectTrigger>
                    <SelectContent>
                      {ORG_STRUCTURE_OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          <div className="flex flex-col">
                            <span>{option.label}</span>
                            <span className="text-xs text-muted-foreground">{option.description}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="employeeCount">Number of Employees</Label>
                  <Input
                    id="employeeCount"
                    type="number"
                    value={organization.employeeCount}
                    onChange={(e) => updateOrganization("employeeCount", parseInt(e.target.value) || 0)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Mission & Vision */}
            <Card>
              <CardHeader>
                <CardTitle>Mission & Vision</CardTitle>
                <CardDescription>Define your company purpose and aspirations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="mission">Mission Statement</Label>
                  <Textarea
                    id="mission"
                    value={organization.mission || ""}
                    onChange={(e) => updateOrganization("mission", e.target.value)}
                    placeholder="What is your company's purpose?"
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="vision">Vision Statement</Label>
                  <Textarea
                    id="vision"
                    value={organization.vision || ""}
                    onChange={(e) => updateOrganization("vision", e.target.value)}
                    placeholder="What does your company aspire to achieve?"
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Regional Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  Regional Settings
                </CardTitle>
                <CardDescription>Timezone and fiscal year configuration</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select
                    value={organization.timezone}
                    onValueChange={(value) => updateOrganization("timezone", value)}
                  >
                    <SelectTrigger id="timezone">
                      <SelectValue placeholder="Select timezone" />
                    </SelectTrigger>
                    <SelectContent>
                      {TIMEZONE_OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fiscalYear">Fiscal Year Start</Label>
                  <Select
                    value={organization.fiscalYearStart}
                    onValueChange={(value) => updateOrganization("fiscalYearStart", value)}
                  >
                    <SelectTrigger id="fiscalYear">
                      <SelectValue placeholder="Select month" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 12 }, (_, i) => {
                        const month = new Date(2024, i).toLocaleString("default", { month: "long" })
                        return (
                          <SelectItem key={i + 1} value={String(i + 1)}>
                            {month}
                          </SelectItem>
                        )
                      })}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="currency">Default Currency</Label>
                  <Select
                    value={organization.defaultCurrency}
                    onValueChange={(value) => updateOrganization("defaultCurrency", value)}
                  >
                    <SelectTrigger id="currency">
                      <SelectValue placeholder="Select currency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">USD - US Dollar</SelectItem>
                      <SelectItem value="EUR">EUR - Euro</SelectItem>
                      <SelectItem value="GBP">GBP - British Pound</SelectItem>
                      <SelectItem value="JPY">JPY - Japanese Yen</SelectItem>
                      <SelectItem value="CAD">CAD - Canadian Dollar</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Goal Alignment Tab */}
        <TabsContent value="goals" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    Goal Alignment Settings
                  </CardTitle>
                  <CardDescription>
                    Configure how goals cascade and align across your organization
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Label htmlFor="goalEnabled" className="text-sm">
                    Enable Goal Alignment
                  </Label>
                  <Switch
                    id="goalEnabled"
                    checked={settings.goalAlignment.enabled}
                    onCheckedChange={(checked) => updateSettings("goalAlignment.enabled", checked)}
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {settings.goalAlignment.enabled ? (
                <>
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="cascadeType">Cascade Direction</Label>
                      <Select
                        value={settings.goalAlignment.cascadeType}
                        onValueChange={(value) => updateSettings("goalAlignment.cascadeType", value)}
                      >
                        <SelectTrigger id="cascadeType">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="top_down">
                            <div className="flex flex-col">
                              <span>Top-Down</span>
                              <span className="text-xs text-muted-foreground">
                                Goals cascade from company to teams
                              </span>
                            </div>
                          </SelectItem>
                          <SelectItem value="bottom_up">
                            <div className="flex flex-col">
                              <span>Bottom-Up</span>
                              <span className="text-xs text-muted-foreground">
                                Team goals roll up to company goals
                              </span>
                            </div>
                          </SelectItem>
                          <SelectItem value="bidirectional">
                            <div className="flex flex-col">
                              <span>Bidirectional</span>
                              <span className="text-xs text-muted-foreground">
                                Goals can be set at any level
                              </span>
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="maxLevels">Maximum Goal Levels</Label>
                      <Select
                        value={String(settings.goalAlignment.maxGoalLevels)}
                        onValueChange={(value) =>
                          updateSettings("goalAlignment.maxGoalLevels", parseInt(value))
                        }
                      >
                        <SelectTrigger id="maxLevels">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {[2, 3, 4, 5, 6].map((level) => (
                            <SelectItem key={level} value={String(level)}>
                              {level} levels
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h4 className="font-medium">Alignment Options</h4>

                    <div className="flex items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <Label>Require Alignment</Label>
                        <p className="text-sm text-muted-foreground">
                          All goals must align to a parent goal (except company-level)
                        </p>
                      </div>
                      <Switch
                        checked={settings.goalAlignment.alignmentRequired}
                        onCheckedChange={(checked) =>
                          updateSettings("goalAlignment.alignmentRequired", checked)
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <Label>Enable Weighting</Label>
                        <p className="text-sm text-muted-foreground">
                          Assign contribution weights to aligned goals
                        </p>
                      </div>
                      <Switch
                        checked={settings.goalAlignment.weightingEnabled}
                        onCheckedChange={(checked) =>
                          updateSettings("goalAlignment.weightingEnabled", checked)
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <Label>Auto Progress Rollup</Label>
                        <p className="text-sm text-muted-foreground">
                          Automatically calculate parent goal progress from children
                        </p>
                      </div>
                      <Switch
                        checked={settings.goalAlignment.autoProgressRollup}
                        onCheckedChange={(checked) =>
                          updateSettings("goalAlignment.autoProgressRollup", checked)
                        }
                      />
                    </div>
                  </div>

                  {/* Goal Level Preview */}
                  <Separator />

                  <div className="space-y-4">
                    <h4 className="font-medium">Goal Hierarchy Preview</h4>
                    <div className="flex items-center gap-2 text-sm">
                      {["Company", "Department", "Team", "Individual"]
                        .slice(0, settings.goalAlignment.maxGoalLevels)
                        .map((level, index, arr) => (
                          <div key={level} className="flex items-center gap-2">
                            <Badge variant={index === 0 ? "default" : "secondary"}>{level}</Badge>
                            {index < arr.length - 1 && (
                              <ChevronRight className="h-4 w-4 text-muted-foreground" />
                            )}
                          </div>
                        ))}
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex items-center gap-4 rounded-lg border border-dashed p-6">
                  <AlertCircle className="h-8 w-8 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Goal Alignment Disabled</p>
                    <p className="text-sm text-muted-foreground">
                      Enable goal alignment to configure cascade settings and ensure organizational
                      alignment.
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Performance Reviews */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Review Cycles
              </CardTitle>
              <CardDescription>Configure performance review schedules</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="ratingScale">Performance Rating Scale</Label>
                <Select
                  value={String(settings.performanceRatingScale)}
                  onValueChange={(value) =>
                    updateSettings("performanceRatingScale", parseInt(value))
                  }
                >
                  <SelectTrigger id="ratingScale" className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">5-point scale</SelectItem>
                    <SelectItem value="10">10-point scale</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Separator />

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">Active Review Cycles</h4>
                  <Button variant="outline" size="sm">
                    Add Cycle
                  </Button>
                </div>

                {settings.reviewCycles.map((cycle) => (
                  <div
                    key={cycle.id}
                    className="flex items-center justify-between rounded-lg border p-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{cycle.name}</p>
                        <Badge variant={cycle.isActive ? "default" : "secondary"}>
                          {cycle.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {cycle.frequency.charAt(0).toUpperCase() + cycle.frequency.slice(1)} -{" "}
                        {cycle.durationDays} days
                      </p>
                    </div>
                    <Button variant="ghost" size="sm">
                      Edit
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Hierarchy Tab */}
        <TabsContent value="hierarchy" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Network className="h-5 w-5" />
                Hierarchy Settings
              </CardTitle>
              <CardDescription>Configure organizational hierarchy rules</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="maxDepth">Maximum Hierarchy Depth</Label>
                  <Select
                    value={String(settings.hierarchy.maxDepth)}
                    onValueChange={(value) =>
                      updateSettings("hierarchy.maxDepth", parseInt(value))
                    }
                  >
                    <SelectTrigger id="maxDepth">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {[3, 4, 5, 6, 7, 8].map((depth) => (
                        <SelectItem key={depth} value={String(depth)}>
                          {depth} levels
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">
                    Maximum levels from CEO to individual contributor
                  </p>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-medium">Reporting Options</h4>

                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <Label>Allow Matrix Reporting</Label>
                    <p className="text-sm text-muted-foreground">
                      Employees can have multiple managers (dotted line reporting)
                    </p>
                  </div>
                  <Switch
                    checked={settings.hierarchy.allowMatrixReporting}
                    onCheckedChange={(checked) =>
                      updateSettings("hierarchy.allowMatrixReporting", checked)
                    }
                  />
                </div>

                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <Label>Require Department Assignment</Label>
                    <p className="text-sm text-muted-foreground">
                      All employees must be assigned to a department
                    </p>
                  </div>
                  <Switch
                    checked={settings.hierarchy.requireDepartmentForEmployees}
                    onCheckedChange={(checked) =>
                      updateSettings("hierarchy.requireDepartmentForEmployees", checked)
                    }
                  />
                </div>

                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <Label>Require Team Assignment</Label>
                    <p className="text-sm text-muted-foreground">
                      All employees must be assigned to a team
                    </p>
                  </div>
                  <Switch
                    checked={settings.hierarchy.requireTeamForEmployees}
                    onCheckedChange={(checked) =>
                      updateSettings("hierarchy.requireTeamForEmployees", checked)
                    }
                  />
                </div>
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Manage Organization Structure</h4>
                  <p className="text-sm text-muted-foreground">
                    Create departments, teams, and define reporting relationships
                  </p>
                </div>
                <Link href="/admin/organization/hierarchy">
                  <Button className="gap-2">
                    <Network className="h-4 w-4" />
                    Open Hierarchy Manager
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notification Preferences
              </CardTitle>
              <CardDescription>Configure organization-wide notification settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <Label>Goal Updates</Label>
                  <p className="text-sm text-muted-foreground">
                    Notify managers when team goals are updated
                  </p>
                </div>
                <Switch
                  checked={settings.notifications.goalUpdates}
                  onCheckedChange={(checked) =>
                    updateSettings("notifications.goalUpdates", checked)
                  }
                />
              </div>

              <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <Label>Review Reminders</Label>
                  <p className="text-sm text-muted-foreground">
                    Send reminders for upcoming performance reviews
                  </p>
                </div>
                <Switch
                  checked={settings.notifications.reviewReminders}
                  onCheckedChange={(checked) =>
                    updateSettings("notifications.reviewReminders", checked)
                  }
                />
              </div>

              <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <Label>Recognition Alerts</Label>
                  <p className="text-sm text-muted-foreground">
                    Notify employees when they receive recognition
                  </p>
                </div>
                <Switch
                  checked={settings.notifications.recognitionAlerts}
                  onCheckedChange={(checked) =>
                    updateSettings("notifications.recognitionAlerts", checked)
                  }
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
