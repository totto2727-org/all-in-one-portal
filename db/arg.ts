import { R, S, pipe } from "ts-belt"

// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
class MigrationArgError extends Error {
  static {
    MigrationArgError.prototype.name = "MigrationArgError"
  }
}

export function getEnvPath() {
  return pipe(
    R.fromNullable(
      Deno.args.at(0),
      new MigrationArgError("env path not provided"),
    ),
    R.flatMap((x) =>
      S.isNotEmpty(x)
        ? R.Ok(x)
        : R.Error(new MigrationArgError("env path is empty")),
    ),
  )
}
