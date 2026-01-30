export interface PerformanceMetrics {
  overallScore: number
  trend: "up" | "down" | "stable"
  goalCompletionRate: number
  averageRating: number
  engagementScore: number
  atRiskCount: number
}

export interface DepartmentPerformance {
  id: string
  name: string
  headCount: number
  avgPerformanceScore: number
  goalCompletionRate: number
  atRiskCount: number
  trend: "up" | "down" | "stable"
}

export interface EngagementData {
  eNPS: number
  engagementRate: number
  responseRate: number
  byDepartment: DepartmentEngagement[]
  trends: EngagementTrend[]
}

export interface DepartmentEngagement {
  departmentId: string
  departmentName: string
  score: number
  change: number
}

export interface EngagementTrend {
  date: string
  score: number
}

export interface AnalyticsResponse {
  success: boolean
  metrics?: PerformanceMetrics
  departmentPerformance?: DepartmentPerformance[]
  engagement?: EngagementData
  error?: string
}
