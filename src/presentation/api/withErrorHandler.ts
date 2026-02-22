import { handleApiError } from "./handleApiError"

export function withErrorHandler(
  handler: Function
) {
  return async (...args: any[]) => {
    try {
      return await handler(...args)
    } catch (error) {
      return handleApiError(error)
    }
  }
}