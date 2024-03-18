import * as v from "valibot/mod.ts"

export const imageValidator = v.object({
  url: v.instance(URL),
  alt: v.optional(v.string()),
  width: v.optional(v.number([v.integer()])),
  height: v.optional(v.number([v.integer()])),
})
