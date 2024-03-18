import { fetchResult } from "@/lib/fetch/index.ts"
import { vValidator } from "@/lib/hono/valibot.ts"
import type { MessageSatisfies } from "@/lib/queue/index.ts"
import { resToText } from "@/lib/response/index.ts"
import { parseRss } from "@/lib/rss/index.ts"
import { Hono } from "hono"
import { AR, R, pipe } from "ts-belt"
import * as v from "valibot/mod.ts"
import { fromFeedToWebContent } from "./type/rss.ts"

export const path = "/web-gathering-reader-rss"

const readerRssMessage = v.object({
  path: v.literal(path),
  body: v.object({
    url: v.string([v.url()]),
  }),
} satisfies MessageSatisfies)

export const executer = new Hono().post(
  "/",
  vValidator("json", readerRssMessage),
  async (cx) => {
    const { body: source } = cx.req.valid("json")

    const result = await pipe(
      source.url,
      fetchResult,
      AR.flatMap(resToText),
      AR.flatMap(parseRss),
      AR.fold(fromFeedToWebContent),
      AR.tap((v) => console.log(v)),
    )

    if (R.isError(result)) {
      console.error(result)
      return new Response("Error", { status: 500 })
    }

    return new Response()
  },
)

export type ReaderRssMessage = v.Input<typeof readerRssMessage>
