import type { PropertyRepository } from "./property.repository.js";
import {
  PropertySchema,
  PropertyListSchema,
  type PropertyResponse,
  type PropertyList,
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

  async listAll(): Promise<PropertyList> {
    const rows = await this.repository.findAll();

    const summaries = rows.map((row) => {
      const address = row.address as { city: string; state: string };
      const images = row.images as string[];

      return {
        code: row.code,
        name: row.name,
        type: row.type,
        bedrooms: row.bedrooms,
        guestCapacity: row.guestCapacity,
        city: address.city,
        state: address.state,
        image: images[0] ?? null,
      };
    });

    return PropertyListSchema.parse(summaries);
  }
}
