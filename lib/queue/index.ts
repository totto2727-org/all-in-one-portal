import type { Message } from "@/lib/queue/index.ts"
import { createRequest } from "@/lib/request/index.ts"
import type { Hono } from "hono"

export * from "./type.ts"
export * from "./factory.ts"

export async function listenQueue(hono: Hono) {
  const kv = await Deno.openKv()

  kv.listenQueue(async (message: Message<string, unknown>) => {
    const request = createRequest(message.path, message)

    const result = await hono.fetch(request)

    if (!result.ok) {
      throw new Error(
        `Failed to listenQueue ${message.path}: ${result.status} ${
          result.statusText
        } ${JSON.stringify(message.body)}`,
      )
    }
  })
}
