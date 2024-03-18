import { vValidator } from "@/lib/hono/valibot.ts"
import { type MessageSatisfies, createMessage } from "@/lib/queue/index.ts"
import { Hono } from "hono"
import { A, F, pipe } from "ts-belt"
import * as v from "valibot/mod.ts"

export const path = "/web-gathering-source-rss"

export const sourceRssMessage = v.object({
  path: v.literal(path),
  body: v.object({}),
} satisfies MessageSatisfies)

export type SourceRssMessage = v.Input<typeof sourceRssMessage>

export const executer = new Hono().post(
  "/",
  vValidator("json", sourceRssMessage),
  async () => {
    const kv = await Deno.openKv()

    const messages = [
      createMessage("/web-gathering-reader-rss", {
        url: "https://zenn.dev/totto2727/feed",
      }),
    ]

    const rejected = await pipe(
      messages,
      A.map((message) => kv.enqueue(message)),
      (v) =>
        Promise.allSettled(v).then(A.filter((v) => v.status === "rejected")),
    )

    if (A.isEmpty(rejected)) return new Response()

    // TODO: error handling for enqueue
    pipe(
      rejected,
      F.tap((rejected) => console.log(rejected)),
    )

    return new Response()
  },
)
