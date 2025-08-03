import { pgTable, text } from "drizzle-orm/pg-core";
import { createId } from "..";

export const users = pgTable("users", {
    id: text("id").primaryKey().$defaultFn(() => createId()),
    name: text("name").notNull(),
    email: text("email").notNull().unique(),
})

export const posts = pgTable("posts", {
    id: text("id").primaryKey().$defaultFn(() => createId()),
    title: text("title").notNull(),
    content: text("content").notNull(),
    authorId: text("author_id").notNull(), // .references(() => users.id),
})