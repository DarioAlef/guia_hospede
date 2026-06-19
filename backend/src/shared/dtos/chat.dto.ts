import { z } from "zod";

export const ChatMessageSchema = z.object({
  role: z.enum(["user", "assistant", "system"]),
  content: z.string().min(1),
});

export type ChatMessage = z.infer<typeof ChatMessageSchema>;

export const ChatRequestSchema = z.object({
  messages: z
    .array(ChatMessageSchema)
    .min(1)
    .refine((msgs) => msgs[msgs.length - 1]?.role === "user", {
      message: "A última mensagem deve ser do usuário (role: user)",
    }),
});

export type ChatRequest = z.infer<typeof ChatRequestSchema>;

export const ChatErrorCode = {
  INVALID_CODE: "INVALID_CODE",
  INVALID_REQUEST: "INVALID_REQUEST",
  PROPERTY_NOT_FOUND: "PROPERTY_NOT_FOUND",
  CHAT_FAILED: "CHAT_FAILED",
} as const;

export type ChatErrorCodeValue =
  (typeof ChatErrorCode)[keyof typeof ChatErrorCode];
