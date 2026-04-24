import { zValidator } from "@hono/zod-validator";
import type { ZodSchema } from "zod";
import { ERROR_CODE } from "../constants/errorCode.js";
import { AppError } from "../errors/AppError.js";

export const validateQuery = <T extends ZodSchema>(schema: T) =>
  zValidator("query", schema, result => {
    if (!result.success) {
      throw new AppError(
        ERROR_CODE.VALIDATION_ERROR,
        422,
        "Query validation failed",
        result.error.issues,
      );
    }
  });
