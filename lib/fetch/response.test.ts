import { assertEquals } from "jsr:@std/assert@0.219.1/assert_equals"
import { assert } from "@lib/test"
import type { HTTPException } from "hono/http-exception"
import { R } from "ts-belt"
import { resToText } from "./response.ts"

Deno.test(
  "resToText関数は200のステータスを持つResponseをテキストに変換する",
  async (t) => {
    const response = new Response("Hello, world!", { status: 200 })

    // テスト対象の関数を呼び出す
    const text = await resToText(response)

    await t.step("変換に成功してOk型が返ってくる", () => {
      assert(R.isOk(text))
    })

    await t.step("返ってきたOK型に文字列が含まれる", () => {
      assertEquals(text._0, "Hello, world!")
    })
  },
)

Deno.test(
  "resToText関数は200以外のステータスを持つResponseをHTTPExeptionに変換する",
  async (t) => {
    const response = new Response(null, { status: 404 })

    // テスト対象の関数を呼び出す
    const text = await resToText(response)

    await t.step("変換に失敗してError型が返ってくる", () => {
      assert(R.isError(text))
    })

    await t.step("返ってきたError型に404のHTTPExceptionが含まれる", () => {
      assertEquals((text._0 as HTTPException).status, 404)
    })
  },
)
