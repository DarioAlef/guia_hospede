import type { PrismaClient } from "@prisma/client";

export class PropertyRepository {
  constructor(private readonly db: PrismaClient) {}

  async findByCode(code: string) {
    return this.db.property.findUnique({ where: { code } });
  }
}
