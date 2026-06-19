import { describe, test, expect } from "vitest";
import { mapGuidebookError } from "./useGuidebook";
import { GuidebookErrorCode } from "../../../shared/dtos/guidebook.dto";

describe("mapGuidebookError", () => {
  test("retorna GENERATION_FAILED para o código correto", () => {
    expect(mapGuidebookError(GuidebookErrorCode.GENERATION_FAILED)).toBe("GENERATION_FAILED");
  });

  test("retorna PROPERTY_NOT_FOUND para o código correto", () => {
    expect(mapGuidebookError(GuidebookErrorCode.PROPERTY_NOT_FOUND)).toBe("PROPERTY_NOT_FOUND");
  });

  test("retorna INVALID_CODE para o código correto", () => {
    expect(mapGuidebookError(GuidebookErrorCode.INVALID_CODE)).toBe("INVALID_CODE");
  });

  test("retorna UNKNOWN para string não reconhecida", () => {
    expect(mapGuidebookError("SOME_OTHER_ERROR")).toBe("UNKNOWN");
  });

  test("retorna UNKNOWN para null", () => {
    expect(mapGuidebookError(null)).toBe("UNKNOWN");
  });

  test("retorna UNKNOWN para undefined", () => {
    expect(mapGuidebookError(undefined)).toBe("UNKNOWN");
  });

  test("retorna UNKNOWN para número", () => {
    expect(mapGuidebookError(500)).toBe("UNKNOWN");
  });

  test("retorna UNKNOWN para string vazia", () => {
    expect(mapGuidebookError("")).toBe("UNKNOWN");
  });
});
