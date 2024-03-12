import { Hono } from "hono/mod.ts"
import { createRequest } from "@/lib/request/index.ts"

export function createCron(hono: Hono, path: string) {
  return async () => {
    await hono.fetch(createRequest(path))
  }

  // TODO 例外処理
}

export function queuePathToCronName(path: string): string {
  return path.split("/").join("-")
}
