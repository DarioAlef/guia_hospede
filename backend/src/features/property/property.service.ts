import type { PropertyRepository } from "./property.repository.js";
import {
  PropertySchema,
  type PropertyResponse,
} from "../../shared/dtos/property.dto.js";

export class PropertyNotFoundError extends Error {
  constructor(code: string) {
    super(`Imóvel com código ${code} não encontrado`);
    this.name = "PropertyNotFoundError";
  }
}

export class PropertyService {
  constructor(private readonly repository: PropertyRepository) {}

  async getByCode(code: string): Promise<PropertyResponse> {
    const raw = await this.repository.findByCode(code);
    if (!raw) throw new PropertyNotFoundError(code);

    return PropertySchema.parse({
      ...raw,
      createdAt: raw.createdAt.toISOString(),
      updatedAt: raw.updatedAt.toISOString(),
    });
  }
}
