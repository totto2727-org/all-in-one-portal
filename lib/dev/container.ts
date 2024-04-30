import process from "node:process"
import { asyncDisposable } from "@/lib/dispose.ts"
import {
  PostgreSqlContainer,
  type StartedPostgreSqlContainer,
} from "@testcontainers/postgresql"
import { type AR, R } from "ts-belt"

export async function createPostgreSqlContainer(): AR.AsyncResult<
  StartedPostgreSqlContainer & AsyncDisposable,
  Error
> {
  const container = await R.fromPromise(
    (async () =>
      asyncDisposable(
        await new PostgreSqlContainer()
          .withReuse()
          .withExposedPorts(5432)
          .withCopyDirectoriesToContainer([
            { source: "./migration", target: "/docker-entrypoint-initdb.d" },
          ])
          .start(),
        async (x) => {
          console.info("Close postgres container")
          await x.stop()
        },
      ))(),
  )

  if (R.isError(container)) {
    return container
  }

  // exit時
  process.on("exit", async () => {
    await container._0[Symbol.asyncDispose]()
  })

  // Ctrl + C での終了を検知
  process.on("SIGINT", async () => {
    await container._0[Symbol.asyncDispose]()
  })

  // Terminal が閉じられるのを検知
  process.on("SIGHUP", async () => {
    await container._0[Symbol.asyncDispose]()
  })

  return container
}
