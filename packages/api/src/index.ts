import { Hono } from "hono";
import { mattersRoute } from "./routes/matters.route";
import { tasksRoute } from "./routes/tasks.route";
import { clientsRoute } from "./routes/clients.route";
import { cors } from "hono/cors";

export type Bindings = {
  DB_URL: string;
  DB_TOKEN: string;
};

const app = new Hono<{ Bindings: Bindings }>();

app.use("*", cors());

const apiRoutes = app
  .basePath("/api")
  .route("/matters", mattersRoute)
  .route("/tasks", tasksRoute)
  .route("/clients", clientsRoute);

export type ApiRoutes = typeof apiRoutes;

export default app;
