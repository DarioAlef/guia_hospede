import { describe, it, expect } from "vitest";
import { describeAmenity } from "./amenityLabels";

describe("describeAmenity", () => {
  it("retorna o rótulo mapeado para uma chave conhecida", () => {
    expect(describeAmenity("air_conditioning").label).toBe("Ar-condicionado");
    expect(describeAmenity("wifi").label).toBe("Wi-Fi");
  });

  it("sempre retorna um ícone definido", () => {
    expect(describeAmenity("kitchen").icon).toBeDefined();
    expect(describeAmenity("chave_inexistente").icon).toBeDefined();
  });

  it("gera um rótulo legível como fallback para chave desconhecida", () => {
    expect(describeAmenity("hot_tub").label).toBe("Hot tub");
    expect(describeAmenity("sauna").label).toBe("Sauna");
  });

  it("nunca retorna undefined nem lança para qualquer entrada", () => {
    expect(() => describeAmenity("")).not.toThrow();
    expect(describeAmenity("")).not.toBeUndefined();
  });
});
