import * as v from "valibot/mod.ts"
import { attachmentValidator } from "./attachment.ts"
import { categoryValidator } from "./category.ts"
import { linkValidator } from "./link.ts"

export const itemRequiredValidator = v.object({
  id: v.string(),
  title: v.string(),
  links: v.array(linkValidator),
  attachments: v.array(attachmentValidator),
  categories: v.array(categoryValidator),
  // 共著者
  contributors: v.array(v.string()),
})

export const itemOptionalValidator = v.object({
  description: v.string(),
  author: v.string(),
  // createdAtはRSSに存在しないためpublishedAtを流用する
  createdAt: v.date(),
  publishedAt: v.date(),
  updatedAt: v.date(),
  // 公式かユーザメイドを判別するプロパティ
  rights: v.string(),
  // 著作権情報 本来はFeed（WebSource）側の値だが、Entryにも持たせる
  copyrigght: v.string(),
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
