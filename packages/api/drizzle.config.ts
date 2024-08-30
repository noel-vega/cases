import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/database/schema/_index.table.ts",
  dialect: "sqlite",
  driver: "turso",
  dbCredentials: {
    url: process.env.DB_URL!,
    authToken: process.env.DB_TOKEN,
  },
});
