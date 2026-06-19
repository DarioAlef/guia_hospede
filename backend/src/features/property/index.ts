import type { PrismaClient } from "@prisma/client";
import { PropertyService } from "./property.service.js";
import { PropertyRepository } from "./property.repository.js";

export { PropertyService, PropertyNotFoundError } from "./property.service.js";
export type { PropertyResponse } from "../../shared/dtos/property.dto.js";

export function createPropertyService(db: PrismaClient): PropertyService {
  return new PropertyService(new PropertyRepository(db));
}
