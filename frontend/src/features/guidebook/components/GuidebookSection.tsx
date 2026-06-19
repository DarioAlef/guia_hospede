"use client";
import { useGuidebook } from "../hooks/useGuidebook";
import { WelcomeCard } from "./WelcomeCard";
import { RestaurantList } from "./RestaurantList";
import { AttractionList } from "./AttractionList";
import { EssentialServiceList } from "./EssentialServiceList";
import { SeasonalTipCard } from "./SeasonalTipCard";
import { GuidebookSkeleton } from "./GuidebookSkeleton";
import { GuidebookError } from "./GuidebookError";

interface GuidebookSectionProps {
  code: string;
  backendUrl: string;
}

export function GuidebookSection({ code, backendUrl }: GuidebookSectionProps) {
  const state = useGuidebook(code, backendUrl);

  if (state.status === "loading") return <GuidebookSkeleton />;
  if (state.status === "error") return <GuidebookError code={state.code} />;

  const { guidebook } = state;

  return (
    <div className="space-y-4">
      <WelcomeCard message={guidebook.welcomeMessage} />
      <RestaurantList restaurants={guidebook.restaurants} />
      <AttractionList attractions={guidebook.attractions} />
      <EssentialServiceList services={guidebook.essentialServices} />
      <SeasonalTipCard tip={guidebook.seasonalTip} />
    </div>
  );
}
