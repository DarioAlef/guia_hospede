import type { FastifyInstance } from "fastify";
import { PropertyRepository } from "../property/property.repository.js";
import { PropertyService, PropertyNotFoundError } from "../property/index.js";
import { GuidebookRepository } from "../guidebook/guidebook.repository.js";
import { ChatService } from "./chat.service.js";
import { ChatGenerationError, streamChatResponse } from "./chat.stream.js";
import { buildChatSystemPrompt } from "./chat.prompt.js";
import { PropertyCodeParamSchema } from "../../shared/dtos/property.dto.js";
import {
  ChatRequestSchema,
  ChatErrorCode,
} from "../../shared/dtos/chat.dto.js";
import { getPrismaClient } from "../../shared/db/prisma.js";

interface ChatRouteOptions {
  service?: ChatService;
}

export async function chatRoute(
  app: FastifyInstance,
  opts: ChatRouteOptions = {}
): Promise<void> {
  const service =
    opts.service ??
    (() => {
      const db = getPrismaClient();
      return new ChatService(
        new PropertyService(new PropertyRepository(db)),
        new GuidebookRepository(db)
      );
    })();

  app.post<{ Params: { code: string } }>(
    "/properties/:code/chat",
    async (request, reply) => {
      const paramResult = PropertyCodeParamSchema.safeParse(request.params);
      if (!paramResult.success) {
        return reply.code(400).send({
          error: ChatErrorCode.INVALID_CODE,
          message: paramResult.error.errors[0]?.message,
        });
      }

      const bodyResult = ChatRequestSchema.safeParse(request.body);
      if (!bodyResult.success) {
        return reply.code(400).send({
          error: ChatErrorCode.INVALID_REQUEST,
          message: bodyResult.error.errors[0]?.message,
        });
      }

      try {
        const context = await service.loadChatContext(paramResult.data.code);
        const system = buildChatSystemPrompt(context);
        await streamChatResponse(reply, system, bodyResult.data.messages);
      } catch (error) {
        if (reply.sent) return;
        if (error instanceof PropertyNotFoundError) {
          return reply.code(404).send({
            error: ChatErrorCode.PROPERTY_NOT_FOUND,
            message: error.message,
          });
        }
        if (error instanceof ChatGenerationError) {
          return reply.code(503).send({
            error: ChatErrorCode.CHAT_FAILED,
            message: error.message,
          });
        }
        throw error;
      }
    }
  );
}
