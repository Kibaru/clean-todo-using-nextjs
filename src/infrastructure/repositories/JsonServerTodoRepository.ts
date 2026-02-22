import { TodoRepository } from "@/src/domain/repositories/TodoRepository"
import { Todo } from "@/src/domain/entities/Todo"

const BASE_URL = "http://localhost:4000/todos"

export class JsonServerTodoRepository implements TodoRepository {

  async create(todo: Todo): Promise<void> {
    await fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(todo)
    })
  }

  async findAll(): Promise<Todo[]> {
    const res = await fetch(BASE_URL)
    return res.json()
  }

  async findById(id: string): Promise<Todo | null> {
    const res = await fetch(`${BASE_URL}/${id}`)

    if (!res.ok) return null

    return res.json()
  }

  async update(todo: Todo): Promise<void> {
    await fetch(`${BASE_URL}/${todo.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(todo)
    })
  }

  async delete(id: string): Promise<void> {
    await fetch(`${BASE_URL}/${id}`, {
      method: "DELETE"
    })
  }
}