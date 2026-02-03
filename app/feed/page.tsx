"use client"

import { useState } from "react"
import { useAuth } from "@/lib/auth"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Heart,
  MessageCircle,
  Share2,
  MoreHorizontal,
  Target,
  Award,
  CheckCircle,
  TrendingUp,
  Image as ImageIcon,
  AtSign,
  Smile,
  Send,
  Bookmark,
  Flag,
  Filter,
  Sparkles,
  Users,
  Calendar,
  ThumbsUp,
  PartyPopper,
  Flame,
  Lightbulb,
  Clock,
} from "lucide-react"

// Activity types with their styling
const activityTypes = {
  recognition: {
    icon: Award,
    color: "text-amber-500",
    bg: "bg-amber-500/10",
    label: "Recognition",
  },
  goal_completed: {
    icon: Target,
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
    label: "Goal Completed",
  },
  goal_progress: {
    icon: TrendingUp,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
    label: "Goal Progress",
  },
  checkin: {
    icon: CheckCircle,
    color: "text-teal-500",
    bg: "bg-teal-500/10",
    label: "Check-in",
  },
  milestone: {
    icon: PartyPopper,
    color: "text-purple-500",
    bg: "bg-purple-500/10",
    label: "Milestone",
  },
  announcement: {
    icon: Sparkles,
    color: "text-pink-500",
    bg: "bg-pink-500/10",
    label: "Announcement",
  },
}

// Reaction types
const reactionTypes = [
  { emoji: "👍", label: "Like", icon: ThumbsUp },
  { emoji: "❤️", label: "Love", icon: Heart },
  { emoji: "🎉", label: "Celebrate", icon: PartyPopper },
  { emoji: "🔥", label: "Fire", icon: Flame },
  { emoji: "💡", label: "Insightful", icon: Lightbulb },
]

// Mock activity data
const mockActivities = [
  {
    id: "1",
    type: "recognition" as const,
    user: {
      name: "Sarah Chen",
      avatar: "/avatars/sarah.jpg",
      initials: "SC",
      role: "Product Manager",
      department: "Product",
    },
    recipient: {
      name: "Alex Rodriguez",
      avatar: "/avatars/alex.jpg",
      initials: "AR",
    },
    content: "Huge shoutout to @Alex Rodriguez for leading the product launch flawlessly! Your attention to detail and calm under pressure made all the difference. The team couldn't have done it without you!",
    badge: "Leadership",
    timestamp: "15 minutes ago",
    reactions: { "👍": 12, "❤️": 8, "🎉": 15 },
    comments: 5,
    isLiked: false,
    isBookmarked: false,
  },
  {
    id: "2",
    type: "goal_completed" as const,
    user: {
      name: "Michael Park",
      avatar: "/avatars/michael.jpg",
      initials: "MP",
      role: "Senior Engineer",
      department: "Engineering",
    },
    content: "Just completed my Q4 goal: Reduce API response time by 40%! Final result: 47% improvement across all endpoints. Thanks to everyone who helped with code reviews and testing.",
    goalTitle: "Optimize API Performance",
    goalProgress: 100,
    timestamp: "2 hours ago",
    reactions: { "👍": 24, "🔥": 18, "🎉": 10 },
    comments: 12,
    isLiked: true,
    isBookmarked: true,
  },
  {
    id: "3",
    type: "milestone" as const,
    user: {
      name: "Emily Watson",
      avatar: "/avatars/emily.jpg",
      initials: "EW",
      role: "Marketing Lead",
      department: "Marketing",
    },
    content: "Celebrating 5 years at GoalFlow today! It's been an incredible journey watching this company grow. Grateful for all the amazing teammates who've become like family.",
    milestone: "5 Year Work Anniversary",
    timestamp: "4 hours ago",
    reactions: { "❤️": 45, "🎉": 32, "👍": 20 },
    comments: 28,
    isLiked: true,
    isBookmarked: false,
  },
  {
    id: "4",
    type: "goal_progress" as const,
    user: {
      name: "David Kim",
      avatar: "/avatars/david.jpg",
      initials: "DK",
      role: "Sales Manager",
      department: "Sales",
    },
    content: "Great progress on our Q4 revenue target! We've hit 85% of our goal with one month to go. The new outbound strategy is really paying off.",
    goalTitle: "Q4 Revenue Target",
    goalProgress: 85,
    timestamp: "Yesterday",
    reactions: { "🔥": 15, "👍": 22 },
    comments: 8,
    isLiked: false,
    isBookmarked: false,
  },
  {
    id: "5",
    type: "announcement" as const,
    user: {
      name: "HR Team",
      avatar: "/avatars/hr.jpg",
      initials: "HR",
      role: "Human Resources",
      department: "HR",
    },
    content: "Excited to announce our new Learning & Development program launching next month! All employees will have access to 500+ courses, certifications, and skill-building workshops. Stay tuned for more details!",
    isPinned: true,
    timestamp: "2 days ago",
    reactions: { "🎉": 67, "👍": 45, "❤️": 23 },
    comments: 15,
    isLiked: false,
    isBookmarked: true,
  },
  {
    id: "6",
    type: "checkin" as const,
    user: {
      name: "Lisa Thompson",
      avatar: "/avatars/lisa.jpg",
      initials: "LT",
      role: "UX Designer",
      department: "Design",
    },
    content: "Feeling great today! Finished the new onboarding flow designs and got positive feedback from stakeholders. Ready to tackle user testing next week.",
    mood: 5,
    energy: 4,
    timestamp: "3 days ago",
    reactions: { "👍": 8, "💡": 5 },
    comments: 3,
    isLiked: false,
    isBookmarked: false,
  },
]

// Filter options
const filterOptions = [
  { value: "all", label: "All Activity" },
  { value: "recognition", label: "Recognitions" },
  { value: "goals", label: "Goals" },
  { value: "milestones", label: "Milestones" },
  { value: "checkins", label: "Check-ins" },
  { value: "announcements", label: "Announcements" },
]

export default function FeedPage() {
  const { user } = useAuth()
  const [activities, setActivities] = useState(mockActivities)
  const [newPost, setNewPost] = useState("")
  const [isPosting, setIsPosting] = useState(false)
  const [activeFilter, setActiveFilter] = useState("all")
  const [showReactionPicker, setShowReactionPicker] = useState<string | null>(null)
  const [expandedComments, setExpandedComments] = useState<string | null>(null)

  const handleReaction = (activityId: string, emoji: string) => {
    setActivities(prev =>
      prev.map(activity => {
        if (activity.id === activityId) {
          const currentReactions = { ...activity.reactions }
          const currentCount = currentReactions[emoji] || 0
          currentReactions[emoji] = activity.isLiked && emoji === "👍" 
            ? currentCount - 1 
            : currentCount + 1
          return {
            ...activity,
            reactions: currentReactions,
            isLiked: emoji === "👍" ? !activity.isLiked : activity.isLiked,
          }
        }
        return activity
      })
    )
    setShowReactionPicker(null)
  }

  const handleBookmark = (activityId: string) => {
    setActivities(prev =>
      prev.map(activity =>
        activity.id === activityId
          ? { ...activity, isBookmarked: !activity.isBookmarked }
          : activity
      )
    )
  }

  const handlePost = async () => {
    if (!newPost.trim()) return
    setIsPosting(true)
    // Simulate posting
    await new Promise(resolve => setTimeout(resolve, 1000))
    setNewPost("")
    setIsPosting(false)
  }

  const getTotalReactions = (reactions: Record<string, number>) => {
    return Object.values(reactions).reduce((sum, count) => sum + count, 0)
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-3xl mx-auto p-4 md:p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Activity Feed</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Stay connected with your team's achievements and updates
            </p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2">
                <Filter className="h-4 w-4" />
                Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              {filterOptions.map(option => (
                <DropdownMenuItem
                  key={option.value}
                  onClick={() => setActiveFilter(option.value)}
                  className={activeFilter === option.value ? "bg-accent" : ""}
                >
                  {option.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Composer Card */}
        <Card className="p-4">
          <div className="flex gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={user?.avatar} />
              <AvatarFallback className="bg-primary/10 text-primary font-medium">
                {user?.name?.split(" ").map(n => n[0]).join("") || "U"}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-3">
              <Textarea
                placeholder="Share an update, celebrate a win, or recognize a teammate..."
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                className="min-h-[80px] resize-none border-0 bg-muted/50 focus-visible:ring-1"
              />
              <div className="flex items-center justify-between">
                <div className="flex gap-1">
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-muted-foreground hover:text-primary">
                    <ImageIcon className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-muted-foreground hover:text-primary">
                    <AtSign className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-muted-foreground hover:text-primary">
                    <Smile className="h-4 w-4" />
                  </Button>
                </div>
                <Button 
                  onClick={handlePost} 
                  disabled={!newPost.trim() || isPosting}
                  size="sm"
                  className="gap-2"
                >
                  <Send className="h-4 w-4" />
                  Post
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Quick Actions */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          <Button variant="outline" size="sm" className="gap-2 whitespace-nowrap" asChild>
            <a href="/recognition/give">
              <Award className="h-4 w-4 text-amber-500" />
              Give Recognition
            </a>
          </Button>
          <Button variant="outline" size="sm" className="gap-2 whitespace-nowrap" asChild>
            <a href="/goals/my">
              <Target className="h-4 w-4 text-emerald-500" />
              Update Goal
            </a>
          </Button>
          <Button variant="outline" size="sm" className="gap-2 whitespace-nowrap" asChild>
            <a href="/performance/checkin">
              <CheckCircle className="h-4 w-4 text-teal-500" />
              Daily Check-in
            </a>
          </Button>
        </div>

        {/* Activity Feed */}
        <div className="space-y-4">
          {activities.map((activity) => {
            const typeConfig = activityTypes[activity.type]
            const TypeIcon = typeConfig.icon

            return (
              <Card key={activity.id} className="overflow-hidden">
                {/* Pinned indicator */}
                {"isPinned" in activity && activity.isPinned && (
                  <div className="bg-primary/5 border-b border-primary/10 px-4 py-2 flex items-center gap-2 text-xs text-primary font-medium">
                    <Sparkles className="h-3 w-3" />
                    Pinned Announcement
                  </div>
                )}

                <div className="p-4">
                  {/* Header */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={activity.user.avatar} />
                        <AvatarFallback className="bg-primary/10 text-primary font-medium text-sm">
                          {activity.user.initials}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-semibold text-foreground">
                            {activity.user.name}
                          </span>
                          <Badge variant="secondary" className={`${typeConfig.bg} ${typeConfig.color} border-0 text-xs`}>
                            <TypeIcon className="h-3 w-3 mr-1" />
                            {typeConfig.label}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5">
                          <span>{activity.user.role}</span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {activity.timestamp}
                          </span>
                        </div>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleBookmark(activity.id)}>
                          <Bookmark className={`h-4 w-4 mr-2 ${activity.isBookmarked ? "fill-current" : ""}`} />
                          {activity.isBookmarked ? "Remove Bookmark" : "Bookmark"}
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Share2 className="h-4 w-4 mr-2" />
                          Share
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Flag className="h-4 w-4 mr-2" />
                          Report
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  {/* Content */}
                  <div className="mt-3 text-sm text-foreground leading-relaxed">
                    {/* Recognition recipient */}
                    {"recipient" in activity && activity.recipient && (
                      <div className="flex items-center gap-2 mb-2 text-muted-foreground">
                        <span>Recognized</span>
                        <Avatar className="h-5 w-5">
                          <AvatarFallback className="text-[10px] bg-amber-500/10 text-amber-600">
                            {activity.recipient.initials}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-medium text-foreground">{activity.recipient.name}</span>
                        {"badge" in activity && (
                          <Badge variant="outline" className="text-xs">
                            {activity.badge}
                          </Badge>
                        )}
                      </div>
                    )}

                    <p className="whitespace-pre-wrap">{activity.content}</p>

                    {/* Goal progress card */}
                    {"goalTitle" in activity && (
                      <div className="mt-3 p-3 bg-muted/50 rounded-lg border">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-medium text-muted-foreground">Goal Progress</span>
                          <span className="text-xs font-bold text-primary">{activity.goalProgress}%</span>
                        </div>
                        <div className="font-medium text-sm mb-2">{activity.goalTitle}</div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary rounded-full transition-all duration-500"
                            style={{ width: `${activity.goalProgress}%` }}
                          />
                        </div>
                      </div>
                    )}

                    {/* Milestone card */}
                    {"milestone" in activity && (
                      <div className="mt-3 p-3 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg border border-purple-200/50">
                        <div className="flex items-center gap-2">
                          <PartyPopper className="h-5 w-5 text-purple-500" />
                          <span className="font-semibold text-purple-700">{activity.milestone}</span>
                        </div>
                      </div>
                    )}

                    {/* Check-in mood/energy */}
                    {"mood" in activity && (
                      <div className="mt-3 flex items-center gap-4 text-xs">
                        <div className="flex items-center gap-2">
                          <span className="text-muted-foreground">Mood:</span>
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map((level) => (
                              <span
                                key={level}
                                className={`text-lg ${level <= activity.mood ? "" : "opacity-20"}`}
                              >
                                {level <= 2 ? "😔" : level === 3 ? "😐" : level === 4 ? "🙂" : "😊"}
                              </span>
                            ))}
                          </div>
                        </div>
                        {"energy" in activity && (
                          <div className="flex items-center gap-2">
                            <span className="text-muted-foreground">Energy:</span>
                            <div className="flex gap-0.5">
                              {[1, 2, 3, 4, 5].map((level) => (
                                <div
                                  key={level}
                                  className={`h-4 w-1.5 rounded-full ${
                                    level <= activity.energy ? "bg-teal-500" : "bg-muted"
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Reactions summary */}
                  {getTotalReactions(activity.reactions) > 0 && (
                    <div className="mt-3 flex items-center gap-2">
                      <div className="flex -space-x-1">
                        {Object.entries(activity.reactions)
                          .filter(([, count]) => count > 0)
                          .slice(0, 3)
                          .map(([emoji]) => (
                            <span
                              key={emoji}
                              className="h-5 w-5 flex items-center justify-center bg-card border rounded-full text-xs"
                            >
                              {emoji}
                            </span>
                          ))}
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {getTotalReactions(activity.reactions)} reactions
                      </span>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="mt-3 pt-3 border-t flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      {/* Reaction button with picker */}
                      <div className="relative">
                        <Button
                          variant="ghost"
                          size="sm"
                          className={`gap-1.5 text-xs h-8 ${activity.isLiked ? "text-primary" : "text-muted-foreground"}`}
                          onClick={() => handleReaction(activity.id, "👍")}
                          onMouseEnter={() => setShowReactionPicker(activity.id)}
                          onMouseLeave={() => setShowReactionPicker(null)}
                        >
                          <Heart className={`h-4 w-4 ${activity.isLiked ? "fill-current" : ""}`} />
                          React
                        </Button>
                        {showReactionPicker === activity.id && (
                          <div
                            className="absolute bottom-full left-0 mb-1 flex gap-1 p-1.5 bg-card border rounded-full shadow-lg z-10"
                            onMouseEnter={() => setShowReactionPicker(activity.id)}
                            onMouseLeave={() => setShowReactionPicker(null)}
                          >
                            {reactionTypes.map(({ emoji, label }) => (
                              <button
                                key={emoji}
                                onClick={() => handleReaction(activity.id, emoji)}
                                className="h-8 w-8 flex items-center justify-center hover:bg-muted rounded-full transition-transform hover:scale-125"
                                title={label}
                              >
                                <span className="text-lg">{emoji}</span>
                              </button>
                            ))}
                          </div>
                        )}
                      </div>

                      <Button
                        variant="ghost"
                        size="sm"
                        className="gap-1.5 text-xs h-8 text-muted-foreground"
                        onClick={() => setExpandedComments(expandedComments === activity.id ? null : activity.id)}
                      >
                        <MessageCircle className="h-4 w-4" />
                        {activity.comments > 0 ? `${activity.comments} Comments` : "Comment"}
                      </Button>

                      <Button variant="ghost" size="sm" className="gap-1.5 text-xs h-8 text-muted-foreground">
                        <Share2 className="h-4 w-4" />
                        Share
                      </Button>
                    </div>

                    <Button
                      variant="ghost"
                      size="sm"
                      className={`h-8 w-8 p-0 ${activity.isBookmarked ? "text-primary" : "text-muted-foreground"}`}
                      onClick={() => handleBookmark(activity.id)}
                    >
                      <Bookmark className={`h-4 w-4 ${activity.isBookmarked ? "fill-current" : ""}`} />
                    </Button>
                  </div>

                  {/* Comments section (expandable) */}
                  {expandedComments === activity.id && (
                    <div className="mt-3 pt-3 border-t space-y-3">
                      {/* Sample comments */}
                      <div className="flex gap-2">
                        <Avatar className="h-7 w-7">
                          <AvatarFallback className="text-[10px] bg-muted">JD</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 bg-muted/50 rounded-lg p-2">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-medium">John Doe</span>
                            <span className="text-[10px] text-muted-foreground">2h ago</span>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">
                            Congratulations! Well deserved recognition.
                          </p>
                        </div>
                      </div>

                      {/* Comment input */}
                      <div className="flex gap-2">
                        <Avatar className="h-7 w-7">
                          <AvatarFallback className="text-[10px] bg-primary/10 text-primary">
                            {user?.name?.split(" ").map(n => n[0]).join("") || "U"}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 flex gap-2">
                          <input
                            type="text"
                            placeholder="Write a comment..."
                            className="flex-1 h-8 px-3 text-xs bg-muted/50 border rounded-full focus:outline-none focus:ring-1 focus:ring-primary"
                          />
                          <Button size="sm" className="h-8 w-8 p-0 rounded-full">
                            <Send className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            )
          })}
        </div>

        {/* Load more */}
        <div className="flex justify-center pt-4">
          <Button variant="outline" className="gap-2">
            Load More Activities
          </Button>
        </div>
      </div>
    </div>
  )
}
