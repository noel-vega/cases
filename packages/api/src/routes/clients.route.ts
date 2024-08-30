import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { eq, like, or, sql } from "drizzle-orm";
import {
  clientsTable,
  insertClientSchema,
} from "../database/schema/clients.table";
import { getDB } from "../database";
import { Bindings } from "../..";
import { HTTPException } from "hono/http-exception";
import { z } from "zod";

export const clientsRoute = new Hono<{ Bindings: Bindings }>()
  .get(
    "/",
    zValidator("query", z.object({ name: z.string() }).partial().nullable()),
    async (c) => {
      const query = c.req.valid("query");
      console.log(query);
      const db = getDB(c);
      const sqlQuery = db.select().from(clientsTable);
      if (query?.name) {
        const nameFilter = sql`lower(${clientsTable.firstName} || " " || ${clientsTable.lastName}) LIKE '%' || lower(${query.name}) || '%'`;
        sqlQuery.where(nameFilter);
      }
      const clients = await sqlQuery.execute();
      return c.json(clients);
    }
  )
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

    if (!client) {
      throw new HTTPException(404, { message: "Not found" });
    }
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
    return c.text("this is a test3");
  });
