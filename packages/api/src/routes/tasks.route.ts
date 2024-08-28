import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { insertTaskSchema, tasksTable } from "../database/schema/tasks.table";
import { eq } from "drizzle-orm";
import { getDB } from "../database";
import { Bindings } from "../..";

export const tasksRoute = new Hono<{ Bindings: Bindings }>()
  .get("/", async (c) => {
    const db = getDB(c);
    const tasks = await db.query.tasksTable.findMany();
    return c.json(tasks);
  })
  .post("/", zValidator("json", insertTaskSchema), async (c) => {
    const data = c.req.valid("json");
    const db = getDB(c);
    const newTask = await db.insert(tasksTable).values(data).returning();
    return c.json(newTask);
  })
  .get("/:id", async (c) => {
    const id = c.req.param("id");
    const db = getDB(c);
    const task = await db.query.tasksTable.findFirst({
      where: eq(tasksTable.id, id),
    });
    return c.json(task);
  })
  .delete("/:id", async (c) => {
    const id = c.req.param("id");
    const db = getDB(c);
    const deletedTask = await db
      .delete(tasksTable)
      .where(eq(tasksTable.id, id))
      .returning();
    return c.json(deletedTask);
  });
