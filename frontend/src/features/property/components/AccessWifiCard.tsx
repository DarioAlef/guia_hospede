import { Card } from "../../../components/ui/Card";
import { InfoRow } from "../../../components/ui/InfoRow";
import { Wifi, KeyRound, Lock, Car } from "../../../components/ui/icons";
import type { PropertyResponse } from "../../../shared/dtos/property.dto";

interface AccessWifiCardProps {
  operational: PropertyResponse["operational"];
}

export function AccessWifiCard({ operational }: AccessWifiCardProps) {
  return (
    <Card className="space-y-3">
      <h2 className="text-sm font-bold uppercase tracking-wide text-gray-900">
        Acesso & Wi-Fi
      </h2>
      <InfoRow icon={Wifi} label="Rede" value={operational.wifiName} />
      <InfoRow
        icon={KeyRound}
        label="Senha"
        value={<span className="select-all">{operational.wifiPassword}</span>}
      />
      <InfoRow
        icon={Lock}
        label="Acesso"
        value={
          <span className="select-all">{operational.accessInstructions}</span>
        }
      />
      {operational.hasParking && operational.parkingInfo && (
        <InfoRow
          icon={Car}
          label="Estacionamento"
          value={operational.parkingInfo}
        />
      )}
    </Card>
  );
}
