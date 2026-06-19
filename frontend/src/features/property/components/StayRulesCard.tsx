import { Card } from "../../../components/ui/Card";
import { InfoRow } from "../../../components/ui/InfoRow";
import {
  Clock,
  Check,
  X,
  PawPrint,
  Cigarette,
  PartyPopper,
  Baby,
} from "../../../components/ui/icons";
import type { LucideIcon } from "../../../components/ui/icons";
import type { PropertyResponse } from "../../../shared/dtos/property.dto";

interface StayRulesCardProps {
  rules: PropertyResponse["rules"];
}

interface Policy {
  icon: LucideIcon;
  label: string;
  allowed: boolean;
}

export function StayRulesCard({ rules }: StayRulesCardProps) {
  const policies: Policy[] = [
    { icon: PawPrint, label: "Animais", allowed: rules.allowPets },
    { icon: Cigarette, label: "Fumantes", allowed: rules.allowSmoking },
    { icon: PartyPopper, label: "Eventos", allowed: rules.allowEvents },
    { icon: Baby, label: "Crianças", allowed: rules.suitableForChildren },
  ];

  return (
    <Card className="space-y-3">
      <h2 className="text-sm font-bold uppercase tracking-wide text-gray-900">
        Check-in / Check-out
      </h2>
      <InfoRow icon={Clock} label="Check-in" value={rules.checkInTime} />
      <InfoRow icon={Clock} label="Check-out" value={rules.checkOutTime} />
      <ul className="flex flex-wrap gap-2 pt-1">
        {policies.map(({ icon: Icon, label, allowed }) => (
          <li
            key={label}
            className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${
              allowed
                ? "bg-emerald-50 text-emerald-700"
                : "bg-rose-50 text-rose-700"
            }`}
          >
            <Icon className="h-4 w-4" aria-hidden />
            {label}
            {allowed ? (
              <Check className="h-3.5 w-3.5" aria-hidden />
            ) : (
              <X className="h-3.5 w-3.5" aria-hidden />
            )}
          </li>
        ))}
      </ul>
    </Card>
  );
}
