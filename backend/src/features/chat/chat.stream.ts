import { streamText } from "ai";
import { groq } from "@ai-sdk/groq";
import type { FastifyReply } from "fastify";
import type { ChatMessage } from "../../shared/dtos/chat.dto.js";
import type { ModelMessage } from "@ai-sdk/provider-utils";

const CHAT_MODEL = "openai/gpt-oss-120b";

export class ChatGenerationError extends Error {
  constructor(cause?: unknown) {
    super("Não foi possível gerar a resposta no momento");
    this.name = "ChatGenerationError";
    this.cause = cause;
  }
}

function toModelMessages(messages: ChatMessage[]): ModelMessage[] {
  return messages
    .filter((m) => m.role !== "system")
    .map((m) => ({
      role: m.role as "user" | "assistant",
      content: m.content,
    }));
}

export async function streamChatResponse(
  reply: FastifyReply,
  system: string,
  messages: ChatMessage[]
): Promise<void> {
  try {
    const result = streamText({
      model: groq(CHAT_MODEL),
      system,
      messages: toModelMessages(messages),
      temperature: 0.3,
      maxOutputTokens: 1024,
    });

    reply.hijack();
    result.pipeUIMessageStreamToResponse(reply.raw);
  } catch (error) {
    throw new ChatGenerationError(error);
  }
}
