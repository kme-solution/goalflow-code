// lib/menu-config.ts
import type React from "react"
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
  BookOpen,
  HelpCircle,
  Building2,
  BarChart3,
  FolderOpen,
  Bell,
  FileText,
  Zap,
  Calendar,
  PieChart,
  Smartphone,
  Shield,
  Globe,
  LucideIcon,
} from "lucide-react"

export type UserRole = "employee" | "manager" | "hr_admin" | "ceo" | "team_lead"

export type MenuItem = {
  id: string
  label: string
  icon?: LucideIcon
  href?: string
  items?: MenuItem[]
  roles: UserRole[]
  badge?: number | string
  external?: boolean
}

// Main navigation - simplified and logical
export const menuConfig: MenuItem[] = [
  // ==================== CORE FEATURES ====================
  {
    id: "dashboard",
    label: "Dashboard",
    icon: Home,
    href: "/dashboard",
    roles: ["employee", "manager", "hr_admin", "ceo", "team_lead"],
  },

  {
    id: "goals",
    label: "Goals",
    icon: Target,
    roles: ["employee", "manager", "hr_admin", "ceo", "team_lead"],
    items: [
      {
        id: "my-goals",
        label: "My Goals",
        href: "/goals/my",
        roles: ["employee", "manager", "hr_admin", "ceo", "team_lead"],
      },
      {
        id: "team-goals",
        label: "Team Goals",
        href: "/goals/team",
        roles: ["manager", "team_lead", "ceo"],
      },
      {
        id: "company-goals",
        label: "Company Goals",
        href: "/goals/company",
        roles: ["ceo", "hr_admin"],
      }     
    ],
  },

  {
    id: "recognition",
    label: "Recognition",
    icon: Award,
    roles: ["employee", "manager", "hr_admin", "ceo", "team_lead"],
    items: [
      {
        id: "give-recognition",
        label: "Give Recognition",
        href: "/recognition/give",
        roles: ["employee", "manager", "hr_admin", "ceo", "team_lead"],
      },
      {
        id: "recognition-feed",
        label: "Recognition Feed",
        href: "/recognition/feed",
        roles: ["employee", "manager", "hr_admin", "ceo", "team_lead"],
      },
      {
        id: "my-recognition",
        label: "My Recognition",
        href: "/recognition/received",
        roles: ["employee", "manager", "hr_admin", "ceo", "team_lead"],
      },
      {
        id: "recognition-analytics",
        label: "Analytics",
        href: "/recognition/analytics",
        roles: ["manager", "hr_admin", "ceo", "team_lead"],
      },
    ],
  },

  {
    id: "performance",
    label: "Performance",
    icon: TrendingUp,
    roles: ["employee", "manager", "hr_admin", "ceo", "team_lead"],
    items: [
      {
        id: "checkin",
        label: "Daily Check-in",
        href: "/performance/checkin",
        roles: ["employee", "manager", "hr_admin", "ceo", "team_lead"],
      },
      {
        id: "team-pulse",
        label: "Team Pulse",
        href: "/performance/pulse",
        roles: ["manager", "hr_admin", "ceo", "team_lead"],
      },
      {
        id: "reviews",
        label: "Reviews",
        href: "/performance/reviews",
        roles: ["employee", "manager", "hr_admin", "ceo", "team_lead"],
      },
      {
        id: "development",
        label: "Development",
        href: "/performance/development",
        roles: ["employee", "manager", "hr_admin", "team_lead"],
      },
    ],
  },

  // ==================== COLLABORATION ====================
  {
    id: "feed",
    label: "Activity Feed",
    icon: Activity,
    href: "/feed",
    roles: ["employee", "manager", "hr_admin", "ceo", "team_lead"],
  },

  {
    id: "projects",
    label: "Projects",
    icon: FolderOpen,
    href: "/projects",
    roles: ["employee", "manager", "team_lead", "ceo"],
  },

  // ==================== PEOPLE MANAGEMENT ====================
  {
    id: "people",
    label: "People",
    icon: Users,
    roles: ["hr_admin", "manager", "ceo", "team_lead"],
    items: [
      {
        id: "directory",
        label: "Directory",
        href: "/people",
        roles: ["hr_admin", "manager", "ceo", "team_lead"],
      },
      {
        id: "organization",
        label: "Organization",
        href: "/people/organization",
        roles: ["hr_admin", "ceo"],
      },
      {
        id: "invites",
        label: "Invites",
        href: "/people/invites",
        roles: ["hr_admin"],
      },
      {
        id: "reports",
        label: "Reports",
        href: "/people/reports",
        roles: ["hr_admin", "ceo"],
      },
    ],
  },

  // ==================== PLATFORM ====================
  {
    id: "mobile",
    label: "Mobile",
    icon: Smartphone,
    href: "/mobile",
    roles: ["employee", "manager", "hr_admin", "ceo", "team_lead"],
  },

  // ==================== PERSONAL ====================
  {
    id: "settings",
    label: "Settings",
    icon: Settings,
    href: "/settings/profile",
    roles: ["employee", "manager", "hr_admin", "ceo", "team_lead"],
    items: [
      {
        id: "profile",
        label: "Profile",
        href: "/settings/profile",
        roles: ["employee", "manager", "hr_admin", "ceo", "team_lead"],
      },
      {
        id: "notifications",
        label: "Notifications",
        href: "/settings/notifications",
        roles: ["employee", "manager", "hr_admin", "ceo", "team_lead"],
      },
      {
        id: "preferences",
        label: "Preferences",
        href: "/settings/preferences",
        roles: ["employee", "manager", "hr_admin", "ceo", "team_lead"],
      },
      {
        id: "security",
        label: "Security",
        href: "/settings/security",
        roles: ["employee", "manager", "hr_admin", "ceo", "team_lead"],
      },
    ],
  },

  {
    id: "help",
    label: "Help & Support",
    icon: HelpCircle,
    href: "/help",
    roles: ["employee", "manager", "hr_admin", "ceo", "team_lead"],
    items: [
      {
        id: "guides",
        label: "Guides",
        href: "/help/guides",
        roles: ["employee", "manager", "hr_admin", "ceo", "team_lead"],
      },
      {
        id: "contact",
        label: "Contact Support",
        href: "/help/contact",
        roles: ["employee", "manager", "hr_admin", "ceo", "team_lead"],
      },
    ],
  },
]

// ==================== ADMIN NAVIGATION (Separate for internal use) ====================
export const adminMenuConfig: MenuItem[] = [
  {
    id: "admin-dashboard",
    label: "Admin Dashboard",
    icon: Shield,
    href: "/admin",
    roles: ["hr_admin"], // Only HR admins for internal admin
  },
  {
    id: "admin-organization",
    label: "Organization",
    icon: Building2,
    roles: ["hr_admin"],
    items: [
      {
        id: "org-settings",
        label: "Settings",
        href: "/admin/organization",
        roles: ["hr_admin"],
      },
      {
        id: "org-hierarchy",
        label: "Hierarchy",
        href: "/admin/organization/hierarchy",
        roles: ["hr_admin"],
      },
      {
        id: "org-chart",
        label: "Org Chart",
        href: "/admin/organization/hierarchy/chart",
        roles: ["hr_admin"],
      },
    ],
  },
  {
    id: "admin-customers",
    label: "Customer Management",
    icon: Users,
    href: "/admin/customers",
    roles: ["hr_admin"],
  },
  {
    id: "admin-features",
    label: "Feature Management",
    icon: Zap,
    href: "/admin/features",
    roles: ["hr_admin"],
  },
  {
    id: "admin-support",
    label: "Support Tickets",
    icon: HelpCircle,
    href: "/admin/support",
    roles: ["hr_admin"],
  },
]

// ==================== PUBLIC NAVIGATION (Unauthenticated) ====================
export const publicMenuConfig: MenuItem[] = [
  {
    id: "public-docs",
    label: "Documentation",
    icon: FileText,
    href: "/docs",
    roles: [], // No role required
  },
  {
    id: "public-pricing",
    label: "Pricing",
    icon: PieChart,
    href: "/pricing",
    roles: [],
  },
  {
    id: "public-features",
    label: "Features",
    icon: Zap,
    href: "/features",
    roles: [],
  },
]

// ==================== ROLE-BASED ACCESS FUNCTIONS ====================
export function getFilteredMenuByRole(role: UserRole): MenuItem[] {
  return menuConfig
    .filter((item) => item.roles.includes(role))
    .map((item) => ({
      ...item,
      items: item.items?.filter((subItem) => subItem.roles.includes(role)),
    }))
}

export function getAdminMenuByRole(role: UserRole): MenuItem[] {
  return role === "hr_admin" ? adminMenuConfig : []
}

export function getPublicMenu(): MenuItem[] {
  return publicMenuConfig
}

// ==================== VALIDATION FUNCTIONS ====================
export function validateRouteAccess(role: UserRole, pathname: string): boolean {
  // Check main menu items
  for (const item of menuConfig) {
    if (item.href === pathname || pathname.startsWith(item.href + '/')) {
      return item.roles.includes(role)
    }
    if (item.items) {
      for (const subItem of item.items) {
        if (subItem.href === pathname || pathname.startsWith(subItem.href + '/')) {
          return subItem.roles.includes(role)
        }
      }
    }
  }

  // Check admin routes
  if (pathname.startsWith('/admin')) {
    return role === 'hr_admin'
  }

  // Check public routes
  if (pathname.startsWith('/docs') ||
    pathname.startsWith('/pricing') ||
    pathname.startsWith('/features') ||
    pathname.startsWith('/auth')) {
    return true
  }

  return false
}

// ==================== ROLE-BASED REDIRECTS ====================
export function getDefaultRedirectPath(role: UserRole): string {
  switch (role) {
    case 'hr_admin':
      return '/admin'
    case 'ceo':
      return '/goals/company'
    case 'manager':
      return '/goals/team'
    case 'team_lead':
      return '/projects'
    default:
      return '/dashboard'
  }
}
