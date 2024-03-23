import { type Message, toRequest } from "@/lib/message.ts"
import type { Hono } from "hono"
import type { ListenQueueRepository } from "../repository.ts"

export class DenoHonoListenQueueRepository
  implements ListenQueueRepository<void>
{
  constructor(
    private readonly kv: Deno.Kv,
    private readonly hono: Hono,
  ) {
    this.hono = hono
  }

  listenQueue() {
    return this.kv.listenQueue(async (message: Message) => {
      const request = toRequest(message)

      const result = await this.hono.fetch(request)

      if (!result.ok) {
        throw new Error(
          `Failed to enqueueQueue ${message.path}: ${result.status} ${
            result.statusText
          } ${JSON.stringify(message.body)}`,
        )
      }
    })
  }
}
