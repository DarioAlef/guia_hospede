import type { FastifyInstance } from "fastify";
import { HealthResponseSchema, type HealthResponse } from "../dtos/health.js";

export async function healthRoute(app: FastifyInstance): Promise<void> {
  app.get("/health", async (): Promise<HealthResponse> => {
    const response = {
      status: "ok" as const,
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
    };

    return HealthResponseSchema.parse(response);
  });
}
