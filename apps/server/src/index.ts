import { serve } from "@hono/node-server";
import { createApp } from "./app.js";
import { env } from "./config/env.js";

const app = createApp();

serve({ fetch: app.fetch, port: env.port }, info => {
  // Keep startup log concise for local dev and CI.
  console.log(`[@monorepo/server] listening on http://localhost:${info.port}`);
});
