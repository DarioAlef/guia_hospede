import { test, expect } from "@playwright/test";

test("página inicial renderiza com título e cabeçalho da vitrine", async ({
  page,
}) => {
  await page.goto("/");

  await expect(page).toHaveTitle(/Seazone/);

  await expect(
    page.getByRole("heading", { name: "Seu lugar fora de casa" }),
  ).toBeVisible();
});

test("página inicial exibe a chamada para escolher um imóvel", async ({
  page,
}) => {
  await page.goto("/");

  await expect(
    page.getByText(/Escolha um imóvel para acessar o guia digital/i),
  ).toBeVisible();
});
