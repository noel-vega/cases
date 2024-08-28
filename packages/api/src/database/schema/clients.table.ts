import { relations } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { mattersTable } from "./matters.table";

export const clientsTable = sqliteTable("clients", {
  id: integer("id").primaryKey(),
  firstName: text("first_name", { length: 200 }).notNull(),
  lastName: text("last_name", { length: 200 }).notNull(),
});

export const clientRelations = relations(clientsTable, ({ many }) => ({
  matters: many(mattersTable),
}));

export const selectClientSchema = createSelectSchema(clientsTable);
export const insertClientSchema = createInsertSchema(clientsTable);
