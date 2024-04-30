import type { Config } from "drizzle-kit"

export default {
  schema: "../lib/db/drizzle/schema.ts",
  out: "./migration",
} satisfies Config
