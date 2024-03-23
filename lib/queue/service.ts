import type { HTTPException } from "hono/http-exception"
import type { AR } from "ts-belt"

export type EnqueueService<T = unknown> = {
  enqueue(): AR.AsyncResult<T, HTTPException>
}
