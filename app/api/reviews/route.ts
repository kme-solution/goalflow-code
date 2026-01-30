import { type NextRequest, NextResponse } from "next/server"
import { MOCK_REVIEWS } from "@/lib/mock-data/reviews"
import type { ReviewListResponse } from "@/lib/types/review.types"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const employeeId = searchParams.get("employeeId")
    const managerId = searchParams.get("managerId")
    const status = searchParams.get("status")

    let filteredReviews = [...MOCK_REVIEWS]

    if (employeeId) {
      filteredReviews = filteredReviews.filter((review) => review.employeeId === employeeId)
    }

    if (managerId) {
      filteredReviews = filteredReviews.filter((review) => review.managerId === managerId)
    }

    if (status) {
      filteredReviews = filteredReviews.filter((review) => review.status === status)
    }

    return NextResponse.json<ReviewListResponse>({
      success: true,
      reviews: filteredReviews,
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
