// services/api.ts
'use client'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3333'

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = typeof window !== 'undefined'
    ? localStorage.getItem('tracklog:token')
    : null

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'Erro na requisição')
  }

  return response.json() as Promise<T>
}

export const api = {
  post: <T>(path: string, body: unknown) =>
    request<T>(path, { method: 'POST', body: JSON.stringify(body) }),

  get: <T>(path: string) =>
    request<T>(path, { method: 'GET' }),
}