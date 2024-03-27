import * as v from "valibot/mod.ts"
import { itemValidator } from "./web-content/item.ts"
import { sourceValidator } from "./web-content/source.ts"

export { attachmentValidator } from "./web-content/attachment.ts"
export { categoryValidator } from "./web-content/category.ts"
export { imageValidator } from "./web-content/image.ts"
export { itemValidator } from "./web-content/item.ts"
export { linkValidator } from "./web-content/link.ts"
export { sourceTypeValidator } from "./web-content/source-type.ts"
export { sourceValidator } from "./web-content/source.ts"

export const webContentValidator = v.merge([
  sourceValidator,
  v.object({ items: v.array(itemValidator) }),
])
