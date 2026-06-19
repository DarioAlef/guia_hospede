import { z } from "zod";
import { ChatErrorCode } from "../../../shared/dtos/chat.dto";

const IncomingMessagePartSchema = z.object({
  text: z.string().optional(),
});

const IncomingMessageSchema = z.object({
  role: z.enum(["user", "assistant", "system"]),
  parts: z.array(IncomingMessagePartSchema).optional(),
  content: z.string().optional(),
});

const ChatProxyRequestSchema = z.object({
  code: z.string(),
  messages: z.array(IncomingMessageSchema).default([]),
});

type IncomingMessage = z.infer<typeof IncomingMessageSchema>;

function flattenContent(message: IncomingMessage): string {
  if (message.parts) {
    return message.parts.map((part) => part.text ?? "").join("");
  }
  return message.content ?? "";
}

export async function POST(request: Request) {
  const parsed = ChatProxyRequestSchema.safeParse(await request.json());

  if (!parsed.success) {
    return new Response(JSON.stringify({ error: ChatErrorCode.INVALID_REQUEST }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const { code, messages } = parsed.data;
  const mappedMessages = messages.map((message) => ({
    role: message.role,
    content: flattenContent(message),
  }));

  const backendUrl = process.env.BACKEND_URL ?? "http://localhost:3001";
  const upstream = await fetch(`${backendUrl}/properties/${code}/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages: mappedMessages }),
  });

  return new Response(upstream.body, {
    status: upstream.status,
    headers: upstream.headers,
  });
}
