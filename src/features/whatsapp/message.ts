import { formatBRL } from "@/lib/utils";
import { site } from "@/lib/site";

export type MessageItem = {
  name: string;
  size: string;
  quantity: number;
  priceCents: number;
};

export function buildWhatsAppMessage(items: MessageItem[]) {
  if (items.length === 0) {
    return `Olá, ${site.name}! Gostaria de fazer um pedido.`;
  }

  const lines = items.map(
    (item) =>
      `• ${item.quantity}x ${item.name} (${item.size}) — ${formatBRL(item.priceCents * item.quantity)}`,
  );
  const total = items.reduce((sum, item) => sum + item.priceCents * item.quantity, 0);

  return [
    `Olá, ${site.name}! Gostaria de fazer este pedido:`,
    "",
    ...lines,
    "",
    `Total estimado: ${formatBRL(total)}`,
    "",
    "Podem confirmar disponibilidade, valores e entrega?",
  ].join("\n");
}

export function buildWhatsAppUrl(message?: string, number: string = site.whatsappNumber) {
  const digits = number.replace(/\D/g, "");
  const base = `https://wa.me/${digits}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
