import { apiFetch } from "./app-client"

export interface Todo {
  id: string
  title: string
  completed: boolean
}

export function getTodos() {
  return apiFetch<Todo[]>("/api/todos")
}

export function createTodo(title: string) {
  return apiFetch<Todo>("/api/todos", {
    method: "POST",
    body: JSON.stringify({ title }),
  })
}

export function updateTodo(
  id: string,
  data: Partial<Todo>
) {
  return apiFetch<Todo>(`/api/todos/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  })
}

export function deleteTodo(id: string) {
  return apiFetch<void>(`/api/todos/${id}`, {
    method: "DELETE",
  })
}