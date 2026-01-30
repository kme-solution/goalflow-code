export type GoalStatus = "draft" | "active" | "completed" | "at_risk" | "archived"
export type GoalPriority = "low" | "medium" | "high" | "critical"
export type GoalType = "objective" | "key_result"
export type GoalLevel = "company" | "department" | "team" | "personal"
export type ConfidenceLevel = "red" | "yellow" | "green"
export type RelationshipType = "cascade" | "dependency" | "related"

export interface GoalMetric {
  id: string
  name: string
  target: number
  current: number
  unit: string
}

export interface GoalProgress {
  id: string
  goalId: string
  previousValue: number
  newValue: number
  confidence: number
  comment?: string
  evidenceUrl?: string
  userId: string
  createdAt: string
}

export interface GoalRelationship {
  id: string
  parentGoalId: string
  childGoalId: string
  relationshipType: RelationshipType
  weight: number
  createdAt: string
}

export interface Goal {
  id: string
  organizationId: string
  title: string
  description?: string
  type: GoalType
  level: GoalLevel
  targetValue?: number
  currentValue: number
  unit?: string
  confidence: number // 1-10 scale
  confidenceLevel: ConfidenceLevel
  startDate: string
  endDate: string
  status: GoalStatus
  ownerId: string
  ownerName: string
  contributors?: string[]
  parentGoalId?: string
  childGoalIds?: string[]
  relatedGoalIds?: string[]
  dependencies?: string[]
  progress: number // calculated percentage
  riskLevel?: "low_risk" | "medium_risk" | "high_risk"
  createdAt: string
  updatedAt: string
  progressHistory?: GoalProgress[]
}

export interface CreateGoalRequest {
  title: string
  description?: string
  type: GoalType
  level: GoalLevel
  targetValue?: number
  unit?: string
  startDate: string
  endDate: string
  ownerId: string
  contributors?: string[]
  parentGoalId?: string
  confidenceLevel?: ConfidenceLevel
}

export interface UpdateGoalRequest extends Partial<CreateGoalRequest> {
  currentValue?: number
  confidence?: number
  status?: GoalStatus
  confidenceLevel?: ConfidenceLevel
}

export interface GoalProgressRequest {
  newValue: number
  confidence: number
  comment?: string
  evidenceUrl?: string
}

export interface GoalListResponse {
  success: boolean
  goals?: Goal[]
  total?: number
  error?: string
}

export interface GoalDetailResponse {
  success: boolean
  goal?: Goal
  error?: string
}

export interface GoalAnalytics {
  completionRate: number
  progressVelocity: number
  alignmentScore: number
  atRiskGoals: Goal[]
  recentUpdates: GoalProgress[]
}
