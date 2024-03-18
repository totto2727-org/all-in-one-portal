import { HTTPException } from "hono/http-exception"
import type { StatusCode } from "hono/utils/http-status"
import { AR, R, flow } from "ts-belt"

const safeResponse = (v: Response) =>
  R.fromPredicate(
    v,
    (v) => v.ok,
    new HTTPException(v.status as StatusCode, { res: v }),
  )

export const resToText = flow(
  safeResponse,
  R.match(
    flow(
      (v) => R.fromPromise(v.text()),
      AR.mapError((e) => new HTTPException(500, e)),
    ),
    AR.reject,
  ),
)
