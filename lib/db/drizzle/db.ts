import { asyncDisposable } from "@/lib/dispose.ts"
import { type PostgresJsDatabase, drizzle } from "drizzle-orm/postgres-js"
import postgres from "postgres"
import { flow } from "ts-belt"
import * as schema from "./schema.ts"

export type PostgreSqlClient = postgres.Sql & AsyncDisposable

export const createPostgreSqlClient: (
  ...args: Parameters<typeof postgres>
) => PostgreSqlClient = flow(postgres, (x) =>
  asyncDisposable(x, (x) => x.end()),
)

export type DrizzleClient = PostgresJsDatabase<typeof schema>

export const createDrizzleClient = (
  postgresClient: postgres.Sql,
): DrizzleClient => {
  return drizzle(postgresClient, {
    schema,
  })
}
