// import { InMemoryTodoRepository } from "@/src/infrastructure/repositories/InMemoryTodoRepository"
import { JsonServerTodoRepository } from "@/src/infrastructure/repositories/JsonServerTodoRepository"
import { CreateTodo } from "@/src/application/use-cases/CreateTodo"
import { GetTodos } from "@/src/application/use-cases/GetTodos"
import { UpdateTodo } from "@/src/application/use-cases/UpdateTodo"
import { DeleteTodo } from "@/src/application/use-cases/DeleteTodo"

// const repository = new InMemoryTodoRepository()
const repository = new JsonServerTodoRepository()

export const container = {
  createTodo: new CreateTodo(repository),
  getTodos: new GetTodos(repository),
  updateTodo: new UpdateTodo(repository),
  deleteTodo: new DeleteTodo(repository)
}