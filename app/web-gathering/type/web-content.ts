import * as v from "valibot/mod.ts"
import type { attachmentValidator } from "./web-content/attachment.ts"
import type { categoryValidator } from "./web-content/category.ts"
import type { imageValidator } from "./web-content/image.ts"
import { itemValidator } from "./web-content/item.ts"
import type { linkValidator } from "./web-content/link.ts"
import type { sourceTypeValidator } from "./web-content/source-type.ts"
import { sourceValidator } from "./web-content/source.ts"

export const webContentValidator = v.merge([
  sourceValidator,
  v.object({ items: v.array(itemValidator) }),
])

export type WebContent = v.Output<typeof webContentValidator>

export type WebContentSource = v.Output<typeof sourceValidator>
export type WebContentItem = v.Output<typeof itemValidator>

export type WebContentSourceType = v.Output<typeof sourceTypeValidator>

export type WebContentImage = v.Output<typeof imageValidator>
export type WebContentCategory = v.Output<typeof categoryValidator>
export type WebContentAttachment = v.Output<typeof attachmentValidator>
export type WebContentLink = v.Output<typeof linkValidator>
