import type { MiddlewareHandler } from "hono";
import { randomUUID } from "node:crypto";
import { logger } from "../lib/logger.js";

export const requestId: MiddlewareHandler = async (c, next) => {
  const id = randomUUID();
  c.set("requestId", id);
  c.set("logger", logger.child({ requestId: id }));
  c.header("x-request-id", id);
  await next();
};
