import { createHonoCron } from "@/lib/cron.ts"
import { enqueuRepository } from "@/lib/queue.ts"
import { Hono } from "hono"
import { HTTPException } from "hono/http-exception"
import { R } from "ts-belt"
import { depend } from "velona"

const path = "/web-gathering/trigger"

const schedule = "0 */1 * * *"

export const triggerRssUseCase = depend(
  { enqueueRepository: enqueuRepository },
  (di) => {
    return di.enqueueRepository({
      path: "/web-gathering/source-rss",
      body: {},
    })
  },
)

const hono = new Hono().get(path, async () => {
  const result = await triggerRssUseCase()

  if (R.isError(result)) {
    throw new HTTPException(500, result._0)
  }

  return new Response()
})

export const cron = createHonoCron(hono, schedule, path)
