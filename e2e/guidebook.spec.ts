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

test.describe("Guia do Hóspede — UI (rota /[code])", () => {
  test("US1: exibe PropertyCard e todas as seções do guia para código válido", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/PER007");

    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

    await expect(page.getByRole("heading", { name: "Bem-vindo!" })).toBeVisible(
      {
        timeout: 30000,
      }
    );
    await expect(
      page.getByRole("button", { name: "Restaurantes Próximos" })
    ).toBeVisible();
    await expect(
      page.getByRole("button", { name: "Atrações Locais" })
    ).toBeVisible();
    await expect(
      page.getByRole("button", { name: "Serviços Essenciais" })
    ).toBeVisible();
    await expect(page.getByText("Dica da Temporada")).toBeVisible();
  });

  test("US1: accordion expande e colapsa com ARIA correto", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/PER007");

    const accordionButton = page.getByRole("button", {
      name: "Restaurantes Próximos",
    });
    await expect(accordionButton).toBeVisible({ timeout: 30000 });
    await expect(accordionButton).toHaveAttribute("aria-expanded", "false");

    await accordionButton.click();
    await expect(accordionButton).toHaveAttribute("aria-expanded", "true");

    await accordionButton.click();
    await expect(accordionButton).toHaveAttribute("aria-expanded", "false");
  });

  test("US1: sem rolagem horizontal em viewport de 360px", async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 812 });
    await page.goto("/PER007");

    await expect(page.getByRole("heading", { name: "Bem-vindo!" })).toBeVisible(
      {
        timeout: 30000,
      }
    );

    const bodyScrollWidth = await page.evaluate(
      () => document.body.scrollWidth
    );
    expect(bodyScrollWidth).toBeLessThanOrEqual(360);
  });

  test("US2: exibe skeleton durante geração do guia e PropertyCard permanece visível", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 });

    await page.route("**/properties/*/guidebook", async (route) => {
      await new Promise<void>((resolve) => setTimeout(resolve, 3000));
      await route.continue();
    });

    await page.goto("/PER007");

    await expect(page.getByTestId("guidebook-skeleton")).toBeVisible({
      timeout: 5000,
    });
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

    await expect(page.getByTestId("guidebook-skeleton")).not.toBeVisible({
      timeout: 10000,
    });
    await expect(
      page.getByRole("heading", { name: "Bem-vindo!" })
    ).toBeVisible();
  });

  test("US2: exibe erro inline quando geração falha e PropertyCard permanece visível", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 });

    await page.route("**/properties/*/guidebook", (route) =>
      route.fulfill({
        status: 503,
        contentType: "application/json",
        body: JSON.stringify({ error: "GENERATION_FAILED" }),
      })
    );

    await page.goto("/PER007");

    await expect(page.getByTestId("guidebook-error")).toBeVisible({
      timeout: 5000,
    });
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });

  test("US3: exibe tela 404 amigável para código inexistente", async ({
    page,
  }) => {
    await page.goto("/ZZZ999");

    await expect(page.getByTestId("not-found-page")).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Imóvel não encontrado" })
    ).toBeVisible();
    await expect(page.getByText(/anfitrião/i)).toBeVisible();
  });

  test("US3: tela 404 não exibe dados de outro imóvel", async ({ page }) => {
    await page.goto("/ZZZ999");

    await expect(page.getByTestId("not-found-page")).toBeVisible();
    await expect(page.getByTestId("guidebook-skeleton")).not.toBeVisible();
    await expect(page.getByTestId("guidebook-error")).not.toBeVisible();
  });

  test("FR-011: alvos de toque dos accordions têm pelo menos 44px de altura", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/PER007");

    await expect(
      page.getByRole("button", { name: "Restaurantes Próximos" })
    ).toBeVisible({
      timeout: 30000,
    });

    const accordionButtons = page.getByRole("button", {
      name: /Restaurantes|Atrações|Serviços/,
    });

    for (const button of await accordionButtons.all()) {
      const box = await button.boundingBox();
      expect(box).not.toBeNull();
      expect(box!.height).toBeGreaterThanOrEqual(44);
    }
  });
});
