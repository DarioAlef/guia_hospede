"use client";
import { useEffect, useRef } from "react";
import type { UIMessage } from "@ai-sdk/react";

interface ChatMessageListProps {
  messages: UIMessage[];
  isLoading: boolean;
}

export function ChatMessageList({ messages, isLoading }: ChatMessageListProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto p-3 space-y-3">
      {messages.map((msg) => {
        const text = msg.parts
          .filter((p) => p.type === "text")
          .map((p) => (p as { type: "text"; text: string }).text)
          .join("");

        return (
          <div
            key={msg.id}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm ${
                msg.role === "user"
                  ? "bg-seazone-coral text-white"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              {text}
            </div>
          </div>
        );
      })}
      {isLoading && (
        <div className="flex justify-start">
          <div className="max-w-[80%] rounded-2xl bg-gray-100 px-3 py-2 text-sm text-gray-400">
            digitando…
          </div>
        </div>
      )}
      <div ref={bottomRef} />
    </div>
  );
}
