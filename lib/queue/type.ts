export type Message<T extends string, U> = {
  path: T
  body: U
}

export type MessageSatisfies = {
  [key in keyof Message<string, unknown>]: unknown
}
