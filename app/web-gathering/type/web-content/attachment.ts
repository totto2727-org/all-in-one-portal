import * as v from "valibot/mod.ts"
import { sortedUrlString } from "@/lib/type.ts"

// 関連ファイル
export const attachmentValidator = v.object({
  url: sortedUrlString,
  mimeType: v.optional(v.string()),
  sizeInBytes: v.optional(v.number([v.integer()])),
})
