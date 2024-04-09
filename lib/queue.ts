import type { Message } from "@/lib/message.ts"
import { R } from "ts-belt"
import { depend } from "velona"

type MessageHandler = (message: Message) => Promise<void>

type Enqueue<T> = (message: Message) => Promise<T>

type ListenQueue<T> = (handler: MessageHandler) => Promise<T>

type QueueClient<T = void, U = void> = {
  enqueue: Enqueue<T>
  listenQueue: ListenQueue<U>
}

using queueClient: QueueClient<Deno.KvCommitResult> = await Deno.openKv()

export const enqueuRepository = depend(
  { queueClient },
  async (di, message: Message) => {
    return await R.fromPromise(di.queueClient.enqueue(message))
  },
)

export const listenQueueRepository = depend(
  { queueClient },
  async (di, handler: MessageHandler) => {
    return await R.fromPromise(di.queueClient.listenQueue(handler))
  },
)
