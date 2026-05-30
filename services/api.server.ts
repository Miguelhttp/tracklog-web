// services/api.server.ts
import { cookies } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3333";

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const cookieStore = await cookies();
  const token = cookieStore.get("tracklog-token")?.value ?? null;

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Erro na requisição");
  }

  return response.json() as Promise<T>;
}

export const apiServer = {
  get: <T>(path: string) => request<T>(path, { method: "GET" }),
};
