import { parseUrlSafe } from "jsr:@totto/lib@0.1.2/safe"
import type { WebContentLink } from "@/app/web-gathering/type/web-content.ts"
import * as re from "@lib/result/eager"
import { A, G } from "ts-belt"
import * as v from "valibot/mod.ts"

export const fromFeedLinkToWebContentLink = v.transform(
  v.optional(
    v.object({
      rel: v.optional(v.string()),
      type: v.optional(v.string()),
      href: v.optional(v.string()),
      title: v.optional(v.string()),
    }),
  ),
  (x): WebContentLink | undefined => {
    if (G.isNullable(x?.href)) return undefined

    const url = re.unwrapOr(parseUrlSafe(x.href), undefined)

    if (G.isNullable(url)) return undefined

    return {
      url,
      rel: x.rel,
      type: x.type,
      title: x.title,
    }
  },
)

export const fromFeedLinksToWebContentLinks = v.transform(
  v.optional(v.array(fromFeedLinkToWebContentLink)),
  (x): WebContentLink[] => {
    return A.filter(x ?? [], G.isNotNullable)
  },
)
