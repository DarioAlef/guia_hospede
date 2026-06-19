import { test, expect } from "@playwright/test";

test("página inicial renderiza corretamente", async ({ page }) => {
  await page.goto("/");

  await expect(page).toHaveTitle(/Seazone/);

  const heading = page.getByRole("heading", { name: /Seazone/i });
  await expect(heading).toBeVisible();
});

test("página inicial exibe mensagem de boas-vindas", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByText(/Guia Digital do Hóspede/i)).toBeVisible();
});
