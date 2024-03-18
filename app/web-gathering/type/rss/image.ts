import * as re from "@lib/result/eager"
import * as safe from "@lib/safe"
import { G } from "ts-belt"
import * as v from "valibot/mod.ts"
import type { WebContentImage } from "../web-content.ts"

export const fromFeedImageToWebContentImage = v.transform(
  v.optional(
    v.object({
      url: v.optional(v.string()),
      title: v.optional(v.string()),
      width: v.optional(v.number([v.integer()])),
      height: v.optional(v.number([v.integer()])),
    }),
  ),
  (x): WebContentImage | undefined => {
    if (G.isNullable(x?.url)) return undefined

    const url = re.unwrapOr(safe.parseUrlSafe(x.url), undefined)

    if (G.isNullable(url)) return url

    return {
      url,
      alt: x.title,
      width: x.width,
      height: x.height,
    }
  },
)
