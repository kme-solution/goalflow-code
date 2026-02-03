"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Building2,
  Users,
  Network,
  Plus,
  MoreHorizontal,
  Edit,
  Trash2,
  ChevronRight,
  Search,
  ArrowLeft,
  UserPlus,
  GitBranch,
  Target,
  ChevronDown,
} from "lucide-react"
import {
  MOCK_DEPARTMENTS,
  MOCK_TEAMS,
  MOCK_REPORTING_RELATIONSHIPS,
  MOCK_ORGANIZATION,
} from "@/lib/mock-data/organization"
import { MOCK_USERS } from "@/lib/mock-data/users"
import type { Department, Team, ReportingRelationship } from "@/lib/types/organization.types"

// Department Form Component
function DepartmentForm({
  department,
  onSave,
  onCancel,
}: {
  department?: Department
  onSave: (data: Partial<Department>) => void
  onCancel: () => void
}) {
  const [formData, setFormData] = useState({
    name: department?.name || "",
    code: department?.code || "",
    description: department?.description || "",
    headId: department?.headId || "",
    parentDepartmentId: department?.parentDepartmentId || "",
    color: department?.color || "#3b82f6",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="dept-name">Department Name</Label>
          <Input
            id="dept-name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="e.g., Engineering"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="dept-code">Code</Label>
          <Input
            id="dept-code"
            value={formData.code}
            onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
            placeholder="e.g., ENG"
            maxLength={10}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="dept-desc">Description</Label>
        <Textarea
          id="dept-desc"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Brief description of the department"
          rows={2}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="dept-head">Department Head</Label>
          <Select
            value={formData.headId}
            onValueChange={(value) => setFormData({ ...formData, headId: value })}
          >
            <SelectTrigger id="dept-head">
              <SelectValue placeholder="Select head" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">No head assigned</SelectItem>
              {MOCK_USERS.filter((u) => u.role === "manager" || u.role === "ceo").map((user) => (
                <SelectItem key={user.id} value={user.id}>
                  {user.name} - {user.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="parent-dept">Parent Department</Label>
          <Select
            value={formData.parentDepartmentId}
            onValueChange={(value) => setFormData({ ...formData, parentDepartmentId: value })}
          >
            <SelectTrigger id="parent-dept">
              <SelectValue placeholder="Select parent" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">No parent (Top level)</SelectItem>
              {MOCK_DEPARTMENTS.filter((d) => d.id !== department?.id).map((dept) => (
                <SelectItem key={dept.id} value={dept.id}>
                  {dept.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="dept-color">Brand Color</Label>
        <div className="flex items-center gap-3">
          <Input
            id="dept-color"
            type="color"
            value={formData.color}
            onChange={(e) => setFormData({ ...formData, color: e.target.value })}
            className="h-10 w-16 cursor-pointer p-1"
          />
          <Input
            value={formData.color}
            onChange={(e) => setFormData({ ...formData, color: e.target.value })}
            placeholder="#3b82f6"
            className="flex-1"
          />
        </div>
      </div>

      <DialogFooter>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">{department ? "Update" : "Create"} Department</Button>
      </DialogFooter>
    </form>
  )
}

// Team Form Component
function TeamForm({
  team,
  onSave,
  onCancel,
}: {
  team?: Team
  onSave: (data: Partial<Team>) => void
  onCancel: () => void
}) {
  const [formData, setFormData] = useState({
    name: team?.name || "",
    departmentId: team?.departmentId || "",
    description: team?.description || "",
    leadId: team?.leadId || "",
    type: team?.type || ("functional" as Team["type"]),
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="team-name">Team Name</Label>
        <Input
          id="team-name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="e.g., Platform Team"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="team-dept">Department</Label>
        <Select
          value={formData.departmentId}
          onValueChange={(value) => setFormData({ ...formData, departmentId: value })}
        >
          <SelectTrigger id="team-dept">
            <SelectValue placeholder="Select department" />
          </SelectTrigger>
          <SelectContent>
            {MOCK_DEPARTMENTS.map((dept) => (
              <SelectItem key={dept.id} value={dept.id}>
                {dept.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="team-desc">Description</Label>
        <Textarea
          id="team-desc"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Brief description of the team"
          rows={2}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="team-lead">Team Lead</Label>
          <Select
            value={formData.leadId}
            onValueChange={(value) => setFormData({ ...formData, leadId: value })}
          >
            <SelectTrigger id="team-lead">
              <SelectValue placeholder="Select lead" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">No lead assigned</SelectItem>
              {MOCK_USERS.filter((u) => u.role === "team_lead" || u.role === "manager").map(
                (user) => (
                  <SelectItem key={user.id} value={user.id}>
                    {user.name}
                  </SelectItem>
                )
              )}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="team-type">Team Type</Label>
          <Select
            value={formData.type}
            onValueChange={(value) => setFormData({ ...formData, type: value as Team["type"] })}
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
      </div>

      <DialogFooter>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">{team ? "Update" : "Create"} Team</Button>
      </DialogFooter>
    </form>
  )
}

// Reporting Relationship Form Component
function ReportingForm({
  relationship,
  onSave,
  onCancel,
}: {
  relationship?: ReportingRelationship
  onSave: (data: Partial<ReportingRelationship>) => void
  onCancel: () => void
}) {
  const [formData, setFormData] = useState({
    reporterId: relationship?.reporterId || "",
    managerId: relationship?.managerId || "",
    relationshipType: relationship?.relationshipType || ("direct" as ReportingRelationship["relationshipType"]),
    isPrimary: relationship?.isPrimary ?? true,
    notes: relationship?.notes || "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const reporter = MOCK_USERS.find((u) => u.id === formData.reporterId)
    const manager = MOCK_USERS.find((u) => u.id === formData.managerId)
    onSave({
      ...formData,
      reporterName: reporter?.name || "",
      managerName: manager?.name || "",
      startDate: new Date().toISOString().split("T")[0],
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="reporter">Employee</Label>
          <Select
            value={formData.reporterId}
            onValueChange={(value) => setFormData({ ...formData, reporterId: value })}
          >
            <SelectTrigger id="reporter">
              <SelectValue placeholder="Select employee" />
            </SelectTrigger>
            <SelectContent>
              {MOCK_USERS.map((user) => (
                <SelectItem key={user.id} value={user.id}>
                  {user.name} - {user.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="manager">Reports To</Label>
          <Select
            value={formData.managerId}
            onValueChange={(value) => setFormData({ ...formData, managerId: value })}
          >
            <SelectTrigger id="manager">
              <SelectValue placeholder="Select manager" />
            </SelectTrigger>
            <SelectContent>
              {MOCK_USERS.filter((u) => u.id !== formData.reporterId).map((user) => (
                <SelectItem key={user.id} value={user.id}>
                  {user.name} - {user.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="rel-type">Relationship Type</Label>
          <Select
            value={formData.relationshipType}
            onValueChange={(value) =>
              setFormData({
                ...formData,
                relationshipType: value as ReportingRelationship["relationshipType"],
              })
            }
          >
            <SelectTrigger id="rel-type">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="direct">Direct (Solid Line)</SelectItem>
              <SelectItem value="dotted">Dotted (Matrix)</SelectItem>
              <SelectItem value="functional">Functional</SelectItem>
              <SelectItem value="project">Project-based</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="is-primary">Primary Relationship</Label>
          <Select
            value={formData.isPrimary ? "true" : "false"}
            onValueChange={(value) => setFormData({ ...formData, isPrimary: value === "true" })}
          >
            <SelectTrigger id="is-primary">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="true">Yes - Primary Manager</SelectItem>
              <SelectItem value="false">No - Secondary</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="rel-notes">Notes</Label>
        <Textarea
          id="rel-notes"
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          placeholder="Additional context for this relationship"
          rows={2}
        />
      </div>

      <DialogFooter>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">{relationship ? "Update" : "Create"} Relationship</Button>
      </DialogFooter>
    </form>
  )
}

// Department Card Component
function DepartmentCard({
  department,
  teams,
  onEdit,
  onDelete,
}: {
  department: Department
  teams: Team[]
  onEdit: () => void
  onDelete: () => void
}) {
  const [expanded, setExpanded] = useState(false)
  const departmentTeams = teams.filter((t) => t.departmentId === department.id)

  return (
    <Card className="overflow-hidden">
      <div
        className="flex cursor-pointer items-center justify-between p-4 hover:bg-muted/50"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center gap-4">
          <div
            className="flex h-10 w-10 items-center justify-center rounded-lg text-white"
            style={{ backgroundColor: department.color || "#3b82f6" }}
          >
            <Building2 className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-semibold">{department.name}</h3>
              {department.code && (
                <Badge variant="outline" className="text-xs">
                  {department.code}
                </Badge>
              )}
            </div>
            <p className="text-sm text-muted-foreground">
              {department.headName || "No head assigned"} - {department.employeeCount} employees
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary">{departmentTeams.length} teams</Badge>
          <DropdownMenu>
            <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={onEdit}>
                <Edit className="mr-2 h-4 w-4" />
                Edit Department
              </DropdownMenuItem>
              <DropdownMenuItem>
                <UserPlus className="mr-2 h-4 w-4" />
                Add Team
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive" onClick={onDelete}>
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <ChevronDown
            className={`h-4 w-4 transition-transform ${expanded ? "rotate-180" : ""}`}
          />
        </div>
      </div>

      {expanded && departmentTeams.length > 0 && (
        <div className="border-t bg-muted/30 p-4">
          <h4 className="mb-3 text-sm font-medium text-muted-foreground">Teams</h4>
          <div className="space-y-2">
            {departmentTeams.map((team) => (
              <div
                key={team.id}
                className="flex items-center justify-between rounded-lg bg-background p-3"
              >
                <div className="flex items-center gap-3">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium">{team.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {team.leadName || "No lead"} - {team.memberCount} members
                    </p>
                  </div>
                </div>
                <Badge variant="outline" className="text-xs">
                  {team.type.replace("_", " ")}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      )}
    </Card>
  )
}

export default function HierarchyPage() {
  const [activeTab, setActiveTab] = useState("departments")
  const [searchQuery, setSearchQuery] = useState("")
  const [departments, setDepartments] = useState(MOCK_DEPARTMENTS)
  const [teams, setTeams] = useState(MOCK_TEAMS)
  const [relationships, setRelationships] = useState(MOCK_REPORTING_RELATIONSHIPS)

  // Dialog states
  const [deptDialogOpen, setDeptDialogOpen] = useState(false)
  const [teamDialogOpen, setTeamDialogOpen] = useState(false)
  const [relDialogOpen, setRelDialogOpen] = useState(false)
  const [editingDept, setEditingDept] = useState<Department | undefined>()
  const [editingTeam, setEditingTeam] = useState<Team | undefined>()
  const [editingRel, setEditingRel] = useState<ReportingRelationship | undefined>()

  // Filter functions
  const filteredDepartments = departments.filter(
    (d) =>
      d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.code?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const filteredTeams = teams.filter(
    (t) =>
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.description?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const filteredRelationships = relationships.filter(
    (r) =>
      r.reporterName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.managerName.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // CRUD handlers
  const handleSaveDepartment = (data: Partial<Department>) => {
    if (editingDept) {
      setDepartments((prev) =>
        prev.map((d) => (d.id === editingDept.id ? { ...d, ...data } : d))
      )
    } else {
      const newDept: Department = {
        id: `dept-${Date.now()}`,
        organizationId: MOCK_ORGANIZATION.id,
        name: data.name || "",
        code: data.code,
        description: data.description,
        headId: data.headId === "none" ? undefined : data.headId,
        headName: MOCK_USERS.find((u) => u.id === data.headId)?.name,
        parentDepartmentId: data.parentDepartmentId === "none" ? undefined : data.parentDepartmentId,
        employeeCount: 0,
        level: data.parentDepartmentId ? 1 : 0,
        order: departments.length,
        color: data.color,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
      setDepartments((prev) => [...prev, newDept])
    }
    setDeptDialogOpen(false)
    setEditingDept(undefined)
  }

  const handleSaveTeam = (data: Partial<Team>) => {
    if (editingTeam) {
      setTeams((prev) => prev.map((t) => (t.id === editingTeam.id ? { ...t, ...data } : t)))
    } else {
      const newTeam: Team = {
        id: `team-${Date.now()}`,
        organizationId: MOCK_ORGANIZATION.id,
        departmentId: data.departmentId || "",
        name: data.name || "",
        description: data.description,
        leadId: data.leadId === "none" ? undefined : data.leadId,
        leadName: MOCK_USERS.find((u) => u.id === data.leadId)?.name,
        memberIds: [],
        memberCount: 0,
        type: data.type || "functional",
        status: "active",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
      setTeams((prev) => [...prev, newTeam])
    }
    setTeamDialogOpen(false)
    setEditingTeam(undefined)
  }

  const handleSaveRelationship = (data: Partial<ReportingRelationship>) => {
    if (editingRel) {
      setRelationships((prev) =>
        prev.map((r) => (r.id === editingRel.id ? { ...r, ...data } : r))
      )
    } else {
      const newRel: ReportingRelationship = {
        id: `rel-${Date.now()}`,
        organizationId: MOCK_ORGANIZATION.id,
        reporterId: data.reporterId || "",
        reporterName: data.reporterName || "",
        managerId: data.managerId || "",
        managerName: data.managerName || "",
        relationshipType: data.relationshipType || "direct",
        startDate: data.startDate || new Date().toISOString().split("T")[0],
        isPrimary: data.isPrimary ?? true,
        notes: data.notes,
      }
      setRelationships((prev) => [...prev, newRel])
    }
    setRelDialogOpen(false)
    setEditingRel(undefined)
  }

  const getRelationshipTypeBadge = (type: ReportingRelationship["relationshipType"]) => {
    const variants: Record<string, "default" | "secondary" | "outline"> = {
      direct: "default",
      dotted: "secondary",
      functional: "outline",
      project: "outline",
    }
    return variants[type] || "secondary"
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/organization">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              Organization Hierarchy
            </h1>
            <p className="mt-1 text-muted-foreground">
              Manage departments, teams, and reporting relationships
            </p>
          </div>
        </div>
        <Link href="/admin/organization/hierarchy/chart">
          <Button variant="outline" className="gap-2">
            <Network className="h-4 w-4" />
            View Org Chart
          </Button>
        </Link>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search departments, teams, or people..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <TabsList>
            <TabsTrigger value="departments" className="gap-2">
              <Building2 className="h-4 w-4" />
              Departments
              <Badge variant="secondary" className="ml-1">
                {departments.length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="teams" className="gap-2">
              <Users className="h-4 w-4" />
              Teams
              <Badge variant="secondary" className="ml-1">
                {teams.length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="reporting" className="gap-2">
              <GitBranch className="h-4 w-4" />
              Reporting
              <Badge variant="secondary" className="ml-1">
                {relationships.length}
              </Badge>
            </TabsTrigger>
          </TabsList>

          {/* Add Buttons based on active tab */}
          <div className="flex gap-2">
            {activeTab === "departments" && (
              <Dialog open={deptDialogOpen} onOpenChange={setDeptDialogOpen}>
                <DialogTrigger asChild>
                  <Button
                    className="gap-2"
                    onClick={() => {
                      setEditingDept(undefined)
                      setDeptDialogOpen(true)
                    }}
                  >
                    <Plus className="h-4 w-4" />
                    Add Department
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-lg">
                  <DialogHeader>
                    <DialogTitle>
                      {editingDept ? "Edit Department" : "Create Department"}
                    </DialogTitle>
                    <DialogDescription>
                      {editingDept
                        ? "Update the department information"
                        : "Add a new department to your organization"}
                    </DialogDescription>
                  </DialogHeader>
                  <DepartmentForm
                    department={editingDept}
                    onSave={handleSaveDepartment}
                    onCancel={() => {
                      setDeptDialogOpen(false)
                      setEditingDept(undefined)
                    }}
                  />
                </DialogContent>
              </Dialog>
            )}

            {activeTab === "teams" && (
              <Dialog open={teamDialogOpen} onOpenChange={setTeamDialogOpen}>
                <DialogTrigger asChild>
                  <Button
                    className="gap-2"
                    onClick={() => {
                      setEditingTeam(undefined)
                      setTeamDialogOpen(true)
                    }}
                  >
                    <Plus className="h-4 w-4" />
                    Add Team
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-lg">
                  <DialogHeader>
                    <DialogTitle>{editingTeam ? "Edit Team" : "Create Team"}</DialogTitle>
                    <DialogDescription>
                      {editingTeam ? "Update the team information" : "Add a new team to a department"}
                    </DialogDescription>
                  </DialogHeader>
                  <TeamForm
                    team={editingTeam}
                    onSave={handleSaveTeam}
                    onCancel={() => {
                      setTeamDialogOpen(false)
                      setEditingTeam(undefined)
                    }}
                  />
                </DialogContent>
              </Dialog>
            )}

            {activeTab === "reporting" && (
              <Dialog open={relDialogOpen} onOpenChange={setRelDialogOpen}>
                <DialogTrigger asChild>
                  <Button
                    className="gap-2"
                    onClick={() => {
                      setEditingRel(undefined)
                      setRelDialogOpen(true)
                    }}
                  >
                    <Plus className="h-4 w-4" />
                    Add Relationship
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-lg">
                  <DialogHeader>
                    <DialogTitle>
                      {editingRel ? "Edit Relationship" : "Create Reporting Relationship"}
                    </DialogTitle>
                    <DialogDescription>
                      {editingRel
                        ? "Update the reporting relationship"
                        : "Define who reports to whom"}
                    </DialogDescription>
                  </DialogHeader>
                  <ReportingForm
                    relationship={editingRel}
                    onSave={handleSaveRelationship}
                    onCancel={() => {
                      setRelDialogOpen(false)
                      setEditingRel(undefined)
                    }}
                  />
                </DialogContent>
              </Dialog>
            )}
          </div>
        </div>

        {/* Departments Tab */}
        <TabsContent value="departments" className="mt-6 space-y-4">
          {filteredDepartments.length === 0 ? (
            <Card className="p-12 text-center">
              <Building2 className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-semibold">No departments found</h3>
              <p className="mt-2 text-muted-foreground">
                {searchQuery
                  ? "No departments match your search"
                  : "Get started by creating your first department"}
              </p>
              {!searchQuery && (
                <Button
                  className="mt-4"
                  onClick={() => {
                    setEditingDept(undefined)
                    setDeptDialogOpen(true)
                  }}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Department
                </Button>
              )}
            </Card>
          ) : (
            <div className="space-y-3">
              {filteredDepartments.map((dept) => (
                <DepartmentCard
                  key={dept.id}
                  department={dept}
                  teams={teams}
                  onEdit={() => {
                    setEditingDept(dept)
                    setDeptDialogOpen(true)
                  }}
                  onDelete={() => {
                    setDepartments((prev) => prev.filter((d) => d.id !== dept.id))
                  }}
                />
              ))}
            </div>
          )}
        </TabsContent>

        {/* Teams Tab */}
        <TabsContent value="teams" className="mt-6">
          {filteredTeams.length === 0 ? (
            <Card className="p-12 text-center">
              <Users className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-semibold">No teams found</h3>
              <p className="mt-2 text-muted-foreground">
                {searchQuery
                  ? "No teams match your search"
                  : "Get started by creating your first team"}
              </p>
              {!searchQuery && (
                <Button
                  className="mt-4"
                  onClick={() => {
                    setEditingTeam(undefined)
                    setTeamDialogOpen(true)
                  }}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Team
                </Button>
              )}
            </Card>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredTeams.map((team) => {
                const department = departments.find((d) => d.id === team.departmentId)
                return (
                  <Card key={team.id} className="overflow-hidden">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div
                            className="flex h-10 w-10 items-center justify-center rounded-lg"
                            style={{ backgroundColor: `${department?.color}20` }}
                          >
                            <Users className="h-5 w-5" style={{ color: department?.color }} />
                          </div>
                          <div>
                            <CardTitle className="text-base">{team.name}</CardTitle>
                            <CardDescription className="text-xs">
                              {department?.name}
                            </CardDescription>
                          </div>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => {
                                setEditingTeam(team)
                                setTeamDialogOpen(true)
                              }}
                            >
                              <Edit className="mr-2 h-4 w-4" />
                              Edit Team
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <UserPlus className="mr-2 h-4 w-4" />
                              Add Members
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Target className="mr-2 h-4 w-4" />
                              View Goals
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              className="text-destructive"
                              onClick={() => {
                                setTeams((prev) => prev.filter((t) => t.id !== team.id))
                              }}
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </CardHeader>
                    <CardContent>
                      {team.description && (
                        <p className="mb-3 text-sm text-muted-foreground line-clamp-2">
                          {team.description}
                        </p>
                      )}
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Users className="h-4 w-4" />
                          {team.memberCount} members
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {team.type.replace("_", " ")}
                        </Badge>
                      </div>
                      {team.leadName && (
                        <div className="mt-3 flex items-center gap-2 border-t pt-3 text-sm">
                          <span className="text-muted-foreground">Lead:</span>
                          <span className="font-medium">{team.leadName}</span>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          )}
        </TabsContent>

        {/* Reporting Relationships Tab */}
        <TabsContent value="reporting" className="mt-6">
          {filteredRelationships.length === 0 ? (
            <Card className="p-12 text-center">
              <GitBranch className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-semibold">No relationships defined</h3>
              <p className="mt-2 text-muted-foreground">
                {searchQuery
                  ? "No relationships match your search"
                  : "Define reporting relationships between employees"}
              </p>
              {!searchQuery && (
                <Button
                  className="mt-4"
                  onClick={() => {
                    setEditingRel(undefined)
                    setRelDialogOpen(true)
                  }}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Relationship
                </Button>
              )}
            </Card>
          ) : (
            <Card>
              <ScrollArea className="h-[500px]">
                <div className="p-4">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b text-left text-sm text-muted-foreground">
                        <th className="pb-3 font-medium">Employee</th>
                        <th className="pb-3 font-medium">Reports To</th>
                        <th className="pb-3 font-medium">Type</th>
                        <th className="pb-3 font-medium">Primary</th>
                        <th className="pb-3 font-medium">Since</th>
                        <th className="pb-3"></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {filteredRelationships.map((rel) => (
                        <tr key={rel.id} className="text-sm">
                          <td className="py-3">
                            <div className="font-medium">{rel.reporterName}</div>
                          </td>
                          <td className="py-3">
                            <div className="flex items-center gap-2">
                              <ChevronRight className="h-4 w-4 text-muted-foreground" />
                              {rel.managerName}
                            </div>
                          </td>
                          <td className="py-3">
                            <Badge variant={getRelationshipTypeBadge(rel.relationshipType)}>
                              {rel.relationshipType}
                            </Badge>
                          </td>
                          <td className="py-3">
                            <Badge variant={rel.isPrimary ? "default" : "outline"}>
                              {rel.isPrimary ? "Yes" : "No"}
                            </Badge>
                          </td>
                          <td className="py-3 text-muted-foreground">
                            {new Date(rel.startDate).toLocaleDateString()}
                          </td>
                          <td className="py-3">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem
                                  onClick={() => {
                                    setEditingRel(rel)
                                    setRelDialogOpen(true)
                                  }}
                                >
                                  <Edit className="mr-2 h-4 w-4" />
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                  className="text-destructive"
                                  onClick={() => {
                                    setRelationships((prev) =>
                                      prev.filter((r) => r.id !== rel.id)
                                    )
                                  }}
                                >
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </ScrollArea>
            </Card>
          )}

          {/* Matrix Reporting Info */}
          {MOCK_ORGANIZATION.settings.hierarchy.allowMatrixReporting && (
            <Card className="mt-4 border-dashed">
              <CardContent className="flex items-start gap-4 p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Network className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium">Matrix Reporting Enabled</h4>
                  <p className="text-sm text-muted-foreground">
                    Employees can have multiple reporting relationships. Use &quot;dotted line&quot;
                    relationships for cross-functional collaboration.
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
