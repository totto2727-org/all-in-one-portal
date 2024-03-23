import { parseFeed } from "https://deno.land/x/rss@1.0.1/mod.ts"
import { parse as parseXml_ } from "https://deno.land/x/xml@2.1.3/mod.ts"
import { HTTPException } from "hono/http-exception"
import { AR, R, flow } from "ts-belt"

export const parseXml = flow(
  (v: string) => R.fromExecution(() => parseXml_(v)),
  R.mapError((e) => new HTTPException(500, e)),
)

export const parseRss = flow(
  (v: string) => R.fromPromise(parseFeed(v)),
  AR.mapError((e) => new HTTPException(500, e)),
)
