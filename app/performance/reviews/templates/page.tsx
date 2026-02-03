"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  AlertCircle,
  Check,
  ChevronRight,
  Clock,
  Copy,
  Edit,
  Eye,
  FileText,
  GripVertical,
  Layers,
  MoreHorizontal,
  Plus,
  Search,
  Star,
  Target,
  Trash2,
  Users,
  Zap,
} from "lucide-react"

// Mock data
const templates = [
  {
    id: "t1",
    name: "Standard Performance Review",
    description: "Comprehensive review template for quarterly and annual reviews",
    type: "Performance",
    status: "active",
    isDefault: true,
    usageCount: 245,
    lastUsed: "2025-02-01",
    createdAt: "2024-06-15",
    sections: [
      {
        id: "s1",
        name: "Goals & Achievements",
        questions: 4,
        type: "rating",
      },
      {
        id: "s2",
        name: "Core Competencies",
        questions: 6,
        type: "rating",
      },
      {
        id: "s3",
        name: "Development Areas",
        questions: 3,
        type: "text",
      },
      {
        id: "s4",
        name: "Overall Assessment",
        questions: 2,
        type: "rating",
      },
    ],
  },
  {
    id: "t2",
    name: "Annual Comprehensive Review",
    description: "In-depth annual review with career development focus",
    type: "Performance",
    status: "active",
    isDefault: false,
    usageCount: 128,
    lastUsed: "2025-01-15",
    createdAt: "2024-01-10",
    sections: [
      {
        id: "s1",
        name: "Year in Review",
        questions: 5,
        type: "text",
      },
      {
        id: "s2",
        name: "Performance Metrics",
        questions: 8,
        type: "rating",
      },
      {
        id: "s3",
        name: "Leadership & Impact",
        questions: 4,
        type: "rating",
      },
      {
        id: "s4",
        name: "Career Development",
        questions: 5,
        type: "text",
      },
      {
        id: "s5",
        name: "Manager Feedback",
        questions: 3,
        type: "text",
      },
    ],
  },
  {
    id: "t3",
    name: "Probation Assessment",
    description: "New hire evaluation for probation period completion",
    type: "Probation",
    status: "active",
    isDefault: false,
    usageCount: 45,
    lastUsed: "2025-01-28",
    createdAt: "2024-03-20",
    sections: [
      {
        id: "s1",
        name: "Role Fit Assessment",
        questions: 4,
        type: "rating",
      },
      {
        id: "s2",
        name: "Skills Evaluation",
        questions: 5,
        type: "rating",
      },
      {
        id: "s3",
        name: "Team Integration",
        questions: 3,
        type: "rating",
      },
      {
        id: "s4",
        name: "Recommendation",
        questions: 2,
        type: "text",
      },
    ],
  },
  {
    id: "t4",
    name: "360 Feedback Template",
    description: "Multi-rater feedback template for peer and stakeholder input",
    type: "360 Feedback",
    status: "active",
    isDefault: false,
    usageCount: 89,
    lastUsed: "2025-02-02",
    createdAt: "2024-08-05",
    sections: [
      {
        id: "s1",
        name: "Collaboration",
        questions: 4,
        type: "rating",
      },
      {
        id: "s2",
        name: "Communication",
        questions: 3,
        type: "rating",
      },
      {
        id: "s3",
        name: "Technical Expertise",
        questions: 3,
        type: "rating",
      },
      {
        id: "s4",
        name: "Open Feedback",
        questions: 2,
        type: "text",
      },
    ],
  },
  {
    id: "t5",
    name: "Project Review",
    description: "End-of-project performance assessment template",
    type: "Project",
    status: "draft",
    isDefault: false,
    usageCount: 0,
    lastUsed: null,
    createdAt: "2025-01-20",
    sections: [
      {
        id: "s1",
        name: "Project Delivery",
        questions: 4,
        type: "rating",
      },
      {
        id: "s2",
        name: "Team Contribution",
        questions: 3,
        type: "rating",
      },
      {
        id: "s3",
        name: "Lessons Learned",
        questions: 2,
        type: "text",
      },
    ],
  },
]

const questionTypes = {
  rating: { icon: Star, color: "bg-amber-500/10 text-amber-600" },
  text: { icon: FileText, color: "bg-blue-500/10 text-blue-600" },
  scale: { icon: Target, color: "bg-emerald-500/10 text-emerald-600" },
}

const statusConfig: Record<string, { label: string; variant: "default" | "secondary" | "outline" }> = {
  active: { label: "Active", variant: "default" },
  draft: { label: "Draft", variant: "secondary" },
  archived: { label: "Archived", variant: "outline" },
}

const typeConfig: Record<string, { color: string }> = {
  Performance: { color: "bg-primary/10 text-primary" },
  Probation: { color: "bg-amber-500/10 text-amber-600" },
  "360 Feedback": { color: "bg-purple-500/10 text-purple-600" },
  Project: { color: "bg-blue-500/10 text-blue-600" },
}

function formatDate(dateString: string | null) {
  if (!dateString) return "Never"
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}

export default function ReviewTemplatesPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [expandedTemplate, setExpandedTemplate] = useState<string | null>(null)

  const filteredTemplates = templates.filter((template) => {
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesTab = activeTab === "all" || template.status === activeTab
    return matchesSearch && matchesTab
  })

  const activeTemplates = templates.filter((t) => t.status === "active").length
  const totalUsage = templates.reduce((acc, t) => acc + t.usageCount, 0)

  return (
    <div className="space-y-6 p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Review Templates</h1>
          <p className="text-sm text-muted-foreground">Manage review question templates and forms</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Layers className="mr-2 h-4 w-4" />
            Import
          </Button>
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Create Template
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <FileText className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{templates.length}</p>
                <p className="text-xs text-muted-foreground">Total Templates</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10">
                <Check className="h-5 w-5 text-emerald-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{activeTemplates}</p>
                <p className="text-xs text-muted-foreground">Active</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10">
                <Zap className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{totalUsage}</p>
                <p className="text-xs text-muted-foreground">Total Uses</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10">
                <Star className="h-5 w-5 text-amber-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">1</p>
                <p className="text-xs text-muted-foreground">Default Template</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="all">All Templates</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="draft">Drafts</TabsTrigger>
          </TabsList>
        </Tabs>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search templates..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-[250px] pl-9"
          />
        </div>
      </div>

      {/* Templates List */}
      <div className="space-y-4">
        {filteredTemplates.map((template) => {
          const status = statusConfig[template.status] || statusConfig.active
          const typeStyle = typeConfig[template.type] || typeConfig.Performance

          return (
            <Card key={template.id} className="transition-all hover:shadow-md">
              <Accordion
                type="single"
                collapsible
                value={expandedTemplate === template.id ? template.id : undefined}
                onValueChange={(value) => setExpandedTemplate(value || null)}
              >
                <AccordionItem value={template.id} className="border-0">
                  <AccordionTrigger className="px-4 py-4 hover:no-underline [&[data-state=open]>div]:pb-0">
                    <div className="flex flex-1 flex-col gap-4 text-left lg:flex-row lg:items-center lg:justify-between">
                      <div className="flex items-start gap-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                          <FileText className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="font-semibold text-foreground">{template.name}</h3>
                            <Badge variant={status.variant}>{status.label}</Badge>
                            <Badge className={typeStyle.color}>{template.type}</Badge>
                            {template.isDefault && (
                              <Badge variant="outline" className="border-primary/50 text-primary">
                                <Star className="mr-1 h-3 w-3" />
                                Default
                              </Badge>
                            )}
                          </div>
                          <p className="mt-1 text-sm text-muted-foreground">{template.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-6 pr-4">
                        <div className="text-center">
                          <p className="text-lg font-bold text-foreground">{template.sections.length}</p>
                          <p className="text-[10px] text-muted-foreground">Sections</p>
                        </div>
                        <div className="text-center">
                          <p className="text-lg font-bold text-foreground">
                            {template.sections.reduce((acc, s) => acc + s.questions, 0)}
                          </p>
                          <p className="text-[10px] text-muted-foreground">Questions</p>
                        </div>
                        <div className="text-center">
                          <p className="text-lg font-bold text-foreground">{template.usageCount}</p>
                          <p className="text-[10px] text-muted-foreground">Uses</p>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4" />
                              Preview
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit Template
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Copy className="mr-2 h-4 w-4" />
                              Duplicate
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            {!template.isDefault && (
                              <DropdownMenuItem>
                                <Star className="mr-2 h-4 w-4" />
                                Set as Default
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuItem className="text-destructive">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="border-t bg-muted/30 px-4 pb-4 pt-4">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-semibold text-foreground">Template Sections</h4>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span>Created: {formatDate(template.createdAt)}</span>
                          <span>Last used: {formatDate(template.lastUsed)}</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        {template.sections.map((section, idx) => {
                          const questionType = questionTypes[section.type as keyof typeof questionTypes] || questionTypes.text
                          const QuestionIcon = questionType.icon

                          return (
                            <div
                              key={section.id}
                              className="flex items-center justify-between rounded-lg border bg-card p-3"
                            >
                              <div className="flex items-center gap-3">
                                <div className="flex h-6 w-6 items-center justify-center text-muted-foreground">
                                  <GripVertical className="h-4 w-4" />
                                </div>
                                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-muted text-xs font-medium text-muted-foreground">
                                  {idx + 1}
                                </span>
                                <div>
                                  <p className="font-medium text-foreground">{section.name}</p>
                                  <p className="text-xs text-muted-foreground">
                                    {section.questions} questions
                                  </p>
                                </div>
                              </div>
                              <Badge className={questionType.color}>
                                <QuestionIcon className="mr-1 h-3 w-3" />
                                {section.type}
                              </Badge>
                            </div>
                          )
                        })}
                      </div>
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="mr-2 h-4 w-4" />
                          Preview
                        </Button>
                        <Button size="sm">
                          <Edit className="mr-2 h-4 w-4" />
                          Edit Template
                        </Button>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </Card>
          )
        })}

        {filteredTemplates.length === 0 && (
          <Card>
            <CardContent className="flex flex-col items-center justify-center p-12">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                <FileText className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="mt-4 font-semibold text-foreground">No templates found</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {searchQuery
                  ? "Try adjusting your search query."
                  : "Create your first template to get started."}
              </p>
              <Button className="mt-4" size="sm">
                <Plus className="mr-2 h-4 w-4" />
                Create Template
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
