import { assertEquals } from "@lib/test"
import { createRequest, toRequest } from "./request.ts"

Deno.test(
  "createRequest関数は、指定したpathを元にGetリクエストを生成する",
  async () => {
    const request = createRequest("/path")

    assertEquals(request.method, "GET")

    await request.body?.cancel()
  },
)

Deno.test(
  "createRequest関数は、指定したpathとbodyを元にGetリクエストを生成する",
  async (t) => {
    const request = createRequest("/path", { key: "value" })

    await t.step("bodyが存在する", async () => {
      assertEquals(await request.json(), { key: "value" })
    })

    await t.step("bodyが存在する時POSTメソッドになる", () => {
      assertEquals(request.method, "POST")
    })
  },
)

Deno.test(
  "toRequest関数は、メッセージを元にリクエストを生成する",
  async (t) => {
    const message = {
      path: "/path",
      body: { key: "value" },
    }

    const request = toRequest(message)

    await t.step("pathが等しい", () => {
      assertEquals(new URL(request.url).pathname, message.path)
    })

    await t.step("bodyが等しい", async () => {
      assertEquals(await request.json(), message.body)
    })
  },
)
