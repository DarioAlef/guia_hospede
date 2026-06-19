import { describe, it, expect } from "vitest";
import { buildChatSystemPrompt } from "./chat.prompt.js";
import type { ChatPromptContext } from "./chat.prompt.js";

const baseProperty = {
  id: "prop-1",
  code: "FLN001",
  name: "Apto Beira-Mar",
  type: "Apartamento",
  bedrooms: 2,
  bathrooms: 1,
  guestCapacity: 4,
  address: {
    street: "Rua A",
    number: "1",
    neighborhood: "Centro",
    city: "Florianópolis",
    state: "SC",
    zipCode: "88000-000",
  },
  operational: {
    wifiName: "SeazoneFLN001",
    wifiPassword: "senha123",
    selfCheckIn: true,
    accessType: "Código",
    accessInstructions: "Use o código 1234",
    hasParking: false,
  },
  rules: {
    checkInTime: "15:00",
    checkOutTime: "11:00",
    allowPets: false,
    allowSmoking: false,
    allowEvents: false,
    suitableForChildren: true,
    suitableForInfants: true,
  },
  amenities: ["Ar-condicionado", "Piscina"],
  images: [],
  host: { name: "Carlos Mendes", phone: "+5548999999999" },
  createdAt: "2026-06-19T00:00:00.000Z",
  updatedAt: "2026-06-19T00:00:00.000Z",
};

const fullGuidebook = {
  restaurants: [
    {
      name: "Ostradamus",
      cuisine: "Frutos do mar",
      description: "Ostras frescas.",
    },
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
  seasonalTip: "Leve agasalho em junho.",
  welcomeMessage: "Bem-vindo a Floripa!",
};

describe("buildChatSystemPrompt", () => {
  it("(a) contexto completo — inclui dados do imóvel e lugares do guia", () => {
    const ctx: ChatPromptContext = {
      property: baseProperty,
      guidebook: fullGuidebook,
    };
    const prompt = buildChatSystemPrompt(ctx);

    expect(prompt).toContain("SeazoneFLN001");
    expect(prompt).toContain("senha123");
    expect(prompt).toContain("Ostradamus");
    expect(prompt).toContain("Joaquina");
    expect(prompt).toContain("Leve agasalho em junho.");
    expect(prompt.length).toBeGreaterThan(0);
  });

  it("(b) guidebook === null — omite bloco de entorno e instrui fallback, prompt não-vazio", () => {
    const ctx: ChatPromptContext = { property: baseProperty, guidebook: null };
    const prompt = buildChatSystemPrompt(ctx);

    expect(prompt).not.toContain("Guia Local");
    expect(prompt).not.toContain("Ostradamus");
    expect(prompt).toContain("Carlos Mendes");
    expect(prompt).toContain("+5548999999999");
    expect(prompt.length).toBeGreaterThan(0);
  });

  it("(c) campos do imóvel nulos/vazios — usa fallback do anfitrião, sem vazio nem inventado", () => {
    const propertyWithEmptyFields = {
      ...baseProperty,
      operational: {
        ...baseProperty.operational,
        wifiName: "",
        wifiPassword: "",
        accessType: "",
        accessInstructions: "",
      },
    };
    const ctx: ChatPromptContext = {
      property: propertyWithEmptyFields,
      guidebook: null,
    };
    const prompt = buildChatSystemPrompt(ctx);

    const lines = prompt
      .split("\n")
      .filter((l) => l.includes("Wi-Fi:") || l.includes("Senha Wi-Fi:"));
    for (const line of lines) {
      expect(line).toContain("Carlos Mendes");
      expect(line).not.toMatch(/:\s*$/);
    }
    expect(prompt.length).toBeGreaterThan(0);
  });
});
