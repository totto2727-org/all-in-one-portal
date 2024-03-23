import type { HTTPException } from "hono/http-exception"
import type { AR } from "ts-belt"
import type { Message } from "../message/message.ts"

export type EnqueueRepository<T = unknown> = {
  enqueue(message: Message): AR.AsyncResult<T, HTTPException>
}

export type ListenQueueRepository<T> = {
  listenQueue(): Promise<T>
}
