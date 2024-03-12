import { Hono } from "hono/mod.ts"
import { createRequest } from "@/lib/request/index.ts"
import { Message } from "@/lib/queue/index.ts"

export * from "./type.ts"
export * from "./factory.ts"

export async function listenQueue(hono: Hono) {
  const kv = await Deno.openKv()

  kv.listenQueue(async (message: Message<unknown>) => {
    const request = createRequest(message.path, message.body)

    await hono.fetch(request)

    // TODO 例外処理
  })
}
