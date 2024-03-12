import { Message } from "./type.ts"

export function createMessage<T>(
  path: string,
  body: T,
): Message<T> {
  return {
    path,
    body,
  }
}
