import { TodoRepository } from "@/src/domain/repositories/TodoRepository";

export class GetTodos {
  constructor(private todoRepository: TodoRepository) {}

  async execute() {
    return this.todoRepository.findAll()
  }
}