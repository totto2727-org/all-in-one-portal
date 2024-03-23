export type Cron = {
  schedule: string
  name: string
  executor: () => Promise<void>
}
