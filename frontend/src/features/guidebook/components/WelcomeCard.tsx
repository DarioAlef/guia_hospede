import { Card } from "../../../components/ui/Card";

interface WelcomeCardProps {
  message: string;
}

export function WelcomeCard({ message }: WelcomeCardProps) {
  return (
    <Card variant="navy">
      <h2 className="text-base font-bold mb-3">Bem-vindo!</h2>
      <p className="text-slate-300 text-sm leading-relaxed">{message}</p>
    </Card>
  );
}
