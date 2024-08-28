import { Hono } from "hono";
import { mattersRoute } from "./src/routes/matters.route";
import { tasksRoute } from "./src/routes/tasks.route";
import { clientsRoute } from "./src/routes/clients.route";
import { cors } from "hono/cors";

// hello

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
