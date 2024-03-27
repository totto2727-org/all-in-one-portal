import type { Feed } from "https://raw.githubusercontent.com/totto2727-org/rss/master/mod.ts"
import { G } from "ts-belt"
import * as v from "valibot/mod.ts"
import type {} from "./web-content.ts"
import { webContentValidator } from "./web-content.ts"

export const fromFeedToWebContent = v.coerce(webContentValidator, (i) => {
  const feed = i as Partial<Feed>

  return {
    // Required
    id: feed.id,
    // biome-ignore lint/style/noNonNullAssertion: <explanation>
    type: { type: "rss", details: feed.type! },
    title: feed.title?.value,
    links: feed.links?.map((x) => ({ url: x })) ?? [],
    // Optional
    author: feed.author?.name,
    description: feed.description,
    image: {
      // biome-ignore lint/style/noNonNullAssertion: <explanation>
      url: feed.image?.url!,
      alt: feed.image?.title,
      width: feed.image?.width,
      height: feed.image?.height,
    },
    language: feed.language,
    createdAt: (
      feed.created ??
      feed.published ??
      feed.updateDate
    )?.toISOString(),
    publishedAt: (
      feed.published ??
      feed.updateDate ??
      feed.created
    )?.toISOString(),
    updatedAt: (
      feed.updateDate ??
      feed.published ??
      feed.created
    )?.toISOString(),
    copyrigght: feed.copyright,
    categories:
      feed.categories?.map((x) => ({
        name: x.label,
        value: x.term ?? x.label,
      })) ?? [],
    // Items
    items:
      feed.entries?.map((x) => {
        return {
          // Required
          id: x.id,
          title: x.title?.value,
          links:
            x.links
              ?.filter((x) => G.isNotNullable(x.href))
              .map((x) => ({
                url: x.href,
                rel: x.rel,
                type: x.type,
                title: x.title,
              })) ?? [],
          attachments:
            x.attachments?.filter((x) => G.isNotNullable(x.url)) ?? [],
          categories:
            x.categories
              ?.concat(feed.categories ?? [])
              .filter(
                (x) => G.isNotNullable(x.label) || G.isNotNullable(x.term),
              )
              .map((x) => ({
                name: x.label,
                value: x.term ?? x.label,
              })) ?? [],
          contributors:
            x.contributors?.map((x) => x.name).filter(G.isNotNullable) ?? [],
          // Optional
          description: x.description?.value,
          author: x.author?.name,
          createdAt: (x.published ?? x.updated)?.toISOString(),
          publishedAt: x.published?.toISOString(),
          updatedAt: x.updated?.toISOString(),
          rights: x.rights?.value,
          copyright: feed.copyright,
        }
      }) ?? [],
  }
})
