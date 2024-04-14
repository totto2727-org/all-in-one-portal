import { createCronFromFetcher } from "@/lib/cron.ts"
import type { Message } from "@/lib/message.ts"
import { createEnqueueRepository } from "@/lib/queue.ts"
import { Hono } from "hono"
import { HTTPException } from "hono/http-exception"
import { type AR, R } from "ts-belt"
import { getFullPath } from "./const.ts"

const path = getFullPath("triggerByCron")

const schedule = "0 */1 * * *"

export function createTriggerRssUseCase<T>(
  enqueueRepository: (message: Message) => AR.AsyncResult<T, Error>,
): () => AR.AsyncResult<void, Error> {
  return async () => {
    const queueResult = await enqueueRepository({
      path: "/web-gathering/source-rss",
      body: {},
    })

    if (R.isError(queueResult)) {
      return queueResult
    }

    return R.Ok(undefined)
  }
}

const hono = new Hono().get(path, async () => {
  await using queueClient = await Deno.openKv()
  const enqueueRepository = createEnqueueRepository(queueClient)
  const triggerRssUseCase = createTriggerRssUseCase(enqueueRepository)

  const result = await triggerRssUseCase()

  if (R.isError(result)) {
    console.error(result._0)
    throw new HTTPException(500, result._0)
  }

  return new Response()
})

export const cron = createCronFromFetcher(hono, schedule, path)
