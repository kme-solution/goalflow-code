import {
  Home,
  Target,
  Award,
  TrendingUp,
  User,
  Settings,
  Users,
  CheckCircle,
  Activity,
  Clock,
  BookOpen,
  HelpCircle,
  Building2,
  UserCog,
  BarChart3,
  Sliders,
  Heart,
  Zap,
  GraduationCap,
  Route,
  FileText,
  RefreshCw,
} from "lucide-react"

export type UserRole = "hr_admin" | "manager" | "employee" | "ceo" | "system_admin" | "team_lead"

export interface NavigationItem {
  name: string
  href: string
  icon: any
  roles: UserRole[]
  children?: NavigationItem[]
}

export const navigationConfig: NavigationItem[] = [
  {
    name: "Home",
    href: "/feed",
    icon: Home,
    roles: ["employee", "manager", "hr_admin", "ceo", "system_admin", "team_lead"],
    children: [
      {
        name: "Activity Feed",
        href: "/feed",
        icon: Activity,
        roles: ["employee", "manager", "hr_admin", "ceo", "system_admin", "team_lead"],
      },
      {
        name: "My Team",
        href: "/feed/team",
        icon: Users,
        roles: ["manager", "hr_admin", "team_lead"],
      },
      {
        name: "Following",
        href: "/feed/following",
        icon: User,
        roles: ["employee", "manager", "hr_admin", "ceo", "system_admin", "team_lead"],
      },
      {
        name: "Mentions",
        href: "/feed/mentions",
        icon: Heart,
        roles: ["employee", "manager", "hr_admin", "ceo", "system_admin", "team_lead"],
      },
    ],
  },
  {
    name: "Goals",
    href: "/goals/my",
    icon: Target,
    roles: ["employee", "manager", "hr_admin", "ceo", "system_admin", "team_lead"],
    children: [
      {
        name: "My Goals",
        href: "/goals/my",
        icon: Target,
        roles: ["employee", "manager", "hr_admin", "ceo", "system_admin", "team_lead"],
      },
      {
        name: "Team Goals",
        href: "/goals/team",
        icon: Users,
        roles: ["manager", "hr_admin", "team_lead"],
      },
      {
        name: "Company Goals",
        href: "/goals/company",
        icon: Building2,
        roles: ["ceo", "hr_admin"],
      },
      {
        name: "Alignment",
        href: "/goals/alignment",
        icon: TrendingUp,
        roles: ["manager", "hr_admin", "ceo", "team_lead"],
      },
    ],
  },
  {
    name: "Recognition",
    href: "/recognition/give",
    icon: Award,
    roles: ["employee", "manager", "hr_admin", "ceo", "system_admin", "team_lead"],
    children: [
      {
        name: "Give Recognition",
        href: "/recognition/give",
        icon: Award,
        roles: ["employee", "manager", "hr_admin", "ceo", "system_admin", "team_lead"],
      },
      {
        name: "Recognition Received",
        href: "/recognition/received",
        icon: Heart,
        roles: ["employee", "manager", "hr_admin", "ceo", "system_admin", "team_lead"],
      },
      {
        name: "Recognition Given",
        href: "/recognition/given",
        icon: Award,
        roles: ["employee", "manager", "hr_admin", "ceo", "system_admin", "team_lead"],
      },
      {
        name: "Team Feed",
        href: "/recognition/feed",
        icon: Activity,
        roles: ["manager", "hr_admin", "team_lead"],
      },
    ],
  },
  {
    name: "Performance",
    href: "/performance/checkin",
    icon: TrendingUp,
    roles: ["employee", "manager", "hr_admin", "ceo", "system_admin", "team_lead"],
    children: [
      {
        name: "Daily Check-in",
        href: "/performance/checkin",
        icon: CheckCircle,
        roles: ["employee", "manager", "hr_admin", "ceo", "system_admin", "team_lead"],
      },
      {
        name: "Team Pulse",
        href: "/performance/pulse",
        icon: Zap,
        roles: ["manager", "hr_admin", "team_lead"],
      },
      {
        name: "Performance Reviews",
        href: "/performance/reviews",
        icon: Clock,
        roles: ["employee", "manager", "hr_admin", "ceo", "system_admin", "team_lead"],
      },
      {
        name: "Development Plan",
        href: "/performance/development",
        icon: BookOpen,
        roles: ["employee", "manager", "hr_admin", "ceo", "system_admin", "team_lead"],
      },
      {
        name: "Skills Library",
        href: "/performance/development/skills",
        icon: GraduationCap,
        roles: ["employee", "manager", "hr_admin", "ceo", "system_admin", "team_lead"],
      },
      {
        name: "Career Paths",
        href: "/performance/development/paths",
        icon: Route,
        roles: ["employee", "manager", "hr_admin", "ceo", "system_admin", "team_lead"],
      },
      {
        name: "Analytics",
        href: "/performance/analytics",
        icon: BarChart3,
        roles: ["manager", "hr_admin", "ceo", "team_lead"],
      },
      {
        name: "Review Cycles",
        href: "/performance/reviews/cycles",
        icon: RefreshCw,
        roles: ["hr_admin"],
      },
      {
        name: "Review Templates",
        href: "/performance/reviews/templates",
        icon: FileText,
        roles: ["hr_admin"],
      },
    ],
  },
  {
    name: "Profile",
    href: "/profile",
    icon: User,
    roles: ["employee", "manager", "hr_admin", "ceo", "system_admin", "team_lead"],
    children: [
      {
        name: "My Profile",
        href: "/profile",
        icon: User,
        roles: ["employee", "manager", "hr_admin", "ceo", "system_admin", "team_lead"],
      },
      {
        name: "Preferences",
        href: "/profile/settings",
        icon: Settings,
        roles: ["employee", "manager", "hr_admin", "ceo", "system_admin", "team_lead"],
      },
      {
        name: "Help & Support",
        href: "/profile/help",
        icon: HelpCircle,
        roles: ["employee", "manager", "hr_admin", "ceo", "system_admin", "team_lead"],
      },
    ],
  },
  {
    name: "Admin",
    href: "/admin/organization",
    icon: Settings,
    roles: ["hr_admin", "system_admin"],
    children: [
      {
        name: "Organization",
        href: "/admin/organization",
        icon: Building2,
        roles: ["hr_admin", "system_admin"],
      },
      {
        name: "User Management",
        href: "/admin/users",
        icon: UserCog,
        roles: ["hr_admin", "system_admin"],
      },
      {
        name: "Feature Configuration",
        href: "/admin/features",
        icon: Sliders,
        roles: ["system_admin"],
      },
      {
        name: "Analytics & Reports",
        href: "/admin/analytics",
        icon: BarChart3,
        roles: ["hr_admin", "system_admin", "ceo"],
      },
    ],
  },
]

export function getNavigationForRole(role: UserRole): NavigationItem[] {
  return navigationConfig
    .filter((item) => item.roles.includes(role))
    .map((item) => ({
      ...item,
      children: item.children?.filter((child) => child.roles.includes(role)),
    }))
}

export function getDefaultRouteForRole(role: UserRole): string {
  switch (role) {
    case "hr_admin":
      return "/feed"
    case "manager":
      return "/feed"
    case "ceo":
      return "/feed"
    case "system_admin":
      return "/feed"
    case "team_lead":
      return "/feed"
    case "employee":
    default:
      return "/feed"
  }
}
