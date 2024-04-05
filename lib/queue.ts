import type { Message } from "@/lib/message.ts"
import { AR, G, R } from "ts-belt"
import { pipe } from "ts-belt"
import { depend } from "velona"

export type MessageHandler = (message: Message) => Promise<void>

// TODO 返り値の定義を厳密にする
type Enqueue = (message: Message) => AR.AsyncResult<null, Error>

type ListenQueue = (handler: MessageHandler) => AR.AsyncResult<null, Error>

type QueueClient = {
  enqueue: Enqueue
  listenQueue: ListenQueue
}

export class DenoQueueClient implements QueueClient {
  constructor(private readonly kv: Promise<Deno.Kv>) {}

  async enqueue(message: Message): AR.AsyncResult<null, Error> {
    const kv = await this.kv

    return pipe(
      kv.enqueue(message),
      R.fromPromise,
      AR.map(() => null),
    )
  }

  async listenQueue(handler: MessageHandler): AR.AsyncResult<null, Error> {
    const kv = await this.kv

    return pipe(
      kv.listenQueue(handler),
      R.fromPromise,
      AR.map(() => null),
    )
  }

  async [Symbol.asyncDispose]() {
    const kv = await this.kv
    kv.close()
  }
}

let denoKvSingleton: QueueClient | null = null

const createDenoQueueClient = depend({ kv: Deno.openKv() }, (di) => {
  if (G.isNotNullable(denoKvSingleton)) return denoKvSingleton

  const client = new DenoQueueClient(di.kv)
  denoKvSingleton = client
  return client
})

export const enqueuRepository = depend(
  {
    queueClient: createDenoQueueClient(),
  },
  async ({ queueClient }, message: Message) => {
    return queueClient.enqueue(message)
  },
)

export const listenQueueRepository = depend(
  {
    queueClient: createDenoQueueClient(),
  },
  async ({ queueClient }, handler: (message: Message) => Promise<void>) => {
    return queueClient.listenQueue(handler)
  },
)
