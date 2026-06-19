import { describe, it, expect } from "vitest";
import { ChatRequestSchema } from "../../shared/dtos/chat.dto.js";

describe("ChatRequestSchema", () => {
  it("aceita corpo válido com última mensagem do usuário", () => {
    const result = ChatRequestSchema.safeParse({
      messages: [{ role: "user", content: "Qual a senha do Wi-Fi?" }],
    });
    expect(result.success).toBe(true);
  });

  it("aceita conversa com histórico onde última é do usuário", () => {
    const result = ChatRequestSchema.safeParse({
      messages: [
        { role: "user", content: "Olá" },
        { role: "assistant", content: "Olá! Como posso ajudar?" },
        { role: "user", content: "Qual o Wi-Fi?" },
      ],
    });
    expect(result.success).toBe(true);
  });

  it("rejeita messages vazio", () => {
    const result = ChatRequestSchema.safeParse({ messages: [] });
    expect(result.success).toBe(false);
  });

  it("rejeita quando última mensagem não é do usuário", () => {
    const result = ChatRequestSchema.safeParse({
      messages: [
        { role: "user", content: "Olá" },
        { role: "assistant", content: "Olá!" },
      ],
    });
    expect(result.success).toBe(false);
  });

  it("rejeita content vazio", () => {
    const result = ChatRequestSchema.safeParse({
      messages: [{ role: "user", content: "" }],
    });
    expect(result.success).toBe(false);
  });
});
