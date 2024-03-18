import { A, G } from "ts-belt"
import * as v from "valibot/mod.ts"

export const fromFeedPersonToWebContentPerson = v.transform(
  v.optional(
    v.object({
      name: v.optional(v.string()),
    }),
  ),
  (x): string | undefined => {
    return x?.name
  },
)

export const fromFeedPersonsToWebContentPersons = v.transform(
  v.optional(v.array(fromFeedPersonToWebContentPerson)),
  (x): string[] => {
    return A.filter(x ?? [], G.isNotNullable)
  },
)
