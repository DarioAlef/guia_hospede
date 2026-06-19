import { describe, it, expect, vi, beforeEach } from "vitest";
import Fastify from "fastify";
import { chatRoute } from "./chat.route.js";
import { ChatService } from "./chat.service.js";
import { ChatGenerationError } from "./chat.stream.js";
import { PropertyNotFoundError } from "../property/index.js";
import { ChatErrorCode } from "../../shared/dtos/chat.dto.js";

vi.mock("../../shared/db/prisma.js", () => ({
  getPrismaClient: vi.fn(() => ({})),
}));

vi.mock("./chat.stream.js", async (importOriginal) => {
  const original = await importOriginal<typeof import("./chat.stream.js")>();
  return { ...original, streamChatResponse: vi.fn().mockResolvedValue(undefined) };
});

const validBody = { messages: [{ role: "user", content: "Qual a senha do Wi-Fi?" }] };

const mockContext = {
  property: {
    id: "p1", code: "FLN001", name: "Apto", type: "Apartamento",
    bedrooms: 2, bathrooms: 1, guestCapacity: 4,
    address: { street: "Rua A", number: "1", neighborhood: "Centro", city: "Floripa", state: "SC", zipCode: "88000-000" },
    operational: { wifiName: "Net", wifiPassword: "pw", selfCheckIn: true, accessType: "Código", accessInstructions: "1234", hasParking: false },
    rules: { checkInTime: "15:00", checkOutTime: "11:00", allowPets: false, allowSmoking: false, allowEvents: false, suitableForChildren: true, suitableForInfants: true },
    amenities: [], images: [],
    host: { name: "Carlos", phone: "+5548999999999" },
    createdAt: "2026-06-19T00:00:00.000Z", updatedAt: "2026-06-19T00:00:00.000Z",
  },
  guidebook: null,
};

function buildApp(loadChatContext: ReturnType<typeof vi.fn>) {
  const app = Fastify({ logger: false });
  return app.register(chatRoute, { service: { loadChatContext } as unknown as ChatService }).then(() => app);
}

describe("chatRoute — POST /properties/:code/chat", () => {
  beforeEach(() => { vi.clearAllMocks(); });

  it("retorna 200 e faz streaming quando válido", async () => {
    const { streamChatResponse } = await import("./chat.stream.js");
    vi.mocked(streamChatResponse).mockResolvedValue(undefined);
    const app = await buildApp(vi.fn().mockResolvedValue(mockContext));
    const res = await app.inject({ method: "POST", url: "/properties/FLN001/chat", payload: validBody });
    expect(res.statusCode).toBe(200);
  });

  it("retorna 400 INVALID_CODE para código inválido", async () => {
    const app = await buildApp(vi.fn());
    const res = await app.inject({ method: "POST", url: "/properties/fln001/chat", payload: validBody });
    expect(res.statusCode).toBe(400);
    expect(JSON.parse(res.payload).error).toBe(ChatErrorCode.INVALID_CODE);
  });

  it("retorna 400 INVALID_REQUEST para messages vazio", async () => {
    const app = await buildApp(vi.fn());
    const res = await app.inject({ method: "POST", url: "/properties/FLN001/chat", payload: { messages: [] } });
    expect(res.statusCode).toBe(400);
    expect(JSON.parse(res.payload).error).toBe(ChatErrorCode.INVALID_REQUEST);
  });

  it("retorna 400 INVALID_REQUEST quando última mensagem não é do usuário", async () => {
    const app = await buildApp(vi.fn());
    const res = await app.inject({
      method: "POST", url: "/properties/FLN001/chat",
      payload: { messages: [{ role: "user", content: "Oi" }, { role: "assistant", content: "Olá!" }] },
    });
    expect(res.statusCode).toBe(400);
    expect(JSON.parse(res.payload).error).toBe(ChatErrorCode.INVALID_REQUEST);
  });

  it("retorna 404 PROPERTY_NOT_FOUND para imóvel inexistente", async () => {
    const app = await buildApp(vi.fn().mockRejectedValue(new PropertyNotFoundError("XYZ999")));
    const res = await app.inject({ method: "POST", url: "/properties/XYZ999/chat", payload: validBody });
    expect(res.statusCode).toBe(404);
    expect(JSON.parse(res.payload).error).toBe(ChatErrorCode.PROPERTY_NOT_FOUND);
  });

  it("retorna 503 CHAT_FAILED quando a geração falha", async () => {
    const { streamChatResponse } = await import("./chat.stream.js");
    vi.mocked(streamChatResponse).mockRejectedValue(new ChatGenerationError());
    const app = await buildApp(vi.fn().mockResolvedValue(mockContext));
    const res = await app.inject({ method: "POST", url: "/properties/FLN001/chat", payload: validBody });
    expect(res.statusCode).toBe(503);
    expect(JSON.parse(res.payload).error).toBe(ChatErrorCode.CHAT_FAILED);
  });
});
