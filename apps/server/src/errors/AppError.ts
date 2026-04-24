import type { ContentfulStatusCode } from "hono/utils/http-status";
import type { ErrorCode } from "../constants/errorCode.js";

export class AppError extends Error {
  constructor(
    public readonly code: ErrorCode,
    public readonly status: ContentfulStatusCode,
    message: string,
    public readonly details?: unknown,
  ) {
    super(message);
    this.name = "AppError";
  }
}
