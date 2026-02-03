"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Heart,
  MessageCircle,
  Share2,
  MoreHorizontal,
  Target,
  Award,
  CheckCircle,
  TrendingUp,
  UserPlus,
  UserMinus,
  Search,
  Clock,
  Users,
  Sparkles,
  Bell,
  BellOff,
  Building2,
} from "lucide-react"

// Mock people you're following
const followingPeople = [
  {
    id: "1",
    name: "Jennifer Martinez",
    avatar: "/avatars/jennifer.jpg",
    initials: "JM",
    role: "VP of Engineering",
    department: "Engineering",
    isFollowing: true,
    notifications: true,
    recentActivity: "Shared a goal update",
    activityTime: "2 hours ago",
  },
  {
    id: "2",
    name: "Robert Chen",
    avatar: "/avatars/robert.jpg",
    initials: "RC",
    role: "Director of Product",
    department: "Product",
    isFollowing: true,
    notifications: true,
    recentActivity: "Gave recognition",
    activityTime: "5 hours ago",
  },
  {
    id: "3",
    name: "Amanda Lewis",
    avatar: "/avatars/amanda.jpg",
    initials: "AL",
    role: "Head of Design",
    department: "Design",
    isFollowing: true,
    notifications: false,
    recentActivity: "Completed a milestone",
    activityTime: "Yesterday",
  },
  {
    id: "4",
    name: "Marcus Johnson",
    avatar: "/avatars/marcus.jpg",
    initials: "MJ",
    role: "Chief Marketing Officer",
    department: "Marketing",
    isFollowing: true,
    notifications: true,
    recentActivity: "Posted an announcement",
    activityTime: "2 days ago",
  },
]

// Suggested people to follow
const suggestedPeople = [
  {
    id: "5",
    name: "Diana Ross",
    avatar: "/avatars/diana.jpg",
    initials: "DR",
    role: "Senior Data Scientist",
    department: "Data",
    mutualConnections: 12,
    reason: "Works on similar projects",
  },
  {
    id: "6",
    name: "Kevin Park",
    avatar: "/avatars/kevin.jpg",
    initials: "KP",
    role: "Tech Lead",
    department: "Engineering",
    mutualConnections: 8,
    reason: "In your department",
  },
  {
    id: "7",
    name: "Lisa Wang",
    avatar: "/avatars/lisa.jpg",
    initials: "LW",
    role: "Product Designer",
    department: "Design",
    mutualConnections: 15,
    reason: "Frequently recognized",
  },
]

// Mock activities from people you follow
const followingActivities = [
  {
    id: "1",
    user: {
      name: "Jennifer Martinez",
      avatar: "/avatars/jennifer.jpg",
      initials: "JM",
      role: "VP of Engineering",
    },
    type: "goal_progress" as const,
    content: "Excited to share that our engineering team has achieved a major milestone - we've reduced deployment time by 60%! This wouldn't have been possible without everyone's dedication.",
    goalTitle: "Streamline CI/CD Pipeline",
    goalProgress: 85,
    timestamp: "2 hours ago",
    reactions: { likes: 42, comments: 15 },
    isLiked: true,
  },
  {
    id: "2",
    user: {
      name: "Robert Chen",
      avatar: "/avatars/robert.jpg",
      initials: "RC",
      role: "Director of Product",
    },
    type: "recognition" as const,
    content: "Want to give a huge shoutout to the entire product team for shipping 3 major features this quarter. Your hard work and collaboration has been exceptional!",
    recipient: { name: "Product Team", initials: "PT" },
    badge: "Team Excellence",
    timestamp: "5 hours ago",
    reactions: { likes: 67, comments: 23 },
    isLiked: false,
  },
  {
    id: "3",
    user: {
      name: "Amanda Lewis",
      avatar: "/avatars/amanda.jpg",
      initials: "AL",
      role: "Head of Design",
    },
    type: "milestone" as const,
    content: "Proud to announce that our design system is now being used across all product teams! This represents months of collaboration and standardization efforts.",
    milestone: "Design System Adoption Complete",
    timestamp: "Yesterday",
    reactions: { likes: 89, comments: 31 },
    isLiked: true,
  },
  {
    id: "4",
    user: {
      name: "Marcus Johnson",
      avatar: "/avatars/marcus.jpg",
      initials: "MJ",
      role: "Chief Marketing Officer",
    },
    type: "announcement" as const,
    content: "Big news! We're launching our new brand campaign next month. Stay tuned for some exciting updates and opportunities to get involved. Let's make this our best launch yet!",
    isPinned: true,
    timestamp: "2 days ago",
    reactions: { likes: 156, comments: 48 },
    isLiked: false,
  },
]

const activityTypeStyles = {
  goal_progress: { icon: TrendingUp, color: "text-blue-500", bg: "bg-blue-500/10" },
  goal_completed: { icon: Target, color: "text-emerald-500", bg: "bg-emerald-500/10" },
  recognition: { icon: Award, color: "text-amber-500", bg: "bg-amber-500/10" },
  checkin: { icon: CheckCircle, color: "text-teal-500", bg: "bg-teal-500/10" },
  milestone: { icon: Sparkles, color: "text-purple-500", bg: "bg-purple-500/10" },
  announcement: { icon: Sparkles, color: "text-pink-500", bg: "bg-pink-500/10" },
}

export default function FollowingPage() {
  const [following, setFollowing] = useState(followingPeople)
  const [suggested, setSuggested] = useState(suggestedPeople)
  const [activities, setActivities] = useState(followingActivities)
  const [searchQuery, setSearchQuery] = useState("")

  const handleToggleNotifications = (personId: string) => {
    setFollowing(prev =>
      prev.map(person =>
        person.id === personId ? { ...person, notifications: !person.notifications } : person
      )
    )
  }

  const handleUnfollow = (personId: string) => {
    setFollowing(prev => prev.filter(person => person.id !== personId))
  }

  const handleFollow = (personId: string) => {
    const personToFollow = suggested.find(p => p.id === personId)
    if (personToFollow) {
      setSuggested(prev => prev.filter(p => p.id !== personId))
      setFollowing(prev => [
        ...prev,
        {
          ...personToFollow,
          isFollowing: true,
          notifications: true,
          recentActivity: "Just followed",
          activityTime: "Now",
        },
      ])
    }
  }

  const handleLike = (activityId: string) => {
    setActivities(prev =>
      prev.map(activity =>
        activity.id === activityId
          ? {
              ...activity,
              isLiked: !activity.isLiked,
              reactions: {
                ...activity.reactions,
                likes: activity.isLiked ? activity.reactions.likes - 1 : activity.reactions.likes + 1,
              },
            }
          : activity
      )
    )
  }

  const filteredFollowing = following.filter(person =>
    person.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    person.role.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="min-h-screen">
      <div className="max-w-6xl mx-auto p-4 md:p-6 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">Following</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Stay updated with activities from people you follow
          </p>
        </div>

        <Tabs defaultValue="feed" className="space-y-6">
          <TabsList>
            <TabsTrigger value="feed" className="gap-2">
              <Sparkles className="h-4 w-4" />
              Activity Feed
            </TabsTrigger>
            <TabsTrigger value="following" className="gap-2">
              <Users className="h-4 w-4" />
              Following ({following.length})
            </TabsTrigger>
            <TabsTrigger value="discover" className="gap-2">
              <UserPlus className="h-4 w-4" />
              Discover
            </TabsTrigger>
          </TabsList>

          {/* Activity Feed Tab */}
          <TabsContent value="feed" className="space-y-4">
            {activities.length === 0 ? (
              <Card className="p-12 text-center">
                <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-semibold text-lg mb-2">No Activity Yet</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Follow people to see their updates in your feed
                </p>
                <Button>
                  <UserPlus className="h-4 w-4 mr-2" />
                  Find People to Follow
                </Button>
              </Card>
            ) : (
              <div className="space-y-4">
                {activities.map((activity) => {
                  const typeStyle = activityTypeStyles[activity.type]
                  const TypeIcon = typeStyle.icon

                  return (
                    <Card key={activity.id} className="p-4">
                      {/* Pinned indicator */}
                      {"isPinned" in activity && activity.isPinned && (
                        <div className="mb-3 pb-3 border-b flex items-center gap-2 text-xs text-primary font-medium">
                          <Sparkles className="h-3 w-3" />
                          Pinned by {activity.user.name}
                        </div>
                      )}

                      {/* Activity Header */}
                      <div className="flex items-start gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={activity.user.avatar} />
                          <AvatarFallback className="bg-primary/10 text-primary text-sm">
                            {activity.user.initials}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-semibold text-sm">{activity.user.name}</span>
                            <Badge variant="secondary" className={`${typeStyle.bg} ${typeStyle.color} border-0 text-[10px]`}>
                              <TypeIcon className="h-3 w-3 mr-1" />
                              {activity.type.replace("_", " ")}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
                            <span>{activity.user.role}</span>
                            <span>•</span>
                            <Clock className="h-3 w-3" />
                            <span>{activity.timestamp}</span>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>

                      {/* Activity Content */}
                      <div className="mt-3 text-sm">
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
                              <Badge variant="outline" className="text-[10px]">
                                {activity.badge}
                              </Badge>
                            )}
                          </div>
                        )}

                        <p className="text-foreground leading-relaxed">{activity.content}</p>

                        {/* Goal progress */}
                        {"goalTitle" in activity && (
                          <div className="mt-3 p-3 bg-muted/50 rounded-lg border">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-xs font-medium">{activity.goalTitle}</span>
                              <span className="text-xs font-bold text-primary">{activity.goalProgress}%</span>
                            </div>
                            <div className="h-2 bg-muted rounded-full overflow-hidden">
                              <div
                                className="h-full bg-primary rounded-full"
                                style={{ width: `${activity.goalProgress}%` }}
                              />
                            </div>
                          </div>
                        )}

                        {/* Milestone */}
                        {"milestone" in activity && (
                          <div className="mt-3 p-3 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg border border-purple-200/50">
                            <div className="flex items-center gap-2">
                              <Sparkles className="h-5 w-5 text-purple-500" />
                              <span className="font-semibold text-purple-700">{activity.milestone}</span>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Activity Actions */}
                      <div className="mt-3 pt-3 border-t flex items-center gap-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          className={`gap-1.5 text-xs h-8 ${activity.isLiked ? "text-primary" : "text-muted-foreground"}`}
                          onClick={() => handleLike(activity.id)}
                        >
                          <Heart className={`h-4 w-4 ${activity.isLiked ? "fill-current" : ""}`} />
                          {activity.reactions.likes}
                        </Button>
                        <Button variant="ghost" size="sm" className="gap-1.5 text-xs h-8 text-muted-foreground">
                          <MessageCircle className="h-4 w-4" />
                          {activity.reactions.comments}
                        </Button>
                        <Button variant="ghost" size="sm" className="gap-1.5 text-xs h-8 text-muted-foreground">
                          <Share2 className="h-4 w-4" />
                          Share
                        </Button>
                      </div>
                    </Card>
                  )
                })}

                <div className="flex justify-center pt-4">
                  <Button variant="outline">Load More</Button>
                </div>
              </div>
            )}
          </TabsContent>

          {/* Following Tab */}
          <TabsContent value="following" className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search people you follow..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-3">
              {filteredFollowing.map((person) => (
                <Card key={person.id} className="p-4">
                  <div className="flex items-start gap-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={person.avatar} />
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {person.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold truncate">{person.name}</div>
                      <div className="text-sm text-muted-foreground truncate">{person.role}</div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                        <Building2 className="h-3 w-3" />
                        {person.department}
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t flex items-center justify-between">
                    <div className="text-xs text-muted-foreground">
                      <span>{person.recentActivity}</span>
                      <span className="mx-1">•</span>
                      <span>{person.activityTime}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        className={`h-8 w-8 p-0 ${person.notifications ? "text-primary" : "text-muted-foreground"}`}
                        onClick={() => handleToggleNotifications(person.id)}
                      >
                        {person.notifications ? (
                          <Bell className="h-4 w-4" />
                        ) : (
                          <BellOff className="h-4 w-4" />
                        )}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
                        onClick={() => handleUnfollow(person.id)}
                      >
                        <UserMinus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {filteredFollowing.length === 0 && (
              <Card className="p-8 text-center">
                <Users className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground">No results found</p>
              </Card>
            )}
          </TabsContent>

          {/* Discover Tab */}
          <TabsContent value="discover" className="space-y-4">
            <Card className="p-4 bg-primary/5 border-primary/20">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Sparkles className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Suggested for You</h3>
                  <p className="text-sm text-muted-foreground">
                    People you might want to follow based on your connections and interests
                  </p>
                </div>
              </div>
            </Card>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
              {suggested.map((person) => (
                <Card key={person.id} className="p-4">
                  <div className="flex flex-col items-center text-center">
                    <Avatar className="h-16 w-16 mb-3">
                      <AvatarImage src={person.avatar} />
                      <AvatarFallback className="bg-primary/10 text-primary text-lg">
                        {person.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="font-semibold">{person.name}</div>
                    <div className="text-sm text-muted-foreground">{person.role}</div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                      <Building2 className="h-3 w-3" />
                      {person.department}
                    </div>
                    <div className="mt-2 text-xs text-muted-foreground">
                      <Users className="h-3 w-3 inline mr-1" />
                      {person.mutualConnections} mutual connections
                    </div>
                    <Badge variant="secondary" className="mt-2 text-xs">
                      {person.reason}
                    </Badge>
                    <Button
                      size="sm"
                      className="mt-3 w-full gap-2"
                      onClick={() => handleFollow(person.id)}
                    >
                      <UserPlus className="h-4 w-4" />
                      Follow
                    </Button>
                  </div>
                </Card>
              ))}
            </div>

            {suggested.length === 0 && (
              <Card className="p-8 text-center">
                <CheckCircle className="h-10 w-10 text-emerald-500 mx-auto mb-3" />
                <p className="text-muted-foreground">You're all caught up! Check back later for more suggestions.</p>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
