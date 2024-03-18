import type { SourceRssMessage } from "@/app/web-gathering/source-rss.ts"
import { queuePathToCronName } from "@/lib/cron/index.ts"
import { createMessage } from "@/lib/queue/index.ts"
import { Hono } from "hono"
import * as sourceRss from "./source-rss.ts"

export const path = "/web-gathering-trigger-cron"

export const name = queuePathToCronName(path)

export const schedule = "*/1 * * * *"

export const executer = new Hono().get("/", async () => {
  const kv = await Deno.openKv()

  const sourceRssMessage: SourceRssMessage = createMessage(sourceRss.path, {})

  await kv.enqueue(sourceRssMessage)

  return new Response()
})
