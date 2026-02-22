import { Todo } from "@/src/domain/entities/Todo"
import { TodoDto } from "../dto/TodoDto"

export class TodoMapper {
  static toDto(todo: Todo): TodoDto {
    return {
      id: todo.id,
      title: todo.title,
      completed: todo.completed
    }
  }

  static toDtoList(todos: Todo[]): TodoDto[] {
    return todos.map(this.toDto)
  }
}