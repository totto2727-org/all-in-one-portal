import { vValidator } from "@/lib/hono/valibot.ts"
import { type Void, okVoid } from "@/lib/type.ts"
import { Hono } from "hono"
import type { AR } from "ts-belt"
import * as v from "valibot/mod.ts"

export async function createGetRssTargetListUseCase(): AR.AsyncResult<
  Void,
  Error
> {
  return okVoid()
}
export async function createFetchRssUseCase(): AR.AsyncResult<Void, Error> {
  return okVoid()
}
export async function createSaveRssInDb(): AR.AsyncResult<Void, Error> {
  return okVoid()
}

const hono = new Hono()
  .post("/get-rss-target-list", vValidator("json", v.object({})), async () => {
    return new Response()
  })
  .post("/fetch-rss", vValidator("json", v.object({})), async () => {
    return new Response()
  })
  .post("/save-rss-in-db", vValidator("json", v.object({})), async () => {
    return new Response()
  })
