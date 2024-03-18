import type { Feed } from "https://raw.githubusercontent.com/totto2727-org/rss/master/mod.ts"
import { A, G, R } from "ts-belt"
import * as v from "valibot/mod.ts"
import { fromFeedAttachmentsToWebContentAttachments } from "./rss/attachment.ts"
import { fromFeedCategoriesToWebContentCategories } from "./rss/category.ts"
import { fromFeedImageToWebContentImage } from "./rss/image.ts"
import { fromFeedLinksToWebContentLinks } from "./rss/link.ts"
import {
  fromFeedPersonToWebContentPerson,
  fromFeedPersonsToWebContentPersons,
} from "./rss/person.ts"
import type { WebContent, WebContentItem } from "./web-content.ts"
import { webContentValidator } from "./web-content.ts"

function fromFeedEntryToWebContentItem(
  entry: Feed["entries"][0],
  feed: Feed,
): WebContentItem {
  const categories = (feed.categories ?? []).concat(entry.categories ?? [])

  const item = {
    id: entry.id,
    title: entry.title?.value,
    links: v.parse(fromFeedLinksToWebContentLinks, entry.links),
    attachments: v.parse(
      fromFeedAttachmentsToWebContentAttachments,
      entry.attachments,
    ),
    categories: v.parse(fromFeedCategoriesToWebContentCategories, categories),
    contributors: v.parse(
      fromFeedPersonsToWebContentPersons,
      entry.contributors,
    ),
    description: entry.description?.value,
    author: v.parse(fromFeedPersonToWebContentPerson, entry.author),
    createdAt: entry.published ?? entry.updated,
    publishedAt: entry.published,
    updatedAt: entry.updated,
    rights: entry.rights?.value,
    copyrigght: feed.copyright,
  } satisfies Record<keyof WebContentItem, unknown>

  return item as WebContentItem
}

export function fromFeedToWebContent(
  feed: Feed,
): R.Result<WebContent, v.ValiError> {
  const items = feed.entries.map((x) => {
    return fromFeedEntryToWebContentItem(x, feed)
  })

  const rss = {
    id: feed.id,
    type: { type: "rss", details: feed.type },
    title: feed.title.value ?? "unnamed",
    links: v.parse(
      fromFeedLinksToWebContentLinks,
      // なぜかここは文字列なので変換する
      A.map(feed.links, (x) => ({ href: x })),
    ),
    author: v.parse(fromFeedPersonToWebContentPerson, feed.author),
    description: feed.description,
    image: v.parse(fromFeedImageToWebContentImage, feed.image),
    language: feed.language,
    copyrigght: feed.copyright,
    // RSSの作成、公開、更新日時の順番で最初に見つかったものを使う
    createdAt: feed.created ?? feed.published ?? feed.updateDate,
    publishedAt: feed.published ?? feed.updateDate ?? feed.created,
    updatedAt: feed.updateDate ?? feed.published ?? feed.created,
    items,
  } satisfies WebContent

  const validated = v.safeParse(webContentValidator, rss)

  if (!validated.success) {
    return R.makeError(new v.ValiError(validated.issues))
  }

  return R.makeOk(validated.output)
}
