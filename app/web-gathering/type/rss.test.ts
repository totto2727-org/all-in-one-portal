import type { Feed } from "https://raw.githubusercontent.com/totto2727-org/rss/master/mod.ts"
import { FeedType } from "https://raw.githubusercontent.com/totto2727-org/rss/master/src/types/feed_type.ts"
import { assertEquals, assertObjectMatch } from "@lib/test"
import type { RequiredDeep } from "type-fest"
import * as v from "valibot/mod.ts"
import { fromFeedToWebContent } from "./rss.ts"
import type { webContentValidator } from "./web-content.ts"

Deno.test("最小限のFeedをWebContent型に変換する", async (t) => {
  const feed = {
    id: "https://example.com",
    title: { value: "Example" },
    type: FeedType.Rss2,
    links: [],
    entries: [],
  } satisfies Feed

  const webContent = {
    id: "https://example.com",
    type: { type: "rss", details: "RSS 2.0" },
    title: "Example",
    links: [],
    categories: [],
    items: [],
  } satisfies v.Output<typeof webContentValidator>

  const result = v.safeParse(fromFeedToWebContent, feed)
  if (!result.success) {
    console.log(result)
    // biome-ignore lint/complexity/noForEach: <explanation>
    result.issues.forEach((x) => console.log(x))
  }

  assertObjectMatch(result.output as Record<string, unknown>, webContent)
})

Deno.test("利用する最大限のFeedをWebContent型に変換する", (t) => {
  const feed = {
    id: "https://example.com",
    title: { value: "Example" },
    type: FeedType.Rss2,
    links: ["https://example.com/1", "https://example.com/2"],
    author: { name: "author" },
    description: "description",
    image: {
      url: "https://example.com/image.png",
      title: "Image",
      width: 100,
      height: 100,
    },
    language: "ja",
    created: new Date("2021-01-01T00:00:00Z"),
    published: new Date("2021-01-01T00:00:00Z"),
    updateDate: new Date("2021-01-01T00:00:00Z"),
    copyright: "© 2021 Example",
    categories: [
      { term: "term1", label: "label1" },
      { term: "term2", label: "label2" },
    ],
    entries: [
      {
        id: "https://example.com/1",
        title: { value: "Example" },
        links: [
          {
            href: "https://example.com/1",
            rel: "alternate",
            type: "text/html",
            title: "Example",
          },
        ],
        attachments: [
          {
            url: "https://example.com/1",
            sizeInBytes: 100,
            mimeType: "text/html",
          },
        ],
        categories: [
          { term: "term3", label: "label3" },
          { term: "term4", label: "label4" },
        ],
        contributors: [
          {
            name: "contributor",
          },
        ],
        description: { value: "description" },
        author: { name: "author" },
        published: new Date("2021-01-01T00:00:00Z"),
        updated: new Date("2021-01-01T00:00:00Z"),
        rights: { value: "rights" },
      },
      {
        id: "https://example.com/1",
        title: { value: "Example" },
        links: [
          {
            href: "https://example.com/1",
            rel: "alternate",
            type: "text/html",
            title: "Example",
          },
        ],
        attachments: [
          {
            url: "https://example.com/1",
            sizeInBytes: 100,
            mimeType: "text/html",
          },
        ],
        categories: [
          { term: "term3", label: "label3" },
          { term: "term4", label: "label4" },
        ],
        contributors: [
          {
            name: "contributor",
          },
        ],
        description: { value: "description" },
        author: { name: "author" },
        published: new Date("2021-01-01T00:00:00Z"),
        updated: new Date("2021-01-01T00:00:00Z"),
        rights: { value: "rights" },
      },
    ],
  } satisfies Feed

  const webContent = {
    id: "https://example.com",
    type: { type: "rss", details: "RSS 2.0" },
    title: "Example",
    links: [
      // @ts-expect-error webcontentのlinksはurlのみ
      {
        url: "https://example.com/1",
      },
      // @ts-expect-error webcontentのlinksはurlのみ
      {
        url: "https://example.com/2",
      },
    ],
    categories: [
      { value: "term1", name: "label1" },
      { value: "term2", name: "label2" },
    ],
    author: "author",
    description: "description",
    image: {
      url: "https://example.com/image.png",
      alt: "Image",
      width: 100,
      height: 100,
    },
    language: "ja",
    createdAt: "2021-01-01T00:00:00.000Z",
    publishedAt: "2021-01-01T00:00:00.000Z",
    updatedAt: "2021-01-01T00:00:00.000Z",
    copyrigght: "© 2021 Example",
    items: [
      {
        id: "https://example.com/1",
        title: "Example",
        links: [
          {
            url: "https://example.com/1",
            rel: "alternate",
            type: "text/html",
            title: "Example",
          },
        ],
        attachments: [
          {
            url: "https://example.com/1",
            sizeInBytes: 100,
            mimeType: "text/html",
          },
        ],
        categories: [
          { value: "term3", name: "label3" },
          { value: "term4", name: "label4" },
        ],
        contributors: ["contributor"],
        description: "description",
        author: "author",
        createdAt: "2021-01-01T00:00:00.000Z",
        publishedAt: "2021-01-01T00:00:00.000Z",
        updatedAt: "2021-01-01T00:00:00.000Z",
        rights: "rights",
        copyright: "© 2021 Example",
      },
      {
        id: "https://example.com/1",
        title: "Example",
        links: [
          {
            url: "https://example.com/1",
            rel: "alternate",
            type: "text/html",
            title: "Example",
          },
        ],
        attachments: [
          {
            url: "https://example.com/1",
            sizeInBytes: 100,
            mimeType: "text/html",
          },
        ],
        categories: [
          { value: "term3", name: "label3" },
          { value: "term4", name: "label4" },
        ],
        contributors: ["contributor"],
        description: "description",
        author: "author",
        createdAt: "2021-01-01T00:00:00.000Z",
        publishedAt: "2021-01-01T00:00:00.000Z",
        updatedAt: "2021-01-01T00:00:00.000Z",
        rights: "rights",
        copyright: "© 2021 Example",
      },
    ],
  } satisfies RequiredDeep<v.Output<typeof webContentValidator>>

  const result = v.safeParse(fromFeedToWebContent, feed)
  if (!result.success) {
    console.log(result)
    // biome-ignore lint/complexity/noForEach: <explanation>
    result.issues.forEach((x) => console.log(x))
  }

  assertObjectMatch(result.output as Record<string, unknown>, webContent)
})
