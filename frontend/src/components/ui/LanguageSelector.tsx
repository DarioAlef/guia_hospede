"use client";
import { useState } from "react";

const LANGUAGES = ["PT", "EN", "ES"] as const;
type Language = (typeof LANGUAGES)[number];

interface LanguageSelectorProps {
  defaultLanguage?: Language;
}

export function LanguageSelector({
  defaultLanguage = "PT",
}: LanguageSelectorProps) {
  const [active, setActive] = useState<Language>(defaultLanguage);

  return (
    <div className="flex items-center gap-1 text-xs font-semibold">
      {LANGUAGES.map((language) => (
        <button
          key={language}
          type="button"
          onClick={() => setActive(language)}
          aria-pressed={active === language}
          className={`rounded-md px-2 py-1 transition-colors ${
            active === language
              ? "bg-seazone-coral text-white"
              : "text-slate-300 hover:text-white"
          }`}
        >
          {language}
        </button>
      ))}
    </div>
  );
}
