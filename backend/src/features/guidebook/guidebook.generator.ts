import { generateObject } from "ai";
import { groq } from "@ai-sdk/groq";
import {
  GuidebookGenerationSchema,
  type GuidebookContent,
} from "../../shared/dtos/guidebook.dto.js";
import type { PropertyResponse } from "../property/index.js";
import { buildGuidebookPrompt } from "./guidebook.prompt.js";

const GUIDEBOOK_MODEL = "openai/gpt-oss-120b";

export class GuidebookGenerationError extends Error {
  constructor(cause?: unknown) {
    super("Não foi possível gerar o guia local no momento");
    this.name = "GuidebookGenerationError";
    this.cause = cause;
  }
}

export async function generateGuidebook(
  property: PropertyResponse
): Promise<GuidebookContent> {
  try {
    const { system, prompt } = buildGuidebookPrompt(property, new Date());
    const { object } = await generateObject({
      model: groq(GUIDEBOOK_MODEL),
      schema: GuidebookGenerationSchema,
      system,
      prompt,
    });
    return object;
  } catch (error) {
    throw new GuidebookGenerationError(error);
  }
}
