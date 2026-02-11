import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { getUserFromToken } from "@/lib/auth.server"
import type { ReviewListResponse, ReviewDetailResponse, PerformanceReview, CreateReviewRequest, UpdateReviewRequest } from "@/lib/types/review.types"
import { broadcastToUser } from "@/app/api/people/[userId]/websocket/route"

export async function GET(request: NextRequest) {
  try {
    const user = await getUserFromToken(request)
    if (!user) {
      return NextResponse.json<ReviewListResponse>(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      )
    }

    const searchParams = request.nextUrl.searchParams
    const employeeId = searchParams.get("employeeId")
    const managerId = searchParams.get("managerId")
    const status = searchParams.get("status") as "scheduled" | "in_progress" | "completed" | "cancelled" | null

    // Build where clause
    const where: any = {
      isArchived: false,
    }

    // Filter by organization through employee/manager relations
    if (employeeId) {
      where.employeeId = employeeId
      // Ensure the employee belongs to the user's organization
      where.employee = {
        organizationId: user.organizationId,
      }
    }

    if (managerId) {
      where.managerId = managerId
      // Ensure the manager belongs to the user's organization
      where.manager = {
        organizationId: user.organizationId,
      }
    }

    if (status) {
      where.status = status
    }

    const reviews = await prisma.review.findMany({
      where,
      include: {
        employee: {
          select: {
            id: true,
            name: true,
          },
        },
        manager: {
          select: {
            id: true,
            name: true,
          },
        },
        cycle: {
          select: {
            id: true,
            name: true,
            type: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    // Transform database reviews to match the expected PerformanceReview type
    const transformedReviews: PerformanceReview[] = reviews.map((review) => {
      const overallRating = review.managerRating
        ? review.managerRating / 2 // Convert 1-10 scale to 1-5 scale
        : review.selfRating
          ? review.selfRating / 2
          : undefined

      return {
        id: review.id,
        employeeId: review.employeeId,
        employeeName: review.employee.name,
        managerId: review.managerId,
        managerName: review.manager.name,
        type: review.cycle.type as "annual" | "mid_year" | "quarterly" | "probation" | "promotion",
        cycle: review.cycle.name as "Q1" | "Q2" | "Q3" | "Q4" | "Mid-Year" | "Annual",
        status: review.status,
        overallRating,
        scheduledDate: undefined, // Not in schema
        completedDate: review.status === "completed" ? review.updatedAt.toISOString() : undefined,
        createdAt: review.createdAt.toISOString(),
        updatedAt: review.updatedAt.toISOString(),
        sections: [], // Not implemented in schema yet
        goals: [], // Not implemented in schema yet
        developmentPlan: review.developmentPlan ? {
          strengths: [], // Would need parsing from developmentPlan string
          areasForImprovement: [],
          developmentGoals: [],
          trainingNeeds: [],
        } : undefined,
      }
    })

    return NextResponse.json<ReviewListResponse>({
      success: true,
      reviews: transformedReviews,
    })
  } catch (error) {
    console.error("Reviews API error:", error)
    return NextResponse.json<ReviewListResponse>(
      {
        success: false,
        error: "Failed to fetch reviews",
      },
      { status: 500 },
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getUserFromToken(request)
    if (!user) {
      return NextResponse.json<ReviewDetailResponse>(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      )
    }

    const body: CreateReviewRequest = await request.json()

    // Verify that the employee exists and belongs to the user's organization
    const employee = await prisma.user.findFirst({
      where: {
        id: body.employeeId,
        organizationId: user.organizationId,
      },
    })

    if (!employee) {
      return NextResponse.json<ReviewDetailResponse>(
        { success: false, error: "Employee not found" },
        { status: 404 }
      )
    }

    // Verify that the cycle exists
    const cycle = await prisma.reviewCycle.findUnique({
      where: { id: body.cycleId },
    })

    if (!cycle) {
      return NextResponse.json<ReviewDetailResponse>(
        { success: false, error: "Review cycle not found" },
        { status: 404 }
      )
    }

    // Determine the manager (could be the current user or employee's manager)
    let managerId = user.id
    if (employee.managerId && employee.managerId !== user.id) {
      // If the employee has a manager and it's not the current user, use employee's manager
      managerId = employee.managerId
    }

    // Create the review
    const newReview = await prisma.review.create({
      data: {
        employeeId: body.employeeId,
        managerId,
        cycleId: body.cycleId,
        status: "scheduled",
      },
      include: {
        employee: {
          select: {
            id: true,
            name: true,
          },
        },
        manager: {
          select: {
            id: true,
            name: true,
          },
        },
        cycle: {
          select: {
            id: true,
            name: true,
            type: true,
          },
        },
      },
    })

    // Create notification for the employee
    const notification = await prisma.notification.create({
      data: {
        userId: body.employeeId,
        type: "review",
        title: "New Performance Review",
        message: `A new ${newReview.cycle.type} performance review has been scheduled for you`,
        data: {
          reviewId: newReview.id,
          cycleType: newReview.cycle.type,
          cycleName: newReview.cycle.name,
          scheduledDate: body.scheduledDate,
        },
        organizationId: user.organizationId,
      },
    })

    // Broadcast notification to the employee
    await broadcastToUser(body.employeeId, {
      type: "notification",
      data: {
        id: notification.id,
        type: notification.type,
        title: notification.title,
        message: notification.message,
        data: notification.data,
        createdAt: notification.createdAt.toISOString(),
        read: false,
      },
    })

    // Transform to match the expected PerformanceReview type
    const transformedReview: PerformanceReview = {
      id: newReview.id,
      employeeId: newReview.employeeId,
      employeeName: newReview.employee.name,
      managerId: newReview.managerId,
      managerName: newReview.manager.name,
      type: newReview.cycle.type as "annual" | "mid_year" | "quarterly" | "probation" | "promotion",
      cycle: newReview.cycle.name as "Q1" | "Q2" | "Q3" | "Q4" | "Mid-Year" | "Annual",
      status: newReview.status,
      overallRating: undefined,
      scheduledDate: body.scheduledDate,
      completedDate: undefined,
      createdAt: newReview.createdAt.toISOString(),
      updatedAt: newReview.updatedAt.toISOString(),
      sections: [],
      goals: [],
      developmentPlan: undefined,
    }

    return NextResponse.json<ReviewDetailResponse>({
      success: true,
      review: transformedReview,
    })
  } catch (error) {
    console.error("Create review error:", error)
    return NextResponse.json<ReviewDetailResponse>(
      {
        success: false,
        error: "Failed to create review",
      },
      { status: 500 },
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const user = await getUserFromToken(request)
    if (!user) {
      return NextResponse.json<ReviewDetailResponse>(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      )
    }

    const searchParams = request.nextUrl.searchParams
    const reviewId = searchParams.get("id")

    if (!reviewId) {
      return NextResponse.json<ReviewDetailResponse>(
        { success: false, error: "Review ID is required" },
        { status: 400 }
      )
    }

    const body: UpdateReviewRequest = await request.json()

    // Find the review and ensure it belongs to the user's organization
    const existingReview = await prisma.review.findFirst({
      where: {
        id: reviewId,
        OR: [
          { employeeId: user.id },
          { managerId: user.id },
        ],
      },
      include: {
        employee: {
          select: {
            id: true,
            name: true,
            organizationId: true,
          },
        },
        manager: {
          select: {
            id: true,
            name: true,
          },
        },
        cycle: {
          select: {
            id: true,
            name: true,
            type: true,
          },
        },
      },
    })

    if (!existingReview) {
      return NextResponse.json<ReviewDetailResponse>(
        { success: false, error: "Review not found or access denied" },
        { status: 404 }
      )
    }

    // Build update data
    const updateData: any = {}

    if (body.selfRating !== undefined) {
      updateData.selfRating = body.selfRating
    }

    if (body.selfAssessment !== undefined) {
      updateData.selfAssessment = body.selfAssessment
    }

    if (body.managerRating !== undefined) {
      updateData.managerRating = body.managerRating
    }

    if (body.managerFeedback !== undefined) {
      updateData.managerFeedback = body.managerFeedback
    }

    if (body.developmentPlan !== undefined) {
      updateData.developmentPlan = body.developmentPlan
    }

    if (body.status !== undefined) {
      updateData.status = body.status
    }

    // Update the review
    const updatedReview = await prisma.review.update({
      where: { id: reviewId },
      data: updateData,
      include: {
        employee: {
          select: {
            id: true,
            name: true,
          },
        },
        manager: {
          select: {
            id: true,
            name: true,
          },
        },
        cycle: {
          select: {
            id: true,
            name: true,
            type: true,
          },
        },
      },
    })

    // Create notifications based on the update
    if (body.status === "completed" && existingReview.status !== "completed") {
      // Notify the employee that their review is completed
      const employeeNotification = await prisma.notification.create({
        data: {
          userId: existingReview.employeeId,
          type: "review",
          title: "Performance Review Completed",
          message: `Your ${existingReview.cycle.type} performance review has been completed`,
          data: {
            reviewId: updatedReview.id,
            cycleType: existingReview.cycle.type,
            cycleName: existingReview.cycle.name,
            overallRating,
          },
          organizationId: existingReview.employee.organizationId,
        },
      })

      await broadcastToUser(existingReview.employeeId, {
        type: "notification",
        data: {
          id: employeeNotification.id,
          type: employeeNotification.type,
          title: employeeNotification.title,
          message: employeeNotification.message,
          data: employeeNotification.data,
          createdAt: employeeNotification.createdAt.toISOString(),
          read: false,
        },
      })

      // Notify the manager that the review is completed
      if (existingReview.managerId !== user.id) {
        const managerNotification = await prisma.notification.create({
          data: {
            userId: existingReview.managerId,
            type: "review",
            title: "Performance Review Completed",
            message: `${existingReview.employee.name}'s ${existingReview.cycle.type} performance review has been completed`,
            data: {
              reviewId: updatedReview.id,
              employeeId: existingReview.employeeId,
              employeeName: existingReview.employee.name,
              cycleType: existingReview.cycle.type,
              cycleName: existingReview.cycle.name,
            },
            organizationId: existingReview.employee.organizationId,
          },
        })

        await broadcastToUser(existingReview.managerId, {
          type: "notification",
          data: {
            id: managerNotification.id,
            type: managerNotification.type,
            title: managerNotification.title,
            message: managerNotification.message,
            data: managerNotification.data,
            createdAt: managerNotification.createdAt.toISOString(),
            read: false,
          },
        })
      }
    } else if (body.managerFeedback && existingReview.employeeId !== user.id) {
      // Notify employee when manager provides feedback
      const feedbackNotification = await prisma.notification.create({
        data: {
          userId: existingReview.employeeId,
          type: "review",
          title: "Manager Feedback Added",
          message: `${existingReview.manager.name} has added feedback to your ${existingReview.cycle.type} performance review`,
          data: {
            reviewId: updatedReview.id,
            cycleType: existingReview.cycle.type,
            cycleName: existingReview.cycle.name,
          },
          organizationId: existingReview.employee.organizationId,
        },
      })

      await broadcastToUser(existingReview.employeeId, {
        type: "notification",
        data: {
          id: feedbackNotification.id,
          type: feedbackNotification.type,
          title: feedbackNotification.title,
          message: feedbackNotification.message,
          data: feedbackNotification.data,
          createdAt: feedbackNotification.createdAt.toISOString(),
          read: false,
        },
      })
    }

    // Calculate overall rating
    const overallRating = updatedReview.managerRating
      ? updatedReview.managerRating / 2
      : updatedReview.selfRating
        ? updatedReview.selfRating / 2
        : undefined

    // Transform to match the expected PerformanceReview type
    const transformedReview: PerformanceReview = {
      id: updatedReview.id,
      employeeId: updatedReview.employeeId,
      employeeName: updatedReview.employee.name,
      managerId: updatedReview.managerId,
      managerName: updatedReview.manager.name,
      type: updatedReview.cycle.type as "annual" | "mid_year" | "quarterly" | "probation" | "promotion",
      cycle: updatedReview.cycle.name as "Q1" | "Q2" | "Q3" | "Q4" | "Mid-Year" | "Annual",
      status: updatedReview.status,
      overallRating,
      scheduledDate: undefined,
      completedDate: updatedReview.status === "completed" ? updatedReview.updatedAt.toISOString() : undefined,
      createdAt: updatedReview.createdAt.toISOString(),
      updatedAt: updatedReview.updatedAt.toISOString(),
      sections: [],
      goals: [],
      developmentPlan: updatedReview.developmentPlan ? {
        strengths: [],
        areasForImprovement: [],
        developmentGoals: [],
        trainingNeeds: [],
      } : undefined,
    }

    return NextResponse.json<ReviewDetailResponse>({
      success: true,
      review: transformedReview,
    })
  } catch (error) {
    console.error("Update review error:", error)
    return NextResponse.json<ReviewDetailResponse>(
      {
        success: false,
        error: "Failed to update review",
      },
      { status: 500 },
    )
  }
}
