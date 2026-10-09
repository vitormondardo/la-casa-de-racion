import { expect, test } from "@playwright/test";

test("home → filtrar gatos → carrinho → link do WhatsApp com os itens", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Tudo o que seu pet precisa");

  await page.getByRole("link", { name: /ver produtos/i }).first().click();
  await expect(page).toHaveURL(/\/produtos/);

  await page.getByRole("group", { name: "Animal" }).getByRole("button", { name: "Gatos" }).click();
  await expect(page).toHaveURL(/animal=gatos/);
  await expect(page.getByTestId("result-count")).toHaveText("4 produtos encontrados");

  await page.getByRole("button", { name: "Adicionar Ração Gatos Castrados ao carrinho" }).click();
  await page.getByRole("button", { name: "Adicionar Areia Sanitária Granulada ao carrinho" }).click();
  await expect(page.getByTestId("cart-count")).toHaveText("2");

  await page.getByTestId("cart-button").click();
  const drawer = page.getByTestId("cart-drawer");
  await expect(drawer.getByTestId("cart-item")).toHaveCount(2);
  await expect(drawer.getByTestId("cart-total")).toHaveText("R$ 191,80");

  const href = await drawer.getByTestId("cart-whatsapp").getAttribute("href");
  expect(href).toMatch(/^https:\/\/wa\.me\/5547988142917\?text=/);
  const text = decodeURIComponent(new URL(href!).searchParams.get("text")!);
  expect(text).toContain("1x Ração Gatos Castrados (10 kg)");
  expect(text).toContain("1x Areia Sanitária Granulada (4 kg)");

  // aumentar a quantidade atualiza o total e a mensagem
  await drawer.getByRole("button", { name: "Aumentar quantidade de Areia Sanitária Granulada" }).click();
  await expect(drawer.getByTestId("cart-total")).toHaveText("R$ 213,70");

  // o carrinho sobrevive a um recarregamento
  await page.keyboard.press("Escape");
  await page.reload();
  await expect(page.getByTestId("cart-count")).toHaveText("3");
});

for (const path of ["/", "/produtos", "/sobre", "/entrega"]) {
  test(`sem rolagem horizontal em ${path}`, async ({ page }) => {
    await page.goto(path);
    await page.waitForLoadState("networkidle");
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    expect(overflow).toBeLessThanOrEqual(0);
  });
}
