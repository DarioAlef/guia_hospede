import type { GuidebookContent } from "../../shared/dtos/guidebook.dto.js";

export const validContent: GuidebookContent = {
  restaurants: [
    {
      name: "Ostradamus",
      cuisine: "Frutos do mar",
      description: "Ostras no Ribeirão.",
    },
    {
      name: "Restaurante 2",
      cuisine: "Brasileira",
      description: "Comida caseira.",
    },
    {
      name: "Restaurante 3",
      cuisine: "Italiana",
      description: "Massas artesanais.",
    },
    {
      name: "Restaurante 4",
      cuisine: "Japonesa",
      description: "Sushi fresco.",
    },
  ],
  attractions: [
    { name: "Praia da Joaquina", description: "Dunas e surfe." },
    { name: "Lagoa da Conceição", description: "Passeios de barco." },
    { name: "Centro Histórico", description: "Arquitetura colonial." },
  ],
  essentialServices: [
    {
      name: "Supermercado Hippo",
      type: "mercado",
      description: "Mercado completo.",
    },
  ],
  seasonalTip: "No inverno, leve agasalho.",
  welcomeMessage: "Bem-vindo a Florianópolis!",
};

export const propertyStub = {
  id: "prop-cuid-1",
  code: "FLN001",
  name: "Apartamento Beira-Mar Floripa",
  type: "Apartamento",
  address: { neighborhood: "Agronômica", city: "Florianópolis", state: "SC" },
};

export function persistedRecord() {
  return {
    id: "guide-cuid-1",
    propertyId: "prop-cuid-1",
    ...validContent,
    createdAt: new Date("2026-06-19T12:00:00.000Z"),
    updatedAt: new Date("2026-06-19T12:00:00.000Z"),
    property: { code: "FLN001" },
  };
}
