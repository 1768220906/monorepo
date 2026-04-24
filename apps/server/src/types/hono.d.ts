declare module "hono" {
  interface ContextVariableMap {
    requestId: string;
    logger: import("pino").Logger;
  }
}

export {};
