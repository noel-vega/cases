import type { ApiRoutes } from "api";
import { hc } from "hono/client";

console.log(process.env.NODE_ENV);
export const { api } = hc<ApiRoutes>(
  process.env.NODE_ENV === "development"
    ? "http://localhost:8787"
    : "https://test-app.noelvegajr94.workers.dev"
);
