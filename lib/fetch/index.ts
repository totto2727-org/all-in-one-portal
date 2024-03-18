import { HTTPException } from "hono/http-exception"
import { AR, R, flow } from "ts-belt"

export const fetchResult = flow(
  fetch,
  R.fromPromise,
  AR.mapError((error) => new HTTPException(500, error)),
)
