import { isoDateTimeString } from "@/lib/type.ts"
import { G } from "ts-belt"
import * as v from "valibot/mod.ts"
import { categoryValidator } from "./category.ts"
import { imageValidator } from "./image.ts"
import { linkValidator } from "./link.ts"
import { sourceTypeValidator } from "./source-type.ts"

const sourceRequiredValidator = v.object({
  id: v.string(),
  type: sourceTypeValidator,
  title: v.string(),
  links: v.transform(
    v.array(v.fallback(v.optional(linkValidator), undefined)),
    (v) => v.filter(G.isNotNullable),
  ),
  categories: v.transform(
    v.array(v.fallback(v.optional(categoryValidator), undefined)),
    (v) => v.filter(G.isNotNullable),
  ),
})

const sourceOptionalValidator = v.object({
  author: v.string(),
  description: v.string(),
  image: v.fallback(v.optional(imageValidator), undefined),
  // RSSにおけるterm -> value label -> name
  language: v.string(),
  createdAt: v.fallback(v.optional(isoDateTimeString), undefined),
  publishedAt: v.fallback(v.optional(isoDateTimeString), undefined),
  updatedAt: v.fallback(v.optional(isoDateTimeString), undefined),
  // 著作権情報 Entryにも持たせる
  copyrigght: v.string(),
})

export const sourceValidator = v.merge([
  sourceRequiredValidator,
  v.partial(sourceOptionalValidator),
])

export type Source = v.Output<typeof sourceValidator>
