import { Card } from "../../../components/ui/Card";

interface SeasonalTipCardProps {
  tip: string;
}

export function SeasonalTipCard({ tip }: SeasonalTipCardProps) {
  return (
    <Card variant="light">
      <h2 className="text-xs font-bold text-seazone-coral uppercase tracking-widest mb-2">
        Dica da Temporada
      </h2>
      <p className="text-sm text-gray-700 leading-relaxed">{tip}</p>
    </Card>
  );
}
