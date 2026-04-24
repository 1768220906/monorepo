import type { NotFoundHandler } from "hono";
import { ERROR_CODE } from "../constants/errorCode.js";
import { fail } from "../utils/response.js";

export const notFoundHandler: NotFoundHandler = c =>
  fail(
    c,
    {
      code: ERROR_CODE.NOT_FOUND,
      message: "Route Not Found",
    },
    404,
  );
