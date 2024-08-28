import { drizzle } from "drizzle-orm/libsql";
import * as schema from "./schema/_index.table";
import { createClient } from "@libsql/client";
import { Bindings } from "..";
import { Context } from "hono";

export function getDB(context: Context<{ Bindings: Bindings }>) {
  const { DB_URL, DB_TOKEN } = context.env;
  const turso = createClient({
    url: DB_URL,
    authToken: DB_TOKEN,
  });
  return drizzle(turso, { schema });
}
