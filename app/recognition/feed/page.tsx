"use client"

import { useState } from "react"
import { useAuth } from "@/lib/auth"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Heart,
  MessageCircle,
  Share2,
  Award,
  Search,
  Clock,
  TrendingUp,
  Users,
  Star,
  Sparkles,
  Filter,
  Trophy,
  Medal,
  Crown,
  Gem,
  Flame,
  Target,
  Zap,
  Lightbulb,
  HandHeart,
  Rocket,
} from "lucide-react"

// Recognition badge/value categories
const recognitionBadges = [
  { id: "teamwork", name: "Teamwork", icon: Users, color: "bg-blue-500" },
  { id: "innovation", name: "Innovation", icon: Lightbulb, color: "bg-purple-500" },
  { id: "leadership", name: "Leadership", icon: Crown, color: "bg-amber-500" },
  { id: "excellence", name: "Excellence", icon: Star, color: "bg-emerald-500" },
  { id: "customer-focus", name: "Customer Focus", icon: HandHeart, color: "bg-pink-500" },
  { id: "initiative", name: "Initiative", icon: Rocket, color: "bg-teal-500" },
]

// Mock recognition data
const mockRecognitions = [
  {
    id: "1",
    from: {
      name: "Sarah Chen",
      avatar: "/avatars/sarah.jpg",
      initials: "SC",
      role: "Product Manager",
      department: "Product",
    },
    to: {
      name: "Alex Rodriguez",
      avatar: "/avatars/alex.jpg",
      initials: "AR",
      role: "Senior Engineer",
      department: "Engineering",
    },
    badge: "teamwork",
    message: "Huge shoutout to Alex for going above and beyond during the product launch! Your collaboration with the design team and willingness to jump in wherever needed made all the difference. The late nights and weekend debugging sessions didn't go unnoticed!",
    timestamp: "15 minutes ago",
    reactions: { hearts: 24, celebrates: 18, fires: 12 },
    comments: 8,
    isLiked: false,
  },
  {
    id: "2",
    from: {
      name: "Jennifer Martinez",
      avatar: "/avatars/jennifer.jpg",
      initials: "JM",
      role: "VP of Engineering",
      department: "Engineering",
    },
    to: {
      name: "Michael Park",
      avatar: "/avatars/michael.jpg",
      initials: "MP",
      role: "Backend Developer",
      department: "Engineering",
    },
    badge: "innovation",
    message: "Michael's innovative approach to our caching strategy reduced database load by 60%! This is exactly the kind of proactive problem-solving that makes our team great. Thank you for always thinking outside the box!",
    timestamp: "2 hours ago",
    reactions: { hearts: 45, celebrates: 32, fires: 28 },
    comments: 15,
    isLiked: true,
  },
  {
    id: "3",
    from: {
      name: "David Kim",
      avatar: "/avatars/david.jpg",
      initials: "DK",
      role: "QA Engineer",
      department: "Engineering",
    },
    to: {
      name: "Emily Watson",
      avatar: "/avatars/emily.jpg",
      initials: "EW",
      role: "UX Designer",
      department: "Design",
    },
    badge: "excellence",
    message: "Emily's attention to detail in the new design system is remarkable. Every component is pixel-perfect and the documentation is incredibly thorough. You've set a new standard for our design work!",
    timestamp: "5 hours ago",
    reactions: { hearts: 38, celebrates: 22, fires: 15 },
    comments: 11,
    isLiked: false,
  },
  {
    id: "4",
    from: {
      name: "Lisa Thompson",
      avatar: "/avatars/lisa.jpg",
      initials: "LT",
      role: "Product Designer",
      department: "Design",
    },
    to: {
      name: "Robert Chen",
      avatar: "/avatars/robert.jpg",
      initials: "RC",
      role: "Director of Product",
      department: "Product",
    },
    badge: "leadership",
    message: "Robert's leadership during our strategy pivot was exceptional. He kept the team focused, motivated, and aligned despite the uncertainty. Your calm and clear communication helped everyone feel confident in the new direction.",
    timestamp: "Yesterday",
    reactions: { hearts: 67, celebrates: 45, fires: 38 },
    comments: 23,
    isLiked: true,
  },
  {
    id: "5",
    from: {
      name: "Alex Rodriguez",
      avatar: "/avatars/alex.jpg",
      initials: "AR",
      role: "Senior Engineer",
      department: "Engineering",
    },
    to: {
      name: "Amanda Lewis",
      avatar: "/avatars/amanda.jpg",
      initials: "AL",
      role: "Head of Design",
      department: "Design",
    },
    badge: "customer-focus",
    message: "Amanda's user research completely transformed our approach to the onboarding flow. Her deep empathy for users and data-driven insights led to a 40% improvement in activation rates. Amazing work!",
    timestamp: "2 days ago",
    reactions: { hearts: 52, celebrates: 34, fires: 27 },
    comments: 18,
    isLiked: false,
  },
  {
    id: "6",
    from: {
      name: "Marcus Johnson",
      avatar: "/avatars/marcus.jpg",
      initials: "MJ",
      role: "CMO",
      department: "Marketing",
    },
    to: {
      name: "Engineering Team",
      avatar: "/avatars/team.jpg",
      initials: "ET",
      role: "Team",
      department: "Engineering",
    },
    badge: "initiative",
    message: "A massive thank you to the entire engineering team for the incredible work on our new analytics platform! Your initiative to go beyond the requirements and add predictive insights has been a game-changer for our marketing strategy.",
    timestamp: "3 days ago",
    reactions: { hearts: 89, celebrates: 67, fires: 45 },
    comments: 32,
    isLiked: true,
  },
]

// Leaderboard data
const topRecognizers = [
  { name: "Sarah Chen", initials: "SC", count: 24, trend: "+5" },
  { name: "Jennifer Martinez", initials: "JM", count: 21, trend: "+3" },
  { name: "David Kim", initials: "DK", count: 18, trend: "+7" },
  { name: "Alex Rodriguez", initials: "AR", count: 15, trend: "+2" },
  { name: "Lisa Thompson", initials: "LT", count: 12, trend: "+4" },
]

const topRecognized = [
  { name: "Michael Park", initials: "MP", count: 28, trend: "+8" },
  { name: "Emily Watson", initials: "EW", count: 25, trend: "+4" },
  { name: "Alex Rodriguez", initials: "AR", count: 22, trend: "+6" },
  { name: "Amanda Lewis", initials: "AL", count: 19, trend: "+3" },
  { name: "Robert Chen", initials: "RC", count: 16, trend: "+5" },
]

export default function RecognitionFeedPage() {
  const { user } = useAuth()
  const [recognitions, setRecognitions] = useState(mockRecognitions)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterBadge, setFilterBadge] = useState("all")
  const [sortBy, setSortBy] = useState("recent")

  const handleLike = (recognitionId: string) => {
    setRecognitions(prev =>
      prev.map(recognition =>
        recognition.id === recognitionId
          ? {
              ...recognition,
              isLiked: !recognition.isLiked,
              reactions: {
                ...recognition.reactions,
                hearts: recognition.isLiked
                  ? recognition.reactions.hearts - 1
                  : recognition.reactions.hearts + 1,
              },
            }
          : recognition
      )
    )
  }

  const getBadgeConfig = (badgeId: string) => {
    return recognitionBadges.find(b => b.id === badgeId) || recognitionBadges[0]
  }

  const getTotalReactions = (reactions: { hearts: number; celebrates: number; fires: number }) => {
    return reactions.hearts + reactions.celebrates + reactions.fires
  }

  const filteredRecognitions = recognitions.filter(recognition => {
    const matchesSearch =
      recognition.from.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      recognition.to.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      recognition.message.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesBadge = filterBadge === "all" || recognition.badge === filterBadge
    return matchesSearch && matchesBadge
  })

  return (
    <div className="min-h-screen">
      <div className="max-w-6xl mx-auto p-4 md:p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Team Recognition Feed</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Celebrate your teammates' achievements and contributions
            </p>
          </div>
          <Button className="gap-2" asChild>
            <a href="/recognition/give">
              <Award className="h-4 w-4" />
              Give Recognition
            </a>
          </Button>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-amber-500/10 flex items-center justify-center">
                <Award className="h-5 w-5 text-amber-500" />
              </div>
              <div>
                <div className="text-2xl font-bold">{recognitions.length}</div>
                <div className="text-xs text-muted-foreground">This Month</div>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-pink-500/10 flex items-center justify-center">
                <Heart className="h-5 w-5 text-pink-500" />
              </div>
              <div>
                <div className="text-2xl font-bold">
                  {recognitions.reduce((sum, r) => sum + getTotalReactions(r.reactions), 0)}
                </div>
                <div className="text-xs text-muted-foreground">Total Reactions</div>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-emerald-500" />
              </div>
              <div>
                <div className="text-2xl font-bold">+23%</div>
                <div className="text-xs text-muted-foreground">vs Last Month</div>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                <Users className="h-5 w-5 text-purple-500" />
              </div>
              <div>
                <div className="text-2xl font-bold">87%</div>
                <div className="text-xs text-muted-foreground">Participation</div>
              </div>
            </div>
          </Card>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Main Feed */}
          <div className="lg:col-span-3 space-y-4">
            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search recognitions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={filterBadge} onValueChange={setFilterBadge}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter by badge" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Badges</SelectItem>
                  {recognitionBadges.map(badge => (
                    <SelectItem key={badge.id} value={badge.id}>
                      {badge.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full sm:w-[150px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">Most Recent</SelectItem>
                  <SelectItem value="popular">Most Popular</SelectItem>
                  <SelectItem value="comments">Most Comments</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Recognition Cards */}
            <div className="space-y-4">
              {filteredRecognitions.map((recognition) => {
                const badgeConfig = getBadgeConfig(recognition.badge)
                const BadgeIcon = badgeConfig.icon

                return (
                  <Card key={recognition.id} className="overflow-hidden">
                    {/* Badge Header */}
                    <div className={`${badgeConfig.color} px-4 py-2 flex items-center gap-2`}>
                      <BadgeIcon className="h-4 w-4 text-white" />
                      <span className="text-sm font-medium text-white">{badgeConfig.name}</span>
                    </div>

                    <div className="p-4">
                      {/* From/To */}
                      <div className="flex items-center gap-2 flex-wrap">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={recognition.from.avatar} />
                          <AvatarFallback className="bg-primary/10 text-primary text-xs">
                            {recognition.from.initials}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex items-center gap-2 text-sm">
                          <span className="font-semibold">{recognition.from.name}</span>
                          <span className="text-muted-foreground">recognized</span>
                        </div>
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={recognition.to.avatar} />
                          <AvatarFallback className="bg-amber-500/10 text-amber-600 text-xs">
                            {recognition.to.initials}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-semibold text-sm">{recognition.to.name}</span>
                      </div>

                      {/* Roles */}
                      <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
                        <span>{recognition.from.role}</span>
                        <span>→</span>
                        <span>{recognition.to.role}</span>
                      </div>

                      {/* Message */}
                      <p className="mt-3 text-sm text-foreground leading-relaxed">
                        {recognition.message}
                      </p>

                      {/* Timestamp */}
                      <div className="mt-3 flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {recognition.timestamp}
                      </div>

                      {/* Reactions summary */}
                      <div className="mt-3 flex items-center gap-2">
                        <div className="flex -space-x-1">
                          <span className="h-6 w-6 flex items-center justify-center bg-card border rounded-full text-xs">
                            ❤️
                          </span>
                          <span className="h-6 w-6 flex items-center justify-center bg-card border rounded-full text-xs">
                            🎉
                          </span>
                          <span className="h-6 w-6 flex items-center justify-center bg-card border rounded-full text-xs">
                            🔥
                          </span>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {getTotalReactions(recognition.reactions)} reactions
                        </span>
                      </div>

                      {/* Actions */}
                      <div className="mt-3 pt-3 border-t flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className={`gap-1.5 text-xs h-8 ${recognition.isLiked ? "text-pink-500" : "text-muted-foreground"}`}
                          onClick={() => handleLike(recognition.id)}
                        >
                          <Heart className={`h-4 w-4 ${recognition.isLiked ? "fill-current" : ""}`} />
                          {recognition.reactions.hearts}
                        </Button>
                        <Button variant="ghost" size="sm" className="gap-1.5 text-xs h-8 text-muted-foreground">
                          🎉 {recognition.reactions.celebrates}
                        </Button>
                        <Button variant="ghost" size="sm" className="gap-1.5 text-xs h-8 text-muted-foreground">
                          🔥 {recognition.reactions.fires}
                        </Button>
                        <Button variant="ghost" size="sm" className="gap-1.5 text-xs h-8 text-muted-foreground">
                          <MessageCircle className="h-4 w-4" />
                          {recognition.comments}
                        </Button>
                        <Button variant="ghost" size="sm" className="gap-1.5 text-xs h-8 text-muted-foreground ml-auto">
                          <Share2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                )
              })}
            </div>

            {filteredRecognitions.length === 0 && (
              <Card className="p-12 text-center">
                <Award className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-semibold text-lg mb-2">No Recognitions Found</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Try adjusting your filters or be the first to give recognition!
                </p>
                <Button asChild>
                  <a href="/recognition/give">Give Recognition</a>
                </Button>
              </Card>
            )}

            {/* Load more */}
            {filteredRecognitions.length > 0 && (
              <div className="flex justify-center pt-4">
                <Button variant="outline">Load More</Button>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Badge Legend */}
            <Card className="p-4">
              <h3 className="font-semibold text-sm mb-3 flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-primary" />
                Recognition Values
              </h3>
              <div className="space-y-2">
                {recognitionBadges.map(badge => {
                  const BadgeIcon = badge.icon
                  return (
                    <button
                      key={badge.id}
                      className={`w-full flex items-center gap-2 p-2 rounded-lg hover:bg-muted/50 transition-colors text-left ${
                        filterBadge === badge.id ? "bg-muted" : ""
                      }`}
                      onClick={() => setFilterBadge(filterBadge === badge.id ? "all" : badge.id)}
                    >
                      <div className={`h-6 w-6 rounded ${badge.color} flex items-center justify-center`}>
                        <BadgeIcon className="h-3 w-3 text-white" />
                      </div>
                      <span className="text-sm">{badge.name}</span>
                    </button>
                  )
                })}
              </div>
            </Card>

            {/* Top Recognizers */}
            <Card className="p-4">
              <h3 className="font-semibold text-sm mb-3 flex items-center gap-2">
                <Trophy className="h-4 w-4 text-amber-500" />
                Top Recognizers
              </h3>
              <div className="space-y-2">
                {topRecognizers.map((person, index) => (
                  <div key={person.name} className="flex items-center gap-2">
                    <span className="text-xs font-bold w-4 text-muted-foreground">
                      {index + 1}
                    </span>
                    <Avatar className="h-6 w-6">
                      <AvatarFallback className="text-[10px] bg-primary/10 text-primary">
                        {person.initials}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm flex-1 truncate">{person.name}</span>
                    <Badge variant="secondary" className="text-[10px]">
                      {person.count}
                    </Badge>
                    <span className="text-[10px] text-emerald-500">{person.trend}</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Most Recognized */}
            <Card className="p-4">
              <h3 className="font-semibold text-sm mb-3 flex items-center gap-2">
                <Medal className="h-4 w-4 text-emerald-500" />
                Most Recognized
              </h3>
              <div className="space-y-2">
                {topRecognized.map((person, index) => (
                  <div key={person.name} className="flex items-center gap-2">
                    <span className="text-xs font-bold w-4 text-muted-foreground">
                      {index + 1}
                    </span>
                    <Avatar className="h-6 w-6">
                      <AvatarFallback className="text-[10px] bg-amber-500/10 text-amber-600">
                        {person.initials}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm flex-1 truncate">{person.name}</span>
                    <Badge variant="secondary" className="text-[10px]">
                      {person.count}
                    </Badge>
                    <span className="text-[10px] text-emerald-500">{person.trend}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
