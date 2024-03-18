import { A, G } from "ts-belt"
import * as v from "valibot/mod.ts"
import type { WebContentCategory } from "../web-content.ts"

const fromFeedCategoryToWebContentCategory = v.transform(
  v.object({
    term: v.optional(v.string()),
    label: v.optional(v.string()),
  }),
  (v): WebContentCategory | undefined => {
    if (G.isNotNullable(v.term)) {
      return { name: v.label, value: v.term }
    }
    if (G.isNotNullable(v.label)) {
      return { name: v.label, value: v.label }
    }
    return undefined
  },
)

export const fromFeedCategoriesToWebContentCategories = v.transform(
  v.optional(v.array(fromFeedCategoryToWebContentCategory)),
  (v): WebContentCategory[] => A.filter(v ?? [], G.isNotNullable),
)
