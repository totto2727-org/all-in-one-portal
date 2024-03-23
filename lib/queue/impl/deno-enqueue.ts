import { HTTPException } from "hono/http-exception"
import { AR, R, pipe } from "ts-belt"
import type { Message } from "../../message/message.ts"
import type { EnqueueRepository } from "../repository.ts"

export class DenoEnqueueRepository
  implements EnqueueRepository<Deno.KvCommitResult>
{
  constructor(private readonly kv: Deno.Kv) {
    this.kv = kv
  }

  enqueueQueue(message: Message) {
    return pipe(
      R.fromPromise(this.kv.enqueue(message)),
      AR.mapError((e) => new HTTPException(500, e as Error)),
    )
  }
}
