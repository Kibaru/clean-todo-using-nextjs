import { Todo } from "@/src/domain/entities/Todo"
import { TodoRepository } from "@/src/domain/repositories/TodoRepository"
import { randomUUID } from "crypto"
import { CreateTodoValidator } from "../validators/CreateTodoValidator"

export class CreateTodo {
  constructor(private todoRepository: TodoRepository) {}

  async execute(title: string): Promise<Todo> {
    CreateTodoValidator.validate(title)

    const todo: Todo = {
      id: randomUUID(),
      title,
      completed: false,
      createdAt: new Date()
    }

    await this.todoRepository.create(todo)

    return todo
  }
}
