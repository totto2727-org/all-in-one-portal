import { createRequest } from "@/lib/request/index.ts"
import type { Hono } from "hono"

export function createCron(hono: Hono, path: string) {
  return async () => {
    const result = await hono.fetch(createRequest(path))

    // TODO 例外処理
    if (!result.ok) {
      throw new Error(
        `Failed to cron ${path}: ${result.status} ${result.statusText}`,
      )
    }
  }
}

export function queuePathToCronName(path: string): string {
  return path.split("/").join("-")
}
