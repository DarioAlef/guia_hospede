import { z } from "zod";

export const HealthResponseSchema = z.object({
  status: z.enum(["ok", "error"]),
  uptime: z.number().optional(),
  timestamp: z.string().datetime(),
});

export type HealthResponse = z.infer<typeof HealthResponseSchema>;
