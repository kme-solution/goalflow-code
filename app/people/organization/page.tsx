"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Layout } from "@/components/layout"
import { ProtectedRoute } from "@/components/protected-route"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import {
  Building2,
  Users,
  Network,
  Settings,
  ChevronRight,
  Target,
  Plus,
  Mail,
  UserPlus,
} from "lucide-react"
import { MOCK_DEPARTMENTS, MOCK_TEAMS, MOCK_ORGANIZATION, MOCK_ORG_CHART } from "@/lib/mock-data/organization"
import OrgChart from "@/components/people/OrgChart"
import type { Department, Team, OrgNode } from "@/lib/types/organization.types"

export default function PeopleOrganizationPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("overview")
  
  // Department state
  const [departments, setDepartments] = useState(MOCK_DEPARTMENTS)
  const [teams, setTeams] = useState(MOCK_TEAMS)
  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null)
  const [deptSheetOpen, setDeptSheetOpen] = useState(false)
  
  // Dialog states
  const [addDeptDialogOpen, setAddDeptDialogOpen] = useState(false)
  const [addTeamDialogOpen, setAddTeamDialogOpen] = useState(false)
  const [inviteDialogOpen, setInviteDialogOpen] = useState(false)
  
  // Selected person from org chart
  const [selectedPerson, setSelectedPerson] = useState<OrgNode | null>(null)
  const [personSheetOpen, setPersonSheetOpen] = useState(false)
  
  // Form states
  const [deptForm, setDeptForm] = useState({ name: "", code: "", description: "", color: "#3b82f6" })
  const [teamForm, setTeamForm] = useState({ name: "", departmentId: "", description: "", type: "functional" as Team["type"] })
  const [inviteForm, setInviteForm] = useState({ email: "", name: "", role: "employee" })

  // Handlers
  const handleDepartmentClick = (dept: Department) => {
    setSelectedDepartment(dept)
    setDeptSheetOpen(true)
  }

  const handleAddDepartment = () => {
    if (!deptForm.name) return
    const newDept: Department = {
      id: `dept-${Date.now()}`,
      organizationId: MOCK_ORGANIZATION.id,
      name: deptForm.name,
      code: deptForm.code || undefined,
      description: deptForm.description || undefined,
      employeeCount: 0,
      level: 0,
      order: departments.length,
      color: deptForm.color,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    setDepartments([...departments, newDept])
    setDeptForm({ name: "", code: "", description: "", color: "#3b82f6" })
    setAddDeptDialogOpen(false)
  }

  const handleAddTeam = () => {
    if (!teamForm.name || !teamForm.departmentId) return
    const newTeam: Team = {
      id: `team-${Date.now()}`,
      organizationId: MOCK_ORGANIZATION.id,
      departmentId: teamForm.departmentId,
      name: teamForm.name,
      description: teamForm.description || undefined,
      memberIds: [],
      memberCount: 0,
      type: teamForm.type,
      status: "active",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    setTeams([...teams, newTeam])
    setTeamForm({ name: "", departmentId: "", description: "", type: "functional" })
    setAddTeamDialogOpen(false)
  }

  const handleInvitePeople = () => {
    if (!inviteForm.email || !inviteForm.name) return
    // In real app, this would send an invitation
    alert(`Invitation sent to ${inviteForm.email}`)
    setInviteForm({ email: "", name: "", role: "employee" })
    setInviteDialogOpen(false)
  }

  const handleOrgNodeClick = (node: OrgNode) => {
    setSelectedPerson(node)
    setPersonSheetOpen(true)
  }

  const getDepartmentTeams = (deptId: string) => teams.filter(t => t.departmentId === deptId)

  return (
    <ProtectedRoute allowedRoles={["hr_admin", "ceo", "manager", "team_lead", "employee"]}>
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
              <Button variant="outline" className="gap-2" onClick={() => setInviteDialogOpen(true)}>
                <UserPlus className="h-4 w-4" />
                Invite People
              </Button>
              <Button variant="outline" className="gap-2" onClick={() => router.push("/admin/organization/hierarchy")}>
                <Settings className="h-4 w-4" />
                Manage Structure
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
                  <Button variant="outline" size="sm" onClick={() => setActiveTab("departments")}>
                    View All
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {departments.slice(0, 6).map((dept) => (
                      <button
                        key={dept.id}
                        onClick={() => handleDepartmentClick(dept)}
                        className="flex items-center gap-3 rounded-lg border p-3 hover:bg-muted/50 transition-colors text-left w-full"
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
                      </button>
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
                    <CardDescription>Visual hierarchy of your organization - click on a person to view details</CardDescription>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => router.push("/admin/organization/hierarchy/chart")}>
                    Full Screen
                  </Button>
                </CardHeader>
                <CardContent className="h-[600px] overflow-auto">
                  <OrgChart data={MOCK_ORG_CHART} showGoals onNodeClick={handleOrgNodeClick} />
                </CardContent>
              </Card>
            </TabsContent>

            {/* Departments Tab */}
            <TabsContent value="departments" className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-muted-foreground">
                  {departments.length} departments in your organization
                </p>
                <Button size="sm" className="gap-2" onClick={() => setAddDeptDialogOpen(true)}>
                  <Plus className="h-4 w-4" />
                  Add Department
                </Button>
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {departments.map((dept) => (
                  <Card 
                    key={dept.id} 
                    className="cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => handleDepartmentClick(dept)}
                  >
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
                  {teams.length} teams across all departments
                </p>
                <Button size="sm" className="gap-2" onClick={() => setAddTeamDialogOpen(true)}>
                  <Plus className="h-4 w-4" />
                  Add Team
                </Button>
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {teams.map((team) => {
                  const dept = departments.find((d) => d.id === team.departmentId)
                  return (
                    <Card key={team.id} className="hover:shadow-md transition-shadow">
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

          {/* Add Department Dialog */}
          <Dialog open={addDeptDialogOpen} onOpenChange={setAddDeptDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Department</DialogTitle>
                <DialogDescription>Create a new department in your organization</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="dept-name">Department Name</Label>
                  <Input
                    id="dept-name"
                    placeholder="e.g., Engineering"
                    value={deptForm.name}
                    onChange={(e) => setDeptForm({ ...deptForm, name: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="dept-code">Code (Optional)</Label>
                    <Input
                      id="dept-code"
                      placeholder="e.g., ENG"
                      value={deptForm.code}
                      onChange={(e) => setDeptForm({ ...deptForm, code: e.target.value.toUpperCase() })}
                      maxLength={10}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dept-color">Color</Label>
                    <div className="flex gap-2">
                      <Input
                        id="dept-color"
                        type="color"
                        value={deptForm.color}
                        onChange={(e) => setDeptForm({ ...deptForm, color: e.target.value })}
                        className="h-10 w-14 cursor-pointer p-1"
                      />
                      <Input
                        value={deptForm.color}
                        onChange={(e) => setDeptForm({ ...deptForm, color: e.target.value })}
                        className="flex-1"
                      />
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dept-desc">Description (Optional)</Label>
                  <Textarea
                    id="dept-desc"
                    placeholder="Brief description of the department"
                    value={deptForm.description}
                    onChange={(e) => setDeptForm({ ...deptForm, description: e.target.value })}
                    rows={2}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setAddDeptDialogOpen(false)}>Cancel</Button>
                <Button onClick={handleAddDepartment} disabled={!deptForm.name}>Create Department</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Add Team Dialog */}
          <Dialog open={addTeamDialogOpen} onOpenChange={setAddTeamDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Team</DialogTitle>
                <DialogDescription>Create a new team within a department</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="team-name">Team Name</Label>
                  <Input
                    id="team-name"
                    placeholder="e.g., Platform Team"
                    value={teamForm.name}
                    onChange={(e) => setTeamForm({ ...teamForm, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="team-dept">Department</Label>
                  <Select
                    value={teamForm.departmentId}
                    onValueChange={(value) => setTeamForm({ ...teamForm, departmentId: value })}
                  >
                    <SelectTrigger id="team-dept">
                      <SelectValue placeholder="Select a department" />
                    </SelectTrigger>
                    <SelectContent>
                      {departments.map((dept) => (
                        <SelectItem key={dept.id} value={dept.id}>{dept.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="team-type">Team Type</Label>
                  <Select
                    value={teamForm.type}
                    onValueChange={(value) => setTeamForm({ ...teamForm, type: value as Team["type"] })}
                  >
                    <SelectTrigger id="team-type">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="functional">Functional</SelectItem>
                      <SelectItem value="project">Project</SelectItem>
                      <SelectItem value="cross_functional">Cross-functional</SelectItem>
                      <SelectItem value="virtual">Virtual</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="team-desc">Description (Optional)</Label>
                  <Textarea
                    id="team-desc"
                    placeholder="Brief description of the team"
                    value={teamForm.description}
                    onChange={(e) => setTeamForm({ ...teamForm, description: e.target.value })}
                    rows={2}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setAddTeamDialogOpen(false)}>Cancel</Button>
                <Button onClick={handleAddTeam} disabled={!teamForm.name || !teamForm.departmentId}>Create Team</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Invite People Dialog */}
          <Dialog open={inviteDialogOpen} onOpenChange={setInviteDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Invite People</DialogTitle>
                <DialogDescription>Send an invitation to join your organization</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="invite-name">Full Name</Label>
                  <Input
                    id="invite-name"
                    placeholder="John Doe"
                    value={inviteForm.name}
                    onChange={(e) => setInviteForm({ ...inviteForm, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="invite-email">Email Address</Label>
                  <Input
                    id="invite-email"
                    type="email"
                    placeholder="john@example.com"
                    value={inviteForm.email}
                    onChange={(e) => setInviteForm({ ...inviteForm, email: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="invite-role">Role</Label>
                  <Select
                    value={inviteForm.role}
                    onValueChange={(value) => setInviteForm({ ...inviteForm, role: value })}
                  >
                    <SelectTrigger id="invite-role">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="employee">Employee</SelectItem>
                      <SelectItem value="team_lead">Team Lead</SelectItem>
                      <SelectItem value="manager">Manager</SelectItem>
                      <SelectItem value="hr_admin">HR Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setInviteDialogOpen(false)}>Cancel</Button>
                <Button onClick={handleInvitePeople} disabled={!inviteForm.name || !inviteForm.email}>
                  <Mail className="mr-2 h-4 w-4" />
                  Send Invitation
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Department Detail Sheet */}
          <Sheet open={deptSheetOpen} onOpenChange={setDeptSheetOpen}>
            <SheetContent className="w-full sm:max-w-lg">
              {selectedDepartment && (
                <>
                  <SheetHeader>
                    <div className="flex items-center gap-3">
                      <div
                        className="h-12 w-12 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: `${selectedDepartment.color}20` }}
                      >
                        <Building2 className="h-6 w-6" style={{ color: selectedDepartment.color }} />
                      </div>
                      <div>
                        <SheetTitle className="flex items-center gap-2">
                          {selectedDepartment.name}
                          {selectedDepartment.code && (
                            <Badge variant="outline">{selectedDepartment.code}</Badge>
                          )}
                        </SheetTitle>
                        <SheetDescription>
                          {selectedDepartment.employeeCount} employees
                        </SheetDescription>
                      </div>
                    </div>
                  </SheetHeader>
                  <div className="mt-6 space-y-6">
                    {selectedDepartment.description && (
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground mb-2">Description</h4>
                        <p className="text-sm">{selectedDepartment.description}</p>
                      </div>
                    )}
                    
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground mb-2">Department Head</h4>
                      <p className="text-sm font-medium">{selectedDepartment.headName || "Not assigned"}</p>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground mb-3">
                        Teams ({getDepartmentTeams(selectedDepartment.id).length})
                      </h4>
                      <div className="space-y-2">
                        {getDepartmentTeams(selectedDepartment.id).map((team) => (
                          <div key={team.id} className="flex items-center justify-between rounded-lg border p-3">
                            <div className="flex items-center gap-3">
                              <Users className="h-4 w-4 text-muted-foreground" />
                              <div>
                                <p className="font-medium text-sm">{team.name}</p>
                                <p className="text-xs text-muted-foreground">{team.memberCount} members</p>
                              </div>
                            </div>
                            <Badge variant="outline" className="text-xs capitalize">
                              {team.type.replace("_", " ")}
                            </Badge>
                          </div>
                        ))}
                        {getDepartmentTeams(selectedDepartment.id).length === 0 && (
                          <p className="text-sm text-muted-foreground py-4 text-center">No teams in this department</p>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-2 pt-4 border-t">
                      <Button variant="outline" className="flex-1" onClick={() => router.push("/admin/organization/hierarchy")}>
                        <Settings className="mr-2 h-4 w-4" />
                        Edit Department
                      </Button>
                      <Button className="flex-1" onClick={() => {
                        setTeamForm({ ...teamForm, departmentId: selectedDepartment.id })
                        setDeptSheetOpen(false)
                        setAddTeamDialogOpen(true)
                      }}>
                        <Plus className="mr-2 h-4 w-4" />
                        Add Team
                      </Button>
                    </div>
                  </div>
                </>
              )}
            </SheetContent>
          </Sheet>

          {/* Person Detail Sheet (from Org Chart) */}
          <Sheet open={personSheetOpen} onOpenChange={setPersonSheetOpen}>
            <SheetContent className="w-full sm:max-w-md">
              {selectedPerson && (
                <>
                  <SheetHeader>
                    <div className="flex items-center gap-4">
                      <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center text-xl font-semibold text-primary">
                        {selectedPerson.name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2)}
                      </div>
                      <div>
                        <SheetTitle>{selectedPerson.name}</SheetTitle>
                        <SheetDescription>{selectedPerson.title}</SheetDescription>
                      </div>
                    </div>
                  </SheetHeader>
                  <div className="mt-6 space-y-6">
                    <div className="flex flex-wrap gap-2">
                      <Badge>{selectedPerson.department}</Badge>
                      {selectedPerson.teamName && (
                        <Badge variant="outline">{selectedPerson.teamName}</Badge>
                      )}
                    </div>

                    {selectedPerson.email && (
                      <div className="flex items-center gap-3 text-sm">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span>{selectedPerson.email}</span>
                      </div>
                    )}

                    <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                      <div>
                        <p className="text-xs text-muted-foreground">Direct Reports</p>
                        <p className="text-2xl font-semibold">{selectedPerson.directReports}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Total in Org</p>
                        <p className="text-2xl font-semibold">{selectedPerson.totalReports}</p>
                      </div>
                    </div>

                    {selectedPerson.goals && (
                      <div className="pt-4 border-t">
                        <h4 className="text-sm font-medium mb-3">Goals</h4>
                        <div className="grid grid-cols-3 gap-4 text-center">
                          <div className="rounded-lg border p-3">
                            <p className="text-2xl font-semibold">{selectedPerson.goals.total}</p>
                            <p className="text-xs text-muted-foreground">Total</p>
                          </div>
                          <div className="rounded-lg border p-3">
                            <p className="text-2xl font-semibold text-success">{selectedPerson.goals.completed}</p>
                            <p className="text-xs text-muted-foreground">Completed</p>
                          </div>
                          <div className="rounded-lg border p-3">
                            <p className="text-2xl font-semibold text-warning">{selectedPerson.goals.atRisk}</p>
                            <p className="text-xs text-muted-foreground">At Risk</p>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="flex gap-2 pt-4 border-t">
                      <Button variant="outline" className="flex-1">
                        <Mail className="mr-2 h-4 w-4" />
                        Send Email
                      </Button>
                      <Button className="flex-1" onClick={() => router.push(`/people/${selectedPerson.id}`)}>
                        <Users className="mr-2 h-4 w-4" />
                        View Profile
                      </Button>
                    </div>
                  </div>
                </>
              )}
            </SheetContent>
          </Sheet>
        </div>
      </Layout>
    </ProtectedRoute>
  )
}
