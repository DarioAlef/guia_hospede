import { z } from "zod";

const AddressSchema = z.object({
  street: z.string(),
  number: z.string(),
  complement: z.string().optional(),
  neighborhood: z.string(),
  city: z.string(),
  state: z.string().length(2),
  zipCode: z.string().regex(/^\d{5}-?\d{3}$/),
});

const OperationalSchema = z.object({
  wifiName: z.string(),
  wifiPassword: z.string(),
  selfCheckIn: z.boolean(),
  accessType: z.string(),
  accessInstructions: z.string(),
  propertyPassword: z.string().optional(),
  hasParking: z.boolean(),
  parkingInfo: z.string().optional(),
});

const RulesSchema = z.object({
  checkInTime: z.string(),
  checkOutTime: z.string(),
  allowPets: z.boolean(),
  allowSmoking: z.boolean(),
  allowEvents: z.boolean(),
  suitableForChildren: z.boolean(),
  suitableForInfants: z.boolean(),
});

const HostSchema = z.object({
  name: z.string(),
  phone: z.string(),
});

export const PropertySchema = z.object({
  id: z.string(),
  code: z.string().length(6),
  name: z.string(),
  type: z.string(),
  bedrooms: z.number().int().nonnegative(),
  bathrooms: z.number().int().nonnegative(),
  guestCapacity: z.number().int().positive(),
  address: AddressSchema,
  operational: OperationalSchema,
  rules: RulesSchema,
  amenities: z.array(z.string()),
  images: z.array(z.string().url()),
  host: HostSchema,
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export type PropertyResponse = z.infer<typeof PropertySchema>;

export const PropertyCodeParamSchema = z.object({
  code: z.string().regex(/^[A-Z0-9]{6}$/, {
    message:
      "Código deve ter exatamente 6 caracteres alfanuméricos em caixa alta (ex: FLN001)",
  }),
});

export type PropertyCodeParam = z.infer<typeof PropertyCodeParamSchema>;

export const PropertyErrorCode = {
  INVALID_CODE: "INVALID_CODE",
  PROPERTY_NOT_FOUND: "PROPERTY_NOT_FOUND",
} as const;

export type PropertyErrorCodeValue =
  (typeof PropertyErrorCode)[keyof typeof PropertyErrorCode];
