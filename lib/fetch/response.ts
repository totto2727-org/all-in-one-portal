import { HTTPException } from "hono/http-exception"
import type { StatusCode } from "hono/utils/http-status"
import { AR, R, flow } from "ts-belt"

const responseSafe = (v: Response): R.Result<Response, HTTPException> =>
  R.fromPredicate(
    v,
    (v) => v.ok,
    new HTTPException(v.status as StatusCode, { res: v }),
  )

export const resToText = flow(
  responseSafe,
  R.match(
    flow(
      (v) => R.fromPromise(v.text()),
      // このmapErrorが呼び出されることは原則ありえない
      AR.mapError((e) => new HTTPException(500, e)),
    ),
    AR.reject,
  ),
)
