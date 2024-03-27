import * as v from "valibot/mod.ts"
import { sortedUrlString } from "@/lib/type.ts"

export const imageValidator = v.object({
  url: sortedUrlString,
  alt: v.optional(v.string()),
  width: v.optional(v.number([v.integer()])),
  height: v.optional(v.number([v.integer()])),
})
