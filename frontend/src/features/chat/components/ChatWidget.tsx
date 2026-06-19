"use client";
import { useState } from "react";
import { useChatAssistant } from "../hooks/useChatAssistant";
import { ChatWindow } from "./ChatWindow";

interface ChatWidgetProps {
  code: string;
}

export function ChatWidget({ code }: ChatWidgetProps) {
  const [open, setOpen] = useState(false);
  const { messages, status, sendMessage } = useChatAssistant(code);
  const isLoading = status === "streaming" || status === "submitted";

  function handleSend(text: string) {
    sendMessage({ text });
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {open && (
        <ChatWindow
          messages={messages}
          isLoading={isLoading}
          onSend={handleSend}
        />
      )}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Fechar assistente" : "Abrir assistente"}
        className="w-14 h-14 rounded-full bg-seazone-coral shadow-sm text-white text-2xl flex items-center justify-center"
      >
        {open ? "✕" : "💬"}
      </button>
    </div>
  );
}
