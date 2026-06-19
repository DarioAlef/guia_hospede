import type { PrismaClient } from "@prisma/client";

export class PropertyRepository {
  constructor(private readonly db: PrismaClient) {}

  async findByCode(code: string) {
    return this.db.property.findUnique({ where: { code } });
  }

  async findAll() {
    return this.db.property.findMany({ orderBy: { name: "asc" } });
  }
}
