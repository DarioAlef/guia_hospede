import { Card } from "../../../components/ui/Card";
import { InfoRow } from "../../../components/ui/InfoRow";
import { Users, MapPin } from "../../../components/ui/icons";
import type { PropertyResponse } from "../../../shared/dtos/property.dto";

interface HostContactCardProps {
  host: PropertyResponse["host"];
  address: PropertyResponse["address"];
}

function formatAddress(address: PropertyResponse["address"]): string {
  const line = [address.street, address.number].filter(Boolean).join(", ");
  const withComplement = address.complement
    ? `${line} — ${address.complement}`
    : line;
  return `${withComplement}, ${address.neighborhood}, ${address.city}/${address.state}, ${address.zipCode}`;
}

export function HostContactCard({ host, address }: HostContactCardProps) {
  return (
    <Card className="space-y-3">
      <h2 className="text-sm font-bold uppercase tracking-wide text-gray-900">
        Anfitrião
      </h2>
      <InfoRow icon={Users} label={host.name} value={host.phone} />
      <InfoRow icon={MapPin} label="Endereço" value={formatAddress(address)} />
    </Card>
  );
}
