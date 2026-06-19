import { notFound } from "next/navigation";
import {
  PropertyHero,
  CapacityStats,
  AccessWifiCard,
  StayRulesCard,
  AmenitiesCard,
  HostContactCard,
} from "../../features/property";
import { GuidebookSection } from "../../features/guidebook";
import { ChatWidget } from "../../features/chat";
import type { PropertyResponse } from "../../shared/dtos/property.dto";

interface PropertyPageProps {
  params: { code: string };
}

export default async function PropertyPage({ params }: PropertyPageProps) {
  const backendUrl = process.env.BACKEND_URL ?? "http://localhost:3001";
  const res = await fetch(`${backendUrl}/properties/${params.code}`, {
    cache: "no-store",
  });

  if (res.status === 404) notFound();
  if (!res.ok) throw new Error("Falha ao buscar dados do imóvel");

  const property: PropertyResponse = await res.json();

  return (
    <main className="min-h-screen bg-seazone-background px-4 py-6">
      <div className="mx-auto max-w-2xl space-y-4">
        <PropertyHero
          name={property.name}
          type={property.type}
          city={property.address.city}
          state={property.address.state}
          imageUrl={property.images[0]}
        />
        <CapacityStats
          bedrooms={property.bedrooms}
          bathrooms={property.bathrooms}
          guests={property.guestCapacity}
        />
        <AccessWifiCard operational={property.operational} />
        <StayRulesCard rules={property.rules} />
        <AmenitiesCard amenities={property.amenities} />
        <HostContactCard host={property.host} address={property.address} />
        <GuidebookSection code={params.code} backendUrl={backendUrl} />
      </div>
      <ChatWidget code={params.code} />
    </main>
  );
}
