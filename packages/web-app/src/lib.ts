import type { ApiRoutes } from "api";
import { hc } from "hono/client";

export const { api } = hc<ApiRoutes>(
  "https://test-app.noelvegajr94.workers.dev"
);
