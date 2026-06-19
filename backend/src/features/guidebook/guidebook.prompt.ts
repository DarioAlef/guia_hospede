import type { PropertyResponse } from "../property/index.js";

const MONTH_NAMES_PT_BR = [
  "janeiro",
  "fevereiro",
  "março",
  "abril",
  "maio",
  "junho",
  "julho",
  "agosto",
  "setembro",
  "outubro",
  "novembro",
  "dezembro",
];

export function buildGuidebookPrompt(
  property: PropertyResponse,
  now: Date
): { system: string; prompt: string } {
  const { name, type, address } = property;
  const { neighborhood, city, state } = address;
  const monthName = MONTH_NAMES_PT_BR[now.getMonth()];

  const system = [
    "Você é um concierge local especialista em hospitalidade no Brasil.",
    "Gere um guia local para hóspedes inteiramente em Português do Brasil.",
    "Sugira APENAS lugares reais, existentes e verificáveis próximos à localização informada.",
    "Nunca invente nomes de estabelecimentos, endereços ou serviços.",
    "Inclua de 4 a 5 restaurantes reais, de 3 a 4 atrações reais e ao menos um serviço essencial (mercado, farmácia ou transporte).",
    "A dica sazonal deve ser adequada ao mês e à região informados.",
  ].join(" ");

  const prompt = [
    `Imóvel: ${name} (${type}).`,
    `Localização: bairro ${neighborhood}, ${city} - ${state}.`,
    `Mês atual: ${monthName}.`,
    "Gere o guia local fundamentado nessa localização real, com mensagem de boas-vindas acolhedora.",
  ].join("\n");

  return { system, prompt };
}
