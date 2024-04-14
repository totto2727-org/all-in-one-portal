import { createRequest } from "@/lib/message.ts"
import { S } from "ts-belt"

export type Cron = {
  schedule: string
  name: string
  executor: () => Promise<void>
}

export function createCronFromFetcher(
  fetcher: { fetch: (req: Request) => Response | Promise<Response> },
  schedule: string,
  path: string,
): Cron {
  return {
    schedule,
    name: pathToName(path),
    executor: async () => {
      const result = await fetcher.fetch(createRequest(path))

      // TODO 例外処理
      if (!result.ok) {
        throw new Error(
          `Failed to cron ${path}: ${result.status} ${
            result.statusText
          } ${await result.text()}`,
        )
      }
    },
  }
}

function pathToName(path: string): string {
  return path.split("/").filter(S.isNotEmpty).join("-")
}
