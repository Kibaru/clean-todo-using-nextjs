import { TodoRepository } from "@/src/domain/repositories/TodoRepository"

export class DeleteTodo {
  constructor(private repository: TodoRepository) {}

  async execute(id: string): Promise<void> {
    const existing = await this.repository.findById(id)

    if (!existing) {
      throw new Error("Todo not found")
    }

    await this.repository.delete(id)
  }
}