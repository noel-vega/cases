import { relations } from "drizzle-orm";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { mattersTable } from "./matters.table";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const tasksTable = sqliteTable("tasks", {
  id: text("id").primaryKey(),
  name: text("name", { length: 200 }).notNull(),
  shortDescription: text("short_description", { length: 200 }),
  longDescription: text("long_description", { length: 1000 }),
  matterId: integer("matter_id"),
});

export const tasksRelations = relations(tasksTable, ({ one }) => ({
  matter: one(mattersTable, {
    fields: [tasksTable.matterId],
    references: [mattersTable.id],
  }),
}));

export const selectTaskSchema = createSelectSchema(tasksTable);
export const insertTaskSchema = createInsertSchema(tasksTable);
