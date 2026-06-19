import type { LucideIcon } from "./icons";

interface InfoRowProps {
  icon: LucideIcon;
  label: string;
  value: React.ReactNode;
}

export function InfoRow({ icon: Icon, label, value }: InfoRowProps) {
  return (
    <div className="flex items-start gap-3">
      <Icon className="mt-0.5 h-5 w-5 shrink-0 text-seazone-coral" aria-hidden />
      <p className="text-sm text-gray-700">
        <span className="font-semibold text-gray-900">{label}:</span> {value}
      </p>
    </div>
  );
}
