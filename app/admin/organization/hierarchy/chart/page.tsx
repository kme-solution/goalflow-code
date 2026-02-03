"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import {
  ArrowLeft,
  Building2,
  Users,
  Target,
  Mail,
  Phone,
  MapPin,
  Calendar,
  TrendingUp,
  ChevronRight,
  ExternalLink,
} from "lucide-react"
import OrgChart from "@/components/people/OrgChart"
import { MOCK_ORG_CHART, MOCK_DEPARTMENTS } from "@/lib/mock-data/organization"
import type { OrgNode } from "@/lib/types/organization.types"

export default function OrgChartPage() {
  const [selectedNode, setSelectedNode] = useState<OrgNode | null>(null)
  const [viewMode, setViewMode] = useState<"full" | "department">("full")
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null)

  const handleNodeClick = (node: OrgNode) => {
    setSelectedNode(node)
  }

  // Get department-specific org chart
  const getDepartmentChart = (deptId: string): OrgNode | null => {
    const findDeptHead = (node: OrgNode): OrgNode | null => {
      if (node.departmentId === deptId && node.level === 1) {
        return node
      }
      if (node.children) {
        for (const child of node.children) {
          const found = findDeptHead(child)
          if (found) return found
        }
      }
      return null
    }
    return findDeptHead(MOCK_ORG_CHART)
  }

  const currentChart =
    viewMode === "department" && selectedDepartment
      ? getDepartmentChart(selectedDepartment)
      : MOCK_ORG_CHART

  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col">
      {/* Header */}
      <div className="flex items-center justify-between border-b bg-background p-4">
        <div className="flex items-center gap-4">
          <Link href="/admin/organization/hierarchy">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Organization Chart</h1>
            <p className="text-sm text-muted-foreground">
              Visualize your organization&apos;s reporting structure
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as "full" | "department")}>
            <TabsList>
              <TabsTrigger value="full">Full Organization</TabsTrigger>
              <TabsTrigger value="department">By Department</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* Department selector (only visible in department view) */}
      {viewMode === "department" && (
        <div className="flex items-center gap-3 border-b bg-muted/30 px-4 py-3 overflow-x-auto">
          {MOCK_DEPARTMENTS.filter((d) => d.level === 1).map((dept) => (
            <Button
              key={dept.id}
              variant={selectedDepartment === dept.id ? "default" : "outline"}
              size="sm"
              className="flex-shrink-0 gap-2"
              onClick={() => setSelectedDepartment(dept.id)}
            >
              <div
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: dept.color || "#3b82f6" }}
              />
              {dept.name}
              <Badge variant="secondary" className="ml-1 text-xs">
                {dept.employeeCount}
              </Badge>
            </Button>
          ))}
        </div>
      )}

      {/* Chart Area */}
      <div className="flex-1 overflow-hidden">
        {currentChart ? (
          <OrgChart data={currentChart} onNodeClick={handleNodeClick} showGoals={true} />
        ) : (
          <div className="flex h-full items-center justify-center">
            <Card className="max-w-md p-8 text-center">
              <Building2 className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-semibold">Select a Department</h3>
              <p className="mt-2 text-muted-foreground">
                Choose a department from the options above to view its organization chart
              </p>
            </Card>
          </div>
        )}
      </div>

      {/* Employee Detail Sheet */}
      <Sheet open={!!selectedNode} onOpenChange={() => setSelectedNode(null)}>
        <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
          {selectedNode && (
            <>
              <SheetHeader>
                <div className="flex items-start gap-4">
                  <Avatar className="h-16 w-16 ring-2 ring-primary">
                    <AvatarImage src={selectedNode.avatar} alt={selectedNode.name} />
                    <AvatarFallback className="bg-primary/10 text-primary text-lg font-medium">
                      {selectedNode.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <SheetTitle className="text-xl">{selectedNode.name}</SheetTitle>
                    <SheetDescription className="text-base">
                      {selectedNode.title}
                    </SheetDescription>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <Badge>{selectedNode.department}</Badge>
                      {selectedNode.teamName && (
                        <Badge variant="outline">{selectedNode.teamName}</Badge>
                      )}
                    </div>
                  </div>
                </div>
              </SheetHeader>

              <div className="mt-6 space-y-6">
                {/* Contact Info */}
                <div className="space-y-3">
                  <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">
                    Contact Information
                  </h4>
                  <div className="space-y-2">
                    {selectedNode.email && (
                      <div className="flex items-center gap-3 text-sm">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <a
                          href={`mailto:${selectedNode.email}`}
                          className="text-primary hover:underline"
                        >
                          {selectedNode.email}
                        </a>
                      </div>
                    )}
                    <div className="flex items-center gap-3 text-sm">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>San Francisco, CA</span>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Organization Info */}
                <div className="space-y-3">
                  <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">
                    Organization
                  </h4>
                  <div className="grid gap-3">
                    <div className="flex items-center justify-between rounded-lg border p-3">
                      <div className="flex items-center gap-3">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">Direct Reports</span>
                      </div>
                      <span className="font-semibold">{selectedNode.directReports}</span>
                    </div>
                    <div className="flex items-center justify-between rounded-lg border p-3">
                      <div className="flex items-center gap-3">
                        <Building2 className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">Total in Org</span>
                      </div>
                      <span className="font-semibold">{selectedNode.totalReports}</span>
                    </div>
                    <div className="flex items-center justify-between rounded-lg border p-3">
                      <div className="flex items-center gap-3">
                        <TrendingUp className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">Level</span>
                      </div>
                      <Badge variant="secondary">
                        {selectedNode.level === 0
                          ? "Executive"
                          : selectedNode.level === 1
                            ? "Senior Leadership"
                            : selectedNode.level === 2
                              ? "Management"
                              : "Individual Contributor"}
                      </Badge>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Goals */}
                {selectedNode.goals && selectedNode.goals.total > 0 && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">
                        Goals
                      </h4>
                      <Link href={`/people/${selectedNode.id}/goals`}>
                        <Button variant="ghost" size="sm" className="gap-1 text-xs">
                          View All
                          <ExternalLink className="h-3 w-3" />
                        </Button>
                      </Link>
                    </div>
                    <Card>
                      <CardContent className="p-4 space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Target className="h-4 w-4 text-primary" />
                            <span className="font-medium">Goal Progress</span>
                          </div>
                          <span className="text-sm text-muted-foreground">
                            {selectedNode.goals.completed}/{selectedNode.goals.total} completed
                          </span>
                        </div>
                        <Progress
                          value={(selectedNode.goals.completed / selectedNode.goals.total) * 100}
                          className="h-2"
                        />
                        <div className="grid grid-cols-3 gap-4 text-center">
                          <div>
                            <p className="text-2xl font-semibold">{selectedNode.goals.total}</p>
                            <p className="text-xs text-muted-foreground">Total</p>
                          </div>
                          <div>
                            <p className="text-2xl font-semibold text-success">
                              {selectedNode.goals.completed}
                            </p>
                            <p className="text-xs text-muted-foreground">Completed</p>
                          </div>
                          <div>
                            <p className="text-2xl font-semibold text-warning">
                              {selectedNode.goals.atRisk}
                            </p>
                            <p className="text-xs text-muted-foreground">At Risk</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}

                <Separator />

                {/* Quick Actions */}
                <div className="space-y-3">
                  <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">
                    Quick Actions
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    <Button variant="outline" className="justify-start gap-2">
                      <Mail className="h-4 w-4" />
                      Send Email
                    </Button>
                    <Button variant="outline" className="justify-start gap-2">
                      <Calendar className="h-4 w-4" />
                      Schedule Meeting
                    </Button>
                    <Link href={`/people/${selectedNode.id}/goals`} className="col-span-2">
                      <Button variant="outline" className="w-full justify-start gap-2">
                        <Target className="h-4 w-4" />
                        View Goals
                        <ChevronRight className="ml-auto h-4 w-4" />
                      </Button>
                    </Link>
                    <Link href={`/people/${selectedNode.id}/performance`} className="col-span-2">
                      <Button variant="outline" className="w-full justify-start gap-2">
                        <TrendingUp className="h-4 w-4" />
                        View Performance
                        <ChevronRight className="ml-auto h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>

                {/* Direct Reports List */}
                {selectedNode.children && selectedNode.children.length > 0 && (
                  <>
                    <Separator />
                    <div className="space-y-3">
                      <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">
                        Direct Reports ({selectedNode.children.length})
                      </h4>
                      <div className="space-y-2">
                        {selectedNode.children.map((report) => (
                          <div
                            key={report.id}
                            className="flex items-center gap-3 rounded-lg border p-3 cursor-pointer hover:bg-muted/50 transition-colors"
                            onClick={() => setSelectedNode(report)}
                          >
                            <Avatar className="h-10 w-10">
                              <AvatarImage src={report.avatar} alt={report.name} />
                              <AvatarFallback className="text-sm">
                                {report.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                              <p className="font-medium truncate">{report.name}</p>
                              <p className="text-sm text-muted-foreground truncate">
                                {report.title}
                              </p>
                            </div>
                            <ChevronRight className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  )
}
