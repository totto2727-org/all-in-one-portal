import {
  createDrizzleClient,
  createPostgreSqlClient,
  schema,
} from "@/lib/db.ts"
import { createPostgreSqlContainer } from "@/lib/dev/container.ts"
import { migrateDevDatabaseUseCase } from "@/lib/dev/migration.ts"
import { R } from "ts-belt"

await using postgresContainer = R.getExn(await createPostgreSqlContainer())
console.log("Open postgres container:", postgresContainer.getConnectionUri())

await migrateDevDatabaseUseCase(postgresContainer.getConnectionUri())

console.log("Start application")

await using postgresClient = createPostgreSqlClient(
  postgresContainer.getConnectionUri(),
)

const db = createDrizzleClient(postgresClient)

await db.transaction(async (tx) => {
  await tx.insert(schema.users).values({}).execute()

  console.log(await tx.query.users.findMany())
  console.log(await tx.query.users.findMany())

  await tx.rollback()
})
