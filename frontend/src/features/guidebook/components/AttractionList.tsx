import { Accordion } from "../../../components/ui/Accordion";
import type { GuidebookResponse } from "../../../shared/dtos/guidebook.dto";

type Attraction = GuidebookResponse["attractions"][number];

interface AttractionListProps {
  attractions: Attraction[];
}

export function AttractionList({ attractions }: AttractionListProps) {
  return (
    <Accordion title="Atrações Locais">
      <div className="space-y-4">
        {attractions.map((attraction, index) => (
          <div
            key={index}
            className="border-b border-gray-100 pb-4 last:border-0 last:pb-0"
          >
            <p className="font-semibold text-seazone-navy text-sm">{attraction.name}</p>
            <p className="text-sm text-gray-600 mt-1 leading-relaxed">{attraction.description}</p>
          </div>
        ))}
      </div>
    </Accordion>
  );
}
