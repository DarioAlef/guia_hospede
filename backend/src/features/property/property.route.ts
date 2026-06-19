import type { FastifyInstance } from "fastify";
import { PropertyRepository } from "./property.repository.js";
import { PropertyService, PropertyNotFoundError } from "./property.service.js";
import {
  PropertyCodeParamSchema,
  PropertyErrorCode,
} from "../../shared/dtos/property.dto.js";
import { getPrismaClient } from "../../shared/db/prisma.js";

interface PropertyRouteOptions {
  service?: PropertyService;
}

export async function propertyRoute(
  app: FastifyInstance,
  opts: PropertyRouteOptions = {}
): Promise<void> {
  const service =
    opts.service ??
    new PropertyService(new PropertyRepository(getPrismaClient()));

  app.get<{ Params: { code: string } }>(
    "/properties/:code",
    async (request, reply) => {
      const paramResult = PropertyCodeParamSchema.safeParse(request.params);
      if (!paramResult.success) {
        return reply.code(400).send({
          error: PropertyErrorCode.INVALID_CODE,
          message: paramResult.error.errors[0]?.message,
        });
      }

      try {
        const property = await service.getByCode(paramResult.data.code);
        return reply.code(200).send(property);
      } catch (error) {
        if (error instanceof PropertyNotFoundError) {
          return reply.code(404).send({
            error: PropertyErrorCode.PROPERTY_NOT_FOUND,
            message: error.message,
          });
        }
        throw error;
      }
    }
  );
}
