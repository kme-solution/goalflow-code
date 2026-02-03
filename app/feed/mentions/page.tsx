"use client"

import { useState } from "react"
import { useAuth } from "@/lib/auth"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Heart,
  MessageCircle,
  Share2,
  MoreHorizontal,
  AtSign,
  Award,
  Target,
  CheckCircle,
  Clock,
  Bell,
  Eye,
  EyeOff,
  Trash2,
  ChevronRight,
  Sparkles,
  MessageSquare,
  Reply,
} from "lucide-react"

// Types for mentions
type MentionType = "recognition" | "comment" | "goal" | "post" | "reply"
type MentionStatus = "unread" | "read"

interface Mention {
  id: string
  type: MentionType
  status: MentionStatus
  from: {
    name: string
    avatar: string
    initials: string
    role: string
  }
  content: string
  context: string
  highlight: string
  timestamp: string
  link: string
  reactions?: { likes: number; comments: number }
}

// Mock mentions data
const mockMentions: Mention[] = [
  {
    id: "1",
    type: "recognition",
    status: "unread",
    from: {
      name: "Sarah Chen",
      avatar: "/avatars/sarah.jpg",
      initials: "SC",
      role: "Product Manager",
    },
    content: "Huge thanks to @you for the amazing work on the dashboard redesign! Your attention to detail really shows.",
    context: "Recognition for Dashboard Redesign",
    highlight: "@you",
    timestamp: "10 minutes ago",
    link: "/recognition/received",
    reactions: { likes: 12, comments: 4 },
  },
  {
    id: "2",
    type: "comment",
    status: "unread",
    from: {
      name: "Alex Rodriguez",
      avatar: "/avatars/alex.jpg",
      initials: "AR",
      role: "Senior Engineer",
    },
    content: "@you Great point about the API structure! I think we should discuss this further in our next sync.",
    context: "Comment on 'API Optimization Discussion'",
    highlight: "@you",
    timestamp: "1 hour ago",
    link: "/feed",
    reactions: { likes: 3, comments: 1 },
  },
  {
    id: "3",
    type: "goal",
    status: "unread",
    from: {
      name: "Jennifer Martinez",
      avatar: "/avatars/jennifer.jpg",
      initials: "JM",
      role: "VP of Engineering",
    },
    content: "Added @you as a contributor to the Q1 Infrastructure goal. Looking forward to your input on this initiative!",
    context: "Goal: Q1 Infrastructure Improvements",
    highlight: "@you",
    timestamp: "3 hours ago",
    link: "/goals/my",
  },
  {
    id: "4",
    type: "post",
    status: "read",
    from: {
      name: "Michael Park",
      avatar: "/avatars/michael.jpg",
      initials: "MP",
      role: "Backend Developer",
    },
    content: "Celebrating our team's success! Shoutout to @you, @David, and @Emily for making the launch possible.",
    context: "Team Celebration Post",
    highlight: "@you",
    timestamp: "Yesterday",
    link: "/feed",
    reactions: { likes: 45, comments: 18 },
  },
  {
    id: "5",
    type: "reply",
    status: "read",
    from: {
      name: "Emily Watson",
      avatar: "/avatars/emily.jpg",
      initials: "EW",
      role: "UX Designer",
    },
    content: "@you I love your suggestion about the onboarding flow. Let's schedule a quick call to discuss implementation.",
    context: "Reply to your comment",
    highlight: "@you",
    timestamp: "Yesterday",
    link: "/feed",
    reactions: { likes: 2, comments: 0 },
  },
  {
    id: "6",
    type: "recognition",
    status: "read",
    from: {
      name: "David Kim",
      avatar: "/avatars/david.jpg",
      initials: "DK",
      role: "QA Engineer",
    },
    content: "Thank you @you for helping debug that tricky issue! Your persistence saved us hours of work.",
    context: "Recognition for Debugging Help",
    highlight: "@you",
    timestamp: "2 days ago",
    link: "/recognition/received",
    reactions: { likes: 8, comments: 2 },
  },
  {
    id: "7",
    type: "comment",
    status: "read",
    from: {
      name: "Lisa Thompson",
      avatar: "/avatars/lisa.jpg",
      initials: "LT",
      role: "Product Designer",
    },
    content: "@you Could you review my latest mockups when you have a chance? Would love your feedback on the navigation changes.",
    context: "Comment on 'Design Review Request'",
    highlight: "@you",
    timestamp: "3 days ago",
    link: "/feed",
    reactions: { likes: 1, comments: 3 },
  },
]

const mentionTypeConfig = {
  recognition: {
    icon: Award,
    color: "text-amber-500",
    bg: "bg-amber-500/10",
    label: "Recognition",
  },
  comment: {
    icon: MessageCircle,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
    label: "Comment",
  },
  goal: {
    icon: Target,
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
    label: "Goal",
  },
  post: {
    icon: MessageSquare,
    color: "text-purple-500",
    bg: "bg-purple-500/10",
    label: "Post",
  },
  reply: {
    icon: Reply,
    color: "text-teal-500",
    bg: "bg-teal-500/10",
    label: "Reply",
  },
}

export default function MentionsPage() {
  const { user } = useAuth()
  const [mentions, setMentions] = useState(mockMentions)
  const [activeTab, setActiveTab] = useState("all")

  const unreadCount = mentions.filter(m => m.status === "unread").length

  const markAsRead = (mentionId: string) => {
    setMentions(prev =>
      prev.map(mention =>
        mention.id === mentionId ? { ...mention, status: "read" as MentionStatus } : mention
      )
    )
  }

  const markAllAsRead = () => {
    setMentions(prev =>
      prev.map(mention => ({ ...mention, status: "read" as MentionStatus }))
    )
  }

  const deleteMention = (mentionId: string) => {
    setMentions(prev => prev.filter(mention => mention.id !== mentionId))
  }

  const filteredMentions = mentions.filter(mention => {
    if (activeTab === "all") return true
    if (activeTab === "unread") return mention.status === "unread"
    return mention.type === activeTab
  })

  // Highlight the @mention in content
  const highlightMention = (content: string, highlight: string) => {
    const parts = content.split(highlight)
    return (
      <>
        {parts.map((part, i) => (
          <span key={i}>
            {part}
            {i < parts.length - 1 && (
              <span className="font-semibold text-primary bg-primary/10 px-1 rounded">
                {highlight}
              </span>
            )}
          </span>
        ))}
      </>
    )
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-3xl mx-auto p-4 md:p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-foreground">Mentions</h1>
              {unreadCount > 0 && (
                <Badge className="bg-primary text-primary-foreground">
                  {unreadCount} new
                </Badge>
              )}
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              See where you've been mentioned across GoalFlow
            </p>
          </div>
          {unreadCount > 0 && (
            <Button variant="outline" size="sm" onClick={markAllAsRead}>
              <CheckCircle className="h-4 w-4 mr-2" />
              Mark All Read
            </Button>
          )}
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Card className="p-3">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <AtSign className="h-4 w-4 text-primary" />
              </div>
              <div>
                <div className="text-lg font-bold">{mentions.length}</div>
                <div className="text-[10px] text-muted-foreground">Total Mentions</div>
              </div>
            </div>
          </Card>
          <Card className="p-3">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-amber-500/10 flex items-center justify-center">
                <Award className="h-4 w-4 text-amber-500" />
              </div>
              <div>
                <div className="text-lg font-bold">
                  {mentions.filter(m => m.type === "recognition").length}
                </div>
                <div className="text-[10px] text-muted-foreground">Recognitions</div>
              </div>
            </div>
          </Card>
          <Card className="p-3">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                <MessageCircle className="h-4 w-4 text-blue-500" />
              </div>
              <div>
                <div className="text-lg font-bold">
                  {mentions.filter(m => m.type === "comment" || m.type === "reply").length}
                </div>
                <div className="text-[10px] text-muted-foreground">Comments</div>
              </div>
            </div>
          </Card>
          <Card className="p-3">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                <Target className="h-4 w-4 text-emerald-500" />
              </div>
              <div>
                <div className="text-lg font-bold">
                  {mentions.filter(m => m.type === "goal").length}
                </div>
                <div className="text-[10px] text-muted-foreground">Goal Mentions</div>
              </div>
            </div>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4 lg:grid-cols-6">
            <TabsTrigger value="all" className="text-xs">
              All
            </TabsTrigger>
            <TabsTrigger value="unread" className="text-xs relative">
              Unread
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-[10px] text-primary-foreground flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="recognition" className="text-xs">
              Recognition
            </TabsTrigger>
            <TabsTrigger value="comment" className="text-xs">
              Comments
            </TabsTrigger>
            <TabsTrigger value="goal" className="text-xs hidden lg:block">
              Goals
            </TabsTrigger>
            <TabsTrigger value="post" className="text-xs hidden lg:block">
              Posts
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-4 space-y-3">
            {filteredMentions.length === 0 ? (
              <Card className="p-12 text-center">
                <AtSign className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-semibold text-lg mb-2">No Mentions Found</h3>
                <p className="text-sm text-muted-foreground">
                  {activeTab === "unread"
                    ? "You're all caught up! No unread mentions."
                    : "You haven't been mentioned in any " + activeTab + " yet."}
                </p>
              </Card>
            ) : (
              filteredMentions.map((mention) => {
                const typeConfig = mentionTypeConfig[mention.type]
                const TypeIcon = typeConfig.icon

                return (
                  <Card
                    key={mention.id}
                    className={`p-4 transition-colors ${
                      mention.status === "unread" ? "bg-primary/5 border-primary/20" : ""
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      {/* Unread indicator */}
                      <div className="pt-1">
                        {mention.status === "unread" ? (
                          <div className="h-2 w-2 rounded-full bg-primary" />
                        ) : (
                          <div className="h-2 w-2" />
                        )}
                      </div>

                      {/* Avatar */}
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={mention.from.avatar} />
                        <AvatarFallback className="bg-primary/10 text-primary text-sm">
                          {mention.from.initials}
                        </AvatarFallback>
                      </Avatar>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-semibold text-sm">{mention.from.name}</span>
                          <Badge
                            variant="secondary"
                            className={`${typeConfig.bg} ${typeConfig.color} border-0 text-[10px]`}
                          >
                            <TypeIcon className="h-3 w-3 mr-1" />
                            {typeConfig.label}
                          </Badge>
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {mention.timestamp}
                          </span>
                        </div>

                        <div className="text-xs text-muted-foreground mt-0.5">
                          {mention.from.role}
                        </div>

                        <p className="mt-2 text-sm text-foreground leading-relaxed">
                          {highlightMention(mention.content, mention.highlight)}
                        </p>

                        <div className="mt-2 text-xs text-muted-foreground bg-muted/50 px-2 py-1 rounded inline-block">
                          {mention.context}
                        </div>

                        {/* Reactions & Actions */}
                        <div className="mt-3 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            {mention.reactions && (
                              <>
                                <span className="text-xs text-muted-foreground flex items-center gap-1">
                                  <Heart className="h-3 w-3" />
                                  {mention.reactions.likes}
                                </span>
                                <span className="text-xs text-muted-foreground flex items-center gap-1">
                                  <MessageCircle className="h-3 w-3" />
                                  {mention.reactions.comments}
                                </span>
                              </>
                            )}
                          </div>

                          <div className="flex items-center gap-1">
                            {mention.status === "unread" ? (
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-7 text-xs gap-1"
                                onClick={() => markAsRead(mention.id)}
                              >
                                <Eye className="h-3 w-3" />
                                Mark Read
                              </Button>
                            ) : (
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-7 w-7 p-0 text-muted-foreground"
                                onClick={() => deleteMention(mention.id)}
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            )}
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-7 text-xs gap-1"
                              asChild
                            >
                              <a href={mention.link}>
                                View
                                <ChevronRight className="h-3 w-3" />
                              </a>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                )
              })
            )}
          </TabsContent>
        </Tabs>

        {/* Notification Settings */}
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center">
                <Bell className="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <div className="font-medium text-sm">Mention Notifications</div>
                <div className="text-xs text-muted-foreground">
                  Get notified when someone mentions you
                </div>
              </div>
            </div>
            <Button variant="outline" size="sm" asChild>
              <a href="/settings/profile">
                Manage Settings
              </a>
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}
