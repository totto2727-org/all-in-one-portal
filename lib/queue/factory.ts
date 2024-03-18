import type { Message } from "./type.ts"

export function createMessage<T extends string, U>(
  path: T,
  body: U,
): Message<T, U> {
  return {
    path,
    body,
  }
}
