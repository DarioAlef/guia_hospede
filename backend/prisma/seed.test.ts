import { describe, it, expect, vi, beforeEach } from "vitest";
import { seed } from "./seed.js";

const mockUpsert = vi.fn().mockResolvedValue({});
const mockDb = {
  property: { upsert: mockUpsert },
  $disconnect: vi.fn(),
} as any;

describe("seed", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUpsert.mockResolvedValue({});
  });

  it("faz upsert dos 3 imóveis de referência (FLN001, GRM001, PER007)", async () => {
    await seed(mockDb);

    expect(mockUpsert).toHaveBeenCalledTimes(3);

    const codes = mockUpsert.mock.calls.map(
      (call: Parameters<typeof mockUpsert>) => (call[0] as { where: { code: string } }).where.code
    );
    expect(codes).toContain("FLN001");
    expect(codes).toContain("GRM001");
    expect(codes).toContain("PER007");
  });

  it("executa sem erro em segunda chamada (idempotência via upsert)", async () => {
    await seed(mockDb);
    await seed(mockDb);

    expect(mockUpsert).toHaveBeenCalledTimes(6);
  });
});
