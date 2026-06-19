import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: [
      "backend/src/**/*.test.ts",
      "frontend/src/**/*.test.ts",
      "frontend/src/**/*.test.tsx",
    ],
    exclude: [
      "**/node_modules/**",
      "**/dist/**",
      "frontend/src/shared/dtos/**",
    ],
    environment: "node",
  },
});
