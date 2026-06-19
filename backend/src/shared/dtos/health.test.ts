import { describe, it, expect } from "vitest";
import { HealthResponseSchema } from "./health.js";

describe("HealthResponseSchema", () => {
  it("valida resposta de saúde completa (ok)", () => {
    const validOk = {
      status: "ok" as const,
      uptime: 12.34,
      timestamp: new Date().toISOString(),
    };
    expect(HealthResponseSchema.safeParse(validOk).success).toBe(true);
  });

  it("valida resposta de erro sem uptime", () => {
    const validError = {
      status: "error" as const,
      timestamp: new Date().toISOString(),
    };
    expect(HealthResponseSchema.safeParse(validError).success).toBe(true);
  });

  it("rejeita status inválido", () => {
    const invalidStatus = {
      status: "unknown",
      uptime: 12.34,
      timestamp: new Date().toISOString(),
    };
    expect(HealthResponseSchema.safeParse(invalidStatus).success).toBe(false);
  });

  it("rejeita timestamp ausente", () => {
    const missingTimestamp = {
      status: "ok",
      uptime: 12.34,
    };
    expect(HealthResponseSchema.safeParse(missingTimestamp).success).toBe(
      false
    );
  });

  it("rejeita timestamp com formato inválido", () => {
    const invalidTimestamp = {
      status: "ok",
      uptime: 12.34,
      timestamp: "não-é-iso",
    };
    expect(HealthResponseSchema.safeParse(invalidTimestamp).success).toBe(
      false
    );
  });
});
