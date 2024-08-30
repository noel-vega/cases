import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { clientsTable } from "./clients.table";
import { relations } from "drizzle-orm";
import { tasksTable } from "./tasks.table";
import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { z } from "zod";

export const mattersTable = sqliteTable("matters", {
  id: text("id").primaryKey(),
  name: text("name", { length: 200 }).notNull(),
  clientId: text("client_id")
    .notNull()
    .references(() => clientsTable.id),
});

export const mattersRelations = relations(mattersTable, ({ one, many }) => ({
  client: one(clientsTable, {
    fields: [mattersTable.clientId],
    references: [clientsTable.id],
  }),
  tasks: many(tasksTable),
}));

export const selectMatterSchema = createSelectSchema(mattersTable);
export type MatterType = z.infer<typeof selectMatterSchema>;

export const insertMatterSchema = createInsertSchema(mattersTable);
export type InsertMatterType = z.infer<typeof insertMatterSchema>;
