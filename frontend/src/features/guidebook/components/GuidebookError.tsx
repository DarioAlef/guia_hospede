import { Card } from "../../../components/ui/Card";
import { GuidebookErrorCode } from "../../../shared/dtos/guidebook.dto";
import type { GuidebookErrorCodeValue } from "../../../shared/dtos/guidebook.dto";

const ERROR_MESSAGES: Record<GuidebookErrorCodeValue | "UNKNOWN", string> = {
  [GuidebookErrorCode.GENERATION_FAILED]:
    "Não foi possível gerar o guia no momento. Tente novamente em instantes.",
  [GuidebookErrorCode.PROPERTY_NOT_FOUND]:
    "Imóvel não encontrado. Verifique o código com o seu anfitrião.",
  [GuidebookErrorCode.INVALID_CODE]:
    "Código de imóvel inválido. Verifique o link recebido.",
  UNKNOWN: "Ocorreu um erro inesperado. Por favor, tente novamente.",
};

interface GuidebookErrorProps {
  code: GuidebookErrorCodeValue | "UNKNOWN";
}

export function GuidebookError({ code }: GuidebookErrorProps) {
  return (
    <div data-testid="guidebook-error">
      <Card variant="light">
        <p className="text-sm font-semibold text-seazone-coral mb-1">Ops!</p>
        <p className="text-sm text-gray-600">{ERROR_MESSAGES[code]}</p>
      </Card>
    </div>
  );
}
