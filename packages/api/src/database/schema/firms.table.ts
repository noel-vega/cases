import { relations } from "drizzle-orm";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { usersTable } from "./users.table";
import { sqliteTable, text } from "drizzle-orm/sqlite-core";

export const firmsTable = sqliteTable("firms", {
  id: text("id"),
  name: text("name", { length: 200 }),
});

export const firmsRelations = relations(firmsTable, ({ many }) => ({
  users: many(usersTable),
}));

export const selectFirmSchema = createSelectSchema(firmsTable);
export const insertFirmSchema = createInsertSchema(firmsTable);
