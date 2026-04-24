import { z } from "zod";

export const healthQuerySchema = z.object({
  detailed: z
    .union([z.literal("true"), z.literal("false"), z.literal("1"), z.literal("0")])
    .optional()
    .transform(value => value === "true" || value === "1")
    .default(false),
});

export type HealthQuery = z.infer<typeof healthQuerySchema>;
