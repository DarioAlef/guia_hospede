import { test, expect } from "@playwright/test";

test.describe("Assistente Virtual — fluxo principal", () => {
  test("abrir widget e receber resposta em streaming para FLN001", async ({
    page,
  }) => {
    await page.goto("/property/FLN001");

    const toggleBtn = page.getByRole("button", { name: /abrir assistente/i });
    await expect(toggleBtn).toBeVisible();
    await toggleBtn.click();

    const input = page.getByPlaceholder("Pergunte sobre o imóvel...");
    await expect(input).toBeVisible();

    await input.fill("Qual a senha do Wi-Fi?");
    await page.getByRole("button", { name: /enviar/i }).click();

    const userMsg = page
      .locator(".bg-seazone-coral")
      .filter({ hasText: "Qual a senha do Wi-Fi?" });
    await expect(userMsg).toBeVisible();

    const assistantMsg = page.locator(".bg-gray-100").last();
    await expect(assistantMsg).toBeVisible({ timeout: 30000 });
    const responseText = await assistantMsg.textContent();
    expect(responseText?.length).toBeGreaterThan(0);
  });

  test("fechar e reabrir o widget preserva o botão coral", async ({ page }) => {
    await page.goto("/property/FLN001");

    const openBtn = page.getByRole("button", { name: /abrir assistente/i });
    await openBtn.click();
    await expect(
      page.getByRole("button", { name: /fechar assistente/i })
    ).toBeVisible();

    await page.getByRole("button", { name: /fechar assistente/i }).click();
    await expect(
      page.getByRole("button", { name: /abrir assistente/i })
    ).toBeVisible();
  });
});
