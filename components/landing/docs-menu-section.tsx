"use client"

import { BookOpen, Users, Target, CheckSquare2, TrendingUp, MessageCircle } from "lucide-react"
import Link from "next/link"

interface DocCard {
  icon: React.ElementType
  title: string
  description: string
  color: string
  bgColor: string
  link: string
}

interface ActorSection {
  title: string
  description: string
  icon: React.ElementType
  color: string
  bgColor: string
}

const docCards: DocCard[] = [
  {
    icon: Target,
    title: "Getting Started",
    description: "Set up your organization and create your first goals",
    color: "text-primary",
    bgColor: "bg-primary/10",
    link: "#",
  },
  {
    icon: Users,
    title: "For Managers",
    description: "Manage team goals, conduct reviews, and track performance",
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    link: "#",
  },
  {
    icon: Target,
    title: "For Employees",
    description: "Create personal goals, check-in progress, and seek feedback",
    color: "text-green-600",
    bgColor: "bg-green-50",
    link: "#",
  },
  {
    icon: TrendingUp,
    title: "Analytics & Reporting",
    description: "Track organizational performance with real-time dashboards",
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    link: "#",
  },
  {
    icon: CheckSquare2,
    title: "Recognition System",
    description: "Celebrate wins and build a culture of appreciation",
    color: "text-amber-600",
    bgColor: "bg-amber-50",
    link: "#",
  },
  {
    icon: MessageCircle,
    title: "Feedback & Check-ins",
    description: "Enable continuous feedback loops and performance tracking",
    color: "text-cyan-600",
    bgColor: "bg-cyan-50",
    link: "#",
  },
]

const actors: ActorSection[] = [
  {
    title: "Employees",
    description: "Track personal OKRs, receive feedback, and grow professionally",
    icon: Users,
    color: "text-green-600",
    bgColor: "bg-green-50",
  },
  {
    title: "Managers",
    description: "Lead teams, cascade goals, and conduct meaningful reviews",
    icon: Target,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    title: "HR & Admins",
    description: "Configure system, manage workflows, and generate insights",
    icon: Users,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
  },
  {
    title: "Executives",
    description: "Monitor organizational alignment and strategic progress",
    icon: TrendingUp,
    color: "text-amber-600",
    bgColor: "bg-amber-50",
  },
]

const userStories = [
  {
    actor: "Employee",
    story: "I want to align my personal goals with company objectives so I understand how my work contributes to organizational success",
  },
  {
    actor: "Manager",
    story: "I want to cascade team goals and track progress in real-time so I can coach my team effectively and celebrate wins",
  },
  {
    actor: "HR Manager",
    story: "I want to configure goal cycles and evaluation templates so I can standardize processes across the organization",
  },
  {
    actor: "Executive",
    story: "I want visibility into strategic goal achievement and team performance so I can make informed decisions",
  },
  {
    actor: "Employee",
    story: "I want to give and receive peer recognition so I feel valued and see my impact on the team",
  },
  {
    actor: "Manager",
    story: "I want data-driven performance insights so I can make fair and objective decisions",
  },
]

export function DocsMenuSection() {
  return (
    <section className="py-20 px-4 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <BookOpen className="w-6 h-6 text-primary" />
            <h2 className="text-sm font-semibold text-primary uppercase tracking-wide">Documentation</h2>
          </div>
          <h3 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            Learn how to get the most from GoalFlow
          </h3>
          <p className="text-xl text-muted-foreground text-balance max-w-3xl mx-auto">
            Comprehensive guides and documentation tailored for different roles in your organization
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {docCards.map((card) => (
            <Link
              key={card.title}
              href={card.link}
              className="bg-card rounded-lg p-6 border border-border hover:border-primary/50 hover:shadow-md transition-all duration-300 group"
            >
              <div className={`w-12 h-12 ${card.bgColor} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <card.icon className={`w-6 h-6 ${card.color}`} />
              </div>
              <h4 className="text-lg font-semibold text-foreground mb-2">{card.title}</h4>
              <p className="text-muted-foreground text-sm leading-relaxed">{card.description}</p>
            </Link>
          ))}
        </div>

        {/* Actors Section */}
        <div className="bg-muted/50 rounded-xl p-12 mb-20 border border-border">
          <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-12 text-center">
            Built for Every Role
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {actors.map((actor) => (
              <div key={actor.title} className="text-center">
                <div className={`w-16 h-16 ${actor.bgColor} rounded-lg flex items-center justify-center mx-auto mb-4`}>
                  <actor.icon className={`w-8 h-8 ${actor.color}`} />
                </div>
                <h4 className="text-lg font-semibold text-foreground mb-2">{actor.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{actor.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* User Stories Section */}
        <div>
          <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">
            User Stories
          </h3>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Real use cases that show how different roles benefit from GoalFlow
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {userStories.map((story, index) => (
              <div
                key={index}
                className="bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 mt-1">
                    <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-primary/10">
                      <span className="text-sm font-semibold text-primary">{index + 1}</span>
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-primary mb-2">{story.actor}</p>
                    <p className="text-foreground leading-relaxed">
                      <span className="font-medium">I want</span> to {story.story.toLowerCase().split("so")[0].trim()} <span className="font-medium">so</span> {story.story.toLowerCase().split("so")[1].trim()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
