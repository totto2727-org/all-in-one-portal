import { isoDateTimeString } from "@/lib/type.ts"
import { G } from "ts-belt"
import * as v from "valibot/mod.ts"
import { attachmentValidator } from "./attachment.ts"
import { categoryValidator } from "./category.ts"
import { linkValidator } from "./link.ts"

export const itemRequiredValidator = v.object({
  id: v.string(),
  title: v.string(),
  links: v.transform(
    v.array(v.fallback(v.optional(linkValidator), undefined)),
    (v) => v.filter(G.isNotNullable),
  ),
  attachments: v.transform(
    v.array(v.fallback(v.optional(attachmentValidator), undefined)),
    (v) => v.filter(G.isNotNullable),
  ),

  categories: v.transform(
    v.array(v.fallback(v.optional(categoryValidator), undefined)),
    (v) => v.filter(G.isNotNullable),
  ),

  // 共著者
  contributors: v.array(v.string()),
})

export const itemOptionalValidator = v.object({
  description: v.string(),
  author: v.string(),
  // createdAtはRSSに存在しないためpublishedAtを流用する
  createdAt: isoDateTimeString,
  publishedAt: isoDateTimeString,
  updatedAt: isoDateTimeString,
  // 公式かユーザメイドを判別するプロパティ
  rights: v.string(),
  // 著作権情報 本来はFeed（WebSource）側の値だが、Entryにも持たせる
  copyright: v.string(),
  // あるEntryのオリジナルのFeedに関する情報
  // source: v.optional(v.object({
  //   id: v.optional(v.string()),
  //   title: v.optional(v.string()),
  //   updated: v.optional(v.date()),
  //   updatedRaw: v.optional(v.string()),
  //   url: v.optional(v.string()),
  // })),
})

export const itemValidator = v.merge([
  itemRequiredValidator,
  v.partial(itemOptionalValidator),
])

export type Item = v.Output<typeof itemValidator>
