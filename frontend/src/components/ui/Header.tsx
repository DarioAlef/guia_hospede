import { LanguageSelector } from "./LanguageSelector";

export function Header() {
  return (
    <header className="sticky top-0 z-40 bg-seazone-navy">
      <div className="mx-auto flex max-w-2xl items-center justify-between px-4 py-3">
        <span className="text-xl font-bold tracking-tight text-white">
          seazone
        </span>
        <LanguageSelector />
      </div>
    </header>
  );
}
