import type { FastifyInstance } from "fastify";
import { GuidebookRepository } from "./guidebook.repository.js";
import { GuidebookService } from "./guidebook.service.js";
import { GuidebookGenerationError } from "./guidebook.generator.js";
import {
  createPropertyService,
  PropertyNotFoundError,
} from "../property/index.js";
import { PropertyCodeParamSchema } from "../../shared/dtos/property.dto.js";
import { GuidebookErrorCode } from "../../shared/dtos/guidebook.dto.js";
import { getPrismaClient } from "../../shared/db/prisma.js";

interface GuidebookRouteOptions {
  service?: GuidebookService;
}

function buildDefaultService(): GuidebookService {
  const db = getPrismaClient();
  return new GuidebookService(
    new GuidebookRepository(db),
    createPropertyService(db)
  );
}

export async function guidebookRoute(
  app: FastifyInstance,
  opts: GuidebookRouteOptions = {}
): Promise<void> {
  const service = opts.service ?? buildDefaultService();

  app.post<{ Params: { code: string } }>(
    "/properties/:code/guidebook",
    async (request, reply) => {
      const paramResult = PropertyCodeParamSchema.safeParse(request.params);
      if (!paramResult.success) {
        return reply.code(400).send({
          error: GuidebookErrorCode.INVALID_CODE,
          message: paramResult.error.errors[0]?.message,
        });
      }

      try {
        const guidebook = await service.getOrCreateByCode(
          paramResult.data.code
        );
        return reply.code(200).send(guidebook);
      } catch (error) {
        if (error instanceof PropertyNotFoundError) {
          return reply.code(404).send({
            error: GuidebookErrorCode.PROPERTY_NOT_FOUND,
            message: error.message,
          });
        }
        if (error instanceof GuidebookGenerationError) {
          return reply.code(503).send({
            error: GuidebookErrorCode.GENERATION_FAILED,
            message: error.message,
          });
        }
        throw error;
      }
    }
  );
}
