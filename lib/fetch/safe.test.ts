import { assert, fetchStub } from "@lib/test"
import { R } from "ts-belt"
import { fetchSafe } from "./safe.ts"

Deno.test(
  "fetchのResult型ラッパーは、通信に成功したときOk型を返す",
  async (t) => {
    const stubed = fetchStub(new Response(null, { status: 200 }))

    const response = await fetchSafe("https://example.com")

    await t.step("返り値はOk型である", async () => {
      assert(R.isOk(response))
      await response._0.body?.cancel()
    })

    stubed.restore()
  },
)

Deno.test(
  "fetchのResult型ラッパーは、通信に失敗したときError型を返す",
  async (t) => {
    const stubed = fetchStub(new Error("error"))

    const response = await fetchSafe("https://example.com")

    await t.step("返り値はError型である", () => {
      assert(R.isError(response))
    })

    stubed.restore()
  },
)
