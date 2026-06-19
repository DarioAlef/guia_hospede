import type { PrismaClient } from "@prisma/client";
import type { GuidebookContent } from "../../shared/dtos/guidebook.dto.js";

export class GuidebookRepository {
  constructor(private readonly db: PrismaClient) {}

  async findByPropertyCode(code: string) {
    return this.db.guidebook.findFirst({
      where: { property: { code } },
      include: { property: { select: { code: true } } },
    });
  }

  async create(propertyId: string, content: GuidebookContent) {
    return this.db.guidebook.create({
      data: { propertyId, ...content },
      include: { property: { select: { code: true } } },
    });
  }
}
