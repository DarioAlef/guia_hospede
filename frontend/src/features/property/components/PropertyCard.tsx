"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin } from "../../../components/ui/icons";
import type { PropertySummary } from "../../../shared/dtos/property.dto";

export function PropertyCard({ property }: { property: PropertySummary }) {
  const [imageFailed, setImageFailed] = useState(false);
  const showImage = Boolean(property.image) && !imageFailed;

  return (
    <Link
      href={`/property/${property.code}`}
      data-testid="property-card"
      className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5 transition hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-seazone-coral"
    >
      <div className="relative h-48 w-full overflow-hidden bg-seazone-navy">
        {showImage && property.image && (
          <Image
            src={property.image}
            alt={property.name}
            fill
            sizes="(max-width: 768px) 100vw, 384px"
            className="object-cover transition duration-300 group-hover:scale-105"
            onError={() => setImageFailed(true)}
          />
        )}
        <div className="absolute left-3 top-3 rounded-full bg-black/55 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-white backdrop-blur">
          {property.type}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <h2 className="text-lg font-bold leading-tight text-seazone-navy">
          {property.name}
        </h2>
        <p className="mt-1 flex items-center gap-1 text-sm text-slate-500">
          <MapPin className="h-4 w-4 shrink-0" aria-hidden />
          {property.city}, {property.state}
        </p>
        <p className="mt-3 text-sm text-slate-600">
          {property.bedrooms} {property.bedrooms === 1 ? "Quarto" : "Quartos"} ·{" "}
          {property.guestCapacity}{" "}
          {property.guestCapacity === 1 ? "Hóspede" : "Hóspedes"}
        </p>
      </div>
    </Link>
  );
}
