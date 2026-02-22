import { TodoRepository } from "@/src/domain/repositories/TodoRepository"
import { todos } from "../database/InMemoryDatabase"
import { Todo } from "@/src/domain/entities/Todo"

export class InMemoryTodoRepository implements TodoRepository {
  async create(todo: Todo): Promise<void> {
    todos.push(todo)
  }

  async findAll(): Promise<Todo[]> {
    return todos
  }

  async findById(id: string): Promise<Todo | null> {
    return todos.find(t => t.id === id) || null
  }

  async update(todo: Todo): Promise<void> {
    const index = todos.findIndex(t => t.id === todo.id)
    if (index !== -1) {
      todos[index] = todo
    }
  }

  async delete(id: string): Promise<void> {
    const index = todos.findIndex(t => t.id === id)
    if (index !== -1) {
      todos.splice(index, 1)
    }
  }
}