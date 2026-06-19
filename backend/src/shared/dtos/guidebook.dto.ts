import { z } from "zod";

const RestaurantSchema = z.object({
  name: z.string().min(1, { message: "O nome do restaurante é obrigatório." }),
  cuisine: z.string().min(1, { message: "O tipo de culinária é obrigatório." }),
  description: z
    .string()
    .min(1, { message: "A descrição do restaurante é obrigatória." }),
});

const AttractionSchema = z.object({
  name: z.string().min(1, { message: "O nome da atração é obrigatório." }),
  description: z
    .string()
    .min(1, { message: "A descrição da atração é obrigatória." }),
});

const EssentialServiceSchema = z.object({
  name: z.string().min(1, { message: "O nome do serviço é obrigatório." }),
  type: z.string().min(1, { message: "O tipo do serviço é obrigatório." }),
  description: z
    .string()
    .min(1, { message: "A descrição do serviço é obrigatória." }),
});

export const GuidebookGenerationSchema = z.object({
  restaurants: z
    .array(RestaurantSchema)
    .min(4, { message: "O guia deve conter ao menos 4 restaurantes." })
    .max(5, { message: "O guia deve conter no máximo 5 restaurantes." }),
  attractions: z
    .array(AttractionSchema)
    .min(3, { message: "O guia deve conter ao menos 3 atrações." })
    .max(4, { message: "O guia deve conter no máximo 4 atrações." }),
  essentialServices: z
    .array(EssentialServiceSchema)
    .min(1, { message: "O guia deve conter ao menos 1 serviço essencial." }),
  seasonalTip: z.string().min(1, { message: "A dica sazonal é obrigatória." }),
  welcomeMessage: z
    .string()
    .min(1, { message: "A mensagem de boas-vindas é obrigatória." }),
});

export type GuidebookContent = z.infer<typeof GuidebookGenerationSchema>;

export const GuidebookResponseSchema = GuidebookGenerationSchema.extend({
  id: z.string(),
  propertyCode: z.string().length(6),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export type GuidebookResponse = z.infer<typeof GuidebookResponseSchema>;

export const GuidebookErrorCode = {
  INVALID_CODE: "INVALID_CODE",
  PROPERTY_NOT_FOUND: "PROPERTY_NOT_FOUND",
  GENERATION_FAILED: "GENERATION_FAILED",
} as const;

export type GuidebookErrorCodeValue =
  (typeof GuidebookErrorCode)[keyof typeof GuidebookErrorCode];
