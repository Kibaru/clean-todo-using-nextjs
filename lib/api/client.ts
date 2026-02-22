export class ApiError extends Error {
  status: number
  data?: unknown

  constructor(message: string, status: number, data?: unknown) {
    super(message)
    this.status = status
    this.data = data
  }
}

export async function apiFetch<T>(
  url: string,
  options: RequestInit = {}
): Promise<T> {
  const res = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    credentials: "include",
  })

  let data: unknown = null

  try {
    data = await res.json()
  } catch {
    // ignore if no JSON body
  }

  if (!res.ok) {
    throw new ApiError(
      (data as any)?.message || "Request failed",
      res.status,
      data
    )
  }

  return data as T
}