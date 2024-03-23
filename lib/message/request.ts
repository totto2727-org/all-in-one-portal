import type { UnknownRecord } from "@/lib/type.ts"
import type { Message } from "./message.ts"

// Base URLは何でも良い
const baseUrl = new URL("https://example.com")

export function createRequest(path: string, body?: UnknownRecord): Request {
  return new Request(new URL(path, baseUrl), {
    // CronジョブはGET、QueueのワーカーはPOST
    method: body ? "POST" : "GET",
    // POSTの場合のみbodyを設定
    body: body ? JSON.stringify(body) : undefined,
    headers: {
      "content-type": "application/json",
    },
  })
}

export function toRequest(message: Message): Request {
  return createRequest(message.path, message.body)
}
