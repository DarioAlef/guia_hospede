"use client";
import { useState } from "react";
import { useChatAssistant } from "../hooks/useChatAssistant";
import { ChatWindow } from "./ChatWindow";
import { MessageCircle, X } from "../../../components/ui/icons";

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
        className="flex items-center gap-2 rounded-full bg-seazone-coral px-5 py-3 text-sm font-semibold text-white shadow-lg transition-transform hover:scale-105"
      >
        {open ? (
          <X className="h-5 w-5" aria-hidden />
        ) : (
          <MessageCircle className="h-5 w-5" aria-hidden />
        )}
        {open ? "Fechar" : "Assistente Virtual"}
      </button>
    </div>
  );
}
