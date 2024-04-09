import { listenQueueRepository } from "@/lib/queue.ts"
import { assert, assertEquals, spy } from "@lib/test"
import { R } from "ts-belt"
import { triggerRssUseCase } from "./cron.ts"

Deno.test("triggerUseCaseのテスト", async (t) => {
  using queueClient = await Deno.openKv(":memory:")

  const injectedTriggerUseCase = triggerRssUseCase.inject((deps) => ({
    enqueueRepository: deps.enqueueRepository.inject({ queueClient }),
  }))
  const injectedListenQueueRepository = listenQueueRepository.inject({
    queueClient,
  })

  const result = await injectedTriggerUseCase()

  await t.step("正常終了する", () => {
    assert(R.isOk(result))
  })

  await t.step(
    "RSSの一覧取得処理起動のメッセージを受け取ることができる",
    async () => {
      const { promise, resolve } = Promise.withResolvers()

      // deno-lint-ignore require-await
      injectedListenQueueRepository(async (m) => {
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
