import { describe, it, expect, vi, beforeEach } from "vitest";
import { ChatService } from "./chat.service.js";
import { PropertyNotFoundError } from "../property/index.js";

const mockProperty = {
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
  amenities: [],
  images: [],
  host: { name: "Carlos", phone: "+5548999999999" },
  createdAt: "2026-06-19T00:00:00.000Z",
  updatedAt: "2026-06-19T00:00:00.000Z",
};

const mockPropertyService = {
  getByCode: vi.fn(),
};

const mockGuidebookRepository = {
  findByPropertyCode: vi.fn(),
};

function buildService() {
  return new ChatService(
    mockPropertyService as never,
    mockGuidebookRepository as never
  );
}

describe("ChatService.loadChatContext", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  it("retorna { property, guidebook: null } quando o guia não existe", async () => {
    mockPropertyService.getByCode.mockResolvedValue(mockProperty);
    mockGuidebookRepository.findByPropertyCode.mockResolvedValue(null);

    const service = buildService();
    const ctx = await service.loadChatContext("FLN001");

    expect(ctx.property).toEqual(mockProperty);
    expect(ctx.guidebook).toBeNull();
  });

  it("retorna { property, guidebook } quando o guia existe", async () => {
    mockPropertyService.getByCode.mockResolvedValue(mockProperty);
    mockGuidebookRepository.findByPropertyCode.mockResolvedValue({
      restaurants: [{ name: "R", cuisine: "C", description: "D" }],
      attractions: [{ name: "A", description: "D" }],
      essentialServices: [{ name: "S", type: "T", description: "D" }],
      seasonalTip: "Dica",
      welcomeMessage: "Bem-vindo",
    });

    const service = buildService();
    const ctx = await service.loadChatContext("FLN001");

    expect(ctx.guidebook).not.toBeNull();
    expect(ctx.guidebook?.seasonalTip).toBe("Dica");
  });

  it("propaga PropertyNotFoundError sem chamar guidebook", async () => {
    mockPropertyService.getByCode.mockRejectedValue(
      new PropertyNotFoundError("XYZ999")
    );

    const service = buildService();

    await expect(service.loadChatContext("XYZ999")).rejects.toThrow(
      PropertyNotFoundError
    );
    expect(mockGuidebookRepository.findByPropertyCode).not.toHaveBeenCalled();
  });
});
