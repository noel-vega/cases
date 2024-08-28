import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { getDB } from "../database";
import { mattersTable } from "../database/schema/_index.table";
import { eq } from "drizzle-orm";
import { insertMatterSchema } from "../database/schema/matters.table";
import { Bindings } from "..";

export const mattersRoute = new Hono<{ Bindings: Bindings }>()
  .get("/", async (c) => {
    const db = getDB(c);
    const matters = await db.query.mattersTable.findMany();
    return c.json(matters);
  })
  .post("/", zValidator("json", insertMatterSchema), async (c) => {
    const data = c.req.valid("json");
    const db = getDB(c);
    const newMatter = await db.insert(mattersTable).values(data).returning();
    return c.json(newMatter);
  })
  .get("/:id", async (c) => {
    const id = c.req.param("id");
    const db = getDB(c);
    const matter = await db.query.mattersTable.findFirst({
      where: eq(mattersTable.id, id),
      with: {
        tasks: true,
      },
    });
    return c.json(matter);
  })
  .delete("/:id", async (c) => {
    const id = c.req.param("id");
    const db = getDB(c);
    const deletedMatter = await db
      .delete(mattersTable)
      .where(eq(mattersTable.id, id))
      .returning();
    return c.json(deletedMatter);
  });
