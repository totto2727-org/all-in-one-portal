import * as v from "valibot/mod.ts"

// 関連ファイル
export const attachmentValidator = v.object({
  url: v.instance(URL),
  mimeType: v.optional(v.string()),
  sizeInBytes: v.optional(v.number([v.integer()])),
})
