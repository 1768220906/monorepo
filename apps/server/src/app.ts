import { Hono } from "hono";
import { requestLogger } from "./middlewares/requestLogger.js";
import { requestId } from "./middlewares/requestId.js";
import { apiRouter } from "./routes/index.js";
import { ok } from "./utils/response.js";
import { errorHandler } from "./handlers/errorHandler.js";
import { notFoundHandler } from "./handlers/notFoundHandler.js";

export const createApp = (): Hono => {
  const app = new Hono();

  app.onError(errorHandler);
  app.notFound(notFoundHandler);

  app.use("*", requestId);
  app.use("*", requestLogger);

  app.get("/", c => ok(c, { message: "@monorepo/server is running" }));

  app.route("/api", apiRouter);

  return app;
};
