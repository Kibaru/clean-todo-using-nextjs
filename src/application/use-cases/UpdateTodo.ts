import { TodoRepository } from "@/src/domain/repositories/TodoRepository"
import { Todo } from "@/src/domain/entities/Todo"
import { NotFoundError } from "@/src/shared/errors/NotFoundError"

export class UpdateTodo {
  constructor(private repository: TodoRepository) {}

  async execute(id: string, title: string, completed: boolean): Promise<Todo> {
    const existing = await this.repository.findById(id)

    if (!existing) {
      throw new NotFoundError("Todo not found")
    }

    if (!title || title.trim().length === 0) {
      throw new Error("Title cannot be empty")
    }

    const updated: Todo = {
      ...existing,
      title,
      completed
    }

    await this.repository.update(updated)

    return updated
  }
}