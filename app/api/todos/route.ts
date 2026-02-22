import { CreateTodo } from "@/src/application/use-cases/CreateTodo"
import { GetTodos } from "@/src/application/use-cases/GetTodos"
import { InMemoryTodoRepository } from "@/src/infrastructure/repositories/InMemoryTodoRepository"
import { container } from "@/src/shared/container"
import { NextResponse } from "next/server"

// const repository = new InMemoryTodoRepository()

export async function GET() {
  // const useCase = new GetTodos(repository)
  // const todos = await useCase.execute()
  const todos = await container.getTodos.execute()

  return NextResponse.json(todos)
}

export async function POST(request: Request) {
  const body = await request.json()

  // const useCase = new CreateTodo(repository)
  // const todo = await useCase.execute(body.title)
  const todo = await container.createTodo.execute(body.title)

  return NextResponse.json(todo)
}