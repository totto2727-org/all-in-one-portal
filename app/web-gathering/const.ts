import { join } from "node:path"

export const basePath = "/web-gathering"

export const PATH = {
  base: "/web-gathering",
  subPath: {
    triggerByCron: "/trigger-by-cron",
    getRssTargetList: "/get-rss-target-list",
    fetchRss: "/fetch-rss",
    saveRssInDb: "/save-rss-in-db",
  },
}

export function getFullPath(key: keyof (typeof PATH)["subPath"]) {
  return join(PATH.base, PATH.subPath[key])
}
