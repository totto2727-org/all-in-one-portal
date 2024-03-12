// Base URLは何でも良い
const baseUrl = new URL("https://example.com")

export function createRequest(path: string, body?: unknown) {
  return new Request(new URL(path, baseUrl), {
    // CronジョブはGET、QueueのワーカーはPOST
    method: body ? "POST" : "GET",
    // POSTの場合のみbodyを設定
    body: body ? JSON.stringify(body) : undefined,
  })
}
