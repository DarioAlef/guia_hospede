"use client";
import { ChatMessageList } from "./ChatMessageList";
import { ChatInput } from "./ChatInput";
import type { UIMessage } from "@ai-sdk/react";

interface ChatWindowProps {
  messages: UIMessage[];
  isLoading: boolean;
  onSend: (text: string) => void;
}

export function ChatWindow({ messages, isLoading, onSend }: ChatWindowProps) {
  return (
    <div className="flex flex-col h-96 w-80 rounded-2xl shadow-lg bg-white border border-gray-100">
      <div className="px-4 py-3 border-b border-gray-100 bg-seazone-coral rounded-t-2xl">
        <p className="text-sm font-semibold text-white">Assistente do Imóvel</p>
      </div>
      <ChatMessageList messages={messages} isLoading={isLoading} />
      <ChatInput onSend={onSend} disabled={isLoading} />
    </div>
  );
}
