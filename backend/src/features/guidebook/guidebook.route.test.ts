import { describe, it, expect, vi } from "vitest";
import Fastify from "fastify";
import { guidebookRoute } from "./guidebook.route.js";
import { GuidebookService } from "./guidebook.service.js";
import { GuidebookGenerationError } from "./guidebook.generator.js";
import { PropertyNotFoundError } from "../property/index.js";
import { GuidebookErrorCode } from "../../shared/dtos/guidebook.dto.js";

vi.mock("../../shared/db/prisma.js", () => ({
  getPrismaClient: vi.fn(() => ({})),
}));

const validGuidebook = {
  id: "guide-cuid-1",
  propertyCode: "FLN001",
  restaurants: [
    { name: "Ostradamus", cuisine: "Frutos do mar", description: "Ostras." },
    { name: "R2", cuisine: "Brasileira", description: "Caseira." },
    { name: "R3", cuisine: "Italiana", description: "Massas." },
    { name: "R4", cuisine: "Japonesa", description: "Sushi." },
  ],
  attractions: [
    { name: "Joaquina", description: "Surfe." },
    { name: "Lagoa", description: "Barco." },
    { name: "Centro", description: "História." },
  ],
  essentialServices: [
    { name: "Hippo", type: "mercado", description: "Mercado." },
  ],
  seasonalTip: "Leve agasalho.",
  welcomeMessage: "Bem-vindo!",
  createdAt: "2026-06-19T12:00:00.000Z",
  updatedAt: "2026-06-19T12:00:00.000Z",
};

function buildApp(getOrCreateByCode: ReturnType<typeof vi.fn>) {
  const app = Fastify({ logger: false });
  return app
    .register(guidebookRoute, {
      service: { getOrCreateByCode } as unknown as GuidebookService,
    })
    .then(() => app);
}

describe("guidebookRoute — POST /properties/:code/guidebook", () => {
  it("retorna 200 com o guia gerado/persistido", async () => {
    const app = await buildApp(vi.fn().mockResolvedValue(validGuidebook));

    const res = await app.inject({
      method: "POST",
      url: "/properties/FLN001/guidebook",
    });

    expect(res.statusCode).toBe(200);
    const body = JSON.parse(res.payload);
    expect(body.propertyCode).toBe("FLN001");
    expect(body.restaurants).toHaveLength(4);
  });

  it("retorna 400 INVALID_CODE para código em minúsculas", async () => {
    const app = await buildApp(vi.fn());

    const res = await app.inject({
      method: "POST",
      url: "/properties/fln001/guidebook",
    });

    expect(res.statusCode).toBe(400);
    expect(JSON.parse(res.payload).error).toBe(GuidebookErrorCode.INVALID_CODE);
  });

  it("retorna 404 PROPERTY_NOT_FOUND para imóvel inexistente", async () => {
    const app = await buildApp(
      vi.fn().mockRejectedValue(new PropertyNotFoundError("XYZ999"))
    );

    const res = await app.inject({
      method: "POST",
      url: "/properties/XYZ999/guidebook",
    });

    expect(res.statusCode).toBe(404);
    expect(JSON.parse(res.payload).error).toBe(
      GuidebookErrorCode.PROPERTY_NOT_FOUND
    );
  });

  it("retorna 503 GENERATION_FAILED quando a geração falha (US3)", async () => {
    const app = await buildApp(
      vi.fn().mockRejectedValue(new GuidebookGenerationError())
    );

    const res = await app.inject({
      method: "POST",
      url: "/properties/FLN001/guidebook",
    });

    expect(res.statusCode).toBe(503);
    expect(JSON.parse(res.payload).error).toBe(
      GuidebookErrorCode.GENERATION_FAILED
    );
  });

  it("os erros 400, 404 e 503 possuem códigos distintos", async () => {
    const app400 = await buildApp(vi.fn());
    const app404 = await buildApp(
      vi.fn().mockRejectedValue(new PropertyNotFoundError("XYZ999"))
    );
    const app503 = await buildApp(
      vi.fn().mockRejectedValue(new GuidebookGenerationError())
    );

    const r400 = await app400.inject({
      method: "POST",
      url: "/properties/fln001/guidebook",
    });
    const r404 = await app404.inject({
      method: "POST",
      url: "/properties/XYZ999/guidebook",
    });
    const r503 = await app503.inject({
      method: "POST",
      url: "/properties/FLN001/guidebook",
    });

    const codes = [
      JSON.parse(r400.payload).error,
      JSON.parse(r404.payload).error,
      JSON.parse(r503.payload).error,
    ];
    expect(new Set(codes).size).toBe(3);
  });
});
