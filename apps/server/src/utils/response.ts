import type { Context } from "hono";
import type { ContentfulStatusCode } from "hono/utils/http-status";
import type { ApiResponse } from "../types/apiResponse.js";

const getRequestId = (c: Context): string => c.get("requestId") ?? "unknown";

export const ok = <T>(c: Context, data: T, status: ContentfulStatusCode = 200) =>
  c.json<ApiResponse<T>>(
    {
      success: true,
      requestId: getRequestId(c),
      data,
    },
    status,
  );

export const fail = (
  c: Context,
  error: { code: string; message: string; details?: unknown },
  status: ContentfulStatusCode = 500,
) =>
  c.json<ApiResponse<never>>(
    {
      success: false,
      requestId: getRequestId(c),
      error,
    },
    status,
  );
