import { G, R } from "ts-belt"
import * as v from "valibot/mod.ts"

export type UnknownRecord = Record<string, unknown>

// biome-ignore lint/suspicious/noConfusingVoidType: <explanation>
export type Void = void | undefined

export function okVoid(): R.Ok<undefined> {
  return R.Ok(undefined)
}

export const isoDateTimeString = v.transform(
  v.union([v.string([v.isoTimestamp()]), v.date()]),
  (i) => {
    return G.isDate(i) ? i.toISOString() : new Date(i as string).toISOString()
  },
)

export const sortedUrlString = v.transform(
  v.union([v.string([v.url()]), v.instance(URL)]),
  (i) => {
    const url = i instanceof URL ? i : new URL(i as string)
    url.searchParams.sort()
    return url.toJSON()
  },
)
