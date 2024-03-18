import * as v from "valibot/mod.ts"
import { imageValidator } from "./image.ts"
import { linkValidator } from "./link.ts"
import { sourceTypeValidator } from "./source-type.ts"

const sourceRequiredValidator = v.object({
  id: v.string(),
  type: sourceTypeValidator,
  title: v.string(),
  links: v.array(linkValidator),
})

const sourceOptionalValidator = v.object({
  author: v.string(),
  description: v.string(),
  image: imageValidator,
  // RSSにおけるterm -> value label -> name
  language: v.string(),
  createdAt: v.date(),
  publishedAt: v.date(),
  updatedAt: v.date(),
  // 著作権情報 Entryにも持たせる
  copyrigght: v.string(),
})

export const sourceValidator = v.merge([
  sourceRequiredValidator,
  v.partial(sourceOptionalValidator),
])

export type Source = v.Output<typeof sourceValidator>
