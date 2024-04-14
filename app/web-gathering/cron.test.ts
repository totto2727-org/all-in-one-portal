import {
  createEnqueueRepository,
  createListenQueueRepository,
} from "@/lib/queue.ts"
import { assert, assertEquals } from "@lib/test"
import { R } from "ts-belt"
import { createTriggerRssUseCase } from "./cron.ts"

Deno.test("triggerUseCaseのテスト", async (t) => {
  using queueClient = await Deno.openKv(":memory:")
  const enqueueRepository = createEnqueueRepository(queueClient)
  const listenQueueRepository = createListenQueueRepository(queueClient)

  const triggerRssUseCase = createTriggerRssUseCase(enqueueRepository)

  const result = await triggerRssUseCase()

  await t.step("正常終了する", () => {
    assert(R.isOk(result))
  })

  await t.step(
    "RSSの一覧取得処理起動のメッセージを受け取ることができる",
    async () => {
      const { promise, resolve } = Promise.withResolvers()

      // deno-lint-ignore require-await
      listenQueueRepository(async (m) => {
        assertEquals(m, {
          path: "/web-gathering/source-rss",
          body: {},
        })

        resolve(null)
      })

      await promise
    },
  )
})
