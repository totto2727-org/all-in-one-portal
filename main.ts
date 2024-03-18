import { Hono } from "hono"
import { logger } from "hono/logger"

import { createCron } from "@/lib/cron/index.ts"
import { listenQueue } from "@/lib/queue/index.ts"
import * as webGathering from "./app.ts"

const hono = new Hono()
hono.use(logger())

// cron
hono.route(webGathering.cron.path, webGathering.cron.executer)

// listen queue
hono.route(webGathering.sourceRss.path, webGathering.sourceRss.executer)
hono.route(webGathering.readerRss.path, webGathering.readerRss.executer)
// hono.route(webGathering.saveKv.path, webGathering.saveKv.executer)

Deno.cron(
  webGathering.cron.name,
  webGathering.cron.schedule,
  createCron(hono, webGathering.cron.path),
)

await listenQueue(hono)
