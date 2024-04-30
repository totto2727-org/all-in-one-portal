import { join } from "node:path"
import { createDrizzleClient, createPostgreSqlClient } from "@/lib/db.ts"
import { migrate } from "drizzle-orm/postgres-js/migrator"

export async function migrateDevDatabaseUseCase(
  connectionUri: string,
): Promise<void> {
  await using postgresClient = createPostgreSqlClient(connectionUri, {
    max: 1,
  })
  const db = createDrizzleClient(postgresClient)

  console.log("Start migration")
  await migrate(db, { migrationsFolder: join(Deno.cwd(), "db/migration") })
  console.log("End migration")
  await postgresClient[Symbol.asyncDispose]()
}
