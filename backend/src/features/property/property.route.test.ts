import { describe, it, expect, vi } from "vitest";
import Fastify from "fastify";
import { propertyRoute } from "./property.route.js";
import { PropertyNotFoundError, PropertyService } from "./property.service.js";
import { PropertyErrorCode } from "../../shared/dtos/property.dto.js";

vi.mock("../../shared/db/prisma.js", () => ({
  getPrismaClient: vi.fn(() => ({})),
}));

vi.mock("./property.repository.js", () => ({
  PropertyRepository: vi.fn(() => ({ findByCode: vi.fn() })),
}));

describe("propertyRoute — validação do param :code", () => {
  it("retorna 400 para código em minúsculas (fln001)", async () => {
    const app = Fastify({ logger: false });
    await app.register(propertyRoute, {
      service: { getByCode: vi.fn() } as unknown as PropertyService,
    });

    const res = await app.inject({ method: "GET", url: "/properties/fln001" });

    expect(res.statusCode).toBe(400);
    expect(JSON.parse(res.payload).error).toBe(PropertyErrorCode.INVALID_CODE);
  });

  it("retorna 400 para código curto (abc — 3 chars)", async () => {
    const app = Fastify({ logger: false });
    await app.register(propertyRoute, {
      service: { getByCode: vi.fn() } as unknown as PropertyService,
    });

    const res = await app.inject({ method: "GET", url: "/properties/abc" });

    expect(res.statusCode).toBe(400);
    expect(JSON.parse(res.payload).error).toBe(PropertyErrorCode.INVALID_CODE);
  });

  it("retorna 400 para código com caractere especial (FLN-01)", async () => {
    const app = Fastify({ logger: false });
    await app.register(propertyRoute, {
      service: { getByCode: vi.fn() } as unknown as PropertyService,
    });

    const res = await app.inject({
      method: "GET",
      url: "/properties/FLN-01",
    });

    expect(res.statusCode).toBe(400);
    expect(JSON.parse(res.payload).error).toBe(PropertyErrorCode.INVALID_CODE);
  });

  it("retorna 404 para código válido mas imóvel inexistente (XYZ999)", async () => {
    const mockService = {
      getByCode: vi
        .fn()
        .mockRejectedValue(new PropertyNotFoundError("XYZ999")),
    } as unknown as PropertyService;
    const app = Fastify({ logger: false });
    await app.register(propertyRoute, { service: mockService });

    const res = await app.inject({
      method: "GET",
      url: "/properties/XYZ999",
    });

    expect(res.statusCode).toBe(404);
    const body = JSON.parse(res.payload);
    expect(body.error).toBe(PropertyErrorCode.PROPERTY_NOT_FOUND);
    expect(body.message).toContain("XYZ999");
  });

  it("erros 400 e 404 possuem payloads distintos", async () => {
    const appInvalid = Fastify({ logger: false });
    await appInvalid.register(propertyRoute, {
      service: { getByCode: vi.fn() } as unknown as PropertyService,
    });

    const appNotFound = Fastify({ logger: false });
    await appNotFound.register(propertyRoute, {
      service: {
        getByCode: vi
          .fn()
          .mockRejectedValue(new PropertyNotFoundError("XYZ999")),
      } as unknown as PropertyService,
    });

    const res400 = await appInvalid.inject({
      method: "GET",
      url: "/properties/abc",
    });
    const res404 = await appNotFound.inject({
      method: "GET",
      url: "/properties/XYZ999",
    });

    expect(JSON.parse(res400.payload).error).toBe(PropertyErrorCode.INVALID_CODE);
    expect(JSON.parse(res404.payload).error).toBe(PropertyErrorCode.PROPERTY_NOT_FOUND);
  });
});
