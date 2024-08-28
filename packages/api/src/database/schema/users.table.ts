import { relations } from "drizzle-orm";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { firmsTable } from "./firms.table";
import { sqliteTable, text } from "drizzle-orm/sqlite-core";

export const usersTable = sqliteTable("users", {
  id: text("id"),
  firstName: text("first_name", { length: 200 }).notNull(),
  lastName: text("last_name", { length: 200 }).notNull(),
  firmId: text("firm_id").notNull(),
});

export const usersRelations = relations(usersTable, ({ one }) => ({
  firm: one(firmsTable, {
    fields: [usersTable.firmId],
    references: [firmsTable.id],
  }),
}));

export const selectuserschema = createSelectSchema(usersTable);
export const insertuserschema = createInsertSchema(usersTable);
