export type ReviewStatus = "scheduled" | "in_progress" | "completed" | "cancelled"
export type ReviewType = "annual" | "mid_year" | "quarterly" | "probation" | "promotion"
export type ReviewCycle = "Q1" | "Q2" | "Q3" | "Q4" | "Mid-Year" | "Annual"

export interface PerformanceReview {
  id: string
  employeeId: string
  employeeName: string
  managerId: string
  managerName: string
  type: ReviewType
  cycle: ReviewCycle
  status: ReviewStatus
  overallRating?: number
  scheduledDate?: string
  completedDate?: string
  createdAt: string
  updatedAt: string
  sections: ReviewSection[]
  goals: ReviewGoal[]
  developmentPlan?: DevelopmentPlan
}

export interface ReviewSection {
  id: string
  title: string
  rating?: number
  managerComments?: string
  employeeComments?: string
  examples?: string[]
}

export interface ReviewGoal {
  goalId: string
  title: string
  status: string
  achievement: number
  impact: string
}

export interface DevelopmentPlan {
  strengths: string[]
  areasForImprovement: string[]
  developmentGoals: DevelopmentGoal[]
  trainingNeeds: string[]
}

export interface DevelopmentGoal {
  id: string
  title: string
  description: string
  targetDate: string
  status: string
}

export interface ReviewListResponse {
  success: boolean
  reviews?: PerformanceReview[]
  error?: string
}

export interface ReviewDetailResponse {
  success: boolean
  review?: PerformanceReview
  error?: string
}

export interface CreateReviewRequest {
  employeeId: string
  cycleId: string
  scheduledDate?: string
}

export interface UpdateReviewRequest {
  selfRating?: number
  selfAssessment?: string
  managerRating?: number
  managerFeedback?: string
  developmentPlan?: string
  status?: "scheduled" | "in_progress" | "completed" | "cancelled"
}
