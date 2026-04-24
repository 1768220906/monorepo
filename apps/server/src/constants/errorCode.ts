export const ERROR_CODE = {
  VALIDATION_ERROR: "validation_error",
  NOT_FOUND: "not_found",
  HTTP_EXCEPTION: "http_exception",
  INTERNAL_ERROR: "internal_error",
} as const;

export type ErrorCode = (typeof ERROR_CODE)[keyof typeof ERROR_CODE];
