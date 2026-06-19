import { describe, it, expect, vi, beforeEach } from "vitest";
import { GuidebookService } from "./guidebook.service.js";
import {
  generateGuidebook,
  GuidebookGenerationError,
} from "./guidebook.generator.js";
import { PropertyNotFoundError, PropertyService } from "../property/index.js";
import type { GuidebookRepository } from "./guidebook.repository.js";
import {
  validContent,
  propertyStub,
  persistedRecord,
} from "./guidebook.fixtures.js";

describe("GuidebookService.getOrCreateByCode", () => {
  let repository: GuidebookRepository;
  let propertyService: PropertyService;
  let generator: ReturnType<typeof vi.fn>;
  let findByPropertyCode: ReturnType<typeof vi.fn>;
  let create: ReturnType<typeof vi.fn>;
  let getByCode: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    findByPropertyCode = vi.fn();
    create = vi.fn();
    getByCode = vi.fn().mockResolvedValue(propertyStub);
    generator = vi.fn();
    repository = {
      findByPropertyCode,
      create,
    } as unknown as GuidebookRepository;
    propertyService = { getByCode } as unknown as PropertyService;
  });

  it("gera o guia quando ausente, persiste e retorna a resposta (US1)", async () => {
    findByPropertyCode.mockResolvedValue(null);
    generator.mockResolvedValue(validContent);
    create.mockResolvedValue(persistedRecord());

    const service = new GuidebookService(
      repository,
      propertyService,
      generator as unknown as typeof generateGuidebook
    );
    const result = await service.getOrCreateByCode("FLN001");

    expect(generator).toHaveBeenCalledWith(propertyStub);
    expect(create).toHaveBeenCalledWith("prop-cuid-1", validContent);
    expect(result.propertyCode).toBe("FLN001");
    expect(result.restaurants).toHaveLength(4);
    expect(result.welcomeMessage).toBe("Bem-vindo a Florianópolis!");
  });

  it("reusa o guia persistido sem reinvocar a IA (US2)", async () => {
    findByPropertyCode.mockResolvedValue(persistedRecord());

    const service = new GuidebookService(
      repository,
      propertyService,
      generator as unknown as typeof generateGuidebook
    );
    const result = await service.getOrCreateByCode("FLN001");

    expect(generator).not.toHaveBeenCalled();
    expect(create).not.toHaveBeenCalled();
    expect(result.propertyCode).toBe("FLN001");
  });

  it("propaga PropertyNotFoundError sem gerar quando o imóvel não existe", async () => {
    getByCode.mockRejectedValue(new PropertyNotFoundError("XYZ999"));

    const service = new GuidebookService(
      repository,
      propertyService,
      generator as unknown as typeof generateGuidebook
    );

    await expect(service.getOrCreateByCode("XYZ999")).rejects.toBeInstanceOf(
      PropertyNotFoundError
    );
    expect(generator).not.toHaveBeenCalled();
    expect(create).not.toHaveBeenCalled();
  });

  it("não persiste nada quando a geração falha (US3)", async () => {
    findByPropertyCode.mockResolvedValue(null);
    generator.mockRejectedValue(new GuidebookGenerationError());

    const service = new GuidebookService(
      repository,
      propertyService,
      generator as unknown as typeof generateGuidebook
    );

    await expect(service.getOrCreateByCode("FLN001")).rejects.toBeInstanceOf(
      GuidebookGenerationError
    );
    expect(create).not.toHaveBeenCalled();
  });
});
