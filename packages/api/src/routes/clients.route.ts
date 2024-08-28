import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { eq } from "drizzle-orm";
import {
  clientsTable,
  insertClientSchema,
} from "../database/schema/clients.table";
import { getDB } from "../database";
import { Bindings } from "../..";

export const clientsRoute = new Hono<{ Bindings: Bindings }>()
  .get("/", async (c) => {
    const db = getDB(c);
    const clients = await db.query.clientsTable.findMany();
    return c.json(clients);
  })
  .post("/", zValidator("json", insertClientSchema), async (c) => {
    const data = c.req.valid("json");
    const db = getDB(c);
    const newClient = await db.insert(clientsTable).values(data).returning();
    return c.json(newClient);
  })
  .get("/:id{[0-9]+}", async (c) => {
    const id = Number(c.req.param("id"));
    const db = getDB(c);
    const client = await db.query.clientsTable.findFirst({
      where: eq(clientsTable.id, id),
      with: { matters: true },
    });
    return c.json(client);
  })
  .delete("/:id{[0-9]+}", async (c) => {
    const id = Number(c.req.param("id"));
    const db = getDB(c);
    const deletedClient = await db
      .delete(clientsTable)
      .where(eq(clientsTable.id, id))
      .returning();
    return c.json(deletedClient);
  })
  .get("/test", (c) => {
    return c.text("this is a test2");
  });
