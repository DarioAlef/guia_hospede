import { Card } from "../../../components/ui/Card";
import { BedDouble, Bath, Users } from "../../../components/ui/icons";
import type { LucideIcon } from "../../../components/ui/icons";

interface CapacityStatsProps {
  bedrooms: number;
  bathrooms: number;
  guests: number;
}

interface Stat {
  icon: LucideIcon;
  value: number;
  label: string;
}

export function CapacityStats({
  bedrooms,
  bathrooms,
  guests,
}: CapacityStatsProps) {
  const stats: Stat[] = [
    { icon: BedDouble, value: bedrooms, label: "quartos" },
    { icon: Bath, value: bathrooms, label: "banheiros" },
    { icon: Users, value: guests, label: "hóspedes" },
  ];

  return (
    <Card className="grid grid-cols-3 gap-4 text-center">
      {stats.map(({ icon: Icon, value, label }) => (
        <div key={label} className="flex flex-col items-center gap-1">
          <Icon className="h-6 w-6 text-seazone-coral" aria-hidden />
          <p className="text-xl font-semibold text-gray-900">{value}</p>
          <p className="text-xs text-gray-500">{label}</p>
        </div>
      ))}
    </Card>
  );
}
