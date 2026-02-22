import { z } from "zod"

export const createTodoSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title must be less than 100 characters"),
})

export type CreateTodoInput = z.infer<typeof createTodoSchema>