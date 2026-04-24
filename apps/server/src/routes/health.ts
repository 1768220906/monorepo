import { Hono } from "hono";
import { healthController } from "../controllers/healthController.js";
import { validateQuery } from "../middlewares/validate.js";
import { healthQuerySchema } from "../schemas/healthSchema.js";

export const healthRouter = new Hono();

healthRouter.get("/", validateQuery(healthQuerySchema), c => {
  const { detailed } = c.req.valid("query");
  return healthController.getHealth(c, detailed);
});
