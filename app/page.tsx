"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import {
  createTodoSchema,
  CreateTodoInput,
} from "@/src/presentation/schemas/todo"

import {
  useTodos,
  useCreateTodo,
  useUpdateTodo,
  useDeleteTodo,
} from "@/lib/hooks/useTodos"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"

import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form"

export default function Home() {
  const { data: todos, isLoading, isError } = useTodos()
  const createMutation = useCreateTodo()
  const updateMutation = useUpdateTodo()
  const deleteMutation = useDeleteTodo()

  const [editingId, setEditingId] = useState<string | null>(null)

  // Create form
  const createForm = useForm<CreateTodoInput>({
    resolver: zodResolver(createTodoSchema),
    defaultValues: { title: "" },
  })

  // Edit form (separate form instance!)
  const editForm = useForm<CreateTodoInput>({
    resolver: zodResolver(createTodoSchema),
    defaultValues: { title: "" },
  })

  function onCreate(values: CreateTodoInput) {
    createMutation.mutate(values.title)
    createForm.reset()
  }

  function onEdit(values: CreateTodoInput) {
    if (!editingId) return

    updateMutation.mutate(
      {
        id: editingId,
        data: { title: values.title },
      },
      {
        onSuccess: () => {
          setEditingId(null)
          editForm.reset()
        },
      }
    )
  }

  function startEditing(id: string, currentTitle: string) {
    setEditingId(id)
    editForm.reset({ title: currentTitle })
  }

  if (isLoading) return <p className="p-8">Loading...</p>
  if (isError) return <p className="p-8 text-red-500">Error loading todos</p>

  return (
    <main className="min-h-screen bg-muted p-8 flex justify-center">
      <div className="w-full max-w-xl space-y-6">
        <h1 className="text-3xl font-bold text-center">
          Clean Architecture Todo
        </h1>

        {/* CREATE */}
        <Card>
          <CardContent className="p-4">
            <Form {...createForm}>
              <form
                onSubmit={createForm.handleSubmit(onCreate)}
                className="flex gap-2 items-start"
              >
                <FormField
                  control={createForm.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <Input placeholder="Enter todo..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  disabled={createMutation.isPending}
                >
                  {createMutation.isPending ? "Adding..." : "Add"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        {/* LIST */}
        <div className="space-y-3">
          {todos?.map(todo => (
            <Card key={todo.id}>
              <CardContent className="p-4 space-y-2">

                <div className="flex items-center justify-between gap-3">

                  <div className="flex items-center gap-3 w-full">
                    <Checkbox
                      checked={todo.completed}
                      onCheckedChange={(checked) =>
                        updateMutation.mutate({
                          id: todo.id,
                          data: { completed: !!checked },
                        })
                      }
                    />

                    {editingId === todo.id ? (
                      <Form {...editForm}>
                        <form
                          onSubmit={editForm.handleSubmit(onEdit)}
                          className="flex-1"
                        >
                          <FormField
                            control={editForm.control}
                            name="title"
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </form>
                      </Form>
                    ) : (
                      <span
                        className={`flex-1 ${
                          todo.completed
                            ? "line-through text-muted-foreground"
                            : ""
                        }`}
                      >
                        {todo.title}
                      </span>
                    )}
                  </div>

                  <div className="flex gap-2">
                    {editingId === todo.id ? (
                      <>
                        <Button
                          size="sm"
                          onClick={editForm.handleSubmit(onEdit)}
                          disabled={updateMutation.isPending}
                        >
                          {updateMutation.isPending
                            ? "Saving..."
                            : "Save"}
                        </Button>

                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() => {
                            setEditingId(null)
                            editForm.reset()
                          }}
                        >
                          Cancel
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() =>
                            startEditing(todo.id, todo.title)
                          }
                        >
                          Edit
                        </Button>

                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() =>
                            deleteMutation.mutate(todo.id)
                          }
                        >
                          Delete
                        </Button>
                      </>
                    )}
                  </div>
                </div>

              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </main>
  )
}