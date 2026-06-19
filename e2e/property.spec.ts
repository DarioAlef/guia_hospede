import { test, expect } from "@playwright/test";

test.describe("Imóvel — fluxo principal", () => {
  test("acesso a FLN001 exibe header, hero e a ficha completa do imóvel", async ({
    page,
  }) => {
    await page.goto("/property/FLN001");

    await expect(page.getByRole("banner").getByText("seazone")).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Apartamento Beira-Mar Floripa" }),
    ).toBeVisible();
    await expect(page.getByText("Florianópolis, SC")).toBeVisible();
    await expect(page.getByText("SeazoneFLN001")).toBeVisible();
    await expect(page.getByText("Carlos Mendes")).toBeVisible();
    await expect(
      page.getByRole("button", { name: "Abrir assistente" }),
    ).toBeVisible();
  });

  test("acesso a código válido inexistente (XYZ999) renderiza página 404 dedicada", async ({
    page,
  }) => {
    await page.goto("/property/XYZ999");

    await expect(page.getByText("Imóvel não encontrado")).toBeVisible();
  });
});

test.describe("Home — vitrine navegável de imóveis", () => {
  test("home lista imóveis clicáveis e navega para o guia ao clicar no card", async ({
    page,
  }) => {
    await page.goto("/");

    const cards = page.getByTestId("property-card");
    await expect(cards.first()).toBeVisible();

    await cards.first().click();

    await expect(page).toHaveURL(/\/property\/[A-Z0-9]{6}$/);
    await expect(page.getByRole("banner").getByText("seazone")).toBeVisible();
  });
});

test.describe("Rotas inválidas — 404 global", () => {
  test("rota inexistente exibe a página 404 global com retorno à home", async ({
    page,
  }) => {
    await page.goto("/rota-que-nao-existe");

    await expect(page.getByTestId("not-found-page")).toBeVisible();
    await expect(page.getByText("Página não encontrada")).toBeVisible();
  });

  test("antiga rota por código na raiz (/GRM001) não serve mais o imóvel", async ({
    page,
  }) => {
    await page.goto("/GRM001");

    await expect(page.getByTestId("not-found-page")).toBeVisible();
  });
});
