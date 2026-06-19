"use client";
import { useState, useId } from "react";

interface AccordionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

export function Accordion({
  title,
  children,
  defaultOpen = false,
}: AccordionProps) {
  const [open, setOpen] = useState(defaultOpen);
  const uid = useId();
  const headingId = `${uid}-heading`;
  const regionId = `${uid}-region`;

  return (
    <div className="bg-seazone-card rounded-2xl shadow-sm overflow-hidden">
      <button
        type="button"
        id={headingId}
        aria-expanded={open}
        aria-controls={regionId}
        onClick={() => setOpen((prev) => !prev)}
        className="w-full flex items-center justify-between px-6 py-4 text-left font-semibold text-seazone-navy hover:bg-gray-50 transition-colors"
      >
        <span>{title}</span>
        <svg
          aria-hidden="true"
          className={`w-5 h-5 text-seazone-navy transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      <div
        id={regionId}
        role="region"
        aria-labelledby={headingId}
        className={open ? "block" : "hidden"}
      >
        <div className="px-6 pb-5">{children}</div>
      </div>
    </div>
  );
}
