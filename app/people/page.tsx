"use client"

import { useState } from "react"
import Link from "next/link"
import { Layout } from "@/components/layout"
import { ProtectedRoute } from "@/components/protected-route"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Search,
  UserPlus,
  MoreHorizontal,
  Mail,
  Target,
  TrendingUp,
  Filter,
  Grid3X3,
  List,
  Building2,
  MapPin,
} from "lucide-react"
import { MOCK_EMPLOYEES } from "@/lib/mock-data/employees"
import { MOCK_DEPARTMENTS } from "@/lib/mock-data/organization"
import { cn } from "@/lib/utils"

export default function PeopleDirectoryPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [departmentFilter, setDepartmentFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  const filteredEmployees = MOCK_EMPLOYEES.filter((employee) => {
    const matchesSearch =
      employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.title.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesDepartment =
      departmentFilter === "all" || employee.departmentId === departmentFilter

    const matchesStatus =
      statusFilter === "all" || employee.status === statusFilter

    return matchesSearch && matchesDepartment && matchesStatus
  })

  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)

  return (
    <ProtectedRoute allowedRoles={["hr_admin", "manager", "ceo", "team_lead"]}>
      <Layout>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">People Directory</h1>
              <p className="text-muted-foreground mt-1">
                {filteredEmployees.length} employees in your organization
              </p>
            </div>
            <Link href="/people/invites">
              <Button className="gap-2">
                <UserPlus className="h-4 w-4" />
                Invite People
              </Button>
            </Link>
          </div>

          {/* Filters */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col gap-4 md:flex-row md:items-center">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search by name, email, or title..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                    <SelectTrigger className="w-40">
                      <Filter className="mr-2 h-4 w-4" />
                      <SelectValue placeholder="Department" />
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
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="on_leave">On Leave</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="flex items-center rounded-md border">
                    <Button
                      variant={viewMode === "grid" ? "secondary" : "ghost"}
                      size="icon"
                      className="h-9 w-9 rounded-r-none"
                      onClick={() => setViewMode("grid")}
                    >
                      <Grid3X3 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant={viewMode === "list" ? "secondary" : "ghost"}
                      size="icon"
                      className="h-9 w-9 rounded-l-none"
                      onClick={() => setViewMode("list")}
                    >
                      <List className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Employee Grid/List */}
          {viewMode === "grid" ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredEmployees.map((employee) => (
                <Card
                  key={employee.id}
                  className="group transition-all hover:shadow-md"
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <Link href={`/people/${employee.id}/goals`} className="flex items-center gap-3">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={employee.avatar} alt={employee.name} />
                          <AvatarFallback className="bg-primary/10 text-primary font-medium">
                            {getInitials(employee.name)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="min-w-0">
                          <h3 className="font-semibold truncate group-hover:text-primary transition-colors">
                            {employee.name}
                          </h3>
                          <p className="text-sm text-muted-foreground truncate">
                            {employee.title}
                          </p>
                        </div>
                      </Link>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Mail className="mr-2 h-4 w-4" />
                            Send Email
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href={`/people/${employee.id}/goals`}>
                              <Target className="mr-2 h-4 w-4" />
                              View Goals
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href={`/people/${employee.id}/performance`}>
                              <TrendingUp className="mr-2 h-4 w-4" />
                              View Performance
                            </Link>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>

                    <div className="mt-4 space-y-2">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Building2 className="h-3.5 w-3.5" />
                        <span className="truncate">{employee.department}</span>
                      </div>
                      {employee.location && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <MapPin className="h-3.5 w-3.5" />
                          <span className="truncate">{employee.location}</span>
                        </div>
                      )}
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                      <Badge
                        variant={employee.status === "active" ? "default" : "secondary"}
                        className="text-xs"
                      >
                        {employee.status === "active" ? "Active" : employee.status}
                      </Badge>
                      {employee.goalCompletionRate !== undefined && (
                        <div className="flex items-center gap-1.5 text-xs">
                          <div className="h-1.5 w-12 rounded-full bg-muted overflow-hidden">
                            <div
                              className={cn(
                                "h-full rounded-full",
                                employee.goalCompletionRate >= 80
                                  ? "bg-success"
                                  : employee.goalCompletionRate >= 50
                                    ? "bg-warning"
                                    : "bg-destructive"
                              )}
                              style={{ width: `${employee.goalCompletionRate}%` }}
                            />
                          </div>
                          <span className="text-muted-foreground">
                            {employee.goalCompletionRate}%
                          </span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <div className="divide-y">
                {filteredEmployees.map((employee) => (
                  <div
                    key={employee.id}
                    className="flex items-center gap-4 p-4 hover:bg-muted/50 transition-colors"
                  >
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={employee.avatar} alt={employee.name} />
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {getInitials(employee.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 flex-1">
                      <Link
                        href={`/people/${employee.id}/goals`}
                        className="font-medium hover:text-primary transition-colors"
                      >
                        {employee.name}
                      </Link>
                      <p className="text-sm text-muted-foreground">{employee.title}</p>
                    </div>
                    <div className="hidden md:block text-sm text-muted-foreground">
                      {employee.department}
                    </div>
                    <div className="hidden lg:block text-sm text-muted-foreground">
                      {employee.location}
                    </div>
                    <Badge
                      variant={employee.status === "active" ? "default" : "secondary"}
                      className="text-xs"
                    >
                      {employee.status}
                    </Badge>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Mail className="mr-2 h-4 w-4" />
                          Send Email
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={`/people/${employee.id}/goals`}>
                            <Target className="mr-2 h-4 w-4" />
                            View Goals
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={`/people/${employee.id}/performance`}>
                            <TrendingUp className="mr-2 h-4 w-4" />
                            View Performance
                          </Link>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {filteredEmployees.length === 0 && (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Search className="h-12 w-12 text-muted-foreground/50" />
                <h3 className="mt-4 font-semibold">No employees found</h3>
                <p className="text-sm text-muted-foreground">
                  Try adjusting your search or filters
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </Layout>
    </ProtectedRoute>
  )
}
