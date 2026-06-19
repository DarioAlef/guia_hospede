import { test, expect, request } from "@playwright/test";

const BACKEND_URL = process.env["BACKEND_URL"] ?? "http://localhost:3001";

test.describe("Guia Local — API (features/guidebook)", () => {
  test("golden path: gera no 1º acesso e reusa o mesmo registro no 2º", async () => {
    const api = await request.newContext({ baseURL: BACKEND_URL });
    const code = "PER007";

    const first = await api.post(`/properties/${code}/guidebook`);
    expect(first.status()).toBe(200);
    const generated = await first.json();
    expect(generated.propertyCode).toBe(code);
    expect(generated.restaurants.length).toBeGreaterThanOrEqual(4);
    expect(generated.restaurants.length).toBeLessThanOrEqual(5);
    expect(generated.attractions.length).toBeGreaterThanOrEqual(3);
    expect(generated.attractions.length).toBeLessThanOrEqual(4);
    expect(generated.essentialServices.length).toBeGreaterThanOrEqual(1);
    expect(generated.seasonalTip.length).toBeGreaterThan(0);
    expect(generated.welcomeMessage.length).toBeGreaterThan(0);

    const second = await api.post(`/properties/${code}/guidebook`);
    expect(second.status()).toBe(200);
    const reused = await second.json();
    expect(reused.id).toBe(generated.id);
    expect(reused.createdAt).toBe(generated.createdAt);

    await api.dispose();
  });

  test("400 INVALID_CODE para código fora do formato", async () => {
    const api = await request.newContext({ baseURL: BACKEND_URL });
    const res = await api.post("/properties/per007/guidebook");
    expect(res.status()).toBe(400);
    expect((await res.json()).error).toBe("INVALID_CODE");
    await api.dispose();
  });

  test("404 PROPERTY_NOT_FOUND para imóvel inexistente", async () => {
    const api = await request.newContext({ baseURL: BACKEND_URL });
    const res = await api.post("/properties/XYZ999/guidebook");
    expect(res.status()).toBe(404);
    expect((await res.json()).error).toBe("PROPERTY_NOT_FOUND");
    await api.dispose();
  });
});
