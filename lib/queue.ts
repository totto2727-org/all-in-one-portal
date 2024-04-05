import type { Message } from "@/lib/message.ts"
import { HTTPException } from "hono/http-exception"
import { AR, G, R } from "ts-belt"
import { pipe } from "ts-belt"
import type { EmptyObject, UnknownRecord } from "type-fest"
import { depend } from "velona"

export type MessageHandler = (message: Message) => Promise<void>

// TODO 返り値の定義を厳密にする
type Enqueue = (message: Message) => AR.AsyncResult<null, Error>

type ListenQueue = (handler: MessageHandler) => AR.AsyncResult<null, Error>

type QueueClient = {
  enqueue: Enqueue
  listenQueue: ListenQueue
}

class DenoQueueClient implements QueueClient {
  private kv: Deno.Kv | undefined

  private async openKv(): Promise<Deno.Kv> {
    if (this.kv) return this.kv

    this.kv = await Deno.openKv()
    return this.kv
  }

  async enqueue(message: Message): AR.AsyncResult<null, Error> {
    const kv = await this.openKv()
    return pipe(
      kv.enqueue(message),
      R.fromPromise,
      AR.map(() => null),
    )
  }

  async listenQueue(handler: MessageHandler): AR.AsyncResult<null, Error> {
    const kv = await this.openKv()
    return pipe(
      kv.listenQueue(handler),
      R.fromPromise,
      AR.map(() => null),
    )
  }
}

const denoKvSingleton: QueueClient = new DenoQueueClient()

export const enqueuRepository = depend(
  {
    queueClient: denoKvSingleton,
  },
  async ({ queueClient }, message: Message) => {
    return queueClient.enqueue(message)
  },
)

export const listenQueueRepository = depend(
  {
    queueClient: denoKvSingleton,
  },
  async ({ queueClient }, handler: (message: Message) => Promise<void>) => {
    return queueClient.listenQueue(handler)
  },
)
