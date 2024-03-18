import * as v from "valibot/mod.ts"

export const categoryValidator = v.object({
  name: v.optional(v.string()),
  value: v.string(),
})
