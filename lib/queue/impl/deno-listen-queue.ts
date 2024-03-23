import type { Message } from "../../message/message.ts"
import type { ListenQueueRepository } from "../repository.ts"

export class DenoQueueRepository implements ListenQueueRepository<void> {
  constructor(
    private readonly kv: Deno.Kv,
    private readonly fn: (message: Message) => Promise<void>,
  ) {
    this.kv = kv
  }

  listenQueue() {
    return this.kv.listenQueue(this.fn)
  }
}
