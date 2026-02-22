import { ValidationError } from "@/src/shared/errors/ValidationError"

export class CreateTodoValidator {
  static validate(title: string) {
    if (!title || title.trim().length === 0) {
      throw new ValidationError("Title cannot be empty")
    }
  }
}