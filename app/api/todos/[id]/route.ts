import { container } from "@/src/shared/container"
import { TodoMapper } from "@/src/application/mappers/TodoMapper"
import { withErrorHandler } from "@/src/presentation/api/withErrorHandler"

export const PUT = withErrorHandler(
  async (request: Request, context: { params: Promise<{ id: string }> }) => {
    const { id } = await context.params
    const body = await request.json()

    const updated = await container.updateTodo.execute(
      id,
      body.title,
      body.completed
    )

    return Response.json(TodoMapper.toDto(updated))
  }
)

export const DELETE = withErrorHandler(
  async (request: Request, context: { params: Promise<{ id: string }> }) => {
    const { id } = await context.params

    await container.deleteTodo.execute(id)

    return Response.json({ message: "Deleted" })
  }
)