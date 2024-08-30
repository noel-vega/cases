import { relations } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { mattersTable } from "./matters.table";
import { z } from "zod";

export const clientsTable = sqliteTable("clients", {
  id: integer("id").primaryKey(),
  firstName: text("first_name", { length: 200 }).notNull(),
  lastName: text("last_name", { length: 200 }).notNull(),
  phone: text("phone").notNull(),
  email: text("email").notNull(),
});

export const clientRelations = relations(clientsTable, ({ many }) => ({
  matters: many(mattersTable),
}));

export const selectClientSchema = createSelectSchema(clientsTable);
export type ClientType = z.infer<typeof selectClientSchema>;

export const insertClientSchema = createInsertSchema(clientsTable);
export type InsertClientType = z.infer<typeof insertClientSchema>;
