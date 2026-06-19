"use client";
import { useState } from "react";
import Image from "next/image";
import { MapPin } from "../../../components/ui/icons";

interface PropertyHeroProps {
  name: string;
  type: string;
  city: string;
  state: string;
  imageUrl?: string | undefined;
}

export function PropertyHero({
  name,
  type,
  city,
  state,
  imageUrl,
}: PropertyHeroProps) {
  const [imageFailed, setImageFailed] = useState(false);
  const showImage = Boolean(imageUrl) && !imageFailed;

  return (
    <div className="relative h-64 w-full overflow-hidden rounded-2xl bg-seazone-navy shadow-sm">
      {showImage && imageUrl && (
        <Image
          src={imageUrl}
          alt={name}
          fill
          priority
          sizes="(max-width: 672px) 100vw, 672px"
          className="object-cover"
          onError={() => setImageFailed(true)}
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-5 text-white">
        <span className="text-xs font-semibold uppercase tracking-widest text-slate-200">
          {type}
        </span>
        <h1 className="mt-1 text-2xl font-bold leading-tight">{name}</h1>
        <p className="mt-1 flex items-center gap-1 text-sm text-slate-200">
          <MapPin className="h-4 w-4 shrink-0" aria-hidden />
          {city}, {state}
        </p>
      </div>
    </div>
  );
}
