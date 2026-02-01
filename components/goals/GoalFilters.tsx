"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Search, SlidersHorizontal, LayoutGrid, List, Network } from "lucide-react"
import { cn } from "@/lib/utils"

export type ViewMode = "cards" | "list" | "alignment"
export type StatusFilter = "all" | "on_track" | "at_risk" | "completed" | "draft"
export type PriorityFilter = "all" | "critical" | "high" | "medium" | "low"

interface GoalFiltersProps {
  searchQuery: string
  onSearchChange: (query: string) => void
  statusFilter: StatusFilter
  onStatusChange: (status: StatusFilter) => void
  priorityFilter: PriorityFilter
  onPriorityChange: (priority: PriorityFilter) => void
  viewMode: ViewMode
  onViewModeChange: (mode: ViewMode) => void
  showAlignmentView?: boolean
  className?: string
}

export function GoalFilters({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusChange,
  priorityFilter,
  onPriorityChange,
  viewMode,
  onViewModeChange,
  showAlignmentView = true,
  className,
}: GoalFiltersProps) {
  return (
    <div className={cn("flex flex-col gap-3 md:flex-row md:items-center md:justify-between", className)}>
      {/* Search */}
      <div className="relative flex-1 md:max-w-xs">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search goals..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-9"
        />
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {/* Status Filter */}
        <Select value={statusFilter} onValueChange={(value) => onStatusChange(value as StatusFilter)}>
          <SelectTrigger className="w-[130px]">
            <SlidersHorizontal className="mr-2 h-4 w-4" />
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="on_track">On Track</SelectItem>
            <SelectItem value="at_risk">At Risk</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
          </SelectContent>
        </Select>

        {/* Priority Filter */}
        <Select value={priorityFilter} onValueChange={(value) => onPriorityChange(value as PriorityFilter)}>
          <SelectTrigger className="w-[130px]">
            <SelectValue placeholder="Priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Priority</SelectItem>
            <SelectItem value="critical">Critical</SelectItem>
            <SelectItem value="high">High</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="low">Low</SelectItem>
          </SelectContent>
        </Select>

        {/* View Mode Toggle */}
        <div className="flex items-center rounded-lg border bg-muted/50 p-1">
          <Button
            variant={viewMode === "cards" ? "secondary" : "ghost"}
            size="sm"
            className="h-7 w-7 p-0"
            onClick={() => onViewModeChange("cards")}
            aria-label="Card view"
          >
            <LayoutGrid className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === "list" ? "secondary" : "ghost"}
            size="sm"
            className="h-7 w-7 p-0"
            onClick={() => onViewModeChange("list")}
            aria-label="List view"
          >
            <List className="h-4 w-4" />
          </Button>
          {showAlignmentView && (
            <Button
              variant={viewMode === "alignment" ? "secondary" : "ghost"}
              size="sm"
              className="h-7 w-7 p-0"
              onClick={() => onViewModeChange("alignment")}
              aria-label="Alignment view"
            >
              <Network className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
