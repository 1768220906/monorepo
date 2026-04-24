import type { MiddlewareHandler } from "hono";
import { logger } from "../lib/logger.js";

export const requestLogger: MiddlewareHandler = async (c, next) => {
  const startedAt = Date.now();
  await next();
  const elapsedMs = Date.now() - startedAt;

  logger.info({
    requestId: c.get("requestId"),
    method: c.req.method,
    path: c.req.path,
    status: c.res.status,
    elapsedMs,
  });
};
