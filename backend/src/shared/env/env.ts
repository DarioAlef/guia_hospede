import "dotenv/config";
import { z } from "zod";

const EnvSchema = z.object({
  DATABASE_URL: z.string().min(1, "DATABASE_URL é obrigatória"),
  PORT: z.coerce.number().int().positive().default(3001),
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  GROQ_API_KEY: z.string().optional(),
});

function parseEnv() {
  const result = EnvSchema.safeParse(process.env);

  if (!result.success) {
    const missingVars = result.error.errors
      .map((err) => `${err.path.join(".")}: ${err.message}`)
      .join("\n");

    throw new Error(
      `Variáveis de ambiente inválidas ou ausentes:\n${missingVars}`
    );
  }

  return result.data;
}

export const env = parseEnv();
export type Env = z.infer<typeof EnvSchema>;
