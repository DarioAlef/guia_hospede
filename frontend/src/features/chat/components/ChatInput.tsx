"use client";
import { useState, type FormEvent } from "react";

interface ChatInputProps {
  onSend: (text: string) => void;
  disabled?: boolean;
}

export function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [text, setText] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;
    onSend(trimmed);
    setText("");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex gap-2 p-3 border-t border-gray-100"
    >
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        disabled={disabled}
        placeholder="Pergunte sobre o imóvel..."
        className="flex-1 rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none focus:border-seazone-coral disabled:opacity-50"
      />
      <button
        type="submit"
        disabled={disabled || !text.trim()}
        className="rounded-xl bg-seazone-coral px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
      >
        Enviar
      </button>
    </form>
  );
}
