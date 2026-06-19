import { describe, it, expect, vi, beforeEach } from "vitest";
import { PropertyService } from "./property.service.js";
import type { PropertyRepository } from "./property.repository.js";

const mockFindByCode = vi.fn();
const mockFindAll = vi.fn();
const mockRepository = {
  findByCode: mockFindByCode,
  findAll: mockFindAll,
} as unknown as PropertyRepository;

describe("PropertyService", () => {
  let service: PropertyService;

  beforeEach(() => {
    vi.clearAllMocks();
    service = new PropertyService(mockRepository);
  });

  it("retorna a ficha completa do imóvel ao consultar por código existente", async () => {
    const mockRaw = {
      id: "cuid123",
      code: "FLN001",
      name: "Apartamento Beira-Mar Floripa",
      type: "Apartamento",
      bedrooms: 2,
      bathrooms: 1,
      guestCapacity: 4,
      address: {
        street: "Av. Beira-Mar Norte",
        number: "2250",
        complement: "Apto 501",
        neighborhood: "Agronômica",
        city: "Florianópolis",
        state: "SC",
        zipCode: "88025-301",
      },
      operational: {
        wifiName: "SeazoneFLN001",
        wifiPassword: "flnguest2024",
        selfCheckIn: true,
        accessType: "cofre",
        accessInstructions:
          "O cofre está na entrada do prédio, coluna direita. Código: 4821.",
        propertyPassword: "4821",
        hasParking: true,
        parkingInfo: "Vaga 12, subsolo 1.",
      },
      rules: {
        checkInTime: "15:00",
        checkOutTime: "11:00",
        allowPets: false,
        allowSmoking: false,
        allowEvents: false,
        suitableForChildren: true,
        suitableForInfants: false,
      },
      amenities: ["wifi", "tv", "ar-condicionado"],
      images: ["https://images.seazone.com.br/fln001/sala.jpg"],
      host: { name: "Carlos Mendes", phone: "+55 48 99123-4567" },
      createdAt: new Date("2026-06-19T00:00:00.000Z"),
      updatedAt: new Date("2026-06-19T00:00:00.000Z"),
    };

    mockFindByCode.mockResolvedValue(mockRaw);

    const result = await service.getByCode("FLN001");

    expect(result.code).toBe("FLN001");
    expect(result.name).toBe("Apartamento Beira-Mar Floripa");
    expect(result.address.city).toBe("Florianópolis");
    expect(result.operational.wifiName).toBe("SeazoneFLN001");
    expect(result.rules.allowPets).toBe(false);
    expect(result.host.name).toBe("Carlos Mendes");
    expect(result.amenities).toContain("wifi");
    expect(mockFindByCode).toHaveBeenCalledWith("FLN001");
  });

  it("retorna lista resumida apenas com campos públicos seguros", async () => {
    const mockRows = [
      {
        code: "GRM001",
        name: "Chalé Serra Gramado",
        type: "Casa",
        bedrooms: 3,
        guestCapacity: 6,
        address: { city: "Gramado", state: "RS" },
        images: ["/images/grm001.jpeg"],
        operational: { wifiPassword: "segredo", propertyPassword: "1983" },
      },
    ];

    mockFindAll.mockResolvedValue(mockRows);

    const result = await service.listAll();

    expect(result).toHaveLength(1);
    expect(result[0]).toEqual({
      code: "GRM001",
      name: "Chalé Serra Gramado",
      type: "Casa",
      bedrooms: 3,
      guestCapacity: 6,
      city: "Gramado",
      state: "RS",
      image: "/images/grm001.jpeg",
    });
    expect(result[0]).not.toHaveProperty("operational");
    expect(JSON.stringify(result)).not.toContain("segredo");
  });

  it("usa null como imagem quando o imóvel não possui imagens", async () => {
    mockFindAll.mockResolvedValue([
      {
        code: "PER007",
        name: "Loft Centro",
        type: "Loft",
        bedrooms: 1,
        guestCapacity: 2,
        address: { city: "Curitiba", state: "PR" },
        images: [],
      },
    ]);

    const result = await service.listAll();

    expect(result[0]?.image).toBeNull();
  });

  it("retorna lista vazia quando não há imóveis cadastrados", async () => {
    mockFindAll.mockResolvedValue([]);

    const result = await service.listAll();

    expect(result).toEqual([]);
  });
});
