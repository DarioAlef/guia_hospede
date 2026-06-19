import type { GuidebookRepository } from "./guidebook.repository.js";
import { generateGuidebook } from "./guidebook.generator.js";
import { PropertyService } from "../property/index.js";
import {
  GuidebookResponseSchema,
  type GuidebookResponse,
} from "../../shared/dtos/guidebook.dto.js";

type GuidebookGenerator = typeof generateGuidebook;

type PersistedGuidebook = Awaited<
  ReturnType<GuidebookRepository["findByPropertyCode"]>
>;

export class GuidebookService {
  constructor(
    private readonly repository: GuidebookRepository,
    private readonly propertyService: PropertyService,
    private readonly generator: GuidebookGenerator = generateGuidebook
  ) {}

  async getOrCreateByCode(code: string): Promise<GuidebookResponse> {
    const property = await this.propertyService.getByCode(code);

    const existing = await this.repository.findByPropertyCode(code);
    if (existing) return this.toResponse(existing);

    const content = await this.generator(property);
    const created = await this.repository.create(property.id, content);
    return this.toResponse(created);
  }

  private toResponse(record: NonNullable<PersistedGuidebook>): GuidebookResponse {
    return GuidebookResponseSchema.parse({
      id: record.id,
      propertyCode: record.property.code,
      restaurants: record.restaurants,
      attractions: record.attractions,
      essentialServices: record.essentialServices,
      seasonalTip: record.seasonalTip,
      welcomeMessage: record.welcomeMessage,
      createdAt: record.createdAt.toISOString(),
      updatedAt: record.updatedAt.toISOString(),
    });
  }
}
