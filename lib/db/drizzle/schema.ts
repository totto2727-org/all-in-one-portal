import { sql } from "drizzle-orm"
import {
  index,
  pgTable,
  primaryKey,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core"
import { uuidv7 } from "uuidv7"

/**
 * インサートもしくはアップデート時の日時を取得する
 * トランザクション開始時の日時を取得する場合はSQLのnow()関数を使用する
 *
 * @returns sql
 */
function now() {
  return sql`clock_timestamp()`
}

const createdAt = timestamp("created_at", { withTimezone: true })
  .notNull()
  .$default(now)
  .$onUpdate(now)

const updatedAt = timestamp("updated_at", { withTimezone: true })
  .notNull()
  .$default(now)
  .$onUpdate(now)

const createdAtAndUpdatedAt = {
  createdAt,
  updatedAt,
}

export const users = pgTable("users", {
  id: uuid("id").primaryKey().$defaultFn(uuidv7),
  ...createdAtAndUpdatedAt,
})

export const userLikedCognito = pgTable(
  "user_liked_cognito",
  {
    userId: uuid("user_id")
      .primaryKey()
      .references(() => users.id, {
        onUpdate: "cascade",
      }),
    sub: text("sub").notNull().unique(),
    ...createdAtAndUpdatedAt,
  },
  (table) => ({
    subIndex: index("sub_index").on(table.sub),
  }),
)

export const rssTarget = pgTable(
  "rss_target",
  {
    userId: uuid("user_id")
      .references(() => users.id)
      .notNull(),
    url: text("url").notNull(),
    name: text("name").notNull(),
    ...createdAtAndUpdatedAt,
  },
  (table) => ({
    userIdAndUrlPrimaryKey: primaryKey({ columns: [table.userId, table.url] }),
  }),
)

export const webContentGroup = pgTable(
  "web_content_group",
  {
    userId: uuid("user_id").references(() => users.id),
    id: text("id").$default(uuidv7),
    ...createdAtAndUpdatedAt,
  },
  (table) => ({
    userIdAndUrlPrimaryKey: primaryKey({ columns: [table.userId, table.id] }),
  }),
)

export const webContentItem = pgTable(
  "web_content_item",
  {
    userId: uuid("user_id").references(() => users.id),
    id: text("id").$default(uuidv7),
    ...createdAtAndUpdatedAt,
  },
  (table) => ({
    userIdAndUrlPrimaryKey: primaryKey({ columns: [table.userId, table.id] }),
  }),
)
