import { join } from "node:path"
import { createDrizzleClient, createPostgreSqlClient } from "@/lib/db.ts"
import { getDataBaseUri } from "@/lib/env.ts"
import { load } from "@std/dotenv"
import { migrate } from "drizzle-orm/postgres-js/migrator"
import { R } from "ts-belt"
import { getEnvPath } from "./arg.ts"

await load({
  export: true,
  envPath: join(Deno.cwd(), R.getExn(getEnvPath())),
})

const databaseUrl = R.getExn(getDataBaseUri())

await using postgresClient = createPostgreSqlClient(databaseUrl, {
  max: 1,
})

const db = createDrizzleClient(postgresClient)

console.log("migration started")
await migrate(db, { migrationsFolder: `${import.meta.dirname}/migration` })
console.log("migration finished")
