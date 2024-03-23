import { HTTPException } from "hono/http-exception"
import { AR, R, pipe } from "ts-belt"

export function fetchSafe(...args: Parameters<typeof fetch>) {
  return pipe(
    fetch(...args),
    R.fromPromise,
    AR.mapError((error) => new HTTPException(500, error)),
  )
}
