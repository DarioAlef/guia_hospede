import { notFound } from "next/navigation";
import { PropertyCard } from "../../features/property";
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
    <main className="min-h-screen bg-seazone-background py-6 px-4">
      <div className="max-w-2xl mx-auto space-y-4">
        <PropertyCard property={property} />
        <GuidebookSection code={params.code} backendUrl={backendUrl} />
      </div>
      <ChatWidget code={params.code} />
    </main>
  );
}
