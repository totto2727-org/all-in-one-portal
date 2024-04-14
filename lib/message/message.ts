import type { UnknownRecord } from "@/lib/type.ts"
import * as v from "valibot/mod.ts"

const messageValidator = v.object({
  path: v.string(),
  body: v.record(v.unknown()),
})

export type Message = v.Output<typeof messageValidator>

export type MessageSatisfies = {
  [key in keyof Message]: unknown
}

export function createMessage(path: string, body: UnknownRecord): Message {
  return {
    path,
    body,
  }
}
