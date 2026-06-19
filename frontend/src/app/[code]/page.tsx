import { notFound } from "next/navigation";
import { PropertyCard } from "../../features/property/components/PropertyCard";
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
    <main className="min-h-screen p-4 md:p-8">
      <PropertyCard property={property} />
    </main>
  );
}
