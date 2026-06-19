import { PropertyCard } from "../features/property";
import {
  PropertyListSchema,
  type PropertyList,
} from "../shared/dtos/property.dto";

async function getProperties(): Promise<PropertyList> {
  const backendUrl = process.env.BACKEND_URL ?? "http://localhost:3001";
  const res = await fetch(`${backendUrl}/properties`, { cache: "no-store" });

  if (!res.ok) throw new Error("Falha ao buscar a lista de imóveis");

  return PropertyListSchema.parse(await res.json());
}

export default async function HomePage() {
  const properties = await getProperties();

  return (
    <main className="min-h-screen bg-seazone-background px-4 py-8">
      <div className="mx-auto max-w-5xl">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-seazone-navy">
            Seu lugar fora de casa
          </h1>
          <p className="mt-2 text-slate-500">
            Escolha um imóvel para acessar o guia digital do hóspede.
          </p>
        </header>

        {properties.length === 0 ? (
          <p className="rounded-2xl bg-white p-8 text-center text-slate-500 shadow-sm">
            Nenhum imóvel disponível no momento.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {properties.map((property) => (
              <PropertyCard key={property.code} property={property} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
