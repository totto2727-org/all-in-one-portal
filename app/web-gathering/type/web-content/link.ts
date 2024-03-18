import * as v from "valibot/mod.ts"

export const linkValidator = v.object({
  url: v.instance(URL),
  // リンクの性質 代替リンク、リソースへの直接リンクなど
  rel: v.optional(v.string()),
  // 取得するコンテンツそのもの性質
  type: v.optional(v.string()),
  title: v.optional(v.string()),
})
