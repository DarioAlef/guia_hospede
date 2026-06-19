import { PrismaClient } from "@prisma/client";

const properties = [
  {
    code: "FLN001",
    name: "Apartamento Beira-Mar Floripa",
    type: "Apartamento",
    bedrooms: 2,
    bathrooms: 1,
    guestCapacity: 4,
    address: {
      street: "Av. Beira-Mar Norte",
      number: "2250",
      complement: "Apto 501",
      neighborhood: "Agronômica",
      city: "Florianópolis",
      state: "SC",
      zipCode: "88025-301",
    },
    operational: {
      wifiName: "SeazoneFLN001",
      wifiPassword: "flnguest2024",
      selfCheckIn: true,
      accessType: "cofre",
      accessInstructions:
        "O cofre está na entrada do prédio, coluna direita. Código: 4821.",
      propertyPassword: "4821",
      hasParking: true,
      parkingInfo:
        "Vaga 12, subsolo 1. Use o controle remoto na gaveta da entrada.",
    },
    rules: {
      checkInTime: "15:00",
      checkOutTime: "11:00",
      allowPets: false,
      allowSmoking: false,
      allowEvents: false,
      suitableForChildren: true,
      suitableForInfants: false,
    },
    amenities: [
      "wifi",
      "tv",
      "ar-condicionado",
      "cozinha-equipada",
      "lavanderia",
      "varanda",
    ],
    images: [
      "https://images.seazone.com.br/fln001/sala.jpg",
      "https://images.seazone.com.br/fln001/quarto-1.jpg",
      "https://images.seazone.com.br/fln001/varanda.jpg",
    ],
    host: { name: "Carlos Mendes", phone: "+55 48 99123-4567" },
  },
  {
    code: "GRM001",
    name: "Chalé Pinheiros Gramado",
    type: "Chalé",
    bedrooms: 3,
    bathrooms: 2,
    guestCapacity: 6,
    address: {
      street: "Rua dos Pinheiros",
      number: "845",
      neighborhood: "Planalto",
      city: "Gramado",
      state: "RS",
      zipCode: "95670-000",
    },
    operational: {
      wifiName: "ChalePinheiros",
      wifiPassword: "gramado@2024",
      selfCheckIn: false,
      accessType: "chave",
      accessInstructions:
        "A chave será entregue pessoalmente na recepção da pousada ao lado (Pousada Serra Verde, aberta até 22h).",
      hasParking: true,
      parkingInfo: "Estacionamento coberto para 2 carros, portão automático.",
    },
    rules: {
      checkInTime: "14:00",
      checkOutTime: "12:00",
      allowPets: true,
      allowSmoking: false,
      allowEvents: false,
      suitableForChildren: true,
      suitableForInfants: true,
    },
    amenities: [
      "wifi",
      "tv",
      "lareira",
      "cozinha-equipada",
      "churrasqueira",
      "banheira-hidro",
      "jardim",
    ],
    images: [
      "https://images.seazone.com.br/grm001/fachada.jpg",
      "https://images.seazone.com.br/grm001/sala-lareira.jpg",
      "https://images.seazone.com.br/grm001/jardim.jpg",
    ],
    host: { name: "Ana Beatriz Ramos", phone: "+55 54 98876-5432" },
  },
  {
    code: "PER007",
    name: "Casa da Pedreira Mairiporã",
    type: "Casa",
    bedrooms: 4,
    bathrooms: 3,
    guestCapacity: 8,
    address: {
      street: "Estrada da Pedreira",
      number: "312",
      neighborhood: "Zona Rural",
      city: "Mairiporã",
      state: "SP",
      zipCode: "07600-000",
    },
    operational: {
      wifiName: "CasaPedreira_5G",
      wifiPassword: "pedreira#2024",
      selfCheckIn: true,
      accessType: "teclado",
      accessInstructions: "Teclado na porta principal. Código: 7391#.",
      propertyPassword: "7391",
      hasParking: true,
      parkingInfo: "Área externa com espaço para 4 carros.",
    },
    rules: {
      checkInTime: "16:00",
      checkOutTime: "11:00",
      allowPets: true,
      allowSmoking: false,
      allowEvents: true,
      suitableForChildren: true,
      suitableForInfants: true,
    },
    amenities: [
      "wifi",
      "tv",
      "piscina",
      "churrasqueira",
      "cozinha-equipada",
      "mesa-de-jogos",
      "fogueira",
    ],
    images: [
      "https://images.seazone.com.br/per007/fachada.jpg",
      "https://images.seazone.com.br/per007/piscina.jpg",
      "https://images.seazone.com.br/per007/churrasqueira.jpg",
    ],
    host: { name: "Roberto Faria", phone: "+55 11 97654-3210" },
  },
];

export async function seed(db?: PrismaClient): Promise<void> {
  const client = db ?? new PrismaClient();
  const owned = !db;

  try {
    for (const property of properties) {
      await client.property.upsert({
        where: { code: property.code },
        update: property,
        create: property,
      });
    }
    if (owned)
      console.log("Seed concluído: FLN001, GRM001, PER007 disponíveis.");
  } finally {
    if (owned) await client.$disconnect();
  }
}

const isMainModule =
  typeof process !== "undefined" &&
  process.argv[1] != null &&
  import.meta.url.endsWith(process.argv[1].replace(/\\/g, "/"));

if (isMainModule) {
  seed().catch((e) => {
    console.error(e);
    process.exit(1);
  });
}
