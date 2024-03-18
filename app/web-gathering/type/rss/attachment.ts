import { parseUrlSafe } from "jsr:@totto/lib@0.1.2/safe"
import * as re from "@lib/result/eager"
import { A, G } from "ts-belt"
import * as v from "valibot/mod.ts"
import type { WebContentAttachment } from "../web-content.ts"

const fromFeedCategoryToWebContentCategory = v.transform(
  v.object({
    url: v.optional(v.string()),
    mimeType: v.optional(v.string()),
    sizeInBytes: v.optional(v.number([v.integer()])),
  }),
  (v): WebContentAttachment | undefined => {
    if (G.isNullable(v.url)) return undefined

    const url = re.unwrapOr(parseUrlSafe(v.url), undefined)

    if (G.isNullable(url)) return undefined

    return {
      url,
      mimeType: v.mimeType,
      sizeInBytes: v.sizeInBytes,
    }
  },
)

export const fromFeedAttachmentsToWebContentAttachments = v.transform(
  v.optional(v.array(fromFeedCategoryToWebContentCategory)),
  (v): WebContentAttachment[] => A.filter(v ?? [], G.isNotNullable),
)
