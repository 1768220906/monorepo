import { HTTPException } from "hono/http-exception";
import type { ErrorHandler } from "hono";
import { ERROR_CODE } from "../constants/errorCode.js";
import { AppError } from "../errors/AppError.js";
import { fail } from "../utils/response.js";

export const errorHandler: ErrorHandler = (err, c) => {
  const reqLogger = c.get("logger");

  if (err instanceof AppError) {
    reqLogger.error({
      code: err.code,
      status: err.status,
      message: err.message,
      details: err.details,
    });
    return fail(
      c,
      {
        code: err.code,
        message: err.message,
        details: err.details,
      },
      err.status,
    );
  }

  if (err instanceof HTTPException) {
    reqLogger.warn({ code: ERROR_CODE.HTTP_EXCEPTION, status: err.status, message: err.message });
    return fail(
      c,
      {
        code: ERROR_CODE.HTTP_EXCEPTION,
        message: err.message,
      },
      err.status,
    );
  }

  reqLogger.error({ code: ERROR_CODE.INTERNAL_ERROR, message: String(err) });
  return fail(
    c,
    {
      code: ERROR_CODE.INTERNAL_ERROR,
      message: "Internal Server Error",
      details: process.env.NODE_ENV === "development" ? String(err) : undefined,
    },
    500,
  );
};
