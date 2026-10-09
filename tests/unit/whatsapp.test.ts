import { describe, expect, it } from "vitest";
import { buildWhatsAppMessage, buildWhatsAppUrl } from "@/features/whatsapp/message";

describe("buildWhatsAppMessage", () => {
  it("gera saudação genérica quando não há itens", () => {
    expect(buildWhatsAppMessage([])).toBe("Olá, La Casa de Racion! Gostaria de fazer um pedido.");
  });

  it("lista itens com quantidade, subtotal e total", () => {
    const message = buildWhatsAppMessage([
      { name: "Ração Cães Filhotes", size: "3 kg", quantity: 2, priceCents: 6490 },
      { name: "Alpiste Premium", size: "500 g", quantity: 1, priceCents: 990 },
    ]);
    expect(message).toContain("• 2x Ração Cães Filhotes (3 kg) — R$ 129,80");
    expect(message).toContain("• 1x Alpiste Premium (500 g) — R$ 9,90");
    expect(message).toContain("Total estimado: R$ 139,70");
  });
});

describe("buildWhatsAppUrl", () => {
  it("usa só dígitos do número e codifica a mensagem", () => {
    const url = buildWhatsAppUrl("Olá & tchau\nlinha 2", "+55 (47) 98814-2917");
    expect(url).toBe("https://wa.me/5547988142917?text=Ol%C3%A1%20%26%20tchau%0Alinha%202");
  });

  it("omite o texto quando não há mensagem", () => {
    expect(buildWhatsAppUrl(undefined, "5547988142917")).toBe("https://wa.me/5547988142917");
  });
});
