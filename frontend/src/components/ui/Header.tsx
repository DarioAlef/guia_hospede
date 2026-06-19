import Link from "next/link";
import Image from "next/image";
import { LanguageSelector } from "./LanguageSelector";

export function Header() {
  return (
    <header className="sticky top-0 z-40 bg-seazone-navy">
      <div className="mx-auto flex max-w-2xl items-center justify-between px-4 py-3">
        <Link
          href="/"
          className="flex items-center gap-2 transition hover:opacity-90"
        >
          <Image
            src="/images/logo.png"
            alt="Logo Seazone"
            width={32}
            height={32}
            priority
            className="h-8 w-8 rounded-md"
          />
          <span className="text-xl font-bold tracking-tight text-white">
            seazone
          </span>
        </Link>
        <LanguageSelector />
      </div>
    </header>
  );
}
