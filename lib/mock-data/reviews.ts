import type { PerformanceReview } from "@/lib/types/review.types"

export const MOCK_REVIEWS: PerformanceReview[] = [
  {
    id: "review-001",
    employeeId: "emp-001",
    employeeName: "Emily Rodriguez",
    managerId: "mgr-001",
    managerName: "Michael Chen",
    type: "annual",
    cycle: "Annual",
    status: "in_progress",
    overallRating: 4.5,
    scheduledDate: "2025-03-25T14:00:00Z",
    createdAt: "2025-03-01T00:00:00Z",
    updatedAt: "2025-03-15T10:00:00Z",
    sections: [
      {
        id: "s1",
        title: "Technical Skills",
        rating: 5,
        managerComments: "Exceptional technical expertise and problem-solving abilities",
        employeeComments: "Focused on improving system architecture skills this year",
        examples: ["Led migration to microservices", "Implemented CI/CD pipeline"],
      },
      {
        id: "s2",
        title: "Communication",
        rating: 4,
        managerComments: "Good communication, could improve presentation skills",
        employeeComments: "Working on public speaking through Toastmasters",
      },
      {
        id: "s3",
        title: "Teamwork & Collaboration",
        rating: 5,
        managerComments: "Outstanding team player, mentors junior developers",
        examples: ["Mentored 3 interns", "Led code review sessions"],
      },
    ],
    goals: [
      {
        goalId: "goal-003",
        title: "Implement Authentication System",
        status: "on_track",
        achievement: 75,
        impact: "Critical security improvement for the platform",
      },
    ],
    developmentPlan: {
      strengths: ["Technical expertise", "Problem-solving", "Mentorship"],
      areasForImprovement: ["Public speaking", "Strategic thinking"],
      developmentGoals: [
        {
          id: "dg1",
          title: "Complete Leadership Training",
          description: "Enroll in leadership development program",
          targetDate: "2025-12-31",
          status: "in_progress",
        },
      ],
      trainingNeeds: ["Advanced Architecture", "Public Speaking"],
    },
  },
]
