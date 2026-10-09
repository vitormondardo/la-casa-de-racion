import { describe, expect, it } from "vitest";
import { buildWhatsAppMessage, buildWhatsAppUrl, toWhatsAppPhone } from "@/features/whatsapp/message";

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

describe("toWhatsAppPhone", () => {
  it("adiciona o 55 a números com DDD", () => {
    expect(toWhatsAppPhone("47988142917")).toBe("5547988142917");
    expect(toWhatsAppPhone("(47) 3333-4444")).toBe("554733334444");
  });

  it("mantém números que já têm código do país", () => {
    expect(toWhatsAppPhone("+55 (47) 98814-2917")).toBe("5547988142917");
  });
});

describe("buildWhatsAppUrl", () => {
  it("usa api.whatsapp.com e codifica a mensagem", () => {
    const url = buildWhatsAppUrl("Olá & tchau\nlinha 2", "47988142917");
    expect(url).toBe(
      "https://api.whatsapp.com/send?phone=5547988142917&text=Ol%C3%A1%20%26%20tchau%0Alinha%202",
    );
  });

  it("usa o número da loja por padrão e omite o texto sem mensagem", () => {
    expect(buildWhatsAppUrl()).toBe("https://api.whatsapp.com/send?phone=5547988142917");
  });
});
