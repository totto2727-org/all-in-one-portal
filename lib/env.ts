import { G, R, S, pipe } from "ts-belt"

// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
class EnvError extends Error {
  static {
    EnvError.prototype.name = "EnvError"
  }
}

export const getDataBaseUri = () =>
  pipe(
    R.fromNullable(
      Deno.env.get("DATABASE_URI"),
      new EnvError("DATABASE_URI environment variable not set"),
    ),
    R.flatMap((x) =>
      S.isNotEmpty(x)
        ? R.Ok(x)
        : R.Error(new EnvError("DATABASE_URI environment variable is empty")),
    ),
  )
