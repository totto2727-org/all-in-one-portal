// deno-lint-ignore ban-types
export function asyncDisposable<T extends {}>(
  nonDisposable: T,
  dipose: (x: T) => Promise<void>,
): T & AsyncDisposable {
  // @ts-ignore add Symbol.asyncDispose to nonDisposable
  nonDisposable[Symbol.asyncDispose] = () => dipose(nonDisposable)
  return nonDisposable as T & AsyncDisposable
}
