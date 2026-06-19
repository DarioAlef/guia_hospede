import type { PropertyResponse } from "../../../shared/dtos/property.dto";

interface PropertyCardProps {
  property: PropertyResponse;
}

export function PropertyCard({ property }: PropertyCardProps) {
  return (
    <div className="bg-[#0B192C] text-white rounded-2xl shadow-sm p-6 max-w-2xl mx-auto">
      <div className="mb-6">
        <span className="text-xs text-slate-400 uppercase tracking-widest">
          {property.type}
        </span>
        <h1 className="text-2xl font-bold mt-1">{property.name}</h1>
        <p className="text-slate-300 text-sm mt-1">
          {property.address.city}, {property.address.state}
        </p>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6 text-center">
        <div>
          <p className="text-2xl font-semibold">{property.bedrooms}</p>
          <p className="text-xs text-slate-400">quartos</p>
        </div>
        <div>
          <p className="text-2xl font-semibold">{property.bathrooms}</p>
          <p className="text-xs text-slate-400">banheiros</p>
        </div>
        <div>
          <p className="text-2xl font-semibold">{property.guestCapacity}</p>
          <p className="text-xs text-slate-400">hóspedes</p>
        </div>
      </div>

      <div className="mb-4">
        <h2 className="text-sm font-semibold text-slate-300 uppercase tracking-wide mb-2">
          Wi-Fi
        </h2>
        <p className="text-sm">Rede: {property.operational.wifiName}</p>
        <p className="text-sm">Senha: {property.operational.wifiPassword}</p>
      </div>

      <div className="mb-4">
        <h2 className="text-sm font-semibold text-slate-300 uppercase tracking-wide mb-2">
          Check-in / Check-out
        </h2>
        <p className="text-sm">Check-in: {property.rules.checkInTime}</p>
        <p className="text-sm">Check-out: {property.rules.checkOutTime}</p>
      </div>

      <div className="mb-4">
        <h2 className="text-sm font-semibold text-slate-300 uppercase tracking-wide mb-2">
          Acesso
        </h2>
        <p className="text-sm">{property.operational.accessInstructions}</p>
      </div>

      <div>
        <h2 className="text-sm font-semibold text-slate-300 uppercase tracking-wide mb-2">
          Anfitrião
        </h2>
        <p className="text-sm">{property.host.name}</p>
        <p className="text-sm">{property.host.phone}</p>
      </div>
    </div>
  );
}
