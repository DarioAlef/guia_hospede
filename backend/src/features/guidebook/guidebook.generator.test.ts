import { describe, it, expect, vi, beforeEach } from "vitest";
import { GuidebookGenerationSchema } from "../../shared/dtos/guidebook.dto.js";
import type { PropertyResponse } from "../property/index.js";

const { mockGenerateObject } = vi.hoisted(() => ({
  mockGenerateObject: vi.fn(),
}));

vi.mock("ai", () => ({ generateObject: mockGenerateObject }));
vi.mock("@ai-sdk/groq", () => ({ groq: vi.fn(() => "mock-model") }));

import {
  generateGuidebook,
  GuidebookGenerationError,
} from "./guidebook.generator.js";

const validContent = {
  restaurants: [
    { name: "R1", cuisine: "Frutos do mar", description: "Ostras." },
    { name: "R2", cuisine: "Brasileira", description: "Caseira." },
    { name: "R3", cuisine: "Italiana", description: "Massas." },
    { name: "R4", cuisine: "Japonesa", description: "Sushi." },
  ],
  attractions: [
    { name: "A1", description: "Surfe." },
    { name: "A2", description: "Barco." },
    { name: "A3", description: "História." },
  ],
  essentialServices: [{ name: "S1", type: "mercado", description: "Mercado." }],
  seasonalTip: "Leve agasalho.",
  welcomeMessage: "Bem-vindo!",
};

const propertyStub = {
  name: "Apartamento Beira-Mar",
  type: "Apartamento",
  address: { neighborhood: "Agronômica", city: "Florianópolis", state: "SC" },
} as unknown as PropertyResponse;

describe("GuidebookGenerationSchema", () => {
  it("aceita uma saída completa e válida", () => {
    expect(GuidebookGenerationSchema.safeParse(validContent).success).toBe(true);
  });

  it("rejeita saída com menos de 4 restaurantes", () => {
    const invalid = { ...validContent, restaurants: validContent.restaurants.slice(0, 3) };
    expect(GuidebookGenerationSchema.safeParse(invalid).success).toBe(false);
  });

  it("rejeita saída sem welcomeMessage", () => {
    const { welcomeMessage, ...invalid } = validContent;
    expect(GuidebookGenerationSchema.safeParse(invalid).success).toBe(false);
  });
});

describe("generateGuidebook", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("retorna o objeto gerado quando a IA responde com saída válida", async () => {
    mockGenerateObject.mockResolvedValue({ object: validContent });

    const result = await generateGuidebook(propertyStub);

    expect(result).toEqual(validContent);
    expect(mockGenerateObject).toHaveBeenCalledOnce();
  });

  it("lança GuidebookGenerationError quando o provider/validação falha", async () => {
    mockGenerateObject.mockRejectedValue(new Error("provider indisponível"));

    await expect(generateGuidebook(propertyStub)).rejects.toBeInstanceOf(
      GuidebookGenerationError
    );
  });
});
