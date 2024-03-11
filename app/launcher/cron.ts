import { main } from "@/app/launcher/main.ts"

Deno.cron("Log a message", "*/1 * * * *", main)
