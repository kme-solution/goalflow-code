"use client"

import { useState, useCallback } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  ChevronDown,
  ChevronRight,
  Users,
  Target,
  Mail,
  MoreHorizontal,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Minimize2,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import type { OrgNode } from "@/lib/types/organization.types"
import { cn } from "@/lib/utils"

interface OrgChartProps {
  data: OrgNode
  onNodeClick?: (node: OrgNode) => void
  showGoals?: boolean
  collapsedNodes?: Set<string>
  onToggleCollapse?: (nodeId: string) => void
}

interface OrgNodeCardProps {
  node: OrgNode
  isRoot?: boolean
  isCollapsed?: boolean
  onToggle?: () => void
  onClick?: () => void
  showGoals?: boolean
}

// Individual node card
function OrgNodeCard({
  node,
  isRoot = false,
  isCollapsed = false,
  onToggle,
  onClick,
  showGoals = true,
}: OrgNodeCardProps) {
  const hasChildren = node.children && node.children.length > 0
  const initials = node.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)

  const goalProgress = node.goals
    ? Math.round((node.goals.completed / node.goals.total) * 100)
    : 0

  return (
    <Card
      className={cn(
        "relative w-64 cursor-pointer transition-all hover:shadow-lg",
        isRoot && "border-primary shadow-md"
      )}
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <Avatar className={cn("h-12 w-12", isRoot && "h-14 w-14 ring-2 ring-primary")}>
            <AvatarImage src={node.avatar} alt={node.name} />
            <AvatarFallback className="bg-primary/10 text-primary font-medium">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <h3 className={cn("font-semibold truncate", isRoot ? "text-base" : "text-sm")}>
              {node.name}
            </h3>
            <p className="text-xs text-muted-foreground truncate">{node.title}</p>
            <div className="mt-1 flex items-center gap-1.5">
              <Badge variant="secondary" className="text-xs px-1.5 py-0">
                {node.department}
              </Badge>
              {node.teamName && (
                <Badge variant="outline" className="text-xs px-1.5 py-0">
                  {node.teamName}
                </Badge>
              )}
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
              <Button variant="ghost" size="icon" className="h-6 w-6">
                <MoreHorizontal className="h-3.5 w-3.5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Mail className="mr-2 h-4 w-4" />
                Send Email
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Users className="mr-2 h-4 w-4" />
                View Profile
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Target className="mr-2 h-4 w-4" />
                View Goals
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Stats row */}
        <div className="mt-3 flex items-center justify-between text-xs">
          <div className="flex items-center gap-3">
            {node.directReports > 0 && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Users className="h-3.5 w-3.5" />
                      <span>{node.directReports}</span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{node.directReports} direct reports</p>
                    {node.totalReports > node.directReports && (
                      <p className="text-xs text-muted-foreground">
                        {node.totalReports} total in org
                      </p>
                    )}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
            {showGoals && node.goals && node.goals.total > 0 && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex items-center gap-1">
                      <Target className="h-3.5 w-3.5 text-muted-foreground" />
                      <span
                        className={cn(
                          node.goals.atRisk > 0 ? "text-warning" : "text-muted-foreground"
                        )}
                      >
                        {node.goals.completed}/{node.goals.total}
                      </span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>
                      {node.goals.completed} of {node.goals.total} goals completed
                    </p>
                    {node.goals.atRisk > 0 && (
                      <p className="text-xs text-warning">{node.goals.atRisk} at risk</p>
                    )}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>

          {showGoals && node.goals && node.goals.total > 0 && (
            <div className="flex items-center gap-1.5">
              <div className="h-1.5 w-16 rounded-full bg-muted overflow-hidden">
                <div
                  className={cn(
                    "h-full rounded-full transition-all",
                    goalProgress >= 80
                      ? "bg-success"
                      : goalProgress >= 50
                        ? "bg-warning"
                        : "bg-destructive"
                  )}
                  style={{ width: `${goalProgress}%` }}
                />
              </div>
              <span className="text-muted-foreground">{goalProgress}%</span>
            </div>
          )}
        </div>

        {/* Expand/Collapse button */}
        {hasChildren && (
          <button
            className={cn(
              "absolute -bottom-3 left-1/2 -translate-x-1/2 flex h-6 w-6 items-center justify-center",
              "rounded-full border bg-background shadow-sm transition-all hover:bg-muted",
              "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            )}
            onClick={(e) => {
              e.stopPropagation()
              onToggle?.()
            }}
          >
            {isCollapsed ? (
              <ChevronRight className="h-3.5 w-3.5" />
            ) : (
              <ChevronDown className="h-3.5 w-3.5" />
            )}
          </button>
        )}
      </CardContent>
    </Card>
  )
}

// Recursive tree node component
function TreeNode({
  node,
  depth = 0,
  collapsedNodes,
  onToggleCollapse,
  onNodeClick,
  showGoals,
}: {
  node: OrgNode
  depth?: number
  collapsedNodes: Set<string>
  onToggleCollapse: (nodeId: string) => void
  onNodeClick?: (node: OrgNode) => void
  showGoals?: boolean
}) {
  const isCollapsed = collapsedNodes.has(node.id)
  const hasChildren = node.children && node.children.length > 0

  return (
    <div className="flex flex-col items-center">
      <OrgNodeCard
        node={node}
        isRoot={depth === 0}
        isCollapsed={isCollapsed}
        onToggle={() => onToggleCollapse(node.id)}
        onClick={() => onNodeClick?.(node)}
        showGoals={showGoals}
      />

      {hasChildren && !isCollapsed && (
        <>
          {/* Vertical connector line */}
          <div className="h-6 w-px bg-border" />

          {/* Horizontal connector and children */}
          <div className="relative flex items-start">
            {/* Horizontal line above children */}
            {node.children!.length > 1 && (
              <div
                className="absolute top-0 h-px bg-border"
                style={{
                  left: "calc(50% - (50% - 8rem))",
                  right: "calc(50% - (50% - 8rem))",
                }}
              />
            )}

            {/* Children container */}
            <div className="flex gap-8">
              {node.children!.map((child, index) => (
                <div key={child.id} className="relative flex flex-col items-center">
                  {/* Vertical line from horizontal connector to child */}
                  <div className="h-6 w-px bg-border" />
                  <TreeNode
                    node={child}
                    depth={depth + 1}
                    collapsedNodes={collapsedNodes}
                    onToggleCollapse={onToggleCollapse}
                    onNodeClick={onNodeClick}
                    showGoals={showGoals}
                  />
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default function OrgChart({
  data,
  onNodeClick,
  showGoals = true,
  collapsedNodes: externalCollapsed,
  onToggleCollapse: externalToggle,
}: OrgChartProps) {
  const [internalCollapsed, setInternalCollapsed] = useState<Set<string>>(new Set())
  const [zoom, setZoom] = useState(1)
  const [isFullscreen, setIsFullscreen] = useState(false)

  const collapsedNodes = externalCollapsed ?? internalCollapsed
  const handleToggle = useCallback(
    (nodeId: string) => {
      if (externalToggle) {
        externalToggle(nodeId)
      } else {
        setInternalCollapsed((prev) => {
          const next = new Set(prev)
          if (next.has(nodeId)) {
            next.delete(nodeId)
          } else {
            next.add(nodeId)
          }
          return next
        })
      }
    },
    [externalToggle]
  )

  const handleZoomIn = () => setZoom((z) => Math.min(z + 0.1, 1.5))
  const handleZoomOut = () => setZoom((z) => Math.max(z - 0.1, 0.5))
  const handleResetZoom = () => setZoom(1)

  const expandAll = () => setInternalCollapsed(new Set())
  const collapseAll = () => {
    const allNodeIds = new Set<string>()
    const traverse = (node: OrgNode) => {
      if (node.children && node.children.length > 0) {
        allNodeIds.add(node.id)
        node.children.forEach(traverse)
      }
    }
    traverse(data)
    setInternalCollapsed(allNodeIds)
  }

  return (
    <div
      className={cn(
        "relative flex flex-col",
        isFullscreen && "fixed inset-0 z-50 bg-background"
      )}
    >
      {/* Controls */}
      <div className="sticky top-0 z-10 flex items-center justify-between border-b bg-background/95 backdrop-blur p-3">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleZoomOut} disabled={zoom <= 0.5}>
            <ZoomOut className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={handleResetZoom}>
            {Math.round(zoom * 100)}%
          </Button>
          <Button variant="outline" size="sm" onClick={handleZoomIn} disabled={zoom >= 1.5}>
            <ZoomIn className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={expandAll}>
            Expand All
          </Button>
          <Button variant="outline" size="sm" onClick={collapseAll}>
            Collapse All
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={() => setIsFullscreen(!isFullscreen)}
          >
            {isFullscreen ? (
              <Minimize2 className="h-4 w-4" />
            ) : (
              <Maximize2 className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      {/* Chart container */}
      <div className="flex-1 overflow-auto p-8">
        <div
          className="inline-flex min-w-full justify-center transition-transform"
          style={{ transform: `scale(${zoom})`, transformOrigin: "top center" }}
        >
          <TreeNode
            node={data}
            collapsedNodes={collapsedNodes}
            onToggleCollapse={handleToggle}
            onNodeClick={onNodeClick}
            showGoals={showGoals}
          />
        </div>
      </div>
    </div>
  )
}
