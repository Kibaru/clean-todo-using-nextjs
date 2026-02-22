import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
  Todo,
} from "@/lib/api/todos"

export function useTodos() {
  return useQuery({
    queryKey: ["todos"],
    queryFn: getTodos,
  })
}

export function useCreateTodo() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (title: string) => createTodo(title),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] })
    },
  })
}

export function useUpdateTodo() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Todo> }) =>
      updateTodo(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] })
    },
  })
}

export function useDeleteTodo() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => deleteTodo(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] })
    },
  })
}