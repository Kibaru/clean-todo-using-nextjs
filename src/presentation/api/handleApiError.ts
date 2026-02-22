import { NextResponse } from "next/server"
import { AppError } from "@/src/shared/errors/AppError"

export function handleApiError(error: unknown) {
  console.error("API Error:", error)

  if (error instanceof AppError) {
    return NextResponse.json(
      { message: error.message },
      { status: error.statusCode }
    )
  }

  return NextResponse.json(
    { message: "Internal Server Error" },
    { status: 500 }
  )
}