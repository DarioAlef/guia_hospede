import { Card } from "../../../components/ui/Card";
import { describeAmenity } from "../lib/amenityLabels";

interface AmenitiesCardProps {
  amenities: string[];
}

export function AmenitiesCard({ amenities }: AmenitiesCardProps) {
  if (amenities.length === 0) return null;

  return (
    <Card className="space-y-3">
      <h2 className="text-sm font-bold uppercase tracking-wide text-gray-900">
        Comodidades
      </h2>
      <ul className="flex flex-wrap gap-2">
        {amenities.map((key) => {
          const { label, icon: Icon } = describeAmenity(key);
          return (
            <li
              key={key}
              className="flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1.5 text-xs font-medium text-gray-700"
            >
              <Icon className="h-4 w-4 text-seazone-coral" aria-hidden />
              {label}
            </li>
          );
        })}
      </ul>
    </Card>
  );
}
