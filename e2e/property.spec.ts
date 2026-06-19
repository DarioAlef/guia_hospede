import { test, expect } from "@playwright/test";

test.describe("Imóvel — fluxo principal", () => {
  test("acesso a FLN001 exibe header, hero e a ficha completa do imóvel", async ({
    page,
  }) => {
    await page.goto("/FLN001");

    await expect(page.getByRole("banner").getByText("seazone")).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Apartamento Beira-Mar Floripa" }),
    ).toBeVisible();
    await expect(page.getByText("Florianópolis")).toBeVisible();
    await expect(page.getByText("SeazoneFLN001")).toBeVisible();
    await expect(page.getByText("Carlos Mendes")).toBeVisible();
    await expect(
      page.getByRole("button", { name: "Abrir assistente" }),
    ).toBeVisible();
  });

  test("acesso a código válido inexistente (XYZ999) renderiza página 404 dedicada", async ({
    page,
  }) => {
    await page.goto("/XYZ999");

    await expect(page.getByText("Imóvel não encontrado")).toBeVisible();
  });
});
