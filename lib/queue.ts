import { _TextDecoder } from "https://deno.land/std@0.132.0/node/_utils.ts"
import type { Message } from "@/lib/message.ts"
import { type AR, R } from "ts-belt"

type MessageHandler = (message: Message) => Promise<void>

type EnqueueRepository = (message: Message) => AR.AsyncResult<void, Error>

type ListenQueueRepository = (
  handler: MessageHandler,
) => AR.AsyncResult<void, Error>

export const createEnqueueRepository: (kv: Deno.Kv) => EnqueueRepository =
  (kv) => (message) =>
    // 返り値が不要のため削除
    R.fromPromise(kv.enqueue(message).then())

export const createListenQueueRepository: (
  kv: Deno.Kv,
) => ListenQueueRepository = (kv) => (handler) =>
  R.fromPromise(kv.listenQueue(handler))
