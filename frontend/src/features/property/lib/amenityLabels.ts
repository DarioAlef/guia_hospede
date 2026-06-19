import {
  Wifi,
  Tv,
  Wind,
  Utensils,
  WashingMachine,
  ArrowUpDown,
  Trees,
  Flame,
  Check,
} from "../../../components/ui/icons";
import type { LucideIcon } from "../../../components/ui/icons";

interface AmenityDescriptor {
  label: string;
  icon: LucideIcon;
}

const AMENITY_LABELS: Record<string, AmenityDescriptor> = {
  wifi: { label: "Wi-Fi", icon: Wifi },
  tv: { label: "TV", icon: Tv },
  air_conditioning: { label: "Ar-condicionado", icon: Wind },
  kitchen: { label: "Cozinha", icon: Utensils },
  washing_machine: { label: "Máquina de lavar", icon: WashingMachine },
  elevator: { label: "Elevador", icon: ArrowUpDown },
  balcony: { label: "Varanda", icon: Trees },
  bbqgrill: { label: "Churrasqueira", icon: Flame },
  dishwasher: { label: "Lava-louças", icon: Utensils },
};

function toReadableLabel(key: string): string {
  const spaced = key.replace(/_/g, " ");
  return spaced.charAt(0).toUpperCase() + spaced.slice(1);
}

export function describeAmenity(key: string): AmenityDescriptor {
  return AMENITY_LABELS[key] ?? { label: toReadableLabel(key), icon: Check };
}
