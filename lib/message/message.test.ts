import { assertEquals } from "@lib/test"
import { createMessage } from "./message.ts"

Deno.test(
  "createMessage関数は、指定したpathとbodyを元にメッセージを生成する",
  () => {
    const message = createMessage("/path", { key: "value" })

    assertEquals(message, {
      path: "/path",
      body: { key: "value" },
    })
  },
)
