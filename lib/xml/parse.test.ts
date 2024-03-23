import { assert, assertEquals } from "@lib/test"
import { R } from "ts-belt"
import { parseXml } from "./parse.ts"

Deno.test(
  "parseXml関数は、XML文字列のパースに成功するとOK型を返す",
  async (t) => {
    const xml = `<?xml version="1.0" encoding="UTF-8"?>`

    const result = parseXml(xml)

    await t.step("OK型を返す", () => {
      assert(R.isOk(result))
    })

    await t.step("パース結果が存在する", () => {
      assertEquals(result._0 as unknown, {
        xml: { "@encoding": "UTF-8", "@version": 1 },
      })
    })
  },
)
