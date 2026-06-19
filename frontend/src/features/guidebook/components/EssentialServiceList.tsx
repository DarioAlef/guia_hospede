import { Accordion } from "../../../components/ui/Accordion";
import type { GuidebookResponse } from "../../../shared/dtos/guidebook.dto";

type EssentialService = GuidebookResponse["essentialServices"][number];

interface EssentialServiceListProps {
  services: EssentialService[];
}

export function EssentialServiceList({ services }: EssentialServiceListProps) {
  return (
    <Accordion title="Serviços Essenciais">
      <div className="space-y-4">
        {services.map((service, index) => (
          <div
            key={index}
            className="border-b border-gray-100 pb-4 last:border-0 last:pb-0"
          >
            <p className="font-semibold text-seazone-navy text-sm">{service.name}</p>
            <p className="text-xs text-seazone-coral mt-0.5 font-medium">{service.type}</p>
            <p className="text-sm text-gray-600 mt-1 leading-relaxed">{service.description}</p>
          </div>
        ))}
      </div>
    </Accordion>
  );
}
