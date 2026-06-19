"use client";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";

export function useChatAssistant(code: string) {
  return useChat({
    transport: new DefaultChatTransport({ api: "/api/chat", body: { code } }),
  });
}
