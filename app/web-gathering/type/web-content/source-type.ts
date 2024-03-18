import * as v from "valibot/mod.ts"

export const sourceTypeValidator = v.variant("type", [
  v.object({
    type: v.literal("rss"),
    details: v.union([
      v.literal("ATOM"),
      v.literal("JSON Feed"),
      v.literal("RSS 1.0"),
      v.literal("RSS 2.0"),
    ]),
  }),
  v.object({ type: v.literal("html") }),
])
